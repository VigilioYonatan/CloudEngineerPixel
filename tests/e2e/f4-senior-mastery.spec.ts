import { expect, test } from '@playwright/test';

test('F4-08 & F4-07 & F4-05 & F4-06 & F4-09 Senior mastery flows on desktop', async ({ page }) => {
  await page.goto('/?cloud=aws#senior');

  // F4-08: Accent-insensitive search + domain/status filters + counter
  const searchInput = page.getByPlaceholder(/Buscar caso/);
  await searchInput.fill('filtracion');
  await expect(page.getByText('Filtración de secretos en repositorio')).toBeVisible();
  await expect(page.getByText(/Mostrando 1 de 18 casos/)).toBeVisible();
  await searchInput.fill('');

  // Open s03 (which should have varied non-0 correct positions or trade-offs)
  await page.locator('.senior-card').first().click();

  // F4-07: Integrated workbook preview from SeniorSidebar with Escape close
  await page.getByRole('button', { name: /Previsualizar cuaderno/ }).click();
  const dialog = page.getByRole('dialog', { name: /Cuaderno práctico/i });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();

  // Inspect two primary artifacts
  await page.getByRole('button', { name: /Examinar/ }).first().click();
  await page.getByRole('button', { name: /Examinar/ }).first().click();

  // F4-09: Wrong diagnosis attempt exposes curriculum reinforcement link
  await page.getByRole('button', { name: /Formular diagnóstico/ }).click();
  await page.locator('.sr-diagnostic .decision-options button').nth(1).click();
  await page.getByRole('button', { name: 'Confirmar hipótesis' }).click();
  await expect(page.getByRole('button', { name: /Refuerza este tema/ })).toBeVisible();
  await page.getByRole('button', { name: 'Intentar otra hipótesis' }).click();

  // Correct diagnosis
  await page.locator('.sr-diagnostic .decision-options button').first().click();
  await page.getByRole('button', { name: 'Confirmar hipótesis' }).click();
  await page.getByRole('button', { name: /Definir contención/ }).click();

  // F4-05: Trade-offs matrix visible + per-option feedback
  await expect(page.getByText(/Mitigación inmediata/)).toBeVisible();
  await page.locator('.decision-options button').nth(1).click();
  await page.getByRole('button', { name: 'Confirmar decisión' }).click();
  await expect(page.getByText('Decisión inicial defendible')).toBeVisible();
  await page.getByRole('button', { name: /Preparar informe/ }).click();

  // F4-06: Optional ADR/Postmortem section + Markdown download button
  await expect(page.getByRole('button', { name: /Descargar Postmortem \/ ADR \(\.md\)/ })).toBeVisible();
});
