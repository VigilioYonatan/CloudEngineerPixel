/**
 * Release verifier. V10 snapshots the full 291-file V9 archive, preserving all historical manifests.
 * Neither missing files nor changes not declared in the active manifest are acceptable.
 */
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CURRENT_FILE = fileURLToPath(import.meta.url);
const DEFAULT_ROOT = path.resolve(path.dirname(CURRENT_FILE), '..');
const MANIFEST_CANDIDATES = [
  'docs/FILE_MANIFEST_V10.json',
  'docs/FILE_MANIFEST_V9.json',
  'docs/FILE_MANIFEST_V8.json',
];
const EXCLUDES = new Set([
  'node_modules',
  '.git',
  'dist',
  'test-results',
  'playwright-report',
  'coverage',
  '.tools',
  'sbom.cdx.json',
]);

const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

function listFiles(dir, relative = '') {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (EXCLUDES.has(entry.name)) return [];
    const rel = path.posix.join(relative, entry.name);
    return entry.isDirectory() ? listFiles(path.join(dir, entry.name), rel) : [rel];
  });
}

/**
 * Resolves the latest manifest present in the repository.
 * @param {string} root_dir
 */
export function resolveActiveManifestRel(root_dir) {
  for (const candidate of MANIFEST_CANDIDATES) {
    if (existsSync(path.join(root_dir, candidate))) return candidate;
  }
  return null;
}

/**
 * Verifies every tracked file in `root_dir` against the active manifest.
 * @param {string} [root_dir]
 * @param {string} [explicit_manifest_rel]
 */
export function verifyRepositoryIntegrity(root_dir = DEFAULT_ROOT, explicit_manifest_rel) {
  const manifest_rel = explicit_manifest_rel ?? resolveActiveManifestRel(root_dir);
  if (!manifest_rel || !existsSync(path.join(root_dir, manifest_rel))) {
    return {
      ok: false,
      failures: 1,
      errors: [`Missing release manifest: ${manifest_rel ?? 'docs/FILE_MANIFEST_V*.json'}`],
      summary: 'Missing release manifest',
    };
  }

  const manifest_path = path.join(root_dir, manifest_rel);
  const data = JSON.parse(readFileSync(manifest_path, 'utf8'));
  const files = { ...data.originalFiles, ...data.addedFiles };
  /** @type {string[]} */
  const errors = [];

  for (const [rel, baseline] of Object.entries(files)) {
    const loc = path.resolve(root_dir, rel);
    if (!loc.startsWith(root_dir + path.sep)) {
      errors.push(`INVALID FILE PATH: ${rel}`);
      continue;
    }
    if (!existsSync(loc)) {
      errors.push(`MISSING: ${rel}`);
      continue;
    }
    const current = sha256(readFileSync(loc));
    const expected = data.currentHashes?.[rel] ?? baseline;
    if (current !== expected) {
      errors.push(`MODIFIED WITHOUT MANIFEST UPDATE: ${rel}`);
    }
  }

  const skip = new Set([path.relative(root_dir, manifest_path).replaceAll(path.sep, '/')]);
  const actual = listFiles(root_dir)
    .filter((rel) => !skip.has(rel))
    .sort();
  const expected = Object.keys(files).sort();

  for (const rel of actual.filter((item) => !expected.includes(item))) {
    errors.push(`UNTRACKED: ${rel}`);
  }
  for (const rel of expected.filter((item) => !actual.includes(item))) {
    errors.push(`REMOVED: ${rel}`);
  }
  if (Array.isArray(data.removed) && data.removed.length > 0) {
    errors.push(`Manifest reports removed files: ${data.removed.join(', ')}`);
  }

  const summary = `Integrity ${data.version ?? 'V6'}: ${data.originalCount} baseline files, ${data.addedCount} additions, ${data.modified.length} modified, ${errors.length} issues.`;
  return {
    ok: errors.length === 0,
    failures: errors.length,
    errors,
    summary,
    version: data.version,
  };
}

const is_cli_entry = process.argv[1] && path.resolve(process.argv[1]) === CURRENT_FILE;
if (is_cli_entry) {
  const result = verifyRepositoryIntegrity(DEFAULT_ROOT);
  for (const err of result.errors) {
    console.error(err);
  }
  console.log(result.summary);
  if (!result.ok) process.exit(1);
}
