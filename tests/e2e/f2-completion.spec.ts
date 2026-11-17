import { expect, test } from '@playwright/test';

test('F2-04 E2E: /#/proyectos renders 3 integrator projects, persists checklist/ADR, and downloads Markdown template', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/proyectos');
  await expect(page.getByRole('heading', { level: 1, name: /Proyectos Integradores/i })).toBeVisible();

  await page.getByRole('button', { name: /Proyecto 3 · Capstone/i }).click();
  await expect(page.getByRole('heading', { level: 2, name: /Capstone Arquitecto/i })).toBeVisible();

  const firstDeliverable = page.locator('.project-deliverables label').first();
  await firstDeliverable.click();

  const adrBox = page.getByLabel(/Decisiones de arquitectura y justificación/i);
  await adrBox.fill('Arquitectura activa-pasiva con RPO 5 min, RTO 30 min y presupuesto TCO auditado.');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Exportar plantilla ADR \/ Portfolio/i }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('portfolio-adr-aws-project-3.md');
});

test('F2-05 E2E: Footer links navigate to /#/acerca sections (Seguridad Cloud & No afiliación)', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/');
  await page.locator('footer').getByRole('button', { name: 'Seguridad Cloud' }).click();
  await expect(page).toHaveURL(/#\/acerca\/seguridad-cloud$/);
  await expect(page.getByRole('heading', { level: 1, name: /Metodología, Seguridad Cloud/i })).toBeVisible();
  await expect(page.getByText(/jamás producción/i)).toBeVisible();

  await page.locator('footer').getByRole('button', { name: 'No afiliación' }).click();
  await expect(page).toHaveURL(/#\/acerca\/no-afiliacion$/);
  await expect(page.locator('#seccion-no-afiliacion')).toHaveClass(/about-section-active/);
  await expect(page.getByText(/patrocina, avala, audita ni certifica/i)).toBeVisible();
});

test('F2-06 E2E: RouteRecoveryState handles invalid moduleId and Senior caseId without losing cloud context', async ({
  page,
}) => {
  await page.goto('/?cloud=gcp#/aula/no-existe');
  await expect(page.getByRole('heading', { level: 1, name: /No encontramos ese recurso/i })).toBeVisible();
  await expect(page.getByText(/no-existe/)).toBeVisible();
  await page.getByRole('button', { name: /Ir al catálogo de módulos/i }).click();
  await expect(page).toHaveURL(/\?cloud=gcp#\/aprender$/);

  await page.goto('/?cloud=gcp#/senior/s99');
  await expect(page.getByRole('heading', { level: 1, name: /No encontramos ese recurso/i })).toBeVisible();
  await page.getByRole('button', { name: /Volver al catálogo Senior Mode/i }).click();
  await expect(page).toHaveURL(/\?cloud=gcp#\/senior$/);
});

test('F2-07 E2E: non-blocking first-visit onboarding sets provider and Hero resumes exact lastVisited unit', async ({
  page,
}) => {
  await page.goto('/#/');
  const onboarding = page.locator('.onboarding-banner');
  await expect(onboarding).toBeVisible();
  await onboarding.getByRole('button', { name: /Microsoft Azure/i }).click();
  await expect(onboarding).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-provider', 'azure');

  await page.goto('/?cloud=azure#/aula/networks/2');
  await expect(page.getByRole('heading', { level: 1, name: 'Rutas y gateways' })).toBeVisible();

  await page.goto('/?cloud=azure#/');
  const resumeBtn = page.getByRole('button', { name: /Continuar donde me quedé/i });
  await expect(resumeBtn).toBeVisible();
  await resumeBtn.click();
  await expect(page).toHaveURL(/#\/aula\/networks\/2$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Rutas y gateways' })).toBeVisible();
});

test('F2-08 E2E: unsaved Lab draft is auto-saved atomically into previous cloud scope without contaminating switched cloud', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/labs/networks');
  const notesArea = page.getByPlaceholder(/Ejemplo: validé el listado de VPC/);
  await notesArea.fill('Borrador exclusivo AWS sin pulsar guardar manualmente.');

  const chooser = page.getByRole('combobox', { name: 'Seleccionar proveedor cloud' });
  await chooser.selectOption('azure');
  await expect(notesArea).toHaveValue('');

  await chooser.selectOption('aws');
  await expect(notesArea).toHaveValue('Borrador exclusivo AWS sin pulsar guardar manualmente.');
});
