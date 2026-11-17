import {
  normalizeSeniorSession,
  parseSeniorSession,
  type SeniorSession,
} from '../../../lib/seniorSession.mjs';

/**
 * Hydrates a V7–V9 Senior session while migrating structured V3–V6 notes
 * without deleting the original `senior:<provider>:<caseId>` note entry.
 */
export function hydrateCaseSession(
  saved_session_raw: string | undefined,
  legacy_note_raw: string | undefined,
): SeniorSession {
  const restored = parseSeniorSession(saved_session_raw);
  if (!saved_session_raw && legacy_note_raw) {
    try {
      const legacy = JSON.parse(legacy_note_raw);
      if (legacy && typeof legacy === 'object') {
        restored.answers = normalizeSeniorSession({ version: 1, answers: legacy }).answers;
      }
    } catch {
      /* legacy freeform note remains untouched */
    }
  }
  return restored;
}
