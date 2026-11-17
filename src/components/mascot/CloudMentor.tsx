import type { Provider } from '../../data/course';
import { getProviderMeta } from '../../domain/providers';
import {
  CLOUD_MENTOR_DIMENSIONS,
  getMentorPoseMeta,
  type CloudMentorPose,
  type CloudMentorSize,
} from './cloudMentor.constants';

export type CloudMentorProps = {
  providerId: Provider;
  variant?: 'provider' | 'senior-artwork' | 'pose';
  pose?: CloudMentorPose;
  size?: CloudMentorSize;
  alt?: string;
  className?: string;
};

export function CloudMentor({
  providerId,
  variant = 'provider',
  pose = 'welcome',
  size = 'hero',
  alt,
  className = '',
}: CloudMentorProps) {
  const providerMeta = getProviderMeta(providerId);
  const dimensions = CLOUD_MENTOR_DIMENSIONS[size];
  const poseMeta = getMentorPoseMeta(pose);

  if (variant === 'pose') {
    const label = alt || `${poseMeta.label} (${providerMeta.short})`;
    return (
      <div
        class={`cloud-mentor-stage cloud-mentor-${size} cloud-mentor-pose-frame ${className}`}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          aspectRatio: '1 / 1',
        }}
        role="img"
        aria-label={label}
      >
        <span
          class="cloud-mentor-sprite"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${providerMeta.mascot.transparentPoses})`,
            backgroundPosition: poseMeta.bgPosition,
          }}
        />
      </div>
    );
  }

  const imgSrc =
    variant === 'senior-artwork'
      ? providerMeta.mascot.transparentSenior
      : providerMeta.mascot.transparentDefault;
  const imgAlt =
    alt || (variant === 'senior-artwork' ? providerMeta.mascot.seniorAlt : providerMeta.mascot.alt);

  return (
    <div
      key={`${providerId}-${variant}`}
      class={`cloud-mentor-stage cloud-mentor-animated cloud-mentor-${size} ${className}`}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        aspectRatio: '1 / 1',
      }}
    >
      <img
        class="mascot cloud-mentor-img"
        src={imgSrc}
        alt={imgAlt}
        width={dimensions.width}
        height={dimensions.height}
        decoding="async"
      />
    </div>
  );
}
