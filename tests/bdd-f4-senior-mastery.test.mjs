import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildF4SeniorMasteryBddSteps } from './bdd/f4-senior-mastery/f4-senior-mastery.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/f4-senior-mastery/f4-senior-mastery.feature');
const { steps } = buildF4SeniorMasteryBddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
