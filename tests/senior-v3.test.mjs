import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
// Use project dependency when installed; this audit environment may only have a global compiler.
const ts=(await import('typescript').catch(()=>null))?.default || (await import('file:///opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js').catch(()=>null))?.default;
const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const dossier=read('src/data/seniorInvestigations.ts');
const ui=read('src/SeniorWorkbench.tsx');
const state=read('src/lib/state.ts');
const app=read('src/App.tsx');
const ids=[...dossier.matchAll(/\bs\d{2}:\[/g)].map(m=>m[0].slice(0,3));
test('every one of 18 scenarios has a unique investigative dossier',()=>{assert.equal(ids.length,18);assert.equal(new Set(ids).size,18);for(let i=1;i<=18;i++)assert.ok(ids.includes(`s${String(i).padStart(2,'0')}`));});
test('every case has a provider service mapping',()=>{const m=[...dossier.matchAll(/\bs\d{2}:'[a-z0-9]+'/g)].map(x=>x[0].slice(0,3));assert.equal(m.length,18);assert.equal(new Set(m).size,18);for(const p of ['aws','azure','gcp'])assert.ok(dossier.includes(`${p}:{`));});
test('new senior workbench is routed and retains old component as fallback',()=>{assert.ok(app.includes("import {SeniorWorkbench}"));assert.ok(app.includes("view.value==='senior'?<SeniorWorkbench/>"));assert.ok(app.includes('function Senior()'));});
test('senior requires a confirmed decision, cited exhibits, and a structured report',()=>{const engine=read('src/lib/seniorEvaluation.mjs');assert.match(ui,/evaluateSeniorEvidence/);assert.match(engine,/decisionLocked/);assert.match(engine,/citationsReady/);assert.match(engine,/missingReportSections/);assert.match(ui,/disabled=\{!allReady\}/);});
test('report export and per-provider attempts persist',()=>{for(const x of ['recordSeniorAttempt','completeSenior','setNotes','downloadReport','JSON.stringify'])assert.ok(ui.includes(x));for(const x of ['SeniorAttempt','seniorAttempts','cea:progress'])assert.ok(state.includes(x));});
test('senior examples explicitly identify synthetic evidence and no automatic technical grading',()=>{assert.match(ui,/datos de laboratorio ficticios|simulaciones educativas|simulación/);assert.match(ui,/no la calidad técnica del texto/);assert.match(dossier,/No ejecuta cambios/);});
test('all V3 TypeScript sources parse correctly',(t)=>{if(!ts){t.skip('typescript unavailable until npm install');return;}for(const file of ['src/App.tsx','src/SeniorWorkbench.tsx','src/data/seniorInvestigations.ts','src/lib/state.ts']){const result=ts.transpileModule(read(file),{fileName:file,reportDiagnostics:true,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,jsxImportSource:'preact',target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}});assert.equal(result.diagnostics?.length||0,0,file)}});
test('documentation for Senior V3 and safety guardrails exists',()=>{assert.ok(existsSync(new URL('../docs/SENIOR_MODE_V3.md',import.meta.url)));assert.ok(existsSync(new URL('../docs/FILE_INTEGRITY_V3.md',import.meta.url)))});
