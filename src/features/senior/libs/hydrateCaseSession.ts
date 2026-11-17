import {
  normalizeSeniorSession,
  parseSeniorSession,
  type SeniorReport,
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

export function withInspectedExhibit(prev: SeniorSession, id: string): SeniorSession {
  return normalizeSeniorSession({
    ...prev,
    inspected: prev.inspected.includes(id) ? prev.inspected : [...prev.inspected, id],
  });
}

export function withUpdatedReportSection(
  prev: SeniorSession,
  key: keyof SeniorReport,
  val: string,
): SeniorSession {
  return normalizeSeniorSession({ ...prev, answers: { ...prev.answers, [key]: val } });
}

export function withToggledCitation(
  prev: SeniorSession,
  id: string,
  checked: boolean,
): SeniorSession {
  return normalizeSeniorSession({
    ...prev,
    cited: checked ? [...new Set([...prev.cited, id])] : prev.cited.filter((x) => x !== id),
  });
}
