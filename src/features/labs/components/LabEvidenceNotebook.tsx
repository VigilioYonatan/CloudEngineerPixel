import { AlertTriangle, BookMarked, Download } from 'lucide-preact';
import { detectAccidentalSecrets } from '../../../lib/secretGuard.mjs';

type LabEvidenceNotebookProps = {
  evidence: string;
  onChangeEvidence: (next: string) => void;
  onSaveEvidence: () => void;
  onExportEvidence: (format: 'md' | 'json') => void;
};

export function LabEvidenceNotebook({
  evidence,
  onChangeEvidence,
  onSaveEvidence,
  onExportEvidence,
}: LabEvidenceNotebookProps) {
  const secretMatches = detectAccidentalSecrets(evidence);

  return (
    <section class="info-card">
      <div class="card-heading">
        <BookMarked size={19} />
        <h3>Cuaderno de evidencias</h3>
      </div>
      <p>
        Documenta arquitectura, pruebas realizadas, resultados y cómo limpiaste los recursos. No
        pegues secretos ni tokens.
      </p>
      <textarea
        rows={6}
        value={evidence}
        onInput={(event) => onChangeEvidence((event.currentTarget as HTMLTextAreaElement).value)}
        placeholder="Ejemplo: validé el listado de VPC, registré el rango CIDR y revisé las rutas sin exponer puertos públicos."
      />
      {secretMatches.length > 0 && (
        <div role="alert" class="sr-distractor-warning" style={{ marginBottom: '12px' }}>
          <AlertTriangle size={18} />
          <div>
            <strong>Credencial potencial detectada ({secretMatches[0].label})</strong>
            <p>
              Por tu seguridad, se bloquea guardar o exportar notas con claves cloud/API.
              Sustitúyelas por marcadores como <code>REDACTED</code>.
            </p>
          </div>
        </div>
      )}
      <div class="sr-report-actions">
        <button
          type="button"
          class="btn btn-secondary"
          disabled={secretMatches.length > 0}
          onClick={onSaveEvidence}
        >
          Guardar evidencias
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          disabled={secretMatches.length > 0}
          onClick={() => onExportEvidence('md')}
        >
          <Download size={16} /> Exportar reporte de práctica (.md)
        </button>
        <button
          type="button"
          class="btn btn-ghost"
          disabled={secretMatches.length > 0}
          onClick={() => onExportEvidence('json')}
        >
          Exportar JSON
        </button>
      </div>
    </section>
  );
}
