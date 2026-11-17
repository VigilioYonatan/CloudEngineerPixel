export const DEFAULT_CIDR_INPUT = '10.0.0.0/24';
export const DEFAULT_RPS = 1200;
export const DEFAULT_REPLICA_CAPACITY = 150;
export const DEFAULT_SLO_AVAILABILITY = 99.9;
export const DEFAULT_SLO_WINDOW_DAYS = 30;
export const MAX_RENDERED_REPLICA_BARS = 20;

export const SCALE_RPS_RANGE = {
  min: 100,
  max: 6000,
  step: 100,
} as const;

export const SCALE_CAPACITY_RANGE = {
  min: 50,
  max: 500,
  step: 25,
} as const;

export const SLO_AVAILABILITY_RANGE = {
  min: 95,
  max: 99.99,
  step: 0.01,
} as const;

export const SLO_WINDOW_DAYS_OPTIONS = [7, 30, 90] as const;
