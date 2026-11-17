import type { Provider } from '../../../data/course';
import { getProviderMeta } from '../../../domain/providers';
import type { PortfolioProjectDefinition } from '../constants/projects.constants';

type BuildPortfolioMarkdownInput = {
  project: PortfolioProjectDefinition;
  cloudId: Provider;
  checkedDeliverables: readonly string[];
  adrNotes: string;
  exportedAt?: string;
};

export function buildPortfolioAdrMarkdown({
  project,
  cloudId,
  checkedDeliverables,
  adrNotes,
  exportedAt = new Date().toISOString(),
}: BuildPortfolioMarkdownInput): string {
  const cloud_meta = getProviderMeta(cloudId);
  const clean_notes = adrNotes.trim() || '_Pendiente de redactar justificación arquitectónica._';

  const deliverables_lines = project.deliverables.map((item) => {
    const done = checkedDeliverables.includes(item);
    return `- [${done ? 'x' : ' '}] ${item}`;
  });

  const rubric_lines = project.rubric.map(
    (criterion) => `- **${criterion.weight}% · ${criterion.label}:** ${criterion.criteria}`,
  );

  return [
    `# ADR / Portfolio — Proyecto ${Number(project.number)}: ${project.title}`,
    '',
    `- **Fecha de exportación (UTC):** ${exportedAt}`,
    `- **Proveedor principal seleccionado:** ${cloud_meta.name} (${cloud_meta.short})`,
    `- **Marco de referencia:** ${cloud_meta.wellArchitectedName}`,
    `- **Stack equivalente sugerido:** ${project.cloudEquivalents[cloudId]}`,
    '',
    '## 1. Contexto y Objetivo de Ingeniería',
    project.objective,
    '',
    '## 2. Threat Model, Fronteras de Confianza y Enfoque SRE (RTO/RPO & SLO)',
    project.threatAndSreFocus,
    '',
    '## 3. Decisiones de Arquitectura y Justificación (ADR)',
    clean_notes,
    '',
    '## 4. Comparativa Multicloud de Referencia',
    `- **AWS:** ${project.cloudEquivalents.aws}`,
    `- **Microsoft Azure:** ${project.cloudEquivalents.azure}`,
    `- **Google Cloud:** ${project.cloudEquivalents.gcp}`,
    '',
    '## 5. Checklist de Entregables Verificables',
    ...deliverables_lines,
    '',
    '## 6. Rúbrica Ponderada de Revisión (100%)',
    ...rubric_lines,
    '',
    '---',
    '> _Plantilla generada localmente en Cloud Engineering Academy. Autoevaluación educativa; no constituye certificación oficial de AWS, Microsoft Azure ni Google Cloud._',
    '',
  ].join('\n');
}
