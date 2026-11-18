import { BookOpen, Search, X } from 'lucide-preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { GLOSSARY_CATEGORIES, searchGlossary, type GlossaryCategory } from '../../data/glossary';
import { getProviderMeta } from '../../domain/providers';
import { closeGlossary, glossaryOpen, glossaryQuery } from '../../lib/glossaryState';
import { provider } from '../../lib/state';

export function GlossaryModal() {
  const isOpen = glossaryOpen.value;
  const activeCloud = provider.value;
  const cloudMeta = getProviderMeta(activeCloud);
  const [category, setCategory] = useState<'Todas' | GlossaryCategory>('Todas');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 20);

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeGlossary();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const results = searchGlossary(glossaryQuery.value, category);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: Escape key dismissal is handled via window listener
    <div
      class="sr-modal-backdrop glossary-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeGlossary();
      }}
    >
      <div
        class="sr-modal-dialog glossary-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Glosario técnico y buscador global de siglas"
      >
        <div class="sr-modal-header">
          <div class="card-heading" style={{ marginBottom: 0 }}>
            <BookOpen size={19} />
            <h3>Glosario Cloud & Buscador de Siglas ({cloudMeta.short})</h3>
          </div>
          <button
            type="button"
            class="btn btn-secondary btn-compact"
            aria-label="Cerrar glosario"
            onClick={closeGlossary}
          >
            <X size={15} /> Cerrar
          </button>
        </div>

        <div class="sr-modal-body glossary-body">
          <div class="glossary-controls">
            <div class="search-field glossary-search">
              <Search size={16} />
              <input
                ref={searchInputRef}
                type="search"
                value={glossaryQuery.value}
                onInput={(event) => {
                  glossaryQuery.value = (event.currentTarget as HTMLInputElement).value;
                }}
                placeholder="Buscar sigla o concepto (CIDR, IAM, OIDC, RTO, RPO, SLO, DLQ, SBOM...)"
                aria-label="Buscar término en el glosario"
              />
            </div>
            <div class="gopixel-tabs" role="toolbar" aria-label="Filtrar glosario por categoría">
              {GLOSSARY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  class={category === cat ? 'active' : ''}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p class="sr-catalog-count" role="status">
            {results.length} términos encontrados · Matiz activo: {cloudMeta.name}
          </p>

          {results.length === 0 ? (
            <div class="empty-state">
              No encontramos términos para "{glossaryQuery.value}".{' '}
              <button
                type="button"
                onClick={() => {
                  glossaryQuery.value = '';
                  setCategory('Todas');
                }}
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <div class="glossary-grid">
              {results.map((entry) => (
                <article key={entry.id} class="glossary-card">
                  <div class="glossary-card-head">
                    <div>
                      <strong>{entry.term}</strong>
                      <small>{entry.acronymExpansion}</small>
                    </div>
                    <span class="tag tag-accent">{entry.category}</span>
                  </div>
                  <p>{entry.beginnerSummary}</p>
                  <p class="glossary-arch-note">
                    <b>Criterio Senior:</b> {entry.architectNote}
                  </p>
                  <div class="glossary-provider-box">
                    <span>Matiz en {cloudMeta.short}:</span> {entry.providerNuance[activeCloud]}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
