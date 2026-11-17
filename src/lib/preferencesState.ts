import { effect, signal } from '@preact/signals';

export type MotionPreference = 'system' | 'reduced';

const MOTION_STORAGE_KEY = 'cea:motion';

function readInitialMotion(): MotionPreference {
  try {
    const raw =
      typeof localStorage !== 'undefined' ? localStorage.getItem(MOTION_STORAGE_KEY) : null;
    if (raw === 'reduced' || raw === '"reduced"') return 'reduced';
    return 'system';
  } catch {
    return 'system';
  }
}

export const motionPreference = signal<MotionPreference>(readInitialMotion());

export function setMotionPreference(next: MotionPreference): void {
  motionPreference.value = next;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(MOTION_STORAGE_KEY, next);
    }
  } catch {
    /* ignore storage write error */
  }
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.motion = next;
  }
}

effect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.motion = motionPreference.value;
  }
});
