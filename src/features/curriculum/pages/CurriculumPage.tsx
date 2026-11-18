import { ArrowRight, BookOpen, Search } from 'lucide-preact';
import { AccessibleTabs } from '../../../components/ui/AccessibleTabs';
import { EmptyState } from '../../../components/ui/EmptyState';
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

const LEVEL_TABS: readonly { id: 'todos' | Level; label: string }[] = [
  { id: 'todos', label: 'Todos los niveles' },
  { id: 'fundamentos', label: levelInfo.fundamentos.name },
  { id: 'intermedio', label: levelInfo.intermedio.name },
  { id: 'avanzado', label: levelInfo.avanzado.name },
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
        <AccessibleTabs
          ariaLabel="Filtrar módulos por nivel"
          items={LEVEL_TABS}
          activeId={(levelFilter.value as 'todos' | Level) || 'todos'}
          onSelect={(nextId) => {
            levelFilter.value = nextId;
          }}
        />
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
        <EmptyState
          providerId={active_cloud}
          title="No hay módulos para esta búsqueda."
          description="Ajusta el término de búsqueda o vuelve a mostrar los tres niveles del currículo."
          actionLabel="Restablecer filtros"
          onAction={() => {
            searchText.value = '';
            levelFilter.value = 'todos';
          }}
        />
      ) : (
        <div class="module-grid">
          {filtered_modules.map((mod) => {
            const done = completedTopicsCount(mod, active_cloud, progress.value.completed);
            return (
              <button
                type="button"
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
