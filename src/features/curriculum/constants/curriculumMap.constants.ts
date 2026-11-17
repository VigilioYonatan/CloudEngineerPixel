import type { SimulatorRouteId } from '../../../app/router';

export type LearningModality = 'Concepto' | 'Simulador' | 'Local' | 'Cloud Real';

export type CurriculumModuleMeta = {
  prerequisites: readonly string[];
  modalities: readonly LearningModality[];
  linkedSimulator?: SimulatorRouteId;
};

export const CURRICULUM_MODULE_META: Readonly<Record<string, CurriculumModuleMeta>> = {
  'cloud-fundamentals': {
    prerequisites: ['Ninguno — punto de partida recomendado'],
    modalities: ['Concepto', 'Simulador', 'Cloud Real'],
    linkedSimulator: 'architecture',
  },
  networks: {
    prerequisites: ['Fundamentos Cloud'],
    modalities: ['Concepto', 'Simulador', 'Local', 'Cloud Real'],
    linkedSimulator: 'cidr',
  },
  compute: {
    prerequisites: ['Fundamentos Cloud', 'Redes y conectividad'],
    modalities: ['Concepto', 'Simulador', 'Local', 'Cloud Real'],
    linkedSimulator: 'scale',
  },
  storage: {
    prerequisites: ['Fundamentos Cloud', 'Cómputo y Linux'],
    modalities: ['Concepto', 'Local', 'Cloud Real'],
  },
  identity: {
    prerequisites: ['Fundamentos Cloud'],
    modalities: ['Concepto', 'Simulador', 'Cloud Real'],
    linkedSimulator: 'iam',
  },
  costs: {
    prerequisites: ['Fundamentos Cloud', 'IAM y seguridad inicial'],
    modalities: ['Concepto', 'Local', 'Cloud Real'],
  },
  'cloud-cli': {
    prerequisites: ['Cómputo y Linux', 'IAM y seguridad inicial'],
    modalities: ['Concepto', 'Local', 'Cloud Real'],
  },
  'advanced-network': {
    prerequisites: ['Redes y conectividad', 'Cómputo y Linux'],
    modalities: ['Concepto', 'Simulador', 'Local', 'Cloud Real'],
    linkedSimulator: 'cidr',
  },
  serverless: {
    prerequisites: ['IAM y seguridad inicial', 'CLI y automatización'],
    modalities: ['Concepto', 'Simulador', 'Local', 'Cloud Real'],
    linkedSimulator: 'architecture',
  },
  containers: {
    prerequisites: ['Cómputo y Linux', 'Redes y conectividad'],
    modalities: ['Concepto', 'Simulador', 'Local', 'Cloud Real'],
    linkedSimulator: 'scale',
  },
  iac: {
    prerequisites: ['CLI y automatización', 'Redes y conectividad', 'IAM y seguridad inicial'],
    modalities: ['Concepto', 'Local', 'Cloud Real'],
  },
  observability: {
    prerequisites: ['Docker y Kubernetes', 'Terraform e IaC'],
    modalities: ['Concepto', 'Simulador', 'Local', 'Cloud Real'],
    linkedSimulator: 'slo',
  },
  'software-architecture': {
    prerequisites: ['Serverless y APIs', 'Docker y Kubernetes'],
    modalities: ['Concepto', 'Simulador', 'Local'],
    linkedSimulator: 'architecture',
  },
  governance: {
    prerequisites: ['IAM y seguridad inicial', 'Terraform e IaC'],
    modalities: ['Concepto', 'Simulador', 'Cloud Real'],
    linkedSimulator: 'iam',
  },
  resilience: {
    prerequisites: ['Storage y bases de datos', 'Redes avanzadas', 'CI/CD y observabilidad'],
    modalities: ['Concepto', 'Simulador', 'Cloud Real'],
    linkedSimulator: 'slo',
  },
  'data-architecture': {
    prerequisites: ['Storage y bases de datos', 'Serverless y APIs'],
    modalities: ['Concepto', 'Local', 'Cloud Real'],
  },
  'sre-finops': {
    prerequisites: ['Costos y primer despliegue', 'CI/CD y observabilidad', 'HA y recuperación'],
    modalities: ['Concepto', 'Simulador', 'Cloud Real'],
    linkedSimulator: 'slo',
  },
  capstone: {
    prerequisites: [
      'Arquitectura Cloud Native',
      'Seguridad y gobernanza',
      'SRE, plataforma y FinOps',
    ],
    modalities: ['Concepto', 'Simulador', 'Local', 'Cloud Real'],
    linkedSimulator: 'architecture',
  },
};
