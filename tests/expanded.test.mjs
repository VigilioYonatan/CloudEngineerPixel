import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
const txt=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('90 topic-specific workshops have a verified structure',()=>{const source=txt('src/data/study.ts');assert.equal((source.match(/'[^']+:\d+':\{/g)||[]).length,90);assert.equal((source.match(/"verify":/g)||[]).length,90)});
test('54 provider lab workbooks exist',()=>{for(const cloud of ['aws','azure','gcp']){const d=new URL('../labs/'+cloud+'/',import.meta.url);const labs=readdirSync(d).filter(x=>x.endsWith('.md')&&x!=='README.md');assert.equal(labs.length,18);for(const name of labs){const content=readFileSync(new URL(name,d),'utf8');assert.match(content,/## Rúbrica/);assert.match(content,/## Cleanup/)}}});
test('18 incident workbooks exist',()=>{const d=new URL('../labs/senior/',import.meta.url);assert.equal(readdirSync(d).filter(x=>x.endsWith('.md')).length,18)});
test('senior cases are contextualized by provider',()=>{const content=txt('src/App.tsx');assert.match(content,/seniorService/);assert.match(content,/provider.value}:\$\{chosen.id/);assert.match(content,/Architecture Decision Studio/);assert.match(content,/ProviderCheck/)});
test('custom themes and mascot assets for all 3 routes',()=>{const c=txt('src/data/course.ts');for(const p of ['aws','azure','gcp'])assert.match(c,new RegExp(p+":\\{name:"));for(const p of ['cloud-mentor-original.jpg','cloud-mentor-azure.png','cloud-mentor-gcp.png'])assert.ok(existsSync(new URL('../public/assets/'+p,import.meta.url)))});
