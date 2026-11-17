import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CloudDownload,
  FileText,
  FlaskConical,
} from 'lucide-preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { AccessibleTabs } from '../../../components/ui/AccessibleTabs';
import { moduleService, services } from '../../../data/course';
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
import { Tag } from '../../../shared/ui/Tag';
import { LabGuidedChecklist } from '../components/LabGuidedChecklist';
import { LabMarkdownGuidePanel } from '../components/LabMarkdownGuidePanel';
import { LabRealAccountGuide } from '../components/LabRealAccountGuide';
import { LAB_VERIFICATION_TASKS } from '../constants/labs.constants';

type LabTabId = 'guided' | 'markdown' | 'real';

export function LabPage() {
  const mod = resolveActiveModule(currentModule.value);
  const active_cloud = provider.value;
  const cloud_meta = getProviderMeta(active_cloud);
  const service_entry = services[active_cloud][moduleService(mod.id)];
  const lab_storage_key = moduleLabKey(mod, active_cloud);

  const [checks, setChecks] = useState<boolean[]>(() => LAB_VERIFICATION_TASKS.map(() => false));
  const [evidence, setEvidence] = useState<string>(
    () => progress.value.notes[lab_storage_key] || '',
  );
  const [dirty, setDirty] = useState(false);
  const [mode, setMode] = useState<LabTabId>('guided');

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
    setEvidence(progress.value.notes[lab_storage_key] || '');
    setDirty(false);
  }, [lab_storage_key]);

  useEffect(() => {
    return appContextGuard.registerFlusher({
      id: 'lab-evidence-notebook',
      scopeLabel: draft_ref.current.cloudShort,
      isDirty: () => draft_ref.current.dirty,
      flush: () => {
        setNotes(draft_ref.current.storageKey, draft_ref.current.evidence);
        setDirty(false);
      },
    });
  }, []);

  const all_checked = checks.every(Boolean);
  const is_lab_done = progress.value.completed.includes(lab_storage_key);

  return (
    <main class="page-container">
      <div class="breadcrumb">
        <button onClick={() => navigate('lesson', mod.id)}>Volver al módulo</button>
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
            Práctica guiada de ingeniería. No se ejecuta infraestructura real en este navegador.
          </p>
        </div>
        <div class="lab-hero-icon">
          <FlaskConical size={47} />
        </div>
      </div>

      <AccessibleTabs
        ariaLabel="Modalidades del laboratorio"
        className="lab-tabs"
        activeClassName="tab-active"
        activeId={mode}
        onSelect={setMode}
        items={[
          { id: 'guided', label: 'Guía y checklist', icon: <BookOpen size={17} /> },
          { id: 'markdown', label: 'Cuaderno Markdown', icon: <FileText size={17} /> },
          { id: 'real', label: 'Práctica en cuenta real', icon: <CloudDownload size={17} /> },
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
              checks={checks}
              onToggleCheck={(target_idx, next_checked) =>
                setChecks((prev) =>
                  prev.map((current_val, idx) => (idx === target_idx ? next_checked : current_val)),
                )
              }
            />
          )}
          {mode === 'markdown' && (
            <LabMarkdownGuidePanel provider={active_cloud} moduleId={mod.id} />
          )}
          {mode === 'real' && (
            <LabRealAccountGuide
              serviceLabel={service_entry.label}
              serviceDocUrl={service_entry.doc}
            />
          )}

          <section class="info-card">
            <div class="card-heading">
              <BookMarked size={19} />
              <h3>Cuaderno de evidencias</h3>
            </div>
            <p>
              Documenta arquitectura, pruebas realizadas, resultados y cómo limpiaste los recursos.
              No pegues secretos ni tokens.
            </p>
            <textarea
              rows={6}
              value={evidence}
              onInput={(event) => {
                setEvidence((event.currentTarget as HTMLTextAreaElement).value);
                setDirty(true);
              }}
              placeholder="Ejemplo: validé el listado de VPC, registré el rango CIDR y revisé las rutas sin exponer puertos públicos."
            />
            <button
              class="btn btn-secondary"
              onClick={() => {
                setNotes(lab_storage_key, evidence);
                setDirty(false);
                notify('Evidencias guardadas en este navegador');
              }}
            >
              Guardar evidencias
            </button>
          </section>
        </div>

        <aside class="lab-aside">
          <div class="info-card lab-sidecard">
            <Tag kind="accent">ENTREGABLE</Tag>
            <h3>Criterio de aprobación</h3>
            <p>
              Completa el checklist de seguridad, registra tus evidencias y confirma la práctica.
            </p>
            <div class="score-ring">
              {is_lab_done ? '100%' : `${checks.filter(Boolean).length * 20}%`}
            </div>
            <button
              class={`btn full-width ${is_lab_done ? 'btn-complete' : 'btn-primary'}`}
              disabled={!all_checked && !is_lab_done}
              onClick={() => completeTopic(`${mod.id}:lab`, active_cloud)}
            >
              {is_lab_done ? (
                <>
                  <CheckCircle2 size={17} /> Laboratorio registrado
                </>
              ) : (
                <>
                  <Check size={17} /> Registrar práctica
                </>
              )}
            </button>
            <button
              class="btn btn-ghost full-width"
              onClick={() => navigate('senior')}
              style={{ marginTop: '10px' }}
            >
              Probar desafíos Senior <ArrowRight size={16} />
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
