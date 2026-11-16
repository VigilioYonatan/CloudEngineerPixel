import {describe,it} from 'node:test';
import assert from 'node:assert/strict';
import {createSeniorCheckpoint,parseSeniorCheckpoint,SENIOR_CHECKPOINT_MAX_BYTES} from '../src/lib/seniorCheckpoint.mjs';
import {emptySeniorSession} from '../src/lib/seniorSession.mjs';
const time='2026-11-11T12:20:00.000Z';
const session={...emptySeniorSession(),stage:'informe',inspected:['primary','secondary'],cited:['primary'],diagnosisChoice:1,diagnosisLocked:true,answers:{cause:'Causa documentada',mitigation:'Contención',rollback:'Reversión',validation:'Validación'}};
describe('V9: checkpoint de expediente Senior individual',()=>{
  it('exporta e importa un expediente exactamente para el proveedor y caso seleccionados',()=>{
    const exported=createSeniorCheckpoint('azure','s07',session,time);
    assert.equal(exported.schema,'cloud-engineering-academy/senior-checkpoint');
    assert.deepEqual(parseSeniorCheckpoint(JSON.stringify(exported),'azure','s07'),session);
    assert.equal(exported.exportedAt,time);
  });
  it('prohíbe importar expedientes AWS en Azure o en otro caso',()=>{
    const encoded=JSON.stringify(createSeniorCheckpoint('aws','s05',session,time));
    assert.throws(()=>parseSeniorCheckpoint(encoded,'azure','s05'),/otro caso o proveedor/);
    assert.throws(()=>parseSeniorCheckpoint(encoded,'aws','s06'),/otro caso o proveedor/);
  });
  it('no importa estados de completitud, puntuaciones ni revisiones inyectados',()=>{
    const crafted=createSeniorCheckpoint('gcp','s18',session,time);
    crafted.score=100;crafted.senior=['gcp:s18'];crafted.review={grade:'aprobado'};
    const restored=parseSeniorCheckpoint(JSON.stringify(crafted),'gcp','s18');
    assert.equal(restored.score,undefined);
    assert.equal(restored.senior,undefined);
    assert.equal(restored.review,undefined);
  });
  it('normaliza la sesión contra listas maliciosas y claves inesperadas',()=>{
    const crafted=createSeniorCheckpoint('aws','s01',session,time);
    crafted.session.inspected=['primary','__proto__','secondary','evil'];
    crafted.session.cited=['primary','evil'];
    crafted.session.answers={cause:'Bueno',mitigation:7,rollback:null,validation:'x'.repeat(20000)};
    crafted.session.stage='operator';
    crafted.session.choice=999;
    const result=parseSeniorCheckpoint(JSON.stringify(crafted),'aws','s01');
    assert.deepEqual(result.inspected,['primary','secondary']);
    assert.deepEqual(result.cited,['primary']);
    assert.equal(result.stage,'investigar');
    assert.equal(result.choice,null);
    assert.equal(result.answers.mitigation,'');
    assert.equal(result.answers.validation.length,1800);
    assert.equal({}.polluted,undefined);
  });
  it('rechaza JSON ilegible, fechas inválidas y límites de tamaño',()=>{
    assert.throws(()=>parseSeniorCheckpoint('{','aws','s01'),/JSON válido/);
    const cp=createSeniorCheckpoint('aws','s01',session,time);cp.exportedAt='ayer';
    assert.throws(()=>parseSeniorCheckpoint(JSON.stringify(cp),'aws','s01'),/datos incompletos/);
    assert.throws(()=>parseSeniorCheckpoint('z'.repeat(SENIOR_CHECKPOINT_MAX_BYTES+1),'aws','s01'),/48 KB/);
    assert.throws(()=>createSeniorCheckpoint('aws','s99',session,time),/inválido/);
  });
  it('prohíbe un formato ajeno, un scope falsificado o una sesión inexistente',()=>{
    const cp=createSeniorCheckpoint('aws','s01',session,time);
    cp.version=42;
    assert.throws(()=>parseSeniorCheckpoint(JSON.stringify(cp),'aws','s01'),/incompatible/);
    cp.version=1;cp.session=null;
    assert.throws(()=>parseSeniorCheckpoint(JSON.stringify(cp),'aws','s01'),/datos incompletos/);
    cp.session=session;cp.provider='__proto__';
    assert.throws(()=>parseSeniorCheckpoint(JSON.stringify(cp),'aws','s01'),/otro caso o proveedor/);
  });
});
