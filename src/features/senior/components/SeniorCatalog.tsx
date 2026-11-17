import { BookOpen, Eye, Search } from 'lucide-preact';
import { useMemo, useState } from 'preact/hooks';
import type { Provider } from '../../../data/course';
import { challenges, type Challenge } from '../../../data/senior';
import { seniorCurriculumLinks } from '../../../data/seniorCurriculumLinks';
import { getProviderMeta } from '../../../domain/providers';
import { navigate, progress } from '../../../lib/state';
import { CloudProviderLogo } from '../../../shared/ui/CloudProviderLogo';
import {
  filterSeniorCatalog,
  getChallengeDomain,
  getChallengeStatus,
  SENIOR_DOMAIN_OPTIONS,
  SENIOR_STATUS_OPTIONS,
  type SeniorDomainFilter,
  type SeniorStatusFilter,
} from '../libs/filterSeniorCatalog';
import { SeniorIncidentCard } from './SeniorIncidentCard';
import { SeniorMascotStage } from './SeniorMascotStage';

type SeniorCatalogProps = {
  cloudId: Provider;
  onOpenCase: (challenge: Challenge) => void;
};

export function SeniorCatalog({ cloudId: p, onOpenCase }: SeniorCatalogProps) {
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('Todas');
  const [domain, setDomain] = useState<SeniorDomainFilter>('Todos');
  const [status, setStatus] = useState<SeniorStatusFilter>('Todos');
  const [expandedAttempt, setExpandedAttempt] = useState<number | null>(null);
  const cloud_meta = getProviderMeta(p);

  const completedIds = useMemo(
    () =>
      new Set(
        progress.value.senior
          .filter((entry) => entry.startsWith(`${p}:`))
          .map((entry) => entry.split(':')[1]),
      ),
    [p, progress.value.senior],
  );

  const inProgressIds = useMemo(() => {
    const notes = progress.value.notes || {};
    const active = new Set<string>();
    for (const c of challenges) {
      if (!completedIds.has(c.id) && notes[`senior-session:${p}:${c.id}`]) {
        active.add(c.id);
      }
    }
    return active;
  }, [p, completedIds, progress.value.notes]);

  const filtered = filterSeniorCatalog({
    items: challenges,
    query,
    severity,
    domain,
    status,
    completedIds,
    inProgressIds,
  });

  const attempts = [...(progress.value.seniorAttempts || [])].reverse();

  return (
    <>
      <header class="page-head page-head-with-mascot sr-catalog-hero">
        <div class="sr-catalog-hero-copy">
          <span class="kicker kicker-with-logo">
            <CloudProviderLogo providerId={p} size={18} />
            CENTRO DE OPERACIONES / {cloud_meta.short}
          </span>
          <h1>
            Senior Mode: <span>simulaciones de ingeniería</span>
          </h1>
          <p>
            Casos de estudio con logs, arquitectura y comandos ficticios de solo lectura para
            practicar investigación técnica, hipótesis y contención. No ejecuta acciones reales ni
            acredita experiencia en producción.
          </p>
          <div class="sr-hero-metrics" aria-label="Resumen de incidentes">
            <span>
              <strong>{challenges.length}</strong> escenarios reales
            </span>
            <span>
              <strong>{completedIds.size}</strong> resueltos en {cloud_meta.short}
            </span>
            <span>
              <strong>{inProgressIds.size}</strong> en investigación
            </span>
          </div>
        </div>
        <SeniorMascotStage
          providerId={p}
          alt={`Mentor ${cloud_meta.short} listo para incidentes`}
          topPill="RPO · RTO"
          bottomPill="ADR · SRE"
        />
      </header>

      <div class="sr-filters" role="search" aria-label="Filtrar casos Senior">
        <div class="sr-search">
          <Search size={16} />
          <input
            type="search"
            value={query}
            onInput={(event) => setQuery((event.currentTarget as HTMLInputElement).value)}
            placeholder="Buscar caso, skill o tecnología (ej. filtracion, k8s)..."
            aria-label="Buscar casos Senior"
          />
        </div>
        <select
          aria-label="Filtrar por dominio"
          value={domain}
          onChange={(event) =>
            setDomain((event.currentTarget as HTMLSelectElement).value as SeniorDomainFilter)
          }
        >
          {SENIOR_DOMAIN_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'Todos' ? 'Todos los dominios' : opt}
            </option>
          ))}
        </select>
        <select
          aria-label="Filtrar por estado"
          value={status}
          onChange={(event) =>
            setStatus((event.currentTarget as HTMLSelectElement).value as SeniorStatusFilter)
          }
        >
          {SENIOR_STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'Todos' ? 'Todos los estados' : opt}
            </option>
          ))}
        </select>
        <select
          aria-label="Filtrar por severidad"
          value={severity}
          onChange={(event) => setSeverity((event.currentTarget as HTMLSelectElement).value)}
        >
          <option value="Todas">Todas las severidades</option>
          <option value="Crítica">Crítica</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
        </select>
      </div>

      <p class="sr-catalog-count" role="status">
        Mostrando {filtered.length} de {challenges.length} casos en {cloud_meta.short}
      </p>

      <div class="senior-grid">
        {filtered.map((item) => (
          <SeniorIncidentCard
            key={item.id}
            item={item}
            itemDomain={getChallengeDomain(item)}
            itemStatus={getChallengeStatus(item.id, completedIds, inProgressIds)}
            onOpenCase={onOpenCase}
          />
        ))}
      </div>

      {attempts.length > 0 && (
        <section class="info-card sr-history">
          <h3>Bitácora personal</h3>
          <p class="sr-hint">
            Registro local de decisiones y puntajes en este navegador. Inspecciona cada intento para
            comparar decisiones y reforzar temas pendientes.
          </p>
          <ul>
            {attempts.slice(0, 8).map((attempt, index) => {
              const target = challenges.find((item) => item.id === attempt.caseId);
              const link = seniorCurriculumLinks[attempt.caseId];
              const isOpen = expandedAttempt === index;
              return (
                <li key={`${attempt.at}-${attempt.caseId}`} class="sr-attempt-item">
                  <div class="sr-attempt-row">
                    <span>
                      <strong>{attempt.caseId.toUpperCase()}</strong> · {target?.title}
                    </span>
                    <div class="sr-attempt-meta">
                      <span>
                        {attempt.provider.toUpperCase()} · {attempt.score}/100 ·{' '}
                        {attempt.correct ? 'Acertado' : 'Requiere revisión'}
                      </span>
                      <button
                        type="button"
                        class="btn btn-secondary btn-compact"
                        onClick={() => setExpandedAttempt(isOpen ? null : index)}
                      >
                        <Eye size={14} /> {isOpen ? 'Ocultar' : 'Inspeccionar'}
                      </button>
                    </div>
                  </div>
                  {isOpen && (
                    <div class="sr-attempt-detail">
                      <p class="sr-hint">
                        Fecha: {new Date(attempt.at).toLocaleString('es-ES')} · Señales examinadas:{' '}
                        {attempt.examined?.length || 0}
                      </p>
                      {!attempt.correct && link && (
                        <button
                          type="button"
                          class="btn btn-secondary btn-compact"
                          onClick={() =>
                            navigate('lesson', {
                              resourceId: link.moduleId,
                              unitIndex: link.unitIndex,
                            })
                          }
                        >
                          <BookOpen size={14} /> Refuerza: {link.moduleTitle} ({link.unitHint})
                        </button>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
