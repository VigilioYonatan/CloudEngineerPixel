import { effect, signal } from '@preact/signals';
import {
  formatHashRoute,
  parseHashRoute,
  type AboutSectionId,
  type AppView,
  type RouteFormatOptions,
  type RouteRecoveryDiagnostic,
  type SimulatorRouteId,
} from '../app/router';
import { APP_VERSION, PROGRESS_EXPORT_VERSION, PROGRESS_SCHEMA_VERSION } from '../config/appMeta';
import type { Provider } from '../data/course';
import { requestConfirm } from './confirmDialogState';
import { appContextGuard } from './contextSwitchGuard';
import {
  createEmptyValidatedProgress,
  inspectStoredProgressRaw,
  migrateProgressSnapshot,
  type ValidatedProgress,
} from './importValidation.mjs';
import {
  clearLastVisitedUnit,
  markOnboardingCompleted,
  recordLastVisitedUnit,
  showOnboarding,
} from './onboardingState';
import './preferencesState';

export type View = AppView;

export type SeniorAttempt = {
  caseId: string;
  provider: Provider;
  correct: boolean;
  score: number;
  at: string;
  examined: string[];
  report?: {
    cause: string;
    mitigation: string;
    validation: string;
    rollback?: string;
    citations?: string[];
  };
};

export type Progress = ValidatedProgress;

const CORRUPT_BACKUP_STORAGE_KEY = 'cea:progress:corrupt-backup';
let warnedStorageFailure = false;

const empty = (): Progress => createEmptyValidatedProgress();

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeReadRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

const urlProvider = (): Provider | null => {
  if (typeof location === 'undefined') return null;
  const p = new URLSearchParams(location.search).get('cloud');
  return p === 'aws' || p === 'azure' || p === 'gcp' ? p : null;
};

const storedProvider = safeRead<string>('cea:provider', 'aws');
export const provider = signal<Provider>(
  urlProvider() ||
    (storedProvider === 'azure' || storedProvider === 'gcp' ? storedProvider : 'aws'),
);

const storedTheme = safeRead<string>('cea:theme', 'dark');
export const theme = signal<'dark' | 'light'>(storedTheme === 'light' ? 'light' : 'dark');

export const view = signal<View>('home');
export const currentModule = signal('cloud-fundamentals');
export const currentTopic = signal(0);
export const currentSimMode = signal<SimulatorRouteId>('cidr');
export const currentSeniorCaseId = signal<string | null>(null);
export const currentAboutSection = signal<AboutSectionId>('metodologia');
export const routeRecovery = signal<RouteRecoveryDiagnostic | null>(null);
export const levelFilter = signal('todos');
export const searchText = signal('');

const initialInspection = inspectStoredProgressRaw(safeReadRaw('cea:progress'));
if (initialInspection.status === 'corrupted' && initialInspection.raw) {
  try {
    localStorage.setItem(CORRUPT_BACKUP_STORAGE_KEY, initialInspection.raw);
  } catch {
    /* ignore secondary backup quota error; raw remains in cea:progress */
  }
}

export const corruptedStorageRaw = signal<string | null>(initialInspection.raw);
export const corruptedStorageError = signal<string | null>(initialInspection.error);
export const storageWriteError = signal<string | null>(null);
export const progress = signal<Progress>(initialInspection.progress);
export const mobileMenu = signal(false);
export const toast = signal('');

export function dismissStorageWriteError() {
  storageWriteError.value = null;
}

const stampNow = () => new Date().toISOString();

export function notify(message: string) {
  toast.value = message;
}

function commitProviderChange(p: Provider) {
  markOnboardingCompleted();
  provider.value = p;
  history.replaceState({}, '', `${location.pathname}?cloud=${p}${location.hash}`);
  notify(`Ruta ${p.toUpperCase()} activada`);
}

export function setProvider(p: Provider): boolean {
  if (!['aws', 'azure', 'gcp'].includes(p)) return false;
  if (p !== provider.value) {
    if (appContextGuard.hasAsyncImportInFlight()) {
      void requestConfirm({
        title: 'Importación en curso',
        description:
          'Hay una importación de expediente en curso. ¿Deseas descartar la espera pendiente y cambiar de nube?',
        confirmLabel: 'Cambiar de nube',
        cancelLabel: 'Esperar importación',
        tone: 'warning',
      }).then((confirmed) => {
        if (confirmed) {
          appContextGuard.flushDirtyScopes();
          commitProviderChange(p);
        }
      });
      return false;
    }
    appContextGuard.flushDirtyScopes();
  }
  commitProviderChange(p);
  return true;
}

