/** Node-only static checks: runnable before npm dependencies are installed. */
import {readFileSync, existsSync, statSync} from 'node:fs';
import {resolve, dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=rel=>readFileSync(join(root,rel),'utf8');
const cases=[...read('src/data/senior.ts').matchAll(/id:\s*['"](s\d\d)['"]/g)].map(m=>m[1]);
const diagnostics=[...read('src/data/seniorDiagnostics.ts').matchAll(/^\s*(s\d\d):\s*\{/gm)].map(m=>m[1]);
const providers=['aws','azure','gcp'];
const errors=[];
const playbooks=[...read('src/data/seniorPlaybooks.ts').matchAll(/^\s*(s\d\d):\s*\{/gm)].map(m=>m[1]);
if(playbooks.length!==18||playbooks.join(',')!==cases.join(','))errors.push('Playbooks do not correspond to 18 Senior incidents');
if(cases.length!==18||new Set(cases).size!==18)errors.push('Expected 18 unique Senior incidents');
if(diagnostics.length!==18||diagnostics.join(',')!==cases.join(','))errors.push('Diagnostic cases do not correspond to Senior incidents');
for(const cloud of providers){
  const mascot={aws:'cloud-mentor-original.jpg',azure:'cloud-mentor-azure.png',gcp:'cloud-mentor-gcp.png'}[cloud];
  if(!existsSync(join(root,'public/assets',mascot)))errors.push(`Missing ${cloud} mascot`);
  for(const id of cases){
    for(const folder of [`labs/senior/providers/${cloud}`,`public/senior-guides/${cloud}`]){
      const filename=join(root,folder,`${id}.md`);
      if(!existsSync(filename)||statSync(filename).size<400)errors.push(`Missing/incomplete workbook: ${folder}/${id}.md`);
    }
  }
}
// Validate local source references without needing a bundler installed.
const fileNames=['src/App.tsx','src/SeniorWorkbench.tsx','src/InstructorReview.tsx','src/main.tsx','src/config/appMeta.ts',
  ...['course','knowledge','senior','seniorDiagnostics','seniorInvestigations','seniorPractices','seniorRubric','study'].map(x=>`src/data/${x}.ts`),
  'src/lib/state.ts','src/lib/instructorReview.mjs','src/data/seniorPlaybooks.ts','src/lib/seniorCheckpoint.mjs'];
for(const rel of fileNames){
  if(!existsSync(join(root,rel))){errors.push(`Missing source: ${rel}`);continue;}
  for(const match of read(rel).matchAll(/from\s+['"](\.[^'"\n]+)['"]/g)){
    const target=resolve(root,dirname(rel),match[1]);
    if(![target,`${target}.ts`,`${target}.tsx`,`${target}.mjs`,`${target}.js`].some(existsSync))errors.push(`Unresolved source import ${rel}: ${match[1]}`);
  }
}
if(errors.length){errors.forEach(x=>console.error(x));process.exit(1);}
console.log(`Source graph valid: ${cases.length} incidents, ${diagnostics.length} diagnoses, ${playbooks.length} playbooks, ${cases.length*providers.length} provider notebooks, 3 mascots.`);
