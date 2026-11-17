import { AlertTriangle, ChevronDown, Layers } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import type { Provider } from '../../data/course';
import { getModuleMulticloudComparison } from '../../data/multicloudComparison';
import { CLOUD_PROVIDER_IDS, getProviderMeta } from '../../domain/providers';
import { ProviderBadge } from '../../shared/ui/ProviderBadge';

export type CloudServiceComparisonProps = {
  moduleId: string;
  activeProvider: Provider;
};

export function CloudServiceComparison({ moduleId, activeProvider }: CloudServiceComparisonProps) {
  const comparison = getModuleMulticloudComparison(moduleId);
  const [expandedClouds, setExpandedClouds] = useState<Record<Provider, boolean>>({
    aws: activeProvider === 'aws',
    azure: activeProvider === 'azure',
    gcp: activeProvider === 'gcp',
  });

  useEffect(() => {
    setExpandedClouds((prev) => ({ ...prev, [activeProvider]: true }));
  }, [activeProvider, moduleId]);

  const toggleCloud = (cloudId: Provider) => {
    setExpandedClouds((prev) => ({ ...prev, [cloudId]: !prev[cloudId] }));
  };

  return (
    <section class="info-card cloud-comparison" aria-label="Comparativa arquitectónica multicloud">
      <div class="cloud-comparison-head">
        <div class="card-heading">
          <Layers size={19} />
          <h3>Matriz multicloud: {comparison.title}</h3>
        </div>
        <div class="cloud-comparison-actions">
          <button
            type="button"
            class="btn btn-secondary btn-compact"
            onClick={() => setExpandedClouds({ aws: true, azure: true, gcp: true })}
          >
            Expandir las 3 nubes
          </button>
        </div>
      </div>

      <p class="cloud-comparison-lead">
        Compara modelo jerárquico, gobierno de permisos y factores reales de facturación antes de
        asumir equivalencia directa entre proveedores.
      </p>

      <div class="cloud-comparison-grid">
        {CLOUD_PROVIDER_IDS.map((cloudId) => {
          const meta = getProviderMeta(cloudId);
          const spec = comparison.providers[cloudId];
          const isCurrent = cloudId === activeProvider;
          const isOpen = expandedClouds[cloudId];

          return (
            <article
              key={cloudId}
              class={`cloud-comparison-col ${isCurrent ? 'comparison-current' : ''} ${isOpen ? 'comparison-open' : ''}`}
            >
              <button
                type="button"
                class="cloud-comparison-toggle"
                aria-expanded={isOpen}
                onClick={() => toggleCloud(cloudId)}
              >
                <ProviderBadge providerId={cloudId} />
                <div class="cloud-comparison-title">
                  <strong>{meta.name}</strong>
                  <span>{spec.service}</span>
                </div>
                {isCurrent && <em class="comparison-active-pill">Ruta activa</em>}
                <ChevronDown size={16} class="comparison-chevron" />
              </button>

              <dl class="cloud-comparison-details">
                <div>
                  <dt>Servicio principal</dt>
                  <dd>{spec.service}</dd>
                </div>
                <div>
                  <dt>Jerarquía y alcance</dt>
                  <dd>{spec.hierarchy}</dd>
                </div>
                <div>
                  <dt>Modelo de permisos</dt>
                  <dd>{spec.iamModel}</dd>
                </div>
                <div>
                  <dt>Factor clave de cobro</dt>
                  <dd>{spec.billingModel}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>

      <div class="cloud-non-equivalence">
        <AlertTriangle size={19} />
        <div>
          <strong>Qué NO es equivalente entre AWS, Azure y GCP</strong>
          <p>{comparison.nonEquivalence}</p>
        </div>
      </div>
    </section>
  );
}
