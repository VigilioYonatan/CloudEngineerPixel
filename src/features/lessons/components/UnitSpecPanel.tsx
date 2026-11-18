import { AlertTriangle, BookOpen, Brain, CheckCircle2, Search } from 'lucide-preact';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import type { Provider } from '../../../data/course';
import type { UnitContentSpec } from '../../../domain/curriculum';
import { openGlossary } from '../../../lib/glossaryState';

type UnitSpecPanelProps = {
  spec: UnitContentSpec;
  cloudId: Provider;
};

export function UnitSpecPanel({ spec, cloudId }: UnitSpecPanelProps) {
  const adapter = spec.adapters[cloudId];

  return (
    <section class="unit-spec-panel" aria-label={`Ficha técnica unidad ${spec.unitCode}`}>
      <div class="unit-spec-grid">
        <div class="unit-spec-card">
          <strong>
            <Brain size={16} /> Modelo mental clave
          </strong>
          <p>{spec.mentalModel}</p>
        </div>
        <div class="unit-spec-card unit-spec-warn">
          <strong>
            <AlertTriangle size={16} /> Antipatrón real
          </strong>
          <p>{spec.antipattern}</p>
        </div>
      </div>

      <div class="unit-spec-adapter">
        <div class="unit-spec-adapter-head">
          <strong>
            Adaptador {cloudId.toUpperCase()} · {adapter.service}
          </strong>
          <small>Verificado: {adapter.verifiedAt}</small>
        </div>
        <p>{adapter.criticalDiff}</p>
        <CodeBlock code={adapter.snippet} provider={cloudId} risk="read-only" />
      </div>

      {spec.glossary.length > 0 && (
        <div class="unit-spec-glossary">
          <div class="unit-spec-adapter-head">
            <strong>
              <BookOpen size={15} /> Glosario contextual de la unidad
            </strong>
            <button
              type="button"
              class="btn btn-secondary btn-compact"
              onClick={() => openGlossary('')}
            >
              <Search size={13} /> Buscador global de siglas
            </button>
          </div>
          <div class="unit-glossary-chips">
            {spec.glossary.map((g) => (
              <button
                key={g.term}
                type="button"
                class="unit-glossary-chip unit-glossary-chip-btn"
                onClick={() => openGlossary(g.term)}
              >
                <b>{g.term}:</b> {g.definition}
              </button>
            ))}
          </div>
        </div>
      )}

      <div class="unit-spec-activity">
        <strong>
          <CheckCircle2 size={15} /> Actividad verificable ({spec.unitCode})
        </strong>
        <p>{spec.verifiableActivity}</p>
      </div>
    </section>
  );
}
