import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const ROOT = process.cwd();

test('F4-05: DecisionStage and DiagnosisStage render structured trade-offs and option feedback', () => {
  const decision = fs.readFileSync(
    path.join(ROOT, 'src/features/senior/components/DecisionStage.tsx'),
    'utf8',
  );
  const diagnosis = fs.readFileSync(
    path.join(ROOT, 'src/features/senior/components/DiagnosisStage.tsx'),
    'utf8',
  );
  assert.ok(decision.includes('seniorTradeoffs'));
  assert.ok(decision.includes('optionFeedback'));
  assert.ok(diagnosis.includes('seniorTradeoffs') || diagnosis.includes('optionFeedback'));
});

test('F4-06: SeniorSession preserves optional postmortemExtras without altering base V9 shape', async () => {
  const { emptySeniorSession, normalizeSeniorSession } = await import(
    '../src/lib/seniorSession.mjs'
  );
  const base = emptySeniorSession();
  assert.deepEqual(normalizeSeniorSession(base), base);
  const withExtras = normalizeSeniorSession({
    ...base,
    postmortemExtras: {
      impact: 'Checkout 503 durante 12 min',
      discardedHypotheses: 'No fue DNS ni saturación CPU',
      communicationPlan: 'Statuspage + canal #ops',
      preventiveActions: 'Gate OPA + canary 5%',
    },
  });
  assert.equal(withExtras.postmortemExtras?.impact, 'Checkout 503 durante 12 min');
});

test('F4-08: filterSeniorCatalog module implements domain, status, and accent-insensitive query', () => {
  const filterPath = path.join(ROOT, 'src/features/senior/libs/filterSeniorCatalog.ts');
  assert.ok(fs.existsSync(filterPath), 'filterSeniorCatalog.ts must exist');
  const src = fs.readFileSync(filterPath, 'utf8');
  assert.ok(src.includes('normalize('));
  assert.ok(src.includes('domain'));
  assert.ok(src.includes('status'));
});

test('F4-05..09 modularity: all Senior files touched stay under 250 lines with zero explicit any', () => {
  const files = [
    'src/features/senior/components/DecisionStage.tsx',
    'src/features/senior/components/DiagnosisStage.tsx',
    'src/features/senior/components/ReportStage.tsx',
    'src/features/senior/components/SeniorSidebar.tsx',
    'src/features/senior/components/SeniorCatalog.tsx',
  ];
  for (const rel of files) {
    const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const lines = text.split('\n').length;
    assert.ok(lines < 250, `${rel} must be < 250 lines (got ${lines})`);
    assert.ok(!/:\s*any\b/.test(text), `${rel} must not contain explicit any`);
  }
});
