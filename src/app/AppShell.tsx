import { AlertTriangle, CheckCircle2, Download, RotateCcw, X } from 'lucide-preact';
import type { ComponentChildren } from 'preact';
import { lazy, Suspense } from 'preact/compat';
import { useEffect } from 'preact/hooks';
import { BannerStorageError } from '../components/ui/BannerStorageError';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { OfflineIndicator } from '../components/ui/OfflineIndicator';
import { activeConfirmRequest } from '../lib/confirmDialogState';
import { glossaryOpen } from '../lib/glossaryState';

const LazyGlossaryModal = lazy(() =>
  import('../components/ui/GlossaryModal').then((m) => ({ default: m.GlossaryModal })),
);
import {
  applyParsedRoute,
  corruptedStorageRaw,
  dismissCorruptedBackupAndReset,
  downloadCorruptedBackup,
  mobileMenu,
  toast,
} from '../lib/state';
import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';

type AppShellProps = {
  children: ComponentChildren;
};

export function AppShell({ children }: AppShellProps) {
  useEffect(() => {
    const handle_key_down = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeConfirmRequest.value === null && mobileMenu.value) {
        mobileMenu.value = false;
        const toggle = document.querySelector<HTMLButtonElement>('.mobile-toggle');
        toggle?.focus();
      }
    };
    const handle_hash_change = () => {
      applyParsedRoute(window.location.hash);
    };
    handle_hash_change();
    window.addEventListener('keydown', handle_key_down);
    window.addEventListener('hashchange', handle_hash_change);
    return () => {
      window.removeEventListener('keydown', handle_key_down);
      window.removeEventListener('hashchange', handle_hash_change);
    };
  }, []);

  return (
    <div class="app-shell">
      <AppHeader />
      <OfflineIndicator />
      <BannerStorageError />
      {corruptedStorageRaw.value !== null && (
        <div role="alert" class="corrupt-storage-banner">
          <div class="corrupt-storage-copy">
            <AlertTriangle size={20} />
            <div>
              <strong>Se detectó almacenamiento local dañado (respaldo crudo protegido)</strong>
              <span>
                No hemos borrado tus datos locales. Descarga primero el respaldo crudo JSON para
                conservar tus notas y luego reinicia el estado en schemaVersion 2.
              </span>
            </div>
          </div>
          <div class="corrupt-storage-actions">
            <button type="button" class="btn btn-secondary" onClick={downloadCorruptedBackup}>
              <Download size={16} /> Descargar respaldo crudo
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => void dismissCorruptedBackupAndReset()}
            >
              <RotateCcw size={16} /> Reiniciar estado limpio
            </button>
          </div>
        </div>
      )}
      {children}
      <AppFooter />
      {toast.value && (
        <div role="status" class="toast">
          <CheckCircle2 size={17} />
          {toast.value}
          <button
            type="button"
            aria-label="Cerrar notificación"
            onClick={() => {
              toast.value = '';
            }}
          >
            <X size={15} />
          </button>
        </div>
      )}
      <ConfirmDialog />
      {glossaryOpen.value && (
        <Suspense fallback={null}>
          <LazyGlossaryModal />
        </Suspense>
      )}
    </div>
  );
}
