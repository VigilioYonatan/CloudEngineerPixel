import test from 'node:test';
import assert from 'node:assert/strict';
import {emptySeniorSession,normalizeSeniorSession,parseSeniorSession,serializeSeniorSession,seniorSessionKey,REPORT_MAX_CHARS,SESSION_MAX_LENGTH} from '../src/lib/seniorSession.mjs';

const base = () => ({...emptySeniorSession(),stage:'informe',inspected:['primary','secondary'],cited:['primary'],choice:1,decisionLocked:true,diagnosisChoice:0,diagnosisLocked:true,answers:{cause:'análisis',mitigation:'mitigación',rollback:'reversión',validation:'validación'},acknowledged:true});
test('restores complete Senior case state without losing evidence and four report sections',()=>{
  const original=base();const restored=parseSeniorSession(serializeSeniorSession(original));
  assert.deepEqual(restored,original);
  assert.equal(restored.stage,'informe');
});
test('provider isolation uses separate, validated storage paths',()=>{
  assert.equal(seniorSessionKey('aws','s01'),'senior-session:aws:s01');
  assert.notEqual(seniorSessionKey('aws','s01'),seniorSessionKey('gcp','s01'));
  assert.notEqual(seniorSessionKey('aws','s01'),seniorSessionKey('aws','s02'));
  for(const [p,id] of [['azure','../s01'],['aws','__proto__'],['other','s01']])assert.throws(()=>seniorSessionKey(p,id));
});
test('parsing untrusted, oversized, incomplete or future session data falls back safely',()=>{
  assert.deepEqual(parseSeniorSession('{invalid'),emptySeniorSession());
  assert.deepEqual(parseSeniorSession('X'.repeat(SESSION_MAX_LENGTH+1)),emptySeniorSession());
  assert.deepEqual(parseSeniorSession(JSON.stringify({version:999,stage:'informe'})),emptySeniorSession());
  assert.deepEqual(parseSeniorSession(null),emptySeniorSession());
});
test('only known artifact identifiers can be inspected and citations require prior inspection',()=>{
  const draft=normalizeSeniorSession({...base(),inspected:['primary','primary','unknown','__proto__'],cited:['secondary','primary','unknown']});
  assert.deepEqual(draft.inspected,['primary']);
  assert.deepEqual(draft.cited,['primary']);
});
test('decision flags cannot be forged without a choice',()=>{
  const draft=normalizeSeniorSession({...base(),choice:null,diagnosisChoice:'0',decisionLocked:true,diagnosisLocked:true});
  assert.equal(draft.decisionLocked,false);assert.equal(draft.diagnosisLocked,false);
});
test('session truncates long text and preserves only known report keys',()=>{
  const draft=normalizeSeniorSession({...base(),answers:{...base().answers,cause:'x'.repeat(REPORT_MAX_CHARS+100),injected:'unexpected'}});
  assert.equal(draft.answers.cause.length,REPORT_MAX_CHARS);
  assert.equal(Object.hasOwn(draft.answers,'injected'),false);
});
test('polluted object cannot override reserved prototype properties',()=>{
  const payload=JSON.parse('{"version":1,"__proto__":{"compromised":true},"stage":"informe","answers":{"__proto__":{"compromised":true},"cause":"ok"}}');
  assert.equal(parseSeniorSession(JSON.stringify(payload)).answers.cause,'ok');
  assert.equal({}.compromised,undefined);
});
test('invalid stage, indexes, booleans, and evidence structures are safely reset',()=>{
  const s=normalizeSeniorSession({...base(),stage:'../admin',choice:400,decisionLocked:1,diagnosisChoice:-1,diagnosisLocked:true,inspected:'abc',cited:['primary'],acknowledged:'true'});
  assert.equal(s.stage,'investigar');assert.equal(s.choice,null);assert.equal(s.diagnosisChoice,null);
  assert.deepEqual(s.inspected,[]);assert.deepEqual(s.cited,[]);assert.equal(s.acknowledged,false);
});
