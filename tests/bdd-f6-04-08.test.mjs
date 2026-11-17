import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildF60408BddSteps } from './bdd/f6-04-08/f6-04-08.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/f6-04-08/f6-04-08.feature');
const { steps } = buildF60408BddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