export function applyParsedRoute(raw_hash: string): void {
  const parsed = parseHashRoute(raw_hash);
  routeRecovery.value = parsed.routeRecovery || null;
  view.value = parsed.routeRecovery ? parsed.view : parsed.view;
  if (parsed.routeRecovery) return;

  if (parsed.view === 'lesson') {
    if (parsed.resourceId) currentModule.value = parsed.resourceId;
    const next_unit = parsed.unitIndex !== undefined ? parsed.unitIndex : currentTopic.value;
    if (parsed.unitIndex !== undefined) currentTopic.value = parsed.unitIndex;
    if (parsed.resourceId) recordLastVisitedUnit(parsed.resourceId, next_unit);
  } else if (parsed.view === 'lab' && parsed.resourceId) {
    currentModule.value = parsed.resourceId;
  } else if (parsed.view === 'simulator') {
    currentSimMode.value = parsed.simId || 'cidr';
  } else if (parsed.view === 'senior') {
    currentSeniorCaseId.value = parsed.caseId || null;
  } else if (parsed.view === 'about' && parsed.aboutSection) {
    currentAboutSection.value = parsed.aboutSection;
  }
}

function commitNavigation(target_view: View, options?: RouteFormatOptions) {
  const normalized = typeof options === 'string' ? { resourceId: options } : options || {};
  routeRecovery.value = null;

  if (normalized.resourceId && (target_view === 'lesson' || target_view === 'lab')) {
    currentModule.value = normalized.resourceId;
  }
  if (target_view === 'lesson') {
    const next_unit =
      normalized.unitIndex !== undefined ? normalized.unitIndex : currentTopic.value;
    if (normalized.unitIndex !== undefined) currentTopic.value = normalized.unitIndex;
    recordLastVisitedUnit(normalized.resourceId || currentModule.value, next_unit);
  }
  if (target_view === 'simulator') {
    currentSimMode.value = normalized.simId || 'cidr';
  }
  if (target_view === 'senior') {
    currentSeniorCaseId.value = normalized.caseId || null;
  }
  if (target_view === 'about' && normalized.aboutSection) {
    currentAboutSection.value = normalized.aboutSection;
  }
  view.value = target_view;
  mobileMenu.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const next_hash = formatHashRoute(target_view, normalized);
  if (location.hash !== next_hash) {
    location.hash = next_hash;
  }
}

export function navigate(target_view: View, options?: RouteFormatOptions) {
  if (appContextGuard.hasAsyncImportInFlight()) {
    void requestConfirm({
      title: 'Importación activa',
      description:
        'Hay una importación de expediente en curso. ¿Deseas abandonar esta vista antes de que finalice?',
      confirmLabel: 'Cambiar de vista',
      cancelLabel: 'Permanecer aquí',
      tone: 'warning',
    }).then((confirmed) => {
      if (confirmed) {
        appContextGuard.flushDirtyScopes();
        commitNavigation(target_view, options);
      }
    });
    return;
  }
  appContextGuard.flushDirtyScopes();
  commitNavigation(target_view, options);
}

export function completeTopic(id: string, p: Provider) {
  const key = `${p}:${id}`;
  if (!progress.value.completed.includes(key)) {
    progress.value = {
      ...progress.value,
      updatedAt: stampNow(),
      completed: [...progress.value.completed, key],
    };
  }
  notify('Lección completada. ¡Buen trabajo!');
}

export function setQuiz(id: string, p: Provider, score: number) {
  progress.value = {
    ...progress.value,
    updatedAt: stampNow(),
    quiz: { ...progress.value.quiz, [`${p}:${id}`]: score },
  };
}

export function recordSeniorAttempt(attempt: SeniorAttempt) {
  progress.value = {
    ...progress.value,
    updatedAt: stampNow(),
    seniorAttempts: [...(progress.value.seniorAttempts || []), attempt].slice(-300),
  };
}

export function completeSenior(id: string) {
  if (!progress.value.senior.includes(id)) {
    progress.value = {
      ...progress.value,
      updatedAt: stampNow(),
      senior: [...progress.value.senior, id],
    };
  }
}

export function setNotes(key: string, value: string) {
  if (!/^[a-z0-9:_-]{1,140}$/.test(key) || ['__proto__', 'constructor', 'prototype'].includes(key))
    return;
  progress.value = {
    ...progress.value,
    updatedAt: stampNow(),
    notes: { ...progress.value.notes, [key]: value.slice(0, 12000) },
  };
}

