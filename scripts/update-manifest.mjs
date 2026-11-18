/**
 * Generates/updates docs/FILE_MANIFEST_V10.json from the immutable 291-file V9 baseline.
 * Fail-closed: aborts with exit code 1 if any of the 291 original V9 files was deleted
 * or if docs/FILE_MANIFEST_V9.json itself was altered.
 */
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CURRENT_FILE = fileURLToPath(import.meta.url);
const DEFAULT_ROOT = path.resolve(path.dirname(CURRENT_FILE), '..');
export const EXPECTED_V9_MANIFEST_SHA256 =
  'cdd814852ff1a2a5f429bc86b112b637b442352fb2ce9eb345aeab2d6e178d0b';

export const MANIFEST_EXCLUDES = new Set([
  'node_modules',
  '.git',
  'dist',
  'test-results',
  'playwright-report',
  'coverage',
  '.tools',
  'sbom.cdx.json',
]);

export const sha256Buffer = (buffer) => createHash('sha256').update(buffer).digest('hex');

/**
 * Lists repository files using POSIX-normalized relative paths.
 * @param {string} root_dir
 * @param {string} [relative]
 * @returns {string[]}
 */
export function listTrackedFiles(root_dir, relative = '') {
  return readdirSync(root_dir, { withFileTypes: true }).flatMap((entry) => {
    if (MANIFEST_EXCLUDES.has(entry.name)) return [];
    const rel = path.posix.join(relative, entry.name);
    const full = path.join(root_dir, entry.name);
    return entry.isDirectory() ? listTrackedFiles(full, rel) : [rel];
  });
}

/**
 * Builds the immutable 291-file V9 baseline map from docs/FILE_MANIFEST_V9.json.
 * @param {string} root_dir
 * @param {{ enforceOfficialV9Hash?: boolean }} [options]
 * @returns {Record<string, string>}
 */
export function buildV9BaselineMap(root_dir, options = {}) {
  const v9_rel = 'docs/FILE_MANIFEST_V9.json';
  const v9_full = path.join(root_dir, v9_rel);
  if (!existsSync(v9_full)) {
    throw new Error(`Missing immutable V9 manifest: ${v9_rel}`);
  }
  const raw_bytes = readFileSync(v9_full);
  const v9_hash = sha256Buffer(raw_bytes);
  if (options.enforceOfficialV9Hash && v9_hash !== EXPECTED_V9_MANIFEST_SHA256) {
    throw new Error(
      `Immutable V9 manifest hash mismatch: expected ${EXPECTED_V9_MANIFEST_SHA256}, got ${v9_hash}`,
    );
  }

  const v9_data = JSON.parse(raw_bytes.toString('utf8'));
  const merged = {};
  for (const [rel, base_hash] of Object.entries(v9_data.originalFiles ?? {})) {
    merged[rel] = v9_data.currentHashes?.[rel] ?? base_hash;
  }
  for (const [rel, added_hash] of Object.entries(v9_data.addedFiles ?? {})) {
    merged[rel] = v9_data.currentHashes?.[rel] ?? added_hash;
  }
  merged[v9_rel] = v9_hash;

  const sorted = {};
  for (const key of Object.keys(merged).sort()) {
    sorted[key] = merged[key];
  }
  return sorted;
}

/**
 * Computes the V10 manifest structure without writing to disk.
 * @param {string} root_dir
 * @param {{ targetManifestRel?: string; enforceOfficialV9Hash?: boolean; generatedAt?: string }} [options]
 */
export function computeManifestV10(root_dir, options = {}) {
  const target_rel = options.targetManifestRel ?? 'docs/FILE_MANIFEST_V10.json';
  const original_files = buildV9BaselineMap(root_dir, {
    enforceOfficialV9Hash: options.enforceOfficialV9Hash ?? false,
  });

  const actual_files = listTrackedFiles(root_dir)
    .filter((rel) => rel !== target_rel)
    .sort();
  const actual_set = new Set(actual_files);

  const removed = Object.keys(original_files).filter((rel) => !actual_set.has(rel));
  const added_files = {};
  const current_hashes = {};
  const modified = [];

  for (const rel of actual_files) {
    const digest = sha256Buffer(readFileSync(path.join(root_dir, rel)));
    if (Object.hasOwn(original_files, rel)) {
      if (digest !== original_files[rel]) {
        current_hashes[rel] = digest;
        modified.push(rel);
      }
    } else {
      added_files[rel] = digest;
    }
  }

  return {
    version: 'V10',
    baselineVersion: 'V9',
    sourceManifest: 'docs/FILE_MANIFEST_V9.json',
    generatedAt: options.generatedAt ?? new Date().toISOString().slice(0, 10),
    originalCount: Object.keys(original_files).length,
    addedCount: Object.keys(added_files).length,
    originalFiles: original_files,
    addedFiles: added_files,
    currentHashes: current_hashes,
    modified,
    removed,
  };
}

/**
 * Writes docs/FILE_MANIFEST_V10.json if and only if zero V9 baseline files were removed.
 * @param {string} [root_dir]
 */
export function writeManifestV10(root_dir = DEFAULT_ROOT) {
  const resolved_root = path.resolve(root_dir);
  const target_rel = 'docs/FILE_MANIFEST_V10.json';
  const manifest = computeManifestV10(resolved_root, {
    targetManifestRel: target_rel,
    enforceOfficialV9Hash: resolved_root === DEFAULT_ROOT,
    generatedAt: '2026-11-16',
  });
  if (manifest.removed.length > 0) {
    throw new Error(
      `Refusing to generate ${target_rel}: ${manifest.removed.length} V9 baseline file(s) missing: ${manifest.removed.join(', ')}`,
    );
  }
  writeFileSync(path.join(root_dir, target_rel), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

const is_cli_entry = process.argv[1] && path.resolve(process.argv[1]) === CURRENT_FILE;
if (is_cli_entry) {
  try {
    const result = writeManifestV10(DEFAULT_ROOT);
    console.log(
      `Updated FILE_MANIFEST_V10.json: ${result.originalCount} V9 baseline files preserved, ${result.addedCount} added, ${result.modified.length} modified, ${result.removed.length} removed.`,
    );
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
  }
}
