import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('V9: each of the 18 Senior incidents has complete operational guardrails',()=>{
 const source=readFileSync(new URL('../src/data/seniorPlaybooks.ts',import.meta.url),'utf8');
 const ids=[...source.matchAll(/^\s*(s\d{2}):\s*\{/gm)].map(m=>m[1]);
 assert.deepEqual(ids,Array.from({length:18},(_,i)=>`s${String(i+1).padStart(2,'0')}`));
 for(const id of ids){
  const begin=source.indexOf(`  ${id}:`);const end=source.indexOf('\n  s',begin+4);
  const chunk=source.slice(begin,end<0?source.length:end);
  for(const field of ['impact','owner','immediate','prohibited','recoverySignal','retrospective'])assert.match(chunk,new RegExp(`${field}:`),`${id} missing ${field}`);
 }
});
