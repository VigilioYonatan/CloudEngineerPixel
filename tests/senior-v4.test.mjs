import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(name)=>readFileSync(path.join(root,name),'utf8');
const ids=Array.from({length:18},(_,i)=>`s${String(i+1).padStart(2,'0')}`);
const clouds=['aws','azure','gcp'];
test('54 case workbooks exist for three providers with reviewable deliverables',()=>{
 for(const cloud of clouds){const dir=path.join(root,'labs/senior/providers',cloud);assert.equal(readdirSync(dir).filter(x=>x.endsWith('.md')).length,18);
 for(const id of ids){const file=read(`labs/senior/providers/${cloud}/${id}.md`);assert.match(file,/## Resultado verificable/);assert.match(file,/## Evidencias mínimas/);assert.match(file,/## Entregable y rúbrica de revisión humana/);assert.match(file,/## Limpieza y control de costos/);assert.match(file,/\*\*sintéticos\*\*/);}}
});
test('case workbooks are downloadable from static public assets',()=>{
 for(const cloud of clouds)for(const id of ids){const source=read(`labs/senior/providers/${cloud}/${id}.md`);const publicFile=read(`public/senior-guides/${cloud}/${id}.md`);assert.equal(publicFile,source)}
});
test('V4 uses case-specific practice metadata, safer case timeline and per-provider history',()=>{
 const data=read('src/data/seniorPractices.ts');const ui=read('src/SeniorWorkbench.tsx');
 for(const id of ids)assert.match(data,new RegExp(`(?:['"]${id}['"]|\\b${id})\\s*:`),id);
 for(const cloud of clouds)assert.ok(ui.includes('practice.commands[p]'));
 assert.match(ui,/attempts\s*=\s*[\s\S]*?seniorAttempts/);assert.match(ui,/Bitácora personal/);
 assert.match(ui,/\/senior-guides\/\$\{\s*p\s*\}\/\$\{\s*current\.id\s*\}\.md/);
 assert.match(ui,/onClick=\{\s*\(\)\s*=>\s*setChoice\(i\)\s*\}/);
});
test('V4 separates technical review from completion points',()=>{
 const ui=read('src/SeniorWorkbench.tsx');
 assert.match(ui,/completitud/);assert.match(ui,/revisar un instructor/);assert.match(ui,/no la calidad técnica del texto/);
 assert.ok(existsSync(path.join(root,'docs/SENIOR_MODE_V4.md')));
});
test('provider-specific docs use read-only commands',()=>{
 const metadata=read('src/data/seniorPractices.ts');
 assert.doesNotMatch(metadata,/aws .*\b(delete|terminate|put-|create-|update-|detach-|remove-)\b/);
 assert.doesNotMatch(metadata,/az .*\b(delete|create|update)\b/);
 assert.doesNotMatch(metadata,/gcloud .*\b(delete|create|update)\b/);
});
