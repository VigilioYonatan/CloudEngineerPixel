import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { importTsModule } from '../../support/loadTsModule.mjs';
import { ROOT_DIR, listSourceFiles } from '../../support/readSourceTree.mjs';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

export function buildF3ComponentsAndStatesBddSteps() {
  const steps = createStepRegistry();

  steps.Dado(
    'el catálogo topológico en src/data/architectureTopologies.ts y el componente src/components/ui/ArchitectureDiagram.tsx',
    async (world) => {
      world.topoDataExists = existsSync(path.join(ROOT_DIR, 'src/data/architectureTopologies.ts'));
      world.topoUiExists = existsSync(
        path.join(ROOT_DIR, 'src/components/ui/ArchitectureDiagram.tsx'),
      );
      world.courseMod = await importTsModule('src/data/course.ts');
      world.seniorMod = await importTsModule('src/data/senior.ts');
      if (world.topoDataExists) {
        world.topoMod = await importTsModule('src/data/architectureTopologies.ts');
      }
    },
  );

  steps.Cuando(
    'se resuelven los diagramas para los 18 módulos curriculares y los 18 casos Senior en AWS, Azure y GCP',
    (world) => {
      assert.equal(world.topoDataExists, true, 'Falta src/data/architectureTopologies.ts');
      assert.equal(world.topoUiExists, true, 'Falta src/components/ui/ArchitectureDiagram.tsx');

      world.moduleTopologies = [];
      world.seniorTopologies = [];
      for (const cloud of ['aws', 'azure', 'gcp']) {
        for (const mod of world.courseMod.modules) {
          world.moduleTopologies.push(world.topoMod.getModuleTopology(mod.id, cloud));
        }
        for (const ch of world.seniorMod.challenges) {
          world.seniorTopologies.push(world.topoMod.getSeniorCaseTopology(ch.id, cloud));
        }
      }
    },
  );

  steps.Entonces(
    'cada topología expone las 4 capas arquitectónicas, servicios específicos del proveedor, figcaption y resumen textual accesible',
    (world) => {
      assert.equal(world.moduleTopologies.length, 54);
      assert.equal(world.seniorTopologies.length, 54);
      for (const topo of [...world.moduleTopologies, ...world.seniorTopologies]) {
        assert.equal(topo.layers.length, 4, `Topología ${topo.id} debe tener 4 capas`);
        assert.ok(topo.caption.length >= 20, `Topología ${topo.id} requiere caption descriptivo`);
        assert.ok(
          topo.accessibleDescription.length >= 30,
          `Topología ${topo.id} requiere descripción accesible`,
        );
      }
      const uiSrc = readFileSync(
        path.join(ROOT_DIR, 'src/components/ui/ArchitectureDiagram.tsx'),
        'utf8',
      );
      assert.match(uiSrc, /<figure\b/);
      assert.match(uiSrc, /<figcaption\b/);
      assert.match(uiSrc, /<svg\b/);
      assert.match(uiSrc, /<title\b/);
      assert.match(uiSrc, /<desc\b/);
    },
  );

  steps.Dado(
    'el parser estructural en src/domain/markdownParser.ts y el componente src/components/ui/MarkdownViewer.tsx',
    async (world) => {
      world.parserExists = existsSync(path.join(ROOT_DIR, 'src/domain/markdownParser.ts'));
      world.viewerExists = existsSync(path.join(ROOT_DIR, 'src/components/ui/MarkdownViewer.tsx'));
      if (world.parserExists) {
        world.parserMod = await importTsModule('src/domain/markdownParser.ts');
      }
    },
  );

  steps.Cuando(
    'se procesan muestras reales de las 54 guías labs y 54 cuadernos Senior junto con payloads hostiles script y javascript URL',
    (world) => {
      assert.equal(world.parserExists, true, 'Falta src/domain/markdownParser.ts');
      assert.equal(world.viewerExists, true, 'Falta src/components/ui/MarkdownViewer.tsx');

      world.labCount = ['aws', 'azure', 'gcp'].reduce(
        (acc, cloud) =>
          acc +
          readdirSync(path.join(ROOT_DIR, 'labs', cloud)).filter((name) => name.endsWith('.md'))
            .length,
        0,
      );
      world.seniorCount = ['aws', 'azure', 'gcp'].reduce(
        (acc, cloud) =>
          acc +
          readdirSync(path.join(ROOT_DIR, 'labs/senior/providers', cloud)).filter((name) =>
            name.endsWith('.md'),
          ).length,
        0,
      );

      const labSample = readFileSync(path.join(ROOT_DIR, 'labs/aws/networks.md'), 'utf8');
      const seniorSample = readFileSync(
        path.join(ROOT_DIR, 'labs/senior/providers/gcp/s01.md'),
        'utf8',
      );
      world.parsedLab = world.parserMod.parseMarkdownBlocks(labSample);
      world.parsedSenior = world.parserMod.parseMarkdownBlocks(seniorSample);

      const hostile = [
        '# Guía con intento XSS <script>window.__xss=1</script>',
        '> [!WARNING] Revisa siempre el plan antes de aplicar.',
        'Enlace malicioso [click](javascript:alert(1)) y seguro [docs](https://cloud.google.com/docs).',
      ].join('\n\n');
      world.parsedHostile = world.parserMod.parseMarkdownBlocks(hostile);
    },
  );

  steps.Entonces(
    'produce bloques tipados para encabezados, tablas, listas, callouts y código neutralizando esquemas peligrosos con cero usos de dangerouslySetInnerHTML o innerHTML',
    (world) => {
      assert.equal(world.labCount, 54);
      assert.equal(world.seniorCount, 54);
      assert.ok(world.parsedLab.some((b) => b.type === 'heading'));
      assert.ok(world.parsedLab.some((b) => b.type === 'code'));
      assert.ok(world.parsedLab.some((b) => b.type === 'table'));
      assert.ok(world.parsedSenior.some((b) => b.type === 'list'));
      assert.ok(world.parsedHostile.some((b) => b.type === 'callout'));

      const paraBlock = world.parsedHostile.find((b) => b.type === 'paragraph');
      assert.ok(paraBlock, 'Debe existir bloque párrafo en muestra hostil');
      const links = paraBlock.inlines.filter((node) => node.type === 'link');
      assert.equal(links.length, 1, 'Solo el enlace https seguro debe convertirse en link');
      assert.equal(links[0].href, 'https://cloud.google.com/docs');

      for (const rel of listSourceFiles('src')) {
        const src = readFileSync(path.join(ROOT_DIR, rel), 'utf8');
        assert.doesNotMatch(
          src,
          /\bdangerouslySetInnerHTML\b|\.innerHTML\s*=/,
          `Sink inseguro detectado en ${rel}`,
        );
      }
    },
  );

  steps.Dado(
    'el componente src/components/mascot/CloudMentor.tsx y los 5 activos originales en public/assets',
    async (world) => {
      world.mentorExists = existsSync(path.join(ROOT_DIR, 'src/components/mascot/CloudMentor.tsx'));
      world.mentorConfigExists = existsSync(
        path.join(ROOT_DIR, 'src/components/mascot/cloudMentor.constants.ts'),
      );
      if (world.mentorConfigExists) {
        world.mentorConstants = await importTsModule(
          'src/components/mascot/cloudMentor.constants.ts',
        );
      }
    },
  );

  steps.Cuando(
    'se auditan las dimensiones intrínsecas reservadas, las coordenadas del sprite de poses y los textos alternativos por nube',
    (world) => {
      assert.equal(world.mentorExists, true, 'Falta src/components/mascot/CloudMentor.tsx');
      assert.equal(
        world.mentorConfigExists,
        true,
        'Falta src/components/mascot/cloudMentor.constants.ts',
      );
      world.expectedAssets = [
        'cloud-mentor-azure.png',
        'cloud-mentor-gcp.png',
        'cloud-mentor-original.jpg',
        'cloud-mentor-poses.png',
        'cloud-mentor-senior.png',
      ];
      world.presentAssets = world.expectedAssets.filter((name) =>
        existsSync(path.join(ROOT_DIR, 'public/assets', name)),
      );
      world.mentorSrc = readFileSync(
        path.join(ROOT_DIR, 'src/components/mascot/CloudMentor.tsx'),
        'utf8',
      );
    },
  );

  steps.Entonces(
    'los 5 archivos de public/assets permanecen intactos y CloudMentor reserva width, height y aspect-ratio explícitos para cada tamaño y pose',
    (world) => {
      assert.deepEqual(world.presentAssets, world.expectedAssets);
      const poses = Object.keys(world.mentorConstants.CLOUD_MENTOR_POSES);
      assert.ok(poses.length >= 15, 'Debe mapear las 15 poses canónicas del sprite');
      for (const requiredPose of ['welcome', 'explaining', 'celebrating', 'thinking', 'incident', 'senior']) {
        assert.ok(poses.includes(requiredPose), `Falta pose ${requiredPose}`);
      }
      assert.match(world.mentorSrc, /width=/);
      assert.match(world.mentorSrc, /height=/);
      assert.match(world.mentorSrc, /aspectRatio|cloud-mentor-stage/);
    },
  );

  steps.Dado(
    'los componentes transversales ProgressBar, AccessibleTabs, BannerStorageError, OfflineIndicator y EmptyState',
    (world) => {
      world.requiredFiles = {
        progressBar: 'src/shared/ui/ProgressBar.tsx',
        tabs: 'src/components/ui/AccessibleTabs.tsx',
        storageBanner: 'src/components/ui/BannerStorageError.tsx',
        offline: 'src/components/ui/OfflineIndicator.tsx',
        empty: 'src/components/ui/EmptyState.tsx',
      };
    },
  );

  steps.Cuando(
    'se inspeccionan sus atributos semánticos WAI-ARIA y manejadores de teclado y red',
    (world) => {
      for (const [key, rel] of Object.entries(world.requiredFiles)) {
        assert.equal(existsSync(path.join(ROOT_DIR, rel)), true, `Falta ${key}: ${rel}`);
      }
      world.progressSrc = readFileSync(path.join(ROOT_DIR, world.requiredFiles.progressBar), 'utf8');
      world.tabsSrc = readFileSync(path.join(ROOT_DIR, world.requiredFiles.tabs), 'utf8');
      world.storageSrc = readFileSync(path.join(ROOT_DIR, world.requiredFiles.storageBanner), 'utf8');
      world.offlineSrc = readFileSync(path.join(ROOT_DIR, world.requiredFiles.offline), 'utf8');
      world.emptySrc = readFileSync(path.join(ROOT_DIR, world.requiredFiles.empty), 'utf8');
    },
  );

  steps.Entonces(
    'ProgressBar declara role progressbar con aria-valuenow/min/max, Tabs usa tablist/tab/aria-selected y los banners anuncian alert o status',
    (world) => {
      assert.match(world.progressSrc, /role="progressbar"/);
      assert.match(world.progressSrc, /aria-valuenow=/);
      assert.match(world.progressSrc, /aria-valuemin=/);
      assert.match(world.progressSrc, /aria-valuemax=/);

      assert.match(world.tabsSrc, /role="tablist"/);
      assert.match(world.tabsSrc, /role="tab"/);
      assert.match(world.tabsSrc, /aria-selected=/);
      assert.match(world.tabsSrc, /ArrowRight/);

      assert.match(world.storageSrc, /role="alert"/);
      assert.match(world.offlineSrc, /role="status"/);
      assert.match(world.emptySrc, /role="status"/);
    },
  );

  steps.Dado(
    'el gestor de preferencias y datos granulares en src/lib/preferencesState.ts y src/lib/granularProgress.ts',
    async (world) => {
      world.prefsExists = existsSync(path.join(ROOT_DIR, 'src/lib/preferencesState.ts'));
      world.granularExists = existsSync(path.join(ROOT_DIR, 'src/lib/granularProgress.ts'));
      if (world.prefsExists) {
        world.prefsMod = await importTsModule('src/lib/preferencesState.ts');
      }
      if (world.granularExists) {
        world.granularMod = await importTsModule('src/lib/granularProgress.ts');
      }
    },
  );

  steps.Cuando(
    'el usuario activa movimiento reducido o limpia únicamente el progreso de Azure o el expediente Senior s01 de AWS',
    (world) => {
      assert.equal(world.prefsExists, true, 'Falta src/lib/preferencesState.ts');
      assert.equal(world.granularExists, true, 'Falta src/lib/granularProgress.ts');

      world.prefsMod.setMotionPreference('reduced');
      world.motionValue = world.prefsMod.motionPreference.value;

      const sampleProgress = {
        schemaVersion: 2,
        updatedAt: '2026-11-16T12:00:00.000Z',
        completed: ['aws:networks:0', 'azure:networks:0', 'gcp:compute:1'],
        quiz: { 'aws:networks': 100, 'azure:networks': 100, 'gcp:compute': 100 },
        senior: ['aws:s01', 'aws:s02', 'azure:s01'],
        notes: {
          'aws:networks:lab': 'Nota lab AWS',
          'azure:networks:lab': 'Nota lab Azure',
          'senior-session:aws:s01': '{"version":1}',
          'senior-session:aws:s02': '{"version":1}',
          'senior-session:azure:s01': '{"version":1}',
        },
        simRuns: 4,
        seniorAttempts: [
          { caseId: 's01', provider: 'aws', correct: true, score: 100, at: '2026-11-16T10:00:00Z', examined: ['primary'] },
          { caseId: 's01', provider: 'azure', correct: true, score: 90, at: '2026-11-16T10:05:00Z', examined: ['primary'] },
        ],
      };

      world.afterAzureClear = world.granularMod.purgeProviderFromProgress(sampleProgress, 'azure');
      world.afterCaseClear = world.granularMod.purgeSeniorCaseFromProgress(
        world.afterAzureClear,
        'aws',
        's01',
      );
    },
  );

  steps.Entonces(
    'data-motion refleja reduced y los datos de AWS, GCP y los demás casos Senior permanecen 100 por ciento intactos',
    (world) => {
      assert.equal(world.motionValue, 'reduced');
      assert.deepEqual(world.afterAzureClear.completed, ['aws:networks:0', 'gcp:compute:1']);
      assert.equal(world.afterAzureClear.quiz['azure:networks'], undefined);
      assert.equal(world.afterAzureClear.quiz['aws:networks'], 100);
      assert.deepEqual(world.afterAzureClear.senior, ['aws:s01', 'aws:s02']);
      assert.equal(world.afterAzureClear.seniorAttempts.length, 1);

      assert.deepEqual(world.afterCaseClear.senior, ['aws:s02']);
      assert.equal(world.afterCaseClear.notes['senior-session:aws:s01'], undefined);
      assert.equal(world.afterCaseClear.notes['senior-session:aws:s02'], '{"version":1}');
      assert.equal(world.afterCaseClear.notes['aws:networks:lab'], 'Nota lab AWS');
    },
  );

  return { steps };
}
