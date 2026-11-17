import type { ComponentChildren } from 'preact';
import { useRef } from 'preact/hooks';

export type AccessibleTabItem<T extends string> = {
  id: T;
  label: string;
  icon?: ComponentChildren;
};

export type AccessibleTabsProps<T extends string> = {
  ariaLabel: string;
  items: readonly AccessibleTabItem<T>[];
  activeId: T;
  onSelect: (id: T) => void;
  className?: string;
  activeClassName?: string;
};

export function AccessibleTabs<T extends string>({
  ariaLabel,
  items,
  activeId,
  onSelect,
  className = 'tabs',
  activeClassName = 'tab-active',
}: AccessibleTabsProps<T>) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusAndSelectIndex = (targetIdx: number) => {
    const normalized = ((targetIdx % items.length) + items.length) % items.length;
    const targetItem = items[normalized];
    if (!targetItem) return;
    onSelect(targetItem.id);
    buttonRefs.current[normalized]?.focus();
  };

  return (
    <div class={className} role="tablist" aria-label={ariaLabel}>
      {items.map((item, idx) => {
        const isSelected = item.id === activeId;
        return (
          <button
            key={item.id}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            class={isSelected ? activeClassName : ''}
            onClick={() => onSelect(item.id)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                focusAndSelectIndex(idx + 1);
              } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                focusAndSelectIndex(idx - 1);
              } else if (event.key === 'Home') {
                event.preventDefault();
                focusAndSelectIndex(0);
              } else if (event.key === 'End') {
                event.preventDefault();
                focusAndSelectIndex(items.length - 1);
              }
            }}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
