import { CheckCircle2, ClipboardCheck, Download, FileText } from 'lucide-preact';
import type { investigationFor } from '../../../data/seniorInvestigations';
import { REPORT_MIN_CHARS } from '../../../lib/seniorEvaluation.mjs';
import { REPORT_MAX_CHARS, type SeniorReport } from '../../../lib/seniorSession.mjs';

type InvestigationDetails = ReturnType<typeof investigationFor>;

type ReportStageProps = {
  details: InvestigationDetails;
  providerShort: string;
  answers: SeniorReport;
  inspected: readonly string[];
  cited: readonly string[];
  acknowledged: boolean;
  allReady: boolean;
  score: number;
  isCompleted: boolean;
  onUpdateSection: (section_key: keyof SeniorReport, value: string) => void;
  onToggleCitation: (exhibit_id: string, checked: boolean) => void;
  onChangeAcknowledged: (checked: boolean) => void;
  onSaveDraft: () => void;
  onExportReport: () => void;
  onFinalizeSimulation: () => void;
};

export function ReportStage({
  details,
  providerShort,
  answers,
  inspected,
  cited,
  acknowledged,
  allReady,
  score,
  isCompleted,
  onUpdateSection,
  onToggleCitation,
  onChangeAcknowledged,
  onSaveDraft,
  onExportReport,
  onFinalizeSimulation,
}: ReportStageProps) {
  const report_sections: readonly [keyof SeniorReport, string, string][] = [
    ['cause', 'Causa raíz e hipótesis', details.questions[0]],
    ['mitigation', 'Contención y mitigación', details.questions[1]],
    [
      'rollback',
      'Reversión y condiciones de parada',
      'Define la reversión, sus disparadores y un plan de contingencia autorizado.',
    ],
    ['validation', 'Validación y riesgo residual', details.questions[2]],
  ];

  return (
    <section class="info-card">
      <div class="card-heading">
        <FileText size={20} />
        <h3>Informe técnico estructurado</h3>
      </div>
      <p>
        Redacta tu propio análisis. Cada apartado requiere al menos {REPORT_MIN_CHARS} caracteres.
        El sistema verifica completitud, <strong>no la calidad técnica del texto</strong>.
      </p>
      {report_sections.map(([section_key, title, question]) => (
        <label class="sr-field" key={section_key}>
          <strong>{title}</strong>
          <span>{question}</span>
          <textarea
            rows={5}
            value={answers[section_key]}
            maxLength={REPORT_MAX_CHARS}
            placeholder="Describe señales, razonamiento, trade-offs y verificaciones..."
            onInput={(event) =>
              onUpdateSection(
                section_key,
                (event.currentTarget as HTMLTextAreaElement).value.slice(0, REPORT_MAX_CHARS),
              )
            }
          />
          <small>
            {answers[section_key].trim().length} / {REPORT_MIN_CHARS} caracteres mínimos
          </small>
        </label>
      ))}

      <fieldset class="sr-citations">
        <legend>Vincula las evidencias examinadas a tu informe</legend>
        <p class="sr-hint">
          Selecciona las dos señales principales. Registrar una referencia no demuestra que tu
          interpretación sea correcta.
        </p>
        {details.exhibits.slice(0, 2).map((exhibit) => (
          <label key={exhibit.id}>
            <input
              type="checkbox"
              checked={cited.includes(exhibit.id)}
              disabled={!inspected.includes(exhibit.id)}
              onChange={(event) =>
                onToggleCitation(exhibit.id, (event.currentTarget as HTMLInputElement).checked)
              }
            />
            <span>
              {exhibit.name} · {exhibit.id}
            </span>
          </label>
        ))}
      </fieldset>

      <div class="sr-report-actions">
        <button class="btn btn-secondary" onClick={onSaveDraft}>
          Guardar expediente
        </button>
        <button class="btn btn-secondary" onClick={onExportReport}>
          <Download size={17} /> Exportar informe JSON
        </button>
      </div>

      <label class="sr-attestation">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(event) =>
            onChangeAcknowledged((event.currentTarget as HTMLInputElement).checked)
          }
        />
        <span>
          He contrastado las evidencias y entiendo que esta simulación no sustituye una revisión de
          un instructor.
        </span>
      </label>

      <button class="btn btn-gold" disabled={!allReady} onClick={onFinalizeSimulation}>
        <ClipboardCheck size={17} /> Registrar simulación ({score}/100)
      </button>

      {!allReady && (
        <p class="sr-hint">
          Para registrar: dos señales examinadas, hipótesis correcta, contención confirmada,
          evidencias citadas, cuatro secciones completas y declaración de alcance.
        </p>
      )}

      {isCompleted && (
        <p class="sr-complete">
          <CheckCircle2 size={17} /> Simulación registrada para {providerShort}.
        </p>
      )}
    </section>
  );
}