export async function clearProgress() {
  const current = progress.value;
  const confirmed = await requestConfirm({
    title: 'Reiniciar progreso local',
    description: '¿Eliminar todo tu progreso local? Esta acción no se puede deshacer.',
    impactSummary: `Se borrarán ${current.completed.length} actividades completadas, ${current.senior.length} desafíos Senior y ${Object.keys(current.notes).length} notas o borradores guardados en este navegador.`,
    confirmLabel: 'Reiniciar progreso',
    cancelLabel: 'Conservar datos',
    tone: 'danger',
  });
  if (confirmed) {
    corruptedStorageRaw.value = null;
    corruptedStorageError.value = null;
    clearLastVisitedUnit();
    progress.value = empty();
    notify('Progreso reiniciado');
  }
}

export function downloadCorruptedBackup() {
  const raw_payload = corruptedStorageRaw.value ?? safeReadRaw(CORRUPT_BACKUP_STORAGE_KEY);
  if (!raw_payload) return;
  const blob = new Blob(
    [
      JSON.stringify(
        {
          notice:
            'Respaldo crudo de emergencia generado antes de reiniciar el estado local corrupto.',
          capturedAt: stampNow(),
          error: corruptedStorageError.value,
          rawStorageValue: raw_payload,
        },
        null,
        2,
      ),
    ],
    { type: 'application/json' },
  );
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'cloud-academy-respaldo-crudo-corrupto.json';
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify('Respaldo crudo descargado');
}

export async function dismissCorruptedBackupAndReset() {
  const confirmed = await requestConfirm({
    title: 'Reiniciar almacenamiento dañado',
    description:
      '¿Reiniciar el almacenamiento local con un esquema limpio v2? Descarga antes el respaldo crudo si deseas conservar tus notas.',
    impactSummary:
      'El estado corrupto en cuarentena será reemplazado por un esquema limpio schemaVersion 2.',
    confirmLabel: 'Reiniciar estado limpio',
    cancelLabel: 'Cancelar',
    tone: 'danger',
  });
  if (confirmed) {
    corruptedStorageRaw.value = null;
    corruptedStorageError.value = null;
    progress.value = empty();
    notify('Estado local reiniciado en schemaVersion 2');
  }
}

export function exportProgress() {
  const exported_at = stampNow();
  const blob = new Blob(
    [
      JSON.stringify(
        {
          version: PROGRESS_EXPORT_VERSION,
          schemaVersion: PROGRESS_SCHEMA_VERSION,
          appVersion: APP_VERSION,
          exportedAt: exported_at,
          progress: {
            ...progress.value,
            schemaVersion: PROGRESS_SCHEMA_VERSION,
            updatedAt: exported_at,
          },
        },
        null,
        2,
      ),
    ],
    { type: 'application/json' },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cloud-academy-progreso.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function importProgress(file: File) {
  const finish_import = appContextGuard.beginAsyncImport();
  try {
    if (file.size > 8 * 1024 * 1024) throw Error('El archivo supera 8 MB');
    let raw: unknown;
    try {
      raw = JSON.parse(await file.text());
    } catch {
      throw Error('El archivo no es JSON válido');
    }
    const migrated = migrateProgressSnapshot(raw, stampNow());
    const confirmed = await requestConfirm({
      title: 'Sobrescribir progreso global',
      description:
        '¿Deseas reemplazar tu progreso actual en este navegador con el respaldo validado?',
      impactSummary: `Actual: ${progress.value.completed.length} actividades · Respaldo entrante: ${migrated.completed.length} actividades y ${migrated.senior.length} casos Senior.`,
      confirmLabel: 'Sobrescribir progreso',
      cancelLabel: 'Cancelar importación',
      tone: 'warning',
    });
    if (!confirmed) return;

    corruptedStorageRaw.value = null;
    corruptedStorageError.value = null;
    progress.value = migrated;
    notify('Progreso importado y validado correctamente');
  } finally {
    finish_import();
  }
}

effect(() => {
  try {
    if (!showOnboarding.value) {
      localStorage.setItem('cea:provider', JSON.stringify(provider.value));
    }
    localStorage.setItem('cea:theme', JSON.stringify(theme.value));
    document.documentElement.dataset.theme = theme.value;
    document.documentElement.dataset.provider = provider.value;
    if (corruptedStorageRaw.value === null) {
      localStorage.setItem('cea:progress', JSON.stringify(progress.value));
    }
    storageWriteError.value = null;
  } catch {
    const msg =
      'No fue posible guardar el progreso local. Exporta una copia JSON antes de cerrar esta pestaña.';
    storageWriteError.value = msg;
    if (!warnedStorageFailure) {
      warnedStorageFailure = true;
      notify(msg);
    }
  }
});

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    const cloud_from_url = urlProvider();
    if (cloud_from_url && cloud_from_url !== provider.value) {
      provider.value = cloud_from_url;
    }
    applyParsedRoute(location.hash);
  });
  applyParsedRoute(location.hash);
}
