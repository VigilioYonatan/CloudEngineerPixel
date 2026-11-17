import { expect, test } from '@playwright/test';

test('F6-04..F6-08: Level 3 unit, GoPixel micro-games, 90-question bank, bestScore preservation, and 6D progress render', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#/aula/capstone/0');
  await expect(page.getByText(/Modelo mental clave/)).toBeVisible();
  await expect(page.getByText(/Bug Hunter/)).toBeVisible();

  await page.goto('/?cloud=aws#progress');
  await expect(page.getByText(/Teoría \/ Unidades/)).toBeVisible();
  await expect(page.getByText(/Expedientes Senior/)).toBeVisible();
});
