import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateSeniorEvidence } from '../src/lib/seniorEvaluation.mjs';
import { importTsModule } from './support/loadTsModule.mjs';

test('F4-01 unit: investigationFor returns provider-native resource identifiers for S01 and S09 across AWS, Azure and GCP', async () => {
  const { investigationFor } = await importTsModule('src/data/seniorInvestigations.ts');

  const s01Aws = investigationFor('s01', 'aws');
  const s01Azure = investigationFor('s01', 'azure');
  const s01Gcp = investigationFor('s01', 'gcp');

  assert.match(s01Aws.exhibits[0].body, /aws_db_instance/);
  assert.match(s01Azure.exhibits[0].body, /azurerm_postgresql_flexible_server/);
  assert.match(s01Gcp.exhibits[0].body, /google_sql_database_instance/);

  const s09Aws = investigationFor('s09', 'aws');
  const s09Azure = investigationFor('s09', 'azure');
  const s09Gcp = investigationFor('s09', 'gcp');

  assert.match(s09Aws.exhibits[0].body, /s3:GetObject|BlockPublicPolicy/i);
  assert.match(s09Azure.exhibits[0].body, /allowBlobPublicAccess|publicAccess/i);
  assert.match(s09Gcp.exhibits[0].body, /allUsers|storage\.objectViewer/i);
});

test('F4-02 unit: evaluateSeniorEvidence penalizes distractor citation by 15 points and blocks ready', () => {
  const longText =
    'Análisis completo de evidencia sintética con mitigación reversible, disparadores y validación.';
  const withRedHerring = evaluateSeniorEvidence({
    decisionLocked: true,
    decisionCorrect: true,
    requiredExhibits: ['primary', 'secondary'],
    inspected: ['primary', 'secondary', 'distractor'],
    cited: ['primary', 'secondary', 'distractor'],
    report: {
      cause: longText,
      mitigation: longText,
      rollback: longText,
      validation: longText,
    },
    acknowledged: true,
  });

  assert.equal(withRedHerring.distractorCited, true);
  assert.equal(withRedHerring.citationsReady, false);
  assert.equal(withRedHerring.score, 85);
  assert.equal(withRedHerring.ready, false);
});

test('F4-03 & F4-04 unit: IncidentTimeline and CodeReviewLab return deterministic exercises and null for non-code cases', async () => {
  const { getIncidentTimeline } = await importTsModule('src/data/seniorTimelines.ts');
  const { getCodeReviewExercise, evaluateSelectedCodeLine } = await importTsModule(
    'src/data/seniorCodeReviews.ts',
  );

  const t14 = getIncidentTimeline('s14', 'gcp');
  assert.equal(t14.caseId, 's14');
  assert.ok(t14.events.some((e) => e.kind === 'noise'));

  const nonCode = getCodeReviewExercise('s06', 'aws');
  assert.equal(nonCode, null);

  const s01Review = getCodeReviewExercise('s01', 'aws');
  assert.ok(s01Review);
  const hit = evaluateSelectedCodeLine(s01Review, s01Review.defectLineNumbers[0]);
  assert.equal(hit.isDefect, true);

  const safeLine = Array.from({ length: s01Review.lines.length }, (_, idx) => idx + 1).find(
    (n) => !s01Review.defectLineNumbers.includes(n),
  );
  const miss = evaluateSelectedCodeLine(s01Review, safeLine);
  assert.equal(miss.isDefect, false);
});

test('Transparent PNG mascot assets exist for all providers and 2026 cloud services catalog covers AWS, Azure and GCP', async () => {
  const { existsSync, readFileSync } = await import('node:fs');
  const path = await import('node:path');
  const { CLOUD_ESSENTIAL_SERVICES_2026 } = await importTsModule('src/data/cloudServicesCatalog.ts');
  const { PROVIDER_REGISTRY } = await importTsModule('src/domain/providers.ts');

  for (const id of ['aws', 'azure', 'gcp']) {
    assert.equal(CLOUD_ESSENTIAL_SERVICES_2026[id].length, 9);
    const tPath = path.default.join(process.cwd(), 'public', PROVIDER_REGISTRY[id].mascot.transparentDefault);
    assert.equal(existsSync(tPath), true, `Missing transparent PNG for ${id}`);
    const sig = readFileSync(tPath).subarray(0, 4).toString('hex');
    assert.equal(sig, '89504e47', `${id} transparent asset must be valid PNG`);
  }
});
