import { Trophy } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { getProviderMeta } from '../../../domain/providers';
import { provider } from '../../../lib/state';
import { ProjectDetailWorkspace } from '../components/ProjectDetailWorkspace';
import {
  PORTFOLIO_PROJECTS,
  type PortfolioProjectDefinition,
} from '../constants/projects.constants';

export function ProjectsPage() {
  const [selected_id, setSelectedId] = useState<PortfolioProjectDefinition['id']>('project-1');
  const active_cloud = provider.value;
  const cloud_meta = getProviderMeta(active_cloud);
  const active_project =
    PORTFOLIO_PROJECTS.find((item) => item.id === selected_id) || PORTFOLIO_PROJECTS[0];

  return (
    <main class="page-container">
      <div class="page-kicker">
        <Trophy size={16} /> PROYECTOS INTEGRADORES Y PORTFOLIO · {cloud_meta.short}
      </div>
      <section class="page-intro">
        <div>
          <h1>
            Proyectos Integradores y <span>Portfolio Defendible.</span>
          </h1>
          <p>
            Tres hitos de ingeniería con entregables verificables, rúbrica explícita y exportación
            de Architecture Decision Record (ADR) adaptada a <strong>{cloud_meta.name}</strong>.
          </p>
        </div>
        <div class="intro-stat">
          <span>PROYECTOS</span>
          <strong>03</strong>
          <small>plantillas ADR exportables</small>
        </div>
      </section>

      <div class="learn-toolbar">
        <div class="tabs" role="toolbar" aria-label="Seleccionar proyecto integrador">
          {PORTFOLIO_PROJECTS.map((proj) => (
            <button
              type="button"
              key={proj.id}
              class={active_project.id === proj.id ? 'tab-active' : ''}
              onClick={() => setSelectedId(proj.id)}
            >
              {proj.shortTab}
            </button>
          ))}
        </div>
      </div>

      <ProjectDetailWorkspace project={active_project} cloudId={active_cloud} />
    </main>
  );
}
