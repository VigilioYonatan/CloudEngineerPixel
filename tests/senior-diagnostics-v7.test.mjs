import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const senior=readFileSync(new URL('../src/data/senior.ts',import.meta.url),'utf8');
const diagnostic=readFileSync(new URL('../src/data/seniorDiagnostics.ts',import.meta.url),'utf8');
const ui=readFileSync(new URL('../src/SeniorWorkbench.tsx',import.meta.url),'utf8');
const state=readFileSync(new URL('../src/lib/state.ts',import.meta.url),'utf8');
test('every one of the 18 Senior cases includes a unique diagnostic',()=>{
  const cases=[...senior.matchAll(/id:'(s\d\d)'/g)].map(m=>m[1]);
  const diagnoses=[...diagnostic.matchAll(/^  (s\d\d):\s*\{/gm)].map(m=>m[1]);
  assert.equal(cases.length,18);assert.equal(new Set(cases).size,18);
  assert.deepEqual(diagnoses.sort(),cases.sort());
});
test('Senior UI gates closure behind evidence, diagnosis, decision and report',()=>{
  for(const phrase of ['inspectedPrimary&&diagnosisCorrect','assessment.ready&&diagnosisReady','diagnosisLocked','seniorSessionKey','serializeSeniorSession','REPORT_MAX_CHARS','Guardar expediente'])assert.ok(ui.includes(phrase),phrase);
});
test('Senior progress can resume without mixing AWS, Azure and GCP',()=>{
  for(const phrase of ['senior-session:${provider}:${caseId}','setHydratedKey(sessionKey)','hydratedKey===sessionKey'])assert.ok((ui+'\n'+readFileSync(new URL('../src/lib/seniorSession.mjs',import.meta.url),'utf8')).includes(phrase),phrase);
});
test('bounded local notes and larger import capacity preserve realistic saved reports',()=>{
  assert.match(state,/value\.slice\(0,12000\)/);
  assert.match(state,/8\*1024\*1024/);
});
test('HTML accessible steps use nav and aria-current rather than an incomplete tab pattern',()=>{
  assert.match(ui,/<nav class="sr-stage-tabs" aria-label=/);
  assert.match(ui,/aria-current=\{stage===s/);
  assert.doesNotMatch(ui,/role="tab"/);
});
