import { signal } from '@preact/signals';

export const glossaryOpen = signal(false);
export const glossaryQuery = signal('');

export function openGlossary(initialQuery = ''): void {
  glossaryQuery.value = initialQuery;
  glossaryOpen.value = true;
}

export function closeGlossary(): void {
  glossaryOpen.value = false;
}
