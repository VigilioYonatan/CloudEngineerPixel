import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildF3ComponentsAndStatesBddSteps } from './bdd/f3-components-and-states/f3-components-and-states.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(
  CURRENT_DIR,
  'bdd/f3-components-and-states/f3-components-and-states.feature',
);
const { steps } = buildF3ComponentsAndStatesBddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
