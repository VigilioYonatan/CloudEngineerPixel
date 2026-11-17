import { modules, type Module, type Provider } from '../data/course';

export function resolveActiveModule(module_id: string): Module {
  return modules.find((item) => item.id === module_id) || modules[0];
}

export function completedTopicsCount(
  mod: Module,
  cloud_id: Provider,
  completed_keys: readonly string[],
): number {
  return mod.topics.filter((_, idx) => completed_keys.includes(`${cloud_id}:${mod.id}:${idx}`))
    .length;
}

export function totalCompletedCount(completed_keys: readonly string[]): number {
  return completed_keys.length;
}

export function moduleLabKey(mod: Module, cloud_id: Provider): string {
  return `${cloud_id}:${mod.id}:lab`;
}
