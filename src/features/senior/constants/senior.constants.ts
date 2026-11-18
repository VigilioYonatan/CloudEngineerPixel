import type { SeniorPostmortemExtras, SeniorStage } from '../../../lib/seniorSession.mjs';

export const MAX_CHECKPOINT_BYTES = 48 * 1024;
export const MAX_RECENT_ATTEMPTS = 20;

export const SENIOR_STAGE_ITEMS: readonly { id: SeniorStage; label: string }[] = [
  { id: 'investigar', label: 'Investigar' },
  { id: 'diagnosticar', label: 'Diagnosticar' },
  { id: 'decidir', label: 'Decidir' },
  { id: 'informe', label: 'Informe y evaluación' },
];

export const SENIOR_ADR_EXTRA_FIELDS: readonly [keyof SeniorPostmortemExtras, string, string][] = [
  [
    'impact',
    'Impacto en usuarios / SLO (opcional)',
    'Duración, usuarios afectados o error budget consumido.',
  ],
  [
    'discardedHypotheses',
    'Hipótesis descartadas (opcional)',
    'Qué señales analizaste y descartaste con evidencia.',
  ],
  [
    'communicationPlan',
    'Comunicación y responsables (opcional)',
    'Canales internos, statuspage y propietario del seguimiento.',
  ],
  [
    'preventiveActions',
    'Acciones preventivas (opcional)',
    'Reglas CI/CD, alertas o GameDays para evitar recurrencia.',
  ],
];
