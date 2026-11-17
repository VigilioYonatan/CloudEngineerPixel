import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

export function buildFoundationSteps() {
  const steps = createStepRegistry();

  steps.Dado('el repositorio oficial de Cloud Engineering Academy', (world) => {
    world.repoRoot = ROOT_DIR;
    assert.equal(existsSync(path.join(ROOT_DIR, 'package.json')), true);
  });

  steps.Dado(
    'un directorio temporal con espacios en su ruta y una credencial AWS simulada en configuración',
    (world) => {
      const base_temp = mkdtempSync(path.join(tmpdir(), 'cea bdd workspace '));
      const nested_dir = path.join(base_temp, 'sub carpeta config');
      mkdirSync(nested_dir, { recursive: true });
      const synthetic_aws_id = ['AKIA', '0123456789ABCDEF'].join('');
      writeFileSync(
        path.join(nested_dir, 'leak.json'),
        JSON.stringify({ demoKey: synthetic_aws_id }, null, 2),
        'utf8',
      );
      world.tempDir = base_temp;
    },
  );

  steps.Cuando('el auditor ejecuta el escaneo CLI de secretos sobre el repositorio', (world) => {
    world.secretCliResult = spawnSync(process.execPath, ['scripts/check-secrets.mjs'], {
      cwd: world.repoRoot,
      encoding: 'utf8',
    });
  });

  steps.Entonces('el comando de escaneo de secretos finaliza exitosamente sin alertas', (world) => {
    const res = world.secretCliResult;
    assert.equal(res.status, 0, `check-secrets falló:\nSTDOUT: ${res.stdout}\nSTDERR: ${res.stderr}`);
    assert.equal(res.stderr.trim(), '');
    assert.match(res.stdout, /No obvious credentials detected/);
  });

  steps.Cuando('se analiza el directorio temporal en busca de secretos expuestos', async (world) => {
    const mod = await import('../../../scripts/check-secrets.mjs');
    assert.equal(
      typeof mod.scanDirectoryForSecrets,
      'function',
      'scripts/check-secrets.mjs debe exportar scanDirectoryForSecrets para pruebas deterministas',
    );
    world.findings = mod.scanDirectoryForSecrets(world.tempDir);
  });

  steps.Entonces('el análisis detecta la credencial expuesta y bloquea la validación', (world) => {
    assert.ok(Array.isArray(world.findings) && world.findings.length === 1);
    assert.equal(world.findings[0].title, 'AWS access key identifier');
    assert.match(world.findings[0].file, /sub carpeta config/);
  });

  steps.Cuando('se ejecuta el verificador oficial de integridad de archivos', (world) => {
    world.integrityResult = spawnSync(process.execPath, ['scripts/verify-integrity.mjs'], {
      cwd: world.repoRoot,
      encoding: 'utf8',
    });
  });

  steps.Entonces('los 291 archivos originales de V9 permanecen intactos sin archivos eliminados', (world) => {
    const manifest_v10_path = path.join(world.repoRoot, 'docs/FILE_MANIFEST_V10.json');
    assert.equal(existsSync(manifest_v10_path), true, 'Falta docs/FILE_MANIFEST_V10.json');
    const manifest_v10 = JSON.parse(readFileSync(manifest_v10_path, 'utf8'));
    assert.equal(manifest_v10.originalCount, 291);
    assert.equal(Object.keys(manifest_v10.originalFiles).length, 291);
    assert.deepEqual(manifest_v10.removed, []);
  });

  steps.Entonces('el verificador de integridad aprueba con cero incidencias', (world) => {
    const res = world.integrityResult;
    assert.equal(res.status, 0, `verify-integrity falló:\nSTDOUT: ${res.stdout}\nSTDERR: ${res.stderr}`);
    assert.match(res.stdout, /0 issues\./);
  });

  steps.Cuando('se ejecuta el diagnóstico preflight y la verificación estricta de tipos', (world) => {
    world.gitCheck = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], {
      cwd: world.repoRoot,
      encoding: 'utf8',
    });
    world.doctorResult = spawnSync(process.execPath, ['scripts/project-doctor.mjs', '--json'], {
      cwd: world.repoRoot,
      encoding: 'utf8',
    });
    const tsc_cli = path.join(world.repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');
    world.tscAvailable = existsSync(tsc_cli);
    if (world.tscAvailable) {
      const app_check = spawnSync(process.execPath, [tsc_cli, '--noEmit'], {
        cwd: world.repoRoot,
        encoding: 'utf8',
      });
      const e2e_check = spawnSync(process.execPath, [tsc_cli, '--noEmit', '-p', 'tsconfig.e2e.json'], {
        cwd: world.repoRoot,
        encoding: 'utf8',
      });
      world.typecheckResult = {
        status: app_check.status === 0 && e2e_check.status === 0 ? 0 : 1,
        stdout: `${app_check.stdout}${e2e_check.stdout}`,
        stderr: `${app_check.stderr}${e2e_check.stderr}`,
      };
    } else {
      world.typecheckResult = { status: 2, stdout: '', stderr: 'TypeScript compiler missing in node_modules' };
    }
  });

  steps.Entonces('el repositorio Git está activo y cuenta con package-lock autenticado', (world) => {
    assert.equal(world.gitCheck.status, 0);
    assert.equal(world.gitCheck.stdout.trim(), 'true');
    assert.equal(existsSync(path.join(world.repoRoot, 'package-lock.json')), true, 'Falta package-lock.json');
  });

  steps.Entonces('todas las dependencias y el chequeo estricto de tipos pasan sin errores', (world) => {
    assert.equal(
      world.doctorResult.status,
      0,
      `project-doctor falló:\n${world.doctorResult.stdout}\n${world.doctorResult.stderr}`,
    );
    const report = JSON.parse(world.doctorResult.stdout);
    assert.equal(report.readyForBuild, true);
    assert.equal(report.reproducibleInstall, true);
    assert.deepEqual(report.missingDependencies, []);
    assert.equal(
      world.typecheckResult.status,
      0,
      `tsc --noEmit falló:\n${world.typecheckResult.stdout}\n${world.typecheckResult.stderr}`,
    );
  });

  return {
    steps,
    cleanupWorld: (world) => {
      if (world.tempDir && existsSync(world.tempDir)) {
        rmSync(world.tempDir, { recursive: true, force: true });
      }
    },
  };
}
