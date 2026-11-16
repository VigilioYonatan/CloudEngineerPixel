import {readdirSync, readFileSync} from 'node:fs';
import {join, extname} from 'node:path';
const root = new URL('../',import.meta.url);
const ignore = new Set(['node_modules','.git','dist','coverage','public']);
const extensions = new Set(['.ts','.tsx','.mjs','.js','.json','.yml','.yaml','.html']);
const signatures = [
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,'Private key block'],
  [/AKIA[0-9A-Z]{16}/,'AWS access key identifier'],
  [/AIza[0-9A-Za-z_-]{35}/,'Google API key'],
  [/gh[pousr]_[A-Za-z0-9_]{30,}/,'GitHub token'],
];
function inspect(directory){
  for(const e of readdirSync(directory,{withFileTypes:true})){
    if(ignore.has(e.name))continue;
    const file=join(directory,e.name);
    if(e.isDirectory()){inspect(file);continue;}
    if(!extensions.has(extname(e.name)) || e.name==='check-secrets.mjs')continue;
    const raw=readFileSync(file,'utf8');
    for(const [pattern,title] of signatures){if(pattern.test(raw)){console.error(`${title} in ${file}`);process.exitCode=1;}}
  }
}
inspect(root.pathname);
if(!process.exitCode)console.log('No obvious credentials detected. This is not a substitute for enterprise secret scanning.');
