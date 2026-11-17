/** Strict boundary and V1-V9 -> V2 migration for progress snapshots (untrusted JSON). */
export const PROGRESS_SCHEMA_VERSION: 2;

export type ValidatedSeniorAttempt = {
  caseId: string;
  provider: 'aws' | 'azure' | 'gcp';
  correct: boolean;
  score: number;
  at: string;
  examined: string[];
  report?: {
    cause: string;
    mitigation: string;
    validation: string;
    rollback?: string;
    citations?: string[];
  };
};

export type ValidatedProgress = {
  schemaVersion: 2;
  migratedFromVersion: 1 | 2;
  updatedAt: string;
  completed: string[];
  senior: string[];
  quiz: Record<string, number>;
  notes: Record<string, string>;
  simRuns: number;
  seniorAttempts: ValidatedSeniorAttempt[];
};

export type StoredProgressInspection = {
  status: 'empty' | 'ok' | 'corrupted';
  progress: ValidatedProgress;
  raw: string | null;
  error: string | null;
};

export function createEmptyValidatedProgress(now_iso?: string): ValidatedProgress;
export function validateProgressImport(payload: unknown, now_iso?: string): ValidatedProgress;
export function migrateProgressSnapshot(raw_input: unknown, now_iso?: string): ValidatedProgress;
export function inspectStoredProgressRaw(
  raw_string: string | null | undefined,
  now_iso?: string,
): StoredProgressInspection;
