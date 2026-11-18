import { readdirSync, readFileSync } from 'node:fs';
import path, { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CURRENT_FILE = fileURLToPath(import.meta.url);
const ROOT_DIR = path.resolve(path.dirname(CURRENT_FILE), '..');

export const SECRET_SCAN_IGNORE = new Set([
  'node_modules',
  '.git',
  'dist',
  'coverage',
  'public',
  'test-results',
  'playwright-report',
  '.tools',
  'sbom.cdx.json',
]);

export const SECRET_SCAN_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.mts',
  '.mjs',
  '.js',
  '.json',
  '.yml',
  '.yaml',
  '.html',
]);

export const SECRET_SIGNATURES = [
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, 'Private key block'],
  [/AKIA[0-9A-Z]{16}/, 'AWS access key identifier'],
  [/AIza[0-9A-Za-z_-]{35}/, 'Google API key'],
  [/gh[pousr]_[A-Za-z0-9_]{30,}/, 'GitHub token'],
];

/**
 * Recursively scans a directory for obvious credential patterns using OS-safe paths.
 * @param {string} directory
 * @param {{ ignore?: Set<string>; extensions?: Set<string> }} [options]
 * @returns {Array<{ title: string; file: string }>}
 */
export function scanDirectoryForSecrets(directory, options = {}) {
  const ignore_set = options.ignore ?? SECRET_SCAN_IGNORE;
  const ext_set = options.extensions ?? SECRET_SCAN_EXTENSIONS;
  /** @type {Array<{ title: string; file: string }>} */
  const findings = [];

  function inspect(current_dir) {
    for (const entry of readdirSync(current_dir, { withFileTypes: true })) {
      if (ignore_set.has(entry.name)) continue;
      const full_path = join(current_dir, entry.name);
      if (entry.isDirectory()) {
        inspect(full_path);
        continue;
      }
      if (!ext_set.has(extname(entry.name)) || entry.name === 'check-secrets.mjs') continue;
      // Exclude npm lockfile SHA-512 base64 integrity digests from false-positive token heuristics,
      // while still scanning the rest of package-lock.json (URLs, headers, resolved registries).
      const raw = readFileSync(full_path, 'utf8');
      const content_to_scan =
        entry.name === 'package-lock.json'
          ? raw.replace(/"integrity":\s*"sha512-[A-Za-z0-9+/=]+"/g, '"integrity": "[REDACTED_HASH]"')
          : raw;
      for (const [pattern, title] of SECRET_SIGNATURES) {
        if (pattern.test(content_to_scan)) {
          findings.push({ title, file: full_path });
        }
      }
    }
  }

  inspect(path.resolve(directory));
  return findings;
}

const is_cli_entry = process.argv[1] && path.resolve(process.argv[1]) === CURRENT_FILE;
if (is_cli_entry) {
  const detected = scanDirectoryForSecrets(ROOT_DIR);
  for (const finding of detected) {
    console.error(`${finding.title} in ${finding.file}`);
  }
  if (detected.length > 0) {
    process.exitCode = 1;
  } else {
    console.log('No obvious credentials detected. This is not a substitute for enterprise secret scanning.');
  }
}
