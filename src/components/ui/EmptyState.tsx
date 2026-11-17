import type { Provider } from '../../data/course';
import { CloudMentor } from '../mascot/CloudMentor';

export type EmptyStateProps = {
  providerId: Provider;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  providerId,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div class="empty-state empty-state-rich" role="status" aria-live="polite">
      <CloudMentor providerId={providerId} variant="pose" pose="thinking" size="compact" />
      <div class="empty-state-copy">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      {actionLabel && onAction && (
        <button type="button" class="btn btn-secondary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
