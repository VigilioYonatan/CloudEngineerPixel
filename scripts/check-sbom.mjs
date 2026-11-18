import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SBOM_PATH = path.join(ROOT_DIR, 'sbom.cdx.json');

export function generateAndValidateSbom() {
  const raw = execSync('npm sbom --sbom-format cyclonedx', {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  const parsed = JSON.parse(raw);
  if (parsed.bomFormat !== 'CycloneDX') {
    throw new Error(`Unexpected SBOM format: ${parsed.bomFormat}`);
  }
  if (!Array.isArray(parsed.components) || parsed.components.length === 0) {
    throw new Error('CycloneDX SBOM contains 0 components');
  }
  writeFileSync(SBOM_PATH, raw, 'utf8');
  return {
    bomFormat: parsed.bomFormat,
    specVersion: parsed.specVersion,
    componentCount: parsed.components.length,
  };
}

const isCli =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const summary = generateAndValidateSbom();
  console.log(
    `SBOM CycloneDX v${summary.specVersion} valid: ${summary.componentCount} components written to sbom.cdx.json`,
  );
}
