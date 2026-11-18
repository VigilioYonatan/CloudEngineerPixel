import { ArrowRight, ExternalLink, Info, ShieldCheck } from 'lucide-preact';
import { useEffect } from 'preact/hooks';
import { APP_VERSION } from '../../../config/appMeta';
import { getProviderMeta } from '../../../domain/providers';
import { currentAboutSection, navigate, provider } from '../../../lib/state';
import { Tag } from '../../../shared/ui/Tag';
import { ABOUT_SECTIONS } from '../constants/about.constants';

export function AboutPage() {
  const active_section = currentAboutSection.value;
  const cloud_meta = getProviderMeta(provider.value);

  useEffect(() => {
    document
      .getElementById(`seccion-${active_section}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [active_section]);

  return (
    <main class="page-container">
      <div class="page-kicker">
        <Info size={16} /> ACERCA DE LA ACADEMIA · VERSIÓN {APP_VERSION}
      </div>
      <section class="page-intro">
        <div>
          <h1>
            Metodología, Seguridad Cloud y <span>Alcance Honesto.</span>
          </h1>
          <p>
            Conoce cómo estructuramos el aprendizaje multicloud, cómo proteger tus cuentas de
            práctica y cuáles son los límites transparentes de esta plataforma estática.
          </p>
        </div>
        <div class="intro-stat">
          <span>VERSIÓN ACTIVA</span>
          <strong>{APP_VERSION}</strong>
          <small>100% local · sin telemetría</small>
        </div>
      </section>

      <div class="learn-toolbar">
        <nav class="tabs" aria-label="Secciones informativas de Acerca">
          {ABOUT_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              aria-current={active_section === sec.id ? 'true' : undefined}
              class={active_section === sec.id ? 'tab-active' : ''}
              onClick={() => navigate('about', { aboutSection: sec.id })}
            >
              {sec.shortLabel}
            </button>
          ))}
        </nav>
      </div>

      <div class="about-sections-stack">
        {ABOUT_SECTIONS.map((sec) => {
          const is_highlighted = active_section === sec.id;
          return (
            <section
              id={`seccion-${sec.id}`}
              key={sec.id}
              class={`info-card about-section-card ${is_highlighted ? 'about-section-active' : ''}`}
            >
              <div class="about-section-top">
                <span class="eyebrow">
                  <span class="eyebrow-square" /> {sec.eyebrow}
                </span>
                {is_highlighted && <Tag kind="accent">SECCIÓN ACTIVA</Tag>}
              </div>
              <h2>{sec.title}</h2>
              <p>{sec.lead}</p>
              <ul class="sr-proof">
                {sec.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section class="info-card about-cta-card">
        <div class="card-heading">
          <ShieldCheck size={20} />
          <h3>Documentación oficial de {cloud_meta.name}</h3>
        </div>
        <p>
          Contrasta siempre cuotas, precios y sintaxis CLI vigente directamente en las fuentes del
          proveedor antes de aprovisionar infraestructura real.
        </p>
        <div class="action-row">
          <a
            class="btn btn-secondary"
            href={cloud_meta.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentación {cloud_meta.short} <ExternalLink size={15} />
          </a>
          <a
            class="btn btn-secondary"
            href={cloud_meta.pricingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Calculadora de precios <ExternalLink size={15} />
          </a>
          <button type="button" class="btn btn-primary" onClick={() => navigate('map')}>
            Ver Mapa Curricular <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
