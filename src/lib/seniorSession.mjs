/**
 * Persistence boundary for locally simulated Senior investigations.
 * No provider tokens, credentials or real infrastructure state are stored here.
 */
export const SENIOR_SESSION_VERSION = 1;
export const REPORT_MAX_CHARS = 1800;
export const SESSION_MAX_LENGTH = 16000;
const stageSet = new Set(['investigar', 'diagnosticar', 'decidir', 'informe']);
const artifactSet = new Set(['primary', 'secondary', 'procedure']);
const answerFields = /** @type {const} */ (['cause', 'mitigation', 'rollback', 'validation']);
const asText = value => typeof value === 'string' ? value.slice(0, REPORT_MAX_CHARS) : '';
const uniqueArtifacts = value => Array.isArray(value) ? [...new Set(value.filter(x => artifactSet.has(x)))] : [];
const safeIndex = value => Number.isInteger(value) && value >= 0 && value < 3 ? value : null;
export const emptySeniorSession = () => ({
  version: SENIOR_SESSION_VERSION,
  stage: 'investigar',
  choice: null,
  decisionLocked: false,
  diagnosisChoice: null,
  diagnosisLocked: false,
  inspected: [],
  cited: [],
  answers: {cause: '', mitigation: '', rollback: '', validation: ''},
  acknowledged: false,
});

/** Treat previously exported or persisted JSON as untrusted input. */
export function normalizeSeniorSession(value) {
  const fallback = emptySeniorSession();
  if (!value || typeof value !== 'object' || Array.isArray(value) || value.version !== SENIOR_SESSION_VERSION) return fallback;
  const answers = Object.fromEntries(answerFields.map(field => [field, asText(value.answers?.[field])]));
  const inspected = uniqueArtifacts(value.inspected);
  const cited = uniqueArtifacts(value.cited).filter(id => inspected.includes(id));
  const choice = safeIndex(value.choice);
  const diagnosisChoice = safeIndex(value.diagnosisChoice);
  return {
    ...fallback,
    stage: stageSet.has(value.stage) ? value.stage : fallback.stage,
    choice,
    decisionLocked: choice !== null && value.decisionLocked === true,
    diagnosisChoice,
    diagnosisLocked: diagnosisChoice !== null && value.diagnosisLocked === true,
    inspected,
    cited,
    answers,
    acknowledged: value.acknowledged === true,
  };
}

export function parseSeniorSession(raw) {
  if (typeof raw !== 'string' || raw.length > SESSION_MAX_LENGTH) return emptySeniorSession();
  try { return normalizeSeniorSession(JSON.parse(raw)); } catch { return emptySeniorSession(); }
}

export function serializeSeniorSession(value) {
  return JSON.stringify(normalizeSeniorSession(value));
}

export function seniorSessionKey(provider, caseId) {
  if (!['aws', 'azure', 'gcp'].includes(provider) || !/^s(0[1-9]|1[0-8])$/.test(caseId)) throw new Error('Expediente Senior inválido');
  return `senior-session:${provider}:${caseId}`;
}
