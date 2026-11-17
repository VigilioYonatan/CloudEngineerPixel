import { ArrowRight, ShieldAlert } from 'lucide-preact';
import type { Challenge } from '../../../data/senior';

type DecisionStageProps = {
  challenge: Challenge;
  choice: number | null;
  decisionLocked: boolean;
  decisionCorrect: boolean;
  diagnosisReady: boolean;
  setChoice: (index: number | null) => void;
  onConfirmDecision: () => void;
  onResetDecision: () => void;
  onAdvanceToReport: () => void;
};

export function DecisionStage({
  challenge: current,
  choice,
  decisionLocked,
  decisionCorrect,
  diagnosisReady,
  setChoice,
  onConfirmDecision,
  onResetDecision,
  onAdvanceToReport,
}: DecisionStageProps) {
  return (
    <section class="info-card">
      <div class="card-heading">
        <ShieldAlert size={20} />
        <h3>Decisión de contención</h3>
      </div>
      <p>
        <strong>Señal inicial:</strong> {current.signal}
      </p>
      <p>
        Selecciona la primera respuesta que puedes defender con los datos observados.{' '}
        {diagnosisReady ? 'Diagnóstico verificado.' : 'Debes completar primero el diagnóstico.'}
      </p>
      <div class="decision-options">
        {current.choices.map((c, i) => (
          <button
            class={choice === i ? 'decision-selected' : ''}
            key={c}
            onClick={() => setChoice(i)}
            disabled={decisionLocked}
          >
            <span>{String.fromCharCode(65 + i)}</span>
            {c}
          </button>
        ))}
      </div>
      {decisionLocked && (
        <div
          class={`quiz-feedback ${decisionCorrect ? 'feedback-success' : 'feedback-warn'}`}
          role="status"
        >
          <strong>
            {decisionCorrect ? 'Decisión inicial defendible' : 'Esta opción introduce riesgos'}
          </strong>
          <p>{current.reason}</p>
        </div>
      )}
      <p class="sr-hint">
        Las opciones son simplificadas. En producción se requieren autorización, cambios reversibles
        y verificación.
      </p>
      <div class="sr-report-actions">
        <button
          class="btn btn-secondary"
          disabled={choice === null || decisionLocked || !diagnosisReady}
          onClick={onConfirmDecision}
        >
          Confirmar decisión
        </button>
        {decisionLocked && !decisionCorrect && (
          <button class="btn btn-secondary" onClick={onResetDecision}>
            Reevaluar decisión
          </button>
        )}
        <button class="btn btn-primary" disabled={!decisionLocked} onClick={onAdvanceToReport}>
          Preparar informe <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
