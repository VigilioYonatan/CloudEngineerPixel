import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStepRegistry } from '../support/gherkinRunner.mjs';
import { readConcatenatedSources } from '../../support/readSourceTree.mjs';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const addr = srv.address();
      const port = typeof addr === 'object' && addr ? addr.port : 0;
      srv.close((err) => (err ? reject(err) : resolve(port)));
    });
    srv.on('error', reject);
  });
}

async function waitForServer(url, timeout_ms = 12000) {
  const deadline = Date.now() + timeout_ms;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // Server still starting
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error(`Timed out waiting for vite preview at ${url}`);
}

function listSrcFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? listSrcFiles(full) : [full];
  });
}

export function buildCharacterizationBddSteps() {
  const steps = createStepRegistry();

  steps.Dado('el repositorio compilado para producción con Vite en la carpeta dist', (world) => {
    const vite_cli = path.join(ROOT_DIR, 'node_modules', 'vite', 'bin', 'vite.js');
    const dist_index = path.join(ROOT_DIR, 'dist', 'index.html');
    if (!existsSync(dist_index)) {
      const build_res = spawnSync(process.execPath, [vite_cli, 'build'], {
        cwd: ROOT_DIR,
        encoding: 'utf8',
      });
      assert.equal(build_res.status, 0, `${build_res.stdout}\n${build_res.stderr}`);
    }
    assert.equal(existsSync(dist_index), true);
    assert.equal(existsSync(path.join(ROOT_DIR, 'dist', '_headers')), true);
    world.distHtml = readFileSync(dist_index, 'utf8');
  });

  steps.Cuando(
    'se levanta el servidor vite preview sobre un puerto local efímero y se consultan los recursos críticos',
    async (world) => {
      const port = await getFreePort();
      const vite_cli = path.join(ROOT_DIR, 'node_modules', 'vite', 'bin', 'vite.js');
      const child = spawn(
        process.execPath,
        [vite_cli, 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
        { cwd: ROOT_DIR, stdio: 'ignore' },
      );
      world.previewChild = child;

      const base_url = `http://127.0.0.1:${port}`;
      await waitForServer(`${base_url}/`);

      const js_match = world.distHtml.match(/src="\.?(\/assets\/[^"]+\.js)"/);
      const css_match = world.distHtml.match(/href="\.?(\/assets\/[^"]+\.css)"/);
      assert.ok(js_match?.[1], 'Bundle JS no encontrado en dist/index.html');
      assert.ok(css_match?.[1], 'Bundle CSS no encontrado en dist/index.html');

      const critical_paths = [
        '/',
        js_match[1],
        css_match[1],
        '/assets/cloud-mentor-original.jpg',
        '/assets/cloud-mentor-azure.png',
        '/assets/cloud-mentor-gcp.png',
        '/senior-guides/aws/s01.md',
        '/senior-guides/azure/s07.md',
        '/senior-guides/gcp/s18.md',
      ];

      world.httpStatuses = [];
      for (const route of critical_paths) {
        const res = await fetch(`${base_url}${route}`);
        world.httpStatuses.push({ route, status: res.status });
      }
    },
  );

  steps.Entonces(
    'index.html, los bundles JS y CSS, las mascotas y los cuadernos Senior responden con HTTP 200',
    (world) => {
      assert.equal(world.httpStatuses.length, 9);
      for (const item of world.httpStatuses) {
        assert.equal(item.status, 200, `Ruta ${item.route} devolvió HTTP ${item.status}`);
      }
    },
  );

  steps.Dado('la versión declarada en package.json y el módulo propietario appMeta', (world) => {
    world.pkg = JSON.parse(readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
    world.appMetaSrc = readFileSync(path.join(ROOT_DIR, 'src/config/appMeta.ts'), 'utf8');
  });

  steps.Cuando(
    'se inspeccionan la vista de Ajustes, el exportador de progreso y el README principal',
    (world) => {
      world.appSrc = readConcatenatedSources(['src/App.tsx', 'src/features/settings']);
      world.stateSrc = readFileSync(path.join(ROOT_DIR, 'src/lib/state.ts'), 'utf8');
      world.readmeSrc = readFileSync(path.join(ROOT_DIR, 'README.md'), 'utf8');
    },
  );

  steps.Entonces(
    'todos consumen la versión canónica sin cadenas obsoletas 7.0.0 en el código fuente',
    (world) => {
      assert.match(world.pkg.version, /^\d+\.\d+\.\d+$/);
      assert.match(world.appMetaSrc, /pkg\.version/);
      assert.match(world.appSrc, /APP_VERSION/);
      assert.doesNotMatch(world.appSrc, /7\.0\.0/);
      assert.match(world.stateSrc, /appVersion:\s*APP_VERSION/);
      assert.match(world.readmeSrc, /fuente única de versión en `package\.json`/);
      assert.match(world.readmeSrc, /npm run test:bdd/);
    },
  );

  steps.Dado('los archivos de especificación Playwright de la academia y de caracterización F1', (world) => {
    const e2e_dir = path.join(ROOT_DIR, 'tests/e2e');
    world.specFiles = readdirSync(e2e_dir)
      .filter((name) => name.endsWith('.spec.ts'))
      .map((name) => ({ name, content: readFileSync(path.join(e2e_dir, name), 'utf8') }));
  });

  steps.Cuando('se auditan los escenarios E2E registrados y sus selectores', (world) => {
    world.combinedE2E = world.specFiles.map((f) => f.content).join('\n');
    world.testCount = [...world.combinedE2E.matchAll(/\btest\s*\(/g)].length;
  });

  steps.Entonces(
    'existen al menos 14 escenarios E2E que cubren las 8 vistas sin usar waitForTimeout',
    (world) => {
      assert.ok(world.testCount >= 14, `Se esperaban >= 14 tests E2E, encontrados: ${world.testCount}`);
      assert.doesNotMatch(world.combinedE2E, /waitForTimeout/);
      for (const routeFragment of [
        '/?cloud=aws',
        '#learn',
        '#lesson/networks',
        '#lab/networks',
        '#simulator',
        '#senior',
        '#progress',
        '#settings',
      ]) {
        assert.ok(
          world.combinedE2E.includes(routeFragment),
          `Falta cobertura de ruta ${routeFragment} en tests/e2e`,
        );
      }
    },
  );

  steps.Dado('todos los archivos de código fuente y estilos dentro del directorio src', (world) => {
    world.srcFiles = listSrcFiles(path.join(ROOT_DIR, 'src'));
    assert.ok(world.srcFiles.length >= 20);
  });

  steps.Cuando(
    'se verifica la longitud máxima de línea y se ejecuta biome format en modo estricto',
    (world) => {
      world.oversizedLines = [];
      for (const file of world.srcFiles) {
        const lines = readFileSync(file, 'utf8').split(/\r?\n/);
        for (let i = 0; i < lines.length; i += 1) {
          if (lines[i].length > 1200) {
            world.oversizedLines.push(`${path.relative(ROOT_DIR, file)}:${i + 1} (${lines[i].length} chars)`);
          }
        }
      }
      const biome_cli = path.join(ROOT_DIR, 'node_modules', '@biomejs', 'biome', 'bin', 'biome');
      world.biomeFormatCheck = spawnSync(process.execPath, [biome_cli, 'format', 'src'], {
        cwd: ROOT_DIR,
        encoding: 'utf8',
      });
    },
  );

  steps.Entonces(
    'ningún archivo en src permanece minificado en líneas gigantes y Biome aprueba al 100 por ciento',
    (world) => {
      assert.deepEqual(
        world.oversizedLines,
        [],
        `Archivos aún minificados en src:\n${world.oversizedLines.join('\n')}`,
      );
      assert.equal(
        world.biomeFormatCheck.status,
        0,
        `biome format falló:\n${world.biomeFormatCheck.stdout}\n${world.biomeFormatCheck.stderr}`,
      );
    },
  );

  return {
    steps,
    cleanupWorld: (world) => {
      if (world.previewChild && !world.previewChild.killed) {
        world.previewChild.kill();
      }
    },
  };
}
