import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { importTsModule } from '../../support/loadTsModule.mjs';
import { ROOT_DIR } from '../../support/readSourceTree.mjs';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

export function buildF2CompletionBddSteps() {
  const steps = createStepRegistry();

  steps.Dado(
    'el catálogo de proyectos en src/features/projects y el generador buildPortfolioAdrMarkdown',
    async (world) => {
      assert.equal(
        existsSync(path.join(ROOT_DIR, 'src/features/projects/pages/ProjectsPage.tsx')),
        true,
        'Falta src/features/projects/pages/ProjectsPage.tsx',
      );
      world.projectsConst = await importTsModule(
        'src/features/projects/constants/projects.constants.ts',
      );
      world.projectsMd = await importTsModule(
        'src/features/projects/libs/buildPortfolioMarkdown.ts',
      );
    },
  );

  steps.Cuando(
    'se inspeccionan los 3 proyectos curriculares y se genera la plantilla Markdown para AWS',
    (world) => {
      world.projects = world.projectsConst.PORTFOLIO_PROJECTS;
      const capstone = world.projects[2];
      world.generatedMd = world.projectsMd.buildPortfolioAdrMarkdown({
        project: capstone,
        cloudId: 'aws',
        checkedDeliverables: [capstone.deliverables[0]],
        adrNotes: 'Elegimos arquitectura regional multi-AZ con RDS Multi-AZ y presupuesto TCO medido.',
        exportedAt: '2026-11-16T21:00:00.000Z',
      });
    },
  );

  steps.Entonces(
    'existen Proyecto 1, Proyecto 2 y Proyecto 3 Capstone con rúbricas de 100 puntos y plantilla ADR descargable',
    (world) => {
      assert.equal(world.projects.length, 3);
      for (const proj of world.projects) {
        const weight_sum = proj.rubric.reduce((sum, r) => sum + r.weight, 0);
        assert.equal(weight_sum, 100, `Rúbrica de ${proj.id} no suma 100%`);
        assert.ok(proj.deliverables.length >= 6);
      }
      assert.match(world.generatedMd, /# ADR \/ Portfolio — Proyecto 3/);
      assert.match(world.generatedMd, /Threat Model/i);
      assert.match(world.generatedMd, /RTO\/RPO/i);
      assert.match(world.generatedMd, /\[x\]/);
    },
  );

  steps.Dado('las secciones de src/features/about y el componente AppFooter', async (world) => {
    assert.equal(
      existsSync(path.join(ROOT_DIR, 'src/features/about/pages/AboutPage.tsx')),
      true,
      'Falta src/features/about/pages/AboutPage.tsx',
    );
    world.aboutConst = await importTsModule('src/features/about/constants/about.constants.ts');
    world.footerSrc = readFileSync(path.join(ROOT_DIR, 'src/app/AppFooter.tsx'), 'utf8');
  });

  steps.Cuando(
    'se auditan los enlaces del pie de página y el contenido de las 4 secciones informativas',
    (world) => {
      world.sectionIds = world.aboutConst.ABOUT_SECTIONS.map((s) => s.id);
    },
  );

  steps.Entonces(
    'AppFooter enlaza a Metodología, Seguridad Cloud, Privacidad y No afiliación y AboutPage expone límites honestos',
    (world) => {
      assert.deepEqual(world.sectionIds, [
        'metodologia',
        'seguridad-cloud',
        'privacidad',
        'no-afiliacion',
      ]);
      for (const label of ['Metodología', 'Seguridad Cloud', 'Privacidad', 'No afiliación']) {
        assert.match(world.footerSrc, new RegExp(label));
      }
    },
  );

  steps.Dado('el router mejorado en src/app/router.ts y el componente RouteRecoveryState', async (world) => {
    assert.equal(
      existsSync(path.join(ROOT_DIR, 'src/shared/ui/RouteRecoveryState.tsx')),
      true,
      'Falta src/shared/ui/RouteRecoveryState.tsx',
    );
    world.router = await importTsModule('src/app/router.ts');
  });

  steps.Cuando(
    'se evalúan hashes rotos como aula inexistente, índice fuera de rango o caso Senior s99',
    (world) => {
      world.badModule = world.router.parseHashRoute('#/aula/no-existe');
      world.badUnit = world.router.parseHashRoute('#/aula/networks/99');
      world.badSenior = world.router.parseHashRoute('#/senior/s99');
      world.badRoot = world.router.parseHashRoute('#/ruta-desconocida');
    },
  );

  steps.Entonces(
    'el router devuelve diagnósticos de recuperación accionables hacia Inicio o el catálogo correspondiente',
    (world) => {
      assert.ok(world.badModule?.routeRecovery, 'Falta routeRecovery en #/aula/no-existe');
      assert.equal(world.badModule.routeRecovery.suggestedView, 'learn');
      assert.ok(world.badUnit?.routeRecovery, 'Falta routeRecovery en #/aula/networks/99');
      assert.equal(world.badUnit.routeRecovery.suggestedView, 'lesson');
      assert.ok(world.badSenior?.routeRecovery, 'Falta routeRecovery en #/senior/s99');
      assert.equal(world.badSenior.routeRecovery.suggestedView, 'senior');
      assert.ok(world.badRoot?.routeRecovery, 'Falta routeRecovery en #/ruta-desconocida');
      assert.equal(world.badRoot.routeRecovery.suggestedView, 'home');
    },
  );

  steps.Dado('el resolutor resolveResumeTarget y el componente FirstVisitOnboardingCard', async (world) => {
    assert.equal(
      existsSync(path.join(ROOT_DIR, 'src/features/home/components/FirstVisitOnboardingCard.tsx')),
      true,
      'Falta src/features/home/components/FirstVisitOnboardingCard.tsx',
    );
    world.resumeMod = await importTsModule('src/domain/resumeLearning.ts');
  });

  steps.Cuando(
    'un alumno visita sin proveedor previo o registra avance parcial en una unidad específica',
    (world) => {
      world.freshResume = world.resumeMod.resolveResumeTarget(null, [], 'aws');
      world.exactPending = world.resumeMod.resolveResumeTarget(
        { moduleId: 'networks', unitIndex: 2 },
        ['aws:networks:0', 'aws:networks:1'],
        'aws',
      );
      world.autoAdvanced = world.resumeMod.resolveResumeTarget(
        { moduleId: 'networks', unitIndex: 2 },
        ['aws:networks:0', 'aws:networks:1', 'aws:networks:2'],
        'aws',
      );
    },
  );

  steps.Entonces(
    'el onboarding guía la elección inicial sin bloquear y el CTA reanuda la lección exacta pendiente',
    (world) => {
      assert.equal(world.freshResume, null);
      assert.equal(world.exactPending?.moduleId, 'networks');
      assert.equal(world.exactPending?.unitIndex, 2);
      assert.equal(world.autoAdvanced?.moduleId, 'networks');
      assert.equal(world.autoAdvanced?.unitIndex, 3);
    },
  );

  steps.Dado(
    'el coordinador createContextSwitchCoordinator en src/lib/contextSwitchGuard.ts',
    async (world) => {
      assert.equal(
        existsSync(path.join(ROOT_DIR, 'src/lib/contextSwitchGuard.ts')),
        true,
        'Falta src/lib/contextSwitchGuard.ts',
      );
      world.guardMod = await importTsModule('src/lib/contextSwitchGuard.ts');
    },
  );

  steps.Cuando(
    'existe un borrador sucio en AWS o una importación activa y se solicita conmutar a Azure',
    (world) => {
      const coordinator = world.guardMod.createContextSwitchCoordinator();
      world.flushedScopes = [];
      let dirty = true;
      coordinator.registerFlusher({
        id: 'lab-editor',
        scopeLabel: 'AWS',
        isDirty: () => dirty,
        flush: () => {
          dirty = false;
          world.flushedScopes.push('aws:networks:lab');
        },
      });
      world.draftSwitchResult = coordinator.prepareContextSwitch(() => true);

      const finish_import = coordinator.beginAsyncImport();
      world.blockedImportSwitch = coordinator.prepareContextSwitch(() => false);
      world.confirmedImportSwitch = coordinator.prepareContextSwitch(() => true);
      finish_import();
    },
  );

  steps.Entonces(
    'el borrador se persiste atómicamente en AWS sin contaminar Azure y la importación en vuelo exige confirmación',
    (world) => {
      assert.equal(world.draftSwitchResult.allowed, true);
      assert.equal(world.draftSwitchResult.flushedCount, 1);
      assert.deepEqual(world.flushedScopes, ['aws:networks:lab']);
      assert.equal(world.blockedImportSwitch.allowed, false);
      assert.equal(world.confirmedImportSwitch.allowed, true);
    },
  );

  return { steps };
}
