/**
 * Completion assessment for SYNTHETIC Senior Mode only.
 * This checks recorded activity, never technical truth or professional competence.
 * Side-effect free: suitable for replay, local tests and instructor review.
 */
export const REPORT_MIN_CHARS = 60;
export const SENIOR_SCORE_WEIGHTS = Object.freeze({
  decision: 25,
  examined: 20,
  citations: 15,
  report: 30,
  acknowledgement: 10,
});

const textLength = value => typeof value === 'string' ? value.trim().length : 0;
const arrayOfStrings = value => Array.isArray(value) ? [...new Set(value.filter(item => typeof item === 'string'))] : [];

/** @param {import('./seniorEvaluation.d.mts').SeniorEvaluationInput} input */
export function evaluateSeniorEvidence(input) {
  const required = arrayOfStrings(input?.requiredExhibits).slice(0, 2);
  const examined = arrayOfStrings(input?.inspected);
  const cited = arrayOfStrings(input?.cited);
  const decision = input?.decisionLocked === true && input?.decisionCorrect === true;
  const examinedReady = required.length === 2 && required.every(id => examined.includes(id));
  const citationsReady = examinedReady && required.every(id => cited.includes(id));
  const report = input?.report || {};
  const reportFields = /** @type {const} */ (['cause', 'mitigation', 'rollback', 'validation']);
  const missingReportSections = reportFields.filter(field => textLength(report[field]) < REPORT_MIN_CHARS);
  const reportReady = missingReportSections.length === 0;
  const acknowledgementReady = input?.acknowledged === true;
  const score =
    (decision ? SENIOR_SCORE_WEIGHTS.decision : 0) +
    (examinedReady ? SENIOR_SCORE_WEIGHTS.examined : 0) +
    (citationsReady ? SENIOR_SCORE_WEIGHTS.citations : 0) +
    (reportReady ? SENIOR_SCORE_WEIGHTS.report : 0) +
    (acknowledgementReady ? SENIOR_SCORE_WEIGHTS.acknowledgement : 0);
  return Object.freeze({
    decision, examinedReady, citationsReady, reportReady, acknowledgementReady,
    missingReportSections, score,
    ready: decision && examinedReady && citationsReady && reportReady && acknowledgementReady,
    educationalOnly: true,
  });
}
