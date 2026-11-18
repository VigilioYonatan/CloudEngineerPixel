/** Zero-dependency, conservative DevSecOps source checks; not a replacement for CodeQL or npm audit. */
import {readFileSync, readdirSync} from 'node:fs';
import {resolve, relative, join, extname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const allowedExtensions=new Set(['.ts','.tsx','.js','.mjs']);
const rules=[
  {id:'no-dynamic-evaluation',severity:'high',pattern:/\b(?:eval|Function)\s*\(/g,reason:'Dynamic code evaluation'},
  {id:'no-unsafe-html-sinks',severity:'high',pattern:/\b(?:dangerouslySetInnerHTML|\.innerHTML\s*=|document\.write\s*\()/g,reason:'HTML injection sink'},
  {id:'no-client-cloud-credentials',severity:'critical',pattern:/\b(?:VITE_(?:AWS|AZURE|GCP)_(?:SECRET|TOKEN|KEY)|import\.meta\.env\.(?:AWS_SECRET|AZURE_CLIENT_SECRET|GOOGLE_APPLICATION_CREDENTIALS))\b/g,reason:'Potential credential shipped to browser'},
  {id:'no-insecure-http-sources',severity:'medium',pattern:/\bfetch\s*\(\s*['"]http:\/\//g,reason:'Unencrypted network fetch'},
  {id:'no-console-secrets',severity:'high',pattern:/console\.log\s*\([^\n]*(?:accessToken|secretAccessKey|privateKey)/gi,reason:'Potential sensitive value in console'},
];
export const listRules=()=>rules.map(({id,severity,reason})=>({id,severity,reason}));
export function scanSource(source,path='<inline>'){
 const findings=[];
 for(const {id,severity,pattern,reason} of rules){
  pattern.lastIndex=0;
  for(const match of source.matchAll(pattern)){
   const line=source.slice(0,match.index).split('\n').length;
   findings.push({path,line,id,severity,reason});
  }
 }
 return findings;
}
function list(dir){
 return readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
  const loc=join(dir,e.name);
  if(e.isDirectory())return list(loc);
  return allowedExtensions.has(extname(e.name))?[loc]:[];
 });
}
export function auditRepository(){
 const dir=join(root,'src');
 return list(dir).flatMap(loc=>scanSource(readFileSync(loc,'utf8'),relative(root,loc)));
}
const invoked=process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url);
if(invoked){
 const findings=auditRepository();
 if(findings.length){for(const f of findings){console.error(`${f.severity}: ${f.path}:${f.line} (${f.id}) ${f.reason}`);}process.exitCode=1;}
 else console.log('Static DevSecOps rules: no unsafe code or client credential patterns in src. Not a vulnerability certification.');
}
