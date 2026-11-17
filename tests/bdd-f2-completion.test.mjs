import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildF2CompletionBddSteps } from './bdd/f2-completion/f2-completion.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(CURRENT_DIR, 'bdd/f2-completion/f2-completion.feature');
const { steps } = buildF2CompletionBddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
