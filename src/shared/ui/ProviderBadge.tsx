import type { CloudProviderId } from '../../domain/providers';
import { CloudProviderLogo } from './CloudProviderLogo';

type ProviderBadgeProps = {
  providerId: CloudProviderId;
};

export function ProviderBadge({ providerId }: ProviderBadgeProps) {
  return (
    <span class={`provider-mark provider-mark-${providerId}`}>
      <CloudProviderLogo providerId={providerId} size={22} />
    </span>
  );
}
