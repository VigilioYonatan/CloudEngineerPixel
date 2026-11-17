import { CloudMentor } from '../../../components/mascot/CloudMentor';
import type { Provider } from '../../../data/course';

type SeniorMascotStageProps = {
  providerId: Provider;
  alt: string;
  topPill?: string;
  bottomPill?: string;
};

export function SeniorMascotStage({
  providerId,
  alt,
  topPill = 'RPO · RTO',
  bottomPill,
}: SeniorMascotStageProps) {
  return (
    <div class="sr-mascot-stage">
      <span class="sr-mascot-aura" aria-hidden="true" />
      <span class="sr-mascot-pill sr-mascot-pill-top" aria-hidden="true">
        {topPill}
      </span>
      {bottomPill && (
        <span class="sr-mascot-pill sr-mascot-pill-bottom" aria-hidden="true">
          {bottomPill}
        </span>
      )}
      <CloudMentor providerId={providerId} variant="senior-artwork" size="banner" alt={alt} />
    </div>
  );
}
