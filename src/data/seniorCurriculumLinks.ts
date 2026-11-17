export type SeniorCurriculumLink = {
  moduleId: string;
  unitIndex: number;
  moduleTitle: string;
  unitHint: string;
};

export const seniorCurriculumLinks: Record<string, SeniorCurriculumLink> = {
  s01: {
    moduleId: 'iac',
    unitIndex: 0,
    moduleTitle: 'Terraform e IaC',
    unitHint: 'Plan, state, ForceNew y protección contra reemplazos destructivos',
  },
  s02: {
    moduleId: 'identity',
    unitIndex: 0,
    moduleTitle: 'IAM y seguridad inicial',
    unitHint: 'Mínimo privilegio, roles temporales y límites de permisos',
  },
  s03: {
    moduleId: 'governance',
    unitIndex: 1,
    moduleTitle: 'Seguridad y gobernanza',
    unitHint: 'Gestión de secretos, rotación y auditoría de credenciales',
  },
  s04: {
    moduleId: 'observability',
    unitIndex: 1,
    moduleTitle: 'CI/CD y observabilidad',
    unitHint: 'Readiness probes, rollbacks y correlación de errores 5xx',
  },
  s05: {
    moduleId: 'advanced-network',
    unitIndex: 0,
    moduleTitle: 'Redes avanzadas',
    unitHint: 'Subredes privadas, DNS interno, rutas y firewall',
  },
  s06: {
    moduleId: 'sre-finops',
    unitIndex: 1,
    moduleTitle: 'SRE, plataforma y FinOps',
    unitHint: 'Atribución de costos, etiquetado y control de egress',
  },
  s07: {
    moduleId: 'containers',
    unitIndex: 1,
    moduleTitle: 'Docker y Kubernetes',
    unitHint: 'Diagnóstico de CrashLoopBackOff, eventos y logs previos',
  },
  s08: {
    moduleId: 'resilience',
    unitIndex: 1,
    moduleTitle: 'HA y recuperación',
    unitHint: 'Pruebas de restauración, RTO y RPO medibles',
  },
  s09: {
    moduleId: 'storage',
    unitIndex: 0,
    moduleTitle: 'Storage y bases de datos',
    unitHint: 'Políticas de bucket, cifrado y bloqueo de acceso público',
  },
  s10: {
    moduleId: 'sre-finops',
    unitIndex: 0,
    moduleTitle: 'SRE, plataforma y FinOps',
    unitHint: 'SLI, SLO y política de error budget',
  },
  s11: {
    moduleId: 'software-architecture',
    unitIndex: 1,
    moduleTitle: 'Arquitectura Cloud Native',
    unitHint: 'Latencia p99, desacoplamiento y trazas distribuidas',
  },
  s12: {
    moduleId: 'governance',
    unitIndex: 2,
    moduleTitle: 'Seguridad y gobernanza',
    unitHint: 'Contención en K8s, preservación forense y admisión',
  },
  s13: {
    moduleId: 'resilience',
    unitIndex: 0,
    moduleTitle: 'HA y recuperación',
    unitHint: 'Failover multi-región, consistencia y runbooks',
  },
  s14: {
    moduleId: 'data-architecture',
    unitIndex: 1,
    moduleTitle: 'Datos e integración',
    unitHint: 'Mensajería at-least-once e idempotencia',
  },
  s15: {
    moduleId: 'observability',
    unitIndex: 0,
    moduleTitle: 'CI/CD y observabilidad',
    unitHint: 'Seguridad de pipelines, digest pin y federación OIDC',
  },
  s16: {
    moduleId: 'compute',
    unitIndex: 1,
    moduleTitle: 'Cómputo y Linux',
    unitHint: 'Autoscaling, pools de conexiones y límites de capacidad',
  },
  s17: {
    moduleId: 'capstone',
    unitIndex: 0,
    moduleTitle: 'Proyecto Arquitecto Multicloud',
    unitHint: 'Criterios TCO, complejidad operativa y ADR multicloud',
  },
  s18: {
    moduleId: 'capstone',
    unitIndex: 1,
    moduleTitle: 'Proyecto Arquitecto Multicloud',
    unitHint: 'Defensa integral de arquitectura, DR y cumplimiento',
  },
};
