import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildRoutingMapLabsBddSteps } from './bdd/routing-map-labs/f1-f2-routing-map-labs.steps.mjs';
import { registerFeatureSuite } from './bdd/support/gherkinRunner.mjs';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FEATURE_PATH = path.join(
  CURRENT_DIR,
  'bdd/routing-map-labs/f1-f2-routing-map-labs.feature',
);
const { steps } = buildRoutingMapLabsBddSteps();

registerFeatureSuite({
  testFn: test,
  featurePath: FEATURE_PATH,
  registry: steps,
});
