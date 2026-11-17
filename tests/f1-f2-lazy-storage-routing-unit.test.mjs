import assert from 'node:assert/strict';
import test from 'node:test';
import { importTsModule } from './support/loadTsModule.mjs';

test('F1-09 unit: migrateProgressSnapshot migrates V1-V9 envelopes and raw storage to schemaVersion 2 losslessly', async () => {
  const mod = await import('../src/lib/importValidation.mjs');
  assert.equal(mod.PROGRESS_SCHEMA_VERSION, 2);

  const now_iso = '2026-11-16T21:00:00.000Z';
  const v1_envelope = {
    version: 1,
    progress: {
      completed: ['aws:cloud-fundamentals:0', 'azure:networks:lab'],
      senior: ['gcp:s04'],
      quiz: { 'aws:cloud-fundamentals': 100 },
      notes: { 'senior-session:gcp:s04': '{"version":1,"stage":"decidir"}' },
      simRuns: 7,
      seniorAttempts: [
        {
          caseId: 's04',
          provider: 'gcp',
          correct: true,
          score: 100,
          at: '2026-11-15T10:00:00.000Z',
          examined: ['primary', 'secondary'],
          report: {
            cause: 'a',
            mitigation: 'b',
            rollback: 'c',
            validation: 'd',
            citations: ['primary', 'secondary'],
          },
        },
      ],
    },
  };

  const migrated = mod.migrateProgressSnapshot(v1_envelope, now_iso);
  assert.equal(migrated.schemaVersion, 2);
  assert.equal(migrated.migratedFromVersion, 1);
  assert.equal(migrated.updatedAt, now_iso);
  assert.deepEqual(migrated.completed, ['aws:cloud-fundamentals:0', 'azure:networks:lab']);
  assert.equal(migrated.seniorAttempts[0].report.rollback, 'c');

  // Direct raw V1 localStorage object (without outer { progress } wrapper)
  const from_raw_v1 = mod.migrateProgressSnapshot(v1_envelope.progress, now_iso);
  assert.equal(from_raw_v1.schemaVersion, 2);
  assert.equal(from_raw_v1.migratedFromVersion, 1);
  assert.equal(from_raw_v1.simRuns, 7);

  // V2 snapshot remains schemaVersion 2 with migratedFromVersion = 2
  const from_v2 = mod.migrateProgressSnapshot(
    {
      schemaVersion: 2,
      progress: {
        ...migrated,
        updatedAt: '2026-11-16T18:30:00.000Z',
      },
    },
    now_iso,
  );
  assert.equal(from_v2.schemaVersion, 2);
  assert.equal(from_v2.migratedFromVersion, 2);
  assert.equal(from_v2.updatedAt, '2026-11-16T18:30:00.000Z');
});

test('F1-09 unit: inspectStoredProgressRaw quarantines malformed JSON and invalid schemas without data loss', async () => {
  const { inspectStoredProgressRaw } = await import('../src/lib/importValidation.mjs');

  const empty_case = inspectStoredProgressRaw(null, '2026-11-16T21:00:00.000Z');
  assert.equal(empty_case.status, 'empty');
  assert.equal(empty_case.progress.schemaVersion, 2);

  const bad_json = inspectStoredProgressRaw('{broken:true', '2026-11-16T21:00:00.000Z');
  assert.equal(bad_json.status, 'corrupted');
  assert.equal(bad_json.raw, '{broken:true');

  const bad_schema = inspectStoredProgressRaw(
    JSON.stringify({ completed: 'not-an-array' }),
    '2026-11-16T21:00:00.000Z',
  );
  assert.equal(bad_schema.status, 'corrupted');
  assert.equal(bad_schema.raw, '{"completed":"not-an-array"}');
});

test('F2-01 unit: router formats canonical hashes and parses deep parameters with clamping safety', async () => {
  const router = await importTsModule('src/app/router.ts');

  assert.equal(router.formatHashRoute('home'), '#/');
  assert.equal(router.formatHashRoute('map'), '#/mapa');
  assert.equal(router.formatHashRoute('learn'), '#/aprender');
  assert.equal(router.formatHashRoute('lesson', { resourceId: 'networks', unitIndex: 3 }), '#/aula/networks/3');
  assert.equal(router.formatHashRoute('labs'), '#/labs');
  assert.equal(router.formatHashRoute('lab', 'kubernetes'), '#/labs/kubernetes');
  assert.equal(router.formatHashRoute('simulator', { simId: 'iam' }), '#/simuladores/iam');
  assert.equal(router.formatHashRoute('senior', { caseId: 's12' }), '#/senior/s12');
  assert.equal(router.formatHashRoute('progress'), '#/progreso');
  assert.equal(router.formatHashRoute('settings'), '#/ajustes');

  const lesson_zero = router.parseHashRoute('#/aula/iac/0');
  assert.equal(lesson_zero.view, 'lesson');
  assert.equal(lesson_zero.resourceId, 'iac');
  assert.equal(lesson_zero.unitIndex, 0);

  // Invalid simulator ID falls back safely without crashing
  const unknown_sim = router.parseHashRoute('#/simuladores/unknown-sim');
  assert.equal(unknown_sim.view, 'simulator');
  assert.equal(unknown_sim.simId, undefined);
});

test('F2-02 & F2-03 unit: CurriculumMap model and LabsCatalog filter cover all modules, OIDC guides and projects', async () => {
  const { buildCurriculumMapModel } = await importTsModule(
    'src/features/curriculum/libs/buildCurriculumMapModel.ts',
  );
  const { buildGlobalLabsCatalog, filterLabsCatalog } = await importTsModule(
    'src/features/labs/libs/filterLabsCatalog.ts',
  );

  const map_azure = buildCurriculumMapModel('azure', ['azure:networks:1'], ['azure:s07']);
  assert.equal(map_azure.completedUnitsCount, 1);
  assert.equal(map_azure.completedSeniorCount, 1);
  const networks_node = map_azure.levels[0].modules.find((m) => m.id === 'networks');
  assert.equal(networks_node.units[1].completed, true);
  assert.equal(networks_node.units[1].href, '#/aula/networks/1');

  const catalog = buildGlobalLabsCatalog(['gcp:kubernetes:lab']);
  assert.equal(catalog.length, 60);
  const oidc_only = filterLabsCatalog(catalog, {
    provider: 'todos',
    level: 'todos',
    modality: 'cuenta-propia',
    costTier: 'todos',
    search: 'oidc',
  });
  assert.ok(oidc_only.length >= 3);
});
