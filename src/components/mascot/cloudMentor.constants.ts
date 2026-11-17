export type CloudMentorPose =
  | 'welcome'
  | 'celebrating'
  | 'thinking'
  | 'explaining'
  | 'coding'
  | 'architecture'
  | 'multicloud'
  | 'deploying'
  | 'monitoring'
  | 'security'
  | 'finops'
  | 'incident'
  | 'scaling'
  | 'milestone'
  | 'senior';

export type CloudMentorSize = 'hero' | 'banner' | 'card' | 'compact';

export type MentorPoseMeta = {
  id: CloudMentorPose;
  col: 0 | 1 | 2 | 3 | 4;
  row: 0 | 1 | 2;
  bgPosition: string;
  label: string;
};

export const CLOUD_MENTOR_POSES: Readonly<Record<CloudMentorPose, MentorPoseMeta>> = {
  welcome: {
    id: 'welcome',
    col: 0,
    row: 0,
    bgPosition: '0% 0%',
    label: 'Cloud Mentor dando la bienvenida con panel de topología',
  },
  celebrating: {
    id: 'celebrating',
    col: 1,
    row: 0,
    bgPosition: '25% 0%',
    label: 'Cloud Mentor celebrando respuesta correcta con pulgar arriba',
  },
  thinking: {
    id: 'thinking',
    col: 2,
    row: 0,
    bgPosition: '50% 0%',
    label: 'Cloud Mentor analizando hipótesis técnica',
  },
  explaining: {
    id: 'explaining',
    col: 3,
    row: 0,
    bgPosition: '75% 0%',
    label: 'Cloud Mentor explicando diagrama de servicios cloud',
  },
  coding: {
    id: 'coding',
    col: 4,
    row: 0,
    bgPosition: '100% 0%',
    label: 'Cloud Mentor programando infraestructura como código',
  },
  architecture: {
    id: 'architecture',
    col: 0,
    row: 1,
    bgPosition: '0% 50%',
    label: 'Cloud Mentor señalando capas de arquitectura',
  },
  multicloud: {
    id: 'multicloud',
    col: 1,
    row: 1,
    bgPosition: '25% 50%',
    label: 'Cloud Mentor comparando AWS, Azure y Google Cloud',
  },
  deploying: {
    id: 'deploying',
    col: 2,
    row: 1,
    bgPosition: '50% 50%',
    label: 'Cloud Mentor supervisando pipeline CI/CD OIDC',
  },
  monitoring: {
    id: 'monitoring',
    col: 3,
    row: 1,
    bgPosition: '75% 50%',
    label: 'Cloud Mentor revisando métricas y observabilidad SLO',
  },
  security: {
    id: 'security',
    col: 4,
    row: 1,
    bgPosition: '100% 50%',
    label: 'Cloud Mentor verificando escudo de mínimo privilegio IAM',
  },
  finops: {
    id: 'finops',
    col: 0,
    row: 2,
    bgPosition: '0% 100%',
    label: 'Cloud Mentor auditando presupuesto y costos FinOps',
  },
  incident: {
    id: 'incident',
    col: 1,
    row: 2,
    bgPosition: '25% 100%',
    label: 'Cloud Mentor investigando alerta de incidente en producción',
  },
  scaling: {
    id: 'scaling',
    col: 2,
    row: 2,
    bgPosition: '50% 100%',
    label: 'Cloud Mentor escalando capacidad resiliente',
  },
  milestone: {
    id: 'milestone',
    col: 3,
    row: 2,
    bgPosition: '75% 100%',
    label: 'Cloud Mentor presentando entregable verificado',
  },
  senior: {
    id: 'senior',
    col: 4,
    row: 2,
    bgPosition: '100% 100%',
    label: 'Cloud Mentor en modo Senior de respuesta operativa',
  },
};

export const CLOUD_MENTOR_DIMENSIONS: Readonly<
  Record<CloudMentorSize, { width: number; height: number }>
> = {
  hero: { width: 380, height: 380 },
  banner: { width: 210, height: 210 },
  card: { width: 108, height: 108 },
  compact: { width: 64, height: 64 },
};

export function getMentorPoseMeta(pose: CloudMentorPose): MentorPoseMeta {
  return CLOUD_MENTOR_POSES[pose];
}
