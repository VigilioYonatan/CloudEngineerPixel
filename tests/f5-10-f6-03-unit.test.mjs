import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { importTsModule } from './support/loadTsModule.mjs';

const ROOT = process.cwd();

test('F5-10, F5-11 & F6-01..F6-03: files exist under 250 lines with zero explicit any', () => {
  const required = [
    'src/features/simulators/engines/observabilityEngine.ts',
    'src/features/simulators/constants/simulatorCatalogMeta.ts',
    'src/domain/curriculum.ts',
    'src/data/curriculum/level1/index.ts',
    'src/data/curriculum/level2/index.ts',
    'src/features/lessons/components/UnitSpecPanel.tsx',
  ];
  for (const rel of required) {
    const abs = path.join(ROOT, rel);
    assert.ok(fs.existsSync(abs), `${rel} must exist`);
    const text = fs.readFileSync(abs, 'utf8');
    const lines = text.split('\n').length;
    assert.ok(lines < 250, `${rel} must be < 250 lines (got ${lines})`);
    assert.ok(!/:\s*any\b/.test(text), `${rel} must not contain explicit any`);
  }
});

test('F6-02 & F6-03: 60 units across modules 01..12 have unique mentalModel and antipattern texts', async () => {
  const { level1UnitSpecs } = await importTsModule('src/data/curriculum/level1/index.ts');
  const { level2UnitSpecs } = await importTsModule('src/data/curriculum/level2/index.ts');
  const all = { ...level1UnitSpecs, ...level2UnitSpecs };
  const keys = Object.keys(all);
  assert.equal(keys.length, 60, 'Expected 60 units (30 Level 1 + 30 Level 2)');
  const models = new Set(keys.map((k) => all[k].mentalModel));
  const antipatterns = new Set(keys.map((k) => all[k].antipattern));
  assert.equal(models.size, 60, 'Every unit must have a unique mentalModel');
  assert.equal(antipatterns.size, 60, 'Every unit must have a unique antipattern');
});
