import type { ComponentChildren } from 'preact';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  side?: ComponentChildren;
};

export function SectionHeading({ eyebrow, title, description, side }: SectionHeadingProps) {
  return (
    <div class="section-heading">
      <div>
        <span class="eyebrow">
          <span class="eyebrow-square" />
          {eyebrow}
        </span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {side}
    </div>
  );
}
