import { CloudCog } from 'lucide-preact';
import type { AboutSectionId } from './router';
import { navigate } from '../lib/state';

const FOOTER_LINKS: readonly { id: AboutSectionId; label: string }[] = [
  { id: 'metodologia', label: 'Metodología' },
  { id: 'seguridad-cloud', label: 'Seguridad Cloud' },
  { id: 'privacidad', label: 'Privacidad' },
  { id: 'no-afiliacion', label: 'No afiliación' },
];

export function AppFooter() {
  return (
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <CloudCog size={22} />
          <span>Cloud Engineering Academy</span>
        </div>
        <nav class="footer-links" aria-label="Información institucional y seguridad">
          {FOOTER_LINKS.map((link) => (
            <button
              type="button"
              key={link.id}
              class="footer-link-btn"
              onClick={() => navigate('about', { aboutSection: link.id })}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <span>
          Educación independiente · AWS, Azure y Google Cloud no patrocinan esta academia.
        </span>
      </div>
    </footer>
  );
}
