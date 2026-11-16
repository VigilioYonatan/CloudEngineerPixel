/** Strict boundary for imported progress snapshots (untrusted JSON). */
export type ValidatedProgress = {
  completed: string[];
  senior: string[];
  quiz: Record<string, number>;
  notes: Record<string, string>;
  simRuns: number;
  seniorAttempts: Array<{
    caseId: string;
    provider: 'aws' | 'azure' | 'gcp';
    correct: boolean;
    score: number;
    at: string;
    examined: string[];
    report?: {cause:string;mitigation:string;validation:string;rollback?:string;citations?:string[]};
  }>;
};
export function validateProgressImport(payload:unknown):ValidatedProgress;
