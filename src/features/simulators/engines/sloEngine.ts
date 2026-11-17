export type SloEngineResult = {
  modelVersion: string;
  downtimeSeconds: number;
  minutes: number;
  weeklyBudgetSeconds: number;
  steps: string[];
};

export function runSloEngine(availability: number, days: number): SloEngineResult {
  const errorRatio = Math.max(0, 1 - availability / 100);
  const totalWindowSeconds = days * 24 * 60 * 60;
  const downtimeSeconds = Math.round(errorRatio * totalWindowSeconds);
  const minutes = Math.floor(downtimeSeconds / 60);
  const weeklyBudgetSeconds = Math.round((downtimeSeconds / Math.max(1, days)) * 7);

  return {
    modelVersion: 'slo-v2.0',
    downtimeSeconds,
    minutes,
    weeklyBudgetSeconds,
    steps: [
      `1. Presupuesto de error = 100% - ${availability}% = ${(errorRatio * 100).toFixed(3)}%.`,
      `2. Ventana de ${days} días = ${totalWindowSeconds.toLocaleString('es-ES')} segundos totales.`,
      `3. Error budget permitido: ${minutes} min (${downtimeSeconds} s) totales · ~${weeklyBudgetSeconds} s/semana.`,
    ],
  };
}
