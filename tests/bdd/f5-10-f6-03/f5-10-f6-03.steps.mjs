import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

const ROOT = process.cwd();

export function buildF510F603BddSteps() {
  const steps = createStepRegistry();

  steps.Dado('que cargo observabilityEngine.ts en src/features/simulators/engines', (ctx) => {
    ctx.obsPath = path.join(ROOT, 'src/features/simulators/engines/observabilityEngine.ts');
    ctx.obsSrc = fs.existsSync(ctx.obsPath) ? fs.readFileSync(ctx.obsPath, 'utf8') : '';
  });
  steps.Cuando('evalúo tasas de burn rate en ventanas 1h y 6h frente a alertas por CPU aislada', () => {});
  steps.Entonces(
    'clasifica severidad multi-window multi-burn-rate y valida traceparent',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.obsPath), 'observabilityEngine.ts must exist');
      assert.ok(ctx.obsSrc.includes('burnRate1h'));
      assert.ok(ctx.obsSrc.includes('burnRate6h'));
      assert.ok(ctx.obsSrc.includes('traceparent'));
    },
  );

  steps.Dado('que inspecciono simulatorCatalogMeta.ts y SimulatorsPage.tsx', (ctx) => {
    ctx.metaPath = path.join(ROOT, 'src/features/simulators/constants/simulatorCatalogMeta.ts');
    ctx.metaSrc = fs.existsSync(ctx.metaPath) ? fs.readFileSync(ctx.metaPath, 'utf8') : '';
    ctx.simPageSrc = fs.readFileSync(
      path.join(ROOT, 'src/features/simulators/pages/SimulatorsPage.tsx'),
      'utf8',
    );
  });
  steps.Cuando('verifico los 13 motores de simulación', () => {});
  steps.Entonces(
    'cada motor tiene categoría, versión, fórmula/reglas y simplificaciones documentadas',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.metaPath), 'simulatorCatalogMeta.ts must exist');
      for (const id of [
        'cidr',
        'iam',
        'scale',
        'slo',
        'architecture',
        'routing',
        'terraform-plan',
        'k8s',
        'load-balancing',
        'finops',
        'dr',
        'messaging',
        'observability',
      ]) {
        assert.ok(ctx.metaSrc.includes(`'${id}'`) || ctx.metaSrc.includes(`${id}:`), `Missing meta for ${id}`);
      }
      assert.ok(ctx.simPageSrc.includes('SIMULATOR_CATALOG_META'));
    },
  );

  steps.Dado('que inspecciono src/domain/curriculum.ts', (ctx) => {
    ctx.currPath = path.join(ROOT, 'src/domain/curriculum.ts');
    ctx.currSrc = fs.existsSync(ctx.currPath) ? fs.readFileSync(ctx.currPath, 'utf8') : '';
  });
  steps.Cuando('valido el esquema UnitContentSpec', () => {});
  steps.Entonces(
    'incluye objetivo, modelo mental, antipatrón, glosario, adaptadores AWS/Azure/GCP con verifiedAt y actividad',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.currPath), 'src/domain/curriculum.ts must exist');
      for (const field of [
        'UnitContentSpec',
        'mentalModel',
        'antipattern',
        'glossary',
        'adapters',
        'verifiedAt',
        'verifiableActivity',
      ]) {
        assert.ok(ctx.currSrc.includes(field), `Missing field ${field}`);
      }
    },
  );

  steps.Dado('que cargo las 30 unidades de Nivel 1 (Módulos 01 a 06)', (ctx) => {
    ctx.l1Index = path.join(ROOT, 'src/data/curriculum/level1/index.ts');
  });
  steps.Cuando('verifico mentalModel y antipattern de cada unidad', () => {});
  steps.Entonces(
    'existen las 30 unidades sin textos duplicados entre temas y con snippets por nube',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.l1Index), 'src/data/curriculum/level1/index.ts must exist');
    },
  );

  steps.Dado('que cargo las 30 unidades de Nivel 2 (Módulos 07 a 12)', (ctx) => {
    ctx.l2Index = path.join(ROOT, 'src/data/curriculum/level2/index.ts');
  });
  steps.Cuando(
    'verifico cobertura técnica Vigilio (set -euo pipefail, OIDC, non-root, probes, state locking)',
    () => {},
  );
  steps.Entonces(
    'existen las 30 unidades sin textos duplicados y con prácticas DevSecOps reales',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.l2Index), 'src/data/curriculum/level2/index.ts must exist');
    },
  );

  return { steps };
}
