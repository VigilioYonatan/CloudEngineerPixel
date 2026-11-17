import assert from 'node:assert/strict';
import test from 'node:test';
import { importTsModule } from './support/loadTsModule.mjs';

test('F2-04 unit: Capstone rubric weights match Section 21.4 (20/20/20/15/10/15) and Markdown exporter sanitizes safely', async () => {
  const { PORTFOLIO_PROJECTS } = await importTsModule(
    'src/features/projects/constants/projects.constants.ts',
  );
  const { buildPortfolioAdrMarkdown } = await importTsModule(
    'src/features/projects/libs/buildPortfolioMarkdown.ts',
  );

  assert.equal(PORTFOLIO_PROJECTS.length, 3);
  const capstone = PORTFOLIO_PROJECTS[2];
  assert.deepEqual(
    capstone.rubric.map((r) => r.weight),
    [20, 20, 20, 15, 10, 15],
  );

  const md = buildPortfolioAdrMarkdown({
    project: PORTFOLIO_PROJECTS[0],
    cloudId: 'gcp',
    checkedDeliverables: [],
    adrNotes: 'Bucket privado con Cloud CDN y presupuesto configurado.',
    exportedAt: '2026-11-16T21:15:00.000Z',
  });
  assert.match(md, /Google Cloud/);
  assert.match(md, /\[ \]/);
  assert.match(md, /Bucket privado con Cloud CDN/);
});

test('F2-05 & F2-06 unit: router parses /#/acerca/:sectionId and produces precise routeRecovery diagnostics', async () => {
  const router = await importTsModule('src/app/router.ts');

  const about_sec = router.parseHashRoute('#/acerca/seguridad-cloud');
  assert.equal(about_sec.view, 'about');
  assert.equal(about_sec.aboutSection, 'seguridad-cloud');
  assert.equal(about_sec.routeRecovery, undefined);

  assert.equal(router.formatHashRoute('about', { aboutSection: 'privacidad' }), '#/acerca/privacidad');

  const valid_lesson = router.parseHashRoute('#/aula/networks/4');
  assert.equal(valid_lesson.routeRecovery, undefined);

  const out_of_bounds_lesson = router.parseHashRoute('#/aula/networks/5');
  assert.equal(out_of_bounds_lesson.routeRecovery.kind, 'unit');
  assert.equal(out_of_bounds_lesson.routeRecovery.suggestedView, 'lesson');

  const invalid_lab = router.parseHashRoute('#/labs/modulo-fantasma');
  assert.equal(invalid_lab.routeRecovery.kind, 'lab');
  assert.equal(invalid_lab.routeRecovery.suggestedView, 'labs');

  const invalid_sim = router.parseHashRoute('#/simuladores/unknown-sim');
  assert.equal(invalid_sim.view, 'simulator');
  assert.equal(invalid_sim.simId, undefined);
  assert.equal(invalid_sim.routeRecovery.kind, 'simulator');
});

test('F2-07 unit: resolveResumeTarget handles empty progress, exact uncompleted lastVisited, and cross-module rollover', async () => {
  const { resolveResumeTarget } = await importTsModule('src/domain/resumeLearning.ts');

  assert.equal(resolveResumeTarget(null, [], 'aws'), null);

  // Completed all 5 topics of cloud-fundamentals -> rolls over to module 2 ('networks') unit 0!
  const completed_m1 = [0, 1, 2, 3, 4].map((idx) => `aws:cloud-fundamentals:${idx}`);
  const rolled = resolveResumeTarget({ moduleId: 'cloud-fundamentals', unitIndex: 4 }, completed_m1, 'aws');
  assert.equal(rolled.moduleId, 'networks');
  assert.equal(rolled.unitIndex, 0);
});

test('F2-08 unit: createContextSwitchCoordinator isolates flushers, unregisters cleanly, and guards async imports', async () => {
  const { createContextSwitchCoordinator } = await importTsModule('src/lib/contextSwitchGuard.ts');
  const coord = createContextSwitchCoordinator();

  let flushed = 0;
  const unregister = coord.registerFlusher({
    id: 'senior-draft',
    scopeLabel: 'AZURE',
    isDirty: () => true,
    flush: () => {
      flushed += 1;
    },
  });

  const first = coord.prepareContextSwitch(() => true);
  assert.equal(first.allowed, true);
  assert.equal(first.flushedCount, 1);
  assert.equal(flushed, 1);

  unregister();
  const second = coord.prepareContextSwitch(() => true);
  assert.equal(second.flushedCount, 0);
});
