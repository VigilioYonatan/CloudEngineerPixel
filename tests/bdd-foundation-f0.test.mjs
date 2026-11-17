import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildFoundationSteps } from './bdd/foundation-preflight/foundation-gates.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/foundation-preflight/foundation-gates.feature');
const { steps, cleanupWorld } = buildFoundationSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
  cleanupWorld,
});
