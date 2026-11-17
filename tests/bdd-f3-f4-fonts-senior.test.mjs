import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildF3F4FontsSeniorBddSteps } from './bdd/f3-f4-fonts-senior/f3-f4-fonts-senior.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/f3-f4-fonts-senior/f3-f4-fonts-senior.feature');
const { steps } = buildF3F4FontsSeniorBddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
