import { Info } from 'lucide-preact';
import type { SimulatorCatalogEntry } from '../constants/simulatorCatalogMeta';

export function SimulatorModelCard({ meta }: { meta: SimulatorCatalogEntry }) {
  return (
    <section class="info-card sim-model-card" aria-label="Ficha técnica del motor de simulación">
      <div class="sim-model-head">
        <strong>
          <Info size={15} /> Ficha técnica del motor
        </strong>
        <span>
          {meta.category} · {meta.version}
        </span>
      </div>
      <p class="sr-hint">
        <strong>Fórmula / reglas:</strong> {meta.formulaOrRules}
      </p>
      <p class="sr-hint">
        <strong>Simplificaciones frente a nube real:</strong> {meta.simplifications}
      </p>
    </section>
  );
}
