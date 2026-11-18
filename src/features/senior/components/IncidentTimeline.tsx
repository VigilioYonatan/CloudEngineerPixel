import { Clock3 } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import type { Provider } from '../../../data/course';
import { getIncidentTimeline, type TimelineEventKind } from '../../../data/seniorTimelines';

type IncidentTimelineProps = {
  caseId: string;
  provider: Provider;
};

const KIND_BADGE: Readonly<Record<TimelineEventKind, string>> = {
  change: 'CAMBIO / ORIGEN',
  degradation: 'DEGRADACIÓN',
  alert: 'ALERTA SLO',
  noise: 'RUIDO NO CAUSAL',
  escalation: 'ESCALADO SRE',
};

export function IncidentTimeline({ caseId, provider }: IncidentTimelineProps) {
  const timeline = getIncidentTimeline(caseId, provider);
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    setActiveIndex(2);
  }, [caseId, provider]);

  const activeEvent = timeline.events[activeIndex] || timeline.events[0];

  return (
    <section class="info-card sr-timeline" aria-label="Línea de tiempo del incidente">
      <div class="card-heading">
        <Clock3 size={19} />
        <h3>Cronología de causalidad temporal ({caseId.toUpperCase()})</h3>
      </div>
      <p class="sr-hint">
        Inspecciona cada hito desde <code>T-15m</code> hasta <code>T+10m</code> para distinguir el
        cambio desencadenante frente al ruido operativo paralelo.
      </p>

      <div class="sr-timeline-steps" role="toolbar" aria-label="Hitos cronológicos">
        {timeline.events.map((ev, index) => {
          const isSelected = index === activeIndex;
          return (
            <button
              key={ev.offset}
              type="button"
              aria-pressed={isSelected}
              class={`sr-timeline-pill kind-${ev.kind} ${isSelected ? 'timeline-selected' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <strong>{ev.offset}</strong>
              <span>{KIND_BADGE[ev.kind]}</span>
            </button>
          );
        })}
      </div>

      <div class={`sr-timeline-detail kind-${activeEvent.kind}`}>
        <div class="sr-timeline-detail-head">
          <strong>
            {activeEvent.offset} · {activeEvent.title}
          </strong>
          <small>{activeEvent.source}</small>
        </div>
        <p>{activeEvent.detail}</p>
        <p class="sr-timeline-question">
          <strong>Pregunta de correlación:</strong> {activeEvent.causalPrompt}
        </p>
      </div>
    </section>
  );
}
