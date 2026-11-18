import { AlertTriangle, ArrowRight, Home } from 'lucide-preact';
import type { RouteRecoveryDiagnostic } from '../../app/router';
import { getProviderMeta } from '../../domain/providers';
import { navigate, provider } from '../../lib/state';

type RouteRecoveryStateProps = {
  diagnostic: RouteRecoveryDiagnostic;
};

export function RouteRecoveryState({ diagnostic }: RouteRecoveryStateProps) {
  const cloud_meta = getProviderMeta(provider.value);

  return (
    <main class="page-container route-recovery" aria-labelledby="route-recovery-heading">
      <section class="info-card route-recovery-card">
        <span class="route-loading-icon">
          <AlertTriangle size={26} />
        </span>
        <h1 id="route-recovery-heading">No encontramos ese recurso en la academia</h1>
        <p>{diagnostic.message}</p>
        <p class="route-recovery-code">
          Referencia recibida: <code>{diagnostic.invalidValue}</code> · Tu ruta{' '}
          <strong>{cloud_meta.short}</strong> y tu progreso local permanecen intactos.
        </p>
        <div class="action-row">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => navigate(diagnostic.suggestedView, diagnostic.suggestedResourceId)}
          >
            {diagnostic.suggestedLabel} <ArrowRight size={16} />
          </button>
          {diagnostic.suggestedView !== 'home' && (
            <button type="button" class="btn btn-secondary" onClick={() => navigate('home')}>
              <Home size={16} /> Volver al inicio
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
