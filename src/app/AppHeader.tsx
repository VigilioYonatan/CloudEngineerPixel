import {
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  CloudCog,
  Compass,
  FlaskConical,
  LayoutDashboard,
  Menu,
  Moon,
  Settings,
  Sun,
  Terminal,
  Trophy,
  X,
} from 'lucide-preact';
import { mobileMenu, navigate, theme, view } from '../lib/state';
import { CloudProviderSwitcher } from './CloudProviderSwitcher';

export function AppHeader() {
  return (
    <header class="header">
      <div class="header-inner">
        <button class="brand" onClick={() => navigate('home')} aria-label="Ir al inicio">
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
          class={`top-nav ${mobileMenu.value ? 'nav-open' : ''}`}
          aria-label="Navegación principal"
        >
          <button
            class={view.value === 'home' ? 'nav-current' : ''}
            onClick={() => navigate('home')}
          >
            <LayoutDashboard size={16} />
            Inicio
          </button>
          <button class={view.value === 'map' ? 'nav-current' : ''} onClick={() => navigate('map')}>
            <Compass size={16} />
            Mapa
          </button>
          <button
            class={['learn', 'lesson'].includes(view.value) ? 'nav-current' : ''}
            onClick={() => navigate('learn')}
          >
            <BookOpen size={16} />
            Aprender
          </button>
          <button
            class={['labs', 'lab'].includes(view.value) ? 'nav-current' : ''}
            onClick={() => navigate('labs')}
          >
            <Terminal size={16} />
            Laboratorios
          </button>
          <button
            class={view.value === 'projects' ? 'nav-current' : ''}
            onClick={() => navigate('projects')}
          >
            <Trophy size={16} />
            Proyectos
          </button>
          <button
            class={view.value === 'simulator' ? 'nav-current' : ''}
            onClick={() => navigate('simulator')}
          >
            <FlaskConical size={16} />
            Simuladores
          </button>
          <button
            class={view.value === 'senior' ? 'nav-current' : ''}
            onClick={() => navigate('senior')}
          >
            <BrainCircuit size={16} />
            Senior Mode <span class="senior-dot" />
          </button>
          <button
            class={view.value === 'progress' ? 'nav-current' : ''}
            onClick={() => navigate('progress')}
          >
            <ChartNoAxesCombined size={16} />
            Mi progreso
          </button>
        </nav>
        <div class="header-actions">
          <CloudProviderSwitcher />
          <button
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
            class="icon-button hide-mobile"
            aria-label="Configuración"
            onClick={() => navigate('settings')}
          >
            <Settings size={18} />
          </button>
          <button
            class="icon-button mobile-toggle"
            aria-label={mobileMenu.value ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => {
              mobileMenu.value = !mobileMenu.value;
            }}
          >
            {mobileMenu.value ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
