import { ArrowRight, BookOpen, Search } from 'lucide-preact';
import { levelInfo, modules, type Level } from '../../../data/course';
import { completedTopicsCount } from '../../../domain/progressMetrics';
import { getProviderMeta } from '../../../domain/providers';
import {
  currentTopic,
  levelFilter,
  navigate,
  progress,
  provider,
  searchText,
} from '../../../lib/state';
import { ProgressBar } from '../../../shared/ui/ProgressBar';
import { Tag } from '../../../shared/ui/Tag';
import { ModuleIcon } from '../components/ModuleIcon';

const LEVEL_TABS: readonly { id: 'todos' | Level; name: string }[] = [
  { id: 'todos', name: 'Todos los niveles' },
  { id: 'fundamentos', name: levelInfo.fundamentos.name },
  { id: 'intermedio', name: levelInfo.intermedio.name },
  { id: 'avanzado', name: levelInfo.avanzado.name },
];

export function CurriculumPage() {
  const active_cloud = provider.value;
  const cloud_meta = getProviderMeta(active_cloud);
  const query = searchText.value.toLowerCase();

  const filtered_modules = modules.filter(
    (mod) =>
      (levelFilter.value === 'todos' || mod.level === levelFilter.value) &&
      `${mod.title} ${mod.subtitle} ${mod.tags.join(' ')}`.toLowerCase().includes(query),
  );

  const cloud_completed_count = progress.value.completed.filter((item) =>
    item.startsWith(`${active_cloud}:`),
  ).length;

  return (
    <main class="page-container">
      <div class="page-kicker">
        <BookOpen size={16} /> RUTAS DE APRENDIZAJE / {cloud_meta.short}
      </div>
      <section class="page-intro">
        <div>
          <h1>
            Tu ruta hacia <span>Cloud Engineer.</span>
          </h1>
          <p>
            18 módulos, 3 niveles y aprendizaje práctico. Estás explorando la ruta de{' '}
            <strong>{cloud_meta.name}</strong>.
          </p>
        </div>
        <div class="intro-stat">
          <span>PROGRESO ACTUAL</span>
          <strong>{cloud_completed_count}</strong>
          <small>actividades completadas</small>
        </div>
      </section>
      <div class="learn-toolbar">
        <div class="tabs">
          {LEVEL_TABS.map((tab) => (
            <button
              key={tab.id}
              class={levelFilter.value === tab.id ? 'tab-active' : ''}
              onClick={() => {
                levelFilter.value = tab.id;
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <label class="search-field">
          <Search size={17} />
          <input
            type="search"
            placeholder="Buscar un módulo..."
            value={searchText.value}
            onInput={(event) => {
              searchText.value = (event.currentTarget as HTMLInputElement).value;
            }}
            aria-label="Buscar módulos"
          />
        </label>
      </div>
      {filtered_modules.length === 0 ? (
        <div class="empty-state">
          No hay módulos para esta búsqueda.{' '}
          <button
            onClick={() => {
              searchText.value = '';
              levelFilter.value = 'todos';
            }}
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div class="module-grid">
          {filtered_modules.map((mod) => {
            const done = completedTopicsCount(mod, active_cloud, progress.value.completed);
            return (
              <button
                class="module-card"
                key={mod.id}
                onClick={() => {
                  currentTopic.value = 0;
                  navigate('lesson', { resourceId: mod.id, unitIndex: 0 });
                }}
              >
                <div class="module-header">
                  <div class="module-icon">
                    <ModuleIcon name={mod.icon} size={23} />
                  </div>
                  <span class="module-num">
                    #{String(modules.indexOf(mod) + 1).padStart(2, '0')}
                  </span>
                </div>
                <div class="module-level">
                  <span class={`level-indicator ${mod.level}`} />
                  {levelInfo[mod.level].name.toUpperCase()} · {mod.hours}H
                </div>
                <h3>{mod.title}</h3>
                <p>{mod.subtitle}</p>
                <div class="module-tags">
                  {mod.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div class="module-progress">
                  <div>
                    <span>Lecciones</span>
                    <strong>
                      {done}/{mod.topics.length}
                    </strong>
                  </div>
                  <ProgressBar value={done} max={mod.topics.length} />
                </div>
                <div class="module-link">
                  {done ? 'Continuar módulo' : 'Empezar módulo'} <ArrowRight size={17} />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </main>
  );
}
