import { Check, CheckCircle2, Download, FlaskConical, ShieldCheck } from 'lucide-preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { Provider } from '../../../data/course';
import { getProviderMeta } from '../../../domain/providers';
import { appContextGuard } from '../../../lib/contextSwitchGuard';
import { navigate, notify, progress, setNotes } from '../../../lib/state';
import { ProgressBar } from '../../../shared/ui/ProgressBar';
import { Tag } from '../../../shared/ui/Tag';
import type { PortfolioProjectDefinition } from '../constants/projects.constants';
import { buildPortfolioAdrMarkdown } from '../libs/buildPortfolioMarkdown';

type ProjectDetailWorkspaceProps = {
  project: PortfolioProjectDefinition;
  cloudId: Provider;
};

function parseSavedDeliverables(raw: string | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function ProjectDetailWorkspace({ project, cloudId }: ProjectDetailWorkspaceProps) {
  const cloud_meta = getProviderMeta(cloudId);
  const check_key = `portfolio-check:${cloudId}:${project.id}`;
  const adr_key = `portfolio-adr:${cloudId}:${project.id}`;

  const [checked, setChecked] = useState<string[]>(() =>
    parseSavedDeliverables(progress.value.notes[check_key]),
  );
  const [adr_notes, setAdrNotes] = useState<string>(() => progress.value.notes[adr_key] || '');
  const [dirty, setDirty] = useState(false);

  const scope_ref = useRef({
    adrKey: adr_key,
    cloudShort: cloud_meta.short,
    adrNotes: adr_notes,
    dirty,
  });
  scope_ref.current = { adrKey: adr_key, cloudShort: cloud_meta.short, adrNotes: adr_notes, dirty };

  useEffect(() => {
    setChecked(parseSavedDeliverables(progress.value.notes[check_key]));
    setAdrNotes(progress.value.notes[adr_key] || '');
    setDirty(false);
  }, [check_key, adr_key]);

  useEffect(() => {
    return appContextGuard.registerFlusher({
      id: `portfolio-${project.id}`,
      scopeLabel: scope_ref.current.cloudShort,
      isDirty: () => scope_ref.current.dirty,
      flush: () => {
        setNotes(scope_ref.current.adrKey, scope_ref.current.adrNotes);
        setDirty(false);
      },
    });
  }, [project.id]);

  const toggleDeliverable = (deliverable: string, is_checked: boolean) => {
    const next = is_checked
      ? [...new Set([...checked, deliverable])]
      : checked.filter((item) => item !== deliverable);
    setChecked(next);
    setNotes(check_key, JSON.stringify(next));
  };

  const exportMarkdown = () => {
    setNotes(adr_key, adr_notes);
    setDirty(false);
    const md = buildPortfolioAdrMarkdown({
      project,
      cloudId,
      checkedDeliverables: checked,
      adrNotes: adr_notes,
    });
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `portfolio-adr-${cloudId}-${project.id}.md`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify('Plantilla ADR / Portfolio descargada en Markdown');
  };

  return (
    <div class="lab-layout">
      <div class="lab-main">
        <section class="info-card">
          <div class="project-head-tags">
            <Tag kind="accent">{project.levelLabel}</Tag>
            <Tag kind="gold">{cloud_meta.short}</Tag>
          </div>
          <h2>{project.title}</h2>
          <p>{project.objective}</p>
          <div class="project-stack-callout">
            <strong>Arquitectura de referencia en {cloud_meta.name}:</strong>
            <span>{project.cloudEquivalents[cloudId]}</span>
          </div>
          <p class="helper-text">
            <strong>Threat Model & SRE:</strong> {project.threatAndSreFocus}
          </p>
        </section>

        <section class="info-card project-deliverables">
          <h3>
            Checklist de entregables ({checked.length}/{project.deliverables.length})
          </h3>
          <div class="task-list">
            {project.deliverables.map((item) => {
              const is_done = checked.includes(item);
              return (
                <label key={item} class={is_done ? 'task-checked' : ''}>
                  <input
                    type="checkbox"
                    checked={is_done}
                    onChange={(event) =>
                      toggleDeliverable(item, (event.currentTarget as HTMLInputElement).checked)
                    }
                  />
                  <span class="custom-check">{is_done && <Check size={14} />}</span>
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
          <ProgressBar value={checked.length} max={project.deliverables.length} />
        </section>

        <section class="info-card">
          <label class="sr-field">
            <strong>Decisiones de arquitectura y justificación (ADR · {cloud_meta.short})</strong>
            <span>
              Documenta alternativas evaluadas, fronteras de confianza, RTO/RPO, presupuesto TCO y
              plan de limpieza sin incluir secretos reales.
            </span>
            <textarea
              rows={6}
              value={adr_notes}
              placeholder="Ej. Elegimos arquitectura de una sola nube con Multi-AZ para evitar latencia y sobrecosto de replicación inter-cloud..."
              onInput={(event) => {
                setAdrNotes((event.currentTarget as HTMLTextAreaElement).value);
                setDirty(true);
              }}
            />
          </label>
          <div class="action-row">
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => {
                setNotes(adr_key, adr_notes);
                setDirty(false);
                notify('Borrador ADR guardado en este navegador');
              }}
            >
              <CheckCircle2 size={16} /> Guardar borrador ADR
            </button>
            <button type="button" class="btn btn-primary" onClick={exportMarkdown}>
              <Download size={16} /> Exportar plantilla ADR / Portfolio (.md)
            </button>
          </div>
        </section>
      </div>

      <aside class="lab-aside">
        <section class="info-card">
          <div class="card-heading">
            <ShieldCheck size={19} />
            <h3>Rúbrica ponderada (100%)</h3>
          </div>
          <ul class="sr-proof">
            {project.rubric.map((criterion) => (
              <li key={criterion.id}>
                <strong>
                  {criterion.weight}% · {criterion.label}
                </strong>
                <p>{criterion.criteria}</p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            class="btn btn-secondary full-width"
            onClick={() => navigate('lab', project.targetModuleId)}
          >
            <FlaskConical size={16} /> Abrir laboratorio base
          </button>
        </section>
      </aside>
    </div>
  );
}
