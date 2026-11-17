import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildF50509BddSteps } from './bdd/f5-05-09/f5-05-09.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/f5-05-09/f5-05-09.feature');
const { steps } = buildF50509BddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
