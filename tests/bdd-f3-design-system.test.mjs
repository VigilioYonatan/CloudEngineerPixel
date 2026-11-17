import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildF3DesignSystemBddSteps } from './bdd/f3-design-system/f3-design-system.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/f3-design-system/f3-design-system.feature');
const { steps } = buildF3DesignSystemBddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
