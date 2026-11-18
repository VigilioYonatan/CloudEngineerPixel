import assert from 'node:assert/strict';
import test from 'node:test';
import { importTsModule } from './support/loadTsModule.mjs';

test('F8-02 · All 90 curriculum units are unique with valid https docs, 90 quiz questions, and 54 distinct Senior provider investigations', async () => {
  const { modules } = await importTsModule('src/data/course.ts');
  const { level1UnitSpecs } = await importTsModule('src/data/curriculum/level1/index.ts');
  const { level2UnitSpecs } = await importTsModule('src/data/curriculum/level2/index.ts');
  const { level3UnitSpecs } = await importTsModule('src/data/curriculum/level3/index.ts');
  const { quizBank } = await importTsModule('src/data/quizBank.ts');
  const { challenges } = await importTsModule('src/data/senior.ts');
  const { investigationFor } = await importTsModule('src/data/seniorInvestigations.ts');

  const allSpecs = { ...level1UnitSpecs, ...level2UnitSpecs, ...level3UnitSpecs };
  assert.equal(Object.keys(allSpecs).length, 90, 'Must contain all 90 unit specs');

  const mentalModels = new Set();
  const antipatterns = new Set();
  const activities = new Set();

  for (const mod of modules) {
    assert.equal(mod.topics.length, 5);
    for (let idx = 0; idx < 5; idx++) {
      const key = `${mod.id}:${idx}`;
      const spec = allSpecs[key];
      assert.ok(spec, `Missing unit spec for ${key}`);
      assert.ok(spec.mentalModel.length >= 25, `Short mentalModel in ${key}`);
      assert.ok(spec.antipattern.length >= 25, `Short antipattern in ${key}`);
      assert.ok(spec.verifiableActivity.length >= 20, `Short verifiableActivity in ${key}`);

      mentalModels.add(spec.mentalModel);
      antipatterns.add(spec.antipattern);
      activities.add(spec.verifiableActivity);

      for (const cloud of ['aws', 'azure', 'gcp']) {
        const adapter = spec.adapters[cloud];
        assert.ok(adapter, `Missing ${cloud} adapter in ${key}`);
        assert.ok(
          adapter.officialDocUrl.startsWith('https://'),
          `Invalid officialDocUrl in ${key}/${cloud}: ${adapter.officialDocUrl}`,
        );
        assert.ok(adapter.snippet.length >= 10, `Empty snippet in ${key}/${cloud}`);
        assert.ok(adapter.criticalDiff.length >= 15, `Empty criticalDiff in ${key}/${cloud}`);
      }
    }
  }

  assert.equal(mentalModels.size, 90, 'Zero cloned mentalModels allowed across 90 units');
  assert.equal(antipatterns.size, 90, 'Zero cloned antipatterns allowed across 90 units');
  assert.equal(activities.size, 90, 'Zero cloned verifiableActivities allowed across 90 units');

  // Verify >= 90 curated quiz questions with per-option feedback
  const bankQuestions = Object.values(quizBank).flat();
  assert.ok(bankQuestions.length >= 90, `Expected >=90 quiz questions, got ${bankQuestions.length}`);
  for (const q of bankQuestions) {
    assert.equal(q.choices.length, 3);
    assert.equal(q.optionReasons.length, 3);
    assert.ok(q.correct === 0 || q.correct === 1 || q.correct === 2);
  }

  // Verify 18 Senior cases x 3 clouds = 54 distinct provider-native exhibit sets
  assert.equal(challenges.length, 18);
  for (const challenge of challenges) {
    const awsInv = investigationFor(challenge.id, 'aws');
    const azureInv = investigationFor(challenge.id, 'azure');
    const gcpInv = investigationFor(challenge.id, 'gcp');

    const awsPrimary = awsInv.exhibits[0]?.body || '';
    const azurePrimary = azureInv.exhibits[0]?.body || '';
    const gcpPrimary = gcpInv.exhibits[0]?.body || '';

    assert.notEqual(
      awsPrimary,
      azurePrimary,
      `Senior ${challenge.id} AWS and Azure primary exhibit must differ`,
    );
    assert.notEqual(
      awsPrimary,
      gcpPrimary,
      `Senior ${challenge.id} AWS and GCP primary exhibit must differ`,
    );
    assert.notEqual(
      azurePrimary,
      gcpPrimary,
      `Senior ${challenge.id} Azure and GCP primary exhibit must differ`,
    );
  }
});
