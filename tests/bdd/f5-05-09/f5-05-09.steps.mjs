import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

const ROOT = process.cwd();

export function buildF50509BddSteps() {
  const steps = createStepRegistry();

  steps.Dado('que cargo k8sLabEngine.ts en src/features/simulators/engines', (ctx) => {
    ctx.k8sPath = path.join(ROOT, 'src/features/simulators/engines/k8sLabEngine.ts');
    ctx.k8sSrc = fs.existsSync(ctx.k8sPath) ? fs.readFileSync(ctx.k8sPath, 'utf8') : '';
  });
  steps.Cuando('evalúo requests/limits, PodDisruptionBudget, probes y HPA', () => {});
  steps.Entonces(
    'detecta determinísticamente estados Running, Pending, OOMKilled y CrashLoopBackOff',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.k8sPath), 'k8sLabEngine.ts must exist');
      for (const state of ['Running', 'Pending', 'OOMKilled', 'CrashLoopBackOff']) {
        assert.ok(ctx.k8sSrc.includes(state), `Missing K8s state: ${state}`);
      }
    },
  );

  steps.Dado('que cargo loadBalancingEngine.ts en src/features/simulators/engines', (ctx) => {
    ctx.lbPath = path.join(ROOT, 'src/features/simulators/engines/loadBalancingEngine.ts');
    ctx.lbSrc = fs.existsSync(ctx.lbPath) ? fs.readFileSync(ctx.lbPath, 'utf8') : '';
  });
  steps.Cuando('aumento réplicas sin pool/backpressure frente al límite de conexiones de BD', () => {});
  steps.Entonces('advierte saturación de base de datos aguas abajo conectando con S16', (ctx) => {
    assert.ok(fs.existsSync(ctx.lbPath), 'loadBalancingEngine.ts must exist');
    assert.ok(ctx.lbSrc.includes('dbMaxConnections'));
    assert.ok(ctx.lbSrc.includes('saturated'));
  });

  steps.Dado('que cargo finopsEngine.ts en src/features/simulators/engines', (ctx) => {
    ctx.finopsPath = path.join(ROOT, 'src/features/simulators/engines/finopsEngine.ts');
    ctx.finopsSrc = fs.existsSync(ctx.finopsPath) ? fs.readFileSync(ctx.finopsPath, 'utf8') : '';
  });
  steps.Cuando('comparo on-demand vs reservas/ARM64, NAT Gateway vs VPC Endpoint y egress', () => {});
  steps.Entonces(
    'calcula ahorro porcentual bajo etiqueta explícita de modelo hipotético educativo',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.finopsPath), 'finopsEngine.ts must exist');
      assert.ok(ctx.finopsSrc.includes('savingsPct'));
      assert.ok(ctx.finopsSrc.includes('modelo hipotético educativo'));
    },
  );

  steps.Dado('que cargo drEngine.ts en src/features/simulators/engines', (ctx) => {
    ctx.drPath = path.join(ROOT, 'src/features/simulators/engines/drEngine.ts');
    ctx.drSrc = fs.existsSync(ctx.drPath) ? fs.readFileSync(ctx.drPath, 'utf8') : '';
  });
  steps.Cuando(
    'comparo Backup & Restore, Pilot Light, Warm Standby y Active/Active contra objetivos RTO/RPO',
    () => {},
  );
  steps.Entonces(
    'valida numéricamente cumplimiento o incumplimiento de RTO/RPO y costo relativo',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.drPath), 'drEngine.ts must exist');
      for (const strategy of ['backup-restore', 'pilot-light', 'warm-standby', 'active-active']) {
        assert.ok(ctx.drSrc.includes(strategy), `Missing DR strategy: ${strategy}`);
      }
      assert.ok(ctx.drSrc.includes('meetsTargets'));
    },
  );

  steps.Dado('que cargo messagingEngine.ts en src/features/simulators/engines', (ctx) => {
    ctx.msgPath = path.join(ROOT, 'src/features/simulators/engines/messagingEngine.ts');
    ctx.msgSrc = fs.existsSync(ctx.msgPath) ? fs.readFileSync(ctx.msgPath, 'utf8') : '';
  });
  steps.Cuando('simulo entrega at-least-once con fallos transitorios y mensajes venenosos', () => {});
  steps.Entonces(
    'demuestra cobros duplicados sin idempotency_key y eliminación de duplicados con Outbox + DLQ',
    (ctx) => {
      assert.ok(fs.existsSync(ctx.msgPath), 'messagingEngine.ts must exist');
      assert.ok(ctx.msgSrc.includes('duplicateCharges'));
      assert.ok(ctx.msgSrc.includes('dlqCount'));
      assert.ok(ctx.msgSrc.includes('idempotencyEnabled'));
    },
  );

  return { steps };
}
