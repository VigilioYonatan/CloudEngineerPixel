import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readConcatenatedSources} from './support/readSourceTree.mjs';
const senior=readFileSync(new URL('../src/data/senior.ts',import.meta.url),'utf8');
const diagnostic=readFileSync(new URL('../src/data/seniorDiagnostics.ts',import.meta.url),'utf8');
const ui=readConcatenatedSources(['src/SeniorWorkbench.tsx','src/features/senior']);
const state=readFileSync(new URL('../src/lib/state.ts',import.meta.url),'utf8');
test('every one of the 18 Senior cases includes a unique diagnostic',()=>{
  const cases=[...senior.matchAll(/id:\s*['"](s\d\d)['"]/g)].map(m=>m[1]);
  const diagnoses=[...diagnostic.matchAll(/^\s*(s\d\d):\s*\{/gm)].map(m=>m[1]);
  assert.equal(cases.length,18);assert.equal(new Set(cases).size,18);
  assert.deepEqual(diagnoses.sort(),cases.sort());
});
test('Senior UI gates closure behind evidence, diagnosis, decision and report',()=>{
  assert.match(ui,/inspectedPrimary\s*&&\s*diagnosisCorrect/);
  assert.match(ui,/assessment\.ready\s*&&\s*diagnosisReady/);
  for(const phrase of ['diagnosisLocked','seniorSessionKey','serializeSeniorSession','REPORT_MAX_CHARS','Guardar expediente'])assert.ok(ui.includes(phrase),phrase);
});
test('Senior progress can resume without mixing AWS, Azure and GCP',()=>{
  const combined=ui+'\n'+readFileSync(new URL('../src/lib/seniorSession.mjs',import.meta.url),'utf8');
  assert.ok(combined.includes('senior-session:${provider}:${caseId}'));
  assert.match(combined,/setHydratedKey\(\s*sessionKey\s*\)/);
  assert.match(combined,/hydratedKey\s*===\s*sessionKey/);
});
test('bounded local notes and larger import capacity preserve realistic saved reports',()=>{
  assert.match(state,/value\.slice\(\s*0,\s*12000\s*\)/);
  assert.match(state,/8\s*\*\s*1024\s*\*\s*1024/);
});
test('HTML accessible steps use nav and aria-current rather than an incomplete tab pattern',()=>{
  assert.match(ui,/<nav[\s\S]*?class="sr-stage-tabs"[\s\S]*?aria-label=/);
  assert.match(ui,/aria-current=\{\s*stage\s*===\s*s/);
  assert.doesNotMatch(ui,/role="tab"/);
});
