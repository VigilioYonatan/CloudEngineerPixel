import { ArrowRight, CheckCircle2, Clock3, Terminal } from 'lucide-preact';
import type { Challenge } from '../../../data/senior';
import type { SeniorStatusFilter } from '../libs/filterSeniorCatalog';

type SeniorIncidentCardProps = {
  item: Challenge;
  itemDomain: string;
  itemStatus: Exclude<SeniorStatusFilter, 'Todos'>;
  onOpenCase: (challenge: Challenge) => void;
};

function severitySlug(severity: Challenge['severity']): 'critica' | 'alta' | 'media' {
  if (severity === 'Crítica') return 'critica';
  if (severity === 'Alta') return 'alta';
  return 'media';
}

export function SeniorIncidentCard({
  item,
  itemDomain,
  itemStatus,
  onOpenCase,
}: SeniorIncidentCardProps) {
  const sevSlug = severitySlug(item.severity);
  const ghostNum = item.id.replace(/\D/g, '').padStart(2, '0');

  return (
    <button class={`senior-card senior-card-${sevSlug}`} onClick={() => onOpenCase(item)}>
      <span class="senior-card-ghost" aria-hidden="true">
        {ghostNum}
      </span>
      <div class="senior-card-top">
        <span class={`badge-sev badge-sev-${sevSlug}`}>{item.severity}</span>
        <span class="senior-card-domain">
          {item.category} · {itemDomain}
        </span>
      </div>
      <h3>
        {item.id.toUpperCase()} · {item.title}
      </h3>
      <p>{item.brief}</p>
      <div class="senior-card-signal">
        <Terminal size={13} aria-hidden="true" />
        <code>{item.signal}</code>
      </div>
      <div class="senior-card-skills">
        {item.skills.map((skill) => (
          <span key={skill} class="tag">
            {skill}
          </span>
        ))}
      </div>
      <div class="senior-card-foot">
        <span
          class={`sr-status-pill ${itemStatus === 'Registrado' ? 'is-done' : itemStatus === 'En curso' ? 'is-active' : ''}`}
        >
          {itemStatus === 'Registrado' ? (
            <>
              <CheckCircle2 size={14} /> Registrado
            </>
          ) : itemStatus === 'En curso' ? (
            <>
              <Clock3 size={14} /> En curso
            </>
          ) : (
            'Sin iniciar'
          )}
        </span>
        <span class="open-case">
          Abrir incidente <ArrowRight size={15} />
        </span>
      </div>
    </button>
  );
}
