import {
  ArrowRight,
  BrainCircuit,
  ChevronRight,
  Cloud,
  Cpu,
  Database,
  ShieldCheck,
} from 'lucide-preact';
import { CLOUD_ESSENTIAL_SERVICES_2026 } from '../../../data/cloudServicesCatalog';
import { getProviderMeta } from '../../../domain/providers';
import { resolveResumeTarget } from '../../../domain/resumeLearning';
import { lastVisited } from '../../../lib/onboardingState';
import { navigate, progress, provider } from '../../../lib/state';
import { CloudMascot } from './CloudMascot';

export function HomeHero() {
  const active_cloud = provider.value;
  const active_meta = getProviderMeta(active_cloud);
  const resume_target = resolveResumeTarget(
    lastVisited.value,
    progress.value.completed,
    active_cloud,
  );
  const cloud_services = CLOUD_ESSENTIAL_SERVICES_2026[active_cloud];
  const orbit_services = [
    cloud_services[1],
    cloud_services[5],
    cloud_services[7],
    cloud_services[6],
  ];

  return (
    <section class="hero">
      <div class="hero-glow" />
      <div class="hero-copy">
        <div class="hero-pill">
          <span class="live-dot" /> TU PRÓXIMO NIVEL COMIENZA AQUÍ <ChevronRight size={14} />
        </div>
        <h1>
          Domina el <span class="hero-emphasis">Cloud.</span>
          <br />
          Construye el <span class="hero-white">futuro.</span>
        </h1>
        <p>
          De tu primera instancia a una arquitectura de producción. Aprende{' '}
          <strong>AWS, Azure y Google Cloud</strong> con laboratorios, simuladores y desafíos de
          ingeniería real.
        </p>
        <div class="hero-actions">
          <button
            class="btn btn-primary btn-lg"
            title={
              resume_target
                ? `Reanudar: ${resume_target.moduleTitle} · ${resume_target.unitTitle}`
                : undefined
            }
            onClick={() => {
              if (resume_target) {
                navigate('lesson', {
                  resourceId: resume_target.moduleId,
                  unitIndex: resume_target.unitIndex,
                });
              } else {
                navigate('learn');
              }
            }}
          >
            {resume_target ? 'Continuar donde me quedé' : 'Empezar a aprender'}
            <ArrowRight size={19} />
          </button>
          <button class="btn btn-ghost btn-lg" onClick={() => navigate('senior')}>
            <BrainCircuit size={18} />
            Explorar Senior Mode
          </button>
        </div>
        <div class="hero-proof">
          <div class="avatar-stack">
            <span>☁</span>
            <span>⚡</span>
            <span>⌘</span>
          </div>
          <span>
            <strong>18 módulos</strong> · 240 horas · 3 nubes
          </span>
        </div>
      </div>

      <div class="hero-art" aria-label={`Servicios clave de ${active_meta.name} sobre la mascota`}>
        <div class="art-ring ring-one" />
        <div class="art-ring ring-two" />
        <span class="orbit-chip chip-top hero-orbit-a">
          <Cloud size={15} /> {active_meta.short} · {orbit_services[0].shortLabel}
        </span>
        <span class="orbit-chip chip-left hero-orbit-b">
          <Database size={15} /> {orbit_services[1].shortLabel}
        </span>
        <span class="orbit-chip chip-right hero-orbit-c">
          <Cpu size={14} /> {orbit_services[2].shortLabel}
        </span>
        <span class="orbit-chip chip-bottom hero-orbit-d">
          <ShieldCheck size={14} /> {orbit_services[3].shortLabel}
        </span>
        <CloudMascot />
        <div class="mascot-floor" />
      </div>
      <div class="hero-side-label">INGENIERÍA CLOUD / EDICIÓN 2026</div>
    </section>
  );
}
