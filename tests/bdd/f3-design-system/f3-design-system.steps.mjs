import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { importTsModule } from '../../support/loadTsModule.mjs';
import { ROOT_DIR, listSourceFiles } from '../../support/readSourceTree.mjs';
import { createStepRegistry } from '../support/gherkinRunner.mjs';

function hexToRgb(hex) {
  const normalized = hex.trim().replace(/^#/, '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : normalized;
  const num = Number.parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function relativeLuminance([r, g, b]) {
  const channel = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(fgHex, bgHex) {
  const l1 = relativeLuminance(hexToRgb(fgHex));
  const l2 = relativeLuminance(hexToRgb(bgHex));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function extractCssBlockVariables(css, selectorPattern) {
  const vars = {};
  const regex = new RegExp(`${selectorPattern}\\s*\\{([^}]+)\\}`, 'g');
  for (const match of css.matchAll(regex)) {
    for (const decl of match[1].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
      vars[decl[1].trim()] = decl[2].trim();
    }
  }
  return vars;
}

function resolveCssVar(value, map, depth = 0) {
  if (!value || depth > 6) return value;
  const varMatch = value.match(/^var\(\s*(--[a-z0-9-]+)(?:\s*,\s*([^)]+))?\s*\)$/i);
  if (!varMatch) return value;
  const target = map[varMatch[1]] ?? varMatch[2]?.trim();
  return resolveCssVar(target, map, depth + 1);
}

export function resolveThemeMatrix(tokensCss) {
  const base = extractCssBlockVariables(tokensCss, ':root(?![\\[:])');
  const lightBase = extractCssBlockVariables(tokensCss, ':root\\[data-theme="light"\\]');
  const matrix = {};

  for (const cloud of ['aws', 'azure', 'gcp']) {
    const darkCloud =
      cloud === 'aws'
        ? extractCssBlockVariables(tokensCss, ':root\\[data-provider="aws"\\]')
        : extractCssBlockVariables(tokensCss, `:root\\[data-provider="${cloud}"\\]`);
    const lightCloud = extractCssBlockVariables(
      tokensCss,
      `:root\\[data-theme="light"\\]\\[data-provider="${cloud}"\\]`,
    );

    const rawDark = { ...base, ...darkCloud };
    const rawLight = { ...base, ...darkCloud, ...lightBase, ...lightCloud };

    const resolvedDark = {};
    for (const key of Object.keys(rawDark)) {
      resolvedDark[key] = resolveCssVar(rawDark[key], rawDark);
    }
    const resolvedLight = {};
    for (const key of Object.keys(rawLight)) {
      resolvedLight[key] = resolveCssVar(rawLight[key], rawLight);
    }

    matrix[`${cloud}:dark`] = resolvedDark;
    matrix[`${cloud}:light`] = resolvedLight;
  }

  return matrix;
}

export function buildF3DesignSystemBddSteps() {
  const steps = createStepRegistry();

  steps.Dado('el archivo de tokens src/design-system/tokens.css importado por la aplicación', (world) => {
    const tokensPath = path.join(ROOT_DIR, 'src/design-system/tokens.css');
    world.tokensExists = existsSync(tokensPath);
    world.tokensCss = world.tokensExists ? readFileSync(tokensPath, 'utf8') : '';
    world.mainTsx = readFileSync(path.join(ROOT_DIR, 'src/main.tsx'), 'utf8');
    world.stylesCss = readFileSync(path.join(ROOT_DIR, 'src/styles.css'), 'utf8');
  });

  steps.Cuando(
    'se calculan las relaciones de contraste WCAG 2.2 para AWS, Azure y GCP en modos dark y light',
    (world) => {
      assert.equal(world.tokensExists, true, 'Falta src/design-system/tokens.css');
      assert.ok(
        world.mainTsx.includes('./design-system/tokens.css') ||
          world.stylesCss.includes('./design-system/tokens.css'),
        'tokens.css debe importarse en main.tsx o styles.css',
      );
      world.matrix = resolveThemeMatrix(world.tokensCss);
      world.contrastFailures = [];

      for (const [combo, vars] of Object.entries(world.matrix)) {
        const surfaces = ['--bg', '--surface', '--surface2', '--surface3'];
        const textTokens = [
          '--text',
          '--muted',
          '--accent-text',
          '--gold-text',
          '--green-text',
          '--red-text',
        ];
        for (const sKey of surfaces) {
          const bg = vars[sKey];
          assert.ok(bg?.startsWith('#'), `Falta superficie hexadecimal ${sKey} en ${combo}`);
          for (const tKey of textTokens) {
            const fg = vars[tKey];
            assert.ok(fg?.startsWith('#'), `Falta token de texto hexadecimal ${tKey} en ${combo}`);
            const ratio = contrastRatio(fg, bg);
            if (ratio < 4.5) {
              world.contrastFailures.push(`${combo} ${tKey} (${fg}) sobre ${sKey} (${bg}) = ${ratio.toFixed(2)}:1`);
            }
          }
        }
        const btnRatio = contrastRatio(vars['--on-accent'], vars['--accent']);
        if (btnRatio < 4.5) {
          world.contrastFailures.push(`${combo} --on-accent sobre --accent = ${btnRatio.toFixed(2)}:1`);
        }
        const controlBorderRatio = contrastRatio(vars['--border-strong'], vars['--surface']);
        if (controlBorderRatio < 3.0) {
          world.contrastFailures.push(
            `${combo} --border-strong sobre --surface = ${controlBorderRatio.toFixed(2)}:1`,
          );
        }
      }
    },
  );

  steps.Entonces(
    'cada combinación alcanza al menos 4.5 a 1 en texto semántico y al menos 3.0 a 1 en bordes y controles interactivos',
    (world) => {
      assert.equal(Object.keys(world.matrix).length, 6);
      assert.deepEqual(
        world.contrastFailures,
        [],
        `Violaciones WCAG 2.2 AA detectadas:\n${world.contrastFailures.join('\n')}`,
      );
    },
  );

  steps.Dado('el encabezado responsivo en src/app/AppHeader.tsx y las hojas de estilo del sistema', (world) => {
    world.headerSrc = readFileSync(path.join(ROOT_DIR, 'src/app/AppHeader.tsx'), 'utf8');
    world.combinedCss = [
      existsSync(path.join(ROOT_DIR, 'src/design-system/tokens.css'))
        ? readFileSync(path.join(ROOT_DIR, 'src/design-system/tokens.css'), 'utf8')
        : '',
      readFileSync(path.join(ROOT_DIR, 'src/styles.css'), 'utf8'),
    ].join('\n');
  });

  steps.Cuando('se inspecciona la estructura del cajón móvil para viewports de 320px y 390px', (world) => {
    world.hasAriaExpanded = /aria-expanded=\{(?:mobileMenu\.value|isMenuOpen)\}/.test(world.headerSrc);
    world.hasAriaControls = /aria-controls="primary-navigation"/.test(world.headerSrc);
    world.hasDrawerUtilities = /mobile-drawer-utilities/.test(world.headerSrc);
    world.hasTapTargetToken = /44px/.test(world.combinedCss);
    world.hasScrollLock = /document\.body\.style\.overflow/.test(world.headerSrc);
  });

  steps.Entonces(
    'el menú móvil expone controles accesibles de Tema, Configuración, Mapa, Laboratorios y Proyectos con tamaño mínimo táctil de 44px y cierre con Escape',
    (world) => {
      assert.equal(world.hasAriaExpanded, true, 'Falta aria-expanded en el botón de menú móvil');
      assert.equal(world.hasAriaControls, true, 'Falta aria-controls="primary-navigation"');
      assert.equal(
        world.hasDrawerUtilities,
        true,
        'Falta bloque mobile-drawer-utilities para Tema y Configuración en móvil',
      );
      assert.equal(world.hasTapTargetToken, true, 'Falta mínimo táctil de 44px en estilos móviles');
      assert.equal(world.hasScrollLock, true, 'Falta bloqueo limpio de scroll del fondo al abrir el cajón');
      for (const label of ['Mapa', 'Laboratorios', 'Proyectos', 'Configuración']) {
        assert.match(world.headerSrc, new RegExp(label));
      }
    },
  );

  steps.Dado('el estado reactivo de confirmación y el componente src/components/ui/ConfirmDialog.tsx', async (world) => {
    world.dialogComponentExists = existsSync(
      path.join(ROOT_DIR, 'src/components/ui/ConfirmDialog.tsx'),
    );
    world.dialogStateExists = existsSync(path.join(ROOT_DIR, 'src/lib/confirmDialogState.ts'));
    if (world.dialogStateExists) {
      world.dialogStateMod = await importTsModule('src/lib/confirmDialogState.ts');
    }
  });

  steps.Cuando(
    'se solicita confirmación para acciones destructivas o sobrescrituras y se audita todo el árbol src',
    async (world) => {
      assert.equal(world.dialogComponentExists, true, 'Falta src/components/ui/ConfirmDialog.tsx');
      assert.equal(world.dialogStateExists, true, 'Falta src/lib/confirmDialogState.ts');

      world.nativeConfirmHits = [];
      for (const rel of listSourceFiles('src')) {
        const src = readFileSync(path.join(ROOT_DIR, rel), 'utf8');
        if (/\bwindow\.confirm\s*\(|\b(?<!request)confirm\s*\(/.test(src)) {
          world.nativeConfirmHits.push(rel);
        }
      }

      const { requestConfirm, resolveActiveConfirm, activeConfirmRequest } = world.dialogStateMod;
      const acceptPromise = requestConfirm({
        title: 'Reiniciar progreso local',
        description: '¿Eliminar todo tu progreso local?',
        impactSummary: 'Se borrarán 12 unidades y 2 casos Senior.',
        confirmLabel: 'Reiniciar ahora',
        tone: 'danger',
      });
      assert.equal(activeConfirmRequest.value?.title, 'Reiniciar progreso local');
      resolveActiveConfirm(true);
      world.acceptedOutcome = await acceptPromise;

      const cancelPromise = requestConfirm({
        title: 'Sobrescribir progreso global',
        description: '¿Reemplazar progreso actual?',
        tone: 'warning',
      });
      resolveActiveConfirm(false);
      world.cancelledOutcome = await cancelPromise;
    },
  );

  steps.Entonces(
    'no existe ninguna llamada a window.confirm o confirm nativo en src y el estado resuelve confirmación o cancelación de forma determinista',
    (world) => {
      assert.deepEqual(
        world.nativeConfirmHits,
        [],
        `Aún existen llamadas nativas a confirm() en: ${world.nativeConfirmHits.join(', ')}`,
      );
      assert.equal(world.acceptedOutcome, true);
      assert.equal(world.cancelledOutcome, false);
      const dialogSrc = readFileSync(
        path.join(ROOT_DIR, 'src/components/ui/ConfirmDialog.tsx'),
        'utf8',
      );
      assert.match(dialogSrc, /role="alertdialog"/);
      assert.match(dialogSrc, /aria-modal="true"/);
    },
  );

  steps.Dado(
    'el clasificador de riesgo en src/domain/commandRisk.ts y el componente src/components/ui/CodeBlock.tsx',
    async (world) => {
      world.riskExists = existsSync(path.join(ROOT_DIR, 'src/domain/commandRisk.ts'));
      world.codeBlockExists = existsSync(path.join(ROOT_DIR, 'src/components/ui/CodeBlock.tsx'));
      if (world.riskExists) {
        world.riskMod = await importTsModule('src/domain/commandRisk.ts');
      }
    },
  );

  steps.Cuando(
    'se evalúan comandos de consulta, aprovisionamiento y destrucción en AWS, Azure, GCP y Terraform',
    (world) => {
      assert.equal(world.riskExists, true, 'Falta src/domain/commandRisk.ts');
      assert.equal(world.codeBlockExists, true, 'Falta src/components/ui/CodeBlock.tsx');
      const { analyzeCommandSnippet } = world.riskMod;
      world.readSample = analyzeCommandSnippet('aws ec2 describe-instances --region us-east-1');
      world.costSample = analyzeCommandSnippet('terraform apply -var="env=lab"');
      world.destroySample = analyzeCommandSnippet('terraform destroy -var="env=lab"');
      world.yamlSample = analyzeCommandSnippet('apiVersion: apps/v1\nkind: Deployment');
    },
  );

  steps.Entonces(
    'clasifica exactamente SOLO LECTURA, CREA RECURSOS / COSTO y DESTRUCTIVO / REQUIERE PLAN junto con el lenguaje detectado',
    (world) => {
      assert.equal(world.readSample.riskLabel, 'SOLO LECTURA');
      assert.equal(world.readSample.language, 'bash');
      assert.equal(world.costSample.riskLabel, 'CREA RECURSOS / COSTO');
      assert.equal(world.destroySample.riskLabel, 'DESTRUCTIVO / REQUIERE PLAN');
      assert.equal(world.yamlSample.language, 'yaml');
    },
  );

  steps.Dado(
    'el catálogo comparativo en src/data/multicloudComparison.ts y el componente src/components/ui/CloudServiceComparison.tsx',
    async (world) => {
      world.compDataExists = existsSync(path.join(ROOT_DIR, 'src/data/multicloudComparison.ts'));
      world.compUiExists = existsSync(
        path.join(ROOT_DIR, 'src/components/ui/CloudServiceComparison.tsx'),
      );
      world.courseMod = await importTsModule('src/data/course.ts');
      if (world.compDataExists) {
        world.compMod = await importTsModule('src/data/multicloudComparison.ts');
      }
    },
  );

  steps.Cuando(
    'se consulta la comparativa multicloud para cada uno de los 18 módulos del currículo',
    (world) => {
      assert.equal(world.compDataExists, true, 'Falta src/data/multicloudComparison.ts');
      assert.equal(world.compUiExists, true, 'Falta src/components/ui/CloudServiceComparison.tsx');
      world.comparisons = world.courseMod.modules.map((mod) => ({
        moduleId: mod.id,
        entry: world.compMod.getModuleMulticloudComparison(mod.id),
      }));
    },
  );

  steps.Entonces(
    'cada módulo presenta datos específicos de AWS, Azure y GCP incluyendo jerarquía, permisos, facturación y advertencia explícita de no equivalencia',
    (world) => {
      assert.equal(world.comparisons.length, 18);
      for (const { moduleId, entry } of world.comparisons) {
        assert.ok(entry, `Falta comparativa para ${moduleId}`);
        assert.ok(entry.nonEquivalence.length >= 40, `No-equivalencia demasiado corta en ${moduleId}`);
        for (const cloud of ['aws', 'azure', 'gcp']) {
          const spec = entry.providers[cloud];
          assert.ok(spec.service.length >= 3, `${moduleId} ${cloud} sin servicio`);
          assert.ok(spec.hierarchy.length >= 15, `${moduleId} ${cloud} sin jerarquía`);
          assert.ok(spec.iamModel.length >= 15, `${moduleId} ${cloud} sin modelo IAM`);
          assert.ok(spec.billingModel.length >= 15, `${moduleId} ${cloud} sin modelo de cobro`);
        }
      }
    },
  );

  return { steps };
}
