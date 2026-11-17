import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  Check,
  CheckCircle2,
  Clock3,
  CloudCog,
  FlaskConical,
  Network,
  ShieldCheck,
  Terminal,
} from 'lucide-preact';
import { CloudMentor } from '../../../components/mascot/CloudMentor';
import { SENIOR_MODE_PILLARS } from '../../../data/cloudServicesCatalog';
import { levelInfo, modules, type Level } from '../../../data/course';
import { CLOUD_PROVIDER_IDS, getProviderMeta } from '../../../domain/providers';
import { levelFilter, navigate, provider, setProvider } from '../../../lib/state';
import { ProviderBadge } from '../../../shared/ui/ProviderBadge';
import { FirstVisitOnboardingCard } from '../components/FirstVisitOnboardingCard';
import { HomeHero } from '../components/HomeHero';
import { HomeServicesStrip } from '../components/HomeServicesStrip';
import { SectionHeading } from '../components/SectionHeading';

const CURRICULUM_LEVELS: readonly Level[] = ['fundamentos', 'intermedio', 'avanzado'];

export function HomePage() {
  const active_cloud = provider.value;
  const active_meta = getProviderMeta(active_cloud);

  return (
    <main>
      <FirstVisitOnboardingCard />
      <HomeHero />

      <section class="stats-strip">
        <div>
          <span class="stat-symbol">
            <BookOpen size={20} />
          </span>
          <strong>18</strong>
          <small>MÓDULOS</small>
        </div>
        <div>
          <span class="stat-symbol">
            <Clock3 size={20} />
          </span>
          <strong>240h</strong>
          <small>FORMACIÓN</small>
        </div>
        <div>
          <span class="stat-symbol">
            <FlaskConical size={20} />
          </span>
          <strong>3</strong>
          <small>RUTAS CLOUD</small>
        </div>
        <div>
          <span class="stat-symbol">
            <ShieldCheck size={20} />
          </span>
          <strong>18</strong>
          <small>CASOS SENIOR</small>
        </div>
      </section>

      <section class="section-pad">
        <SectionHeading
          eyebrow="ESCOGE TU CAMINO"
          title="De principiante a arquitecto cloud"
          description="Tres niveles conectados. Una única metodología que se adapta a tu proveedor."
          side={
            <button class="text-action" onClick={() => navigate('learn')}>
              Ver todos los módulos <ArrowRight size={16} />
            </button>
          }
        />
        <div class="level-cards">
          {CURRICULUM_LEVELS.map((level_id, index) => {
            const level_modules = modules.filter((mod) => mod.level === level_id);
            const info = levelInfo[level_id];
            return (
              <button
                key={level_id}
                class={`level-card level-${level_id}`}
                onClick={() => {
                  levelFilter.value = level_id;
                  navigate('learn');
                }}
              >
                <div class="level-card-top">
                  <div class="level-icon">
                    <span>{info.number}</span>
                  </div>
                  <span class="level-hours">
                    {level_modules.reduce((sum, mod) => sum + mod.hours, 0)} HORAS
                  </span>
                </div>
                <div class="level-ghost-num">0{index + 1}</div>
                <span class="level-step">NIVEL {index + 1}</span>
                <h3>{info.name}</h3>
                <p>{info.description}</p>
                <div class="level-bottom">
                  <span>{level_modules.length} módulos</span>
                  <span class="round-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section class="section-pad">
        <SectionHeading
          eyebrow="APRENDE CON TU NUBE"
          title="Una academia. Tres ecosistemas."
          description="Cambia de proveedor sin repetir teoría. Los ejemplos, comandos y servicios clave sí cambian."
        />
        <div class="provider-cards">
          {CLOUD_PROVIDER_IDS.map((provider_id) => {
            const meta = getProviderMeta(provider_id);
            const is_active = provider.value === provider_id;
            return (
              <button
                key={provider_id}
                class={`provider-card provider-card-${provider_id} ${is_active ? 'selected' : ''}`}
                onClick={() => setProvider(provider_id)}
              >
                <div class="provider-card-head">
                  <ProviderBadge providerId={provider_id} />
                  {is_active && (
                    <span class="selected-label">
                      <Check size={14} /> ACTIVA
                    </span>
                  )}
                </div>
                <h3>{meta.name}</h3>
                <p>{meta.tagline}</p>
                <div class="provider-footer">
                  <span>{is_active ? 'Ruta seleccionada' : 'Elegir ruta'}</span>
                  <ArrowRight size={18} />
                </div>
              </button>
            );
          })}
        </div>

        <HomeServicesStrip providerId={active_cloud} providerName={active_meta.name} />
      </section>

      <section class="feature-band">
        <div class="feature-band-copy">
          <span class="eyebrow">
            <span class="eyebrow-square" />
            ENTRENA COMO EN PRODUCCIÓN
          </span>
          <h2>
            Los tutoriales no bastan.
            <br />
            <span>Resuelve incidentes reales.</span>
          </h2>
          <p>
            Aprende a tomar decisiones bajo presión con 18 escenarios de ingeniería avanzada:
            seguridad, Terraform, Kubernetes, SRE, redes y costos.
          </p>
          <div class="feature-checks">
            <span>
              <CheckCircle2 size={16} /> Decisiones con consecuencias
            </span>
            <span>
              <CheckCircle2 size={16} /> Evidencias y rúbricas
            </span>
            <span>
              <CheckCircle2 size={16} /> Sin credenciales ni riesgos
            </span>
          </div>
          <button class="btn btn-gold" onClick={() => navigate('senior')}>
            Entrar a Senior Mode <ArrowRight size={18} />
          </button>
        </div>
        <div class="feature-band-art">
          <div class="senior-halo" />
          <span class="senior-orbit-tag senior-orbit-top">{SENIOR_MODE_PILLARS[0]}</span>
          <span class="senior-orbit-tag senior-orbit-bottom">{SENIOR_MODE_PILLARS[1]}</span>
          <CloudMentor
            providerId={provider.value}
            variant="senior-artwork"
            size="banner"
            alt={`Cloud Mentor en modo senior (${active_meta.short})`}
          />
        </div>
      </section>

      <section class="section-pad">
        <SectionHeading eyebrow="APRENDER HACIENDO" title="Todo lo que necesitas para crecer" />
        <div class="feature-grid">
          <div>
            <span class="feature-icon">
              <Terminal size={23} />
            </span>
            <h3>Laboratorios guiados</h3>
            <p>
              Comandos reales por proveedor, checklist de seguridad, evidencias y limpieza de
              recursos.
            </p>
          </div>
          <div>
            <span class="feature-icon">
              <Network size={23} />
            </span>
            <h3>Simuladores interactivos</h3>
            <p>Practica CIDR, permisos IAM, capacidad y confiabilidad sin pagar una nube.</p>
          </div>
          <div>
            <span class="feature-icon">
              <ChartNoAxesCombined size={23} />
            </span>
            <h3>Progreso a tu ritmo</h3>
            <p>Guarda avance por concepto y por proveedor, y exporta tus resultados en JSON.</p>
          </div>
        </div>
      </section>

      <section class="bottom-cta">
        <CloudCog size={39} />
        <div>
          <h2>Tu viaje cloud empieza hoy.</h2>
          <p>Elige una nube. Aprende los fundamentos. Construye con criterio.</p>
        </div>
        <button class="btn btn-primary" onClick={() => navigate('learn')}>
          Explorar la academia <ArrowRight size={17} />
        </button>
      </section>
    </main>
  );
}
