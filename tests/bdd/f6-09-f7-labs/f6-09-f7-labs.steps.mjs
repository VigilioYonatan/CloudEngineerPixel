import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createStepRegistry } from '../support/gherkinRunner.mjs';
import { importTsModule } from '../../support/loadTsModule.mjs';
import { detectAccidentalSecrets, hasAccidentalSecrets } from '../../../src/lib/secretGuard.mjs';

const ROOT = process.cwd();

export function buildF609F7LabsBddSteps() {
  const steps = createStepRegistry();

  steps.Dado('que cargo el glosario técnico de ingeniería cloud', async (ctx) => {
    ctx.glossaryMod = await importTsModule('src/data/glossary.ts');
    ctx.headerSource = fs.readFileSync(path.join(ROOT, 'src/app/AppHeader.tsx'), 'utf8');
    ctx.unitPanelSource = fs.readFileSync(
      path.join(ROOT, 'src/features/lessons/components/UnitSpecPanel.tsx'),
      'utf8',
    );
    ctx.modalSource = fs.readFileSync(
      path.join(ROOT, 'src/components/ui/GlossaryModal.tsx'),
      'utf8',
    );
  });

  steps.Cuando(
    'busco términos clave como CIDR, OIDC, RTO, SLO, DLQ, KMS, Drift y SBOM sin distinguir tildes',
    (ctx) => {
      const { searchGlossary } = ctx.glossaryMod;
      ctx.keyQueries = ['CIDR', 'OIDC', 'RTO', 'SLO', 'DLQ', 'KMS', 'Drift', 'SBOM', 'idempotencia'];
      ctx.queryHits = ctx.keyQueries.map((q) => searchGlossary(q).length);
    },
  );

  steps.Entonces(
    'el glosario contiene al menos 20 términos con matices AWS, Azure y GCP',
    (ctx) => {
      const { CLOUD_GLOSSARY } = ctx.glossaryMod;
      assert.ok(CLOUD_GLOSSARY.length >= 20, `Expected >=20 terms, got ${CLOUD_GLOSSARY.length}`);
      for (const item of CLOUD_GLOSSARY) {
        assert.ok(item.providerNuance.aws.length > 10);
        assert.ok(item.providerNuance.azure.length > 10);
        assert.ok(item.providerNuance.gcp.length > 10);
      }
      for (const count of ctx.queryHits) {
        assert.ok(count >= 1, 'Expected each core acronym search to return >= 1 result');
      }
    },
  );

  steps.Entonces(
    'GlossaryModal se expone de forma accesible desde AppHeader y UnitSpecPanel',
    (ctx) => {
      assert.ok(ctx.headerSource.includes('openGlossary'));
      assert.ok(ctx.unitPanelSource.includes('openGlossary'));
      assert.ok(ctx.modalSource.includes('role="dialog"'));
      assert.ok(ctx.modalSource.includes('Escape'));
    },
  );

  steps.Dado('que inspecciono los materiales de laboratorio y el kit local-sandbox', (ctx) => {
    ctx.labPageSource = fs.readFileSync(
      path.join(ROOT, 'src/features/labs/pages/LabPage.tsx'),
      'utf8',
    );
    ctx.guidePanelSource = fs.readFileSync(
      path.join(ROOT, 'src/features/labs/components/LabMarkdownGuidePanel.tsx'),
      'utf8',
    );
    ctx.composeSource = fs.readFileSync(
      path.join(ROOT, 'labs/local-sandbox/compose.yaml'),
      'utf8',
    );
    ctx.kindSource = fs.readFileSync(
      path.join(ROOT, 'labs/local-sandbox/k8s-kind-manifest.yaml'),
      'utf8',
    );
  });

  steps.Cuando(
    'verifico las 54 guías de módulo, las 3 guías OIDC, compose.yaml, Kind y enterprise-finops.tf',
    (ctx) => {
      ctx.providerGuideCounts = ['aws', 'azure', 'gcp'].map(
        (p) =>
          fs
            .readdirSync(path.join(ROOT, 'labs', p))
            .filter((f) => f.endsWith('.md') && f !== 'README.md').length,
      );
      ctx.oidcExists = ['aws', 'azure', 'gcp'].every((p) =>
        fs.existsSync(path.join(ROOT, `labs/devsecops/${p}-oidc.md`)),
      );
      ctx.tfDocs = ['aws', 'azure', 'gcp'].map((p) =>
        fs.readFileSync(path.join(ROOT, `labs/${p}/enterprise-finops.tf`), 'utf8'),
      );
    },
  );

  steps.Entonces(
    'LabPage distingue explícitamente Modalidad A, Modalidad B y Modalidad C más Cuaderno Markdown descargable',
    (ctx) => {
      assert.deepEqual(ctx.providerGuideCounts, [18, 18, 18]);
      assert.equal(ctx.oidcExists, true);
      assert.ok(ctx.labPageSource.includes('Modalidad A'));
      assert.ok(ctx.labPageSource.includes('Modalidad B'));
      assert.ok(ctx.labPageSource.includes('Modalidad C'));
      assert.ok(ctx.labPageSource.includes('Cuaderno Markdown'));
      assert.ok(ctx.guidePanelSource.includes('Descargar archivo'));
    },
  );

  steps.Entonces(
    'compose.yaml no expone ningún puerto en 0.0.0.0 e incluye scripts setup, verify y cleanup en PowerShell y Bash',
    (ctx) => {
      assert.ok(!ctx.composeSource.includes('0.0.0.0:'), 'compose.yaml must not bind 0.0.0.0');
      assert.ok(ctx.composeSource.includes('127.0.0.1:8088:8080'));
      assert.ok(ctx.composeSource.includes('internal: true'));
      assert.ok(ctx.kindSource.includes('PodDisruptionBudget'));
      assert.ok(ctx.kindSource.includes('NetworkPolicy'));
      for (const scriptName of [
        'setup.ps1',
        'verify.ps1',
        'cleanup.ps1',
        'setup.sh',
        'verify.sh',
        'cleanup.sh',
      ]) {
        assert.ok(
          fs.existsSync(path.join(ROOT, 'labs/local-sandbox/scripts', scriptName)),
          `Missing ${scriptName}`,
        );
      }
    },
  );

  steps.Entonces(
    'los módulos enterprise-finops.tf fijan required_providers y etiquetas FinOps obligatorias',
    (ctx) => {
      for (const tf of ctx.tfDocs) {
        assert.ok(tf.includes('required_providers'));
        assert.ok(/owner/i.test(tf));
        assert.ok(/environment/i.test(tf));
        assert.ok(/cost_?center/i.test(tf));
        assert.ok(/expires_?at/i.test(tf));
      }
    },
  );

  steps.Dado(
    'que trabajo en un laboratorio con checklist, notas y metadatos por módulo',
    async (ctx) => {
      ctx.labPersistMod = await importTsModule('src/features/labs/libs/labPersistenceAndExport.ts');
      ctx.labMetaMod = await importTsModule('src/data/labMetadata.ts');
      ctx.courseMod = await importTsModule('src/data/course.ts');
    },
  );

  steps.Cuando(
    'persisto pasos marcados, intento guardar un secreto simulado y genero un reporte limpio',
    (ctx) => {
      const {
        labChecklistStorageKey,
        readPersistedLabState,
        serializePersistedLabState,
        buildLabEvidenceMarkdown,
      } = ctx.labPersistMod;

      const key = labChecklistStorageKey('aws', 'networks');
      const raw = serializePersistedLabState({
        checks: [true, false, true, true, false],
        mode: 'local',
      });
      ctx.restoredLab = readPersistedLabState({ [key]: raw }, 'aws', 'networks', 5);

      ctx.fakeAwsKey = ['AK', 'IAIOSFODNN7EXAMPLE'].join('');
      ctx.fakeGhp = ['ghp', '_1234567890abcdefghijklmnopqrstuvwxyzABCD'].join('');
      ctx.fakePem = ['-----BEGIN RSA ', 'PRIVATE KEY-----'].join('');

      ctx.cleanMarkdown = buildLabEvidenceMarkdown({
        moduleId: 'networks',
        moduleTitle: 'Redes y conectividad',
        provider: 'aws',
        providerName: 'Amazon Web Services',
        serviceLabel: 'Amazon VPC',
        modality: 'local',
        tasks: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5'],
        checks: ctx.restoredLab.checks,
        evidenceNotes: 'Validación CIDR 10.42.0.0/16 y cleanup verificado sin cargos.',
        exportedAt: '2026-11-17T23:00:00.000Z',
      });
    },
  );

  steps.Entonces(
    'el checklist y la modalidad se restauran íntegros por proveedor y módulo',
    (ctx) => {
      assert.deepEqual(ctx.restoredLab.checks, [true, false, true, true, false]);
      assert.equal(ctx.restoredLab.mode, 'local');
    },
  );

  steps.Entonces(
    'secretGuard detecta y bloquea claves AWS, API keys, tokens GitHub, llaves privadas y JWTs',
    (ctx) => {
      assert.equal(hasAccidentalSecrets(ctx.fakeAwsKey), true);
      assert.equal(hasAccidentalSecrets(ctx.fakeGhp), true);
      assert.equal(hasAccidentalSecrets(ctx.fakePem), true);
      assert.equal(detectAccidentalSecrets('Notas limpias de ingeniería VPC 10.0.0.0/16').length, 0);
      assert.throws(() =>
        ctx.labPersistMod.buildLabEvidenceMarkdown({
          moduleId: 'networks',
          moduleTitle: 'Redes',
          provider: 'aws',
          providerName: 'AWS',
          serviceLabel: 'VPC',
          modality: 'guided',
          tasks: ['Paso 1'],
          checks: [true],
          evidenceNotes: `Clave pegada por error: ${ctx.fakeAwsKey}`,
        }),
      );
    },
  );

  steps.Entonces(
    'los 18 módulos declaran permisos mínimos, tiempo, costos, post-cleanup y exportan reporte con aviso honesto',
    (ctx) => {
      for (const mod of ctx.courseMod.modules) {
        const meta = ctx.labMetaMod.LAB_METADATA_BY_MODULE[mod.id];
        assert.ok(meta, `Missing lab metadata for ${mod.id}`);
        assert.ok(meta.estimatedMinutes >= 20);
        for (const p of ['aws', 'azure', 'gcp']) {
          assert.ok(meta.minimumPermissions[p].length > 5);
          assert.ok(meta.billableResources[p].length > 10);
          assert.ok(meta.postCleanupChecks[p].length > 10);
        }
      }
      assert.match(ctx.cleanMarkdown, /autodeclarado local, no verificado contra API cloud/i);
    },
  );

  return { steps };
}
