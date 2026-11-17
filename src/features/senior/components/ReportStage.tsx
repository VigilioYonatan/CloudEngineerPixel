import { AlertTriangle, CheckCircle2, ClipboardCheck, Download, FileText } from 'lucide-preact';
import type { investigationFor } from '../../../data/seniorInvestigations';
import { REPORT_MIN_CHARS } from '../../../lib/seniorEvaluation.mjs';
import {
  REPORT_MAX_CHARS,
  type SeniorPostmortemExtras,
  type SeniorReport,
} from '../../../lib/seniorSession.mjs';

type InvestigationDetails = ReturnType<typeof investigationFor>;

const adr_extra_fields: readonly [keyof SeniorPostmortemExtras, string, string][] = [
  [
    'impact',
    'Impacto en usuarios / SLO (opcional)',
    'Duración, usuarios afectados o error budget consumido.',
  ],
  [
    'discardedHypotheses',
    'Hipótesis descartadas (opcional)',
    'Qué señales analizaste y descartaste con evidencia.',
  ],
  [
    'communicationPlan',
    'Comunicación y responsables (opcional)',
    'Canales internos, statuspage y propietario del seguimiento.',
  ],
  [
    'preventiveActions',
    'Acciones preventivas (opcional)',
    'Reglas CI/CD, alertas o GameDays para evitar recurrencia.',
  ],
];

type ReportStageProps = {
  details: InvestigationDetails;
  providerShort: string;
  answers: SeniorReport;
  postmortemExtras?: SeniorPostmortemExtras;
  inspected: readonly string[];
  cited: readonly string[];
  acknowledged: boolean;
  allReady: boolean;
  score: number;
  isCompleted: boolean;
  onUpdateSection: (section_key: keyof SeniorReport, value: string) => void;
  onUpdatePostmortemExtra: (key: keyof SeniorPostmortemExtras, value: string) => void;
  onToggleCitation: (exhibit_id: string, checked: boolean) => void;
  onChangeAcknowledged: (checked: boolean) => void;
  onSaveDraft: () => void;
  onExportReport: () => void;
  onExportPostmortemMd: () => void;
  onFinalizeSimulation: () => void;
};

export function ReportStage({
  details,
  providerShort,
  answers,
  postmortemExtras,
  inspected,
  cited,
  acknowledged,
  allReady,
  score,
  isCompleted,
  onUpdateSection,
  onUpdatePostmortemExtra,
  onToggleCitation,
  onChangeAcknowledged,
  onSaveDraft,
  onExportReport,
  onExportPostmortemMd,
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

  const citableExhibits = details.exhibits.filter((exhibit) => exhibit.id !== 'procedure');
  const citedDistractor = details.exhibits.find(
    (exhibit) => exhibit.isDistractor && cited.includes(exhibit.id),
  );

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
        <legend>Vincula las evidencias examinadas y descarta distractores</legend>
        <p class="sr-hint">
          Selecciona las señales causales reales y descarta el ruido colateral (contraprueba).
          Registrar una referencia no demuestra que tu interpretación sea correcta.
        </p>
        {citableExhibits.map((exhibit) => (
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
              {exhibit.name} · {exhibit.evidenceId || exhibit.id}
            </span>
          </label>
        ))}
      </fieldset>

      {citedDistractor && (
        <div role="alert" class="sr-distractor-warning">
          <AlertTriangle size={18} />
          <div>
            <strong>Has citado una contraprueba benigna (falsa alarma)</strong>
            <p>{citedDistractor.analysis} Desmarca esta señal no causal para continuar.</p>
          </div>
        </div>
      )}

      <details class="sr-adr-extras">
        <summary>Ampliación profesional Postmortem / ADR (opcional)</summary>
        <div class="sr-adr-grid">
          {adr_extra_fields.map(([key, label, placeholder]) => (
            <label class="sr-adr-field" key={key}>
              <span>{label}</span>
              <textarea
                rows={2}
                maxLength={REPORT_MAX_CHARS}
                value={postmortemExtras?.[key] || ''}
                placeholder={placeholder}
                onInput={(event) =>
                  onUpdatePostmortemExtra(key, (event.currentTarget as HTMLTextAreaElement).value)
                }
              />
            </label>
          ))}
        </div>
      </details>

      <div class="sr-report-actions">
        <button class="btn btn-secondary" onClick={onSaveDraft}>
          Guardar expediente
        </button>
        <button class="btn btn-secondary" onClick={onExportReport}>
          <Download size={17} /> Exportar informe JSON
        </button>
        <button class="btn btn-secondary" onClick={onExportPostmortemMd}>
          <FileText size={17} /> Descargar Postmortem / ADR (.md)
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
          Para registrar: dos señales causales examinadas y citadas (sin distractores), hipótesis
          correcta, contención confirmada, cuatro secciones completas y declaración de alcance.
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
