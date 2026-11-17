export type SchemaValidationResult = {
  valid: boolean;
  errors: string[];
};

export type StudentSubmissionSummary = {
  caseId: string;
  provider: 'aws' | 'azure' | 'gcp';
  score: number | null;
  decision: string | null;
  report: {
    cause: string;
    mitigation: string;
    rollback: string;
    validation: string;
  };
};

export function validateInstructorReviewSchema(data: unknown): SchemaValidationResult;
export function parseStudentSubmissionFile(rawText: string): StudentSubmissionSummary;
