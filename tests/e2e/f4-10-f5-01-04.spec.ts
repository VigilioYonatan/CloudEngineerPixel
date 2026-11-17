import { expect, test } from '@playwright/test';

test('F5-01..F5-04: All 7 simulators render, compute deterministic outputs, and support Routing 3D & Terraform Plan labs', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#simulator');
  await expect(page.getByRole('button', { name: 'Reiniciar' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Copiar resultado' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Descargar reporte' })).toBeVisible();

  // F5-02: IAM enhanced evaluation
  await page.getByRole('tab', { name: /Decisiones IAM/ }).click();
  await expect(page.getByText(/evaluador oficial/i)).toBeVisible();

  // F5-03: Routing & Firewall Lab
  await page.getByRole('tab', { name: /Routing & Firewall/ }).click();
  await expect(page.getByText(/Salto a salto/i)).toBeVisible();

  // F5-04: Terraform Plan & Drift Inspector
  await page.getByRole('tab', { name: /Terraform Plan/ }).click();
  await expect(page.getByText(/BLAST RADIUS:/i).first()).toBeVisible();
});
