import { CheckCircle2, Code2, Eye, ShieldAlert } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import type { Provider } from '../../../data/course';
import { evaluateSelectedCodeLine, getCodeReviewExercise } from '../../../data/seniorCodeReviews';

type CodeReviewLabProps = {
  caseId: string;
  provider: Provider;
};

export function CodeReviewLab({ caseId, provider }: CodeReviewLabProps) {
  const exercise = getCodeReviewExercise(caseId, provider);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [showRemediated, setShowRemediated] = useState(false);

  useEffect(() => {
    setSelectedLine(null);
    setShowRemediated(false);
  }, [caseId, provider]);

  if (!exercise) return null;

  const evaluation =
    selectedLine !== null ? evaluateSelectedCodeLine(exercise, selectedLine) : null;

  return (
    <section class="info-card sr-codereview" aria-label="Laboratorio de revisión de código">
      <div class="card-heading">
        <Code2 size={19} />
        <h3>CodeReviewLab · {exercise.title}</h3>
      </div>
      <p class="sr-hint">
        Haz clic sobre la línea numerada que contiene el defecto de seguridad o resiliencia y
        compara luego contra la versión remediada.
      </p>

      <div class="codereview-lines" role="toolbar" aria-label="Líneas de configuración">
        {exercise.lines.map((lineText, idx) => {
          const lineNumber = idx + 1;
          const isSelected = selectedLine === lineNumber;
          const isDefect = exercise.defectLineNumbers.includes(lineNumber);
          const stateClass = isSelected ? (isDefect ? 'line-hit' : 'line-miss') : '';

          return (
            <button
              key={`${caseId}-${lineNumber}`}
              type="button"
              aria-pressed={isSelected}
              class={`codereview-line-btn ${stateClass}`}
              onClick={() => setSelectedLine(lineNumber)}
            >
              <span class="codereview-lineno">{String(lineNumber).padStart(2, '0')}</span>
              <code>{lineText}</code>
            </button>
          );
        })}
      </div>

      {evaluation && (
        <div
          role="status"
          class={`quiz-feedback ${evaluation.isDefect ? 'feedback-success' : 'feedback-warn'}`}
        >
          <strong>
            {evaluation.isDefect ? (
              <>
                <CheckCircle2 size={15} /> Línea defectuosa identificada (Línea {selectedLine})
              </>
            ) : (
              <>
                <ShieldAlert size={15} /> Línea {selectedLine} sin defecto raíz primario
              </>
            )}
          </strong>
          <p>{evaluation.message}</p>
        </div>
      )}

      <div class="action-row" style={{ marginTop: '12px' }}>
        <button
          type="button"
          class="btn btn-secondary btn-compact"
          onClick={() => setShowRemediated((prev) => !prev)}
        >
          <Eye size={15} /> {showRemediated ? 'Ocultar versión remediada' : 'Ver versión remediada'}
        </button>
      </div>

      {showRemediated && (
        <div class="codereview-remediated">
          <strong>Versión remediada segura ({provider.toUpperCase()}):</strong>
          <CodeBlock
            code={exercise.remediatedCode}
            language={exercise.language}
            provider={provider}
            risk="read-only"
          />
        </div>
      )}
    </section>
  );
}
