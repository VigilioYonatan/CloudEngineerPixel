export type ObservabilityInput = {
  sloTargetPct: number;
  errorRate1hPct: number;
  errorRate6hPct: number;
  cpuPct: number;
  traceparentValid: boolean;
};

export type ObservabilityResult = {
  modelVersion: string;
  burnRate1h: number;
  burnRate6h: number;
  pageAlert: boolean;
  ticketAlert: boolean;
  noiseCpuOnly: boolean;
  severityLabel: 'Crítica (Page)' | 'Alta (Ticket)' | 'Normal';
  summary: string;
  steps: string[];
};

export function runObservabilityEngine(input: ObservabilityInput): ObservabilityResult {
  const allowedErrorPct = Math.max(0.001, 100 - input.sloTargetPct);
  const burnRate1h = Number((input.errorRate1hPct / allowedErrorPct).toFixed(2));
  const burnRate6h = Number((input.errorRate6hPct / allowedErrorPct).toFixed(2));

  const pageAlert = burnRate1h >= 14.4 && burnRate6h >= 6;
  const ticketAlert = !pageAlert && burnRate6h >= 3;
  const noiseCpuOnly = !pageAlert && !ticketAlert && input.cpuPct >= 85;
  const severityLabel = pageAlert ? 'Crítica (Page)' : ticketAlert ? 'Alta (Ticket)' : 'Normal';

  const summary = pageAlert
    ? `PAGE SRE: Burn rate 1h (${burnRate1h}x) y 6h (${burnRate6h}x) agotan el error budget en horas.`
    : ticketAlert
      ? `TICKET: Degradación sostenida en ventana 6h (${burnRate6h}x) sin pico inmediato.`
      : noiseCpuOnly
        ? `CPU al ${input.cpuPct}% con SLI sano: no paginar por CPU aislada.`
        : 'SLI dentro de presupuesto de error.';

  return {
    modelVersion: 'obs-v1.0',
    burnRate1h,
    burnRate6h,
    pageAlert,
    ticketAlert,
    noiseCpuOnly,
    severityLabel,
    summary,
    steps: [
      `1. Presupuesto base (100% - ${input.sloTargetPct}%): ${allowedErrorPct.toFixed(3)}% errores permitidos.`,
      `2. Burn rate ventana corta (1h): ${burnRate1h}x | ventana larga (6h): ${burnRate6h}x.`,
      `3. Correlación W3C traceparent: ${input.traceparentValid ? 'válida (00-traceId-spanId-01)' : 'ausente: imposible seguir spans'}.`,
    ],
  };
}
