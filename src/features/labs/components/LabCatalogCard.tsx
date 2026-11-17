import { ArrowRight, CheckCircle2, FileCode2 } from 'lucide-preact';
import { levelInfo } from '../../../data/course';
import { Tag, type TagKind } from '../../../shared/ui/Tag';
import {
  COST_TIER_LABELS,
  MODALITY_LABELS,
  type LabCostTier,
} from '../constants/labsCatalog.constants';
import type { GlobalLabCatalogItem } from '../libs/filterLabsCatalog';

type LabCatalogCardProps = {
  item: GlobalLabCatalogItem;
  onOpenLab: (item: GlobalLabCatalogItem) => void;
};

function costTagKind(cost_tier: LabCostTier): TagKind {
  if (cost_tier === 'genera-cargos') return 'danger';
  if (cost_tier === 'free-tier-elegible') return 'gold';
  return 'accent';
}

export function LabCatalogCard({ item, onOpenLab }: LabCatalogCardProps) {
  return (
    <article class="info-card lab-catalog-card">
      <div class="lab-catalog-top">
        <div class="module-tags">
          <Tag kind="accent">{item.providerLabel}</Tag>
          <Tag kind={costTagKind(item.costTier)}>{COST_TIER_LABELS[item.costTier]}</Tag>
        </div>
        <small class="lab-catalog-level">{levelInfo[item.level].name.toUpperCase()}</small>
      </div>

      <h3>{item.title}</h3>
      <p>{item.summary}</p>

      <div class="module-tags">
        {item.modalities.map((modality) => (
          <Tag key={modality}>{MODALITY_LABELS[modality]}</Tag>
        ))}
      </div>

      <div class="lab-catalog-path">
        <FileCode2 size={14} />
        <code>{item.guidePath}</code>
      </div>

      <div class="lab-catalog-footer">
        <span class="lab-catalog-status">
          {item.completed ? (
            <>
              <CheckCircle2 size={15} /> Registrado
            </>
          ) : (
            item.serviceLabel
          )}
        </span>
        <button class="btn btn-secondary" onClick={() => onOpenLab(item)}>
          Abrir laboratorio <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}
