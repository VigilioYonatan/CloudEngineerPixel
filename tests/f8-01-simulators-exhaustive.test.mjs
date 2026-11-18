import assert from 'node:assert/strict';
import test from 'node:test';
import { importTsModule } from './support/loadTsModule.mjs';

test('F8-01 · Exhaustive boundary & provider tests across all 13 pure simulator engines', async () => {
  const { runCidrEngine } = await importTsModule('src/features/simulators/engines/cidrEngine.ts');
  const { runIamEngine } = await importTsModule('src/features/simulators/engines/iamEngine.ts');
  const { runAutoscalingEngine } = await importTsModule(
    'src/features/simulators/engines/autoscalingEngine.ts',
  );
  const { runSloEngine } = await importTsModule('src/features/simulators/engines/sloEngine.ts');
  const { runArchitectureDecisionEngine } = await importTsModule(
    'src/features/simulators/engines/architectureDecisionEngine.ts',
  );
  const { runRoutingEngine, ROUTING_PRESETS } = await importTsModule(
    'src/features/simulators/engines/routingEngine.ts',
  );
  const { runTerraformPlanEngine } = await importTsModule(
    'src/features/simulators/engines/terraformPlanEngine.ts',
  );
  const { runK8sLabEngine } = await importTsModule(
    'src/features/simulators/engines/k8sLabEngine.ts',
  );
  const { runLoadBalancingEngine } = await importTsModule(
    'src/features/simulators/engines/loadBalancingEngine.ts',
  );
  const { runFinopsEngine } = await importTsModule(
    'src/features/simulators/engines/finopsEngine.ts',
  );
  const { runDrEngine } = await importTsModule('src/features/simulators/engines/drEngine.ts');
  const { runMessagingEngine } = await importTsModule(
    'src/features/simulators/engines/messagingEngine.ts',
  );
  const { runObservabilityEngine } = await importTsModule(
    'src/features/simulators/engines/observabilityEngine.ts',
  );

  // 1. CIDR Engine: /0, /24 provider reservations (AWS=5, Azure=5, GCP=4), /31, /32, invalid & overflow
  const cidrAws = runCidrEngine('10.0.0.0/24', 'aws');
  const cidrAzure = runCidrEngine('10.0.0.0/24', 'azure');
  const cidrGcp = runCidrEngine('10.0.0.0/24', 'gcp');
  assert.equal(cidrAws.cloudUsableHosts, 251);
  assert.equal(cidrAzure.cloudUsableHosts, 251);
  assert.equal(cidrGcp.cloudUsableHosts, 252);

  const cidr0 = runCidrEngine('0.0.0.0/0', 'aws');
  assert.equal(cidr0.count, 4294967296);
  assert.equal(cidr0.broadcast, '255.255.255.255');

  const cidr31 = runCidrEngine('192.168.1.10/31', 'aws');
  assert.equal(cidr31.host, 2);
  assert.equal(cidr31.cloudUsableHosts, 0);

  const cidr32 = runCidrEngine('192.168.1.10/32', 'gcp');
  assert.equal(cidr32.host, 1);
  assert.equal(cidr32.cloudUsableHosts, 0);

  assert.equal(runCidrEngine('999.0.0.1/24', 'aws'), null);
  assert.equal(runCidrEngine('10.0.0.1/33', 'aws'), null);
  assert.equal(runCidrEngine('invalid-cidr', 'aws'), null);

  // 2. IAM Engine: explicit-deny > allow > implicit-deny, MFA, region, admin
  assert.equal(
    runIamEngine({
      cloudId: 'aws',
      action: 'read',
      scope: 'single',
      guardrailDeny: true,
      mfaRequired: false,
      mfaPresent: true,
      regionMatched: true,
    }).verdict,
    'explicit-deny',
  );
  assert.equal(
    runIamEngine({
      cloudId: 'azure',
      action: 'write',
      scope: 'single',
      guardrailDeny: false,
      mfaRequired: true,
      mfaPresent: false,
      regionMatched: true,
    }).verdict,
    'implicit-deny',
  );
  assert.equal(
    runIamEngine({
      cloudId: 'gcp',
      action: 'write',
      scope: 'single',
      guardrailDeny: false,
      mfaRequired: true,
      mfaPresent: true,
      regionMatched: true,
    }).verdict,
    'allow',
  );
  assert.equal(
    runIamEngine({
      cloudId: 'aws',
      action: 'admin',
      scope: 'all',
      guardrailDeny: false,
      mfaRequired: false,
      mfaPresent: true,
      regionMatched: true,
    }).verdict,
    'implicit-deny',
  );

  // 3. Autoscaling Engine: 0 load, capacity floor, DB connection multiplication
  const scaleZero = runAutoscalingEngine(0, 100, 12);
  assert.equal(scaleZero.replicas, 1);
  assert.equal(scaleZero.utilizationPct, 0);
  const scaleHigh = runAutoscalingEngine(450, 100, 15);
  assert.equal(scaleHigh.replicas, 5);
  assert.equal(scaleHigh.estimatedDbConnections, 75);

  // 4. SLO Engine: 100%, 99.9%, 99.99%
  assert.equal(runSloEngine(100, 30).downtimeSeconds, 0);
  assert.equal(runSloEngine(99.9, 30).minutes, 43);
  assert.equal(runSloEngine(99.99, 30).minutes, 4);

  // 5. Architecture Decision Engine: all 3 providers
  for (const cloudId of ['aws', 'azure', 'gcp']) {
    const ev = runArchitectureDecisionEngine(cloudId, 'events', 'simplicity');
    const ctl = runArchitectureDecisionEngine(cloudId, 'steady', 'control');
    assert.equal(ev.category, 'serverless');
    assert.equal(ctl.category, 'compute');
  }

  // 6. Routing Engine: all 5 presets
  assert.equal(
    runRoutingEngine({
      preset: 'healthy-three-tier',
      ...ROUTING_PRESETS['healthy-three-tier'].config,
    }).allowed,
    true,
  );
  assert.equal(
    runRoutingEngine({
      preset: 'nacl-stateless-return-block',
      ...ROUTING_PRESETS['nacl-stateless-return-block'].config,
    }).blockedHop,
    2,
  );
  assert.equal(
    runRoutingEngine({
      preset: 'missing-nat-egress',
      ...ROUTING_PRESETS['missing-nat-egress'].config,
    }).blockedHop,
    3,
  );
  assert.equal(
    runRoutingEngine({
      preset: 'sg-db-port-closed',
      ...ROUTING_PRESETS['sg-db-port-closed'].config,
    }).blockedHop,
    4,
  );

  // 7. Terraform Plan Engine
  assert.equal(runTerraformPlanEngine('destroy-recreate-db').forcesReplacement, true);
  assert.equal(runTerraformPlanEngine('destroy-recreate-db').blastRadius, 'Crítico');
  assert.equal(runTerraformPlanEngine('create-stateless').dataLossRisk, false);

  // 8. K8s Lab Engine: Running, Pending, OOMKilled, CrashLoopBackOff
  assert.equal(
    runK8sLabEngine({
      desiredReplicas: 10,
      nodeCpuCapacity: 2,
      nodeRamMbCapacity: 4096,
      podCpuRequest: 1,
      podRamRequestMb: 256,
      podRamLimitMb: 512,
      actualPeakRamMb: 200,
      readinessHealthy: true,
      livenessHealthy: true,
      pdbMinAvailable: 1,
    }).state,
    'Pending',
  );
  assert.equal(
    runK8sLabEngine({
      desiredReplicas: 2,
      nodeCpuCapacity: 4,
      nodeRamMbCapacity: 4096,
      podCpuRequest: 0.5,
      podRamRequestMb: 256,
      podRamLimitMb: 512,
      actualPeakRamMb: 700,
      readinessHealthy: true,
      livenessHealthy: true,
      pdbMinAvailable: 2,
    }).state,
    'OOMKilled',
  );

  // 9. Load Balancing Engine: DB connection pool exhaustion vs backpressure rescue
  const lbExhausted = runLoadBalancingEngine({
    incomingRps: 300,
    healthyInstances: 6,
    degradedInstances: 2,
    capacityPerInstance: 100,
    poolSizePerInstance: 20,
    dbMaxConnections: 120,
    backpressureEnabled: false,
  });
  assert.equal(lbExhausted.saturated, true);
  const lbProtected = runLoadBalancingEngine({
    incomingRps: 300,
    healthyInstances: 6,
    degradedInstances: 2,
    capacityPerInstance: 100,
    poolSizePerInstance: 20,
    dbMaxConnections: 120,
    backpressureEnabled: true,
  });
  assert.equal(lbProtected.saturated, false);

  // 10. FinOps Engine
  const finops = runFinopsEngine({
    baselineMonthlyComputeUsd: 1000,
    pricingModel: 'arm64-graviton-spot',
    natTrafficGb: 2000,
    useVpcGatewayEndpoint: true,
    crossRegionEgressGb: 100,
    highCardinalityMetrics: false,
  });
  assert.ok(finops.savingsPct > 40);
  assert.match(finops.disclaimer, /modelo hipotético educativo/i);

  // 11. DR Engine
  assert.equal(
    runDrEngine({ strategy: 'backup-restore', targetRtoMinutes: 30, targetRpoMinutes: 15 })
      .meetsTargets,
    false,
  );
  assert.equal(
    runDrEngine({ strategy: 'warm-standby', targetRtoMinutes: 30, targetRpoMinutes: 15 })
      .meetsTargets,
    true,
  );

  // 12. Messaging Engine
  const msgSafe = runMessagingEngine({
    eventsPublished: 1000,
    transientFailurePct: 10,
    poisonMessages: 3,
    idempotencyEnabled: true,
    outboxEnabled: true,
    dlqEnabled: true,
  });
  assert.equal(msgSafe.duplicateCharges, 0);
  assert.equal(msgSafe.lostEvents, 0);
  assert.equal(msgSafe.dlqCount, 3);

  // 13. Observability Burn-Rate Engine
  assert.equal(
    runObservabilityEngine({
      sloTargetPct: 99.9,
      errorRate1hPct: 2.0,
      errorRate6hPct: 0.8,
      cpuPct: 50,
      traceparentValid: true,
    }).pageAlert,
    true,
  );
  assert.equal(
    runObservabilityEngine({
      sloTargetPct: 99.9,
      errorRate1hPct: 0.01,
      errorRate6hPct: 0.01,
      cpuPct: 92,
      traceparentValid: true,
    }).noiseCpuOnly,
    true,
  );
});
