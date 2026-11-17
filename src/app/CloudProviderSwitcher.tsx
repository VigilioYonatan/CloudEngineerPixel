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
          const next_value = (event.currentTarget as HTMLSelectElement).value;
          if (isCloudProviderId(next_value)) {
            setProvider(next_value);
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
