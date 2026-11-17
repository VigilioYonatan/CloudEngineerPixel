import type { Level, Provider } from '../../../data/course';

export type LabModality = 'simulado' | 'local-docker-kind' | 'cuenta-propia';

export type LabCostTier = 'gratis-local' | 'free-tier-elegible' | 'genera-cargos';

export type LabCatalogCategory = 'module-lab' | 'devsecops-oidc' | 'portfolio-project';

export type ModuleLabProfile = {
  modalities: readonly LabModality[];
  costTier: LabCostTier;
};

export const MODULE_LAB_PROFILES: Readonly<Record<string, ModuleLabProfile>> = {
  'cloud-fundamentals': {
    modalities: ['simulado', 'cuenta-propia'],
    costTier: 'gratis-local',
  },
  networks: {
    modalities: ['simulado', 'local-docker-kind', 'cuenta-propia'],
    costTier: 'free-tier-elegible',
  },
  compute: {
    modalities: ['simulado', 'local-docker-kind', 'cuenta-propia'],
    costTier: 'genera-cargos',
  },
  storage: {
    modalities: ['local-docker-kind', 'cuenta-propia'],
    costTier: 'free-tier-elegible',
  },
  identity: {
    modalities: ['simulado', 'cuenta-propia'],
    costTier: 'free-tier-elegible',
  },
  costs: {
    modalities: ['local-docker-kind', 'cuenta-propia'],
    costTier: 'free-tier-elegible',
  },
  'cloud-cli': {
    modalities: ['local-docker-kind', 'cuenta-propia'],
    costTier: 'gratis-local',
  },
  'advanced-network': {
    modalities: ['simulado', 'local-docker-kind', 'cuenta-propia'],
    costTier: 'genera-cargos',
  },
  serverless: {
    modalities: ['simulado', 'local-docker-kind', 'cuenta-propia'],
    costTier: 'free-tier-elegible',
  },
  containers: {
    modalities: ['simulado', 'local-docker-kind', 'cuenta-propia'],
    costTier: 'genera-cargos',
  },
  iac: {
    modalities: ['local-docker-kind', 'cuenta-propia'],
    costTier: 'gratis-local',
  },
  observability: {
    modalities: ['simulado', 'local-docker-kind', 'cuenta-propia'],
    costTier: 'genera-cargos',
  },
  'software-architecture': {
    modalities: ['simulado', 'local-docker-kind'],
    costTier: 'gratis-local',
  },
  governance: {
    modalities: ['simulado', 'cuenta-propia'],
    costTier: 'free-tier-elegible',
  },
  resilience: {
    modalities: ['simulado', 'cuenta-propia'],
    costTier: 'genera-cargos',
  },
  'data-architecture': {
    modalities: ['local-docker-kind', 'cuenta-propia'],
    costTier: 'genera-cargos',
  },
  'sre-finops': {
    modalities: ['simulado', 'cuenta-propia'],
    costTier: 'genera-cargos',
  },
  capstone: {
    modalities: ['simulado', 'local-docker-kind', 'cuenta-propia'],
    costTier: 'genera-cargos',
  },
};

export type SpecialLabSeed = {
  id: string;
  category: 'devsecops-oidc' | 'portfolio-project';
  provider: Provider | 'multicloud';
  level: Level;
  title: string;
  summary: string;
  guidePath: string;
  targetModuleId: string;
  modalities: readonly LabModality[];
  costTier: LabCostTier;
  tags: readonly string[];
};

