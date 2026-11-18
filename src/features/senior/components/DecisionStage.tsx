import { ArrowRight, BookOpen, Scale, ShieldAlert } from 'lucide-preact';
import type { Challenge } from '../../../data/senior';
import { seniorCurriculumLinks } from '../../../data/seniorCurriculumLinks';
import { seniorTradeoffs } from '../../../data/seniorTradeoffs';

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
  onOpenLesson: (moduleId: string, unitIndex: number) => void;
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
  onOpenLesson,
}: DecisionStageProps) {
  const tradeoff = seniorTradeoffs[current.id];
  const link = seniorCurriculumLinks[current.id];
  const selectedFeedback =
    decisionLocked && choice !== null && tradeoff ? tradeoff.optionFeedback[choice] : null;

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
      {tradeoff && (
        <section class="sr-tradeoff-grid" aria-label="Matriz de trade-offs de ingeniería">
          <div class="sr-tradeoff-item">
            <strong>
              <Scale size={14} /> Mitigación inmediata
            </strong>
            <p>{tradeoff.immediateMitigation}</p>
          </div>
          <div class="sr-tradeoff-item">
            <strong>Solución permanente</strong>
            <p>{tradeoff.permanentFix}</p>
          </div>
          <div class="sr-tradeoff-item">
            <strong>Impacto y reversibilidad</strong>
            <p>
              {tradeoff.userImpact} ({tradeoff.reversibility})
            </p>
          </div>
        </section>
      )}
      <div class="decision-options">
        {current.choices.map((c, i) => (
          <button
            type="button"
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
          {selectedFeedback && <p>{selectedFeedback}</p>}
          <p>{current.reason}</p>
          {!decisionCorrect && link && (
            <button
              type="button"
              class="btn btn-secondary btn-compact"
              onClick={() => onOpenLesson(link.moduleId, link.unitIndex)}
            >
              <BookOpen size={15} /> Refuerza este tema en el Aula: {link.moduleTitle}
            </button>
          )}
        </div>
      )}
      <p class="sr-hint">
        Las opciones son simplificadas. En producción se requieren autorización, cambios reversibles
        y verificación.
      </p>
      <div class="sr-report-actions">
        <button
          type="button"
          class="btn btn-secondary"
          disabled={choice === null || decisionLocked || !diagnosisReady}
          onClick={onConfirmDecision}
        >
          Confirmar decisión
        </button>
        {decisionLocked && !decisionCorrect && (
          <button type="button" class="btn btn-secondary" onClick={onResetDecision}>
            Reevaluar decisión
          </button>
        )}
        <button
          type="button"
          class="btn btn-primary"
          disabled={!decisionLocked}
          onClick={onAdvanceToReport}
        >
          Preparar informe <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
