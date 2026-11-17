import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  Network,
  ShieldCheck,
  Target,
} from 'lucide-preact';
import { ArchitectureDiagram } from '../../../components/ui/ArchitectureDiagram';
import { CloudServiceComparison } from '../../../components/ui/CloudServiceComparison';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { levelInfo, moduleService, services } from '../../../data/course';
import { knowledge } from '../../../data/knowledge';
import { level1UnitSpecs } from '../../../data/curriculum/level1';
import { level2UnitSpecs } from '../../../data/curriculum/level2';
import { level3UnitSpecs } from '../../../data/curriculum/level3';
import { studyUnits } from '../../../data/study';
import { UnitSpecPanel } from '../components/UnitSpecPanel';
import { resolveActiveModule } from '../../../domain/progressMetrics';
import { getProviderMeta } from '../../../domain/providers';
import {
  completeTopic,
  currentModule,
  currentTopic,
  navigate,
  progress,
  provider,
} from '../../../lib/state';
import { Tag } from '../../../shared/ui/Tag';
import { GoPixelMicroGames } from '../components/GoPixelMicroGames';
import { Quiz } from '../components/KnowledgeQuiz';
import { LessonSidebar } from '../components/LessonSidebar';
import { ProviderCheck } from '../components/ProviderServiceCheck';
import { ESTIMATED_LESSON_MINUTES } from '../constants/lesson.constants';
import { buildTopicExplanation } from '../libs/buildTopicExplanation';

