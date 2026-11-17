import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { importTsModule } from '../../support/loadTsModule.mjs';
import { ROOT_DIR, readConcatenatedSources } from '../../support/readSourceTree.mjs';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

export function buildRoutingMapLabsBddSteps() {
  const steps = createStepRegistry();

  steps.Dado('el build productivo de Vite en dist/assets y el componente RouteLoadingState', (world) => {
    const vite_cli = path.join(ROOT_DIR, 'node_modules', 'vite', 'bin', 'vite.js');
    const build_res = spawnSync(process.execPath, [vite_cli, 'build'], {
      cwd: ROOT_DIR,
      encoding: 'utf8',
    });
    assert.equal(build_res.status, 0, `${build_res.stdout}\n${build_res.stderr}`);
    world.distHtml = readFileSync(path.join(ROOT_DIR, 'dist/index.html'), 'utf8');
    world.loadingPath = path.join(ROOT_DIR, 'src/shared/ui/RouteLoadingState.tsx');
  });

  steps.Cuando(
    'se inspeccionan los chunks JS emitidos y se mide el peso gzip del entrypoint inicial',
    (world) => {
      const assets_dir = path.join(ROOT_DIR, 'dist/assets');
      world.jsChunks = readdirSync(assets_dir).filter((name) => name.endsWith('.js'));
      const entry_match = world.distHtml.match(/src="\.?\/assets\/([^"]+\.js)"/);
      assert.ok(entry_match?.[1], 'No se halló script de entrada en dist/index.html');
      const entry_bytes = readFileSync(path.join(assets_dir, entry_match[1]));
      world.entryGzipBytes = gzipSync(entry_bytes).length;
      world.loadingSrc = existsSync(world.loadingPath) ? readFileSync(world.loadingPath, 'utf8') : '';
    },
  );

  steps.Entonces(
    'existen múltiples chunks separados por ruta, el entrypoint pesa menos de 60 KB gzipped y el estado loading expone aria-busy',
    (world) => {
      assert.ok(
        world.jsChunks.length >= 5,
        `Se esperaban >= 5 chunks JS por code-splitting, encontrados: ${world.jsChunks.length}`,
      );
      assert.ok(
        world.entryGzipBytes < 60 * 1024,
        `Entrypoint gzip (${world.entryGzipBytes} bytes) supera el límite de 60 KB (${60 * 1024} bytes)`,
      );
      assert.match(world.loadingSrc, /aria-busy="true"/);
      assert.match(world.loadingSrc, /aria-live="polite"/);
    },
  );

  steps.Dado(
    'el motor de migración en importValidation.mjs y la gestión de almacenamiento en state.ts',
    async (world) => {
      world.validationMod = await import('../../../src/lib/importValidation.mjs');
      world.stateAndShellSrc = readConcatenatedSources(['src/lib/state.ts', 'src/app/AppShell.tsx']);
    },
  );

  steps.Cuando(
    'se migran instantáneas heredadas V1 y V9 y se simula una cadena corrupta en localStorage',
    (world) => {
      assert.equal(
        typeof world.validationMod.migrateProgressSnapshot,
        'function',
        'Falta migrateProgressSnapshot en importValidation.mjs',
      );
      assert.equal(
        typeof world.validationMod.inspectStoredProgressRaw,
        'function',
        'Falta inspectStoredProgressRaw en importValidation.mjs',
      );

      world.migratedV1 = world.validationMod.migrateProgressSnapshot(
        {
          version: 1,
          progress: {
            completed: ['aws:networks:0'],
            senior: ['aws:s01'],
            quiz: { 'aws:networks': 100 },
            notes: { 'aws:networks:lab': 'Evidencia VPC intacta' },
            simRuns: 4,
          },
        },
        '2026-11-16T20:00:00.000Z',
      );
      world.corruptedInspection = world.validationMod.inspectStoredProgressRaw(
        '{"completed": [corrupted-json',
        '2026-11-16T20:00:00.000Z',
      );
    },
  );

  steps.Entonces(
    'los respaldos heredados migran a schemaVersion 2 con timestamp ISO UTC y el estado corrupto ofrece descarga cruda sin usar localStorage.clear',
    (world) => {
      assert.equal(world.migratedV1.schemaVersion, 2);
      assert.equal(world.migratedV1.migratedFromVersion, 1);
      assert.equal(world.migratedV1.updatedAt, '2026-11-16T20:00:00.000Z');
      assert.equal(world.migratedV1.notes['aws:networks:lab'], 'Evidencia VPC intacta');

      assert.equal(world.corruptedInspection.status, 'corrupted');
      assert.equal(world.corruptedInspection.raw, '{"completed": [corrupted-json');
      assert.doesNotMatch(world.stateAndShellSrc, /localStorage\.clear\s*\(/);
      assert.match(world.stateAndShellSrc, /downloadCorruptedBackup/);
    },
  );

  steps.Dado('el router de hashes en src/app/router.ts', async (world) => {
    world.router = await importTsModule('src/app/router.ts');
  });

  steps.Cuando('se parsean rutas profundas canónicas y hashes cortos heredados de V9', (world) => {
    world.parsedRoutes = {
      homeCanonical: world.router.parseHashRoute('#/'),
      mapCanonical: world.router.parseHashRoute('#/mapa'),
      learnCanonical: world.router.parseHashRoute('#/aprender'),
      lessonDeep: world.router.parseHashRoute('#/aula/networks/2'),
      labsCatalog: world.router.parseHashRoute('#/labs'),
      labSpecific: world.router.parseHashRoute('#/labs/containers'),
      simDeep: world.router.parseHashRoute('#/simuladores/slo'),
      seniorCatalog: world.router.parseHashRoute('#/senior'),
      seniorDeep: world.router.parseHashRoute('#/senior/s07'),
      projects: world.router.parseHashRoute('#/proyectos'),
      progress: world.router.parseHashRoute('#/progreso'),
      settings: world.router.parseHashRoute('#/ajustes'),
      about: world.router.parseHashRoute('#/acerca'),
      legacyLearn: world.router.parseHashRoute('#learn'),
      legacyLesson: world.router.parseHashRoute('#lesson/compute'),
      legacyLab: world.router.parseHashRoute('#lab/storage'),
    };
  });

  steps.Entonces(
    'todas las rutas resuelven vista, módulo, unidad, simulador o caso Senior exactos preservando el formato canónico',
    (world) => {
      const r = world.parsedRoutes;
      assert.equal(r.homeCanonical?.view, 'home');
      assert.equal(r.mapCanonical?.view, 'map');
      assert.equal(r.learnCanonical?.view, 'learn');
      assert.equal(r.lessonDeep?.view, 'lesson');
      assert.equal(r.lessonDeep?.resourceId, 'networks');
      assert.equal(r.lessonDeep?.unitIndex, 2);
      assert.equal(r.labsCatalog?.view, 'labs');
      assert.equal(r.labSpecific?.view, 'lab');
      assert.equal(r.labSpecific?.resourceId, 'containers');
      assert.equal(r.simDeep?.view, 'simulator');
      assert.equal(r.simDeep?.simId, 'slo');
      assert.equal(r.seniorCatalog?.view, 'senior');
      assert.equal(r.seniorCatalog?.caseId, undefined);
      assert.equal(r.seniorDeep?.view, 'senior');
      assert.equal(r.seniorDeep?.caseId, 's07');
      assert.equal(r.projects?.view, 'projects');
      assert.equal(r.progress?.view, 'progress');
      assert.equal(r.settings?.view, 'settings');
      assert.equal(r.about?.view, 'about');
      assert.equal(r.legacyLearn?.view, 'learn');
      assert.equal(r.legacyLesson?.view, 'lesson');
      assert.equal(r.legacyLesson?.resourceId, 'compute');
      assert.equal(r.legacyLab?.view, 'lab');
      assert.equal(r.legacyLab?.resourceId, 'storage');
    },
  );

  steps.Dado('el modelo del Mapa Curricular y la página CurriculumMapPage', async (world) => {
    world.mapExists = existsSync(
      path.join(ROOT_DIR, 'src/features/curriculum/pages/CurriculumMapPage.tsx'),
    );
    assert.equal(world.mapExists, true, 'Falta src/features/curriculum/pages/CurriculumMapPage.tsx');
    world.mapModelMod = await importTsModule('src/features/curriculum/libs/buildCurriculumMapModel.ts');
  });

  steps.Cuando(
    'se construye el recorrido para el proveedor activo con el progreso del alumno',
    (world) => {
      world.mapData = world.mapModelMod.buildCurriculumMapModel(
        'aws',
        ['aws:cloud-fundamentals:0', 'aws:networks:2', 'aws:networks:lab'],
        ['aws:s01'],
      );
    },
  );

  steps.Entonces(
    'expone los 3 niveles de 60h, 80h y 100h más 18 incidentes Senior con prerrequisitos, 4 modalidades y 90 enlaces directos a unidades',
    (world) => {
      assert.deepEqual(
        world.mapData.levels.map((l) => l.totalHours),
        [60, 80, 100],
      );
      const all_modules = world.mapData.levels.flatMap((l) => l.modules);
      assert.equal(all_modules.length, 18);
      const all_units = all_modules.flatMap((m) => m.units);
      assert.equal(all_units.length, 90);
      assert.ok(all_modules.every((m) => Array.isArray(m.prerequisites) && m.modalities.length >= 2));
      const all_modalities = new Set(all_modules.flatMap((m) => m.modalities));
      for (const mod_kind of ['Concepto', 'Simulador', 'Local', 'Cloud Real']) {
        assert.equal(all_modalities.has(mod_kind), true, `Falta modalidad ${mod_kind}`);
      }
      assert.equal(world.mapData.seniorCases.length, 18);
    },
  );

  steps.Dado('el catálogo global de laboratorios y su motor de filtrado', async (world) => {
    assert.equal(
      existsSync(path.join(ROOT_DIR, 'src/features/labs/pages/LabsCatalogPage.tsx')),
      true,
      'Falta src/features/labs/pages/LabsCatalogPage.tsx',
    );
    world.labsCatalogMod = await importTsModule('src/features/labs/libs/filterLabsCatalog.ts');
  });

  steps.Cuando(
    'se combinan filtros por proveedor, nivel, modalidad, costo y texto o se fuerza una búsqueda sin coincidencias',
    (world) => {
      const { buildGlobalLabsCatalog, filterLabsCatalog } = world.labsCatalogMod;
      world.allLabs = buildGlobalLabsCatalog(['aws:networks:lab']);
      world.awsFreeTierLabs = filterLabsCatalog(world.allLabs, {
        provider: 'aws',
        level: 'fundamentos',
        modality: 'todos',
        costTier: 'free-tier-elegible',
        search: '',
      });
      world.emptyLabs = filterLabsCatalog(world.allLabs, {
        provider: 'gcp',
        level: 'avanzado',
        modality: 'simulado',
        costTier: 'gratis-local',
        search: 'termino-imposible-999',
      });
    },
  );

  steps.Entonces(
    'el catálogo reúne exactamente 60 prácticas reales y permite filtrar y recuperar el estado vacío sin perder contexto',
    (world) => {
      assert.equal(world.allLabs.length, 60);
      assert.equal(world.allLabs.filter((item) => item.category === 'module-lab').length, 54);
      assert.equal(world.allLabs.filter((item) => item.category === 'devsecops-oidc').length, 3);
      assert.equal(world.allLabs.filter((item) => item.category === 'portfolio-project').length, 3);
      assert.ok(world.awsFreeTierLabs.length >= 1);
      assert.ok(
        world.awsFreeTierLabs.every(
          (item) =>
            (item.provider === 'aws' || item.provider === 'multicloud') &&
            item.level === 'fundamentos' &&
            item.costTier === 'free-tier-elegible',
        ),
      );
      assert.equal(world.emptyLabs.length, 0);
    },
  );

  return { steps };
}
