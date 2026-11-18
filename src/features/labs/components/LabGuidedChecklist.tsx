import { Check, ClipboardCheck, Play, Target, Terminal } from 'lucide-preact';
import type { SimulatorRouteId } from '../../../app/router';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import type { Module } from '../../../data/course';
import { navigate } from '../../../lib/state';
import { ProgressBar } from '../../../shared/ui/ProgressBar';
import { Tag } from '../../../shared/ui/Tag';
import { LAB_VERIFICATION_TASKS } from '../constants/labs.constants';

type LabGuidedChecklistProps = {
  module: Module;
  providerShort: string;
  serviceLabel: string;
  serviceCli: string;
  linkedSimulator: SimulatorRouteId;
  checks: readonly boolean[];
  onToggleCheck: (index: number, checked: boolean) => void;
};

export function LabGuidedChecklist({
  module: mod,
  providerShort,
  serviceLabel,
  serviceCli,
  linkedSimulator,
  checks,
  onToggleCheck,
}: LabGuidedChecklistProps) {
  const checked_count = checks.filter(Boolean).length;

  return (
    <>
      <section class="info-card">
        <div class="lab-guide-toolbar">
          <div class="card-heading" style={{ marginBottom: 0 }}>
            <Target size={19} />
            <h3>Modalidad A · Simulador en navegador y Objetivo</h3>
          </div>
          <button
            type="button"
            class="btn btn-secondary btn-compact"
            onClick={() => navigate('simulator', { simId: linkedSimulator })}
          >
            <Play size={14} /> Abrir simulador vinculado
          </button>
        </div>
        <p style={{ marginTop: '12px' }}>
          {mod.outcome} En tu ruta actual trabajamos con <strong>{serviceLabel}</strong> sobre datos
          sintéticos en navegador (cero cargos y cero credenciales).
        </p>
        <div class="lab-meta">
          <Tag kind="accent">Modalidad A · Sin cuenta cloud</Tag>
          <Tag>{providerShort}</Tag>
          <Tag>Datos sintéticos reproducibles</Tag>
        </div>
      </section>

      <section class="info-card">
        <div class="card-heading">
          <Terminal size={19} />
          <h3>Comando de referencia ({providerShort})</h3>
        </div>
        <p>Consulta de solo lectura equivalente en una cuenta aislada de laboratorio:</p>
        <CodeBlock
          code={serviceCli}
          language="bash"
          provider={providerShort}
          risk="read-only"
          contextLabel="terminal"
          prefixDollar
        />
      </section>

      <section class="info-card">
        <div class="card-heading">
          <ClipboardCheck size={19} />
          <h3>Checklist persistente de verificación</h3>
        </div>
        <div class="task-list">
          {LAB_VERIFICATION_TASKS.map((task, index) => (
            <label key={task} class={checks[index] ? 'task-checked' : ''}>
              <input
                type="checkbox"
                checked={checks[index]}
                onChange={(event) =>
                  onToggleCheck(index, (event.currentTarget as HTMLInputElement).checked)
                }
              />
              <span class="custom-check">{checks[index] && <Check size={14} />}</span>
              <span>{task}</span>
            </label>
          ))}
        </div>
        <ProgressBar value={checked_count} max={LAB_VERIFICATION_TASKS.length} />
        <small>
          {checked_count} de {LAB_VERIFICATION_TASKS.length} pasos verificados (guardados en este
          navegador por nube y módulo)
        </small>
      </section>
    </>
  );
}
