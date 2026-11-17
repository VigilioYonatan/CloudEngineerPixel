const providers = new Set(['aws', 'azure', 'gcp']);
const identifier = /^[a-z0-9:_-]{1,140}$/;
const plain = (value) =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const safeText = (value, max = 4000) => (typeof value === 'string' ? value.slice(0, max) : '');
const validKey = (key) =>
  identifier.test(key) && !['__proto__', 'constructor', 'prototype'].includes(key);
function safeMap(value, limit, mapper) {
  const output = Object.create(null);
  if (!plain(value)) return output;
  for (const [key, data] of Object.entries(value).slice(0, limit)) {
    if (!validKey(key)) continue;
    const result = mapper(data);
    if (result !== null) output[key] = result;
  }
  return output;
}
export function validateProgressImport(payload) {
  if (!plain(payload) || !plain(payload.progress)) throw new Error('Formato de respaldo inválido');
  const data = payload.progress;
  if (
    !Array.isArray(data.completed) ||
    !Array.isArray(data.senior) ||
    !plain(data.quiz) ||
    !plain(data.notes)
  )
    throw new Error('Faltan datos obligatorios del respaldo');
  const strings = (values, limit) => [
    ...new Set(
      values.filter((value) => typeof value === 'string' && validKey(value)).slice(0, limit),
    ),
  ];
  const attempts = (Array.isArray(data.seniorAttempts) ? data.seniorAttempts : [])
    .slice(-300)
    .flatMap((a) => {
      if (
        !plain(a) ||
        !providers.has(a.provider) ||
        !/^s(0[1-9]|1[0-8])$/.test(a.caseId) ||
        typeof a.correct !== 'boolean' ||
        typeof a.at !== 'string' ||
        !Number.isFinite(Date.parse(a.at))
      )
        return [];
      const report = plain(a.report)
        ? {
            cause: safeText(a.report.cause),
            mitigation: safeText(a.report.mitigation),
            rollback: safeText(a.report.rollback),
            validation: safeText(a.report.validation),
            citations: strings(Array.isArray(a.report.citations) ? a.report.citations : [], 5),
          }
        : undefined;
      return [
        {
          caseId: a.caseId,
          provider: a.provider,
          correct: a.correct,
          score: Number.isFinite(a.score) ? Math.max(0, Math.min(100, Math.round(a.score))) : 0,
          at: a.at.slice(0, 40),
          examined: strings(Array.isArray(a.examined) ? a.examined : [], 30),
          ...(report ? { report } : {}),
        },
      ];
    });
  return {
    completed: strings(data.completed, 1000),
    senior: strings(data.senior, 100),
    quiz: safeMap(data.quiz, 1500, (x) =>
      typeof x === 'number' && Number.isFinite(x) ? Math.max(0, Math.min(100, x)) : null,
    ),
    notes: safeMap(data.notes, 500, (x) => (typeof x === 'string' ? x.slice(0, 12000) : null)),
    simRuns: Number.isFinite(data.simRuns)
      ? Math.min(1000000, Math.max(0, Math.floor(data.simRuns)))
      : 0,
    seniorAttempts: attempts,
  };
}
