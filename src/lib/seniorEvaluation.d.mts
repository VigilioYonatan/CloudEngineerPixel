export type SeniorReport = {
  cause: string;
  mitigation: string;
  rollback: string;
  validation: string;
};
export type SeniorEvaluationInput = {
  decisionLocked: boolean;
  decisionCorrect: boolean;
  requiredExhibits: string[];
  inspected: string[];
  cited: string[];
  report: SeniorReport;
  acknowledged: boolean;
};
export type SeniorEvaluationResult = Readonly<{
  decision: boolean;
  examinedReady: boolean;
  citationsReady: boolean;
  reportReady: boolean;
  acknowledgementReady: boolean;
  missingReportSections: string[];
  score: number;
  ready: boolean;
  educationalOnly: true;
}>;
export declare const REPORT_MIN_CHARS: number;
export declare const SENIOR_SCORE_WEIGHTS: Readonly<Record<'decision' | 'examined' | 'citations' | 'report' | 'acknowledgement', number>>;
export declare function evaluateSeniorEvidence(input: SeniorEvaluationInput): SeniorEvaluationResult;
