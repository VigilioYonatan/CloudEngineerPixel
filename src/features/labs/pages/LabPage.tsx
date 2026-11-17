import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CloudDownload,
  FlaskConical,
} from 'lucide-preact';
import { useEffect, useRef, useState } from 'preact/hooks';
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
import { LabRealAccountGuide } from '../components/LabRealAccountGuide';
import { LAB_VERIFICATION_TASKS } from '../constants/labs.constants';

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
  const [mode, setMode] = useState<'guided' | 'real'>('guided');

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

  const checked_count = checks.filter(Boolean).length;
  const all_checked = checks.every(Boolean);

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

      <div class="lab-tabs">
        <button class={mode === 'guided' ? 'tab-active' : ''} onClick={() => setMode('guided')}>
          <BookOpen size={17} /> Guía y checklist
        </button>
        <button class={mode === 'real' ? 'tab-active' : ''} onClick={() => setMode('real')}>
          <CloudDownload size={17} /> Práctica en cuenta real
        </button>
      </div>

      <div class="lab-layout">
        <div class="lab-main">
          {mode === 'guided' ? (
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
          ) : (
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
              Anota lo aprendido, un problema encontrado y la forma de verificarlo. Evita guardar
              secretos.
            </p>
            <textarea
              rows={5}
              value={evidence}
              placeholder="Ejemplo: validé el listado de VPC y comprobé la región de mi proyecto..."
              onInput={(event) => {
                setEvidence((event.currentTarget as HTMLTextAreaElement).value);
                setDirty(true);
              }}
            />
            <button
              class="btn btn-secondary"
              onClick={() => {
                setNotes(lab_storage_key, evidence);
                setDirty(false);
                notify('Notas guardadas en este navegador');
              }}
            >
              <Check size={16} /> Guardar evidencias
            </button>
          </section>
        </div>

        <aside class="lab-aside">
          <div class="info-card lab-sidecard">
            <h3>Tu evaluación</h3>
            <p>
              La finalización de este laboratorio es una declaración local del alumno, no una
              validación de infraestructura real.
            </p>
            <div class="score-ring">
              {checked_count}/{LAB_VERIFICATION_TASKS.length}
            </div>
            <button
              class="btn btn-primary full-width"
              disabled={!all_checked}
              onClick={() => completeTopic(`${mod.id}:lab`, active_cloud)}
            >
              {progress.value.completed.includes(lab_storage_key)
                ? 'Laboratorio registrado'
                : 'Registrar práctica'}{' '}
              <CheckCircle2 size={16} />
            </button>
            {!all_checked && (
              <small>Completa los cinco controles para habilitar el registro.</small>
            )}
          </div>
          <div class="info-card">
            <strong>Competencias</strong>
            <div class="module-tags">
              {mod.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <button class="text-action" onClick={() => navigate('simulator')}>
              Abrir simuladores <ArrowRight size={17} />
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
