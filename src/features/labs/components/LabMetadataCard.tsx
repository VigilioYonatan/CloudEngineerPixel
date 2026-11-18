import { Clock3, DollarSign, KeyRound, ShieldCheck } from 'lucide-preact';
import type { Provider } from '../../../data/course';
import type { LabVerifiableMetadata } from '../../../data/labMetadata';
import { Tag } from '../../../shared/ui/Tag';

type LabMetadataCardProps = {
  meta: LabVerifiableMetadata;
  provider: Provider;
  providerShort: string;
};

export function LabMetadataCard({ meta, provider, providerShort }: LabMetadataCardProps) {
  return (
    <section
      class="info-card lab-metadata-card"
      aria-label="Ficha técnica verificable del laboratorio"
    >
      <div class="lab-metadata-head">
        <div>
          <strong>Ficha de gobernanza y seguridad · {providerShort}</strong>
          <small>Revisión técnica: {meta.reviewedAt}</small>
        </div>
        <div class="module-tags">
          <Tag kind="accent">
            <Clock3 size={12} /> ~{meta.estimatedMinutes} min
          </Tag>
          {meta.prerequisites.map((req) => (
            <Tag key={req}>{req}</Tag>
          ))}
        </div>
      </div>

      <div class="lab-metadata-grid">
        <div class="lab-meta-item">
          <strong>
            <KeyRound size={15} /> Permisos mínimos de consulta
          </strong>
          <code>{meta.minimumPermissions[provider]}</code>
        </div>
        <div class="lab-meta-item">
          <strong>
            <DollarSign size={15} /> Riesgo de facturación en nube real
          </strong>
          <p>{meta.billableResources[provider]}</p>
        </div>
        <div class="lab-meta-item">
          <strong>
            <ShieldCheck size={15} /> Verificación post-cleanup
          </strong>
          <p>{meta.postCleanupChecks[provider]}</p>
        </div>
      </div>
    </section>
  );
}
