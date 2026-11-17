import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildF510F603BddSteps } from './bdd/f5-10-f6-03/f5-10-f6-03.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/f5-10-f6-03/f5-10-f6-03.feature');
const { steps } = buildF510F603BddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
