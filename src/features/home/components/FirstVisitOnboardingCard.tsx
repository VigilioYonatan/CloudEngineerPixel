import { ArrowRight, Sparkles, X } from 'lucide-preact';
import {
  CLOUD_PROVIDER_IDS,
  getProviderMeta,
  type CloudProviderId,
} from '../../../domain/providers';
import { markOnboardingCompleted, showOnboarding } from '../../../lib/onboardingState';
import { setProvider } from '../../../lib/state';
import { ProviderBadge } from '../../../shared/ui/ProviderBadge';

const PROFILE_GUIDES: Readonly<Record<CloudProviderId, string>> = {
  aws: 'Ideal para startups cloud-native, amplitud de servicios y rutas de arquitectura generalista.',
  azure:
    'Ideal para entornos corporativos, identidad híbrida con Entra ID y ecosistemas empresariales.',
  gcp: 'Ideal para ingeniería de datos, Kubernetes (GKE), SRE y plataformas analíticas modernas.',
};

export function FirstVisitOnboardingCard() {
  if (!showOnboarding.value) return null;

  return (
    <section class="onboarding-banner" aria-label="Bienvenida y elección de ruta cloud inicial">
      <div class="onboarding-top">
        <div class="onboarding-title">
          <Sparkles size={18} />
          <div>
            <strong>Primera visita · Elige tu nube inicial según tu perfil</strong>
            <span>
              Puedes cambiar de proveedor en cualquier momento desde la cabecera sin perder avance.
            </span>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-ghost"
          onClick={markOnboardingCompleted}
          aria-label="Explorar libremente sin fijar ruta ahora"
        >
          Explorar libremente <X size={15} />
        </button>
      </div>

      <div class="onboarding-grid">
        {CLOUD_PROVIDER_IDS.map((cloud_id) => {
          const meta = getProviderMeta(cloud_id);
          return (
            <button
              type="button"
              key={cloud_id}
              class="onboarding-choice"
              onClick={() => {
                setProvider(cloud_id);
              }}
            >
              <div class="onboarding-choice-head">
                <ProviderBadge providerId={cloud_id} />
                <strong>{meta.name}</strong>
              </div>
              <p>{PROFILE_GUIDES[cloud_id]}</p>
              <span class="onboarding-cta">
                Iniciar con {meta.short} <ArrowRight size={15} />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
