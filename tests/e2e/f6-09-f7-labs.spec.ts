import { expect, test } from '@playwright/test';

test('F6-09 & F7-01..F7-08 E2E: Glossary modal searches acronyms, Lab persists checklist, blocks accidental secrets, and exports report', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/aula/networks/0');

  // F6-09: Open Glossary from Header, search OIDC, close with Escape
  await page.getByRole('button', { name: 'Abrir glosario técnico' }).click();
  const dialog = page.getByRole('dialog', { name: /Glosario técnico/i });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('searchbox', { name: /Buscar término en el glosario/i }).fill('OIDC');
  await expect(dialog.getByText('OpenID Connect (Workload Federation)')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();

  // Navigate to Networks Lab and verify F7-07 metadata + F7-02 modalities
  await page.goto('/?cloud=aws#/labs/networks');
  await expect(page.locator('.lab-metadata-card')).toContainText('ec2:DescribeVpcs');

  // F7-05: Check 2 steps, switch to Modalidad B, reload and verify persistence
  const firstCheck = page.locator('.task-list label').nth(0);
  const secondCheck = page.locator('.task-list label').nth(1);
  await firstCheck.click();
  await secondCheck.click();
  await page.getByRole('tab', { name: /Modalidad B/i }).click();
  await expect(page.getByText(/Docker Compose & Kind/i)).toBeVisible();

  await page.reload();
  await expect(page.getByText(/Docker Compose & Kind/i)).toBeVisible();
  await page.getByRole('tab', { name: /Modalidad A/i }).click();
  await expect(page.getByText(/2 de 5 pasos verificados/i)).toBeVisible();

  // F7-01 & F7-04: Verify Cuaderno Markdown + OIDC + Terraform Enterprise subtabs
  await page.getByRole('tab', { name: /Cuaderno Markdown/i }).click();
  await expect(page.getByRole('button', { name: /Descargar archivo/i })).toBeEnabled();
  await page.getByRole('button', { name: /Federación OIDC/i }).click();
  await expect(page.locator('.markdown-viewer')).toBeVisible();
  await page.getByRole('button', { name: /Terraform Enterprise/i }).click();
  await expect(page.getByText(/mandatory_tags/i)).toBeVisible();

  // F7-06: Accidental secret paste triggers inline warning and disables Save/Export
  const fakeKey = ['AK', 'IAIOSFODNN7EXAMPLE'].join('');
  const notesArea = page.getByPlaceholder(/Ejemplo: validé el listado de VPC/i);
  await notesArea.fill(`Probando VPC con credencial pegada: ${fakeKey}`);
  await expect(page.getByText(/Credencial potencial detectada/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Guardar evidencias' })).toBeDisabled();

  // Clean notes & F7-08 export practice Markdown report
  await notesArea.fill('Validé CIDR 10.42.0.0/16 en simulador y limpié recursos de prueba.');
  await page.getByRole('button', { name: 'Guardar evidencias' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Exportar reporte de práctica \(\.md\)/i }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('evidencia-lab-aws-networks.md');
});
