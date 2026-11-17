import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildCharacterizationBddSteps } from './bdd/build-characterization/build-and-version.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/build-characterization/build-and-version.feature');
const { steps, cleanupWorld } = buildCharacterizationBddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
  cleanupWorld,
});
