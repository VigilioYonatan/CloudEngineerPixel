type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
};

export function ProgressBar({ value, max = 100, label = 'Progreso completado' }: ProgressBarProps) {
  const safeMax = Math.max(1, max);
  const clampedValue = Math.max(0, Math.min(safeMax, value));
  const percentage = Math.max(0, Math.min(100, max > 0 ? (clampedValue / safeMax) * 100 : 0));

  return (
    <div
      class="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={safeMax}
    >
      <span style={{ width: `${percentage}%` }} />
    </div>
  );
}
