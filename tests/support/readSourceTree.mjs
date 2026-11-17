import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function listSourceFiles(rel_dir, extensions = ['.ts', '.tsx', '.mts', '.mjs']) {
  const abs_dir = path.join(ROOT_DIR, rel_dir);
  if (!existsSync(abs_dir)) return [];
  return readdirSync(abs_dir, { withFileTypes: true }).flatMap((entry) => {
    const child_rel = path.posix.join(rel_dir.replace(/\\/g, '/'), entry.name);
    if (entry.isDirectory()) return listSourceFiles(child_rel, extensions);
    return extensions.some((ext) => entry.name.endsWith(ext)) ? [child_rel] : [];
  });
}

export function readConcatenatedSources(rel_paths_or_dirs) {
  const files = rel_paths_or_dirs.flatMap((item) => {
    const abs = path.join(ROOT_DIR, item);
    if (!existsSync(abs)) return [];
    return item.match(/\.[a-z]+$/i) ? [item] : listSourceFiles(item);
  });
  return files.map((rel) => readFileSync(path.join(ROOT_DIR, rel), 'utf8')).join('\n');
}
