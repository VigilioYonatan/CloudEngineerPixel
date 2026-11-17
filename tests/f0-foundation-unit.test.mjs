import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  EXPECTED_V9_MANIFEST_SHA256,
  buildV9BaselineMap,
  computeManifestV10,
  sha256Buffer,
  writeManifestV10,
} from '../scripts/update-manifest.mjs';
import { verifyRepositoryIntegrity } from '../scripts/verify-integrity.mjs';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('F0-02 regression: fileURLToPath resolves Windows/POSIX file URLs with spaces without doubling drive letters', () => {
  const temp_dir = mkdtempSync(path.join(tmpdir(), 'cea secret unit '));
  try {
    const as_url = pathToFileURL(temp_dir);
    const resolved = fileURLToPath(as_url);
    assert.equal(resolved, temp_dir);
    assert.doesNotMatch(resolved, /^[A-Za-z]:\\[A-Za-z]:\\/);
  } finally {
    rmSync(temp_dir, { recursive: true, force: true });
  }
});

test('F0-02 unit: scanDirectoryForSecrets detects RSA, AWS, Google API and GitHub tokens while ignoring excluded folders', async () => {
  const mod = await import('../scripts/check-secrets.mjs');
  assert.equal(typeof mod.scanDirectoryForSecrets, 'function');

  const temp_dir = mkdtempSync(path.join(tmpdir(), 'cea-secrets-matrix-'));
  try {
    mkdirSync(path.join(temp_dir, 'node_modules', 'pkg'), { recursive: true });
    mkdirSync(path.join(temp_dir, 'src'), { recursive: true });

    const fake_aws = ['AKIA', 'ABCDEFGHIJKLMNOP'].join('');
    const fake_gcp = ['AIza', 'A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r'].join('');
    const fake_gh = ['ghp_', '0123456789abcdefghijklmnopqrstuvwxyz'].join('');
    const fake_pem = ['-----BEGIN ', 'OPENSSH PRIVATE KEY-----'].join('');

    writeFileSync(path.join(temp_dir, 'node_modules', 'pkg', 'ignored.js'), `const k = "${fake_aws}";`, 'utf8');
    writeFileSync(path.join(temp_dir, 'notes.png'), fake_aws, 'utf8');
    writeFileSync(
      path.join(temp_dir, 'src', 'leaks.ts'),
      [fake_aws, fake_gcp, fake_gh, fake_pem].join('\n'),
      'utf8',
    );

    const findings = mod.scanDirectoryForSecrets(temp_dir);
    const titles = findings.map((f) => f.title).sort();
    assert.deepEqual(titles, [
      'AWS access key identifier',
      'GitHub token',
      'Google API key',
      'Private key block',
    ]);
  } finally {
    rmSync(temp_dir, { recursive: true, force: true });
  }
});

test('F0-02 CLI: node scripts/check-secrets.mjs exits 0 on repository root', () => {
  const result = spawnSync(process.execPath, ['scripts/check-secrets.mjs'], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
});

test('F0-03 unit: writeManifestV10 refuses to seal if any V9 baseline file is deleted and detects undeclared edits', () => {
  const sandbox = mkdtempSync(path.join(tmpdir(), 'cea-manifest-sandbox-'));
  try {
    mkdirSync(path.join(sandbox, 'docs'), { recursive: true });
    mkdirSync(path.join(sandbox, 'src'), { recursive: true });

    const app_bytes = Buffer.from('export const ok = true;\n', 'utf8');
    const added_v9_bytes = Buffer.from('# V9 note\n', 'utf8');
    writeFileSync(path.join(sandbox, 'src/app.ts'), app_bytes);
    writeFileSync(path.join(sandbox, 'docs/v9-note.md'), added_v9_bytes);

    const fake_v9_manifest = {
      version: 'V9',
      originalCount: 1,
      addedCount: 1,
      originalFiles: { 'src/app.ts': sha256Buffer(app_bytes) },
      addedFiles: { 'docs/v9-note.md': sha256Buffer(added_v9_bytes) },
      currentHashes: {},
      modified: [],
      removed: [],
    };
    writeFileSync(
      path.join(sandbox, 'docs/FILE_MANIFEST_V9.json'),
      JSON.stringify(fake_v9_manifest, null, 2),
      'utf8',
    );
    writeFileSync(path.join(sandbox, 'docs/NEW_IN_V10.md'), '# Added in V10\n', 'utf8');

    const written = writeManifestV10(sandbox);
    assert.equal(written.originalCount, 3);
    assert.equal(written.addedCount, 1);
    assert.deepEqual(written.removed, []);

    const clean_check = verifyRepositoryIntegrity(sandbox);
    assert.equal(clean_check.ok, true, clean_check.errors.join('\n'));

    // Undeclared modification must fail verification
    writeFileSync(path.join(sandbox, 'src/app.ts'), 'export const ok = false;\n', 'utf8');
    const tampered_check = verifyRepositoryIntegrity(sandbox);
    assert.equal(tampered_check.ok, false);
    assert.ok(tampered_check.errors.some((e) => e.includes('MODIFIED WITHOUT MANIFEST UPDATE: src/app.ts')));

    // Deleting a V9 baseline file must block writeManifestV10 fail-closed
    rmSync(path.join(sandbox, 'docs/v9-note.md'));
    const computed_missing = computeManifestV10(sandbox);
    assert.deepEqual(computed_missing.removed, ['docs/v9-note.md']);
    assert.throws(() => writeManifestV10(sandbox), /baseline file\(s\) missing/);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('F0-03 unit: official V9 manifest hash is cryptographically pinned and verified across 291 files', () => {
  const baseline = buildV9BaselineMap(ROOT_DIR, { enforceOfficialV9Hash: true });
  assert.equal(Object.keys(baseline).length, 291);
  assert.equal(baseline['docs/FILE_MANIFEST_V9.json'], EXPECTED_V9_MANIFEST_SHA256);
});

test('F0-05 regression: SeniorWorkbench binds session.acknowledged accurately without dangling session.ack', () => {
  const workbench_src = readFileSync(path.join(ROOT_DIR, 'src/SeniorWorkbench.tsx'), 'utf8');
  assert.match(workbench_src, /acknowledged:\s*ack/);
  assert.doesNotMatch(workbench_src, /answers,\s*ack,\s*stage\s*\}\s*=\s*session/);
});

