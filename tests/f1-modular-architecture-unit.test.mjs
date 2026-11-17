import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { importTsModule } from './support/loadTsModule.mjs';
import { ROOT_DIR, listSourceFiles } from './support/readSourceTree.mjs';

test('F1-06 unit: ProviderRegistry centralizes AWS, Azure and GCP metadata, CIDR reservations and assets', async () => {
  const providers_mod = await importTsModule('src/domain/providers.ts');
  const course_mod = await importTsModule('src/data/course.ts');

  const { CLOUD_PROVIDER_IDS, PROVIDER_REGISTRY, getProviderMeta, isCloudProviderId } = providers_mod;
  assert.deepEqual(CLOUD_PROVIDER_IDS, ['aws', 'azure', 'gcp']);
  assert.equal(isCloudProviderId('aws'), true);
  assert.equal(isCloudProviderId('azure'), true);
  assert.equal(isCloudProviderId('gcp'), true);
  assert.equal(isCloudProviderId('oracle'), false);
  assert.equal(isCloudProviderId(null), false);

  assert.equal(PROVIDER_REGISTRY.aws.badgeMark, 'aws');
  assert.equal(PROVIDER_REGISTRY.azure.badgeMark, 'A');
  assert.equal(PROVIDER_REGISTRY.gcp.badgeMark, 'G');

  assert.equal(PROVIDER_REGISTRY.aws.cidrReservation.reservedCount, 5);
  assert.equal(PROVIDER_REGISTRY.azure.cidrReservation.reservedCount, 5);
  assert.equal(PROVIDER_REGISTRY.gcp.cidrReservation.reservedCount, 4);

  for (const id of CLOUD_PROVIDER_IDS) {
    const meta = getProviderMeta(id);
    const course_entry = course_mod.providers[id];
    assert.equal(meta.name, course_entry.name);
    assert.equal(meta.short, course_entry.short);
    assert.equal(meta.tagline, course_entry.tagline);
    assert.equal(meta.consoleName, course_entry.console);
    assert.equal(meta.docsUrl, course_entry.docs);
    assert.equal(meta.mascot.default, course_entry.mascot);
    assert.equal(existsSync(path.join(ROOT_DIR, 'public', meta.mascot.default)), true);
    assert.equal(existsSync(path.join(ROOT_DIR, 'public', meta.mascot.senior)), true);
  }
});

test('F1-04 unit: router parses and formats canonical and legacy V9 hash routes deterministically', async () => {
  const router = await importTsModule('src/app/router.ts');
  assert.equal(router.isAppView('home'), true);
  assert.equal(router.isAppView('senior'), true);
  assert.equal(router.isAppView('unknown'), false);

  assert.deepEqual(router.parseHashRoute(''), { view: 'home', resourceId: undefined });
  assert.deepEqual(router.parseHashRoute('#learn'), { view: 'learn', resourceId: undefined });
  assert.deepEqual(router.parseHashRoute('#lesson/networks'), {
    view: 'lesson',
    resourceId: 'networks',
  });
  assert.deepEqual(router.parseHashRoute('#/lab/kubernetes'), {
    view: 'lab',
    resourceId: 'kubernetes',
  });
  assert.equal(router.parseHashRoute('#invalid-route/xyz'), null);

  assert.equal(router.formatHashRoute('home'), 'home');
  assert.equal(router.formatHashRoute('lesson', 'networks'), 'lesson/networks');
});

test('F1-05 unit: progressMetrics and buildTopicExplanation compute deterministic multicloud outputs', async () => {
  const metrics = await importTsModule('src/domain/progressMetrics.ts');
  const lesson_helper = await importTsModule('src/features/lessons/libs/buildTopicExplanation.ts');
  const course = await importTsModule('src/data/course.ts');

  const networks = course.modules.find((m) => m.id === 'networks');
  const completed = ['aws:networks:0', 'aws:networks:2', 'gcp:networks:0', 'aws:networks:lab'];

  assert.equal(metrics.completedTopicsCount(networks, 'aws', completed), 2);
  assert.equal(metrics.completedTopicsCount(networks, 'gcp', completed), 1);
  assert.equal(metrics.completedTopicsCount(networks, 'azure', completed), 0);
  assert.equal(metrics.moduleLabKey(networks, 'aws'), 'aws:networks:lab');

  const explanation = lesson_helper.buildTopicExplanation('VPC, VNet y subredes', networks, 'azure');
  assert.match(explanation.intro, /VPC, VNet y subredes/);
  assert.match(explanation.goal, /Microsoft Azure/);
  assert.match(explanation.goal, /Azure Virtual Network/);
  assert.equal(explanation.steps.length, 5);
});

