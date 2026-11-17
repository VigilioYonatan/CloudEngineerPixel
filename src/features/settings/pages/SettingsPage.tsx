import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Info,
  Moon,
  Settings,
  ShieldCheck,
  Sun,
} from 'lucide-preact';
import { APP_VERSION } from '../../../config/appMeta';
import { CLOUD_PROVIDER_IDS, getProviderMeta } from '../../../domain/providers';
import { navigate, provider, setProvider, theme } from '../../../lib/state';
import { ProviderBadge } from '../../../shared/ui/ProviderBadge';

export function SettingsPage() {
  return (
    <main class="page-container settings-page">
      <div class="page-kicker">
        <Settings size={17} /> PREFERENCIAS
      </div>
      <section class="page-intro">
        <div>
          <h1>
            Tu academia. <span>Tu ritmo.</span>
          </h1>
          <p>Personaliza la apariencia y la nube de aprendizaje.</p>
        </div>
      </section>

      <section class="info-card">
        <div class="card-heading">
          <Cloud size={20} />
          <h3>Proveedor principal</h3>
        </div>
        <div class="settings-providers">
          {CLOUD_PROVIDER_IDS.map((cloud_id) => {
            const meta = getProviderMeta(cloud_id);
            const is_selected = provider.value === cloud_id;
            return (
              <button
                key={cloud_id}
                onClick={() => setProvider(cloud_id)}
                class={is_selected ? 'setting-selected' : ''}
              >
                <ProviderBadge providerId={cloud_id} />
                <strong>{meta.name}</strong>
                {is_selected && <CheckCircle2 size={20} />}
              </button>
            );
          })}
        </div>
      </section>

      <section class="info-card">
        <div class="card-heading">
          <Sun size={20} />
          <h3>Apariencia</h3>
        </div>
        <div class="action-row">
          <button
            class={`btn ${theme.value === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              theme.value = 'dark';
            }}
          >
            <Moon size={17} /> Oscuro
          </button>
          <button
            class={`btn ${theme.value === 'light' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              theme.value = 'light';
            }}
          >
            <Sun size={17} /> Claro
          </button>
        </div>
      </section>

      <section class="info-card">
        <div class="card-heading">
          <ShieldCheck size={20} />
          <h3>Privacidad y seguridad</h3>
        </div>
        <p>
          La academia no requiere credenciales cloud. El progreso se guarda solo en el
          almacenamiento de este navegador; no usamos un backend para recopilar tus respuestas. No
          introduzcas tokens, claves ni información personal sensible en tus notas.
        </p>
        <button class="btn btn-secondary" onClick={() => navigate('progress')}>
          Administrar datos de progreso <ArrowRight size={17} />
        </button>
      </section>

      <section class="info-card">
        <div class="card-heading">
          <Info size={20} />
          <h3>Sobre Cloud Engineering Academy</h3>
        </div>
        <p>
          Versión {APP_VERSION} · Plataforma educativa independiente inspirada en la experiencia de
          GoPixel Academy y en las prácticas de ingeniería de Vigilio. Los servicios, comandos y
          límites pueden cambiar. Consulta siempre la documentación oficial antes de ejecutar
          cambios reales.
        </p>
      </section>
    </main>
  );
}
