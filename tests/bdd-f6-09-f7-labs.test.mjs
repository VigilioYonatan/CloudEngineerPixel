import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildF609F7LabsBddSteps } from './bdd/f6-09-f7-labs/f6-09-f7-labs.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/f6-09-f7-labs/f6-09-f7-labs.feature');
const { steps } = buildF609F7LabsBddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
