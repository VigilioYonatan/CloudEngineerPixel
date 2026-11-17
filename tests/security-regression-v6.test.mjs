import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {validateProgressImport} from '../src/lib/importValidation.mjs';
import {readConcatenatedSources} from './support/readSourceTree.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=rel=>readFileSync(path.join(root,rel),'utf8');
const sample=()=>({progress:{completed:['aws:compute:0'],senior:['aws:s01'],quiz:{'aws:compute':88},notes:{'senior:aws:s01':'ok'},simRuns:1,seniorAttempts:[{
  caseId:'s01',provider:'aws',correct:true,at:'2026-11-11T10:00:00Z',score:100,examined:['primary','secondary'],report:{cause:'a',mitigation:'b',rollback:'c',validation:'d',citations:['primary','secondary']},
}]}});
test('old progress imports preserve new valid rollback and citation metadata',()=>{
  const result=validateProgressImport(sample());
  assert.equal(result.seniorAttempts[0].report.rollback,'c');
  assert.deepEqual(result.seniorAttempts[0].report.citations,['primary','secondary']);
});
test('poisoned or oversized citations get sanitized',()=>{
  const obj=sample();obj.progress.seniorAttempts[0].report.citations=['primary','__proto__','constructor','secondary','secondary','extra'.repeat(1000)];
  assert.deepEqual(validateProgressImport(obj).seniorAttempts[0].report.citations,['primary','secondary']);
});
test('provider selector guards corrupted saved values',()=>{
  const code=read('src/lib/state.ts');
  assert.match(code,/storedProvider\s*===\s*['"]azure['"]\s*\|\|\s*storedProvider\s*===\s*['"]gcp['"]/);
  assert.match(code,/if\s*\(\s*!\s*\[\s*['"]aws['"],\s*['"]azure['"],\s*['"]gcp['"]\s*\]\.includes\(p\)\s*\)\s*return/);
});
test('never include cloud secrets, credentials or write operations in web labs',()=>{
  const ui=readConcatenatedSources(['src/SeniorWorkbench.tsx','src/features/senior']);
  assert.doesNotMatch(ui,/terraform (apply|destroy)|aws sts assume-role.*secret|process\.env\.AWS_SECRET_ACCESS_KEY/);
  assert.match(ui,/READ ONLY \/ SYNTHETIC EVIDENCE/);
});
test('quality tooling includes scoped Biome, E2E, CI, and supply chain audit',()=>{
  for(const rel of ['.github/workflows/devsecops.yml','biome.json','playwright.config.ts','tests/e2e/academy.spec.ts','scripts/verify-integrity.mjs'])assert.ok(existsSync(path.join(root,rel)),rel);
  assert.match(read('package.json'),/"test:e2e"/);
  assert.match(read('package.json'),/"lint"/);
  assert.match(read('.github/workflows/devsecops.yml'),/npm audit/);
  assert.match(read('.github/workflows/devsecops.yml'),/npm run test:e2e/);
});
