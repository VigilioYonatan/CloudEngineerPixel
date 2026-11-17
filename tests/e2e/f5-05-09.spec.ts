import { expect, test } from '@playwright/test';

test('F5-05..F5-09: K8s, Load Balancing, FinOps, DR and Messaging simulator tabs render and compute deterministically', async ({
  page,
}) => {
  await page.goto('/?cloud=aws#simulator');
  await page.getByRole('tab', { name: /K8s Scheduler/ }).click();
  await expect(page.getByText(/Kubernetes Scheduler & Failure Lab/)).toBeVisible();

  await page.getByRole('tab', { name: /Load Balancing/ }).click();
  await expect(page.getByRole('heading', { name: /Load Balancing & Backpressure/ })).toBeVisible();

  await page.getByRole('tab', { name: /FinOps Cost/ }).click();
  await expect(page.getByText(/modelo hipotético educativo/i)).toBeVisible();

  await page.getByRole('tab', { name: /DR Studio/ }).click();
  await expect(page.getByRole('heading', { name: /Disaster Recovery RTO \/ RPO Studio/ })).toBeVisible();

  await page.getByRole('tab', { name: /Messaging & DLQ/ }).click();
  await expect(page.getByRole('heading', { name: /Messaging, Retries & Idempotency/ })).toBeVisible();
});
