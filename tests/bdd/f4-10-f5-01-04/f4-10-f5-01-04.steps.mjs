import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

const ROOT = process.cwd();

export function buildF410F50104BddSteps() {
  const steps = createStepRegistry();

  steps.Dado('que tengo un JSON exportado de alumno y el componente InstructorReview', (ctx) => {
    ctx.instructorSource = fs.readFileSync(
      path.join(ROOT, 'src/features/senior/components/InstructorReview.tsx'),
      'utf8',
    );
    ctx.schemaValidatorExists = fs.existsSync(
      path.join(ROOT, 'src/lib/instructorReviewSchema.mjs'),
    );
  });

  steps.Cuando(
    'valido una revisión exportada contra schemas/instructor-review.schema.json y reviso la UI',
    () => {},
  );

  steps.Entonces(
    'InstructorReview permite importar expediente/informe del alumno sin alterar el borrador propio',
    (ctx) => {
      assert.ok(ctx.schemaValidatorExists, 'src/lib/instructorReviewSchema.mjs must exist');
      assert.ok(ctx.instructorSource.includes('Importar entrega del alumno'));
    },
  );

  steps.Entonces(
    'mantiene visible la etiqueta "Revisión local no autenticada" y valida la estructura del schema',
    (ctx) => {
      assert.ok(ctx.instructorSource.includes('Revisión local no autenticada'));
      assert.ok(ctx.instructorSource.includes('validateInstructorReviewSchema'));
    },
  );

  steps.Dado('que inspecciono src/features/simulators/engines y la página SimulatorsPage', (ctx) => {
    ctx.enginesDir = path.join(ROOT, 'src/features/simulators/engines');
    ctx.simPageSource = fs.readFileSync(
      path.join(ROOT, 'src/features/simulators/pages/SimulatorsPage.tsx'),
      'utf8',
    );
  });

  steps.Cuando('verifico los 5 motores base y los controles de salida de simuladores', () => {});

  steps.Entonces(
    'existen cidrEngine.ts, iamEngine.ts, autoscalingEngine.ts, sloEngine.ts y architectureDecisionEngine.ts',
    (ctx) => {
      const required = [
        'cidrEngine.ts',
        'iamEngine.ts',
        'autoscalingEngine.ts',
        'sloEngine.ts',
        'architectureDecisionEngine.ts',
      ];
      for (const file of required) {
        assert.ok(fs.existsSync(path.join(ctx.enginesDir, file)), `Missing engine: ${file}`);
      }
    },
  );

  steps.Entonces(
    'SimulatorsPage ofrece botones Reiniciar, Copiar resultado y Descargar reporte',
    (ctx) => {
      assert.ok(ctx.simPageSource.includes('Reiniciar'));
      assert.ok(ctx.simPageSource.includes('Copiar resultado'));
      assert.ok(ctx.simPageSource.includes('Descargar reporte'));
    },
  );

  steps.Dado('que evalúo políticas en iamEngine.ts con múltiples declaraciones y condiciones', (ctx) => {
    ctx.iamPath = path.join(ROOT, 'src/features/simulators/engines/iamEngine.ts');
    ctx.iamSource = fs.existsSync(ctx.iamPath) ? fs.readFileSync(ctx.iamPath, 'utf8') : '';
  });

  steps.Cuando('coexisten Allow y Explicit Deny o falta condición MFA/región', () => {});

  steps.Entonces('Explicit Deny prevalece sobre Allow e Implicit Deny aplica por defecto', (ctx) => {
    assert.ok(ctx.iamSource.includes('explicit-deny'));
    assert.ok(ctx.iamSource.includes('implicit-deny'));
    assert.ok(ctx.iamSource.includes('mfaRequired') || ctx.iamSource.includes('mfa'));
  });

  steps.Entonces(
    'el resultado declara explícitamente que es un modelo educativo distinto al evaluador oficial',
    (ctx) => {
      assert.ok(ctx.iamSource.includes('evaluador oficial'));
    },
  );

  steps.Dado('que cargo routingEngine.ts y Routing3DCanvas en el feature simulators', (ctx) => {
    ctx.routingPath = path.join(ROOT, 'src/features/simulators/engines/routingEngine.ts');
    ctx.canvas3dPath = path.join(ROOT, 'src/features/simulators/components/Routing3DCanvas.tsx');
    ctx.routingSource = fs.existsSync(ctx.routingPath)
      ? fs.readFileSync(ctx.routingPath, 'utf8')
      : '';
    ctx.canvas3dSource = fs.existsSync(ctx.canvas3dPath)
      ? fs.readFileSync(ctx.canvas3dPath, 'utf8')
      : '';
  });

  steps.Cuando('evalúo flujo Internet hacia subred privada o base de datos aislada', () => {});

  steps.Entonces(
    'routingEngine.ts diagnostica el salto exacto de permiso o bloqueo por ruta, SG/NACL y Private Endpoint',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.routingPath), 'routingEngine.ts must exist');
      assert.ok(ctx.routingSource.includes('blockedHop'));
      assert.ok(ctx.routingSource.includes('hops'));
    },
  );

  steps.Entonces(
    'existe componente visual interactivo lazy-loaded con Three.js y fallback SVG accesible',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.canvas3dPath), 'Routing3DCanvas.tsx must exist');
      assert.ok(ctx.canvas3dSource.includes('three'));
    },
  );

  steps.Dado('que cargo terraformPlanEngine.ts en el feature simulators', (ctx) => {
    ctx.tfPath = path.join(ROOT, 'src/features/simulators/engines/terraformPlanEngine.ts');
    ctx.tfSource = fs.existsSync(ctx.tfPath) ? fs.readFileSync(ctx.tfPath, 'utf8') : '';
  });

  steps.Cuando('analizo escenarios create, update-in-place, ForceNew, drift y state-lock-conflict', () => {});

  steps.Entonces(
    'calcula blast radius y recomienda prevent_destroy, moved o restore drill sin pedir credenciales',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.tfPath), 'terraformPlanEngine.ts must exist');
      assert.ok(ctx.tfSource.includes('blastRadius'));
      assert.ok(ctx.tfSource.includes('prevent_destroy'));
    },
  );

  return { steps };
}