test('F1-05 unit: simulatorCalculations computes CIDR, IAM, replicas, SLO and architecture deterministically', async () => {
  const sim = await importTsModule('src/features/simulators/libs/simulatorCalculations.ts');

  const cidr_24 = sim.calculateCidrSubnet('10.0.0.0/24', 'aws');
  assert.deepEqual(cidr_24, {
    net: '10.0.0.0',
    broadcast: '10.0.0.255',
    count: 256,
    prefix: 24,
    host: 254,
    cloudUsableHosts: 251,
    cloudReservedCount: 5,
  });
  assert.equal(sim.calculateCidrSubnet('10.0.0.0/24', 'gcp').cloudUsableHosts, 252);
  assert.equal(sim.calculateCidrSubnet('999.0.0.0/24', 'aws'), null);
  assert.equal(sim.calculateCidrSubnet('10.0.0.0/33', 'aws'), null);
  assert.equal(sim.calculateCidrSubnet('bad-input', 'aws'), null);

  assert.equal(sim.evaluateEducationalIam('read', 'all').allowed, true);
  assert.equal(sim.evaluateEducationalIam('write', 'single').allowed, true);
  assert.equal(sim.evaluateEducationalIam('write', 'all').allowed, false);
  assert.equal(sim.evaluateEducationalIam('admin', 'single').allowed, false);

  assert.equal(sim.calculateReplicaPlan(1200, 150), 8);
  assert.equal(sim.calculateReplicaPlan(1200, 0), 1200);

  const slo = sim.calculateSloBudget(99.9, 30);
  assert.equal(slo.minutes, 43);
  assert.equal(slo.downtimeSeconds, 2592);

  assert.equal(sim.recommendArchitectureService('events', 'simple'), 'serverless');
  assert.equal(sim.recommendArchitectureService('web', 'control'), 'compute');
  assert.equal(sim.recommendArchitectureService('batch', 'scale'), 'serverless');
});

test('F1-07 unit: hydrateCaseSession restores V7-V9 sessions and migrates structured V3-V6 notes safely', async () => {
  const { hydrateCaseSession } = await importTsModule(
    'src/features/senior/libs/hydrateCaseSession.ts',
  );

  const v7_raw = JSON.stringify({
    version: 1,
    stage: 'decidir',
    choice: 1,
    decisionLocked: true,
    diagnosisChoice: 0,
    diagnosisLocked: true,
    inspected: ['primary', 'secondary'],
    cited: ['primary'],
    acknowledged: false,
    answers: { cause: 'Causa V7', mitigation: '', rollback: '', validation: '' },
  });
  const from_v7 = hydrateCaseSession(v7_raw, JSON.stringify({ cause: 'Ignorado porque existe V7' }));
  assert.equal(from_v7.stage, 'decidir');
  assert.equal(from_v7.answers.cause, 'Causa V7');

  const from_v3_json = hydrateCaseSession(
    undefined,
    JSON.stringify({ cause: 'Causa heredada V3', mitigation: 'Mitigación V3' }),
  );
  assert.equal(from_v3_json.answers.cause, 'Causa heredada V3');
  assert.equal(from_v3_json.answers.mitigation, 'Mitigación V3');

  const from_freeform = hydrateCaseSession(undefined, 'Nota libre V1 no JSON');
  assert.equal(from_freeform.stage, 'investigar');
  assert.equal(from_freeform.answers.cause, '');
});

test('F1-05 quality gate: zero explicit any in modularized app, domain, shared and features layers', () => {
  const checked_files = [
    'src/App.tsx',
    'src/SeniorWorkbench.tsx',
    'src/InstructorReview.tsx',
    ...listSourceFiles('src/app'),
    ...listSourceFiles('src/domain'),
    ...listSourceFiles('src/shared'),
    ...listSourceFiles('src/features'),
  ];
  assert.ok(checked_files.length >= 20, 'Modular layers must contain extracted files');
  const offenders = [];
  for (const rel of checked_files) {
    const content = readFileSync(path.join(ROOT_DIR, rel), 'utf8');
    if (/:\s*any\b|\bas\s+any\b/.test(content)) {
      offenders.push(rel);
    }
  }
  assert.deepEqual(offenders, [], `Uso de any detectado en: ${offenders.join(', ')}`);
});