export function LessonPage() {
  const mod = resolveActiveModule(currentModule.value);
  const active_cloud = provider.value;
  const cloud_meta = getProviderMeta(active_cloud);
  const service_entry = services[active_cloud][moduleService(mod.id)];
  const topic_idx = Math.min(currentTopic.value, mod.topics.length - 1);
  const topic_title = mod.topics[topic_idx];
  const explanation = buildTopicExplanation(topic_title, mod, active_cloud);
  const completion_key = `${active_cloud}:${mod.id}:${topic_idx}`;
  const is_complete = progress.value.completed.includes(completion_key);
  const study_unit = studyUnits[`${mod.id}:${topic_idx}`];
  const unit_spec =
    level1UnitSpecs[`${mod.id}:${topic_idx}`] ||
    level2UnitSpecs[`${mod.id}:${topic_idx}`] ||
    level3UnitSpecs[`${mod.id}:${topic_idx}`];

  return (
    <main class="page-container lesson-page">
      <div class="breadcrumb">
        <button onClick={() => navigate('learn')}>Aprender</button>
        <ChevronRight size={14} />
        <span>{levelInfo[mod.level].name}</span>
        <ChevronRight size={14} />
        <b>{mod.title}</b>
      </div>
      <div class="lesson-layout">
        <LessonSidebar module={mod} cloudId={active_cloud} activeTopicIndex={topic_idx} />

        <article class="lesson-content">
          <div class="lesson-topline">
            <Tag kind="accent">{cloud_meta.short}</Tag>
            <span>
              <Clock3 size={14} /> ~{ESTIMATED_LESSON_MINUTES} min · Lección {topic_idx + 1}/
              {mod.topics.length}
            </span>
          </div>
          <h1>{topic_title}</h1>
          <p class="lesson-lead">{explanation.intro}</p>
          <div class="learning-outcome">
            <Target size={21} />
            <div>
              <strong>Lo que aprenderás</strong>
              <span>{mod.outcome}</span>
            </div>
          </div>
          <div class="content-divider" />

          <h2>01. Entiende el concepto</h2>
          {unit_spec && <UnitSpecPanel spec={unit_spec} cloudId={active_cloud} />}
          <p>{knowledge[mod.id].principle}</p>
          <p>
            <strong>Trade-off técnico:</strong> {knowledge[mod.id].tradeoff}
          </p>
          <p>
            <strong>Fallo frecuente:</strong> {knowledge[mod.id].failure}
          </p>
          <p>
            <strong>Ejemplo aplicado:</strong> {knowledge[mod.id].example}
          </p>
          <div class="concept-grid">
            <div>
              <Network size={22} />
              <strong>Diseño</strong>
              <span>Topología, interfaces, límites y dependencias.</span>
            </div>
            <div>
              <ShieldCheck size={22} />
              <strong>Seguridad</strong>
              <span>Identidad, superficie expuesta y permisos mínimos.</span>
            </div>
            <div>
              <Activity size={22} />
              <strong>Operación</strong>
              <span>Monitoreo, recuperación, rendimiento y costo.</span>
            </div>
          </div>

          <ArchitectureDiagram provider={active_cloud} moduleId={mod.id} />

          <h2>02. Taller específico: {topic_title}</h2>
          <div class="study-workshop">
            <div class="study-focus">
              <Target size={20} />
              <div>
                <strong>Decisión técnica de esta unidad</strong>
                <p>{study_unit.focus}</p>
              </div>
            </div>
            <h3>Reto de ingeniería</h3>
            <p>{study_unit.exercise}</p>
            <h3>Cómo demostrar que funciona</h3>
            <p>{study_unit.verify}</p>
            <h3>Errores que debes evitar</h3>
            <ul>
              {study_unit.pitfalls.map((pitfall) => (
                <li key={pitfall}>{pitfall}</li>
              ))}
            </ul>
            <h3>Comparativa multicloud</h3>
            <p>{study_unit.compare}</p>
            <div class="study-question">
              <strong>Pregunta de reflexión</strong>
              <p>{study_unit.question}</p>
            </div>
          </div>

          <h2>03. Aplicación en {cloud_meta.short}</h2>
          <p>{explanation.goal}</p>
          <div class="service-panel">
            <div class="service-panel-top">
              <div>
                <span class="service-panel-caption">SERVICIO RELACIONADO</span>
                <strong>{service_entry.label}</strong>
              </div>
              <Tag kind="accent">{cloud_meta.short}</Tag>
            </div>
            <p>{service_entry.note}</p>
            <CodeBlock
              code={service_entry.cli}
              language="bash"
              provider={active_cloud}
              risk="read-only"
              contextLabel={cloud_meta.consoleName.toLowerCase()}
              prefixDollar
            />
            <a
              class="official-link"
              href={service_entry.doc}
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentación oficial del proveedor <ExternalLink size={15} />
            </a>
          </div>

          <CloudServiceComparison moduleId={mod.id} activeProvider={active_cloud} />

          <h2>04. Procedimiento de ingeniería</h2>
          <ol class="steps-list">
            {explanation.steps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <div class="warning-box">
            <AlertTriangle size={21} />
            <div>
              <strong>Recursos y facturación</strong>
              <span>
                Los comandos mostrados son ejemplos de consulta. No se ejecutan en el navegador. Los
                laboratorios reales requieren una cuenta propia, revisar posibles cargos y verificar
                el cleanup.
              </span>
            </div>
          </div>

          <h2>05. Comprueba tu comprensión</h2>
          <GoPixelMicroGames cloudId={active_cloud} />
          <Quiz module={mod} />
          <ProviderCheck module={mod} />

          <div class="lesson-end">
            <button
              class={`btn ${is_complete ? 'btn-complete' : 'btn-primary'}`}
              onClick={() => completeTopic(`${mod.id}:${topic_idx}`, active_cloud)}
            >
              {is_complete ? (
                <>
                  <CheckCircle2 size={18} /> Lección completada
                </>
              ) : (
                <>
                  <Check size={18} /> Marcar como completada
                </>
              )}
            </button>
            <button
              class="btn btn-ghost"
              onClick={() => {
                if (topic_idx < mod.topics.length - 1) {
                  navigate('lesson', { resourceId: mod.id, unitIndex: topic_idx + 1 });
                } else {
                  navigate('lab', mod.id);
                }
              }}
            >
              {topic_idx < mod.topics.length - 1 ? 'Siguiente lección' : 'Ir al laboratorio'}{' '}
              <ArrowRight size={18} />
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
