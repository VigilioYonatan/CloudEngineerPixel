import type { CloudProviderId } from '../../domain/providers';
import { resolvePublicUrl } from '../../lib/publicAssetUrl';

type CloudProviderLogoProps = {
  providerId: CloudProviderId;
  size?: number;
  decorative?: boolean;
};

const LOGO_ALT: Readonly<Record<CloudProviderId, string>> = {
  aws: 'Logo de Amazon Web Services',
  azure: 'Logo de Microsoft Azure',
  gcp: 'Logo de Google Cloud',
};

export function CloudProviderLogo({
  providerId,
  size = 20,
  decorative = true,
}: CloudProviderLogoProps) {
  return (
    <span class={`cloud-logo-chip cloud-logo-${providerId}`} aria-hidden={decorative}>
      <img
        src={resolvePublicUrl(`/logos/${providerId}.svg`)}
        alt={decorative ? '' : LOGO_ALT[providerId]}
        width={size}
        height={size}
        decoding="async"
      />
    </span>
  );
}
