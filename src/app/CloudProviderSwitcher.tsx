import { Check, ChevronDown } from 'lucide-preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { CLOUD_PROVIDER_IDS, PROVIDER_REGISTRY, isCloudProviderId } from '../domain/providers';
import { provider, setProvider } from '../lib/state';
import { CloudProviderLogo } from '../shared/ui/CloudProviderLogo';

export function CloudProviderSwitcher() {
  const active_provider = provider.value;
  const active_meta = PROVIDER_REGISTRY[active_provider];
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  return (
    <div class="provider-switcher-wrap" ref={containerRef}>
      <button
        type="button"
        class="provider-menu provider-menu-trigger"
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
        aria-label={`Proveedor activo: ${active_meta.short}. Cambiar proveedor cloud`}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span class="provider-led" aria-hidden="true" />
        <CloudProviderLogo providerId={active_provider} size={18} />
        <span class="provider-trigger-label">{active_meta.short}</span>
        <ChevronDown size={13} class={menuOpen ? 'provider-chevron-open' : ''} />
      </button>

      <select
        class="sr-only"
        tabIndex={-1}
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

      {menuOpen && (
        <div class="provider-dropdown" role="listbox" aria-label="Proveedores cloud disponibles">
          {CLOUD_PROVIDER_IDS.map((provider_id) => {
            const meta = PROVIDER_REGISTRY[provider_id];
            const isSelected = provider_id === active_provider;
            return (
              <button
                key={provider_id}
                type="button"
                role="option"
                aria-selected={isSelected}
                class={`provider-option ${isSelected ? 'provider-option-active' : ''}`}
                onClick={() => {
                  setProvider(provider_id);
                  setMenuOpen(false);
                }}
              >
                <CloudProviderLogo providerId={provider_id} size={20} />
                <span class="provider-option-text">
                  <strong>{meta.short}</strong>
                  <small>{meta.name}</small>
                </span>
                {isSelected && <Check size={15} class="provider-option-check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
