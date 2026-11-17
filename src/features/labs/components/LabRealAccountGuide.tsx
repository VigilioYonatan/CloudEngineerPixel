import { AlertTriangle, ExternalLink, ShieldAlert } from 'lucide-preact';
import { REAL_CLOUD_SAFETY_STEPS } from '../constants/labs.constants';

type LabRealAccountGuideProps = {
  serviceLabel: string;
  serviceDocUrl: string;
};

export function LabRealAccountGuide({ serviceLabel, serviceDocUrl }: LabRealAccountGuideProps) {
  return (
    <section class="info-card">
      <div class="card-heading">
        <AlertTriangle size={19} />
        <h3>Antes de conectar tu cuenta</h3>
      </div>
      <div class="warning-box">
        <ShieldAlert size={22} />
        <div>
          <strong>Los proveedores pueden generar cargos.</strong>
          <span>
            La academia no crea, detiene ni elimina recursos. Trabaja únicamente en un entorno de
            prueba aislado, con presupuesto y permisos limitados.
          </span>
        </div>
      </div>
      <ol class="plain-steps">
        {REAL_CLOUD_SAFETY_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <a class="official-link" href={serviceDocUrl} target="_blank" rel="noopener noreferrer">
        Abrir guía oficial de {serviceLabel}
        <ExternalLink size={15} />
      </a>
    </section>
  );
}
