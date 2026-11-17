/**
 * A portable, untrusted, LOCAL snapshot of exactly one Senior Mode case.
 * This is not a signed assessment, cloud credential or proof of competence.
 */
import { normalizeSeniorSession, seniorSessionKey } from './seniorSession.mjs';

export const SENIOR_CHECKPOINT_SCHEMA = 'cloud-engineering-academy/senior-checkpoint';
export const SENIOR_CHECKPOINT_VERSION = 1;
export const SENIOR_CHECKPOINT_MAX_BYTES = 48 * 1024;
const ISOTIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;
const plain = (input) =>
  input !== null &&
  typeof input === 'object' &&
  !Array.isArray(input) &&
  (Object.getPrototypeOf(input) === Object.prototype || Object.getPrototypeOf(input) === null);
const textBytes = (text) => new TextEncoder().encode(text).length;
const validDate = (input) =>
  typeof input === 'string' && ISOTIME.test(input) && Number.isFinite(Date.parse(input));

function requireScope(provider, caseId) {
  // Reuse the exact input check of the existing Senior state layer.
  seniorSessionKey(provider, caseId);
}

/** Build one scoped case checkpoint; only known session fields can leave the browser. */
export function createSeniorCheckpoint(
  provider,
  caseId,
  session,
  exportedAt = new Date().toISOString(),
) {
  requireScope(provider, caseId);
  if (!validDate(exportedAt)) throw new Error('Fecha de exportación inválida');
  const checkpoint = {
    schema: SENIOR_CHECKPOINT_SCHEMA,
    version: SENIOR_CHECKPOINT_VERSION,
    provider,
    caseId,
    exportedAt,
    simulation: true,
    session: normalizeSeniorSession(session),
    notice:
      'Expediente educativo local, sin firma ni revisión de identidad. No acredita competencia profesional.',
  };
  if (textBytes(JSON.stringify(checkpoint)) > SENIOR_CHECKPOINT_MAX_BYTES)
    throw new Error('El expediente supera el límite de 48 KB');
  return checkpoint;
}

/**
 * Refuse foreign scope and malformed data. The restored answer is normalized;
 * the signed-off result, score or reviews are NEVER imported from the file.
 */
export function parseSeniorCheckpoint(contents, expectedProvider, expectedCaseId) {
  requireScope(expectedProvider, expectedCaseId);
  if (typeof contents !== 'string' || textBytes(contents) > SENIOR_CHECKPOINT_MAX_BYTES) {
    throw new Error('El archivo debe ser JSON y ocupar como máximo 48 KB');
  }
  let value;
  try {
    value = JSON.parse(contents);
  } catch {
    throw new Error('El archivo no contiene JSON válido');
  }
  if (
    !plain(value) ||
    value.schema !== SENIOR_CHECKPOINT_SCHEMA ||
    value.version !== SENIOR_CHECKPOINT_VERSION ||
    value.simulation !== true
  ) {
    throw new Error('Formato de expediente Senior incompatible');
  }
  if (value.provider !== expectedProvider || value.caseId !== expectedCaseId) {
    throw new Error('El expediente corresponde a otro caso o proveedor');
  }
  if (!validDate(value.exportedAt) || !plain(value.session) || value.session.version !== 1) {
    throw new Error('El expediente contiene datos incompletos');
  }
  return normalizeSeniorSession(value.session);
}
