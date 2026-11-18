import {
  BookOpen,
  ChevronRight,
  CloudDownload,
  FileText,
  FlaskConical,
  Laptop,
} from 'lucide-preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { AccessibleTabs } from '../../../components/ui/AccessibleTabs';
import { moduleService, services } from '../../../data/course';
import { getLabMetadata } from '../../../data/labMetadata';
import { moduleLabKey, resolveActiveModule } from '../../../domain/progressMetrics';
import { getProviderMeta } from '../../../domain/providers';
import { appContextGuard } from '../../../lib/contextSwitchGuard';
import {
  completeTopic,
  currentModule,
  navigate,
  notify,
  progress,
  provider,
  setNotes,
} from '../../../lib/state';
import { LabDeliverableAside } from '../components/LabDeliverableAside';
import { LabEvidenceNotebook } from '../components/LabEvidenceNotebook';
import { LabGuidedChecklist } from '../components/LabGuidedChecklist';
import { LabLocalSandboxPanel } from '../components/LabLocalSandboxPanel';
import { LabMarkdownGuidePanel } from '../components/LabMarkdownGuidePanel';
import { LabMetadataCard } from '../components/LabMetadataCard';
import { LabRealAccountGuide } from '../components/LabRealAccountGuide';
import { LAB_VERIFICATION_TASKS } from '../constants/labs.constants';
import {
  buildLabEvidenceJson,
  buildLabEvidenceMarkdown,
  downloadLabTextFile,
  labChecklistStorageKey,
  readPersistedLabState,
  serializePersistedLabState,
  type LabModalityTab,
} from '../libs/labPersistenceAndExport';