export const SPECIAL_LAB_SEEDS: readonly SpecialLabSeed[] = [
  {
    id: 'devsecops-aws-oidc',
    category: 'devsecops-oidc',
    provider: 'aws',
    level: 'intermedio',
    title: 'DevSecOps OIDC · GitHub Actions hacia AWS IAM Role',
    summary:
      'Federación OIDC sin claves estáticas AKIA, trust policy por repositorio/rama y mínimo privilegio.',
    guidePath: 'labs/devsecops/aws-oidc.md',
    targetModuleId: 'observability',
    modalities: ['cuenta-propia'],
    costTier: 'free-tier-elegible',
    tags: ['OIDC', 'IAM', 'GitHub Actions'],
  },
  {
    id: 'devsecops-azure-oidc',
    category: 'devsecops-oidc',
    provider: 'azure',
    level: 'intermedio',
    title: 'DevSecOps OIDC · Workload Identity Federation en Microsoft Entra ID',
    summary:
      'Credenciales federadas efímeras para despliegues CI/CD en Azure sin client secrets permanentes.',
    guidePath: 'labs/devsecops/azure-oidc.md',
    targetModuleId: 'observability',
    modalities: ['cuenta-propia'],
    costTier: 'free-tier-elegible',
    tags: ['OIDC', 'Entra ID', 'CI/CD'],
  },
  {
    id: 'devsecops-gcp-oidc',
    category: 'devsecops-oidc',
    provider: 'gcp',
    level: 'intermedio',
    title: 'DevSecOps OIDC · Workload Identity Pool en Google Cloud',
    summary:
      'Autenticación sin llaves JSON de Service Account mediante attribute conditions auditables.',
    guidePath: 'labs/devsecops/gcp-oidc.md',
    targetModuleId: 'observability',
    modalities: ['cuenta-propia'],
    costTier: 'free-tier-elegible',
    tags: ['OIDC', 'Workload Identity', 'GCP'],
  },
  {
    id: 'project-1-static-edge',
    category: 'portfolio-project',
    provider: 'multicloud',
    level: 'fundamentos',
    title: 'Proyecto Integrador 1 · Sitio Estático Seguro, Presupuesto y Cleanup',
    summary:
      'Despliegue controlado con política mínima, verificación HTTP, alerta presupuestaria y eliminación documentada.',
    guidePath: 'labs/README.md',
    targetModuleId: 'costs',
    modalities: ['local-docker-kind', 'cuenta-propia'],
    costTier: 'free-tier-elegible',
    tags: ['Portfolio', 'Proyecto 1', 'FinOps'],
  },
  {
    id: 'project-2-api-platform',
    category: 'portfolio-project',
    provider: 'multicloud',
    level: 'intermedio',
    title: 'Proyecto Integrador 2 · API Contenedores/Serverless + IaC + OIDC + Observabilidad',
    summary:
      'Servicio de varias capas reproducible con Terraform plan, pipeline OIDC, métricas/logs y prueba de rollback.',
    guidePath: 'labs/README.md',
    targetModuleId: 'observability',
    modalities: ['local-docker-kind', 'cuenta-propia'],
    costTier: 'gratis-local',
    tags: ['Portfolio', 'Proyecto 2', 'IaC', 'SRE'],
  },
  {
    id: 'project-3-multicloud-capstone',
    category: 'portfolio-project',
    provider: 'multicloud',
    level: 'avanzado',
    title: 'Proyecto Integrador 3 · Capstone Arquitecto Multicloud Defendible',
    summary:
      'Diseño transaccional con C4, threat modeling, RTO/RPO, presupuesto TCO, SLO/error budget y ADR.',
    guidePath: 'labs/README.md',
    targetModuleId: 'capstone',
    modalities: ['simulado', 'local-docker-kind'],
    costTier: 'gratis-local',
    tags: ['Portfolio', 'Capstone', 'ADR', 'RTO/RPO'],
  },
];

export const COST_TIER_LABELS: Readonly<Record<LabCostTier, string>> = {
  'gratis-local': 'Gratis local',
  'free-tier-elegible': 'Free-tier elegible',
  'genera-cargos': 'Genera cargos',
};

export const MODALITY_LABELS: Readonly<Record<LabModality, string>> = {
  simulado: 'Simulado en navegador',
  'local-docker-kind': 'Local Docker / Kind',
  'cuenta-propia': 'Cuenta cloud propia',
};
