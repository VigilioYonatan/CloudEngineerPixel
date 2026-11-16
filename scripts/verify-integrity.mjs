/**
 * Release verifier. V9 snapshots the full V8 archive, preserving historical manifests.
 * Neither missing files nor changes not declared in the current manifest are acceptable.
 */
import {createHash} from 'node:crypto';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const latest='docs/FILE_MANIFEST_V9.json';
const manifestPath=path.join(root,existsSync(path.join(root,latest))?latest:'docs/FILE_MANIFEST_V8.json');
const sha256=buffer=>createHash('sha256').update(buffer).digest('hex');
const excludes=new Set(['node_modules','.git','dist','test-results','playwright-report','coverage']);
function listFiles(dir,relative=''){
  return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
    if(excludes.has(entry.name))return [];
    const rel=path.posix.join(relative,entry.name);
    return entry.isDirectory()?listFiles(path.join(dir,entry.name),rel):[rel];
  });
}
if(!existsSync(manifestPath)){console.error('Missing release manifest:',manifestPath);process.exit(1);}
const data=JSON.parse(readFileSync(manifestPath,'utf8'));
const files={...data.originalFiles,...data.addedFiles};
let failures=0;
for(const [rel,baseline] of Object.entries(files)){
  const loc=path.resolve(root,rel);
  if(!loc.startsWith(root+path.sep)){console.error('INVALID FILE PATH:',rel);failures++;continue;}
  if(!existsSync(loc)){console.error('MISSING:',rel);failures++;continue;}
  const current=sha256(readFileSync(loc));
  const expected=data.currentHashes[rel]??baseline;
  if(current!==expected){console.error('MODIFIED WITHOUT MANIFEST UPDATE:',rel);failures++;}
}
const skip=new Set([path.relative(root,manifestPath).replaceAll(path.sep,'/')]);
const actual=listFiles(root).filter(rel=>!skip.has(rel)).sort();
const expected=Object.keys(files).sort();
for(const rel of actual.filter(rel=>!expected.includes(rel))){console.error('UNTRACKED:',rel);failures++;}
for(const rel of expected.filter(rel=>!actual.includes(rel))){console.error('REMOVED:',rel);failures++;}
if(data.removed.length){console.error('Manifest reports removed files:',data.removed);failures++;}
console.log(`Integrity ${data.version??'V6'}: ${data.originalCount} baseline files, ${data.addedCount} additions, ${data.modified.length} modified, ${failures} issues.`);
if(failures)process.exit(1);
