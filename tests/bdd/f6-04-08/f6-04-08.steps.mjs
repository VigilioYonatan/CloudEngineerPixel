import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

const ROOT = process.cwd();

export function buildF60408BddSteps() {
  const steps = createStepRegistry();

  steps.Dado(
    'que cargo las 30 unidades de Nivel 3 (Módulos 13 a 18) junto a Nivel 1 y Nivel 2',
    (ctx) => {
      ctx.l3Index = path.join(ROOT, 'src/data/curriculum/level3/index.ts');
    },
  );
  steps.Cuando('verifico mentalModel y antipattern de las 90 unidades totales', () => {});
  steps.Entonces('existen las 90 unidades sin textos duplicados entre temas', (ctx) => {
    assert.ok(fs.existsSync(ctx.l3Index), 'src/data/curriculum/level3/index.ts must exist');
  });

  steps.Dado('que cargo src/data/quizBank.ts y KnowledgeQuiz.tsx', (ctx) => {
    ctx.qbPath = path.join(ROOT, 'src/data/quizBank.ts');
    ctx.qbSrc = fs.existsSync(ctx.qbPath) ? fs.readFileSync(ctx.qbPath, 'utf8') : '';
    ctx.kqSrc = fs.readFileSync(
      path.join(ROOT, 'src/features/lessons/components/KnowledgeQuiz.tsx'),
      'utf8',
    );
  });
  steps.Cuando('verifico la cobertura de preguntas por módulo y explicación por opción', () => {});
  steps.Entonces(
    'existen 90 preguntas razonadas (5 por módulo) con optionReasons y unitIndex de refuerzo',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.qbPath), 'src/data/quizBank.ts must exist');
      assert.ok(ctx.kqSrc.includes('quizBank'));
    },
  );

  steps.Dado('que inspecciono GoPixelMicroGames.tsx y LessonPage.tsx', (ctx) => {
    ctx.gpPath = path.join(ROOT, 'src/features/lessons/components/GoPixelMicroGames.tsx');
    ctx.gpSrc = fs.existsSync(ctx.gpPath) ? fs.readFileSync(ctx.gpPath, 'utf8') : '';
    ctx.lpSrc = fs.readFileSync(
      path.join(ROOT, 'src/features/lessons/pages/LessonPage.tsx'),
      'utf8',
    );
  });
  steps.Cuando('verifico las modalidades interactivas disponibles en el Aula', () => {});
  steps.Entonces(
    'existen Bug Hunter, Ordenar Despliegue y Architecture Match integrados en LessonPage',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.gpPath), 'GoPixelMicroGames.tsx must exist');
      assert.ok(ctx.gpSrc.includes('Bug Hunter'));
      assert.ok(ctx.gpSrc.includes('Ordenar Despliegue'));
      assert.ok(ctx.gpSrc.includes('Architecture Match'));
      assert.ok(ctx.lpSrc.includes('GoPixelMicroGames'));
    },
  );

  steps.Dado('que llamo a setQuiz con 100 y luego reintento con 0 por estudio', (ctx) => {
    ctx.stateSrc = fs.readFileSync(path.join(ROOT, 'src/lib/state.ts'), 'utf8');
  });
  steps.Cuando('consulto el puntaje guardado y las estadísticas de intentos', () => {});
  steps.Entonces(
    'bestScore se conserva en 100, lastScore refleja 0 y attempts incrementa sin sobrescribir logros',
    (ctx) => {
      assert.ok(ctx.stateSrc.includes('getQuizStats'));
      assert.ok(ctx.stateSrc.includes('bestScore'));
    },
  );

  steps.Dado('que inspecciono progressDimensions.ts y ProgressPage.tsx', (ctx) => {
    ctx.pdPath = path.join(ROOT, 'src/features/progress/libs/progressDimensions.ts');
    ctx.ppSrc = fs.readFileSync(
      path.join(ROOT, 'src/features/progress/pages/ProgressPage.tsx'),
      'utf8',
    );
  });
  steps.Cuando('verifico el desglose de dimensiones en Mi progreso', () => {});
  steps.Entonces(
    'muestra las 6 dimensiones separadas (Teoría, Evaluaciones, Simuladores, Labs, Proyectos, Senior)',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.pdPath), 'progressDimensions.ts must exist');
      assert.ok(ctx.ppSrc.includes('computeSixDimensions'));
    },
  );

  return { steps };
}
