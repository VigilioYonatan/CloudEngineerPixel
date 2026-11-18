import { X } from 'lucide-preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { MarkdownViewer } from '../../../components/ui/MarkdownViewer';
import type { Provider } from '../../../data/course';

type WorkbookModalProps = {
  open: boolean;
  cloudId: Provider;
  caseId: string;
  onClose: () => void;
};

export function WorkbookModal({ open, cloudId, caseId, onClose }: WorkbookModalProps) {
  const [markdown, setMarkdown] = useState<string>('');
  const [error, setError] = useState<string>('');
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setMarkdown('');
    setError('');
    fetch(`/senior-guides/${cloudId}/${caseId}.md`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setMarkdown(text);
      })
      .catch(() => {
        if (!cancelled) setError('No se pudo cargar el cuaderno Markdown.');
      });
    return () => {
      cancelled = true;
    };
  }, [open, cloudId, caseId]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: Escape key dismissal is handled via window listener
    <div
      class="sr-modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        class="sr-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Cuaderno práctico ${caseId.toUpperCase()} (${cloudId.toUpperCase()})`}
      >
        <div class="sr-modal-header">
          <strong>
            Cuaderno práctico · {caseId.toUpperCase()} · {cloudId.toUpperCase()}
          </strong>
          <button
            ref={closeRef}
            type="button"
            class="btn btn-secondary btn-compact"
            onClick={onClose}
            aria-label="Cerrar vista previa del cuaderno"
          >
            <X size={16} /> Cerrar
          </button>
        </div>
        <div class="sr-modal-body">
          {error ? (
            <p role="alert">{error}</p>
          ) : markdown ? (
            <MarkdownViewer markdown={markdown} provider={cloudId} />
          ) : (
            <p role="status">Cargando cuaderno Senior...</p>
          )}
        </div>
      </div>
    </div>
  );
}
