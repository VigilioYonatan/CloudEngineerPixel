import {expect,test} from '@playwright/test';
import {createSeniorCheckpoint} from '../../src/lib/seniorCheckpoint.mjs';
import {emptySeniorSession} from '../../src/lib/seniorSession.mjs';

const exampleSession={...emptySeniorSession(),stage:'informe' as const,inspected:['primary','secondary'],answers:{cause:'Análisis completo de la falla y sus síntomas',mitigation:'Contención autorizada',rollback:'Reversión verificada',validation:'Métricas observadas'}};

function fixture(provider:'aws'|'azure'|'gcp',caseId:string){
 const data=createSeniorCheckpoint(provider,caseId,exampleSession,'2026-11-11T12:20:00.000Z');
 return {name:`senior-${provider}-${caseId}.json`,mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))};
}

test('Senior V9 imports a backup only into its original cloud and case',async({page})=>{
 await page.goto('/?cloud=aws#senior');
 await page.locator('.senior-card').first().click();
 const input=page.getByLabel('Importar expediente JSON');
 await input.setInputFiles(fixture('azure','s01'));
 await expect(page.getByRole('alert')).toContainText('otro caso o proveedor');
 const chooser=page.getByRole('combobox',{name:'Seleccionar proveedor cloud'});
 await chooser.selectOption('azure');
 page.once('dialog',dialog=>dialog.accept());
 await input.setInputFiles(fixture('azure','s01'));
 await expect(page.getByText(/Borrador Senior restaurado/)).toBeVisible();
 await page.waitForFunction(()=>{
  const entry=JSON.parse(localStorage.getItem('cea:progress')||'{}').notes?.['senior-session:azure:s01'];
  return typeof entry==='string' && entry.includes('Análisis completo');
 });
 await page.reload();
 await expect(page).toHaveURL(/#\/senior\/s01$/);
 await expect(page.getByText('Informe técnico estructurado')).toBeVisible();
});

test('Senior V9 provides a provider-specific playbook and checkpoint export',async({page})=>{
 await page.goto('/?cloud=gcp#senior');
 await page.locator('.senior-card').first().click();
 await expect(page.getByRole('heading',{name:'Briefing operativo del incidente'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Condiciones de recuperación'})).toBeVisible();
 const downloadPromise=page.waitForEvent('download');
 await page.getByRole('button',{name:/Guardar JSON del caso/}).click();
 const download=await downloadPromise;
 expect(download.suggestedFilename()).toBe('expediente-senior-gcp-s01.json');
});
