/** Parse TypeScript + TSX without installing project deps; uses local/global TypeScript if available. */
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {readFileSync,readdirSync} from 'node:fs';
import {join,extname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const root=fileURLToPath(new URL('..',import.meta.url));
let ts;
try{ts=require('typescript');}
catch{
 try{const globalRoot=execFileSync('npm',['root','-g'],{encoding:'utf8'}).trim();ts=require(join(globalRoot,'typescript'));}
 catch{console.error('TypeScript parser not found. Install dependencies or TypeScript globally.');process.exit(2);}
}
const files=[];
function crawl(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){const loc=join(dir,entry.name);if(entry.isDirectory())crawl(loc);else if(['.ts','.tsx','.mts'].includes(extname(entry.name)))files.push(loc);}}
crawl(join(root,'src'));crawl(join(root,'tests/e2e'));
files.push(join(root,'playwright.config.ts'),join(root,'vite.config.ts'));
let failures=0;
for(const file of files){const script=file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS;const doc=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.ES2022,true,script);for(const issue of doc.parseDiagnostics){const loc=doc.getLineAndCharacterOfPosition(issue.start||0);console.error(`${file}:${loc.line+1}:${loc.character+1} ${ts.flattenDiagnosticMessageText(issue.messageText,' ')}`);failures++;}}
console.log(`Parsed ${files.length} TypeScript/TSX sources: ${failures} syntax errors. This is NOT a typecheck or bundler build.`);
if(failures)process.exit(1);
