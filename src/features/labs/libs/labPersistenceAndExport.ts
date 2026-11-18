import type { Provider } from '../../../data/course';
import { detectAccidentalSecrets } from '../../../lib/secretGuard.mjs';

export type LabModalityTab = 'guided' | 'local' | 'real' | 'markdown';

export type PersistedLabState = {
  checks: boolean[];
  mode: LabModalityTab;
};

const VALID_MODES: readonly LabModalityTab[] = ['guided', 'local', 'real', 'markdown'];

export function labChecklistStorageKey(provider: Provider, moduleId: string): string {
  return `lab-checks:${provider}:${moduleId}`;
}

export function readPersistedLabState(
  notes: Record<string, string>,
  provider: Provider,
  moduleId: string,
  taskCount: number,
): PersistedLabState {
  const defaultChecks = Array.from({ length: taskCount }, () => false);
  const raw = notes[labChecklistStorageKey(provider, moduleId)];
  if (!raw) return { checks: defaultChecks, mode: 'guided' };
  try {
    const parsed = JSON.parse(raw) as Partial<PersistedLabState>;
    const checks = Array.isArray(parsed.checks)
      ? defaultChecks.map((_, idx) => Boolean(parsed.checks?.[idx]))
      : defaultChecks;
    const mode = VALID_MODES.includes(parsed.mode as LabModalityTab)
      ? (parsed.mode as LabModalityTab)
      : 'guided';
    return { checks, mode };
  } catch {
    return { checks: defaultChecks, mode: 'guided' };
  }
}

export function serializePersistedLabState(state: PersistedLabState): string {
  return JSON.stringify({
    checks: state.checks.map(Boolean),
    mode: state.mode,
  });
}

export const MODALITY_HUMAN_LABELS: Record<LabModalityTab, string> = {
  guided: 'Modalidad A · Simulador en navegador y Checklist',
  local: 'Modalidad B · Laboratorio local reproducible (Docker / Kind)',
  real: 'Modalidad C · Práctica en cuenta cloud propia aislada',
  markdown: 'Cuaderno técnico Markdown / IaC revisado',
};

export type LabEvidenceExportInput = {
  moduleId: string;
  moduleTitle: string;
  provider: Provider;
  providerName: string;
  serviceLabel: string;
  modality: LabModalityTab;
  tasks: readonly string[];
  checks: readonly boolean[];
  evidenceNotes: string;
  exportedAt?: string;
};

export function buildLabEvidenceMarkdown(input: LabEvidenceExportInput): string {
  const secrets = detectAccidentalSecrets(input.evidenceNotes);
  if (secrets.length > 0) {
    throw new Error(
      `Exportación bloqueada: se detectó posible credencial (${secrets[0].label}) en tus notas.`,
    );
  }
  const stamp = input.exportedAt || new Date().toISOString();
  const completedCount = input.checks.filter(Boolean).length;
  const checklistLines = input.tasks
    .map((task, idx) => `- [${input.checks[idx] ? 'x' : ' '}] ${task}`)
    .join('\n');

  return [
    `# Reporte de Práctica de Laboratorio — ${input.moduleTitle}`,
    '',
    `> **Aviso de alcance honesto:** Reporte **autodeclarado local, no verificado contra API cloud** ni firmado por servidor externo.`,
    '',
    `- **Módulo:** \`${input.moduleId}\` (${input.moduleTitle})`,
    `- **Proveedor activo:** ${input.providerName} (\`${input.provider}\`)`,
    `- **Servicio foco:** ${input.serviceLabel}`,
    `- **Modalidad declarada:** ${MODALITY_HUMAN_LABELS[input.modality]}`,
    `- **Checklist completado:** ${completedCount} / ${input.tasks.length}`,
    `- **Fecha de exportación (UTC):** ${stamp}`,
    '',
    '## 1. Pasos de seguridad y verificación declarados',
    checklistLines,
    '',
    '## 2. Evidencias, hallazgos y verificación de cleanup',
    input.evidenceNotes.trim() || '_Sin notas registradas por el estudiante._',
    '',
  ].join('\n');
}

export function buildLabEvidenceJson(input: LabEvidenceExportInput): string {
  const secrets = detectAccidentalSecrets(input.evidenceNotes);
  if (secrets.length > 0) {
    throw new Error(
      `Exportación bloqueada: se detectó posible credencial (${secrets[0].label}) en tus notas.`,
    );
  }
  return JSON.stringify(
    {
      schema: 'cea-lab-evidence-v1',
      disclaimer: 'Autodeclarado local, no verificado contra API cloud.',
      moduleId: input.moduleId,
      moduleTitle: input.moduleTitle,
      provider: input.provider,
      providerName: input.providerName,
      serviceLabel: input.serviceLabel,
      declaredModality: input.modality,
      declaredModalityLabel: MODALITY_HUMAN_LABELS[input.modality],
      checklist: input.tasks.map((task, idx) => ({
        step: task,
        checked: Boolean(input.checks[idx]),
      })),
      evidenceNotes: input.evidenceNotes,
      exportedAt: input.exportedAt || new Date().toISOString(),
    },
    null,
    2,
  );
}

export function downloadLabTextFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
