import { getProviderMeta, type CloudProviderId } from '../../domain/providers';

type ProviderBadgeProps = {
  providerId: CloudProviderId;
};

export function ProviderBadge({ providerId }: ProviderBadgeProps) {
  const meta = getProviderMeta(providerId);
  return <span class={`provider-mark provider-mark-${providerId}`}>{meta.badgeMark}</span>;
}
