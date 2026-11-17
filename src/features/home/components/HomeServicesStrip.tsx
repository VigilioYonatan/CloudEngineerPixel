import { Download } from 'lucide-preact';
import { CLOUD_ESSENTIAL_SERVICES_2026 } from '../../../data/cloudServicesCatalog';
import type { Provider } from '../../../data/course';
import { notify } from '../../../lib/state';

type HomeServicesStripProps = {
  providerId: Provider;
  providerName: string;
};

export function downloadCloudServicesCatalog(providerId: Provider) {
  const payload = {
    updatedAt: '2026-11-16',
    activeProvider: providerId,
    catalog: CLOUD_ESSENTIAL_SERVICES_2026,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'servicios-cloud-actualizados-2026.json';
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify('Catálogo de servicios Cloud 2026 descargado');
}

export function HomeServicesStrip({ providerId, providerName }: HomeServicesStripProps) {
  const activeServices = CLOUD_ESSENTIAL_SERVICES_2026[providerId];

  return (
    <div class="home-services-strip" aria-label={`Servicios esenciales de ${providerName}`}>
      <div class="home-services-strip-head">
        <div>
          <strong>Servicios clave actualizados · {providerName}</strong>
          <span> · {activeServices.length} servicios esenciales 2026</span>
        </div>
        <button
          type="button"
          class="btn btn-secondary btn-compact"
          onClick={() => downloadCloudServicesCatalog(providerId)}
        >
          <Download size={15} /> Descargar servicios 2026 (.json)
        </button>
      </div>
      <div class="home-services-pills">
        {activeServices.map((svc) => (
          <div class="home-service-pill" key={svc.name}>
            <small>{svc.category}</small>
            <strong>{svc.name}</strong>
            <span>{svc.summary}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
