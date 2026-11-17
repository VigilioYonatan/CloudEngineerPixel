import { Download, ExternalLink, Upload } from 'lucide-preact';
import type { Provider } from '../../../data/course';
import type { Challenge } from '../../../data/senior';
import type { investigationFor } from '../../../data/seniorInvestigations';
import type { SeniorPlaybook } from '../../../data/seniorPlaybooks';
import { seniorPractices } from '../../../data/seniorPractices';
import { seniorRubric } from '../../../data/seniorRubric';
import { getProviderMeta } from '../../../domain/providers';
import type { SeniorReport } from '../../../lib/seniorSession.mjs';
import { downloadReport } from '../libs/downloadJsonFile';

type InvestigationDetails = ReturnType<typeof investigationFor>;

type SeniorSidebarProps = {
  cloudId: Provider;
  challenge: Challenge;
  details: InvestigationDetails;
  playbook: SeniorPlaybook | null;
  answers: SeniorReport;
  score: number;
  diagnosisReady: boolean;
  confirmedCorrect: boolean;
  proofReady: boolean;
  citationsReady: boolean;
  reportReady: boolean;
  acknowledged: boolean;
  checkpointReady: boolean;
  checkpointError: string;
  onExportCheckpoint: () => void;
  onImportCheckpoint: (file: File | null) => void;
};

export function SeniorSidebar({
  cloudId: p,
  challenge: current,
  details,
  playbook,
  answers,
  score,
  diagnosisReady,
  confirmedCorrect,
  proofReady,
  citationsReady,
  reportReady,
  acknowledged,
  checkpointReady,
  checkpointError,
  onExportCheckpoint,
  onImportCheckpoint,
}: SeniorSidebarProps) {
  const cloud_meta = getProviderMeta(p);
  const practice = seniorPractices[current.id] || null;

  return (
    <aside class="sr-aside">
      <section class="info-card">
        <h3>Tablero de evidencias</h3>
        <div class="sr-score">
          <strong>{score}</strong>
          <span>/ 100 puntos de completitud</span>
        </div>
        <div class="sr-checks">
          <span>{diagnosisReady ? '✓' : '○'} Diagnóstico de causa · requisito</span>
          <span>{confirmedCorrect ? '✓' : '○'} Decisión confirmada · 25</span>
          <span>{proofReady ? '✓' : '○'} Evidencias inspeccionadas · 20</span>
          <span>{citationsReady ? '✓' : '○'} Referencias vinculadas · 15</span>
          <span>{reportReady ? '✓' : '○'} Informe documentado · 30</span>
          <span>{acknowledged ? '✓' : '○'} Declaración de alcance · 10</span>
        </div>
        <p class="sr-hint">
          La hipótesis técnica es un requisito adicional. La puntuación /100 mide el resto de
          actividades; no certifica desempeño profesional.
        </p>
        <p class="sr-hint">
          El expediente se guarda automáticamente por caso y proveedor en este navegador.
        </p>
      </section>

      <section class="info-card sr-checkpoint" aria-label="Respaldo de expediente Senior">
        <h3>Respaldo portable</h3>
        <p class="sr-hint">
          Descarga o restaura <strong>solo este caso de {cloud_meta.short}</strong>. No importa
          puntuaciones ni revisiones; nunca contiene credenciales cloud.
        </p>
        <div class="sr-report-actions">
          <button
            class="btn btn-secondary"
            onClick={onExportCheckpoint}
            disabled={!checkpointReady}
          >
            <Download size={16} /> Guardar JSON del caso
          </button>
          <label class="btn btn-secondary sr-import-label">
            <Upload size={16} /> Importar JSON del caso{' '}
            <input
              type="file"
              accept=".json,application/json"
              aria-label="Importar expediente JSON"
              onChange={(event) => {
                const input = event.currentTarget as HTMLInputElement;
                onImportCheckpoint(input.files?.[0] || null);
                input.value = '';
              }}
            />
          </label>
        </div>
        {checkpointError && (
          <p class="sr-checkpoint-error" role="alert">
            {checkpointError}
          </p>
        )}
      </section>

      {playbook && (
        <section class="info-card sr-playbook">
          <h3>Condiciones de recuperación</h3>
          <p>{playbook.recoverySignal}</p>
          <h4>Pregunta de postmortem</h4>
          <p>{playbook.retrospective}</p>
          <p class="sr-hint">Indicaciones educativas, no cambios ejecutables.</p>
        </section>
      )}

      <section class="info-card sr-review-rubric">
        <h3>Rúbrica de revisión humana</h3>
        <p class="sr-hint">
          El instructor evalúa estas cinco dimensiones por separado. El puntaje automático no
          sustituye la revisión técnica.
        </p>
        <ul class="sr-proof">
          {seniorRubric.map((item) => (
            <li key={item.id}>
              <strong>
                {item.weight}% · {item.label}
              </strong>
              <p>{item.guidance}</p>
            </li>
          ))}
        </ul>
        <button
          class="btn btn-secondary"
          onClick={() =>
            downloadReport(
              {
                caseId: current.id,
                provider: p,
                studentReport: answers,
                automaticCompletionScore: score,
                review: {
                  status: 'pending-human-review',
                  rubric: seniorRubric,
                  notes: '',
                  reviewer: '',
                  reviewedAt: null,
                },
              },
              `revision-docente-${p}-${current.id}.json`,
            )
          }
        >
          <Download size={16} /> Plantilla de revisión
        </button>
      </section>

      <section class="info-card">
        <h3>Rúbrica profesional</h3>
        <ul class="sr-proof">
          {current.proof.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p class="sr-hint">
          El instructor debe contrastar estas evidencias para evaluar dominio real.
        </p>
      </section>

      <section class="info-card">
        <h3>Contexto {cloud_meta.short}</h3>
        <strong>{details.service[p]}</strong>
        <p class="sr-hint">
          Equivalencias: AWS · {details.service.aws}; Azure · {details.service.azure}; GCP ·{' '}
          {details.service.gcp}.
        </p>
        <div class="terminal-block">
          <pre>
            <code>$ {details.command[p]}</code>
          </pre>
        </div>
        <p class="sr-hint">
          Ejemplo de comando de solo lectura, no ejecutado. Verifica contexto y permisos antes de
          usarlo en una cuenta real.
        </p>
        <a
          class="official-link"
          href={cloud_meta.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentación oficial <ExternalLink size={14} />
        </a>
      </section>

      {practice && (
        <section class="info-card sr-practice">
          <h3>Cuaderno práctico · {cloud_meta.short}</h3>
          <p>{practice.goal}</p>
          <h4>Entregables que debe revisar un instructor</h4>
          <ul class="sr-proof">
            {practice.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h4>Consultas de diagnóstico sugeridas</h4>
          <p class="sr-hint">
            Solo lectura. Requieren una cuenta autorizada y nunca se ejecutan en esta web.
          </p>
          {practice.commands[p].map((cmd) => (
            <div class="terminal-block" key={cmd}>
              <pre>
                <code>$ {cmd}</code>
              </pre>
            </div>
          ))}
          <p class="sr-hint">
            <strong>Riesgo frecuente:</strong> {practice.pitfall}
          </p>
          <a
            class="official-link"
            href={`/senior-guides/${p}/${current.id}.md`}
            download={`${current.id}-${p}-cuaderno.md`}
          >
            Descargar cuaderno del caso <Download size={15} />
          </a>
        </section>
      )}
    </aside>
  );
}
