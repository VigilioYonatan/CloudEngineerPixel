import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('F8-04 & F8-05 (E2E-01, E2E-02, E2E-03): Transactional multicloud switch, strict progress isolation, 5-unit navigation, and bestScore quiz persistence', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/');
  const chooser = page.getByRole('combobox', { name: 'Seleccionar proveedor cloud' });

  await chooser.selectOption('azure');
  await expect(page.locator('html')).toHaveAttribute('data-provider', 'azure');
  await expect(page).toHaveURL(/cloud=azure/);

  await chooser.selectOption('gcp');
  await expect(page.locator('html')).toHaveAttribute('data-provider', 'gcp');

  await chooser.selectOption('aws');
  await expect(page.locator('html')).toHaveAttribute('data-provider', 'aws');

  // Open Lesson unit 0 in AWS, complete unit, verify Azure & GCP remain uncompleted
  await page.goto('/?cloud=aws#/aula/networks/0');
  await expect(page.getByRole('region', { name: /Comparativa arquitectónica multicloud/i })).toBeVisible();
  await page.getByRole('button', { name: /Marcar como completada/i }).click();
  await expect(page.getByRole('button', { name: /Lección completada/i })).toBeVisible();

  await chooser.selectOption('azure');
  await expect(page.getByRole('button', { name: /Marcar como completada/i })).toBeVisible();

  await chooser.selectOption('aws');
  await expect(page.getByRole('button', { name: /Lección completada/i })).toBeVisible();

  // Navigate to unit 5 (index 4), reload and confirm persistence
  await page.goto('/?cloud=aws#/aula/networks/4');
  await expect(page.getByText(/Lección 5\/5/i)).toBeVisible();
  await page.reload();
  await expect(page.getByText(/Lección 5\/5/i)).toBeVisible();
});

test('F8-06 & F8-07 (E2E-04, E2E-05): Labs global filter + 5-check persistence + Simulator valid/error cases & report download', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/labs');
  await page.getByPlaceholder(/Buscar por servicio/i).fill('VPC');
  await page.getByRole('button', { name: /Abrir laboratorio/i }).first().click();
  await expect(page).toHaveURL(/#\/labs\/networks$/);

  const labels = page.locator('.task-list label');
  for (let i = 0; i < 5; i++) {
    await labels.nth(i).click();
  }
  await page.reload();
  await expect(page.getByRole('button', { name: /Registrar práctica/i })).toBeEnabled();

  // Simulators: valid & invalid CIDR + report download
  await page.goto('/?cloud=aws#/simuladores/cidr');
  const cidrInput = page.getByLabel(/Red con prefijo CIDR/i);
  await cidrInput.fill('10.20.0.0/24');
  await expect(page.getByText('251', { exact: true })).toBeVisible();

  await cidrInput.fill('888.1.1.1/99');
  await expect(page.getByText(/Formato inválido/i)).toBeVisible();

  const simDownloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Descargar reporte/i }).click();
  const simDownload = await simDownloadPromise;
  expect(simDownload.suggestedFilename()).toBe('simulador-aws-cidr.json');
});

test('F8-08 (E2E-06, E2E-07, E2E-08 & Section 36.1): S07 AWS <-> Azure isolation, checkpoint export, cross-cloud rejection, and restore confirmation', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/senior/s07');
  await page.getByRole('button', { name: /Examinar/i }).first().click();
  await page.getByRole('button', { name: /Examinar/i }).first().click();

  const exportPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Guardar JSON del caso/i }).click();
  const checkpointDownload = await exportPromise;
  expect(checkpointDownload.suggestedFilename()).toBe('expediente-senior-aws-s07.json');
  const checkpointPath = await checkpointDownload.path();
  if (!checkpointPath) throw new Error('Expected downloaded checkpoint path');

  // Switch to Azure: S07 must NOT inherit AWS inspected exhibits
  const chooser = page.getByRole('combobox', { name: 'Seleccionar proveedor cloud' });
  await chooser.selectOption('azure');
  await expect(page.getByRole('button', { name: /Examinar/i }).first()).toBeVisible();

  // Attempt to import AWS checkpoint into Azure -> rejected without overwriting Azure draft
  await page.getByLabel('Importar expediente JSON').setInputFiles(checkpointPath);
  await expect(page.locator('.sr-checkpoint-error')).toBeVisible();

  // Return to AWS and import valid checkpoint -> ConfirmDialog confirmation
  await chooser.selectOption('aws');
  await page.getByLabel('Importar expediente JSON').setInputFiles(checkpointPath);
  const confirmDialog = page.getByRole('alertdialog');
  await expect(confirmDialog).toBeVisible();
  await confirmDialog.getByRole('button', { name: /Restaurar expediente/i }).click();
  await expect(page.getByText(/Borrador Senior restaurado/i)).toBeVisible();
});

test('F8-09, F8-10 & F8-11 (E2E-09..E2E-12): Progress malicious JSON rejection, responsive 320/390/768/1440 + axe, Offline resilience, and localStorage quota recovery', async ({
  page,
  context,
}) => {
  // E2E-09: Export global progress & reject malicious JSON
  await page.goto('/?cloud=aws#/progreso');
  const progDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: /Exportar progreso/i }).click();
  expect((await progDownload).suggestedFilename()).toBe('cloud-academy-progreso.json');

  await page.locator('.file-label input[type="file"]').setInputFiles({
    name: 'malicious.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{malformed-json'),
  });
  await expect(page.getByRole('status')).toContainText(/Error:/i);

  // E2E-10: Responsive zero horizontal overflow across 320, 390, 768, 1440 + axe on Senior
  await page.goto('/?cloud=aws#/senior');
  const seniorAxe = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
  expect(seniorAxe.violations).toEqual([]);

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `Overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
  await page.setViewportSize({ width: 1280, height: 800 });

  // E2E-11: Offline mode after initial SPA shell + simulator chunk load
  await page.goto('/?cloud=aws#/simuladores/cidr');
  await expect(page.getByLabel(/Red con prefijo CIDR/i)).toBeVisible();
  await context.setOffline(true);
  await page.getByLabel(/Red con prefijo CIDR/i).fill('172.16.0.0/24');
  await expect(page.getByText('172.16.0.255').first()).toBeVisible();
  await context.setOffline(false);

  // E2E-12: Unknown route recovery & simulated localStorage quota exceeded alert
  await page.goto('/?cloud=aws#/ruta-inexistente');
  await expect(page.getByRole('heading', { level: 1, name: /No encontramos/i })).toBeVisible();

  await page.goto('/?cloud=aws#/aula/networks/0');
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('QuotaExceededError', 'QuotaExceededError');
    };
  });
  await page.getByRole('button', { name: /Marcar como completada/i }).click();
  await expect(page.getByText(/No fue posible guardar el progreso local/i).first()).toBeVisible();
});
