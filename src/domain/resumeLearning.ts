import { modules, type Provider } from '../data/course';

export type LastVisitedPointer = {
  moduleId: string;
  unitIndex: number;
  updatedAt?: string;
};

export type ResolvedResumeTarget = {
  moduleId: string;
  unitIndex: number;
  moduleTitle: string;
  unitTitle: string;
};

function findFirstUncompletedFrom(
  start_module_index: number,
  start_unit_index: number,
  completed_keys: readonly string[],
  cloud_id: Provider,
): ResolvedResumeTarget | null {
  const total_modules = modules.length;
  for (let offset = 0; offset < total_modules; offset += 1) {
    const mod_idx = (start_module_index + offset) % total_modules;
    const mod = modules[mod_idx];
    const first_unit = offset === 0 ? start_unit_index : 0;
    for (let u_idx = first_unit; u_idx < mod.topics.length; u_idx += 1) {
      if (!completed_keys.includes(`${cloud_id}:${mod.id}:${u_idx}`)) {
        return {
          moduleId: mod.id,
          unitIndex: u_idx,
          moduleTitle: mod.title,
          unitTitle: mod.topics[u_idx],
        };
      }
    }
  }
  return null;
}

export function resolveResumeTarget(
  last_visited: LastVisitedPointer | null | undefined,
  completed_keys: readonly string[],
  cloud_id: Provider,
): ResolvedResumeTarget | null {
  if (last_visited) {
    const mod_idx = modules.findIndex((item) => item.id === last_visited.moduleId);
    if (mod_idx >= 0) {
      const mod = modules[mod_idx];
      const clamped_unit = Math.max(0, Math.min(mod.topics.length - 1, last_visited.unitIndex));
      if (!completed_keys.includes(`${cloud_id}:${mod.id}:${clamped_unit}`)) {
        return {
          moduleId: mod.id,
          unitIndex: clamped_unit,
          moduleTitle: mod.title,
          unitTitle: mod.topics[clamped_unit],
        };
      }
      return findFirstUncompletedFrom(mod_idx, clamped_unit + 1, completed_keys, cloud_id);
    }
  }

  const has_cloud_activity = completed_keys.some((key) => key.startsWith(`${cloud_id}:`));
  if (!has_cloud_activity) {
    return null;
  }
  return findFirstUncompletedFrom(0, 0, completed_keys, cloud_id);
}
