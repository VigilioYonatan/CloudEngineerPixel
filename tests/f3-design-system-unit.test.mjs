import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  contrastRatio,
  resolveThemeMatrix,
} from './bdd/f3-design-system/f3-design-system.steps.mjs';
import { importTsModule } from './support/loadTsModule.mjs';
import { ROOT_DIR } from './support/readSourceTree.mjs';

test('F3-01 unit: primitive, semantic and component tokens satisfy WCAG 2.2 AA across all 6 (provider x theme) combinations', () => {
  const tokensCss = readFileSync(path.join(ROOT_DIR, 'src/design-system/tokens.css'), 'utf8');
  assert.match(tokensCss, /--primitive-/);
  assert.match(tokensCss, /--tap-target-min:\s*44px/);

  const matrix = resolveThemeMatrix(tokensCss);
  assert.deepEqual(Object.keys(matrix).sort(), [
    'aws:dark',
    'aws:light',
    'azure:dark',
    'azure:light',
    'gcp:dark',
    'gcp:light',
  ]);

  for (const [combo, vars] of Object.entries(matrix)) {
    for (const surfaceKey of ['--bg', '--surface', '--surface2', '--surface3']) {
      assert.ok(
        contrastRatio(vars['--text'], vars[surfaceKey]) >= 7.0,
        `${combo} primary text contrast on ${surfaceKey} must be >= 7:1`,
      );
      assert.ok(
        contrastRatio(vars['--muted'], vars[surfaceKey]) >= 4.5,
        `${combo} muted text contrast on ${surfaceKey} must be >= 4.5:1`,
      );
      assert.ok(
        contrastRatio(vars['--accent-text'], vars[surfaceKey]) >= 4.5,
        `${combo} accent-text contrast on ${surfaceKey} must be >= 4.5:1`,
      );
    }
    assert.ok(
      contrastRatio(vars['--on-accent'], vars['--accent']) >= 4.5,
      `${combo} button on-accent contrast must be >= 4.5:1`,
    );
    assert.ok(
      contrastRatio(vars['--focus-ring'], vars['--bg']) >= 3.0,
      `${combo} focus-ring non-text contrast must be >= 3:1`,
    );
  }
});

test('F3-03 unit: confirmDialogState queues/replaces cleanly and never leaks unresolved promises', async () => {
  const { requestConfirm, resolveActiveConfirm, activeConfirmRequest } = await importTsModule(
    'src/lib/confirmDialogState.ts',
  );

  assert.equal(activeConfirmRequest.value, null);

  const first = requestConfirm({
    title: 'Primera solicitud',
    description: 'Se cancela automáticamente si entra otra confirmación urgente.',
    tone: 'warning',
  });
  const second = requestConfirm({
    title: 'Segunda solicitud',
    description: 'Confirmación activa.',
    confirmLabel: 'Confirmar cambio',
    cancelLabel: 'Volver',
    tone: 'danger',
  });

  assert.equal(await first, false);
  assert.equal(activeConfirmRequest.value?.title, 'Segunda solicitud');
  assert.equal(activeConfirmRequest.value?.confirmLabel, 'Confirmar cambio');

  resolveActiveConfirm(true);
  assert.equal(await second, true);
  assert.equal(activeConfirmRequest.value, null);
});

test('F3-04 unit: commandRisk classifies read-only, resource-creating/cost and destructive commands across AWS, Azure, GCP and IaC', async () => {
  const { analyzeCommandSnippet, classifyCommandRisk, detectSnippetLanguage } =
    await importTsModule('src/domain/commandRisk.ts');

  assert.equal(classifyCommandRisk('aws sts get-caller-identity'), 'read-only');
  assert.equal(classifyCommandRisk('az vm list --output table'), 'read-only');
  assert.equal(classifyCommandRisk('gcloud compute networks list'), 'read-only');
  assert.equal(classifyCommandRisk('terraform plan -out=tfplan'), 'read-only');

  assert.equal(classifyCommandRisk('aws ec2 run-instances --image-id ami-12345'), 'creates-cost');
  assert.equal(classifyCommandRisk('az aks create -g rg-lab -n aks-lab'), 'creates-cost');
  assert.equal(classifyCommandRisk('gcloud container clusters create prod-gke'), 'creates-cost');
  assert.equal(classifyCommandRisk('terraform apply tfplan'), 'creates-cost');

  assert.equal(classifyCommandRisk('terraform destroy -auto-approve'), 'destructive');
  assert.equal(classifyCommandRisk('aws s3 rb s3://lab-bucket --force'), 'destructive');
  assert.equal(classifyCommandRisk('az group delete --name rg-lab'), 'destructive');
  assert.equal(classifyCommandRisk('gcloud projects delete sandbox-123'), 'destructive');

  assert.equal(detectSnippetLanguage('{"Version":"2012-10-17","Statement":[]}'), 'json');
  assert.equal(detectSnippetLanguage('resource "aws_vpc" "main" {\n  cidr_block = "10.0.0.0/16"\n}'), 'hcl');
  assert.equal(detectSnippetLanguage('apiVersion: v1\nkind: Service'), 'yaml');
  assert.equal(detectSnippetLanguage('aws s3 ls'), 'bash');

  const meta = analyzeCommandSnippet('terraform destroy');
  assert.equal(meta.risk, 'destructive');
  assert.equal(meta.riskLabel, 'DESTRUCTIVO / REQUIERE PLAN');
  assert.equal(meta.providerBadge, 'TERRAFORM');
});

test('F3-05 unit: multicloudComparison differentiates AWS, Azure and GCP architecture models across all 18 modules', async () => {
  const { getModuleMulticloudComparison, MULTICLOUD_CAPABILITY_COMPARISONS } =
    await importTsModule('src/data/multicloudComparison.ts');
  const { modules } = await importTsModule('src/data/course.ts');

  assert.ok(Object.keys(MULTICLOUD_CAPABILITY_COMPARISONS).length >= 8);

  const net = getModuleMulticloudComparison('networks');
  assert.match(net.providers.gcp.hierarchy, /global/i);
  assert.match(net.providers.aws.hierarchy, /regional/i);
  assert.match(net.nonEquivalence, /GCP|global|IP/i);

  for (const mod of modules) {
    const entry = getModuleMulticloudComparison(mod.id);
    assert.notEqual(entry.providers.aws.service, entry.providers.azure.service);
    assert.notEqual(entry.providers.azure.service, entry.providers.gcp.service);
  }
});
