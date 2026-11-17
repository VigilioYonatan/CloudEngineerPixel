import type { SeniorStage } from '../../../lib/seniorSession.mjs';

export const MAX_CHECKPOINT_BYTES = 48 * 1024;
export const MAX_RECENT_ATTEMPTS = 20;

export const SENIOR_STAGE_ITEMS: readonly { id: SeniorStage; label: string }[] = [
  { id: 'investigar', label: 'Investigar' },
  { id: 'diagnosticar', label: 'Diagnosticar' },
  { id: 'decidir', label: 'Decidir' },
  { id: 'informe', label: 'Informe y evaluación' },
];
