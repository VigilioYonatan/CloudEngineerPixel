import assert from 'node:assert/strict';
import test from 'node:test';
import {
  inspectStoredProgressRaw,
  migrateProgressSnapshot,
} from '../src/lib/importValidation.mjs';
import { detectAccidentalSecrets, hasAccidentalSecrets } from '../src/lib/secretGuard.mjs';
import { importTsModule } from './support/loadTsModule.mjs';

test('F8-03 · Router hash parsing, V1-V9 storage migrations, hostile payloads, and secretGuard', async () => {
  const { formatHashRoute, parseHashRoute } = await importTsModule('src/app/router.ts');

  // Valid canonical & legacy routes
  assert.equal(parseHashRoute('#/').view, 'home');
  assert.equal(parseHashRoute('#/mapa').view, 'map');
  assert.equal(parseHashRoute('#learn').view, 'learn');
  const lessonParsed = parseHashRoute('#/aula/networks/3');
  assert.equal(lessonParsed.view, 'lesson');
  assert.equal(lessonParsed.resourceId, 'networks');
  assert.equal(lessonParsed.unitIndex, 3);
  assert.equal(formatHashRoute('lesson', { resourceId: 'networks', unitIndex: 3 }), '#/aula/networks/3');

  const simParsed = parseHashRoute('#/simuladores/routing');
  assert.equal(simParsed.view, 'simulator');
  assert.equal(simParsed.simId, 'routing');

  const seniorParsed = parseHashRoute('#/senior/s07');
  assert.equal(seniorParsed.view, 'senior');
  assert.equal(seniorParsed.caseId, 's07');

  // Broken / invalid routes produce RouteRecoveryDiagnostic without crashing
  assert.ok(parseHashRoute('#/aula/modulo-falso').routeRecovery);
  assert.ok(parseHashRoute('#/aula/networks/99').routeRecovery);
  assert.ok(parseHashRoute('#/senior/s99').routeRecovery);
  assert.ok(parseHashRoute('#/simuladores/motor-falso').routeRecovery);
  assert.ok(parseHashRoute('#/vista-inexistente').routeRecovery);

  // V1-V9 snapshot migration to schemaVersion 2
  const legacyV5 = {
    version: 5,
    completed: ['aws:networks:0', 'gcp:compute:lab'],
    quiz: { 'aws:networks': 100, 'azure:clamped': 999, 'gcp:invalid': 'nan' },
    senior: ['aws:s01'],
    notes: { 'aws:networks:lab': 'Evidencia limpia' },
    simRuns: 4,
  };
  const migrated = migrateProgressSnapshot(legacyV5, '2026-11-18T00:00:00.000Z');
  assert.equal(migrated.schemaVersion, 2);
  assert.deepEqual(migrated.completed, ['aws:networks:0', 'gcp:compute:lab']);
  assert.equal(migrated.quiz['aws:networks'], 100);
  assert.equal(migrated.quiz['azure:clamped'], 100);
  assert.equal(migrated.quiz['gcp:invalid'], undefined);

  // Hostile payloads (__proto__, null required fields, corrupted JSON)
  assert.throws(
    () =>
      migrateProgressSnapshot(
        JSON.parse('{"completed":["aws:iac:0"],"simRuns":null}'),
        '2026-11-18T00:00:00.000Z',
      ),
    /Faltan datos obligatorios/,
  );

  const polluted = JSON.parse(
    '{"completed":["aws:iac:0"],"quiz":{},"senior":[],"__proto__":{"polluted":true},"notes":{"__proto__":"evil","aws:iac:lab":"ok"},"simRuns":1}',
  );
  const sanitized = migrateProgressSnapshot(polluted, '2026-11-18T00:00:00.000Z');
  assert.equal(({}).polluted, undefined);
  assert.equal(Object.hasOwn(sanitized.notes, '__proto__'), false);
  assert.equal(sanitized.notes['aws:iac:lab'], 'ok');

  const corruptInspection = inspectStoredProgressRaw('{json-corrupto');
  assert.equal(corruptInspection.status, 'corrupted');
  assert.equal(corruptInspection.raw, '{json-corrupto');

  // Preventive secret detector (constructed dynamically to avoid repo secret scanner false positives)
  const fakeAws = ['AK', 'IA1234567890ABCDEF'].join('');
  const fakeGcp = ['AI', 'zaSyA12345678901234567890123456789012'].join('');
  const fakeJwt = ['eyJhbGciOiJIUzI1NiJ9', 'eyJzdWIiOiIxMjM0NTY3ODkwIn0', 'c2lnbmF0dXJlMTIzNDU'].join(
    '.',
  );
  assert.equal(hasAccidentalSecrets(`token=${fakeAws}`), true);
  assert.equal(hasAccidentalSecrets(`api=${fakeGcp}`), true);
  assert.equal(hasAccidentalSecrets(`Authorization: Bearer ${fakeJwt}`), true);
  assert.equal(detectAccidentalSecrets('vpc-0123456789abcdef0 en us-east-1').length, 0);
});
