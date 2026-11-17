import { CloudCog } from 'lucide-preact';

export function RouteLoadingState() {
  return (
    <main
      class="page-container route-loading"
      aria-busy="true"
      aria-live="polite"
      aria-label="Cargando módulo de aprendizaje"
    >
      <div class="route-loading-card">
        <span class="route-loading-icon">
          <CloudCog size={28} />
        </span>
        <strong>Cargando entorno de ingeniería...</strong>
        <p>Preparando datos locales y herramientas interactivas sin conexión externa.</p>
      </div>
    </main>
  );
}
