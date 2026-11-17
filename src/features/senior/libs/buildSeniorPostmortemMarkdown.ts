import type { SeniorPostmortemExtras, SeniorReport } from '../../../lib/seniorSession.mjs';

export type PostmortemExportPayload = {
  caseId: string;
  caseTitle: string;
  providerShort: string;
  severity: string;
  service: string;
  score: number;
  decisionLabel: string;
  inspected: string[];
  cited: string[];
  answers: SeniorReport;
  extras?: SeniorPostmortemExtras;
};

export function buildSeniorPostmortemMarkdown(payload: PostmortemExportPayload): string {
  const {
    caseId,
    caseTitle,
    providerShort,
    severity,
    service,
    score,
    decisionLabel,
    inspected,
    cited,
    answers,
    extras,
  } = payload;

  const lines = [
    `# Postmortem & ADR · ${caseId.toUpperCase()} — ${caseTitle}`,
    '',
    `- **Proveedor:** ${providerShort}`,
    `- **Servicio:** ${service}`,
    `- **Severidad:** ${severity}`,
    `- **Completitud local:** ${score}/100 (solo uso formativo)`,
    `- **Decisión de contención:** ${decisionLabel || 'Sin confirmar'}`,
    `- **Artefactos inspeccionados:** ${inspected.length ? inspected.join(', ') : 'Ninguno'}`,
    `- **Evidencias citadas:** ${cited.length ? cited.join(', ') : 'Ninguna'}`,
    '',
    '## 1. Causa raíz e hipótesis (ADR Context)',
    answers.cause || '_Sin documentar_',
    '',
    '## 2. Contención y mitigación (Decision)',
    answers.mitigation || '_Sin documentar_',
    '',
    '## 3. Reversión y condiciones de parada (Rollback Plan)',
    answers.rollback || '_Sin documentar_',
    '',
    '## 4. Validación y riesgo residual (Consequences)',
    answers.validation || '_Sin documentar_',
    '',
    '## 5. Impacto en usuarios y SLO',
    extras?.impact || '_Opcional: sin especificar_',
    '',
    '## 6. Hipótesis descartadas',
    extras?.discardedHypotheses || '_Opcional: sin especificar_',
    '',
    '## 7. Plan de comunicación y responsables',
    extras?.communicationPlan || '_Opcional: sin especificar_',
    '',
    '## 8. Acciones preventivas (Follow-ups)',
    extras?.preventiveActions || '_Opcional: sin especificar_',
    '',
  ];

  return lines.join('\n');
}

export function downloadMarkdownFile(markdown: string, filename: string) {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
