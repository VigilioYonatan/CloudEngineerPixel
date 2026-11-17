import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const ROOT = process.cwd();

test('F4-10: instructorReviewSchema validates exported review against schema contract', async () => {
  const schemaModule = await import('../src/lib/instructorReviewSchema.mjs');
  const valid = {
    version: 1,
    provider: 'aws',
    caseId: 's01',
    reviewer: 'Instructor 01',
    notes: 'Evidencias verificadas correctamente con restore drill.',
    scores: { evidence: 4, security: 4, recovery: 4, validation: 4, communication: 4 },
    reviewedAt: new Date().toISOString(),
    grade: {
      score: 100,
      complete: true,
      criticalRisk: false,
      decision: 'aprobado-en-revision-local',
      official: false,
    },
    notice: 'Revisión local no autenticada. Solo uso formativo.',
  };
  assert.equal(schemaModule.validateInstructorReviewSchema(valid).valid, true);
  assert.equal(
    schemaModule.validateInstructorReviewSchema({ ...valid, grade: { ...valid.grade, official: true } })
      .valid,
    false,
  );
});

test('F5-01 & F5-02 & F5-03 & F5-04: modular engine files exist and stay under 250 lines with 0 explicit any', () => {
  const files = [
    'src/features/simulators/engines/cidrEngine.ts',
    'src/features/simulators/engines/iamEngine.ts',
    'src/features/simulators/engines/autoscalingEngine.ts',
    'src/features/simulators/engines/sloEngine.ts',
    'src/features/simulators/engines/architectureDecisionEngine.ts',
    'src/features/simulators/engines/routingEngine.ts',
    'src/features/simulators/engines/terraformPlanEngine.ts',
    'src/features/simulators/components/Routing3DCanvas.tsx',
  ];
  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    assert.ok(fs.existsSync(abs), `${rel} must exist`);
    const text = fs.readFileSync(abs, 'utf8');
    const lines = text.split('\n').length;
    assert.ok(lines < 250, `${rel} must be < 250 lines (got ${lines})`);
    assert.ok(!/:\s*any\b/.test(text), `${rel} must not contain explicit any`);
  }
});