export function LabPage() {
  const mod = resolveActiveModule(currentModule.value);
  const active_cloud = provider.value;
  const cloud_meta = getProviderMeta(active_cloud);
  const service_entry = services[active_cloud][moduleService(mod.id)];
  const lab_meta = getLabMetadata(mod.id);
  const lab_storage_key = moduleLabKey(mod, active_cloud);
  const checks_storage_key = labChecklistStorageKey(active_cloud, mod.id);

  const initialPersisted = readPersistedLabState(
    progress.value.notes,
    active_cloud,
    mod.id,
    LAB_VERIFICATION_TASKS.length,
  );
  const [checks, setChecks] = useState<boolean[]>(initialPersisted.checks);
  const [mode, setMode] = useState<LabModalityTab>(initialPersisted.mode);
  const [evidence, setEvidence] = useState<string>(
    () => progress.value.notes[lab_storage_key] || '',
  );
  const [dirty, setDirty] = useState(false);

  const draft_ref = useRef({
    storageKey: lab_storage_key,
    cloudShort: cloud_meta.short,
    evidence,
    dirty,
  });
  draft_ref.current = {
    storageKey: lab_storage_key,
    cloudShort: cloud_meta.short,
    evidence,
    dirty,
  };

  useEffect(() => {
    const hydrated = readPersistedLabState(
      progress.value.notes,
      active_cloud,
      mod.id,
      LAB_VERIFICATION_TASKS.length,
    );
    setChecks(hydrated.checks);
    setMode(hydrated.mode);
    setEvidence(progress.value.notes[lab_storage_key] || '');
    setDirty(false);
  }, [active_cloud, mod.id, lab_storage_key]);

  useEffect(() => {
    return appContextGuard.registerFlusher({
      id: 'lab-evidence-notebook',
      scopeLabel: draft_ref.current.cloudShort,
      isDirty: () => draft_ref.current.dirty,
      flush: () => {
        if (setNotes(draft_ref.current.storageKey, draft_ref.current.evidence)) {
          setDirty(false);
        }
      },
    });
  }, []);

  const persistChecklistAndMode = (nextChecks: boolean[], nextMode: LabModalityTab) => {
    setNotes(
      checks_storage_key,
      serializePersistedLabState({ checks: nextChecks, mode: nextMode }),
    );
  };

  const handleExportEvidence = (format: 'md' | 'json') => {
    try {
      const payload = {
        moduleId: mod.id,
        moduleTitle: mod.title,
        provider: active_cloud,
        providerName: cloud_meta.name,
        serviceLabel: service_entry.label,
        modality: mode,
        tasks: LAB_VERIFICATION_TASKS,
        checks,
        evidenceNotes: evidence,
      };
      if (format === 'md') {
        downloadLabTextFile(
          buildLabEvidenceMarkdown(payload),
          `evidencia-lab-${active_cloud}-${mod.id}.md`,
          'text/markdown',
        );
      } else {
        downloadLabTextFile(
          buildLabEvidenceJson(payload),
          `evidencia-lab-${active_cloud}-${mod.id}.json`,
          'application/json',
        );
      }
      notify('Reporte de práctica exportado');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'No se pudo exportar');
    }
  };

  const all_checked = checks.every(Boolean);
  const is_lab_done = progress.value.completed.includes(lab_storage_key);

  return (
    <main class="page-container">
      <div class="breadcrumb">
        <button type="button" onClick={() => navigate('lesson', mod.id)}>
          Volver al módulo
        </button>
        <ChevronRight size={14} /> Laboratorio
      </div>
      <div class="page-intro lab-heading">
        <div>
          <div class="page-kicker">
            <FlaskConical size={17} /> LABORATORIO · {cloud_meta.short}
          </div>
          <h1>
            Laboratorio: <span>{mod.title}</span>
          </h1>
          <p>
            No se ejecuta infraestructura real en este navegador (Simulador, Local y Cuenta real).
          </p>
        </div>
        <div class="lab-hero-icon">
          <FlaskConical size={47} />
        </div>
      </div>

      <LabMetadataCard meta={lab_meta} provider={active_cloud} providerShort={cloud_meta.short} />

      <AccessibleTabs
        ariaLabel="Modalidades del laboratorio"
        className="lab-tabs"
        activeClassName="tab-active"
        activeId={mode}
        onSelect={(nextMode) => {
          setMode(nextMode);
          persistChecklistAndMode(checks, nextMode);
        }}
        items={[
          { id: 'guided', label: 'Modalidad A · Guía y checklist', icon: <BookOpen size={17} /> },
          { id: 'local', label: 'Modalidad B · Local Docker/Kind', icon: <Laptop size={17} /> },
          {
            id: 'real',
            label: 'Modalidad C · Práctica en cuenta real',
            icon: <CloudDownload size={17} />,
          },
          { id: 'markdown', label: 'Cuaderno Markdown', icon: <FileText size={17} /> },
        ]}
      />

      <div class="lab-layout">
        <div class="lab-main">
          {mode === 'guided' && (
            <LabGuidedChecklist
              module={mod}
              providerShort={cloud_meta.short}
              serviceLabel={service_entry.label}
              serviceCli={service_entry.cli}
              linkedSimulator={lab_meta.linkedSimulator}
              checks={checks}
              onToggleCheck={(target_idx, next_checked) => {
                const next = checks.map((val, idx) => (idx === target_idx ? next_checked : val));
                setChecks(next);
                persistChecklistAndMode(next, mode);
              }}
            />
          )}
          {mode === 'local' && <LabLocalSandboxPanel />}
          {mode === 'markdown' && (
            <LabMarkdownGuidePanel provider={active_cloud} moduleId={mod.id} />
          )}
          {mode === 'real' && (
            <LabRealAccountGuide
              serviceLabel={service_entry.label}
              serviceDocUrl={service_entry.doc}
            />
          )}

          <LabEvidenceNotebook
            evidence={evidence}
            onChangeEvidence={(val) => {
              setEvidence(val);
              setDirty(true);
            }}
            onSaveEvidence={() => {
              if (setNotes(lab_storage_key, evidence)) {
                setDirty(false);
                notify('Evidencias guardadas en este navegador');
              }
            }}
            onExportEvidence={handleExportEvidence}
          />
        </div>

        <LabDeliverableAside
          isLabDone={is_lab_done}
          allChecked={all_checked}
          checkedCount={checks.filter(Boolean).length}
          onCompleteLab={() => completeTopic(`${mod.id}:lab`, active_cloud)}
          onOpenSenior={() => navigate('senior')}
        />
      </div>
    </main>
  );
}
