import type { ComponentChildren } from 'preact';

export type TagKind = 'default' | 'accent' | 'gold' | 'danger';

type TagProps = {
  children: ComponentChildren;
  kind?: TagKind;
};

export function Tag({ children, kind = 'default' }: TagProps) {
  return <span class={`tag tag-${kind}`}>{children}</span>;
}
