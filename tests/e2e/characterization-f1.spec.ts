import { expect, test } from '@playwright/test';

test('F1-01 characterization: Learn catalog filters by level, searches modules, and resets empty search', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#learn');
  await expect(page.locator('.module-card')).toHaveCount(18);

  await page.getByRole('tab', { name: 'Ingeniería', exact: true }).click();
  await expect(page.locator('.module-card')).toHaveCount(6);

  const search = page.getByRole('searchbox', { name: 'Buscar módulos' });
  await search.fill('modulo-inexistente-xyz');
  await expect(page.locator('.module-card')).toHaveCount(0);
  await expect(page.getByText('No hay módulos para esta búsqueda.')).toBeVisible();

  await page.getByRole('button', { name: 'Restablecer filtros' }).click();
  await expect(page.locator('.module-card')).toHaveCount(18);
});

test('F1-01 characterization: Lesson navigates topics, grades Quiz and ProviderCheck, and persists completion', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#lesson/networks');
  await expect(page.getByRole('heading', { level: 1, name: 'IPv4, CIDR, DNS y HTTP' })).toBeVisible();

  await page.getByRole('button', { name: /VPC, VNet y subredes/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'VPC, VNet y subredes' })).toBeVisible();

  await page.locator('.quiz-card').getByRole('button', { name: /256/ }).click();
  await expect(page.getByText('¡Respuesta correcta!')).toBeVisible();

  await page.locator('.provider-check').getByRole('button', { name: /Amazon VPC/ }).click();
  await expect(page.getByText('Correcto: servicio de la ruta activa')).toBeVisible();

  await page.getByRole('button', { name: /Marcar como completada/ }).click();
  await expect(page.getByRole('button', { name: /Lección completada/ })).toBeVisible();

  await page.reload();
  await page.getByRole('button', { name: /VPC, VNet y subredes/ }).click();
  await expect(page.getByRole('button', { name: /Lección completada/ })).toBeVisible();
});

test('F1-01 characterization: Lab gates completion behind 5 checks, shows real-cloud warning, and saves notes', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#lab/networks');
  const registerButton = page.getByRole('button', { name: /Registrar práctica/ });
  await expect(registerButton).toBeDisabled();

  await page.getByRole('tab', { name: /Práctica en cuenta real/ }).click();
  await expect(page.getByText('Los proveedores pueden generar cargos.')).toBeVisible();

  await page.getByRole('tab', { name: /Guía y checklist/ }).click();
  for (const item of await page.locator('.task-list label').all()) {
    await item.click();
  }

  await expect(registerButton).toBeEnabled();
  await registerButton.click();
  await expect(page.getByRole('button', { name: /Laboratorio registrado/ })).toBeVisible();

  const notesArea = page.getByPlaceholder(/Ejemplo: validé el listado de VPC/);
  await notesArea.fill('Listado de VPC validado en cuenta aislada sin secretos.');
  await page.getByRole('button', { name: /Guardar evidencias/ }).click();

  await page.reload();
  await expect(page.getByPlaceholder(/Ejemplo: validé el listado de VPC/)).toHaveValue(
    'Listado de VPC validado en cuenta aislada sin secretos.',
  );
});

test('F1-01 characterization: All 5 Simulators compute deterministic outputs and count session runs', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#simulator');
  await expect(page.locator('.result-big')).toContainText('256');

  const cidrInput = page.getByLabel(/Red con prefijo CIDR/);
  await cidrInput.fill('999.0.0.0/99');
  await expect(page.getByText(/Formato inválido\./)).toBeVisible();
  await cidrInput.fill('10.0.0.0/24');

  await page.getByRole('tab', { name: 'Decisiones IAM' }).click();
  await expect(page.getByText('Permitido en el modelo')).toBeVisible();
  await page.getByLabel(/Acción requerida/).selectOption('admin');
  await expect(page.getByText('Denegado en el modelo')).toBeVisible();

  await page.getByRole('tab', { name: 'Autoescalado' }).click();
  await expect(page.locator('.result-big')).toContainText('8');

  await page.getByRole('tab', { name: 'SLO & Fiabilidad' }).click();
  await expect(page.locator('.result-big')).toContainText('43 min');

  await page.getByRole('tab', { name: 'Architecture Studio' }).click();
  await page.getByLabel(/Tipo de carga/).selectOption('events');
  await expect(page.locator('.result-big')).toContainText('AWS Lambda');

  await page.getByRole('button', { name: /Ejecutar simulación/ }).click();
  await expect(page.getByText('1 ejecuciones en esta sesión')).toBeVisible();
});

test('F1-01 characterization: Senior Mode completes all 4 stages to 100/100 and registers simulation', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#senior');
  await page.locator('.senior-card').first().click();

  await page.getByRole('button', { name: /Examinar/ }).first().click();
  await page.getByRole('button', { name: /Examinar/ }).first().click();

  await page.getByRole('button', { name: /Formular diagnóstico/ }).click();
  await page.locator('.sr-diagnostic .decision-options button').first().click();
  await page.getByRole('button', { name: 'Confirmar hipótesis' }).click();
  await expect(page.getByText('Hipótesis respaldada por las pistas')).toBeVisible();

  await page.getByRole('button', { name: /Definir contención/ }).click();
  await page.locator('.decision-options button').nth(1).click();
  await page.getByRole('button', { name: 'Confirmar decisión' }).click();
  await expect(page.getByText('Decisión inicial defendible')).toBeVisible();

  await page.getByRole('button', { name: /Preparar informe/ }).click();
  const detailedSection =
    'El atributo storage_encrypted cambia de true a false forzando un reemplazo destructivo sin ventana autorizada ni prueba previa de restauración.';
  for (const field of await page.locator('.sr-field textarea').all()) {
    await field.fill(detailedSection);
  }
  for (const citation of await page.locator('.sr-citations input[type="checkbox"]').all()) {
    await citation.check();
  }
  await page.locator('.sr-attestation input[type="checkbox"]').check();

  const submitButton = page.getByRole('button', { name: /Registrar simulación \(100\/100\)/ });
  await expect(submitButton).toBeEnabled();
  await submitButton.click();
  await expect(page.getByText('Simulación registrada para AWS.')).toBeVisible();
});

test('F0-08 & F1-01 characterization: Settings displays synchronized version, toggles theme, and Progress exports JSON', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#settings');
  await expect(page.getByText(/Versión 9\.0\.0/)).toBeVisible();
  await expect(page.getByText(/Versión 7\.0\.0/)).toHaveCount(0);

  await page.getByRole('button', { name: 'Claro', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Oscuro', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.goto('/?cloud=aws#progress');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Exportar progreso/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('cloud-academy-progreso.json');
  expect(await download.failure()).toBeNull();
});
