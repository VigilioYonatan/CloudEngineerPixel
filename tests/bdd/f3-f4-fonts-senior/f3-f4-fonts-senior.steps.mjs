import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { evaluateSeniorEvidence } from '../../../src/lib/seniorEvaluation.mjs';
import { normalizeSeniorSession, emptySeniorSession } from '../../../src/lib/seniorSession.mjs';
import { importTsModule } from '../../support/loadTsModule.mjs';
import { ROOT_DIR } from '../../support/readSourceTree.mjs';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

const ALL_CASES = Array.from({ length: 18 }, (_, i) => `s${String(i + 1).padStart(2, '0')}`);
const CODE_REVIEW_CASES = ['s01', 's02', 's03', 's07', 's09', 's12', 's15'];

export function buildF3F4FontsSeniorBddSteps() {
  const steps = createStepRegistry();

  steps.Dado(
    'los archivos binarios WOFF2 en public/fonts, index.html, public/_headers y src/design-system/fonts.css',
    (world) => {
      world.expectedFonts = [
        'dm-sans-latin.woff2',
        'dm-sans-latin-ext.woff2',
        'space-grotesk-latin.woff2',
        'space-grotesk-latin-ext.woff2',
        'jetbrains-mono-latin.woff2',
        'jetbrains-mono-latin-ext.woff2',
      ];
      world.fontsCssPath = path.join(ROOT_DIR, 'src/design-system/fonts.css');
      world.fontsCssExists = existsSync(world.fontsCssPath);
      world.indexHtml = readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
      world.headersFile = readFileSync(path.join(ROOT_DIR, 'public/_headers'), 'utf8');
      world.mainTsx = readFileSync(path.join(ROOT_DIR, 'src/main.tsx'), 'utf8');
    },
  );

  steps.Cuando(
    'se verifican las cabeceras binarias wOF2, las declaraciones font-face y la política Content-Security-Policy',
    (world) => {
      assert.equal(world.fontsCssExists, true, 'Falta src/design-system/fonts.css');
      world.fontsCss = readFileSync(world.fontsCssPath, 'utf8');
      world.fontChecks = world.expectedFonts.map((fileName) => {
        const full = path.join(ROOT_DIR, 'public/fonts', fileName);
        if (!existsSync(full)) return { fileName, valid: false };
        const buf = readFileSync(full);
        return {
          fileName,
          valid: buf.length > 5000 && buf.subarray(0, 4).toString('ascii') === 'wOF2',
        };
      });
    },
  );

  steps.Entonces(
    'existen los 6 archivos WOFF2 válidos con font-display swap y cero referencias a fonts.googleapis.com o fonts.gstatic.com en index.html y _headers',
    (world) => {
      for (const check of world.fontChecks) {
        assert.equal(check.valid, true, `Archivo WOFF2 inválido o faltante: ${check.fileName}`);
      }
      assert.match(world.mainTsx, /design-system\/fonts\.css/);
      assert.match(world.fontsCss, /font-display:\s*swap/);
      for (const fam of ['DM Sans', 'Space Grotesk', 'JetBrains Mono']) {
        assert.match(world.fontsCss, new RegExp(fam));
      }
      assert.doesNotMatch(world.indexHtml, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
      assert.doesNotMatch(world.headersFile, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
      assert.match(world.headersFile, /font-src 'self'/);
    },
  );

  steps.Dado(
    'el catálogo de investigación Senior en src/data/seniorInvestigations.ts y src/data/seniorProviderExhibits.ts',
    async (world) => {
      world.providerExhibitsExists = existsSync(
        path.join(ROOT_DIR, 'src/data/seniorProviderExhibits.ts'),
      );
      if (world.providerExhibitsExists) {
        world.invMod = await importTsModule('src/data/seniorInvestigations.ts');
      }
    },
  );

  steps.Cuando(
    'se consulta investigationFor para los 18 casos s01 a s18 en AWS, Azure y GCP',
    (world) => {
      assert.equal(world.providerExhibitsExists, true, 'Falta src/data/seniorProviderExhibits.ts');
      world.dossiers = {};
      for (const caseId of ALL_CASES) {
        world.dossiers[caseId] = {
          aws: world.invMod.investigationFor(caseId, 'aws'),
          azure: world.invMod.investigationFor(caseId, 'azure'),
          gcp: world.invMod.investigationFor(caseId, 'gcp'),
        };
      }
    },
  );

  steps.Entonces(
    'las 54 combinaciones entregan evidenceId, timestamp ISO, fuente de auditoría nativa, artefactos diferenciados por proveedor y comando específico del caso',
    (world) => {
      assert.equal(Object.keys(world.dossiers).length, 18);
      const awsCommands = new Set();
      for (const caseId of ALL_CASES) {
        const { aws, azure, gcp } = world.dossiers[caseId];
        assert.notEqual(
          aws.exhibits[0].body,
          azure.exhibits[0].body,
          `El artefacto primario de ${caseId} debe cambiar entre AWS y Azure`,
        );
        assert.notEqual(
          azure.exhibits[0].body,
          gcp.exhibits[0].body,
          `El artefacto primario de ${caseId} debe cambiar entre Azure y GCP`,
        );
        awsCommands.add(aws.command.aws);
        for (const [cloud, dossier] of [
          ['aws', aws],
          ['azure', azure],
          ['gcp', gcp],
        ]) {
          const primary = dossier.exhibits[0];
          assert.ok(primary.evidenceId?.includes(cloud.toUpperCase()), `Falta evidenceId en ${caseId}:${cloud}`);
          assert.match(primary.timestamp || '', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
          assert.ok((primary.source || '').length >= 8, `Falta source nativo en ${caseId}:${cloud}`);
        }
      }
      assert.ok(
        awsCommands.size >= 10,
        'Los comandos de diagnóstico deben ser específicos del caso, no un único sts get-caller-identity repetido',
      );
    },
  );

  steps.Dado(
    'el motor de evaluación en src/lib/seniorEvaluation.mjs y las evidencias de los 18 casos Senior',
    async (world) => {
      world.invMod = await importTsModule('src/data/seniorInvestigations.ts');
    },
  );

  steps.Cuando(
    'el alumno inspecciona las señales causales junto con el distractor y cita por error la contraprueba benigna',
    (world) => {
      world.distractorChecks = ALL_CASES.map((caseId) => {
        const dossier = world.invMod.investigationFor(caseId, 'aws');
        const distractor = dossier.exhibits.find((e) => e.id === 'distractor');
        return {
          caseId,
          hasDistractor: Boolean(distractor && distractor.isDistractor === true),
          analysisLength: distractor?.analysis?.length || 0,
        };
      });

      const normalized = normalizeSeniorSession({
        ...emptySeniorSession(),
        inspected: ['primary', 'secondary', 'distractor'],
        cited: ['primary', 'secondary', 'distractor'],
      });
      world.sessionPreservesDistractor = normalized.cited.includes('distractor');

      const validText =
        'Evidencia causal contrastada con plan de reversión seguro y métricas verificadas.';
      world.evalWithDistractor = evaluateSeniorEvidence({
        decisionLocked: true,
        decisionCorrect: true,
        requiredExhibits: ['primary', 'secondary'],
        inspected: ['primary', 'secondary', 'distractor'],
        cited: ['primary', 'secondary', 'distractor'],
        report: {
          cause: validText,
          mitigation: validText,
          rollback: validText,
          validation: validText,
        },
        acknowledged: true,
      });

      world.evalClean = evaluateSeniorEvidence({
        decisionLocked: true,
        decisionCorrect: true,
        requiredExhibits: ['primary', 'secondary'],
        inspected: ['primary', 'secondary', 'distractor'],
        cited: ['primary', 'secondary'],
        report: {
          cause: validText,
          mitigation: validText,
          rollback: validText,
          validation: validText,
        },
        acknowledged: true,
      });
    },
  );

  steps.Entonces(
    'cada caso incluye un artefacto distractor con explicación formativa y evaluateSeniorEvidence rechaza citationsReady mientras el distractor siga citado',
    (world) => {
      for (const item of world.distractorChecks) {
        assert.equal(item.hasDistractor, true, `Falta distractor en ${item.caseId}`);
        assert.ok(item.analysisLength >= 30, `Explicación de distractor corta en ${item.caseId}`);
      }
      assert.equal(world.sessionPreservesDistractor, true);
      assert.equal(world.evalWithDistractor.distractorCited, true);
      assert.equal(world.evalWithDistractor.citationsReady, false);
      assert.equal(world.evalWithDistractor.ready, false);
      assert.equal(world.evalClean.distractorCited, false);
      assert.equal(world.evalClean.citationsReady, true);
      assert.equal(world.evalClean.ready, true);
      assert.equal(world.evalClean.score, 100);
    },
  );

  steps.Dado(
    'el catálogo cronológico en src/data/seniorTimelines.ts y el componente src/features/senior/components/IncidentTimeline.tsx',
    async (world) => {
      world.timelineDataExists = existsSync(path.join(ROOT_DIR, 'src/data/seniorTimelines.ts'));
      world.timelineUiExists = existsSync(
        path.join(ROOT_DIR, 'src/features/senior/components/IncidentTimeline.tsx'),
      );
      if (world.timelineDataExists) {
        world.timelineMod = await importTsModule('src/data/seniorTimelines.ts');
      }
    },
  );

  steps.Cuando(
    'se consulta la línea de tiempo de cada caso s01 a s18 para AWS, Azure y GCP',
    (world) => {
      assert.equal(world.timelineDataExists, true, 'Falta src/data/seniorTimelines.ts');
      assert.equal(
        world.timelineUiExists,
        true,
        'Falta src/features/senior/components/IncidentTimeline.tsx',
      );
      world.timelines = [];
      for (const caseId of ALL_CASES) {
        for (const cloud of ['aws', 'azure', 'gcp']) {
          world.timelines.push(world.timelineMod.getIncidentTimeline(caseId, cloud));
        }
      }
    },
  );

  steps.Entonces(
    'cada expediente presenta al menos 4 hitos cronológicos ordenados vinculando cambios, alertas, síntomas y escalado',
    (world) => {
      assert.equal(world.timelines.length, 54);
      for (const timeline of world.timelines) {
        assert.ok(timeline.events.length >= 4);
        assert.match(timeline.events[0].offset, /^T-\d+m$/);
        assert.ok(timeline.events.some((ev) => ev.offset === 'T+00m' || ev.offset === 'T-00m'));
        assert.ok(timeline.events.some((ev) => ev.offset.startsWith('T+')));
      }
    },
  );

  steps.Dado(
    'el catálogo de código auditable en src/data/seniorCodeReviews.ts y el componente src/features/senior/components/CodeReviewLab.tsx',
    async (world) => {
      world.codeDataExists = existsSync(path.join(ROOT_DIR, 'src/data/seniorCodeReviews.ts'));
      world.codeUiExists = existsSync(
        path.join(ROOT_DIR, 'src/features/senior/components/CodeReviewLab.tsx'),
      );
      if (world.codeDataExists) {
        world.codeMod = await importTsModule('src/data/seniorCodeReviews.ts');
      }
    },
  );

  steps.Cuando(
    'se evalúan los casos S01, S02, S03, S07, S09, S12 y S15 en los tres proveedores cloud',
    (world) => {
      assert.equal(world.codeDataExists, true, 'Falta src/data/seniorCodeReviews.ts');
      assert.equal(
        world.codeUiExists,
        true,
        'Falta src/features/senior/components/CodeReviewLab.tsx',
      );
      world.reviews = [];
      for (const caseId of CODE_REVIEW_CASES) {
        for (const cloud of ['aws', 'azure', 'gcp']) {
          world.reviews.push({
            caseId,
            cloud,
            exercise: world.codeMod.getCodeReviewExercise(caseId, cloud),
          });
        }
      }
    },
  );

  steps.Entonces(
    'cada ejercicio expone líneas numeradas, identifica con precisión las líneas defectuosas con explicación técnica y provee el código remediado seguro',
    (world) => {
      assert.equal(world.reviews.length, 21);
      for (const { caseId, cloud, exercise } of world.reviews) {
        assert.ok(exercise, `Falta CodeReviewExercise para ${caseId}:${cloud}`);
        assert.ok(exercise.lines.length >= 5, `Pocas líneas en ${caseId}:${cloud}`);
        assert.ok(exercise.defectLineNumbers.length >= 1, `Sin línea defectuosa en ${caseId}:${cloud}`);
        for (const lineNo of exercise.defectLineNumbers) {
          assert.ok(lineNo >= 1 && lineNo <= exercise.lines.length);
        }
        assert.ok(exercise.remediatedCode.length >= 40);
        assert.ok(exercise.defectExplanation.length >= 30);
      }
    },
  );

  return { steps };
}
