const VALID_PROVIDERS = new Set(['aws', 'azure', 'gcp']);
const VALID_DECISIONS = new Set(['aprobado-en-revision-local', 'requiere-mejoras']);
const SCORE_KEYS = ['evidence', 'security', 'recovery', 'validation', 'communication'];
const ROOT_KEYS = new Set([
  'version',
  'provider',
  'caseId',
  'reviewer',
  'notes',
  'scores',
  'reviewedAt',
  'grade',
  'notice',
]);
const GRADE_KEYS = new Set(['score', 'complete', 'criticalRisk', 'decision', 'official']);

function isPlainObject(v) {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

/** Validates exported review object against schemas/instructor-review.schema.json. */
export function validateInstructorReviewSchema(data) {
  const errors = [];
  if (!isPlainObject(data)) return { valid: false, errors: ['El JSON raíz debe ser un objeto.'] };
  for (const k of Object.keys(data)) {
    if (!ROOT_KEYS.has(k)) errors.push(`Propiedad no permitida: ${k}`);
  }
  if (data.version !== 1) errors.push('version debe ser 1');
  if (!VALID_PROVIDERS.has(data.provider)) errors.push('provider inválido');
  if (typeof data.caseId !== 'string' || !/^s(0[1-9]|1[0-8])$/.test(data.caseId))
    errors.push('caseId inválido');
  if (typeof data.reviewer !== 'string' || data.reviewer.length > 80)
    errors.push('reviewer inválido');
  if (typeof data.notes !== 'string' || data.notes.length > 4000) errors.push('notes inválido');

  if (!isPlainObject(data.scores)) {
    errors.push('scores debe ser un objeto');
  } else {
    for (const k of Object.keys(data.scores)) {
      if (!SCORE_KEYS.includes(k)) errors.push(`score desconocido: ${k}`);
    }
    for (const k of SCORE_KEYS) {
      const val = data.scores[k];
      if (!Number.isInteger(val) || val < 0 || val > 4) errors.push(`scores.${k} debe ser 0..4`);
    }
  }

  if (typeof data.reviewedAt !== 'string' || Number.isNaN(Date.parse(data.reviewedAt))) {
    errors.push('reviewedAt debe ser date-time ISO válido');
  }

  if (!isPlainObject(data.grade)) {
    errors.push('grade debe ser un objeto');
  } else {
    for (const k of Object.keys(data.grade)) {
      if (!GRADE_KEYS.has(k)) errors.push(`grade.${k} no permitido`);
    }
    if (!Number.isInteger(data.grade.score) || data.grade.score < 0 || data.grade.score > 100)
      errors.push('grade.score debe ser 0..100');
    if (data.grade.complete !== true) errors.push('grade.complete debe ser true');
    if (typeof data.grade.criticalRisk !== 'boolean') errors.push('grade.criticalRisk inválido');
    if (!VALID_DECISIONS.has(data.grade.decision)) errors.push('grade.decision inválido');
    if (data.grade.official !== false) errors.push('grade.official debe ser false');
  }

  if (typeof data.notice !== 'string' || data.notice.length < 20)
    errors.push('notice debe tener al menos 20 caracteres');

  return { valid: errors.length === 0, errors };
}

/** Parses an exported student submission (informe-*.json or expediente-senior-*.json) read-only. */
export function parseStudentSubmissionFile(rawText) {
  const parsed = JSON.parse(rawText);
  if (!isPlainObject(parsed)) throw new Error('Archivo de entrega inválido.');
  const caseId =
    typeof parsed.caseId === 'string' && /^s(0[1-9]|1[0-8])$/.test(parsed.caseId)
      ? parsed.caseId
      : null;
  const provider = VALID_PROVIDERS.has(parsed.provider) ? parsed.provider : null;
  const report = isPlainObject(parsed.report)
    ? parsed.report
    : isPlainObject(parsed.session?.answers)
      ? parsed.session.answers
      : null;
  if (!caseId || !provider || !report) {
    throw new Error('No se reconoce estructura de informe o expediente Senior.');
  }
  return {
    caseId,
    provider,
    score: typeof parsed.score === 'number' ? parsed.score : null,
    decision: typeof parsed.decision === 'string' ? parsed.decision : null,
    report: {
      cause: typeof report.cause === 'string' ? report.cause : '',
      mitigation: typeof report.mitigation === 'string' ? report.mitigation : '',
      rollback: typeof report.rollback === 'string' ? report.rollback : '',
      validation: typeof report.validation === 'string' ? report.validation : '',
    },
  };
}
