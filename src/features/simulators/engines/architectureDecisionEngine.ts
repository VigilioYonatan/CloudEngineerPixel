import { services } from '../../../data/course';
import { getProviderMeta, type CloudProviderId } from '../../../domain/providers';
import type {
  ArchitectureCategory,
  ArchitecturePriority,
  WorkloadKind,
} from '../types/simulator.types';

export type ArchitectureEngineResult = {
  modelVersion: string;
  category: ArchitectureCategory;
  recommendedService: string;
  rationale: string;
  tradeoffWarning: string;
  steps: string[];
};

export function runArchitectureDecisionEngine(
  cloudId: CloudProviderId,
  workload: WorkloadKind,
  priority: ArchitecturePriority,
): ArchitectureEngineResult {
  const category: ArchitectureCategory =
    workload === 'events' ? 'serverless' : priority === 'control' ? 'compute' : 'serverless';
  const meta = getProviderMeta(cloudId);
  const recommendedService = services[cloudId][category].label;

  const rationale =
    workload === 'events'
      ? `Cargas orientadas a eventos escalan mejor con ${recommendedService} por consumo bajo demanda.`
      : priority === 'control'
        ? `Prioridad de control de runtime/red favorece ${recommendedService} con aislamiento dedicado.`
        : `Prioridad de simplicidad/elasticidad favorece ${recommendedService} reduciendo gestión de nodos.`;

  const tradeoffWarning =
    category === 'serverless'
      ? 'Vigila cold starts, límites de tiempo de ejecución y concurrencia hacia bases de datos.'
      : 'Requiere parches de SO/nodos, dimensionamiento de pools y autoscaling calibrado.';

  return {
    modelVersion: 'arch-v2.0',
    category,
    recommendedService,
    rationale,
    tradeoffWarning,
    steps: [
      `1. Carga: ${workload} | Prioridad: ${priority} | Proveedor: ${meta.short}.`,
      `2. Categoría seleccionada: ${category.toUpperCase()} -> ${recommendedService}.`,
      `3. Trade-off clave: ${tradeoffWarning}`,
    ],
  };
}
