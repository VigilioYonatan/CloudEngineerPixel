import { ArrowRight, Check, FlaskConical, Play } from 'lucide-preact';
import { navigate } from '../../../lib/state';
import { ProgressBar } from '../../../shared/ui/ProgressBar';
import { Tag } from '../../../shared/ui/Tag';
import type { CurriculumModuleMapItem } from '../libs/buildCurriculumMapModel';
import { ModuleIcon } from './ModuleIcon';

type CurriculumModuleNodeProps = {
  item: CurriculumModuleMapItem;
};

export function CurriculumModuleNode({ item }: CurriculumModuleNodeProps) {
  return (
    <article class="info-card map-module-card">
      <div class="map-module-head">
        <div class="module-icon">
          <ModuleIcon name={item.icon} size={22} />
        </div>
        <div class="map-module-titles">
          <span class="map-module-kicker">
            MÓDULO #{item.number} · {item.hours}H · {item.serviceLabel}
          </span>
          <h3>{item.title}</h3>
          <p>{item.outcome}</p>
        </div>
      </div>

      <div class="map-meta-row">
        <div>
          <small class="map-meta-label">PRERREQUISITOS RECOMENDADOS</small>
          <div class="module-tags">
            {item.prerequisites.map((prereq) => (
              <Tag key={prereq}>{prereq}</Tag>
            ))}
          </div>
        </div>
        <div>
          <small class="map-meta-label">MODALIDADES DISPONIBLES</small>
          <div class="module-tags">
            {item.modalities.map((mod_kind) => (
              <Tag key={mod_kind} kind={mod_kind === 'Simulador' ? 'accent' : 'default'}>
                {mod_kind}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div class="map-units-box">
        <div class="map-units-header">
          <strong>
            Unidades directas ({item.completedUnits}/{item.units.length})
          </strong>
          <ProgressBar value={item.completedUnits} max={item.units.length} />
        </div>
        <div class="map-unit-links">
          {item.units.map((unit) => (
            <button
              type="button"
              key={unit.href}
              class={`map-unit-btn ${unit.completed ? 'map-unit-done' : ''}`}
              onClick={() => navigate('lesson', { resourceId: item.id, unitIndex: unit.index })}
            >
              <span class="map-unit-index">
                {unit.completed ? <Check size={13} /> : String(unit.index + 1).padStart(2, '0')}
              </span>
              <span>
                {String(unit.index + 1).padStart(2, '0')} · {unit.title}
              </span>
              <ArrowRight size={14} />
            </button>
          ))}
        </div>
      </div>

      <div class="map-card-actions">
        <button type="button" class="btn btn-secondary" onClick={() => navigate('lab', item.id)}>
          <FlaskConical size={15} />{' '}
          {item.labCompleted ? 'Lab registrado' : 'Laboratorio del módulo'}
        </button>
        {item.linkedSimulator && (
          <button
            type="button"
            class="btn btn-ghost"
            onClick={() => navigate('simulator', { simId: item.linkedSimulator })}
          >
            <Play size={15} /> Probar simulador
          </button>
        )}
      </div>
    </article>
  );
}
