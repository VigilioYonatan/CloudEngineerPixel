import { ArrowRight, CheckCircle2, Search, ShieldAlert } from 'lucide-preact';
import type { investigationFor } from '../../../data/seniorInvestigations';
import type { SeniorPlaybook } from '../../../data/seniorPlaybooks';

type InvestigationDetails = ReturnType<typeof investigationFor>;

type InvestigationStageProps = {
  details: InvestigationDetails;
  playbook: SeniorPlaybook | null;
  inspected: readonly string[];
  onInspectExhibit: (exhibit_id: string) => void;
  onAdvanceToDiagnosis: () => void;
};

export function InvestigationStage({
  details,
  playbook,
  inspected,
  onInspectExhibit,
  onAdvanceToDiagnosis,
}: InvestigationStageProps) {
  return (
    <>
      <section class="info-card">
        <div class="card-heading">
          <Search size={19} />
          <h3>Objetivo de investigación</h3>
        </div>
        <p>{details.objective}</p>
        <p class="sr-hint">
          Datos de laboratorio ficticios. No hay conexión con las cuentas cloud del alumno.
        </p>
      </section>

      {playbook && (
        <section class="info-card sr-ops-brief" aria-label="Plan de respuesta operativo">
          <div class="card-heading">
            <ShieldAlert size={19} />
            <h3>Briefing operativo del incidente</h3>
          </div>
          <p>
            <strong>Impacto:</strong> {playbook.impact}
          </p>
          <p>
            <strong>Responsable:</strong> {playbook.owner}
          </p>
          <h4>Pasos recomendados para analizar el caso</h4>
          <ol>
            {playbook.immediate.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
          <p class="sr-risk-warning">
            <strong>Acción a evitar:</strong> {playbook.prohibited}
          </p>
        </section>
      )}

      <div class="sr-exhibits">
        {details.exhibits.map((exhibit) => {
          const is_inspected = inspected.includes(exhibit.id);
          return (
            <section class="info-card sr-exhibit" key={exhibit.id}>
              <div class="sr-exhibit-heading">
                <div>
                  <small>{exhibit.kind.toUpperCase()}</small>
                  <h3>{exhibit.name}</h3>
                </div>
                <button class="btn btn-secondary" onClick={() => onInspectExhibit(exhibit.id)}>
                  {is_inspected ? <CheckCircle2 size={16} /> : <Search size={16} />}{' '}
                  {is_inspected ? 'Examinado' : 'Examinar'}
                </button>
              </div>
              <div class="terminal-block">
                <div class="terminal-bar">
                  <span class="terminal-lights">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>READ ONLY / SYNTHETIC EVIDENCE</span>
                </div>
                <pre>
                  <code>{exhibit.body}</code>
                </pre>
              </div>
              {is_inspected && <p class="sr-analysis">{exhibit.analysis}</p>}
            </section>
          );
        })}
      </div>

      <button class="btn btn-primary" onClick={onAdvanceToDiagnosis}>
        Formular diagnóstico <ArrowRight size={16} />
      </button>
    </>
  );
}
