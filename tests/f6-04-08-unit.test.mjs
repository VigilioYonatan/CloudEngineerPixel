import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { importTsModule } from './support/loadTsModule.mjs';

const ROOT = process.cwd();

test('F6-04: all 90 units across Level 1, 2, 3 have unique mentalModel and antipattern', async () => {
  const { level1UnitSpecs } = await importTsModule('src/data/curriculum/level1/index.ts');
  const { level2UnitSpecs } = await importTsModule('src/data/curriculum/level2/index.ts');
  const { level3UnitSpecs } = await importTsModule('src/data/curriculum/level3/index.ts');
  const all = { ...level1UnitSpecs, ...level2UnitSpecs, ...level3UnitSpecs };
  const keys = Object.keys(all);
  assert.equal(keys.length, 90, 'Expected 90 total units');
  assert.equal(new Set(keys.map((k) => all[k].mentalModel)).size, 90);
  assert.equal(new Set(keys.map((k) => all[k].antipattern)).size, 90);
});

test('F6-05: quizBank covers all 18 modules with 90 curated questions and per-option reasons', async () => {
  const { quizBank } = await importTsModule('src/data/quizBank.ts');
  const allQuestions = Object.values(quizBank).flat();
  assert.equal(Object.keys(quizBank).length, 18);
  assert.equal(allQuestions.length, 90);
  for (const q of allQuestions) {
    assert.equal(q.optionReasons.length, 3);
  }
});

test('F6-04..F6-08: new files stay under 250 lines with zero explicit any', () => {
  const files = [
    'src/data/curriculum/level3/index.ts',
    'src/data/quizBank.ts',
    'src/features/lessons/components/GoPixelMicroGames.tsx',
    'src/features/progress/libs/progressDimensions.ts',
  ];
  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    assert.ok(fs.existsSync(abs), `${rel} must exist`);
    const text = fs.readFileSync(abs, 'utf8');
    assert.ok(text.split('\n').length < 250, `${rel} must be < 250 lines`);
    assert.ok(!/:\s*any\b/.test(text), `${rel} must not contain explicit any`);
  }
});
