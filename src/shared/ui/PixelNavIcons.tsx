type IconProps = { size?: number; className?: string };

const base = (size = 16, className = '') => ({
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'currentColor',
  shapeRendering: 'crispEdges' as const,
  'aria-hidden': true as const,
  class: `pixel-nav-icon ${className}`,
});

export function PixelHomeIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M7 2h2v1h2v1h2v2h1v8H9v-4H7v4H2V6h1V4h2V3h2V2zm0 3v1H5v6h1V9h4v3h1V6H9V5H7z" />
    </svg>
  );
}

export function PixelMapIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M2 3h4v1h4V3h4v10h-4v-1H6v1H2V3zm2 2v6h2V5H4zm4 1v4h2V6H8zm4-1v6h1V5h-1z" />
    </svg>
  );
}

export function PixelBookIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M2 3h5v1h2V3h5v10H9v-1H7v1H2V3zm2 2v6h3V5H4zm5 0v6h3V5H9z" />
    </svg>
  );
}

export function PixelTerminalIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M2 3h12v10H2V3zm2 2v6h8V5H4zm1 1h2v1h1v1H7v1H5V8h1V7H5V6zm4 3h3v1H9V9z" />
    </svg>
  );
}

export function PixelTrophyIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 2h8v2h2v3h-2v1h-2v2H9v2h3v2H4v-2h3v-2H6V8H4V7H2V4h2V2zm2 2v3h4V4H6z" />
    </svg>
  );
}

export function PixelFlaskIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M6 2h4v2H9v3l4 5v2H3v-2l4-5V4H6V2zm1 6-2 3h6l-2-3H7z" />
    </svg>
  );
}

export function PixelCrownIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path fill="#f4c45b" d="M2 4h2v2h2v1h1V4h2v3h1V6h2V4h2v7H2V4zm1 8h10v2H3v-2z" />
    </svg>
  );
}

export function PixelChartIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M2 13h12v1H2v-1zm1-4h2v3H3V9zm4-3h2v6H7V6zm4-3h2v9h-2V3z" />
    </svg>
  );
}
