import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildF410F50104BddSteps } from './bdd/f4-10-f5-01-04/f4-10-f5-01-04.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(
  CURRENT_DIR,
  'bdd/f4-10-f5-01-04/f4-10-f5-01-04.feature',
);
const { steps } = buildF410F50104BddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
