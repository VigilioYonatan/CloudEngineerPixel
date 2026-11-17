import type { Provider } from '../../../data/course';

export type ProjectRubricItem = {
  id: string;
  label: string;
  weight: number;
  criteria: string;
};

export type PortfolioProjectDefinition = {
  id: 'project-1' | 'project-2' | 'project-3';
  number: string;
  shortTab: string;
  title: string;
  levelLabel: string;
  targetModuleId: string;
  objective: string;
  threatAndSreFocus: string;
  cloudEquivalents: Readonly<Record<Provider, string>>;
  deliverables: readonly string[];
  rubric: readonly ProjectRubricItem[];
};

export const PORTFOLIO_PROJECTS: readonly PortfolioProjectDefinition[] = [
  {
    id: 'project-1',
    number: '01',
    shortTab: 'Proyecto 1 · Fundamentos',
    title: 'Sitio Estático Seguro, Distribución Global y Control de Costos',
    levelLabel: 'NIVEL 1 · FUNDAMENTOS (60H)',
    targetModuleId: 'costs',
    objective:
      'Desplegar un activo estático sin acceso público directo al bucket de origen, documentar presupuesto/alertas y demostrar eliminación verificable.',
    threatAndSreFocus:
      'Superficie mínima (bloqueo de ACL públicas, HTTPS extremo a extremo), presupuesto preventivo con alertas y evidencia de cleanup sin recursos huérfanos.',
    cloudEquivalents: {
      aws: 'Amazon S3 privado + CloudFront OAC + AWS Budgets',
      azure: 'Azure Storage estático privado + Azure Front Door + Cost Management Alerts',
      gcp: 'Cloud Storage privado + Cloud CDN / Load Balancing + Cloud Billing Budgets',
    },
    deliverables: [
      'Diagrama de topología borde-origen con flujo HTTPS y bloqueo de acceso público directo.',
      'Presupuesto mensual configurado con umbral de alerta documentado antes del despliegue.',
      'Política IAM de mínimo privilegio para lectura exclusiva desde la capa CDN.',
      'Verificación HTTP de cabeceras de seguridad y código de estado esperado.',
      'Comparativa técnica de equivalencias entre AWS, Azure y Google Cloud sin exigir triple gasto.',
      'Registro de costos observados y procedimiento completo de cleanup verificado.',
    ],
    rubric: [
      {
        id: 'security',
        label: 'Seguridad de origen y mínimo privilegio',
        weight: 30,
        criteria: 'Origen sin exposición pública directa y política acotada al recurso.',
      },
      {
        id: 'architecture',
        label: 'Claridad de topología y entrega HTTP',
        weight: 25,
        criteria: 'Diagrama trazable y verificación reproducible de cabeceras y caché.',
      },
      {
        id: 'finops',
        label: 'Presupuesto, atribución y cleanup',
        weight: 25,
        criteria: 'Alertas configuradas, etiquetas de costo y destrucción comprobada.',
      },
      {
        id: 'documentation',
        label: 'Comparativa multicloud y ADR',
        weight: 20,
        criteria: 'Contraste honesto de trade-offs entre los tres proveedores.',
      },
    ],
  },
  {
    id: 'project-2',
    number: '02',
    shortTab: 'Proyecto 2 · Ingeniería',
    title: 'API Contenedores/Serverless + Terraform IaC + CI/CD OIDC + Observabilidad',
    levelLabel: 'NIVEL 2 · INGENIERÍA CLOUD (80H)',
    targetModuleId: 'observability',
    objective:
      'Construir y entregar una API de varias capas mediante IaC reproducible, pipeline federado con OIDC sin claves estáticas, telemetría y prueba real de rollback.',
    threatAndSreFocus:
      'Eliminación de secretos de larga vida en CI/CD mediante OIDC, state locking en Terraform, health checks de liveness/readiness y métricas/logs correlacionados.',
    cloudEquivalents: {
      aws: 'ECS Fargate / Lambda + RDS/DynamoDB + Terraform S3 lockfile + IAM OIDC + CloudWatch',
      azure:
        'Container Apps / Functions + Azure SQL/Cosmos + Terraform Blob state + Entra OIDC + Azure Monitor',
      gcp: 'Cloud Run + Cloud SQL/Firestore + Terraform GCS state + Workload Identity + Cloud Operations',
    },
    deliverables: [
      'Repositorio estructurado con pruebas automatizadas y Dockerfile multi-stage sin usuario root.',
      'Módulos Terraform con variables tipadas, state remoto con locking y salida de terraform plan limpia.',
      'Workflow CI/CD con federación OIDC (cero claves AKIA, client secrets o JSON keys estáticas).',
      'Gestión segura de configuración y secretos en runtime sin variables sensibles en imagen.',
      'Logs estructurados JSON, métricas RED (Rate, Errors, Duration) y alerta operativa.',
      'Simulación de despliegue defectuoso, detección por health check y ejecución de rollback.',
      'Runbook operativo de diagnóstico, contención y limpieza de entorno.',
    ],
    rubric: [
      {
        id: 'iac',
        label: 'Reproducibilidad IaC y seguridad de estado',
        weight: 25,
        criteria:
          'Terraform modular, locking activo y ausencia de cambios destructivos no previstos.',
      },
      {
        id: 'cicd-oidc',
        label: 'Supply chain y federación OIDC',
        weight: 25,
        criteria: 'Identidad efímera acotada por rama/repositorio y puertas automáticas en CI.',
      },
      {
        id: 'observability',
        label: 'Telemetría accionable y alertas',
        weight: 25,
        criteria: 'Señales correlacionables para diagnosticar latencia y fallos sin acceso SSH.',
      },
      {
        id: 'rollback',
        label: 'Reversibilidad probada y runbook',
        weight: 25,
        criteria: 'Evidencia de rollback controlado y documentación operativa clara.',
      },
    ],
  },
  {
    id: 'project-3',
    number: '03',
    shortTab: 'Proyecto 3 · Capstone',
    title: 'Capstone Arquitecto Multicloud: Plataforma Transaccional, Threat Model, SLO y TCO',
    levelLabel: 'NIVEL 3 · ARQUITECTURA & SRE (100H)',
    targetModuleId: 'capstone',
    objective:
      'Diseñar y defender una plataforma transaccional resiliente con requisitos medibles, justificando con rigor cuándo elegir una sola nube frente a arquitectura multicloud.',
    threatAndSreFocus:
      'Modelado explícito de activos/actores/fronteras de confianza, SLI/SLO con error budget, objetivos RTO/RPO demostrables, idempotencia de eventos y análisis TCO.',
    cloudEquivalents: {
      aws: 'Multi-AZ VPC + EKS/ECS + Aurora/RDS + SQS/Outbox + KMS + Route 53 + Well-Architected',
      azure: 'VNet Zones + AKS/Container Apps + Azure SQL Zone-Redundant + Service Bus + Key Vault',
      gcp: 'Global VPC + Regional GKE/Cloud Run + Cloud Spanner/Cloud SQL HA + Pub/Sub + Cloud KMS',
    },
    deliverables: [
      'Especificación de requisitos funcionales y no funcionales medibles (latencia p95, throughput, disponibilidad).',
      'Diagramas de contexto y contenedores (C4) con fronteras de red y de confianza.',
      'Threat Model completo: activos, actores, vectores de ataque, controles preventivos/detectivos y riesgo residual.',
      'Estrategia de alta disponibilidad y recuperación ante desastres con RTO y RPO justificados.',
      'Definición de SLI, SLO, política de consumo de error budget y alertas multi-ventana.',
      'Presupuesto TCO desglosado (cómputo, datos, egress, observabilidad) y palancas FinOps.',
      'Architecture Decision Record (ADR) evaluando al menos dos alternativas reales y descartando complejidad accidental.',
      'Respuesta documentada ante un escenario de fallo regional o incidente Senior vinculado.',
    ],
    rubric: [
      {
        id: 'functionality',
        label: 'Funcionalidad y cumplimiento de requisitos',
        weight: 20,
        criteria: 'Trazabilidad completa entre requisitos de negocio y componentes propuestos.',
      },
      {
        id: 'security',
        label: 'Seguridad, threat modeling y privacidad',
        weight: 20,
        criteria: 'Fronteras de confianza, KMS/IAM mínimo privilegio y mitigaciones verificables.',
      },
      {
        id: 'resilience',
        label: 'Resiliencia, RTO/RPO y pruebas de recuperación',
        weight: 20,
        criteria: 'Continuidad ante fallos zonales/regionales y estrategia de restore ensayable.',
      },
      {
        id: 'operability',
        label: 'Operabilidad, observabilidad y SLO',
        weight: 15,
        criteria: 'SLIs centrados en usuario, error budget accionable y automatización CI/CD.',
      },
      {
        id: 'finops',
        label: 'Costos, TCO y sostenibilidad financiera',
        weight: 10,
        criteria: 'Estimación honesta de costos unitarios, transferencia de red y gobernanza.',
      },
      {
        id: 'adr',
        label: 'Argumentación técnica, ADR y defensa',
        weight: 15,
        criteria: 'Decisiones explícitas con alternativas, trade-offs y límites reconocidos.',
      },
    ],
  },
];
