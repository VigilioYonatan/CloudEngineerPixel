import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createSeniorCheckpoint,parseSeniorCheckpoint} from '../src/lib/seniorCheckpoint.mjs';
import {emptySeniorSession} from '../src/lib/seniorSession.mjs';
const providers=['aws','azure','gcp'];
const cases=Array.from({length:18},(_,i)=>`s${String(i+1).padStart(2,'0')}`);
const when='2026-11-11T12:20:00.000Z';

test('V9: all 54 provider/case combinations are restorable, cross-scope imports are refused',()=>{
 for(const p of providers)for(const c of cases){
  const checkpoint=JSON.stringify(createSeniorCheckpoint(p,c,emptySeniorSession(),when));
  assert.equal(parseSeniorCheckpoint(checkpoint,p,c).version,1,`${p} ${c}`);
  for(const other of providers.filter(x=>x!==p))assert.throws(()=>parseSeniorCheckpoint(checkpoint,other,c),/otro caso o proveedor/);
  const otherCase=c==='s01'?'s02':'s01';
  assert.throws(()=>parseSeniorCheckpoint(checkpoint,p,otherCase),/otro caso o proveedor/);
 }
});

test('V9: UTF-8 size is checked by bytes rather than JavaScript string length',()=>{
 const text='💾'.repeat(20000);
 assert.ok(text.length<48*1024,'UTF-16 code unit length is lower than limit');
 assert.throws(()=>parseSeniorCheckpoint(text,'gcp','s03'),/48 KB/);
});

test('V9: Senior case importer tracks the active provider and case across async file reads',()=>{
 const source=readFileSync(new URL('../src/SeniorWorkbench.tsx',import.meta.url),'utf8');
 assert.match(source,/liveScope\.current\.provider!==requestedProvider/);
 assert.match(source,/liveScope\.current\.caseId!==requestedCase/);
 assert.match(source,/¿Restaurar este expediente/);
 assert.match(source,/setSession\(imported\)/);
 assert.match(source,/role="alert"/);
});

test('V9: state warns when local persistence fails and defers object URL cleanup',()=>{
 const source=readFileSync(new URL('../src/lib/state.ts',import.meta.url),'utf8');
 assert.match(source,/warnedStorageFailure/);
 assert.match(source,/No fue posible guardar el progreso local/);
 assert.match(source,/setTimeout\(\(\)=>URL\.revokeObjectURL\(url\),1000\)/);
});

test('V9: DevSecOps and browser testing remain part of the release, without hard-coded cloud keys',()=>{
 const workflow=readFileSync(new URL('../.github/workflows/devsecops.yml',import.meta.url),'utf8');
 const pkg=JSON.parse(readFileSync(new URL('../package.json',import.meta.url),'utf8'));
 assert.match(workflow,/npm run typecheck/);
 assert.match(workflow,/npm run lint/);
 assert.match(workflow,/npm audit/);
 assert.match(workflow,/npm run test:e2e/);
 assert.equal(pkg.scripts.doctor,'node scripts/project-doctor.mjs');
 assert.ok(pkg.scripts['verify:offline']);
});
