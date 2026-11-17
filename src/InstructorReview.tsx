import { useState } from 'preact/hooks';
import { ClipboardCheck, Download, Info, Save } from 'lucide-preact';
import { seniorRubric } from './data/seniorRubric';
import {
  exportInstructorReview,
  gradeInstructorReview,
  parseInstructorReview,
  reviewKey,
} from './lib/instructorReview.mjs';
import type { InstructorReview as Review } from './lib/instructorReview.mjs';
import { progress, setNotes, notify } from './lib/state';
import type { Provider } from './data/course';

/** An offline, unauthenticated teaching tool. The learner can edit it too; never claim verified approval. */
export function InstructorReview({ cloud, caseId }: { cloud: Provider; caseId: string }) {
  const key = reviewKey(cloud, caseId);
  const [form, setForm] = useState<Review>(() =>
    parseInstructorReview(progress.value.notes[key], cloud, caseId),
  );
  const grade = gradeInstructorReview(form);
  const update = (patch: Partial<Review>) => setForm((current) => ({ ...current, ...patch }));
  const save = () => {
    setNotes(key, JSON.stringify(form));
    notify('Borrador de revisión local guardado');
  };
  const exportReview = () => {
    try {
      const data = exportInstructorReview(form, cloud, caseId);
      setNotes(key, JSON.stringify(data));
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `revision-local-${cloud}-${caseId}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 500);
      notify('Revisión docente local exportada (sin certificación)');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Revisión incompleta');
    }
  };
  return (
    <details class="sr-review info-card" aria-label="Rúbrica docente opcional">
      <summary>
        <ClipboardCheck size={19} /> Revisión docente local (opcional){' '}
        <span>5 criterios / 100 puntos</span>
      </summary>
      <p class="sr-hint">
        <Info size={15} /> Este formulario se completa manualmente y no verifica la identidad de
        quien puntúa. No acredita una certificación ni sustituye una evaluación externa.
      </p>
      <label class="sr-field">
        <strong>Alias del revisor (sin información sensible)</strong>
        <input
          maxLength={80}
          autoComplete="off"
          value={form.reviewer}
          placeholder="Ej. Instructor 01"
          onInput={(e) => update({ reviewer: (e.currentTarget as HTMLInputElement).value })}
        />
      </label>
      <div class="sr-review-grid">
        {seniorRubric.map((r) => (
          <label class="sr-review-row" key={r.id}>
            <span>
              <strong>{r.label}</strong>
              <small>{r.guidance}</small>
            </span>
            <select
              aria-label={`Nota de ${r.label}`}
              value={form.scores[r.id] === null ? '' : String(form.scores[r.id])}
              onChange={(e) => {
                const v = (e.currentTarget as HTMLSelectElement).value;
                update({ scores: { ...form.scores, [r.id]: v === '' ? null : Number(v) } });
              }}
            >
              <option value="">Sin revisar</option>
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} / 4
                </option>
              ))}
            </select>
            <small>Peso: {r.weight}%</small>
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
          onInput={(e) => update({ notes: (e.currentTarget as HTMLTextAreaElement).value })}
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
        <button class="btn btn-primary" disabled={!grade.complete} onClick={exportReview}>
          <Download size={16} /> Exportar revisión JSON
        </button>
      </div>
    </details>
  );
}
