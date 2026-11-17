import { moduleService, modules, services, type Level, type Provider } from '../../../data/course';
import { CLOUD_PROVIDER_IDS, getProviderMeta } from '../../../domain/providers';
import {
  MODULE_LAB_PROFILES,
  SPECIAL_LAB_SEEDS,
  type LabCatalogCategory,
  type LabCostTier,
  type LabModality,
} from '../constants/labsCatalog.constants';

export type GlobalLabCatalogItem = {
  id: string;
  category: LabCatalogCategory;
  provider: Provider | 'multicloud';
  providerLabel: string;
  level: Level;
  title: string;
  summary: string;
  serviceLabel: string;
  guidePath: string;
  targetModuleId: string;
  modalities: readonly LabModality[];
  costTier: LabCostTier;
  tags: readonly string[];
  completed: boolean;
};

export type LabsCatalogFilterCriteria = {
  provider: 'todos' | Provider;
  level: 'todos' | Level;
  modality: 'todos' | LabModality;
  costTier: 'todos' | LabCostTier;
  search: string;
};

export function buildGlobalLabsCatalog(completed_keys: readonly string[]): GlobalLabCatalogItem[] {
  const module_items: GlobalLabCatalogItem[] = CLOUD_PROVIDER_IDS.flatMap((cloud_id) => {
    const cloud_meta = getProviderMeta(cloud_id);
    return modules.map((mod) => {
      const profile = MODULE_LAB_PROFILES[mod.id] || {
        modalities: ['local-docker-kind', 'cuenta-propia'] as const,
        costTier: 'free-tier-elegible' as const,
      };
      const svc = services[cloud_id][moduleService(mod.id)];
      return {
        id: `${cloud_id}:${mod.id}:lab`,
        category: 'module-lab',
        provider: cloud_id,
        providerLabel: cloud_meta.short,
        level: mod.level,
        title: `${mod.title} (${cloud_meta.short})`,
        summary: `${mod.outcome} Servicio foco: ${svc.label}.`,
        serviceLabel: svc.label,
        guidePath: `labs/${cloud_id}/${mod.id}.md`,
        targetModuleId: mod.id,
        modalities: profile.modalities,
        costTier: profile.costTier,
        tags: mod.tags,
        completed: completed_keys.includes(`${cloud_id}:${mod.id}:lab`),
      };
    });
  });

  const special_items: GlobalLabCatalogItem[] = SPECIAL_LAB_SEEDS.map((seed) => {
    const provider_label =
      seed.provider === 'multicloud' ? 'MULTICLOUD' : getProviderMeta(seed.provider).short;
    const completed =
      seed.provider === 'multicloud'
        ? CLOUD_PROVIDER_IDS.some((c) => completed_keys.includes(`${c}:${seed.targetModuleId}:lab`))
        : completed_keys.includes(`${seed.provider}:${seed.targetModuleId}:lab`);

    return {
      id: seed.id,
      category: seed.category,
      provider: seed.provider,
      providerLabel: provider_label,
      level: seed.level,
      title: seed.title,
      summary: seed.summary,
      serviceLabel: seed.category === 'devsecops-oidc' ? 'OIDC Federation' : 'Portfolio Capstone',
      guidePath: seed.guidePath,
      targetModuleId: seed.targetModuleId,
      modalities: seed.modalities,
      costTier: seed.costTier,
      tags: seed.tags,
      completed,
    };
  });

  return [...module_items, ...special_items];
}

export function filterLabsCatalog(
  catalog: readonly GlobalLabCatalogItem[],
  criteria: LabsCatalogFilterCriteria,
): GlobalLabCatalogItem[] {
  const query = criteria.search.trim().toLowerCase();

  return catalog.filter((item) => {
    if (
      criteria.provider !== 'todos' &&
      item.provider !== criteria.provider &&
      item.provider !== 'multicloud'
    ) {
      return false;
    }
    if (criteria.level !== 'todos' && item.level !== criteria.level) {
      return false;
    }
    if (criteria.modality !== 'todos' && !item.modalities.includes(criteria.modality)) {
      return false;
    }
    if (criteria.costTier !== 'todos' && item.costTier !== criteria.costTier) {
      return false;
    }
    if (query) {
      const haystack =
        `${item.title} ${item.summary} ${item.serviceLabel} ${item.guidePath} ${item.tags.join(' ')}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}
