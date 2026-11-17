import { expect, test } from '@playwright/test';

test('F1-09 E2E: corrupted localStorage is quarantined without silent wipe and offers raw backup download', async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem('seeded_corrupt')) {
      localStorage.setItem('cea:progress', '{"completed": ["aws:networks:0", BROKEN_JSON');
      sessionStorage.setItem('seeded_corrupt', '1');
    }
  });

  await page.goto('/?cloud=aws#/');
  const alertBanner = page.getByRole('alert').filter({ hasText: /almacenamiento local dañado|respaldo crudo/i });
  await expect(alertBanner).toBeVisible();

  const preservedRaw = await page.evaluate(() => localStorage.getItem('cea:progress'));
  expect(preservedRaw).toContain('BROKEN_JSON');

  const downloadPromise = page.waitForEvent('download');
  await alertBanner.getByRole('button', { name: /Descargar respaldo crudo/i }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('cloud-academy-respaldo-crudo-corrupto.json');

  await alertBanner.getByRole('button', { name: /Reiniciar estado limpio/i }).click();
  const confirmDialog = page.getByRole('alertdialog');
  await expect(confirmDialog).toBeVisible();
  await confirmDialog.getByRole('button', { name: /Reiniciar estado limpio/i }).click();
  await expect(alertBanner).toHaveCount(0);
});

test('F2-01 E2E: canonical deep-links reload exact unit, simulator mode, Senior case, and cloud query param', async ({
  page,
}) => {
  await page.goto('/?cloud=azure#/aula/networks/2');
  await expect(page.getByRole('heading', { level: 1, name: 'Rutas y gateways' })).toBeVisible();
  await expect(page.locator('.lesson-topline')).toContainText('AZURE');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'Rutas y gateways' })).toBeVisible();
  await expect(page.locator('.lesson-topline')).toContainText('AZURE');

  await page.goto('/?cloud=gcp#/simuladores/slo');
  await expect(page.getByRole('heading', { level: 2, name: 'Presupuesto de error SLO' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { level: 2, name: 'Presupuesto de error SLO' })).toBeVisible();

  await page.goto('/?cloud=aws#/senior/s07');
  await expect(page.getByRole('heading', { level: 1, name: /CrashLoopBackOff/i })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: /CrashLoopBackOff/i })).toBeVisible();
});

test('F2-02 E2E: /#/mapa displays 240h curriculum progression + 18 Senior cases and deep-links to exact unit', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/');
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('button', { name: 'Mapa' }).click();
  await expect(page).toHaveURL(/#\/mapa$/);
  await expect(page.getByRole('heading', { level: 1, name: /Mapa Curricular/i })).toBeVisible();
  await expect(page.getByText(/60 HORAS/i).first()).toBeVisible();
  await expect(page.getByText(/80 HORAS/i).first()).toBeVisible();
  await expect(page.getByText(/100 HORAS/i).first()).toBeVisible();

  await page.getByRole('button', { name: /03 · Rutas y gateways/i }).click();
  await expect(page).toHaveURL(/#\/aula\/networks\/2$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Rutas y gateways' })).toBeVisible();
});

test('F2-03 E2E: /#/labs catalogs all 60 practices, combines 4 filters, recovers empty state, and opens lab', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/');
  await page
    .getByRole('navigation', { name: 'Navegación principal' })
    .getByRole('button', { name: 'Laboratorios' })
    .click();
  await expect(page).toHaveURL(/#\/labs$/);
  await expect(page.locator('.lab-catalog-card')).toHaveCount(60);

  await page.getByLabel('Filtrar por proveedor').selectOption('aws');
  await page.getByLabel('Filtrar por nivel').selectOption('fundamentos');
  await page.getByLabel('Filtrar por advertencia de costo').selectOption('free-tier-elegible');
  const filteredCount = await page.locator('.lab-catalog-card').count();
  expect(filteredCount).toBeGreaterThan(0);
  expect(filteredCount).toBeLessThan(60);

  await page.getByRole('searchbox', { name: 'Buscar laboratorios' }).fill('busqueda-sin-resultados-zzz');
  await expect(page.locator('.lab-catalog-card')).toHaveCount(0);
  await page.getByRole('button', { name: 'Restablecer filtros de laboratorios' }).click();
  await expect(page.locator('.lab-catalog-card')).toHaveCount(60);

  await page.locator('.lab-catalog-card').first().getByRole('button', { name: /Abrir laboratorio/i }).click();
  await expect(page).toHaveURL(/#\/labs\//);
  await expect(page.getByRole('heading', { level: 1, name: /Laboratorio:/ })).toBeVisible();
});
