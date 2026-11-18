/**
 * Preventive client-side secret detector (F7-06).
 * Blocks accidental pasting or exporting of real cloud/API credentials in local student notes.
 */

const SECRET_HEURISTICS = [
  {
    id: 'aws-access-key',
    label: 'AWS Access Key ID (AKIA/ASIA)',
    pattern: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,
  },
  {
    id: 'gcp-api-key',
    label: 'Google Cloud / Firebase API Key (AIza)',
    pattern: /\bAIza[0-9A-Za-z_-]{35}\b/,
  },
  {
    id: 'github-token',
    label: 'GitHub Personal Access Token (ghp_/github_pat_)',
    pattern: /\b(?:gh[pousr]_[A-Za-z0-9_]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/,
  },
  {
    id: 'private-key',
    label: 'Bloque de llave privada PEM/SSH',
    pattern: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/,
  },
  {
    id: 'jwt-bearer',
    label: 'Token JWT firmado (eyJ...)',
    pattern: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/,
  },
  {
    id: 'azure-storage-key',
    label: 'Azure Storage AccountKey',
    pattern: /AccountKey=[A-Za-z0-9+/]{40,}={0,2}/,
  },
];

/**
 * @param {string} input
 * @returns {Array<{ id: string; label: string }>}
 */
export function detectAccidentalSecrets(input) {
  if (typeof input !== 'string' || input.length === 0) return [];
  /** @type {Array<{ id: string; label: string }>} */
  const matches = [];
  for (const rule of SECRET_HEURISTICS) {
    if (rule.pattern.test(input)) {
      matches.push({ id: rule.id, label: rule.label });
    }
  }
  return matches;
}

/**
 * @param {string} input
 * @returns {boolean}
 */
export function hasAccidentalSecrets(input) {
  return detectAccidentalSecrets(input).length > 0;
}
