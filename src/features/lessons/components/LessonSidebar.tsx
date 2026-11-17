import { ArrowLeft, ArrowRight, Check, FlaskConical } from 'lucide-preact';
import { modules, type Module, type Provider } from '../../../data/course';
import { completedTopicsCount } from '../../../domain/progressMetrics';
import { navigate, progress } from '../../../lib/state';
import { ProgressBar } from '../../../shared/ui/ProgressBar';

type LessonSidebarProps = {
  module: Module;
  cloudId: Provider;
  activeTopicIndex: number;
};

export function LessonSidebar({ module: mod, cloudId, activeTopicIndex }: LessonSidebarProps) {
  const done_count = completedTopicsCount(mod, cloudId, progress.value.completed);

  return (
    <aside class="lesson-sidebar">
      <div class="sidebar-course-head">
        <span class="sidebar-eyebrow">
          MÓDULO {String(modules.indexOf(mod) + 1).padStart(2, '0')}
        </span>
        <h3>{mod.title}</h3>
        <p>{mod.subtitle}</p>
        <ProgressBar value={done_count} max={mod.topics.length} />
        <small>
          {done_count} de {mod.topics.length} lecciones
        </small>
      </div>
      <div class="sidebar-list">
        <strong>CONTENIDO DEL MÓDULO</strong>
        {mod.topics.map((topic, index) => {
          const is_done = progress.value.completed.includes(`${cloudId}:${mod.id}:${index}`);
          return (
            <button
              key={topic}
              class={index === activeTopicIndex ? 'sidebar-selected' : ''}
              onClick={() => {
                navigate('lesson', { resourceId: mod.id, unitIndex: index });
              }}
            >
              <span class={`lesson-status ${is_done ? 'done' : ''}`}>
                {is_done ? <Check size={13} /> : String(index + 1).padStart(2, '0')}
              </span>
              <span>{topic}</span>
            </button>
          );
        })}
      </div>
      <button class="sidebar-lab" onClick={() => navigate('lab', mod.id)}>
        <FlaskConical size={18} /> Laboratorio práctico <ArrowRight size={16} />
      </button>
      <button class="sidebar-back" onClick={() => navigate('learn')}>
        <ArrowLeft size={16} /> Todos los módulos
      </button>
    </aside>
  );
}
