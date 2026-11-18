import { BookOpen, CloudCog, Info, Menu, Moon, Settings, Sun, X } from 'lucide-preact';
import { useEffect, useRef } from 'preact/hooks';
import { openGlossary } from '../lib/glossaryState';
import { mobileMenu, navigate, theme, view } from '../lib/state';
import {
  PixelBookIcon,
  PixelChartIcon,
  PixelCrownIcon,
  PixelFlaskIcon,
  PixelHomeIcon,
  PixelMapIcon,
  PixelTerminalIcon,
  PixelTrophyIcon,
} from '../shared/ui/PixelNavIcons';
import { CloudProviderSwitcher } from './CloudProviderSwitcher';

export function AppHeader() {
  const isMenuOpen = mobileMenu.value;
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isMenuOpen) {
      wasOpenRef.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleResize = () => {
        if (window.innerWidth > 970) {
          mobileMenu.value = false;
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener('resize', handleResize);
      };
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
    }
    return undefined;
  }, [isMenuOpen]);

  return (
    <header class="header">
      <div class="header-inner">
        <button
          type="button"
          class="brand"
          onClick={() => navigate('home')}
          aria-label="Ir al inicio"
        >
          <span class="brand-icon">
            <CloudCog size={25} />
          </span>
          <span class="brand-type">
            CLOUD<span>ENGINEERING</span>
            <small>
              ACADEMY <b>●</b> MULTICLOUD
            </small>
          </span>
        </button>

        <nav
          id="primary-navigation"
          class={`top-nav ${isMenuOpen ? 'nav-open' : ''}`}
          aria-label="Navegación principal"
        >
          <button
            type="button"
            class={view.value === 'home' ? 'nav-current' : ''}
            onClick={() => navigate('home')}
          >
            <PixelHomeIcon size={16} />
            Inicio
          </button>
          <button
            type="button"
            class={view.value === 'map' ? 'nav-current' : ''}
            onClick={() => navigate('map')}
          >
            <PixelMapIcon size={16} />
            Mapa
          </button>
          <button
            type="button"
            class={['learn', 'lesson'].includes(view.value) ? 'nav-current' : ''}
            onClick={() => navigate('learn')}
          >
            <PixelBookIcon size={16} />
            Aprender
          </button>
          <button
            type="button"
            class={['labs', 'lab'].includes(view.value) ? 'nav-current' : ''}
            onClick={() => navigate('labs')}
          >
            <PixelTerminalIcon size={16} />
            Laboratorios
          </button>
          <button
            type="button"
            class={view.value === 'projects' ? 'nav-current' : ''}
            onClick={() => navigate('projects')}
          >
            <PixelTrophyIcon size={16} />
            Proyectos
          </button>
          <button
            type="button"
            class={view.value === 'simulator' ? 'nav-current' : ''}
            onClick={() => navigate('simulator')}
          >
            <PixelFlaskIcon size={16} />
            Simuladores
          </button>
          <button
            type="button"
            class={view.value === 'senior' ? 'nav-current' : ''}
            onClick={() => navigate('senior')}
          >
            <PixelCrownIcon size={16} />
            Senior Mode <span class="senior-dot" />
          </button>
          <button
            type="button"
            class={view.value === 'progress' ? 'nav-current' : ''}
            onClick={() => navigate('progress')}
          >
            <PixelChartIcon size={16} />
            Mi progreso
          </button>

          <div class="mobile-drawer-utilities">
            <button
              type="button"
              onClick={() => {
                theme.value = theme.value === 'dark' ? 'light' : 'dark';
              }}
            >
              {theme.value === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {theme.value === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            </button>
            <button
              type="button"
              class={view.value === 'settings' ? 'nav-current' : ''}
              onClick={() => navigate('settings')}
            >
              <Settings size={16} />
              Configuración
            </button>
            <button
              type="button"
              onClick={() => {
                mobileMenu.value = false;
                openGlossary();
              }}
            >
              <BookOpen size={16} />
              Glosario técnico
            </button>
            <button
              type="button"
              class={view.value === 'about' ? 'nav-current' : ''}
              onClick={() => navigate('about')}
            >
              <Info size={16} />
              Acerca de
            </button>
          </div>
        </nav>

        <div class="header-actions">
          <CloudProviderSwitcher />
          <button
            type="button"
            class="icon-button hide-mobile"
            aria-label="Abrir glosario técnico"
            title="Glosario técnico y siglas"
            onClick={() => openGlossary()}
          >
            <BookOpen size={18} />
          </button>
          <button
            type="button"
            class="icon-button hide-mobile"
            aria-label="Cambiar tema"
            title="Cambiar tema"
            onClick={() => {
              theme.value = theme.value === 'dark' ? 'light' : 'dark';
            }}
          >
            {theme.value === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            class="icon-button hide-mobile"
            aria-label="Configuración"
            onClick={() => navigate('settings')}
          >
            <Settings size={18} />
          </button>
          <button
            type="button"
            ref={toggleBtnRef}
            class="icon-button mobile-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => {
              mobileMenu.value = !mobileMenu.value;
            }}
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
