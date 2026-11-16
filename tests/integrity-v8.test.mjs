import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=new URL('../',import.meta.url);
const read=rel=>JSON.parse(readFileSync(new URL(rel,root),'utf8'));
test('V8 manifest lists every V7 file, no deletions and real SHA-256 hashes',()=>{
 const data=read('docs/FILE_MANIFEST_V8.json');
 assert.equal(data.version,'V8');assert.equal(data.removed.length,0);assert.equal(data.originalCount,263);
 assert.equal(Object.keys(data.originalFiles).length,263);
 for(const [name,hash] of Object.entries(data.originalFiles)){assert.match(hash,/^[a-f0-9]{64}$/);assert.ok(existsSync(new URL(name,root)),name)}
});
test('V8 checksum verification matches all declared new or changed files',()=>{
 const result=spawnSync(process.execPath,['scripts/verify-integrity.mjs'],{cwd:new URL('.',root),encoding:'utf8'});
 assert.equal(result.status,0,result.stdout+'\n'+result.stderr);
});
test('V8 release documents explicit non-production limitations and teacher review',()=>{
 const docs=['docs/RELEASE_NOTES_V8.md','docs/DEVSECOPS_V8.md','docs/SENIOR_REVIEW_V8.md','schemas/instructor-review.schema.json'];
 for(const rel of docs)assert.ok(existsSync(new URL(rel,root)),rel);
 const schema=read('schemas/instructor-review.schema.json');
 assert.equal(schema.properties.grade.properties.official.const,false);
});
