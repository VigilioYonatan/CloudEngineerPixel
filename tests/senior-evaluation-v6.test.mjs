import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateSeniorEvidence, SENIOR_SCORE_WEIGHTS, REPORT_MIN_CHARS} from '../src/lib/seniorEvaluation.mjs';
const fullText = 'Se inspeccionó la señal en el contexto del incidente; se adjunta el plan reversible y su validación.';
const full = () => ({
  decisionLocked: true,
  decisionCorrect: true,
  requiredExhibits: ['primary','secondary'],
  inspected: ['primary','secondary'],
  cited: ['primary','secondary'],
  report: {cause:fullText,mitigation:fullText,rollback:fullText,validation:fullText},
  acknowledged: true,
});
test('Senior V6 evaluation weights sum to 100, and truthful completed work reaches 100', () => {
  assert.equal(Object.values(SENIOR_SCORE_WEIGHTS).reduce((a,b)=>a+b,0),100);
  assert.ok(REPORT_MIN_CHARS>=50);
  assert.deepEqual(evaluateSeniorEvidence(full()).missingReportSections,[]);
  assert.equal(evaluateSeniorEvidence(full()).score,100);
  assert.equal(evaluateSeniorEvidence(full()).ready,true);
  assert.equal(evaluateSeniorEvidence(full()).educationalOnly,true);
});
test('decision must be submitted, not just selected',()=>{
  const pending=full();pending.decisionLocked=false;
  assert.equal(evaluateSeniorEvidence(pending).score,75);
  assert.equal(evaluateSeniorEvidence(pending).ready,false);
});
test('bad decision blocks progress despite long report and checked artifacts',()=>{
  const wrong=full();wrong.decisionCorrect=false;
  assert.equal(evaluateSeniorEvidence(wrong).ready,false);
  assert.equal(evaluateSeniorEvidence(wrong).score,75);
});
test('examining only the runbook or one artifact does not qualify',()=>{
  const item=full();item.inspected=['primary','procedure'];item.cited=['primary','procedure'];
  assert.equal(evaluateSeniorEvidence(item).examinedReady,false);
  assert.equal(evaluateSeniorEvidence(item).citationsReady,false);
  assert.equal(evaluateSeniorEvidence(item).score,65);
});
test('citations must reference the actual examined artifacts',()=>{
  const item=full();item.cited=['primary','procedure'];
  assert.equal(evaluateSeniorEvidence(item).citationsReady,false);
  assert.equal(evaluateSeniorEvidence(item).ready,false);
});
test('report requires analysis, mitigation, rollback and verification independently',()=>{
  for(const key of ['cause','mitigation','rollback','validation']){
    const item=full();item.report[key]='muy corto';
    const verdict=evaluateSeniorEvidence(item);
    assert.ok(verdict.missingReportSections.includes(key));
    assert.equal(verdict.reportReady,false);
    assert.equal(verdict.ready,false);
  }
});
test('failing to acknowledge limitations keeps report unregistered',()=>{
  const item=full();item.acknowledged=false;
  assert.equal(evaluateSeniorEvidence(item).score,90);
  assert.equal(evaluateSeniorEvidence(item).ready,false);
});
test('fake repeated evidence IDs do not count as distinct',()=>{
  const item=full();item.requiredExhibits=['primary','secondary'];item.inspected=['primary','primary'];item.cited=['primary','primary'];
  assert.equal(evaluateSeniorEvidence(item).examinedReady,false);
});
test('untrusted null data cannot be assessed as complete',()=>{
  const verdict=evaluateSeniorEvidence(null);
  assert.equal(verdict.ready,false);
  assert.equal(verdict.score,0);
});
