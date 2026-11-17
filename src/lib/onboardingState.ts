import { signal } from '@preact/signals';
import type { LastVisitedPointer } from '../domain/resumeLearning';

const ONBOARDED_KEY = 'cea:onboarded';
const LAST_VISITED_KEY = 'cea:last-visited';

function readRawStorage(key: string): string | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

function readInitialLastVisited(): LastVisitedPointer | null {
  const raw = readRawStorage(LAST_VISITED_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<LastVisitedPointer>;
    if (
      parsed &&
      typeof parsed.moduleId === 'string' &&
      typeof parsed.unitIndex === 'number' &&
      Number.isInteger(parsed.unitIndex) &&
      parsed.unitIndex >= 0
    ) {
      return {
        moduleId: parsed.moduleId,
        unitIndex: parsed.unitIndex,
        ...(typeof parsed.updatedAt === 'string' ? { updatedAt: parsed.updatedAt } : {}),
      };
    }
    return null;
  } catch {
    return null;
  }
}

const had_prior_provider_at_boot =
  readRawStorage('cea:provider') !== null || readRawStorage(ONBOARDED_KEY) === '1';

export const showOnboarding = signal<boolean>(!had_prior_provider_at_boot);
export const lastVisited = signal<LastVisitedPointer | null>(readInitialLastVisited());

export function markOnboardingCompleted(): void {
  showOnboarding.value = false;
  try {
    localStorage.setItem(ONBOARDED_KEY, '1');
  } catch {
    /* ignore storage restrictions */
  }
}

export function recordLastVisitedUnit(module_id: string, unit_index: number): void {
  const next_pointer: LastVisitedPointer = {
    moduleId: module_id,
    unitIndex: Math.max(0, unit_index),
    updatedAt: new Date().toISOString(),
  };
  lastVisited.value = next_pointer;
  try {
    localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(next_pointer));
  } catch {
    /* ignore storage restrictions */
  }
}

export function clearLastVisitedUnit(): void {
  lastVisited.value = null;
  try {
    localStorage.removeItem(LAST_VISITED_KEY);
  } catch {
    /* ignore storage restrictions */
  }
}
