import { PROGRESS_EXPORT_VERSION, PROGRESS_SCHEMA_VERSION } from '../config/appMeta';
import type { Provider } from '../data/course';
import type { ValidatedProgress } from './importValidation.mjs';

export type ProviderStorageStat = {
  completedCount: number;
  quizCount: number;
  seniorCompletedCount: number;
  notesCount: number;
};

export type ProgressStorageSummary = {
  estimatedBytes: number;
  totalNotes: number;
  byProvider: Record<Provider, ProviderStorageStat>;
};

function belongsToProviderKey(key: string, providerId: Provider): boolean {
  return (
    key.startsWith(`${providerId}:`) ||
    key.startsWith(`senior:${providerId}:`) ||
    key.startsWith(`senior-session:${providerId}:`) ||
    key.startsWith(`senior-review:${providerId}:`)
  );
}

export function purgeProviderFromProgress(
  current: ValidatedProgress,
  providerId: Provider,
  nowIso = new Date().toISOString(),
): ValidatedProgress {
  const nextQuiz: Record<string, number> = {};
  for (const [k, v] of Object.entries(current.quiz)) {
    if (!belongsToProviderKey(k, providerId)) nextQuiz[k] = v;
  }

  const nextNotes: Record<string, string> = {};
  for (const [k, v] of Object.entries(current.notes)) {
    if (!belongsToProviderKey(k, providerId)) nextNotes[k] = v;
  }

  return {
    ...current,
    updatedAt: nowIso,
    completed: current.completed.filter((id) => !belongsToProviderKey(id, providerId)),
    quiz: nextQuiz,
    senior: current.senior.filter((id) => !belongsToProviderKey(id, providerId)),
    notes: nextNotes,
    seniorAttempts: (current.seniorAttempts || []).filter((item) => item.provider !== providerId),
  };
}

export function purgeSeniorCaseFromProgress(
  current: ValidatedProgress,
  providerId: Provider,
  caseId: string,
  nowIso = new Date().toISOString(),
): ValidatedProgress {
  const scopedKeys = new Set([
    `senior:${providerId}:${caseId}`,
    `senior-session:${providerId}:${caseId}`,
    `senior-review:${providerId}:${caseId}`,
  ]);

  const nextNotes: Record<string, string> = {};
  for (const [k, v] of Object.entries(current.notes)) {
    if (!scopedKeys.has(k)) nextNotes[k] = v;
  }

  return {
    ...current,
    updatedAt: nowIso,
    senior: current.senior.filter((id) => id !== `${providerId}:${caseId}`),
    notes: nextNotes,
    seniorAttempts: (current.seniorAttempts || []).filter(
      (item) => !(item.provider === providerId && item.caseId === caseId),
    ),
  };
}

export function buildProviderScopedExport(
  current: ValidatedProgress,
  providerId: Provider,
  appVersion: string,
  exportedAt = new Date().toISOString(),
) {
  const scopedQuiz: Record<string, number> = {};
  for (const [k, v] of Object.entries(current.quiz)) {
    if (belongsToProviderKey(k, providerId)) scopedQuiz[k] = v;
  }
  const scopedNotes: Record<string, string> = {};
  for (const [k, v] of Object.entries(current.notes)) {
    if (belongsToProviderKey(k, providerId)) scopedNotes[k] = v;
  }

  return {
    version: PROGRESS_EXPORT_VERSION,
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    appVersion,
    scopeProvider: providerId,
    exportedAt,
    progress: {
      schemaVersion: PROGRESS_SCHEMA_VERSION,
      updatedAt: exportedAt,
      completed: current.completed.filter((id) => belongsToProviderKey(id, providerId)),
      quiz: scopedQuiz,
      senior: current.senior.filter((id) => belongsToProviderKey(id, providerId)),
      notes: scopedNotes,
      simRuns: current.simRuns,
      seniorAttempts: (current.seniorAttempts || []).filter((item) => item.provider === providerId),
    },
  };
}

export function calculateProgressStorageSummary(
  current: ValidatedProgress,
): ProgressStorageSummary {
  const serialized = JSON.stringify(current);
  const estimatedBytes = new TextEncoder().encode(serialized).byteLength;

  const statFor = (p: Provider): ProviderStorageStat => ({
    completedCount: current.completed.filter((id) => id.startsWith(`${p}:`)).length,
    quizCount: Object.keys(current.quiz).filter((k) => k.startsWith(`${p}:`)).length,
    seniorCompletedCount: current.senior.filter((id) => id.startsWith(`${p}:`)).length,
    notesCount: Object.keys(current.notes).filter((k) => belongsToProviderKey(k, p)).length,
  });

  return {
    estimatedBytes,
    totalNotes: Object.keys(current.notes).length,
    byProvider: {
      aws: statFor('aws'),
      azure: statFor('azure'),
      gcp: statFor('gcp'),
    },
  };
}
