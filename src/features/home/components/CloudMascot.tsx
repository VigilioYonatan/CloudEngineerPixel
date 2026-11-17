import { CloudMentor } from '../../../components/mascot/CloudMentor';
import { provider } from '../../../lib/state';

type CloudMascotProps = {
  size?: 'large' | 'medium' | 'small';
  className?: string;
};

export function CloudMascot({ size = 'large', className = '' }: CloudMascotProps) {
  const mappedSize = size === 'large' ? 'hero' : size === 'medium' ? 'banner' : 'card';
  return (
    <CloudMentor
      providerId={provider.value}
      variant="provider"
      size={mappedSize}
      className={className}
    />
  );
}
