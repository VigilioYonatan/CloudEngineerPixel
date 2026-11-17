import { ChevronDown } from 'lucide-preact';
import { CLOUD_PROVIDER_IDS, PROVIDER_REGISTRY, isCloudProviderId } from '../domain/providers';
import { provider, setProvider } from '../lib/state';

export function CloudProviderSwitcher() {
  const active_provider = provider.value;

  return (
    <div class="provider-menu">
      <span class="provider-led" />
      <select
        aria-label="Seleccionar proveedor cloud"
        value={active_provider}
        onChange={(event) => {
          const select_el = event.currentTarget as HTMLSelectElement;
          const next_value = select_el.value;
          if (isCloudProviderId(next_value)) {
            const switched = setProvider(next_value);
            if (!switched) {
              select_el.value = provider.value;
            }
          }
        }}
      >
        {CLOUD_PROVIDER_IDS.map((provider_id) => (
          <option key={provider_id} value={provider_id}>
            {PROVIDER_REGISTRY[provider_id].selectorOptionLabel}
          </option>
        ))}
      </select>
      <ChevronDown size={13} />
    </div>
  );
}
