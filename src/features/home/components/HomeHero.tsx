import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Terminal,
} from 'lucide-preact';
import { getProviderMeta } from '../../../domain/providers';
import { navigate, provider } from '../../../lib/state';
import { CloudMascot } from './CloudMascot';

type HomeHeroProps = {
  doneCount: number;
};

export function HomeHero({ doneCount }: HomeHeroProps) {
  const active_meta = getProviderMeta(provider.value);

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
          <button class="btn btn-primary btn-lg" onClick={() => navigate('learn')}>
            {doneCount ? 'Continuar aprendiendo' : 'Empezar a aprender'}
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
      <div class="hero-art">
        <div class="art-ring ring-one" />
        <div class="art-ring ring-two" />
        <span class="orbit-chip chip-top">
          <Cloud size={15} /> {active_meta.short} MODE
        </span>
        <span class="orbit-chip chip-left">
          <CheckCircle2 size={15} /> HANDS-ON
        </span>
        <span class="orbit-chip chip-bottom">
          <Terminal size={14} /> &gt;_ ready
        </span>
        <CloudMascot />
        <div class="mascot-floor" />
      </div>
      <div class="hero-side-label">INGENIERÍA CLOUD / EDICIÓN 2026</div>
    </section>
  );
}
