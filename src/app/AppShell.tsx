import { CheckCircle2, X } from 'lucide-preact';
import type { ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';
import { currentModule, mobileMenu, toast, view } from '../lib/state';
import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';
import { parseHashRoute } from './router';

type AppShellProps = {
  children: ComponentChildren;
};

export function AppShell({ children }: AppShellProps) {
  useEffect(() => {
    const handle_key_down = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        mobileMenu.value = false;
      }
    };
    const handle_hash_change = () => {
      const parsed = parseHashRoute(window.location.hash);
      if (parsed) {
        view.value = parsed.view;
        if (parsed.resourceId) {
          currentModule.value = parsed.resourceId;
        }
      }
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
      {children}
      <AppFooter />
      {toast.value && (
        <div role="status" class="toast">
          <CheckCircle2 size={17} />
          {toast.value}
          <button
            aria-label="Cerrar notificación"
            onClick={() => {
              toast.value = '';
            }}
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
