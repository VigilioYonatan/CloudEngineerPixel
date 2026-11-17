import { Database, Download, RotateCcw } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { APP_VERSION } from '../../../config/appMeta';
import type { Provider } from '../../../data/course';
import { challenges } from '../../../data/senior';
import { CLOUD_PROVIDER_IDS, getProviderMeta } from '../../../domain/providers';
import { requestConfirm } from '../../../lib/confirmDialogState';
import {
  buildProviderScopedExport,
  calculateProgressStorageSummary,
  purgeProviderFromProgress,
  purgeSeniorCaseFromProgress,
} from '../../../lib/granularProgress';
import { notify, progress, provider } from '../../../lib/state';
import { ProviderBadge } from '../../../shared/ui/ProviderBadge';

export function GranularDataManager() {
  const [selectedCloud, setSelectedCloud] = useState<Provider>(provider.value);
  const [selectedCase, setSelectedCase] = useState<string>('s01');
  const summary = calculateProgressStorageSummary(progress.value);
  const kbUsed = (summary.estimatedBytes / 1024).toFixed(2);

  const handleExportCloud = (cloudId: Provider) => {
    const payload = buildProviderScopedExport(progress.value, cloudId, APP_VERSION);
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `cloud-academy-progreso-${cloudId}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify(`Respaldo de ${cloudId.toUpperCase()} exportado`);
  };

  const handleResetCloud = async (cloudId: Provider) => {
    const meta = getProviderMeta(cloudId);
    const stat = summary.byProvider[cloudId];
    const confirmed = await requestConfirm({
      title: `Reiniciar solo ${meta.name}`,
      description: `¿Deseas eliminar únicamente los avances, quizzes, casos Senior y notas de ${meta.short}?`,
      impactSummary: `Se borrarán ${stat.completedCount} actividades, ${stat.seniorCompletedCount} casos Senior y ${stat.notesCount} notas de ${meta.short}. Las demás nubes permanecerán intactas.`,
      confirmLabel: `Reiniciar ${meta.short}`,
      cancelLabel: 'Cancelar',
      tone: 'danger',
    });
    if (!confirmed) return;
    progress.value = purgeProviderFromProgress(progress.value, cloudId);
    notify(`Progreso de ${meta.short} reiniciado sin afectar otras nubes`);
  };

  const handleResetCase = async () => {
    const meta = getProviderMeta(selectedCloud);
    const confirmed = await requestConfirm({
      title: `Reiniciar expediente ${selectedCase.toUpperCase()} (${meta.short})`,
      description: `¿Deseas limpiar únicamente el expediente Senior ${selectedCase.toUpperCase()} en ${meta.name}?`,
      impactSummary: 'El resto de tus módulos, laboratorios y casos Senior se conservará intacto.',
      confirmLabel: 'Reiniciar expediente',
      cancelLabel: 'Cancelar',
      tone: 'warning',
    });
    if (!confirmed) return;
    progress.value = purgeSeniorCaseFromProgress(progress.value, selectedCloud, selectedCase);
    notify(`Expediente ${selectedCase.toUpperCase()} (${meta.short}) reiniciado`);
  };

  return (
    <section class="info-card">
      <div class="card-heading">
        <Database size={20} />
        <h3>Uso de almacenamiento local y gestión granular</h3>
      </div>
      <p>
        Huella actual en este navegador: <strong>{kbUsed} KB</strong> ({summary.estimatedBytes}{' '}
        bytes UTF-8) · <strong>{summary.totalNotes}</strong> notas o borradores activos.
      </p>

      <div class="granular-provider-grid">
        {CLOUD_PROVIDER_IDS.map((cloudId) => {
          const meta = getProviderMeta(cloudId);
          const stat = summary.byProvider[cloudId];
          return (
            <div class="granular-provider-card" key={cloudId}>
              <div class="granular-provider-head">
                <ProviderBadge providerId={cloudId} />
                <div>
                  <strong>{meta.name}</strong>
                  <small>
                    {stat.completedCount} actividades · {stat.seniorCompletedCount} casos Senior
                  </small>
                </div>
              </div>
              <div class="granular-provider-actions">
                <button
                  type="button"
                  class="btn btn-secondary btn-compact"
                  onClick={() => handleExportCloud(cloudId)}
                >
                  <Download size={14} /> Exportar {meta.short}
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-compact"
                  aria-label={`Reiniciar ${meta.short}`}
                  onClick={() => void handleResetCloud(cloudId)}
                >
                  <RotateCcw size={14} /> Reiniciar {meta.short}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div class="granular-case-reset">
        <strong>Reiniciar un único expediente Senior</strong>
        <div class="granular-case-controls">
          <select
            aria-label="Nube del expediente Senior a reiniciar"
            value={selectedCloud}
            onChange={(event) =>
              setSelectedCloud((event.currentTarget as HTMLSelectElement).value as Provider)
            }
          >
            <option value="aws">AWS</option>
            <option value="azure">Microsoft Azure</option>
            <option value="gcp">Google Cloud</option>
          </select>
          <select
            aria-label="Caso Senior a reiniciar"
            value={selectedCase}
            onChange={(event) => setSelectedCase((event.currentTarget as HTMLSelectElement).value)}
          >
            {challenges.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.id.toUpperCase()} · {ch.title}
              </option>
            ))}
          </select>
          <button
            type="button"
            class="btn btn-secondary btn-compact"
            onClick={() => void handleResetCase()}
          >
            <RotateCcw size={14} /> Limpiar caso seleccionado
          </button>
        </div>
      </div>
    </section>
  );
}
