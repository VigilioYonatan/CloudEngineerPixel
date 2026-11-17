import { AlertTriangle, Download, X } from 'lucide-preact';
import { dismissStorageWriteError, exportProgress, storageWriteError } from '../../lib/state';

export function BannerStorageError() {
  const errorText = storageWriteError.value;
  if (!errorText) return null;

  return (
    <div role="alert" class="storage-error-banner">
      <div class="storage-error-copy">
        <AlertTriangle size={19} />
        <div>
          <strong>Persistencia local limitada en este navegador</strong>
          <span>{errorText}</span>
        </div>
      </div>

      <div class="storage-error-actions">
        <button type="button" class="btn btn-primary btn-compact" onClick={exportProgress}>
          <Download size={15} /> Exportar respaldo JSON
        </button>
        <button
          type="button"
          class="btn btn-secondary btn-compact"
          aria-label="Ocultar aviso de almacenamiento"
          onClick={dismissStorageWriteError}
        >
          <X size={15} /> Ocultar aviso
        </button>
      </div>
    </div>
  );
}
