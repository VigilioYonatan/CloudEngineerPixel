import { ArrowRight, CheckCircle2, FileText, Search, ShieldAlert } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import { ArchitectureDiagram } from '../../../components/ui/ArchitectureDiagram';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { MarkdownViewer } from '../../../components/ui/MarkdownViewer';
import type { Provider } from '../../../data/course';
import type { investigationFor } from '../../../data/seniorInvestigations';
import type { SeniorPlaybook } from '../../../data/seniorPlaybooks';
import { loadSeniorWorkbookMarkdown } from '../../../lib/markdownGuideLoader';

type InvestigationDetails = ReturnType<typeof investigationFor>;

type InvestigationStageProps = {
  cloudId: Provider;
  caseId: string;
  details: InvestigationDetails;
  playbook: SeniorPlaybook | null;
  inspected: readonly string[];
  onInspectExhibit: (exhibit_id: string) => void;
  onAdvanceToDiagnosis: () => void;
};

export function InvestigationStage({
  cloudId,
  caseId,
  details,
  playbook,
  inspected,
  onInspectExhibit,
  onAdvanceToDiagnosis,
}: InvestigationStageProps) {
  const [showWorkbook, setShowWorkbook] = useState(false);
  const [workbookMd, setWorkbookMd] = useState<string | null>(null);

  useEffect(() => {
    setShowWorkbook(false);
    setWorkbookMd(null);
  }, [cloudId, caseId]);

  useEffect(() => {
    if (!showWorkbook) return;
    let active = true;
    loadSeniorWorkbookMarkdown(cloudId, caseId)
      .then((content) => {
        if (active) setWorkbookMd(content);
      })
      .catch(() => {
        if (active) setWorkbookMd(null);
      });
    return () => {
      active = false;
    };
  }, [showWorkbook, cloudId, caseId]);

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
        <div class="action-row" style={{ marginTop: '12px' }}>
          <button
            type="button"
            class="btn btn-secondary btn-compact"
            onClick={() => setShowWorkbook((prev) => !prev)}
          >
            <FileText size={15} />{' '}
            {showWorkbook ? 'Ocultar cuaderno Markdown' : 'Leer cuaderno del caso aquí'}
          </button>
        </div>
      </section>

      {showWorkbook && (
        <section class="info-card" aria-label="Cuaderno práctico integrado">
          {workbookMd ? (
            <MarkdownViewer markdown={workbookMd} provider={cloudId} />
          ) : (
            <p role="status">Cargando cuaderno Senior de {cloudId.toUpperCase()}...</p>
          )}
        </section>
      )}

      <ArchitectureDiagram provider={cloudId} seniorCaseId={caseId} />

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
              <CodeBlock
                code={exhibit.body}
                risk="read-only"
                contextLabel="READ ONLY / SYNTHETIC EVIDENCE"
              />
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
