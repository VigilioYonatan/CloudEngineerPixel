import { CloudCog } from 'lucide-preact';

export function AppFooter() {
  return (
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <CloudCog size={22} />
          <span>Cloud Engineering Academy</span>
        </div>
        <span>Aprende el concepto. Domina la nube. Piensa como ingeniero.</span>
        <span>
          Educación independiente · AWS, Azure y Google Cloud no patrocinan esta academia.
        </span>
      </div>
    </footer>
  );
}
