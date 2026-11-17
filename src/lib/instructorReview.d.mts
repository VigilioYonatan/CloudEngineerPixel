export type CloudProvider = 'aws' | 'azure' | 'gcp';
export type ReviewCriterion = 'evidence' | 'security' | 'recovery' | 'validation' | 'communication';
export type InstructorReview = {
  version: number;
  provider: CloudProvider;
  caseId: string;
  reviewer: string;
  notes: string;
  scores: Record<ReviewCriterion, number | null>;
  reviewedAt: string | null;
};
export type InstructorReviewGrade = {
  score: number | null;
  complete: boolean;
  criticalRisk: boolean;
  decision: 'sin-revisar' | 'aprobado-en-revision-local' | 'requiere-mejoras';
  official: false;
};
export declare const REVIEW_VERSION: number;
export declare const REVIEW_MAX_BYTES: number;
export declare const REVIEW_WEIGHTS: Readonly<Record<ReviewCriterion, number>>;
export declare const REVIEW_KEYS: ReadonlyArray<ReviewCriterion>;
export declare function emptyInstructorReview(
  provider: CloudProvider,
  caseId: string,
): InstructorReview;
export declare function reviewKey(provider: CloudProvider, caseId: string): string;
export declare function normalizeInstructorReview(
  raw: unknown,
  provider: CloudProvider,
  caseId: string,
): InstructorReview;
export declare function parseInstructorReview(
  raw: unknown,
  provider: CloudProvider,
  caseId: string,
): InstructorReview;
export declare function gradeInstructorReview(raw: InstructorReview): InstructorReviewGrade;
export declare function exportInstructorReview(
  raw: InstructorReview,
  provider: CloudProvider,
  caseId: string,
  now?: string,
): InstructorReview & { grade: InstructorReviewGrade; notice: string };
