import { FlaskConical, Search } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { EmptyState } from '../../../components/ui/EmptyState';
import type { Level, Provider } from '../../../data/course';
import { navigate, progress, provider, setProvider } from '../../../lib/state';
import { LabCatalogCard } from '../components/LabCatalogCard';
import type { LabCostTier, LabModality } from '../constants/labsCatalog.constants';
import {
  buildGlobalLabsCatalog,
  filterLabsCatalog,
  type LabsCatalogFilterCriteria,
} from '../libs/filterLabsCatalog';

const INITIAL_FILTERS: LabsCatalogFilterCriteria = {
  provider: 'todos',
  level: 'todos',
  modality: 'todos',
  costTier: 'todos',
  search: '',
};

export function LabsCatalogPage() {
  const [criteria, setCriteria] = useState<LabsCatalogFilterCriteria>(INITIAL_FILTERS);
  const all_labs = buildGlobalLabsCatalog(progress.value.completed);
  const filtered_labs = filterLabsCatalog(all_labs, criteria);

  return (
    <main class="page-container">
      <div class="page-kicker">
        <FlaskConical size={16} /> CATÁLOGO GLOBAL DE PRÁCTICAS · 54 LABS + 3 OIDC + 3 PROYECTOS
      </div>
      <section class="page-intro">
        <div>
          <h1>
            Laboratorios <span>Multicloud.</span>
          </h1>
          <p>
            Explora las <strong>54 guías por proveedor</strong>, los{' '}
            <strong>3 talleres DevSecOps OIDC</strong> sin secretos estáticos y los{' '}
            <strong>3 proyectos integradores</strong> con advertencia explícita de modalidad y
            costos.
          </p>
        </div>
        <div class="intro-stat">
          <span>PRÁCTICAS VISIBLES</span>
          <strong>
            {filtered_labs.length}/{all_labs.length}
          </strong>
          <small>catálogo verificable</small>
        </div>
      </section>

      <section class="info-card labs-filter-panel" aria-label="Filtros de laboratorios">
        <div class="labs-filter-grid">
          <label>
            <span>Proveedor</span>
            <select
              aria-label="Filtrar por proveedor"
              value={criteria.provider}
              onChange={(event) =>
                setCriteria((prev) => ({
                  ...prev,
                  provider: (event.currentTarget as HTMLSelectElement).value as 'todos' | Provider,
                }))
              }
            >
              <option value="todos">Todos los proveedores</option>
              <option value="aws">AWS</option>
              <option value="azure">Microsoft Azure</option>
              <option value="gcp">Google Cloud</option>
            </select>
          </label>

          <label>
            <span>Nivel</span>
            <select
              aria-label="Filtrar por nivel"
              value={criteria.level}
              onChange={(event) =>
                setCriteria((prev) => ({
                  ...prev,
                  level: (event.currentTarget as HTMLSelectElement).value as 'todos' | Level,
                }))
              }
            >
              <option value="todos">Todos los niveles</option>
              <option value="fundamentos">Fundamentos</option>
              <option value="intermedio">Ingeniería</option>
              <option value="avanzado">Arquitectura</option>
            </select>
          </label>

          <label>
            <span>Modalidad</span>
            <select
              aria-label="Filtrar por modalidad"
              value={criteria.modality}
              onChange={(event) =>
                setCriteria((prev) => ({
                  ...prev,
                  modality: (event.currentTarget as HTMLSelectElement).value as
                    | 'todos'
                    | LabModality,
                }))
              }
            >
              <option value="todos">Todas las modalidades</option>
              <option value="simulado">Simulado en navegador</option>
              <option value="local-docker-kind">Local Docker / Kind</option>
              <option value="cuenta-propia">Cuenta cloud propia</option>
            </select>
          </label>

          <label>
            <span>Advertencia de costo</span>
            <select
              aria-label="Filtrar por advertencia de costo"
              value={criteria.costTier}
              onChange={(event) =>
                setCriteria((prev) => ({
                  ...prev,
                  costTier: (event.currentTarget as HTMLSelectElement).value as
                    | 'todos'
                    | LabCostTier,
                }))
              }
            >
              <option value="todos">Todos los perfiles de costo</option>
              <option value="gratis-local">Gratis local</option>
              <option value="free-tier-elegible">Free-tier elegible</option>
              <option value="genera-cargos">Genera cargos</option>
            </select>
          </label>
        </div>

        <div class="labs-search-row">
          <label class="search-field">
            <Search size={17} />
            <input
              type="search"
              aria-label="Buscar laboratorios"
              placeholder="Buscar por servicio, OIDC, Terraform, VPC, Kubernetes..."
              value={criteria.search}
              onInput={(event) =>
                setCriteria((prev) => ({
                  ...prev,
                  search: (event.currentTarget as HTMLInputElement).value,
                }))
              }
            />
          </label>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => setCriteria(INITIAL_FILTERS)}
          >
            Limpiar filtros
          </button>
        </div>
      </section>

      {filtered_labs.length === 0 ? (
        <EmptyState
          providerId={provider.value}
          title="No hay prácticas que coincidan con los filtros seleccionados"
          description="Limpia la combinación activa de proveedor, nivel, modalidad o perfil de costo."
          actionLabel="Restablecer filtros de laboratorios"
          onAction={() => setCriteria(INITIAL_FILTERS)}
        />
      ) : (
        <div class="labs-catalog-grid">
          {filtered_labs.map((lab_item) => (
            <LabCatalogCard
              key={lab_item.id}
              item={lab_item}
              onOpenLab={(chosen) => {
                if (chosen.provider !== 'multicloud' && chosen.provider !== provider.value) {
                  setProvider(chosen.provider);
                }
                navigate('lab', chosen.targetModuleId);
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
