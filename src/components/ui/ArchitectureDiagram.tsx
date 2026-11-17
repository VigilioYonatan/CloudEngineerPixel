import type { Provider } from '../../data/course';
import {
  getModuleTopology,
  getSeniorCaseTopology,
  type ArchitectureLayerStatus,
} from '../../data/architectureTopologies';

export type ArchitectureDiagramProps = {
  provider: Provider;
  moduleId?: string;
  seniorCaseId?: string;
};

function wrapSvgLines(text: string, maxChars = 26): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function statusBadgeLabel(status: ArchitectureLayerStatus): string {
  if (status === 'alert') return 'FOCO INCIDENTE';
  if (status === 'degraded') return 'AUDITAR SEÑAL';
  return 'AISLADO OK';
}

export function ArchitectureDiagram({
  provider,
  moduleId,
  seniorCaseId,
}: ArchitectureDiagramProps) {
  const topology = seniorCaseId
    ? getSeniorCaseTopology(seniorCaseId, provider)
    : getModuleTopology(moduleId || 'cloud-fundamentals', provider);

  const safeDomId = topology.id.replace(/[^a-z0-9-]/gi, '-');
  const titleId = `arch-title-${safeDomId}`;
  const descId = `arch-desc-${safeDomId}`;
  const topLayers = topology.layers.slice(0, 3);
  const controlLayer = topology.layers[3];

  return (
    <figure class="info-card arch-diagram-figure">
      <div class="arch-diagram-header">
        <strong>{topology.title}</strong>
        <span class="arch-diagram-provider">{provider.toUpperCase()} · TOPOLOGÍA 4 CAPAS</span>
      </div>

      <div class="arch-diagram-canvas">
        <svg
          role="img"
          aria-labelledby={titleId}
          aria-describedby={descId}
          viewBox="0 0 840 268"
          class="arch-diagram-svg"
        >
          <title id={titleId}>{topology.title}</title>
          <desc id={descId}>{topology.accessibleDescription}</desc>

          <defs>
            <marker
              id={`arrow-${safeDomId}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)" />
            </marker>
          </defs>

          {topLayers.map((layer, index) => {
            const x = 18 + index * 278;
            const lines = wrapSvgLines(layer.service, 27);
            const strokeVar =
              layer.status === 'alert' ? 'var(--red-text)' : 'var(--border-strong, var(--border))';

            return (
              <g key={layer.id}>
                <rect
                  x={x}
                  y={16}
                  width={248}
                  height={146}
                  rx={12}
                  fill="var(--surface2)"
                  stroke={strokeVar}
                  stroke-width={layer.status === 'alert' ? '2.5' : '1.5'}
                />
                <text
                  x={x + 14}
                  y={40}
                  fill="var(--accent-text)"
                  font-size="11"
                  font-family="JetBrains Mono, monospace"
                  font-weight="700"
                >
                  {layer.zoneLabel}
                </text>
                {lines.map((line, lineIdx) => (
                  <text
                    key={`${layer.id}-line-${lineIdx}`}
                    x={x + 14}
                    y={68 + lineIdx * 18}
                    fill="var(--text)"
                    font-size="12.5"
                    font-weight="700"
                  >
                    {line}
                  </text>
                ))}
                <text x={x + 14} y={134} fill="var(--muted)" font-size="10.5">
                  {layer.boundary}
                </text>
                <text
                  x={x + 14}
                  y={151}
                  fill={layer.status === 'alert' ? 'var(--red-text)' : 'var(--green-text)'}
                  font-size="9.5"
                  font-family="JetBrains Mono, monospace"
                  font-weight="700"
                >
                  ● {statusBadgeLabel(layer.status)}
                </text>

                {index < 2 && (
                  <line
                    x1={x + 250}
                    y1={89}
                    x2={x + 274}
                    y2={89}
                    stroke="var(--accent)"
                    stroke-width="2"
                    marker-end={`url(#arrow-${safeDomId})`}
                  />
                )}
              </g>
            );
          })}

          <rect
            x={18}
            y={182}
            width={804}
            height={70}
            rx={12}
            fill="var(--surface)"
            stroke="var(--accent)"
            stroke-dasharray="5 4"
            stroke-width="1.5"
          />
          <text
            x={34}
            y={207}
            fill="var(--accent-text)"
            font-size="11"
            font-family="JetBrains Mono, monospace"
            font-weight="700"
          >
            {controlLayer.zoneLabel} · {statusBadgeLabel(controlLayer.status)}
          </text>
          <text x={34} y={232} fill="var(--text)" font-size="12.5" font-weight="700">
            {controlLayer.service}
          </text>
        </svg>
      </div>

      <figcaption class="arch-diagram-caption">{topology.caption}</figcaption>

      <details class="arch-diagram-details">
        <summary>Descripción textual estructurada para lector de pantalla</summary>
        <p>{topology.accessibleDescription}</p>
        <ol>
          {topology.layers.map((layer) => (
            <li key={layer.id}>
              <strong>{layer.zoneLabel}:</strong> {layer.service} ({layer.boundary} ·{' '}
              {statusBadgeLabel(layer.status)}).
            </li>
          ))}
        </ol>
      </details>
    </figure>
  );
}
