import { expect, test } from '@playwright/test';

test('F5-10, F5-11 & F6-01..F6-03: Observability Lab, Simulator Model Card, and Lesson UnitSpecPanel render cleanly', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#simulator');
  await expect(page.getByText(/Ficha técnica del motor/)).toBeVisible();
  await page.getByRole('tab', { name: /Observability/ }).click();
  await expect(page.getByRole('heading', { name: /Observability & Burn-Rate/ })).toBeVisible();

  await page.goto('/?cloud=aws#/aula/cloud-fundamentals/0');
  await expect(page.getByText(/Modelo mental clave/)).toBeVisible();
  await expect(page.getByText(/Antipatrón real/)).toBeVisible();
});
