import { expect, test } from '@playwright/test';

test('F3-06 & F3-07 E2E: Lesson renders accessible SVG ArchitectureDiagram and Lab renders full Markdown guide safely with CodeBlock risk badges', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/aula/networks/1');

  const diagramFigure = page.locator('figure.arch-diagram-figure');
  await expect(diagramFigure).toBeVisible();
  await expect(diagramFigure.locator('svg[role="img"]')).toBeVisible();
  await expect(diagramFigure.locator('figcaption')).toContainText(/Amazon VPC|topología/i);

  // Switch provider to GCP: diagram adapts dynamically to Google Cloud VPC
  await page.getByRole('combobox', { name: 'Seleccionar proveedor cloud' }).selectOption('gcp');
  await expect(diagramFigure).toContainText(/Google Cloud VPC|Cloud Armor|Global/i);

  // Navigate to Lab and open inline MarkdownViewer tab
  await page.goto('/?cloud=aws#/labs/networks');
  await page.getByRole('tab', { name: /Cuaderno Markdown/i }).click();
  const viewer = page.locator('.markdown-viewer');
  await expect(viewer).toBeVisible();
  await expect(viewer.getByRole('heading', { name: /Laboratorio: Redes y conectividad/i })).toBeVisible();
  await expect(viewer.locator('table')).toBeVisible();
  await expect(viewer.locator('.code-block')).toContainText('SOLO LECTURA');
});

test('F3-08 E2E: CloudMentor maintains CLS < 0.02 when switching AWS -> Azure -> GCP on Home Hero', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem('cea:onboarded', '1');
  });
  await page.goto('/?cloud=aws#/');

  const mentorBoxBefore = await page.locator('.cloud-mentor-stage').first().boundingBox();
  expect(mentorBoxBefore).not.toBeNull();

  // Observe layout shifts while switching across all 3 providers
  await page.evaluate(() => {
    (window as unknown as { __clsTotal: number }).__clsTotal = 0;
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as Array<PerformanceEntry & { value?: number; hadRecentInput?: boolean }>) {
        if (!entry.hadRecentInput && typeof entry.value === 'number') {
          (window as unknown as { __clsTotal: number }).__clsTotal += entry.value;
        }
      }
    });
    obs.observe({ type: 'layout-shift', buffered: false });
  });

  const switcher = page.getByRole('combobox', { name: 'Seleccionar proveedor cloud' });
  await switcher.selectOption('azure');
  await expect(page.locator('html')).toHaveAttribute('data-provider', 'azure');
  const boxAzure = await page.locator('.cloud-mentor-stage').first().boundingBox();

  await switcher.selectOption('gcp');
  await expect(page.locator('html')).toHaveAttribute('data-provider', 'gcp');
  const boxGcp = await page.locator('.cloud-mentor-stage').first().boundingBox();

  expect(boxAzure?.width).toBe(mentorBoxBefore?.width);
  expect(boxAzure?.height).toBe(mentorBoxBefore?.height);
  expect(boxGcp?.width).toBe(mentorBoxBefore?.width);
  expect(boxGcp?.height).toBe(mentorBoxBefore?.height);

  const clsScore = await page.evaluate(() => (window as unknown as { __clsTotal: number }).__clsTotal);
  expect(clsScore).toBeLessThan(0.02);
});

test('F3-09 E2E: ProgressBar ARIA, AccessibleTabs keyboard arrow navigation, OfflineIndicator and EmptyState work end-to-end', async ({
  context,
  page,
}) => {
  await page.goto('/?cloud=aws#/aprender');

  // ProgressBar exposes role="progressbar" and numeric ARIA attributes
  const firstProgressBar = page.getByRole('progressbar').first();
  await expect(firstProgressBar).toBeVisible();
  await expect(firstProgressBar).toHaveAttribute('aria-valuemin', '0');
  await expect(firstProgressBar).toHaveAttribute('aria-valuemax', '5');

  // AccessibleTabs supports ArrowRight keyboard navigation
  const tabList = page.getByRole('tablist').first();
  const firstTab = tabList.getByRole('tab').first();
  await firstTab.focus();
  await page.keyboard.press('ArrowRight');
  const secondTab = tabList.getByRole('tab').nth(1);
  await expect(secondTab).toHaveAttribute('aria-selected', 'true');

  // EmptyState with CloudMentor recovery
  await page.getByLabel('Buscar módulos').fill('inexistente-xyz-999');
  const emptyState = page.locator('.empty-state');
  await expect(emptyState).toBeVisible();
  await emptyState.getByRole('button', { name: /Restablecer filtros/i }).click();
  await expect(page.locator('.module-card').first()).toBeVisible();

  // OfflineIndicator appears discreetly when network drops and clears when back online
  await context.setOffline(true);
  await expect(page.locator('.offline-indicator')).toBeVisible();
  await expect(page.locator('.offline-indicator')).toContainText(/Sin conexión|100% local/i);
  await context.setOffline(false);
  await expect(page.locator('.offline-indicator')).toHaveCount(0);
});

test('F3-10 E2E: SettingsPage toggles reduced motion (data-motion="reduced") and resets a single cloud without wiping others', async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem('seeded_f3_10')) {
      localStorage.setItem(
        'cea:progress',
        JSON.stringify({
          schemaVersion: 2,
          completed: ['aws:networks:0', 'azure:networks:0'],
          quiz: { 'aws:networks': 100, 'azure:networks': 100 },
          senior: ['aws:s01', 'azure:s01'],
          notes: {},
          simRuns: 2,
          seniorAttempts: [],
        }),
      );
      sessionStorage.setItem('seeded_f3_10', '1');
    }
  });

  await page.goto('/?cloud=aws#/ajustes');

  // Toggle Reduced Motion
  await page.getByRole('button', { name: /Reducir animaciones/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');

  // Granular reset of Azure only, keeping AWS intact
  await page.getByRole('button', { name: /Reiniciar solo Microsoft Azure|Reiniciar Azure/i }).click();
  const dialog = page.getByRole('alertdialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: /Reiniciar Azure/i }).click();

  const remainingCompleted = await page.evaluate(() => {
    const raw = JSON.parse(localStorage.getItem('cea:progress') || '{}');
    return raw.completed;
  });
  expect(remainingCompleted).toEqual(['aws:networks:0']);
});
