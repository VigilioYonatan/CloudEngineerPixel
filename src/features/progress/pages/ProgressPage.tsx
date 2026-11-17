import {
  BookOpen,
  ChartNoAxesCombined,
  CheckCircle2,
  Cloud,
  Download,
  FlaskConical,
  Layers,
  Trash2,
  Trophy,
  Upload,
} from 'lucide-preact';
import { levelInfo, modules, type Level } from '../../../data/course';
import { CLOUD_PROVIDER_IDS, getProviderMeta } from '../../../domain/providers';
import {
  clearProgress,
  exportProgress,
  importProgress,
  notify,
  progress,
  provider,
  setProvider,
} from '../../../lib/state';
import { ProgressBar } from '../../../shared/ui/ProgressBar';
import { ProviderBadge } from '../../../shared/ui/ProviderBadge';
import { computeSixDimensions } from '../libs/progressDimensions';

const PROGRESS_LEVELS: readonly Level[] = ['fundamentos', 'intermedio', 'avanzado'];

export function ProgressPage() {
  const active_cloud = provider.value;
  const active_meta = getProviderMeta(active_cloud);
  const done_in_cloud = progress.value.completed.filter((key) =>
    key.startsWith(`${active_cloud}:`),
  );
  const total_activities = modules.reduce((sum, mod) => sum + mod.topics.length + 1, 0);
  const perfect_quizzes = Object.values(progress.value.quiz).filter(
    (score) => score === 100,
  ).length;
  const sixDimensions = computeSixDimensions(progress.value, active_cloud);

  return (
    <main class="page-container">
      <div class="page-kicker">
        <ChartNoAxesCombined size={17} /> MI CENTRO DE PROGRESO
      </div>
      <section class="page-intro">
        <div>
          <h1>
            Cada avance <span>cuenta.</span>
          </h1>
          <p>
            Tu progreso se guarda en este navegador. Exporta una copia para conservarlo o
            transferirlo.
          </p>
        </div>
      </section>
      <div class="progress-cards">
        <div>
          <BookOpen size={23} />
          <strong>
            {done_in_cloud.length}
            <small>/{total_activities}</small>
          </strong>
          <span>Actividades en {active_meta.short}</span>
        </div>
        <div>
          <Trophy size={23} />
          <strong>
            {progress.value.senior.length}
            <small>/18</small>
          </strong>
          <span>Desafíos Senior</span>
        </div>
        <div>
          <CheckCircle2 size={23} />
          <strong>{perfect_quizzes}</strong>
          <span>Quizzes con 100%</span>
        </div>
        <div>
          <FlaskConical size={23} />
          <strong>{progress.value.simRuns}</strong>
          <span>Simulaciones ejecutadas</span>
        </div>
      </div>

      <section class="info-card progress-panel" aria-label="6 dimensiones del progreso">
        <div class="card-heading">
          <Layers size={20} />
          <h3>Desglose en 6 dimensiones · {active_meta.short}</h3>
        </div>
        <div class="progress-6d-grid">
          {sixDimensions.map((dim) => (
            <div key={dim.id} class="progress-6d-card">
              <small>{dim.label}</small>
              <strong>
                {dim.value}
                {dim.total !== null && <span>/{dim.total}</span>}
              </strong>
              <span>{dim.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section class="info-card progress-panel">
        <div class="card-heading">
          <Layers size={20} />
          <h3>Progreso por nivel · {active_meta.short}</h3>
        </div>
        {PROGRESS_LEVELS.map((level_id) => {
          const level_modules = modules.filter((mod) => mod.level === level_id);
          const level_max = level_modules.reduce((sum, mod) => sum + mod.topics.length + 1, 0);
          const level_done = level_modules.reduce(
            (sum, mod) =>
              sum +
              progress.value.completed.filter((key) => key.startsWith(`${active_cloud}:${mod.id}:`))
                .length,
            0,
          );
          return (
            <div class="level-progress" key={level_id}>
              <div>
                <strong>{levelInfo[level_id].name}</strong>
                <span>
                  {level_done} / {level_max} actividades
                </span>
              </div>
              <ProgressBar value={level_done} max={level_max} />
            </div>
          );
        })}
      </section>

      <section class="info-card progress-panel">
        <div class="card-heading">
          <Cloud size={20} />
          <h3>Tu experiencia multicloud</h3>
        </div>
        <div class="cloud-progress-grid">
          {CLOUD_PROVIDER_IDS.map((cloud_id) => {
            const meta = getProviderMeta(cloud_id);
            const cloud_done = progress.value.completed.filter((key) =>
              key.startsWith(`${cloud_id}:`),
            ).length;
            return (
              <button
                key={cloud_id}
                onClick={() => setProvider(cloud_id)}
                class={active_cloud === cloud_id ? 'cloud-progress-current' : ''}
              >
                <ProviderBadge providerId={cloud_id} />
                <strong>{meta.name}</strong>
                <small>{cloud_done} actividades completadas</small>
                <ProgressBar value={cloud_done} max={total_activities} />
              </button>
            );
          })}
        </div>
      </section>

      <section class="info-card progress-panel">
        <div class="card-heading">
          <Download size={20} />
          <h3>Respaldo del progreso</h3>
        </div>
        <p>
          El progreso no se sincroniza en servidores. Puedes exportar un archivo JSON e importarlo
          posteriormente.
        </p>
        <div class="action-row">
          <button class="btn btn-secondary" onClick={exportProgress}>
            <Download size={17} /> Exportar progreso
          </button>
          <label class="btn btn-secondary file-label">
            <Upload size={17} /> Importar progreso
            <input
              type="file"
              accept="application/json,.json"
              onChange={(event) => {
                const input = event.currentTarget as HTMLInputElement;
                const file = input.files?.[0];
                if (file) {
                  importProgress(file).catch((err: unknown) => {
                    const message = err instanceof Error ? err.message : 'Archivo inválido';
                    notify(`Error: ${message}`);
                  });
                }
                input.value = '';
              }}
            />
          </label>
          <button class="btn btn-danger" onClick={() => void clearProgress()}>
            <Trash2 size={16} /> Reiniciar progreso
          </button>
        </div>
      </section>
    </main>
  );
}
