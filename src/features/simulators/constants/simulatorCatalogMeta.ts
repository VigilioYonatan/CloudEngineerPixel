import type { SimulatorMode } from '../types/simulator.types';

export type SimulatorCategory =
  | 'Redes'
  | 'Seguridad'
  | 'Cómputo/K8s'
  | 'IaC'
  | 'Datos/Eventos'
  | 'SRE/FinOps'
  | 'Arquitectura';

export type SimulatorCatalogEntry = {
  id: SimulatorMode;
  category: SimulatorCategory;
  version: string;
  formulaOrRules: string;
  simplifications: string;
};

export const SIMULATOR_CATALOG_META: Record<SimulatorMode, SimulatorCatalogEntry> = {
  cidr: {
    id: 'cidr',
    category: 'Redes',
    version: 'cidr-v2.0',
    formulaOrRules: '2^(32 - prefijo) menos IPs reservadas por proveedor (AWS=5, Azure=5, GCP=4).',
    simplifications: 'Cubre IPv4; no modela IPv6 ni subredes secundarias BYOIP.',
  },
  iam: {
    id: 'iam',
    category: 'Seguridad',
    version: 'iam-v2.0',
    formulaOrRules: 'Precedencia estricta: Explicit Deny > Allow (con MFA/región) > Implicit Deny.',
    simplifications: 'No evalúa ABAC por tags dinámicos ni Permission Boundaries complejos.',
  },
  scale: {
    id: 'scale',
    category: 'Cómputo/K8s',
    version: 'autoscaling-v2.0',
    formulaOrRules: 'ceil(RPS / capacidad_réplica) y conexiones = réplicas × pool.',
    simplifications: 'Asume carga uniforme sin picos de arranque ni warm-up de JVM/Node.',
  },
  slo: {
    id: 'slo',
    category: 'SRE/FinOps',
    version: 'slo-v2.0',
    formulaOrRules: 'ErrorBudget = (1 - SLO/100) × días × 86400 s.',
    simplifications: 'Basado en disponibilidad temporal uniforme, sin ponderación por hora pico.',
  },
  architecture: {
    id: 'architecture',
    category: 'Arquitectura',
    version: 'arch-v2.0',
    formulaOrRules: 'Matriz determinista de workload (web/events/batch) × prioridad.',
    simplifications: 'No sustituye un ADR completo con TCO y requisitos de latencia.',
  },
  routing: {
    id: 'routing',
    category: 'Redes',
    version: 'routing-v1.0',
    formulaOrRules:
      'Evaluación secuencial: NACL stateless + Longest Prefix Match + SG stateful + Private Endpoint.',
    simplifications: 'Topología fija de 4 saltos; no modela BGP/Transit Gateway completo.',
  },
  'terraform-plan': {
    id: 'terraform-plan',
    category: 'IaC',
    version: 'tf-plan-v1.0',
    formulaOrRules: 'Clasificación de diffs (+, ~, -/+ ForceNew, drift exitcode 2, state lock).',
    simplifications: 'Escenarios curados sin grafo completo de dependencias HCL.',
  },
  k8s: {
    id: 'k8s',
    category: 'Cómputo/K8s',
    version: 'k8s-v1.0',
    formulaOrRules: 'min(desired, floor(CPU), floor(RAM)) + limit check + probes + PDB.',
    simplifications: 'Modelo de nodo homogéneo sin taints/tolerations ni affinity.',
  },
  'load-balancing': {
    id: 'load-balancing',
    category: 'Redes',
    version: 'lb-v1.0',
    formulaOrRules: 'Instancias sanas × capacidad vs pool × instancias frente a dbMaxConnections.',
    simplifications: 'No simula colas TCP ni slow-start de balanceadores reales.',
  },
  finops: {
    id: 'finops',
    category: 'SRE/FinOps',
    version: 'finops-v1.0',
    formulaOrRules: 'Modelo hipotético educativo: cómputo × factor + NAT ($0.045/GB) + egress.',
    simplifications: 'Tarifas ilustrativas fijas; no consulta APIs de precios en vivo.',
  },
  dr: {
    id: 'dr',
    category: 'Arquitectura',
    version: 'dr-v1.0',
    formulaOrRules: 'Comparación RTO/RPO alcanzado por estrategia vs objetivo de negocio.',
    simplifications: 'Tiempos promedio de referencia; el RTO real depende de GameDays.',
  },
  messaging: {
    id: 'messaging',
    category: 'Datos/Eventos',
    version: 'msg-v1.0',
    formulaOrRules: 'Reentregas at-least-once × idempotency_key + Outbox + DLQ.',
    simplifications: 'Modelo agregado por lote de 1000 eventos sin jitter individual.',
  },
  observability: {
    id: 'observability',
    category: 'SRE/FinOps',
    version: 'obs-v1.0',
    formulaOrRules: 'BurnRate = errorRate / (100 - SLO); Page si 1h>=14.4x y 6h>=6x.',
    simplifications: 'Ventanas 1h/6h fijas; no incluye supresión por mantenimiento.',
  },
};
