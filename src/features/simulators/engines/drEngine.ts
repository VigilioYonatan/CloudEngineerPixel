export type DrStrategyId = 'backup-restore' | 'pilot-light' | 'warm-standby' | 'active-active';

export type DrInput = {
  strategy: DrStrategyId;
  targetRtoMinutes: number;
  targetRpoMinutes: number;
};

export type DrResult = {
  modelVersion: string;
  strategy: DrStrategyId;
  achievedRtoMinutes: number;
  achievedRpoMinutes: number;
  relativeCost: string;
  meetsTargets: boolean;
  summary: string;
  steps: string[];
};

const DR_PROFILES: Record<DrStrategyId, { rto: number; rpo: number; cost: string; label: string }> =
  {
    'backup-restore': { rto: 240, rpo: 60, cost: '1x (Bajo)', label: 'Backup & Restore' },
    'pilot-light': { rto: 45, rpo: 15, cost: '2x (Moderado)', label: 'Pilot Light' },
    'warm-standby': { rto: 15, rpo: 5, cost: '3.5x (Alto)', label: 'Warm Standby' },
    'active-active': { rto: 1, rpo: 0, cost: '6x (Muy Alto)', label: 'Multi-Site Active/Active' },
  };

export function runDrEngine(input: DrInput): DrResult {
  const profile = DR_PROFILES[input.strategy];
  const meetsRto = profile.rto <= input.targetRtoMinutes;
  const meetsRpo = profile.rpo <= input.targetRpoMinutes;
  const meetsTargets = meetsRto && meetsRpo;

  return {
    modelVersion: 'dr-v1.0',
    strategy: input.strategy,
    achievedRtoMinutes: profile.rto,
    achievedRpoMinutes: profile.rpo,
    relativeCost: profile.cost,
    meetsTargets,
    summary: meetsTargets
      ? `${profile.label} CUMPLE objetivos (RTO ${profile.rto}m <= ${input.targetRtoMinutes}m, RPO ${profile.rpo}m <= ${input.targetRpoMinutes}m).`
      : `${profile.label} INCUMPLE objetivos exigidos (${!meetsRto ? 'RTO excedido' : 'RPO excedido'}).`,
    steps: [
      `1. Estrategia ${profile.label} · Costo relativo: ${profile.cost}.`,
      `2. RTO alcanzado ${profile.rto} min vs objetivo ${input.targetRtoMinutes} min (${meetsRto ? 'OK' : 'EXCEDIDO'}).`,
      `3. RPO alcanzado ${profile.rpo} min vs objetivo ${input.targetRpoMinutes} min (${meetsRpo ? 'OK' : 'EXCEDIDO'}).`,
    ],
  };
}
