import { AlertTriangle, ShieldAlert } from 'lucide-preact';
import { useEffect, useRef } from 'preact/hooks';
import { activeConfirmRequest, resolveActiveConfirm } from '../../lib/confirmDialogState';

export function ConfirmDialog() {
  const request = activeConfirmRequest.value;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!request) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      cancelBtnRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        resolveActiveConfirm(false);
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
          if (!active || active === first || !dialogRef.current.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else if (!active || active === last || !dialogRef.current.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      const target = previousFocusRef.current;
      if (target && document.contains(target)) {
        target.focus();
      }
    };
  }, [request?.id]);

  if (!request) return null;

  const confirmBtnClass =
    request.tone === 'danger' ? 'btn btn-danger confirm-dialog-danger-solid' : 'btn btn-primary';

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: Escape key dismissal is handled via window listener
    <div
      class="confirm-dialog-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          resolveActiveConfirm(false);
        }
      }}
    >
      <div
        ref={dialogRef}
        class={`confirm-dialog-panel confirm-tone-${request.tone}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <div class="confirm-dialog-head">
          <span class="confirm-dialog-icon" aria-hidden="true">
            {request.tone === 'danger' ? <ShieldAlert size={22} /> : <AlertTriangle size={22} />}
          </span>
          <h2 id="confirm-dialog-title">{request.title}</h2>
        </div>

        <div id="confirm-dialog-description" class="confirm-dialog-body">
          <p>{request.description}</p>
          {request.impactSummary && (
            <div class="confirm-dialog-impact">
              <strong> Alcance del cambio:</strong>
              <span>{request.impactSummary}</span>
            </div>
          )}
        </div>

        <div class="confirm-dialog-actions">
          <button
            ref={cancelBtnRef}
            type="button"
            class="btn btn-secondary"
            onClick={() => resolveActiveConfirm(false)}
          >
            {request.cancelLabel}
          </button>
          <button type="button" class={confirmBtnClass} onClick={() => resolveActiveConfirm(true)}>
            {request.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
