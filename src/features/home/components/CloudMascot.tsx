import { getProviderMeta } from '../../../domain/providers';
import { provider } from '../../../lib/state';

type CloudMascotProps = {
  size?: 'large' | 'medium' | 'small';
  className?: string;
};

export function CloudMascot({ size = 'large', className = '' }: CloudMascotProps) {
  const meta = getProviderMeta(provider.value);
  return (
    <img
      class={`mascot mascot-${size} ${className}`}
      src={meta.mascot.default}
      alt={meta.mascot.alt}
    />
  );
}
