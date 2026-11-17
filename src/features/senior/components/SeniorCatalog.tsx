import { ArrowRight, CloudCog, Search, TriangleAlert } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { CloudMentor } from '../../../components/mascot/CloudMentor';
import { EmptyState } from '../../../components/ui/EmptyState';
import type { Provider } from '../../../data/course';
import { challenges, type Challenge } from '../../../data/senior';
import { getProviderMeta } from '../../../domain/providers';
import { progress } from '../../../lib/state';
import { MAX_RECENT_ATTEMPTS } from '../constants/senior.constants';

type SeniorCatalogProps = {
  cloudId: Provider;
  onOpenCase: (challenge: Challenge) => void;
};

export function SeniorCatalog({ cloudId: p, onOpenCase }: SeniorCatalogProps) {
  const [severity, setSeverity] = useState('todos');
  const [query, setQuery] = useState('');
  const cloud_meta = getProviderMeta(p);

  const filtered = challenges.filter(
    (c) =>
      (severity === 'todos' || c.severity === severity) &&
      `${c.id} ${c.title} ${c.category} ${c.skills.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const completed = progress.value.senior.filter((id) => id.startsWith(`${p}:`)).length;
  const attempts = (progress.value.seniorAttempts || [])
    .filter((a) => a.provider === p)
    .slice(-MAX_RECENT_ATTEMPTS)
    .reverse();

  return (
    <>
      <div class="sr-banner">
        <div>
          <span class="sr-kicker">CLOUD ENGINEERING / SIMULADOR DE PRODUCCIÓN</span>
          <h1>
            Senior Mode<span>_</span>
          </h1>
          <p>
            18 escenarios por proveedor. Inspecciona señales, decide con criterio y documenta tu
            respuesta. No se ejecuta infraestructura real.
          </p>
          <div class="sr-inline">
            <span>{challenges.length} casos</span>
            <span>
              {completed} registrados en {cloud_meta.short}
            </span>
            <span>4 etapas por escenario</span>
          </div>
        </div>
        <CloudMentor
          providerId={p}
          variant="pose"
          pose="senior"
          size="banner"
          alt={`Mascota ${cloud_meta.short} en Senior Mode`}
        />
      </div>

      <div class="sr-filters">
        <label>
          <Search size={17} />
          <input
            aria-label="Buscar casos"
            placeholder="Buscar por incidente o competencia"
            value={query}
            onInput={(event) => setQuery((event.currentTarget as HTMLInputElement).value)}
          />
        </label>
        <select
          aria-label="Filtrar severidad"
          value={severity}
          onChange={(event) => setSeverity((event.currentTarget as HTMLSelectElement).value)}
        >
          <option value="todos">Todas las severidades</option>
          <option>Crítica</option>
          <option>Alta</option>
          <option>Media</option>
        </select>
      </div>

      <div class="senior-grid">
        {filtered.map((c) => (
          <button class="senior-card" key={c.id} onClick={() => onOpenCase(c)}>
            <div class="senior-card-head">
              <span class="senior-id">{c.id.toUpperCase()}</span>
              <span class="sr-severity">{c.severity}</span>
            </div>
            <div class="senior-card-icon">
              <CloudCog size={23} />
            </div>
            <small class="sr-category">{c.category}</small>
            <h3>{c.title}</h3>
            <p>{c.brief}</p>
            <div class="senior-card-footer">
              <span>
                {progress.value.senior.includes(`${p}:${c.id}`)
                  ? '✓ Registrado'
                  : progress.value.notes[`senior-session:${p}:${c.id}`]
                    ? '↻ Reanudar expediente'
                    : 'Abrir expediente'}
              </span>
              <ArrowRight size={17} />
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <EmptyState
          providerId={p}
          title="No encontramos casos con ese filtro"
          description="Prueba buscando por otra competencia (IAM, Terraform, EKS, SLO) o restablece los filtros."
          actionLabel="Mostrar todos los casos"
          onAction={() => {
            setQuery('');
            setSeverity('todos');
          }}
        />
      )}

      {attempts.length > 0 && (
        <section class="sr-history info-card">
          <h2>Bitácora personal · {cloud_meta.short}</h2>
          <p>
            Resultados registrados en este dispositivo; no equivalen a una acreditación técnica.
          </p>
          <div class="sr-history-table" role="list">
            {attempts.map((a, index) => (
              <div class="sr-history-row" role="listitem" key={`${a.caseId}-${a.at}-${index}`}>
                <strong>{a.caseId.toUpperCase()}</strong>
                <span>{new Date(a.at).toLocaleString('es-PE')}</span>
                <span>
                  {a.correct ? '✓ Decisión defendible' : '✕ Decisión de riesgo'} · {a.score}/100
                </span>
                <button
                  class="btn btn-secondary"
                  onClick={() => {
                    const matched = challenges.find((item) => item.id === a.caseId);
                    if (matched) onOpenCase(matched);
                  }}
                >
                  Reabrir caso
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section class="sr-disclaimer">
        <TriangleAlert size={20} />
        <p>
          Todos los casos, logs y evaluaciones son sintéticos. Esta plataforma registra respuestas y
          completitud; no certifica competencia sin revisión externa.
        </p>
      </section>
    </>
  );
}
