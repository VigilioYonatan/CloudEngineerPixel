import {validateProgressImport} from './importValidation.mjs';
import {signal,effect} from '@preact/signals';
import type {Provider} from '../data/course';
export type View='home'|'learn'|'lesson'|'lab'|'simulator'|'senior'|'progress'|'settings';
export type SeniorAttempt={caseId:string;provider:Provider;correct:boolean;score:number;at:string;examined:string[];report?:{cause:string;mitigation:string;validation:string;rollback?:string;citations?:string[]}};
type Progress={completed:string[];quiz:Record<string,number>;senior:string[];notes:Record<string,string>;simRuns:number;seniorAttempts?:SeniorAttempt[]};
let warnedStorageFailure=false;
const empty=():Progress=>({completed:[],quiz:{},senior:[],notes:{},simRuns:0,seniorAttempts:[]});
function safeRead<T>(key:string, fallback:T):T {try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw) as T:fallback;}catch{return fallback;}}
const urlProvider=()=>{const p=new URLSearchParams(location.search).get('cloud');return p==='aws'||p==='azure'||p==='gcp'?p:null;};
const storedProvider=safeRead<string>('cea:provider','aws');
export const provider=signal<Provider>(urlProvider()||(storedProvider==='azure'||storedProvider==='gcp'?storedProvider:'aws'));
const storedTheme=safeRead<string>('cea:theme','dark');
export const theme=signal<'dark'|'light'>(storedTheme==='light'?'light':'dark');
export const view=signal<View>('home');
export const currentModule=signal('cloud-fundamentals');
export const currentTopic=signal(0);
export const levelFilter=signal('todos');
export const searchText=signal('');
export const progress=signal<Progress>((()=>{try{return validateProgressImport({progress:safeRead('cea:progress',empty())}) as Progress;}catch{return empty();}})());
export const mobileMenu=signal(false);
export const toast=signal('');
export function notify(message:string){toast.value=message;}
export function setProvider(p:Provider){if(!['aws','azure','gcp'].includes(p))return;provider.value=p;history.replaceState({},'',`${location.pathname}?cloud=${p}${location.hash}`);notify(`Ruta ${p.toUpperCase()} activada`);}
export function navigate(v:View,id?:string){if(id)currentModule.value=id;view.value=v;mobileMenu.value=false;window.scrollTo({top:0,behavior:'smooth'});location.hash=v+(id?'/'+id:'');}
export function completeTopic(id:string,p:Provider){const key=`${p}:${id}`;if(!progress.value.completed.includes(key))progress.value={...progress.value,completed:[...progress.value.completed,key]};notify('Lección completada. ¡Buen trabajo!');}
export function setQuiz(id:string,p:Provider,score:number){progress.value={...progress.value,quiz:{...progress.value.quiz,[`${p}:${id}`]:score}};}
export function recordSeniorAttempt(attempt:SeniorAttempt){progress.value={...progress.value,seniorAttempts:[...(progress.value.seniorAttempts||[]),attempt].slice(-300)};}
export function completeSenior(id:string){if(!progress.value.senior.includes(id))progress.value={...progress.value,senior:[...progress.value.senior,id]};}
export function setNotes(key:string,value:string){if(!/^[a-z0-9:_-]{1,140}$/.test(key)||['__proto__','constructor','prototype'].includes(key))return;progress.value={...progress.value,notes:{...progress.value.notes,[key]:value.slice(0,12000)}};}
export function clearProgress(){if(confirm('¿Eliminar todo tu progreso local? Esta acción no se puede deshacer.')){progress.value=empty();notify('Progreso reiniciado');}}
export function exportProgress(){const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),progress:progress.value},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='cloud-academy-progreso.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export async function importProgress(file:File){
 if(file.size>8*1024*1024)throw Error('El archivo supera 8 MB');
 let raw:unknown;
 try{raw=JSON.parse(await file.text());}catch{throw Error('El archivo no es JSON válido');}
 progress.value=validateProgressImport(raw) as Progress;
 notify('Progreso importado y validado correctamente');
}

effect(()=>{try{localStorage.setItem('cea:provider',JSON.stringify(provider.value));localStorage.setItem('cea:theme',JSON.stringify(theme.value));document.documentElement.dataset.theme=theme.value;document.documentElement.dataset.provider=provider.value;localStorage.setItem('cea:progress',JSON.stringify(progress.value));}catch{if(!warnedStorageFailure){warnedStorageFailure=true;notify('No fue posible guardar el progreso local. Exporta una copia JSON antes de cerrar esta pestaña.');}}});
if(typeof window!=='undefined'){window.addEventListener('hashchange',()=>{const [v,id]=location.hash.slice(1).split('/');const valid:View[]=['home','learn','lesson','lab','simulator','senior','progress','settings'];if(valid.includes(v as View)){view.value=v as View;if(id)currentModule.value=id;}});const [v,id]=location.hash.slice(1).split('/');if(['home','learn','lesson','lab','simulator','senior','progress','settings'].includes(v)){view.value=v as View;if(id)currentModule.value=id;}}
