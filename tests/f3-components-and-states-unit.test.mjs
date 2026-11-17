import assert from 'node:assert/strict';
import test from 'node:test';
import { importTsModule } from './support/loadTsModule.mjs';

test('F3-06 unit: architectureTopologies differentiates providers and marks fault zones in Senior cases', async () => {
  const { getModuleTopology, getSeniorCaseTopology } = await importTsModule(
    'src/data/architectureTopologies.ts',
  );

  const awsNet = getModuleTopology('networks', 'aws');
  const gcpNet = getModuleTopology('networks', 'gcp');
  assert.notDeepEqual(
    awsNet.layers.map((l) => l.service),
    gcpNet.layers.map((l) => l.service),
  );
  assert.equal(awsNet.layers.length, 4);

  const s01Aws = getSeniorCaseTopology('s01', 'aws');
  assert.equal(s01Aws.layers.some((layer) => layer.status === 'alert'), true);
});

test('F3-07 unit: markdownParser parses tables, checklists, callouts, code blocks and strips unsafe URL schemes', async () => {
  const { parseMarkdownBlocks, sanitizeMarkdownHref } = await importTsModule(
    'src/domain/markdownParser.ts',
  );

  assert.equal(sanitizeMarkdownHref('https://docs.aws.amazon.com/vpc/'), 'https://docs.aws.amazon.com/vpc/');
  assert.equal(sanitizeMarkdownHref('/senior-guides/aws/s01.md'), '/senior-guides/aws/s01.md');
  assert.equal(sanitizeMarkdownHref('#seccion'), '#seccion');
  assert.equal(sanitizeMarkdownHref('javascript:alert(document.cookie)'), null);
  assert.equal(sanitizeMarkdownHref('data:text/html,<script>alert(1)</script>'), null);
  assert.equal(sanitizeMarkdownHref('  VbScRiPt:msgbox(1) '), null);

  const doc = [
    '# Título Principal',
    '> [!IMPORTANT] No ejecutes apply sin revisar el plan.',
    '- [x] Verificar cuenta sandbox',
    '- [ ] Confirmar cleanup',
    '| Criterio | Peso |',
    '|---|---:|',
    '| Seguridad | 40 |',
    '```hcl',
    'resource "aws_s3_bucket" "logs" {}',
    '```',
  ].join('\n');

  const blocks = parseMarkdownBlocks(doc);
  assert.equal(blocks[0].type, 'heading');
  assert.equal(blocks[1].type, 'callout');
  assert.equal(blocks[2].type, 'list');
  assert.equal(blocks[2].items[0].checked, true);
  assert.equal(blocks[2].items[1].checked, false);
  assert.equal(blocks[3].type, 'table');
  assert.deepEqual(blocks[3].headers, ['Criterio', 'Peso']);
  assert.equal(blocks[4].type, 'code');
  assert.equal(blocks[4].language, 'hcl');
});

test('F3-08 unit: cloudMentor.constants maps 5x3 sprite coordinates and locks intrinsic dimensions across sizes', async () => {
  const { CLOUD_MENTOR_POSES, CLOUD_MENTOR_DIMENSIONS, getMentorPoseMeta } = await importTsModule(
    'src/components/mascot/cloudMentor.constants.ts',
  );

  assert.equal(Object.keys(CLOUD_MENTOR_POSES).length, 15);
  assert.deepEqual(getMentorPoseMeta('welcome').bgPosition, '0% 0%');
  assert.deepEqual(getMentorPoseMeta('thinking').bgPosition, '50% 0%');
  assert.deepEqual(getMentorPoseMeta('incident').bgPosition, '25% 100%');
  assert.deepEqual(getMentorPoseMeta('senior').bgPosition, '100% 100%');

  for (const sizeKey of ['hero', 'banner', 'card', 'compact']) {
    const dim = CLOUD_MENTOR_DIMENSIONS[sizeKey];
    assert.ok(dim.width >= 56 && dim.height >= 56);
  }
});

test('F3-10 unit: granularProgress computes UTF-8 storage usage and builds provider-scoped exports cleanly', async () => {
  const { buildProviderScopedExport, calculateProgressStorageSummary } = await importTsModule(
    'src/lib/granularProgress.ts',
  );

  const progress = {
    schemaVersion: 2,
    updatedAt: '2026-11-16T12:00:00.000Z',
    completed: ['aws:networks:0', 'aws:networks:lab', 'gcp:storage:0'],
    quiz: { 'aws:networks': 100, 'gcp:storage': 100 },
    senior: ['aws:s01', 'gcp:s03'],
    notes: {
      'aws:networks:lab': 'Evidencia VPC',
      'senior-session:aws:s01': '{"version":1}',
      'senior-session:gcp:s03': '{"version":1}',
    },
    simRuns: 3,
    seniorAttempts: [],
  };

  const summary = calculateProgressStorageSummary(progress);
  assert.ok(summary.estimatedBytes > 100);
  assert.equal(summary.byProvider.aws.completedCount, 2);
  assert.equal(summary.byProvider.aws.seniorCompletedCount, 1);
  assert.equal(summary.byProvider.gcp.completedCount, 1);
  assert.equal(summary.byProvider.azure.completedCount, 0);

  const awsExport = buildProviderScopedExport(progress, 'aws', '9.0.0');
  assert.equal(awsExport.scopeProvider, 'aws');
  assert.deepEqual(awsExport.progress.completed, ['aws:networks:0', 'aws:networks:lab']);
  assert.equal(awsExport.progress.notes['senior-session:gcp:s03'], undefined);
});
