import { Check, ClipboardCheck, Copy, Target, Terminal } from 'lucide-preact';
import type { Module } from '../../../data/course';
import { notify } from '../../../lib/state';
import { ProgressBar } from '../../../shared/ui/ProgressBar';
import { Tag } from '../../../shared/ui/Tag';
import { LAB_VERIFICATION_TASKS } from '../constants/labs.constants';

type LabGuidedChecklistProps = {
  module: Module;
  providerShort: string;
  serviceLabel: string;
  serviceCli: string;
  checks: readonly boolean[];
  onToggleCheck: (index: number, checked: boolean) => void;
};

export function LabGuidedChecklist({
  module: mod,
  providerShort,
  serviceLabel,
  serviceCli,
  checks,
  onToggleCheck,
}: LabGuidedChecklistProps) {
  const checked_count = checks.filter(Boolean).length;

  return (
    <>
      <section class="info-card">
        <div class="card-heading">
          <Target size={19} />
          <h3>Objetivo de la práctica</h3>
        </div>
        <p>
          {mod.outcome} En tu ruta actual utilizaremos <strong>{serviceLabel}</strong>.
        </p>
        <div class="lab-meta">
          <Tag>Sin ejecución automática</Tag>
          <Tag kind="accent">{providerShort}</Tag>
          <Tag>20–45 min</Tag>
        </div>
      </section>

      <section class="info-card">
        <div class="card-heading">
          <Terminal size={19} />
          <h3>Comando inicial</h3>
        </div>
        <p>
          Consulta los recursos disponibles. Antes de iniciar sesión, verifica que el contexto
          corresponda a una cuenta de laboratorio.
        </p>
        <div class="terminal-block">
          <div class="terminal-bar">
            <span class="terminal-lights">
              <i />
              <i />
              <i />
            </span>
            <span>terminal</span>
            <button
              onClick={() =>
                navigator.clipboard
                  .writeText(serviceCli)
                  .then(() => notify('Comando copiado'))
                  .catch(() => notify('Copia manualmente el comando'))
              }
            >
              <Copy size={14} /> Copiar
            </button>
          </div>
          <pre>
            <code>$ {serviceCli}</code>
          </pre>
        </div>
        <p class="helper-text">
          Si no cuentas con credenciales, estudia la salida esperada en la documentación oficial y
          completa la modalidad conceptual.
        </p>
      </section>

      <section class="info-card">
        <div class="card-heading">
          <ClipboardCheck size={19} />
          <h3>Checklist de verificación</h3>
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
          {checked_count} de {LAB_VERIFICATION_TASKS.length} pasos verificados
        </small>
      </section>
    </>
  );
}
