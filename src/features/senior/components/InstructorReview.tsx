import { ClipboardCheck, Download, Info, Save, Upload } from 'lucide-preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { Provider } from '../../../data/course';
import { seniorRubric } from '../../../data/seniorRubric';
import { appContextGuard } from '../../../lib/contextSwitchGuard';
import {
  exportInstructorReview,
  gradeInstructorReview,
  parseInstructorReview,
  reviewKey,
  type InstructorReview as ReviewModel,
} from '../../../lib/instructorReview.mjs';
import {
  parseStudentSubmissionFile,
  validateInstructorReviewSchema,
  type StudentSubmissionSummary,
} from '../../../lib/instructorReviewSchema.mjs';
import { notify, progress, setNotes } from '../../../lib/state';
import { downloadReport } from '../libs/downloadJsonFile';

type InstructorReviewProps = {
  cloud: Provider;
  caseId: string;
};

/** Offline, unauthenticated teaching rubric. Preserves senior-review:<provider>:<caseId> V8 contract. */
export function InstructorReview({ cloud, caseId }: InstructorReviewProps) {
  const storage_key = reviewKey(cloud, caseId);
  const [form, setForm] = useState<ReviewModel>(() =>
    parseInstructorReview(progress.value.notes[storage_key], cloud, caseId),
  );
  const [dirty, setDirty] = useState(false);
  const [studentSubmission, setStudentSubmission] = useState<StudentSubmissionSummary | null>(null);
  const [importError, setImportError] = useState('');
  const grade = gradeInstructorReview(form);
  const draft_ref = useRef({ storageKey: storage_key, cloud, form, dirty });
  draft_ref.current = { storageKey: storage_key, cloud, form, dirty };

  useEffect(() => {
    return appContextGuard.registerFlusher({
      id: `instructor-review-${cloud}-${caseId}`,
      scopeLabel: draft_ref.current.cloud.toUpperCase(),
      isDirty: () => draft_ref.current.dirty,
      flush: () => {
        setNotes(draft_ref.current.storageKey, JSON.stringify(draft_ref.current.form));
        setDirty(false);
      },
    });
  }, [cloud, caseId]);

  const update = (patch: Partial<ReviewModel>) => {
    setDirty(true);
    setForm((current) => ({ ...current, ...patch }));
  };

  const save = () => {
    setNotes(storage_key, JSON.stringify(form));
    setDirty(false);
    notify('Borrador de revisión local guardado');
  };

  const handle_import_student = async (file: File | null) => {
    if (!file) return;
    try {
      const parsed = parseStudentSubmissionFile(await file.text());
      setStudentSubmission(parsed);
      setImportError('');
      notify(
        `Entrega ${parsed.caseId.toUpperCase()} (${parsed.provider.toUpperCase()}) cargada para revisión`,
      );
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Archivo de entrega inválido');
    }
  };

  const handle_export = () => {
    try {
      const data = exportInstructorReview(form, cloud, caseId);
      const check = validateInstructorReviewSchema(data);
      if (!check.valid) throw new Error(check.errors[0] || 'Error de validación schema');
      setNotes(storage_key, JSON.stringify(data));
      downloadReport(data, `revision-local-${cloud}-${caseId}.json`);
      notify('Revisión docente local exportada y validada contra schema');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Revisión incompleta');
    }
  };

  return (
    <details class="sr-review info-card" aria-label="Rúbrica docente opcional">
      <summary>
        <ClipboardCheck size={19} /> Revisión local no autenticada (opcional){' '}
        <span>5 criterios / 100 puntos</span>
      </summary>
      <p class="sr-hint">
        <Info size={15} /> Revisión local no autenticada. Este formulario se completa manualmente y
        no verifica la identidad de quien puntúa ni sustituye una evaluación externa.
      </p>
      <div class="sr-report-actions" style={{ marginBottom: '12px' }}>
        <label class="btn btn-secondary btn-compact sr-import-label">
          <Upload size={15} /> Importar entrega del alumno (JSON)
          <input
            type="file"
            accept=".json,application/json"
            aria-label="Importar entrega del alumno"
            onChange={(event) => {
              const input = event.currentTarget as HTMLInputElement;
              void handle_import_student(input.files?.[0] || null);
              input.value = '';
            }}
          />
        </label>
      </div>
      {importError && (
        <p class="sr-checkpoint-error" role="alert">
          {importError}
        </p>
      )}
      {studentSubmission && (
        <div class="sr-attempt-detail" aria-label="Entrega importada de solo lectura">
          <strong>
            Entrega del alumno: {studentSubmission.caseId.toUpperCase()} ·{' '}
            {studentSubmission.provider.toUpperCase()}
            {studentSubmission.score !== null ? ` · ${studentSubmission.score}/100` : ''}
          </strong>
          <p class="sr-hint">
            <strong>Causa:</strong> {studentSubmission.report.cause || 'Sin contenido'}
          </p>
          <p class="sr-hint">
            <strong>Mitigación:</strong> {studentSubmission.report.mitigation || 'Sin contenido'}
          </p>
        </div>
      )}
      <label class="sr-field">
        <strong>Alias del revisor (sin información sensible)</strong>
        <input
          maxLength={80}
          autoComplete="off"
          value={form.reviewer}
          placeholder="Ej. Instructor 01"
          onInput={(event) => update({ reviewer: (event.currentTarget as HTMLInputElement).value })}
        />
      </label>
      <div class="sr-review-grid">
        {seniorRubric.map((criterion) => (
          <label class="sr-review-row" key={criterion.id}>
            <span>
              <strong>{criterion.label}</strong>
              <small>{criterion.guidance}</small>
            </span>
            <select
              aria-label={`Nota de ${criterion.label}`}
              value={form.scores[criterion.id] === null ? '' : String(form.scores[criterion.id])}
              onChange={(event) => {
                const raw_val = (event.currentTarget as HTMLSelectElement).value;
                update({
                  scores: {
                    ...form.scores,
                    [criterion.id]: raw_val === '' ? null : Number(raw_val),
                  },
                });
              }}
            >
              <option value="">Sin revisar</option>
              {[0, 1, 2, 3, 4].map((score_val) => (
                <option key={score_val} value={score_val}>
                  {score_val} / 4
                </option>
              ))}
            </select>
            <small>Peso: {criterion.weight}%</small>
          </label>
        ))}
      </div>
      <label class="sr-field">
        <strong>Justificación del revisor (mínimo 40 caracteres)</strong>
        <textarea
          rows={4}
          maxLength={4000}
          value={form.notes}
          placeholder="Describe qué está respaldado por evidencias, los riesgos no resueltos y los cambios propuestos."
          onInput={(event) => update({ notes: (event.currentTarget as HTMLTextAreaElement).value })}
        />
      </label>
      <div role="status" class="sr-review-result">
        <strong>{grade.score === null ? 'Sin puntuación' : `${grade.score}/100`}</strong>
        <span>
          {grade.decision === 'aprobado-en-revision-local'
            ? 'Aprobación formativa local'
            : grade.decision === 'requiere-mejoras'
              ? 'Requiere mejoras'
              : 'Completa todos los criterios, el alias y la justificación'}
        </span>
      </div>
      <div class="sr-report-actions">
        <button class="btn btn-secondary" onClick={save}>
          <Save size={16} /> Guardar borrador
        </button>
        <button class="btn btn-primary" disabled={!grade.complete} onClick={handle_export}>
          <Download size={16} /> Exportar revisión JSON
        </button>
      </div>
    </details>
  );
}
