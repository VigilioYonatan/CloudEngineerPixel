import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { parseInstructorReview, reviewKey } from '../../../src/lib/instructorReview.mjs';
import { parseSeniorCheckpoint, createSeniorCheckpoint } from '../../../src/lib/seniorCheckpoint.mjs';
import { parseSeniorSession, seniorSessionKey } from '../../../src/lib/seniorSession.mjs';
import { importTsModule } from '../../support/loadTsModule.mjs';
import { ROOT_DIR, listSourceFiles } from '../../support/readSourceTree.mjs';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

const REQUIRED_FEATURES = [
  'home',
  'curriculum',
  'lessons',
  'labs',
  'simulators',
  'senior',
  'progress',
  'settings',
];

function findEmptyDirectories(abs_dir, rel_prefix = '') {
  const entries = readdirSync(abs_dir, { withFileTypes: true });
  if (entries.length === 0) return [rel_prefix || '.'];
  return entries.flatMap((entry) => {
    if (!entry.isDirectory()) return [];
    const child_rel = rel_prefix ? `${rel_prefix}/${entry.name}` : entry.name;
    return findEmptyDirectories(path.join(abs_dir, entry.name), child_rel);
  });
}

function resolveImportPath(from_rel, spec) {
  const from_dir = path.posix.dirname(from_rel);
  const base = path.posix.normalize(path.posix.join(from_dir, spec));
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`, `${base}.mts`, `${base}.mjs`, `${base}.js`]) {
    if (existsSync(path.join(ROOT_DIR, candidate))) return candidate;
  }
  return null;
}

function extractRelativeImports(source) {
  return [...source.matchAll(/(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?['"](\.[^'"]+)['"]/g)].map(
    (m) => m[1],
  );
}

function detectCycles(graph) {
  const state = new Map();
  const cycles = [];

  function dfs(node, stack) {
    state.set(node, 'visiting');
    for (const next of graph.get(node) || []) {
      if (!graph.has(next)) continue;
      if (state.get(next) === 'visiting') {
        const idx = stack.indexOf(next);
        cycles.push([...stack.slice(idx), next].join(' -> '));
      } else if (!state.has(next)) {
        dfs(next, [...stack, next]);
      }
    }
    state.set(node, 'visited');
  }

  for (const node of graph.keys()) {
    if (!state.has(node)) dfs(node, [node]);
  }
  return cycles;
}

export function buildModularArchitectureBddSteps() {
  const steps = createStepRegistry();

  steps.Dado('el punto de composición principal en src/App.tsx y los archivos fuente en src', (world) => {
    world.appSrc = readFileSync(path.join(ROOT_DIR, 'src/App.tsx'), 'utf8');
    world.allSrcFiles = listSourceFiles('src');
  });

  steps.Cuando('se inspecciona la existencia de código legado V1/V2 en todo el árbol productivo', (world) => {
    world.deadSeniorHits = [];
    for (const rel of world.allSrcFiles) {
      const content = readFileSync(path.join(ROOT_DIR, rel), 'utf8');
      if (/\bfunction\s+Senior\s*\(/.test(content) || /\bseniorService\b/.test(content)) {
        world.deadSeniorHits.push(rel);
      }
    }
  });

  steps.Entonces(
    'no existe function Senior ni seniorService en src y la vista senior enruta hacia SeniorWorkbench',
    (world) => {
      assert.deepEqual(world.deadSeniorHits, [], `Código muerto detectado en: ${world.deadSeniorHits.join(', ')}`);
      assert.match(world.appSrc, /SeniorWorkbench/);
      assert.ok(
        existsSync(path.join(ROOT_DIR, 'docs/ADR_F1_MODULAR_ARCHITECTURE.md')),
        'Falta nota de trazabilidad arquitectónica docs/ADR_F1_MODULAR_ARCHITECTURE.md',
      );
    },
  );

  steps.Dado('los módulos extraídos dentro del directorio src/app', (world) => {
    world.expectedAppFiles = [
      'src/app/AppShell.tsx',
      'src/app/AppHeader.tsx',
      'src/app/AppFooter.tsx',
      'src/app/CloudProviderSwitcher.tsx',
      'src/app/router.ts',
    ];
    world.presentAppFiles = world.expectedAppFiles.filter((rel) => existsSync(path.join(ROOT_DIR, rel)));
  });

  steps.Cuando('se auditan sus archivos e importaciones salientes', (world) => {
    world.appLayerViolations = [];
    for (const rel of world.presentAppFiles) {
      const content = readFileSync(path.join(ROOT_DIR, rel), 'utf8');
      for (const spec of extractRelativeImports(content)) {
        const resolved = resolveImportPath(rel, spec);
        if (resolved?.startsWith('src/features/')) {
          world.appLayerViolations.push(`${rel} importa feature ${resolved}`);
        }
      }
      if (/\b(?:studyUnits|calculateCidrSubnet|evaluateSeniorEvidence|questions)\b/.test(content)) {
        world.appLayerViolations.push(`${rel} contiene lógica de negocio de lecciones/simuladores/senior`);
      }
    }
  });

  steps.Entonces(
    'existen AppShell, AppHeader, AppFooter, CloudProviderSwitcher y router sin importar nada de src/features',
    (world) => {
      assert.deepEqual(world.presentAppFiles, world.expectedAppFiles);
      assert.deepEqual(world.appLayerViolations, []);
    },
  );

  steps.Dado('los directorios de features dentro de src/features', (world) => {
    const features_root = path.join(ROOT_DIR, 'src/features');
    world.featuresRootExists = existsSync(features_root);
    world.featureDirs = world.featuresRootExists
      ? readdirSync(features_root, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name)
      : [];
  });

  steps.Cuando('se construye el grafo de dependencias local y se miden las líneas de cada módulo', (world) => {
    world.emptyDirs = existsSync(path.join(ROOT_DIR, 'src'))
      ? findEmptyDirectories(path.join(ROOT_DIR, 'src'), 'src')
      : ['src'];

    const modular_files = [
      'src/App.tsx',
      'src/SeniorWorkbench.tsx',
      'src/InstructorReview.tsx',
      ...listSourceFiles('src/app'),
      ...listSourceFiles('src/domain'),
      ...listSourceFiles('src/shared'),
      ...listSourceFiles('src/features'),
    ];

    world.oversizedFiles = [];
    world.crossFeatureViolations = [];
    const graph = new Map();

    for (const rel of listSourceFiles('src')) {
      const content = readFileSync(path.join(ROOT_DIR, rel), 'utf8');
      const deps = [];
      for (const spec of extractRelativeImports(content)) {
        const target = resolveImportPath(rel, spec);
        if (target) deps.push(target);

        const from_feature = rel.match(/^src\/features\/([^/]+)\//)?.[1];
        const to_feature = target?.match(/^src\/features\/([^/]+)\//)?.[1];
        if (from_feature && to_feature && from_feature !== to_feature) {
          world.crossFeatureViolations.push(`${rel} -> ${target}`);
        }
        if (rel.startsWith('src/domain/') && target && !target.startsWith('src/domain/') && !target.startsWith('src/data/')) {
          world.crossFeatureViolations.push(`Violación de dominio puro: ${rel} -> ${target}`);
        }
        if (rel.startsWith('src/shared/') && target?.startsWith('src/features/')) {
          world.crossFeatureViolations.push(`Violación shared -> features: ${rel} -> ${target}`);
        }
      }
      graph.set(rel, deps);
    }

    for (const rel of modular_files) {
      if (!existsSync(path.join(ROOT_DIR, rel))) continue;
      const line_count = readFileSync(path.join(ROOT_DIR, rel), 'utf8').split(/\r?\n/).length;
      if (line_count >= 250) {
        world.oversizedFiles.push(`${rel} (${line_count} líneas)`);
      }
    }

    world.cycles = detectCycles(graph);
  });

  steps.Entonces(
    'existen las 8 features requeridas sin carpetas vacías ni imports cruzados ni ciclos y cada archivo tiene menos de 250 líneas',
    (world) => {
      assert.equal(world.featuresRootExists, true, 'No existe src/features');
      for (const req of REQUIRED_FEATURES) {
        assert.ok(world.featureDirs.includes(req), `Falta feature src/features/${req}`);
      }
      assert.deepEqual(world.emptyDirs, [], `Carpetas vacías detectadas: ${world.emptyDirs.join(', ')}`);
      assert.deepEqual(world.crossFeatureViolations, [], `Violaciones de capas: ${world.crossFeatureViolations.join(', ')}`);
      assert.deepEqual(world.cycles, [], `Ciclos detectados: ${world.cycles.join('; ')}`);
      assert.deepEqual(world.oversizedFiles, [], `Archivos >= 250 líneas: ${world.oversizedFiles.join(', ')}`);
    },
  );

  steps.Dado('el registro de dominio src/domain/providers.ts y los componentes visuales de la aplicación', async (world) => {
    world.providersFileExists = existsSync(path.join(ROOT_DIR, 'src/domain/providers.ts'));
    if (world.providersFileExists) {
      world.providersMod = await importTsModule('src/domain/providers.ts');
    }
    world.uiFiles = [
      'src/App.tsx',
      ...listSourceFiles('src/app'),
      ...listSourceFiles('src/shared'),
      ...listSourceFiles('src/features'),
    ];
  });

  steps.Cuando('se consultan los metadatos de AWS, Azure y GCP y se buscan ternarios dispersos de insignia', (world) => {
    world.scatteredBadgeTernaries = [];
    const ternary_re = /===\s*['"]aws['"]\s*\?\s*['"]aws['"]\s*:\s*[^?]+===\s*['"]azure['"]\s*\?\s*['"]A['"]\s*:\s*['"]G['"]/;
    for (const rel of world.uiFiles) {
      if (!existsSync(path.join(ROOT_DIR, rel))) continue;
      const content = readFileSync(path.join(ROOT_DIR, rel), 'utf8');
      if (ternary_re.test(content)) {
        world.scatteredBadgeTernaries.push(rel);
      }
    }
  });

  steps.Entonces(
    'ProviderRegistry expone colores, mascotas, CLI, reservas CIDR y enlaces oficiales sin ternarios repetidos en la UI',
    (world) => {
      assert.equal(world.providersFileExists, true, 'Falta src/domain/providers.ts');
      const registry = world.providersMod.PROVIDER_REGISTRY;
      assert.ok(registry, 'Falta export PROVIDER_REGISTRY');
      for (const id of ['aws', 'azure', 'gcp']) {
        const meta = registry[id];
        assert.ok(meta, `Falta proveedor ${id}`);
        assert.equal(meta.id, id);
        assert.ok(meta.badgeMark.length >= 1);
        assert.ok(meta.themes.darkAccent.startsWith('#'));
        assert.ok(meta.themes.lightAccentText.startsWith('#'));
        assert.ok(meta.mascot.default.startsWith('/assets/'));
        assert.ok(meta.mascot.senior.startsWith('/assets/'));
        assert.ok(meta.cidrReservation.reservedCount >= 4);
        assert.ok(meta.docsUrl.startsWith('https://'));
      }
      assert.deepEqual(
        world.scatteredBadgeTernaries,
        [],
        `Ternarios de insignia aún dispersos en: ${world.scatteredBadgeTernaries.join(', ')}`,
      );
    },
  );

  steps.Dado('los componentes modulares dentro de src/features/senior y los contratos de sesión', (world) => {
    world.requiredSeniorFiles = [
      'src/features/senior/components/SeniorCatalog.tsx',
      'src/features/senior/components/InvestigationStage.tsx',
      'src/features/senior/components/DiagnosisStage.tsx',
      'src/features/senior/components/DecisionStage.tsx',
      'src/features/senior/components/ReportStage.tsx',
      'src/features/senior/components/SeniorSidebar.tsx',
      'src/features/senior/components/InstructorReview.tsx',
    ];
    world.presentSeniorFiles = world.requiredSeniorFiles.filter((rel) =>
      existsSync(path.join(ROOT_DIR, rel)),
    );
  });

  steps.Cuando(
    'se verifican los 7 componentes requeridos y se hidrata una sesión guardada en formato V7 a V9',
    (world) => {
      const sample_v7_session = JSON.stringify({
        version: 1,
        stage: 'informe',
        choice: 1,
        decisionLocked: true,
        diagnosisChoice: 0,
        diagnosisLocked: true,
        inspected: ['primary', 'secondary'],
        cited: ['primary', 'secondary'],
        acknowledged: true,
        answers: {
          cause: 'Causa raíz documentada en sesión previa V7 con suficiente detalle.',
          mitigation: 'Contención verificada con mínimo privilegio y reversibilidad.',
          rollback: 'Reversión con disparadores explícitos de latencia y error budget.',
          validation: 'Validación sobre métricas sintéticas y postmortem registrado.',
        },
      });
      world.sessionKey = seniorSessionKey('aws', 's01');
      world.reviewStorageKey = reviewKey('aws', 's01');
      world.restoredSession = parseSeniorSession(sample_v7_session);
      const checkpoint = createSeniorCheckpoint(
        'aws',
        's01',
        world.restoredSession,
        '2026-11-16T12:00:00.000Z',
      );
      world.restoredCheckpoint = parseSeniorCheckpoint(JSON.stringify(checkpoint), 'aws', 's01');
      world.restoredReview = parseInstructorReview(
        JSON.stringify({
          version: 1,
          provider: 'aws',
          caseId: 's01',
          reviewer: 'Staff Reviewer',
          notes: 'Justificación formativa completa preservada desde V8 sin pérdidas.',
          scores: { evidence: 4, security: 4, recovery: 4, validation: 4, communication: 4 },
        }),
        'aws',
        's01',
      );
    },
  );

  steps.Entonces(
    'existen todos los módulos de etapa Senior y las claves senior-session y senior-review conservan el estado íntegro',
    (world) => {
      assert.deepEqual(world.presentSeniorFiles, world.requiredSeniorFiles);
      assert.equal(world.sessionKey, 'senior-session:aws:s01');
      assert.equal(world.reviewStorageKey, 'senior-review:aws:s01');
      assert.equal(world.restoredSession.stage, 'informe');
      assert.equal(world.restoredSession.acknowledged, true);
      assert.deepEqual(world.restoredCheckpoint.cited, ['primary', 'secondary']);
      assert.equal(world.restoredReview.reviewer, 'Staff Reviewer');
    },
  );

  return { steps };
}
