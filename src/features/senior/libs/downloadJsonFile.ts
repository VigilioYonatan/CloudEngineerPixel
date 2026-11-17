import { seniorRubric } from '../../../data/seniorRubric';
import type { SeniorReport } from '../../../lib/seniorSession.mjs';

export function downloadReport(payload: object, file_name: string): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = file_name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export function downloadRubricTemplate(
  provider: string,
  caseId: string,
  studentReport: SeniorReport,
  automaticCompletionScore: number,
): void {
  downloadReport(
    {
      caseId,
      provider,
      studentReport,
      automaticCompletionScore,
      review: {
        status: 'pending-human-review',
        rubric: seniorRubric,
        notes: '',
        reviewer: '',
        reviewedAt: null,
      },
    },
    `revision-docente-${provider}-${caseId}.json`,
  );
}
