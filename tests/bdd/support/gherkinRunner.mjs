/**
 * Lightweight, zero-dependency Gherkin BDD runner for Node test suites.
 * Follows Vigilio BDD governance (tests/bdd/<module>/*.feature + *.steps.mjs):
 * - Declarative Spanish/English scenarios
 * - Isolated world context per scenario
 * - Fail-closed when a step has no matching definition
 */
import { readFileSync } from 'node:fs';

const FEATURE_PREFIX = /^(?:Característica|Caracteristica|Feature):\s*(.+)$/i;
const BACKGROUND_PREFIX = /^(?:Antecedentes|Background):\s*(.*)$/i;
const SCENARIO_PREFIX = /^(?:Escenario|Scenario):\s*(.+)$/i;
const STEP_PREFIX = /^(?:Dado|Dada|Dados|Dadas|Cuando|Entonces|Y|Pero|Given|When|Then|And|But)\s+(.+)$/i;

/**
 * Parses a Gherkin `.feature` file into structured feature, background, and scenarios.
 * @param {string} file_path
 */
export function parseFeatureFile(file_path) {
  const raw = readFileSync(file_path, 'utf8');
  const lines = raw.split(/\r?\n/);
  let feature_title = '';
  /** @type {Array<{ text: string; line: number }>} */
  const background_steps = [];
  /** @type {Array<{ title: string; line: number; steps: Array<{ text: string; line: number }> }>} */
  const scenarios = [];
  /** @type {'none' | 'background' | 'scenario'} */
  let mode = 'none';

  for (let idx = 0; idx < lines.length; idx += 1) {
    const trimmed = lines[idx].trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('@')) continue;

    const feature_match = trimmed.match(FEATURE_PREFIX);
    if (feature_match) {
      feature_title = feature_match[1].trim();
      mode = 'none';
      continue;
    }

    if (BACKGROUND_PREFIX.test(trimmed)) {
      mode = 'background';
      continue;
    }

    const scenario_match = trimmed.match(SCENARIO_PREFIX);
    if (scenario_match) {
      scenarios.push({ title: scenario_match[1].trim(), line: idx + 1, steps: [] });
      mode = 'scenario';
      continue;
    }

    const step_match = trimmed.match(STEP_PREFIX);
    if (step_match) {
      const step_entry = { text: step_match[1].trim(), line: idx + 1 };
      if (mode === 'background') {
        background_steps.push(step_entry);
      } else if (mode === 'scenario' && scenarios.length > 0) {
        scenarios[scenarios.length - 1].steps.push(step_entry);
      } else {
        throw new Error(`Step outside scenario/background at ${file_path}:${idx + 1}`);
      }
    }
  }

  if (!feature_title || scenarios.length === 0) {
    throw new Error(`Invalid or empty Gherkin feature file: ${file_path}`);
  }

  return { title: feature_title, backgroundSteps: background_steps, scenarios };
}

/**
 * Creates an isolated step registry for a bounded context BDD suite.
 */
export function createStepRegistry() {
  /** @type {Array<{ matcher: string | RegExp; handler: Function }>} */
  const definitions = [];

  const register = (matcher, handler) => {
    definitions.push({ matcher, handler });
  };

  /**
   * Executes a single step against a scenario world context.
   * @param {Record<string, unknown>} world
   * @param {{ text: string; line: number }} step
   * @param {string} feature_path
   */
  const runStep = async (world, step, feature_path) => {
    for (const def of definitions) {
      if (typeof def.matcher === 'string') {
        if (def.matcher === step.text) {
          await def.handler(world);
          return;
        }
      } else {
        const match = step.text.match(def.matcher);
        if (match) {
          await def.handler(world, ...match.slice(1));
          return;
        }
      }
    }
    throw new Error(`Undefined BDD step at ${feature_path}:${step.line} -> "${step.text}"`);
  };

  return {
    Given: register,
    When: register,
    Then: register,
    Dado: register,
    Cuando: register,
    Entonces: register,
    runStep,
  };
}

/**
 * Registers all scenarios in a `.feature` file into Node's native test runner (`node:test`).
 * @param {{ testFn: typeof import('node:test').default; featurePath: string; registry: ReturnType<typeof createStepRegistry>; createWorld?: () => Record<string, unknown>; cleanupWorld?: (world: Record<string, unknown>) => Promise<void> | void }} options
 */
export function registerFeatureSuite({ testFn, featurePath, registry, createWorld = () => ({}), cleanupWorld }) {
  const parsed = parseFeatureFile(featurePath);

  testFn(`BDD · ${parsed.title}`, async (t) => {
    for (const scenario of parsed.scenarios) {
      await t.test(`Escenario: ${scenario.title}`, async () => {
        const world = createWorld();
        try {
          for (const bg of parsed.backgroundSteps) {
            await registry.runStep(world, bg, featurePath);
          }
          for (const step of scenario.steps) {
            await registry.runStep(world, step, featurePath);
          }
        } finally {
          if (cleanupWorld) await cleanupWorld(world);
        }
      });
    }
  });
}
