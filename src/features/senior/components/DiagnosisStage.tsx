import { ArrowRight, BookOpen, Search } from 'lucide-preact';
import { seniorCurriculumLinks } from '../../../data/seniorCurriculumLinks';
import type { seniorDiagnostics } from '../../../data/seniorDiagnostics';
import { seniorTradeoffs } from '../../../data/seniorTradeoffs';

type DiagnosticEntry = (typeof seniorDiagnostics)[string];

type DiagnosisStageProps = {
  caseId: string;
  diagnostic: DiagnosticEntry;
  diagnosisChoice: number | null;
  diagnosisLocked: boolean;
  diagnosisCorrect: boolean;
  inspectedPrimary: boolean;
  diagnosisReady: boolean;
  onSelectDiagnosis: (index: number) => void;
  onConfirmDiagnosis: () => void;
  onResetDiagnosis: () => void;
  onAdvanceToDecision: () => void;
  onOpenLesson: (moduleId: string, unitIndex: number) => void;
};

export function DiagnosisStage({
  caseId,
  diagnostic,
  diagnosisChoice,
  diagnosisLocked,
  diagnosisCorrect,
  inspectedPrimary,
  diagnosisReady,
  onSelectDiagnosis,
  onConfirmDiagnosis,
  onResetDiagnosis,
  onAdvanceToDecision,
  onOpenLesson,
}: DiagnosisStageProps) {
  const link = seniorCurriculumLinks[caseId];
  const tradeoff = seniorTradeoffs[caseId];

  return (
    <section class="info-card sr-diagnostic">
      <div class="card-heading">
        <Search size={20} />
        <h3>Diagnóstico técnico del incidente</h3>
      </div>
      <p>
        Contrasta al menos dos señales del expediente antes de confirmar una hipótesis. La respuesta
        se evalúa con las pistas de esta simulación.
      </p>
      <p>
        <strong>{diagnostic.question}</strong>
      </p>
      <div class="decision-options">
        {diagnostic.choices.map((item, index) => (
          <button
            type="button"
            class={diagnosisChoice === index ? 'decision-selected' : ''}
            key={item}
            disabled={diagnosisLocked}
            onClick={() => onSelectDiagnosis(index)}
          >
            <span>{String.fromCharCode(65 + index)}</span>
            {item}
          </button>
        ))}
      </div>
      {diagnosisLocked && (
        <div
          role="status"
          class={`quiz-feedback ${diagnosisCorrect ? 'feedback-success' : 'feedback-warn'}`}
        >
          <strong>
            {diagnosisCorrect
              ? 'Hipótesis respaldada por las pistas'
              : 'La hipótesis necesita revisión'}
          </strong>
          <p>{diagnostic.explanation}</p>
          {tradeoff && (
            <p class="sr-hint">
              <strong>Riesgo de seguridad / operación:</strong> {tradeoff.securityRisk}
            </p>
          )}
          {!diagnosisCorrect && link && (
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
        {inspectedPrimary
          ? '✓ Dos señales examinadas'
          : 'Primero examina los dos artefactos principales en la etapa Investigar.'}
      </p>
      <div class="sr-report-actions">
        <button
          type="button"
          class="btn btn-secondary"
          disabled={!inspectedPrimary || diagnosisChoice === null || diagnosisLocked}
          onClick={onConfirmDiagnosis}
        >
          Confirmar hipótesis
        </button>
        {diagnosisLocked && !diagnosisCorrect && (
          <button type="button" class="btn btn-secondary" onClick={onResetDiagnosis}>
            Intentar otra hipótesis
          </button>
        )}
        <button
          type="button"
          class="btn btn-primary"
          disabled={!diagnosisReady}
          onClick={onAdvanceToDecision}
        >
          Definir contención <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
