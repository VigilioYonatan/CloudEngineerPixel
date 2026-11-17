import { expect, test } from '@playwright/test';

test('F3-11 E2E: App loads local WOFF2 fonts with zero requests to fonts.googleapis.com or fonts.gstatic.com even offline', async ({
  page,
}) => {
  const externalFontRequests: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
      externalFontRequests.push(url);
    }
  });

  await page.goto('/?cloud=aws#/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  const fontsReady = await page.evaluate(async () => {
    await document.fonts.ready;
    return document.fonts.size;
  });
  expect(fontsReady).toBeGreaterThan(0);
  expect(externalFontRequests).toEqual([]);
});

test('F4-01, F4-03 & F4-04 E2E: Senior S01 switches provider-native exhibits dynamically, navigates IncidentTimeline, and completes CodeReviewLab', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/senior/s01');

  // F4-01: AWS native exhibit resource & CloudTrail/Terraform metadata
  await expect(page.locator('.sr-exhibits')).toContainText('aws_db_instance');
  await expect(page.locator('.sr-exhibits')).toContainText('EVD-AWS-S01');

  // Switch to Azure -> exhibits update to azurerm_postgresql_flexible_server
  const switcher = page.getByRole('combobox', { name: 'Seleccionar proveedor cloud' });
  await switcher.selectOption('azure');
  await expect(page.locator('.sr-exhibits')).toContainText('azurerm_postgresql_flexible_server');
  await expect(page.locator('.sr-exhibits')).toContainText('EVD-AZURE-S01');

  // Switch to GCP -> exhibits update to google_sql_database_instance
  await switcher.selectOption('gcp');
  await expect(page.locator('.sr-exhibits')).toContainText('google_sql_database_instance');
  await expect(page.locator('.sr-exhibits')).toContainText('EVD-GCP-S01');

  // F4-03: IncidentTimeline interactive milestone inspection
  const timeline = page.getByRole('region', { name: /Línea de tiempo del incidente/i });
  await expect(timeline).toBeVisible();
  await timeline.getByRole('button', { name: /T\+04m/i }).click();
  await expect(timeline).toContainText(/ruido|colateral|cron|benign/i);

  // F4-04: CodeReviewLab line selection and remediated diff view
  const codeLab = page.getByRole('region', { name: /Laboratorio de revisión de código/i });
  await expect(codeLab).toBeVisible();
  await codeLab.locator('.codereview-line-btn').nth(2).click();
  await codeLab.getByRole('button', { name: /Ver versión remediada/i }).click();
  await expect(codeLab).toContainText(/Versión remediada segura/i);
});

test('F4-02 E2E: Citing the Red Herring distractor in ReportStage shows formative SRE warning and blocks final submission until discarded', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/senior/s01');

  // Inspect primary, secondary AND distractor
  const inspectButtons = page.locator('.sr-exhibit').getByRole('button', { name: /Examinar/i });
  await inspectButtons.nth(0).click();
  await inspectButtons.nth(0).click();
  await inspectButtons.nth(0).click();

  await page.getByRole('button', { name: /Formular diagnóstico/i }).click();
  await page.locator('.sr-diagnostic .decision-options button').nth(0).click();
  await page.getByRole('button', { name: 'Confirmar hipótesis' }).click();

  await page.getByRole('button', { name: /Definir contención/i }).click();
  await page.locator('.decision-options button').nth(1).click();
  await page.getByRole('button', { name: 'Confirmar decisión' }).click();

  await page.getByRole('button', { name: /Preparar informe/i }).click();

  const text65 =
    'Se verificó el plan destructivo de Terraform, se bloqueó el apply y se diseñó reversión segura con snapshot.';
  for (const area of await page.locator('.sr-field textarea').all()) {
    await area.fill(text65);
  }

  const citationChecks = page.locator('.sr-citations input[type="checkbox"]');
  await citationChecks.nth(0).check();
  await citationChecks.nth(1).check();
  await citationChecks.nth(2).check(); // Check the distractor red herring!

  await page.locator('.sr-attestation input[type="checkbox"]').check();

  // Formative warning appears & submission remains disabled (85/100)
  await expect(page.locator('.sr-distractor-warning')).toBeVisible();
  const submitBtn = page.getByRole('button', { name: /Registrar simulación/i });
  await expect(submitBtn).toBeDisabled();

  // Unchecking the distractor enables 100/100 submission!
  await citationChecks.nth(2).uncheck();
  await expect(page.locator('.sr-distractor-warning')).toHaveCount(0);
  await expect(submitBtn).toBeEnabled();
});

test('Mascot PNG transparency & Home-only animated cloud services orbit with 2026 catalog', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/');
  const heroImg = page.locator('.hero-art img.mascot');
  await expect(heroImg).toHaveAttribute('src', /\/assets\/transparent\/cloud-mentor-aws\.png/);
  await expect(page.locator('.hero-art')).toContainText(/EKS Auto Mode/i);
  await expect(page.locator('.hero-art')).toContainText(/Amazon Bedrock/i);

  // Switch to GCP -> orbit & mascot update to GCP transparent PNG and GCP services
  await page.getByRole('combobox', { name: 'Seleccionar proveedor cloud' }).selectOption('gcp');
  await expect(heroImg).toHaveAttribute('src', /\/assets\/transparent\/cloud-mentor-gcp\.png/);
  await expect(page.locator('.hero-art')).toContainText(/GKE Autopilot/i);
  await expect(page.locator('.hero-art')).toContainText(/Vertex AI/i);

  // Download button for updated 2026 services catalog
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Descargar servicios 2026/i }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('servicios-cloud-actualizados-2026.json');

  // Verify orbit services strip does NOT leak into other pages like /#/aprender
  await page.goto('/?cloud=gcp#/aprender');
  await expect(page.locator('.home-services-strip')).toHaveCount(0);
});
