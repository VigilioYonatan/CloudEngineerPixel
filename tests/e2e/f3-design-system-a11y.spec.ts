import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { createSeniorCheckpoint } from '../../src/lib/seniorCheckpoint.mjs';
import { emptySeniorSession } from '../../src/lib/seniorSession.mjs';

test('F3-01 E2E: axe-core color-contrast passes with 0 violations across all 6 (AWS, Azure, GCP) x (Dark, Light) combinations', async ({
  page,
}) => {
  const clouds = ['aws', 'azure', 'gcp'] as const;
  const themes = ['dark', 'light'] as const;

  for (const cloud of clouds) {
    for (const mode of themes) {
      await page.goto(`/?cloud=${cloud}#/`);
      await page.evaluate((selectedTheme) => {
        localStorage.setItem('cea:theme', JSON.stringify(selectedTheme));
        localStorage.setItem('cea:onboarded', '1');
      }, mode);
      await page.reload();

      await expect(page.locator('html')).toHaveAttribute('data-provider', cloud);
      await expect(page.locator('html')).toHaveAttribute('data-theme', mode);

      const homeScan = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
      expect(
        homeScan.violations,
        `Home color-contrast violations on ${cloud}/${mode}: ${JSON.stringify(homeScan.violations)}`,
      ).toEqual([]);

      await page.goto(`/?cloud=${cloud}#/aula/networks/1`);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
      const lessonScan = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
      expect(
        lessonScan.violations,
        `Lesson color-contrast violations on ${cloud}/${mode}: ${JSON.stringify(lessonScan.violations)}`,
      ).toEqual([]);
    }
  }
});

test('F3-02 E2E: mobile drawer on 320x640 and 390x844 exposes Theme, Settings, Labs, Map & Projects with >=44px tap targets and 0 horizontal overflow', async ({
  page,
}) => {
  for (const viewport of [
    { width: 320, height: 640 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/?cloud=aws#/');

    const overflowClosed = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflowClosed, `Horizontal overflow at ${viewport.width}px`).toBeLessThanOrEqual(0);

    const menuToggle = page.getByRole('button', { name: 'Abrir menú' });
    await expect(menuToggle).toBeVisible();
    const toggleBox = await menuToggle.boundingBox();
    expect(toggleBox?.width).toBeGreaterThanOrEqual(44);
    expect(toggleBox?.height).toBeGreaterThanOrEqual(44);

    await menuToggle.click();
    const nav = page.getByRole('navigation', { name: 'Navegación principal' });
    await expect(nav).toBeVisible();

    for (const itemName of ['Mapa', 'Laboratorios', 'Proyectos', 'Configuración']) {
      const btn = nav.getByRole('button', { name: new RegExp(itemName, 'i') });
      await expect(btn).toBeVisible();
      const box = await btn.boundingBox();
      expect(box?.height, `${itemName} tap height at ${viewport.width}px`).toBeGreaterThanOrEqual(44);
    }

    const themeBtn = nav.getByRole('button', { name: /Modo claro|Modo oscuro/i });
    await expect(themeBtn).toBeVisible();
    const initialTheme = await page.locator('html').getAttribute('data-theme');
    await themeBtn.click();
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', initialTheme || 'dark');

    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeVisible();

    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await nav.getByRole('button', { name: /Configuración/i }).click();
    await expect(page).toHaveURL(/#\/ajustes$/);
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeVisible();
  }
});

test('F3-03 E2E: ConfirmDialog traps Tab focus, cancels with Escape restoring focus, and confirms progress reset & Senior checkpoint restore', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'cea:progress',
      JSON.stringify({
        schemaVersion: 2,
        completed: ['aws:networks:0'],
        quiz: {},
        senior: [],
        notes: {},
        simRuns: 1,
        seniorAttempts: [],
      }),
    );
  });

  await page.goto('/?cloud=aws#/progreso');
  const resetTrigger = page.getByRole('button', { name: /Reiniciar progreso/i });
  await resetTrigger.click();

  const dialog = page.getByRole('alertdialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(/Eliminar todo tu progreso local/i);

  // Focus trap: Tab cycles only inside alertdialog
  await page.keyboard.press('Tab');
  const activeInsideDialog = await page.evaluate(() =>
    Boolean(document.activeElement?.closest('[role="alertdialog"]')),
  );
  expect(activeInsideDialog).toBe(true);

  // Escape cancels and restores focus to trigger button without wiping progress
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(resetTrigger).toBeFocused();
  await expect(page.locator('.progress-cards')).toContainText('1');

  // Confirming executes the reset
  await resetTrigger.click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: /Reiniciar|Eliminar/i }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.locator('.progress-cards').locator('strong').first()).toContainText('0/');

  // Senior checkpoint restore uses accessible ConfirmDialog too
  const checkpoint = createSeniorCheckpoint(
    'aws',
    's01',
    {
      ...emptySeniorSession(),
      stage: 'informe',
      inspected: ['primary', 'secondary'],
      answers: {
        cause: 'Causa restaurada con diálogo accesible',
        mitigation: 'Mitigación verificada',
        rollback: 'Rollback documentado',
        validation: 'Validación completada',
      },
    },
    '2026-11-16T12:00:00.000Z',
  );

  await page.goto('/?cloud=aws#/senior/s01');
  await page.getByLabel('Importar expediente JSON').setInputFiles({
    name: 'senior-aws-s01.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(checkpoint)),
  });
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await page
    .getByRole('alertdialog')
    .getByRole('button', { name: /Restaurar|Confirmar/i })
    .click();
  await expect(page.getByText(/Borrador Senior restaurado/)).toBeVisible();
});

test('F3-04 & F3-05 E2E: CodeBlock shows risk badges + aria-live copy and CloudServiceComparison adapts from desktop 3-col to 320px accordion', async ({
  page,
}) => {
  await page.goto('/?cloud=gcp#/aula/networks/1');

  const codeBlock = page.locator('.code-block').first();
  await expect(codeBlock).toBeVisible();
  await expect(codeBlock).toContainText('SOLO LECTURA');
  await expect(codeBlock).toContainText('BASH');

  await codeBlock.getByRole('button', { name: /Copiar/i }).click();
  await expect(codeBlock.locator('[aria-live="polite"]')).toContainText(/copiado|manualmente/i);

  const comparison = page.getByRole('region', { name: /Comparativa arquitectónica multicloud/i });
  await expect(comparison).toBeVisible();
  await expect(comparison).toContainText('Amazon VPC');
  await expect(comparison).toContainText('Azure Virtual Network');
  await expect(comparison).toContainText('Google Cloud VPC');
  await expect(comparison).toContainText(/Qué NO es equivalente/i);

  // Switch to 320px viewport: verify zero horizontal overflow and operable mobile disclosures
  await page.setViewportSize({ width: 320, height: 640 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);

  const awsToggle = comparison.getByRole('button', { name: /Amazon Web Services|AWS/i });
  await awsToggle.click();
  await expect(comparison).toContainText('Amazon VPC');

  // Verify destructive and cost badges in Real Account Lab guide
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/?cloud=aws#/labs/networks');
  await page.getByRole('tab', { name: /Práctica en cuenta real/i }).click();
  await expect(page.getByText('CREA RECURSOS / COSTO').first()).toBeVisible();
  await expect(page.getByText('DESTRUCTIVO / REQUIERE PLAN').first()).toBeVisible();
});
