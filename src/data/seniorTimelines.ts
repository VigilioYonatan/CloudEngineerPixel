import type { Provider } from './course';
import { challenges } from './senior';
import { investigationFor } from './seniorInvestigations';

export type TimelineEventKind = 'change' | 'degradation' | 'alert' | 'noise' | 'escalation';

export type IncidentTimelineEvent = {
  offset: string;
  kind: TimelineEventKind;
  title: string;
  source: string;
  detail: string;
  causalPrompt: string;
};

export type IncidentTimelineModel = {
  caseId: string;
  provider: Provider;
  events: readonly IncidentTimelineEvent[];
};

const TELEMETRY_LABELS: Readonly<
  Record<Provider, { audit: string; metrics: string; pager: string }>
> = {
  aws: {
    audit: 'AWS CloudTrail / Config',
    metrics: 'Amazon CloudWatch Alarms',
    pager: 'Incident Manager · Guardia SRE',
  },
  azure: {
    audit: 'Azure Activity Log',
    metrics: 'Azure Monitor Metric Alerts',
    pager: 'Monitor Action Group · Guardia SRE',
  },
  gcp: {
    audit: 'Google Cloud Audit Logs',
    metrics: 'Cloud Monitoring Alerting',
    pager: 'Incident Response · Guardia SRE',
  },
};

export function getIncidentTimeline(caseId: string, provider: Provider): IncidentTimelineModel {
  const challenge = challenges.find((item) => item.id === caseId) || challenges[0];
  const dossier = investigationFor(challenge.id, provider);
  const serviceLabel = dossier.service[provider];
  const labels = TELEMETRY_LABELS[provider];
  const distractor = dossier.exhibits.find((e) => e.id === 'distractor');

  const events: IncidentTimelineEvent[] = [
    {
      offset: 'T-15m',
      kind: 'change',
      title: `Evento precursor sobre ${serviceLabel}`,
      source: labels.audit,
      detail: `Se registra cambio de configuración, tráfico o política en el ámbito de ${serviceLabel} (${challenge.category}).`,
      causalPrompt:
        '¿Qué evidencia primaria confirma qué cambió exactamente antes de la degradación?',
    },
    {
      offset: 'T-03m',
      kind: 'degradation',
      title: 'Desviación temprana de señal técnica',
      source: labels.metrics,
      detail: `Primer síntoma medible en ${serviceLabel}: ${challenge.brief}`,
      causalPrompt: '¿La desviación afecta disponibilidad, latencia, seguridad o presupuesto?',
    },
    {
      offset: 'T+00m',
      kind: 'alert',
      title: `Disparo de alerta operativa (${challenge.severity})`,
      source: labels.metrics,
      detail: `Se abre el expediente ${challenge.id.toUpperCase()} en ${provider.toUpperCase()} al superar el umbral definido.`,
      causalPrompt:
        'Antes de ejecutar acciones irreversibles, ¿cuál es el radio de impacto actual?',
    },
    {
      offset: 'T+04m',
      kind: 'noise',
      title: 'Síntoma colateral / ruido operativo benigno',
      source: labels.metrics,
      detail:
        distractor?.body ||
        'Evento rutinario paralelo dentro de su línea base histórica sin relación causal.',
      causalPrompt:
        'Contraprueba SRE: ¿por qué correlacionar este ruido con la caída llevaría a una mitigación errónea?',
    },
    {
      offset: 'T+10m',
      kind: 'escalation',
      title: 'Escalamiento a guardia Senior y bloqueo de cambios',
      source: labels.pager,
      detail:
        'Se congela cualquier despliegue adicional mientras se valida hipótesis causal y plan de rollback.',
      causalPrompt:
        '¿Qué métrica objetiva confirmará que la contención restauró el estado saludable?',
    },
  ];

  return {
    caseId: challenge.id,
    provider,
    events,
  };
}
