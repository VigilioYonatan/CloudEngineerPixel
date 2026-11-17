import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildModularArchitectureBddSteps } from './bdd/modular-architecture/f1-modular-architecture.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/modular-architecture/f1-modular-architecture.feature');
const { steps } = buildModularArchitectureBddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
