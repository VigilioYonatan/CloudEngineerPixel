import {expect, test} from '@playwright/test';

test('landing loads and theme follows the chosen cloud', async ({page}) => {
  await page.goto('/?cloud=aws');
  await expect(page.getByRole('heading',{name:/Domina el/i})).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-provider','aws');
  const chooser=page.getByRole('combobox',{name:'Seleccionar proveedor cloud'});
  await chooser.selectOption('azure');
  await expect(page.locator('html')).toHaveAttribute('data-provider','azure');
  await expect(page.locator('.mascot').first()).toHaveAttribute('src',/azure/);
  await chooser.selectOption('gcp');
  await expect(page.locator('html')).toHaveAttribute('data-provider','gcp');
  await expect(page).toHaveURL(/cloud=gcp/);
});

test('senior workflow cannot be completed without investigation and report',async({page})=>{
  await page.goto('/?cloud=aws#senior');
  await expect(page.getByRole('heading',{name:/Senior Mode/})).toBeVisible();
  await page.locator('.senior-card').first().click();
  await expect(page.getByText('Objetivo de investigación')).toBeVisible();
  await page.getByRole('button',{name:/Informe y evaluación/}).click();
  await expect(page.getByRole('button',{name:/Registrar simulación/})).toBeDisabled();
  await expect(page.getByText('Vincula las evidencias examinadas')).toBeVisible();
  await expect(page.getByText(/no la calidad técnica del texto/)).toBeVisible();
});

test('mobile header retains provider selection',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/?cloud=gcp');
  await expect(page.getByRole('combobox',{name:'Seleccionar proveedor cloud'})).toHaveValue('gcp');
  await page.getByRole('button',{name:'Abrir menú'}).click();
  await expect(page.getByRole('navigation',{name:'Navegación principal'})).toBeVisible();
});

test('Senior case stores inspected evidence and diagnosis independently per cloud',async({page})=>{
  await page.goto('/?cloud=aws#senior');
  await page.locator('.senior-card').first().click();
  await page.getByRole('button',{name:/Examinar/}).first().click();
  await page.getByRole('button',{name:/Examinar/}).first().click();
  await page.getByRole('button',{name:/Formular diagnóstico/}).click();
  await page.locator('.sr-diagnostic .decision-options button').first().click();
  await page.getByRole('button',{name:'Confirmar hipótesis'}).click();
  await expect(page.getByText('Hipótesis respaldada por las pistas')).toBeVisible();
  await page.waitForFunction(()=>{
    const progress=JSON.parse(localStorage.getItem('cea:progress')||'{}');
    return progress.notes?.['senior-session:aws:s01']?.includes('"diagnosisLocked":true');
  });
  await page.reload();
  await page.locator('.senior-card').first().click();
  await page.getByRole('button',{name:/Diagnosticar/}).click();
  await expect(page.getByText('Hipótesis respaldada por las pistas')).toBeVisible();
  const chooser=page.getByRole('combobox',{name:'Seleccionar proveedor cloud'});
  await chooser.selectOption('azure');
  await page.getByRole('button',{name:/Diagnosticar/}).click();
  await expect(page.getByRole('button',{name:'Confirmar hipótesis'})).toBeDisabled();
  await chooser.selectOption('aws');
  await expect(page.getByText('Hipótesis respaldada por las pistas')).toBeVisible();
});

test('Senior cannot register a completed report without confirming the diagnostic gate',async({page})=>{
  await page.goto('/?cloud=gcp#senior');
  await page.locator('.senior-card').first().click();
  await page.getByRole('button',{name:/Decidir/}).click();
  await page.locator('.decision-options button').nth(1).click();
  await expect(page.getByRole('button',{name:'Confirmar decisión'})).toBeDisabled();
  await page.getByRole('button',{name:/Informe y evaluación/}).click();
  await expect(page.getByRole('button',{name:/Registrar simulación/})).toBeDisabled();
});

test('Senior rubric is only an unauthenticated local teaching review',async({page})=>{
  await page.goto('/?cloud=aws#senior');
  await page.evaluate(()=>{
    const original=JSON.parse(localStorage.getItem('cea:progress')||'{"completed":[],"senior":[],"quiz":{},"notes":{},"simRuns":0}');
    original.senior=['aws:s01'];
    localStorage.setItem('cea:progress',JSON.stringify(original));
  });
  await page.reload();
  await page.locator('.senior-card').first().click();
  await page.locator('.sr-review summary').click();
  await expect(page.getByText(/no verifica la identidad/)).toBeVisible();
  await expect(page.getByRole('button',{name:/Exportar revisión JSON/})).toBeDisabled();
  await page.getByPlaceholder('Ej. Instructor 01').fill('Revisor QA');
  await page.getByPlaceholder(/Describe qué está respaldado/).fill('El informe asocia cambios de infraestructura, registros, restauración y un procedimiento de reversión autorizado para producción.');
  for(const selector of await page.locator('.sr-review-row select').all())await selector.selectOption('4');
  await expect(page.getByText('Aprobación formativa local')).toBeVisible();
  await page.getByRole('button',{name:/Guardar borrador/}).click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('cea:progress')||'{}').notes?.['senior-review:aws:s01']);
});
