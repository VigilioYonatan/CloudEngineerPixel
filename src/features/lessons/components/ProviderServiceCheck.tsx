import { CloudCog } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import { moduleService, services, type Module } from '../../../data/course';
import { CLOUD_PROVIDER_IDS, getProviderMeta } from '../../../domain/providers';
import { provider } from '../../../lib/state';

type ProviderCheckProps = {
  module: Module;
};

export function ProviderCheck({ module: mod }: ProviderCheckProps) {
  const active_cloud = provider.value;
  const active_meta = getProviderMeta(active_cloud);
  const [answer, setAnswer] = useState<string | null>(null);
  const category = moduleService(mod.id);
  const expected_label = services[active_cloud][category].label;
  const all_options = CLOUD_PROVIDER_IDS.map((cloud_id) => services[cloud_id][category].label);

  useEffect(() => {
    setAnswer(null);
  }, [active_cloud, mod.id]);

  return (
    <section class="provider-check">
      <div class="card-heading">
        <CloudCog size={19} />
        <h3>Chequeo práctico de {active_meta.short}</h3>
      </div>
      <p>
        En esta ruta, ¿qué servicio usarías como punto de partida para la capacidad{' '}
        <strong>{category}</strong>?
      </p>
      <div class="quiz-options">
        {all_options.map((option_label, index) => (
          <button
            type="button"
            key={`${active_cloud}:${option_label}`}
            class={`${answer === option_label ? 'quiz-selected' : ''} ${answer !== null && option_label === expected_label ? 'quiz-correct' : ''} ${answer === option_label && option_label !== expected_label ? 'quiz-wrong' : ''}`}
            onClick={() => setAnswer(option_label)}
          >
            <span>{String.fromCharCode(65 + index)}</span>
            {option_label}
          </button>
        ))}
      </div>
      {answer !== null && (
        <div
          class={`quiz-feedback ${answer === expected_label ? 'feedback-success' : 'feedback-warn'}`}
        >
          <strong>
            {answer === expected_label
              ? 'Correcto: servicio de la ruta activa'
              : 'Esa opción corresponde a otra plataforma'}
          </strong>
          <p>{services[active_cloud][category].note}</p>
        </div>
      )}
      <small>
        Este ejercicio distingue equivalencias de capacidad; no supone que las implementaciones sean
        idénticas.
      </small>
    </section>
  );
}
