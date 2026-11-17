import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const ROOT = process.cwd();

test('F5-05..F5-09: all 5 new engine files + UI panels exist under 250 lines with 0 explicit any', () => {
  const files = [
    'src/features/simulators/engines/k8sLabEngine.ts',
    'src/features/simulators/engines/loadBalancingEngine.ts',
    'src/features/simulators/engines/finopsEngine.ts',
    'src/features/simulators/engines/drEngine.ts',
    'src/features/simulators/engines/messagingEngine.ts',
    'src/features/simulators/components/ExtendedSimulatorLabs.tsx',
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
