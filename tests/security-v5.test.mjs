import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {validateProgressImport} from '../src/lib/importValidation.mjs';
import {readConcatenatedSources} from './support/readSourceTree.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(path.join(root,p),'utf8');
const valid=()=>({progress:{completed:['aws:cloud-fundamentals'],senior:[],quiz:{'aws:test':100},notes:{'senior:aws:s01':'diagnosis'},simRuns:2,seniorAttempts:[]}});
test('safe import preserves expected values and never trusts user-controlled prototypes',()=>{
 const p=validateProgressImport(valid());assert.equal(p.completed[0],'aws:cloud-fundamentals');assert.equal(p.quiz['aws:test'],100);
 const user=valid();user.progress.notes=JSON.parse('{"__proto__":"injected","constructor":"bad","safe":"ok"}');
 const sanitized=validateProgressImport(user);assert.equal(sanitized.notes.safe,'ok');assert.equal(Object.hasOwn(sanitized.notes,'__proto__'),false);assert.equal({}.injected,undefined);
});
test('rejects malformed imports',()=>{for(const input of [null,{},[],{progress:{completed:[],senior:[],quiz:null,notes:{}}},{progress:{completed:'bad',senior:[],quiz:{},notes:{}}}]) assert.throws(()=>validateProgressImport(input));});
test('filters poisoned scores, inflated counts and unrecognized case ids',()=>{
 const x=valid();x.progress.quiz={'q':Infinity,good:120,neg:-2};x.progress.simRuns=1e20;
 x.progress.seniorAttempts=[{caseId:'s99',provider:'aws',correct:true,at:'2026-01-01',score:100},{caseId:'s01',provider:'azure',correct:true,at:'2026-01-01T12:00:00Z',score:1000,examined:['logs'],report:{cause:'x',mitigation:'y',validation:'z'}}];
 const p=validateProgressImport(x);assert.equal(p.quiz.good,100);assert.equal(p.quiz.neg,0);assert.equal('q' in p.quiz,false);assert.equal(p.simRuns,1000000);assert.equal(p.seniorAttempts.length,1);assert.equal(p.seniorAttempts[0].score,100);
});
test('shipping quality setup includes Biome, secure workflow, dependabot and rubric',()=>{
 for(const f of ['biome.json','.github/workflows/devsecops.yml','.github/dependabot.yml','SECURITY.md','src/data/seniorRubric.ts','scripts/check-secrets.mjs'])assert.ok(existsSync(path.join(root,f)),f);
 const w=read('.github/workflows/devsecops.yml');for(const gate of ['npm run lint','npm run typecheck','npm test','npm run build','npm audit'])assert.ok(w.includes(gate),gate);
 const ui=readConcatenatedSources(['src/SeniorWorkbench.tsx','src/features/senior']);assert.match(ui,/Rúbrica de revisión humana/);assert.match(ui,/Plantilla de revisión/);
});
test('immutable baseline V4 paths remain present',()=>{
 const old=JSON.parse(read('docs/FILE_MANIFEST_V5.json'));
 assert.equal(old.removed.length,0);assert.ok(old.originalCount>=200);
});
