import { ArrowUpRight, BrainCircuit, CheckCircle2, Compass, ShieldAlert } from 'lucide-preact';
import { useState } from 'preact/hooks';
import type { Level } from '../../../data/course';
import { getProviderMeta } from '../../../domain/providers';
import { navigate, progress, provider } from '../../../lib/state';
import { Tag } from '../../../shared/ui/Tag';
import { CurriculumModuleNode } from '../components/CurriculumModuleNode';
import { buildCurriculumMapModel } from '../libs/buildCurriculumMapModel';

type StageFilter = 'all' | Level | 'senior';

const STAGE_FILTERS: readonly { id: StageFilter; label: string }[] = [
  { id: 'all', label: 'Recorrido completo (240h + Senior)' },
  { id: 'fundamentos', label: 'Nivel 1 · Fundamentos (60h)' },
  { id: 'intermedio', label: 'Nivel 2 · Ingeniería (80h)' },
  { id: 'avanzado', label: 'Nivel 3 · Arquitectura (100h)' },
  { id: 'senior', label: 'Etapa 4 · Senior Mode (18)' },
];

export function CurriculumMapPage() {
  const [stage_filter, setStageFilter] = useState<StageFilter>('all');
  const active_cloud = provider.value;
  const cloud_meta = getProviderMeta(active_cloud);
  const map_model = buildCurriculumMapModel(
    active_cloud,
    progress.value.completed,
    progress.value.senior,
  );

  const visible_levels =
    stage_filter === 'all'
      ? map_model.levels
      : stage_filter === 'senior'
        ? []
        : map_model.levels.filter((stage) => stage.level === stage_filter);

  const show_senior = stage_filter === 'all' || stage_filter === 'senior';

  return (
    <main class="page-container">
      <div class="page-kicker">
        <Compass size={16} /> MAPA CURRICULAR Y MATRIZ DE COMPETENCIAS · {cloud_meta.short}
      </div>
      <section class="page-intro">
        <div>
          <h1>
            Mapa Curricular <span>Multicloud.</span>
          </h1>
          <p>
            Recorrido estructurado desde <strong>Nivel 1 Fundamentos (60h)</strong> →{' '}
            <strong>Nivel 2 Ingeniería (80h)</strong> → <strong>Nivel 3 Arquitectura (100h)</strong>{' '}
            → <strong>Senior Mode (18 incidentes)</strong> en {cloud_meta.name}.
          </p>
        </div>
        <div class="intro-stat">
          <span>UNIDADES EN {cloud_meta.short}</span>
          <strong>
            {map_model.completedUnitsCount}/{map_model.totalUnitsCount}
          </strong>
          <small>{map_model.completedSeniorCount}/18 incidentes Senior</small>
        </div>
      </section>

      <div class="map-progression-banner">
        {map_model.levels.map((lvl) => (
          <div class="map-stage-pill" key={lvl.level}>
            <span class="map-stage-num">ETAPA {lvl.stageNumber}</span>
            <strong>{lvl.name}</strong>
            <small>
              {lvl.totalHours} HORAS · {lvl.completedUnits}/{lvl.totalUnits} unidades
            </small>
          </div>
        ))}
        <div class="map-stage-pill map-stage-senior">
          <span class="map-stage-num">ETAPA 04</span>
          <strong>Senior Mode</strong>
          <small>18 INCIDENTES · {map_model.completedSeniorCount}/18 resueltos</small>
        </div>
      </div>

      <div class="learn-toolbar">
        <div class="tabs" role="toolbar" aria-label="Filtrar etapa del mapa curricular">
          {STAGE_FILTERS.map((filter_opt) => (
            <button
              type="button"
              key={filter_opt.id}
              class={stage_filter === filter_opt.id ? 'tab-active' : ''}
              onClick={() => setStageFilter(filter_opt.id)}
            >
              {filter_opt.label}
            </button>
          ))}
        </div>
      </div>

      {visible_levels.map((stage) => (
        <section class="map-level-section" key={stage.level}>
          <div class="map-level-header">
            <div>
              <span class="eyebrow">
                <span class="eyebrow-square" /> ETAPA {stage.stageNumber} · {stage.totalHours} HORAS
              </span>
              <h2>{stage.name}</h2>
              <p>{stage.description}</p>
            </div>
            <Tag kind="accent">
              {stage.completedUnits}/{stage.totalUnits} unidades en {cloud_meta.short}
            </Tag>
          </div>
          <div class="map-modules-grid">
            {stage.modules.map((mod_item) => (
              <CurriculumModuleNode key={mod_item.id} item={mod_item} />
            ))}
          </div>
        </section>
      ))}

      {show_senior && (
        <section class="map-level-section">
          <div class="map-level-header">
            <div>
              <span class="eyebrow">
                <span class="eyebrow-square" /> ETAPA 04 · CULMINACIÓN OPERATIVA
              </span>
              <h2>Senior Mode · 18 Incidentes de Producción</h2>
              <p>
                Investigación de señales sintéticas, hipótesis diagnóstica, contención y reporte
                estructurado con rúbrica defendible.
              </p>
            </div>
            <button type="button" class="btn btn-gold" onClick={() => navigate('senior')}>
              <BrainCircuit size={16} /> Ir al catálogo Senior
            </button>
          </div>
          <div class="senior-grid">
            {map_model.seniorCases.map((incident) => (
              <button
                type="button"
                key={incident.id}
                class="senior-card"
                onClick={() => navigate('senior', { caseId: incident.id })}
              >
                <div class="senior-card-head">
                  <span class="senior-id">{incident.id.toUpperCase()}</span>
                  <Tag kind={incident.severity === 'Crítica' ? 'danger' : 'gold'}>
                    {incident.severity}
                  </Tag>
                </div>
                <div class="senior-card-icon">
                  <ShieldAlert size={22} />
                </div>
                <small class="sr-category">{incident.category}</small>
                <h3>{incident.title}</h3>
                <div class="senior-card-footer">
                  <span>
                    {incident.completed ? (
                      <>
                        <CheckCircle2 size={15} /> Registrado en {cloud_meta.short}
                      </>
                    ) : (
                      'Abrir expediente directo'
                    )}
                  </span>
                  <ArrowUpRight size={17} />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
