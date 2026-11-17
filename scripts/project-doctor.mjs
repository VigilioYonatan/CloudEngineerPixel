/** Read-only environment preflight. No cloud login, network call or mutation. */
import {createRequire} from 'node:module';
import {existsSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const require=createRequire(import.meta.url);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const packageData=JSON.parse(readFileSync(path.join(root,'package.json'),'utf8'));
const required=Object.keys({...packageData.dependencies,...packageData.devDependencies});
const missing=[];
for(const dep of required){try{require.resolve(dep,{paths:[root]});}catch{try{require.resolve(`${dep}/package.json`,{paths:[root]});}catch{missing.push(dep);}}}
const nodeMajor=Number.parseInt(process.versions.node,10);
const hasLock=existsSync(path.join(root,'package-lock.json'));
const report={
  project:packageData.name,
  node:process.versions.node,
  nodeSupported:nodeMajor>=22,
  dependencyCount:required.length,
  missingDependencies:missing,
  packageLockPresent:hasLock,
  expectedLabs:'Solo simulaciones locales; Terraform y comandos cloud requieren credenciales propias y autorización explícita.',
  readyForBuild:nodeMajor>=22 && missing.length===0,
  reproducibleInstall:hasLock,
};
if(process.argv.includes('--json'))console.log(JSON.stringify(report,null,2));
else{
 console.log(`Cloud Engineering Academy · preflight Node ${report.node}`);
 console.log(`Dependencias: ${required.length-missing.length}/${required.length} resueltas${missing.length?` · faltan: ${missing.join(', ')}`:''}`);
 console.log(`package-lock.json: ${hasLock?'presente':'ausente (ejecuta npm install, revisa y versiona el lockfile)'}`);
 console.log(`Build: ${report.readyForBuild?'prerrequisitos disponibles (ejecuta npm run build)':'no ejecutable hasta instalar dependencias'}`);
 console.log('Esta revisión no garantiza una compilación ni valida servicios cloud reales.');
}
if(!report.readyForBuild)process.exitCode=2;
