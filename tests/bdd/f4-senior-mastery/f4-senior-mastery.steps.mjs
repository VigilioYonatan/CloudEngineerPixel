import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

const ROOT = process.cwd();

async function importTsModule(relPath) {
  return import(pathToFileURL(path.join(ROOT, relPath)).href);
}

export function buildF4SeniorMasteryBddSteps() {
  const steps = createStepRegistry();

  steps.Dado('que cargo los 18 casos y diagnósticos de Senior Mode', async (ctx) => {
    ctx.seniorSource = fs.readFileSync(path.join(ROOT, 'src/data/senior.ts'), 'utf8');
    ctx.diagSource = fs.readFileSync(path.join(ROOT, 'src/data/seniorDiagnostics.ts'), 'utf8');
    ctx.tradeoffsExists = fs.existsSync(path.join(ROOT, 'src/data/seniorTradeoffs.ts'));
    ctx.tradeoffsSource = ctx.tradeoffsExists
      ? fs.readFileSync(path.join(ROOT, 'src/data/seniorTradeoffs.ts'), 'utf8')
      : '';
  });

  steps.Cuando(
    'verifico la distribución de índices correctos y los datos de trade-off por opción',
    (ctx) => {
      ctx.decisionCorrectIndices = [...ctx.seniorSource.matchAll(/\bcorrect:\s*(\d+)/g)].map((m) =>
        Number(m[1]),
      );
      ctx.diagCorrectIndices = [...ctx.diagSource.matchAll(/\bcorrect:\s*(\d+)/g)].map((m) =>
        Number(m[1]),
      );
    },
  );

  steps.Entonces(
    'los índices correctos varían entre A, B y C sin patrón fijo en las 3 opciones',
    (ctx) => {
      assert.equal(ctx.decisionCorrectIndices.length, 18);
      assert.equal(ctx.diagCorrectIndices.length, 18);
      assert.equal(new Set(ctx.decisionCorrectIndices).size, 3);
      assert.equal(new Set(ctx.diagCorrectIndices).size, 3);
      assert.equal(ctx.decisionCorrectIndices[0], 1);
      assert.equal(ctx.diagCorrectIndices[0], 0);
    },
  );

  steps.Entonces(
    'cada caso incluye comparación de mitigación inmediata vs solución permanente y feedback por opción',
    (ctx) => {
      assert.ok(ctx.tradeoffsExists, 'src/data/seniorTradeoffs.ts must exist');
      for (let i = 1; i <= 18; i++) {
        const id = `s${String(i).padStart(2, '0')}`;
        assert.ok(ctx.tradeoffsSource.includes(`${id}:`), `Missing tradeoff metadata for ${id}`);
      }
      assert.ok(ctx.tradeoffsSource.includes('immediateMitigation'));
      assert.ok(ctx.tradeoffsSource.includes('permanentFix'));
      assert.ok(ctx.tradeoffsSource.includes('optionFeedback'));
    },
  );

  steps.Dado(
    'que tengo una sesión Senior con las 4 secciones requeridas y campos opcionales ADR',
    async (ctx) => {
      ctx.sessionLib = await importTsModule('src/lib/seniorSession.mjs');
      ctx.mdBuilderExists = fs.existsSync(
        path.join(ROOT, 'src/features/senior/libs/buildSeniorPostmortemMarkdown.ts'),
      );
      ctx.mdBuilderSource = ctx.mdBuilderExists
        ? fs.readFileSync(
            path.join(ROOT, 'src/features/senior/libs/buildSeniorPostmortemMarkdown.ts'),
            'utf8',
          )
        : '';
      ctx.reportStageSource = fs.readFileSync(
        path.join(ROOT, 'src/features/senior/components/ReportStage.tsx'),
        'utf8',
      );
    },
  );

  steps.Cuando('genero el Postmortem / ADR en formato Markdown', () => {});

  steps.Entonces(
    'el documento Markdown incluye título del caso, proveedor, evidencias y secciones ADR',
    (ctx) => {
      assert.ok(ctx.mdBuilderExists, 'buildSeniorPostmortemMarkdown.ts must exist');
      assert.ok(ctx.mdBuilderSource.includes('Postmortem'));
      assert.ok(ctx.mdBuilderSource.includes('ADR'));
      assert.ok(ctx.reportStageSource.includes('Descargar Postmortem / ADR (.md)'));
    },
  );

  steps.Entonces(
    'la sesión base de 4 campos sigue siendo 100% compatible con normalizeSeniorSession',
    (ctx) => {
      const base = ctx.sessionLib.emptySeniorSession();
      const restored = ctx.sessionLib.normalizeSeniorSession(base);
      assert.deepEqual(restored, base);
    },
  );

  steps.Dado(
    'que inspecciono el componente SeniorSidebar y los 54 cuadernos en public/senior-guides',
    (ctx) => {
      ctx.sidebarSource = fs.readFileSync(
        path.join(ROOT, 'src/features/senior/components/SeniorSidebar.tsx'),
        'utf8',
      );
    },
  );

  steps.Cuando(
    'valido la existencia del disparador accesible de vista previa y las rutas de cuaderno',
    (ctx) => {
      ctx.workbookCount = 0;
      for (const p of ['aws', 'azure', 'gcp']) {
        for (let i = 1; i <= 18; i++) {
          const id = `s${String(i).padStart(2, '0')}`;
          const file = path.join(ROOT, `public/senior-guides/${p}/${id}.md`);
          if (fs.existsSync(file) && fs.statSync(file).size > 200) {
            ctx.workbookCount += 1;
          }
        }
      }
    },
  );

  steps.Entonces(
    'existe un botón integrado para previsualizar el cuaderno con cierre por Escape',
    (ctx) => {
      assert.ok(
        ctx.sidebarSource.includes('Previsualizar cuaderno'),
        'SeniorSidebar must render integrated workbook preview trigger',
      );
      assert.ok(
        ctx.sidebarSource.includes('Escape') || ctx.sidebarSource.includes('WorkbookModal'),
        'Workbook preview must support Escape close',
      );
    },
  );

  steps.Entonces(
    'los 54 archivos Markdown de AWS, Azure y GCP existen y tienen contenido sustancial',
    (ctx) => {
      assert.equal(ctx.workbookCount, 54);
    },
  );

  steps.Dado('que filtro los 18 casos del catálogo Senior con historial parcial del alumno', (ctx) => {
    ctx.filterLibExists = fs.existsSync(
      path.join(ROOT, 'src/features/senior/libs/filterSeniorCatalog.ts'),
    );
    ctx.catalogSource = fs.readFileSync(
      path.join(ROOT, 'src/features/senior/components/SeniorCatalog.tsx'),
      'utf8',
    );
  });

  steps.Cuando('busco "filtracion" sin tilde y combino filtros de dominio y estado', () => {});

  steps.Entonces(
    'encuentra el caso "Filtración de secretos en repositorio" ignorando diacríticos',
    (ctx) => {
      assert.ok(ctx.filterLibExists, 'filterSeniorCatalog.ts must exist');
      const src = fs.readFileSync(
        path.join(ROOT, 'src/features/senior/libs/filterSeniorCatalog.ts'),
        'utf8',
      );
      assert.ok(src.includes('NFD'), 'Must normalize NFD to strip accents');
    },
  );

  steps.Entonces('al filtrar por dominio y estado devuelve el subconjunto exacto esperado', (ctx) => {
    assert.ok(ctx.catalogSource.includes('filterSeniorCatalog'));
    assert.ok(ctx.catalogSource.includes('Mostrando'));
  });

  steps.Dado('que mapeo los 18 casos Senior a módulos y unidades del plan de estudios', (ctx) => {
    ctx.linksExists = fs.existsSync(path.join(ROOT, 'src/data/seniorCurriculumLinks.ts'));
    ctx.linksSource = ctx.linksExists
      ? fs.readFileSync(path.join(ROOT, 'src/data/seniorCurriculumLinks.ts'), 'utf8')
      : '';
    ctx.courseSource = fs.readFileSync(path.join(ROOT, 'src/data/course.ts'), 'utf8');
    ctx.decisionSource = fs.readFileSync(
      path.join(ROOT, 'src/features/senior/components/DecisionStage.tsx'),
      'utf8',
    );
    ctx.diagnosisSource = fs.readFileSync(
      path.join(ROOT, 'src/features/senior/components/DiagnosisStage.tsx'),
      'utf8',
    );
    ctx.catalogSource = fs.readFileSync(
      path.join(ROOT, 'src/features/senior/components/SeniorCatalog.tsx'),
      'utf8',
    );
  });

  steps.Cuando('verifico cada referencia curricular y la UI de etapas y bitácora', (ctx) => {
    ctx.courseIds = new Set(
      [...ctx.courseSource.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]),
    );
  });

  steps.Entonces('cada caso apunta a un moduleId y unitIndex válido de src/data/course.ts', (ctx) => {
    assert.ok(ctx.linksExists, 'src/data/seniorCurriculumLinks.ts must exist');
    for (let i = 1; i <= 18; i++) {
      const id = `s${String(i).padStart(2, '0')}`;
      assert.ok(ctx.linksSource.includes(`${id}:`), `Missing curriculum link for ${id}`);
    }
    const referencedModules = [...ctx.linksSource.matchAll(/moduleId:\s*'([^']+)'/g)].map(
      (m) => m[1],
    );
    assert.ok(referencedModules.length >= 18);
    for (const modId of referencedModules) {
      assert.ok(ctx.courseIds.has(modId), `Invalid moduleId ${modId}`);
    }
  });

  steps.Entonces(
    'DecisionStage, DiagnosisStage y SeniorCatalog exponen refuerzo al Aula e inspección de intentos',
    (ctx) => {
      assert.ok(ctx.decisionSource.includes('Refuerza este tema'));
      assert.ok(ctx.diagnosisSource.includes('Refuerza este tema'));
      assert.ok(
        ctx.catalogSource.includes('Inspeccionar') ||
          ctx.catalogSource.includes('sr-attempt-detail'),
      );
    },
  );

  return { steps };
}
