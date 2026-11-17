type ProgressBarProps = {
  value: number;
  max?: number;
};

export function ProgressBar({ value, max = 100 }: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));
  return (
    <div class="progress-track">
      <span style={{ width: `${percentage}%` }} />
    </div>
  );
}
