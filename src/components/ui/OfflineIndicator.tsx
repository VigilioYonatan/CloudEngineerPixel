import { WifiOff } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false,
  );

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div role="status" aria-live="polite" class="offline-indicator">
      <WifiOff size={16} />
      <span>
        <strong>Sin conexión a Internet:</strong> la academia funciona 100% local en tu navegador;
        únicamente los enlaces a documentación oficial externa requerirán red.
      </span>
    </div>
  );
}
