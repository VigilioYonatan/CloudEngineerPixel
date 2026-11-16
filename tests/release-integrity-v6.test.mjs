import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {readFileSync} from 'node:fs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
test('V6 includes every previous V5 file, with no silent deletions or missing resources',()=>{
  const data=JSON.parse(readFileSync(path.join(root,'docs/FILE_MANIFEST_V6.json'),'utf8'));
  assert.equal(data.removed.length,0);
  assert.equal(data.originalCount,234);
  const result=spawnSync(process.execPath,['scripts/verify-integrity.mjs'],{cwd:root,encoding:'utf8'});
  assert.equal(result.status,0,result.stdout+'\n'+result.stderr);
});
