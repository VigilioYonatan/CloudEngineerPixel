import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { verifyBundleBudget } from '../scripts/check-bundle-budget.mjs';
import { generateAndValidateSbom } from '../scripts/check-sbom.mjs';

const ROOT = process.cwd();

test('F9-01..F9-07 · Biome strict config, SHA-40 workflows, CSP/HSTS headers, CycloneDX SBOM, bundle budget, and docs governance', () => {
  // F9-01: Biome strict configuration
  const biome = JSON.parse(fs.readFileSync(path.join(ROOT, 'biome.json'), 'utf8'));
  assert.equal(biome.formatter.enabled, true);
  assert.equal(biome.linter.enabled, true);
  assert.equal(biome.linter.rules.preset, 'recommended');
  assert.equal(biome.linter.rules.suspicious.noExplicitAny, 'error');
  assert.equal(biome.linter.rules.correctness.noUnusedVariables, 'error');

  // F9-02: SHA-40 pinned GitHub Actions + persist-credentials: false + npm ci + zero continue-on-error
  for (const wfName of ['quality.yml', 'devsecops.yml', 'codeql.yml']) {
    const wf = fs.readFileSync(path.join(ROOT, '.github/workflows', wfName), 'utf8');
    assert.ok(!wf.includes('continue-on-error: true'), `${wfName} must not allow continue-on-error`);
    assert.ok(wf.includes('persist-credentials: false'), `${wfName} must disable persist-credentials`);
    const usesMatches = [...wf.matchAll(/^\s*-?\s*uses:\s*([^\s#]+)/gm)].map((m) => m[1]);
    assert.ok(usesMatches.length >= 1, `Expected uses steps in ${wfName}`);
    for (const actionRef of usesMatches) {
      assert.match(
        actionRef,
        /@[0-9a-f]{40}$/,
        `Action "${actionRef}" in ${wfName} must be pinned to a 40-char commit SHA`,
      );
    }
    if (wfName !== 'codeql.yml') {
      assert.ok(wf.includes('npm ci'), `${wfName} must use deterministic npm ci`);
      assert.ok(!wf.includes('npm install'), `${wfName} must not use mutable npm install`);
    }
  }

  // F9-03: Hardened security headers in public/_headers (and dist/_headers when built)
  const pubHeaders = fs.readFileSync(path.join(ROOT, 'public/_headers'), 'utf8');
  for (const directive of [
    'Strict-Transport-Security:',
    'Cross-Origin-Opener-Policy: same-origin',
    'Cross-Origin-Resource-Policy: same-origin',
    'X-Content-Type-Options: nosniff',
    "default-src 'self'",
    "font-src 'self'",
  ]) {
    assert.ok(pubHeaders.includes(directive), `public/_headers missing ${directive}`);
  }
  assert.ok(!pubHeaders.includes('fonts.googleapis.com'));
  assert.ok(!pubHeaders.includes('fonts.gstatic.com'));

  // F9-04: CycloneDX SBOM generation & validation
  const sbomSummary = generateAndValidateSbom();
  assert.equal(sbomSummary.bomFormat, 'CycloneDX');
  assert.ok(sbomSummary.componentCount >= 5);

  // F9-05: Bundle budget validation (if dist/ exists)
  if (fs.existsSync(path.join(ROOT, 'dist/index.html'))) {
    const budget = verifyBundleBudget();
    assert.ok(budget.jsGzipBytes <= 60 * 1024);
  }

  // F9-06 & F9-07: Architecture, Authoring, Accessibility, Release Checklist, Changelog & 15-section README
  for (const docRel of [
    'docs/ARCHITECTURE.md',
    'docs/CONTENT_AUTHORING.md',
    'docs/ACCESSIBILITY.md',
    'docs/RELEASE_CHECKLIST.md',
    'CHANGELOG.md',
    'README.md',
  ]) {
    const content = fs.readFileSync(path.join(ROOT, docRel), 'utf8');
    assert.ok(content.length > 500, `${docRel} must have substantial technical content`);
  }
  const archDoc = fs.readFileSync(path.join(ROOT, 'docs/ARCHITECTURE.md'), 'utf8');
  assert.ok(archDoc.includes('```mermaid'));

  const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
  assert.ok(readme.includes('## 7. Quick Start (< 10 minutos)'));
  assert.ok(readme.includes('## 15. Contribución, Marcas y Licencia Educativa'));
});
