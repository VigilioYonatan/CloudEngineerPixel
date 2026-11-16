/**
 * Offline formative assessment, intentionally NOT a credential or cryptographic attestation.
 * Review scores are judgments entered manually by a human. Untrusted backups are normalized.
 */
export const REVIEW_VERSION = 1;
export const REVIEW_MAX_BYTES = 24000;
export const REVIEW_WEIGHTS = Object.freeze({
  evidence: 25,
  security: 20,
  recovery: 25,
  validation: 20,
  communication: 10,
});
export const REVIEW_KEYS = Object.freeze(Object.keys(REVIEW_WEIGHTS));
const providers = new Set(['aws', 'azure', 'gcp']);
const validCase = id => typeof id === 'string' && /^s(0[1-9]|1[0-8])$/.test(id);
const plain = value => !!value && typeof value === 'object' && !Array.isArray(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const sanitizeText = (value, max) => typeof value === 'string' ? value.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,'').slice(0,max) : '';
export function emptyInstructorReview(provider,caseId){
  if(!providers.has(provider)||!validCase(caseId))throw new Error('Caso de revisión inválido');
  return {version:REVIEW_VERSION,provider,caseId,reviewer:'',notes:'',scores:{evidence:null,security:null,recovery:null,validation:null,communication:null},reviewedAt:null};
}
export function reviewKey(provider,caseId){
  if(!providers.has(provider)||!validCase(caseId))throw new Error('Caso de revisión inválido');
  return `senior-review:${provider}:${caseId}`;
}
export function normalizeInstructorReview(raw,provider,caseId){
  const empty=emptyInstructorReview(provider,caseId);
  if(!plain(raw)||raw.version!==REVIEW_VERSION||raw.provider!==provider||raw.caseId!==caseId)return empty;
  const scoresRaw=plain(raw.scores)?raw.scores:{};
  const scores=Object.fromEntries(REVIEW_KEYS.map(k=>[k, Number.isInteger(scoresRaw[k])&&scoresRaw[k]>=0&&scoresRaw[k]<=4?scoresRaw[k]:null]));
  return {...empty,reviewer:sanitizeText(raw.reviewer,80),notes:sanitizeText(raw.notes,4000),scores,reviewedAt:typeof raw.reviewedAt==='string'&&!Number.isNaN(Date.parse(raw.reviewedAt))?raw.reviewedAt.slice(0,40):null};
}
export function parseInstructorReview(raw,provider,caseId){
  if(typeof raw!=='string'||BufferLength(raw)>REVIEW_MAX_BYTES)return emptyInstructorReview(provider,caseId);
  try{return normalizeInstructorReview(JSON.parse(raw),provider,caseId);}catch{return emptyInstructorReview(provider,caseId);}
}
// Browser-compatible UTF-8 byte count, also protects against oversized multibyte inputs.
const BufferLength = raw => new TextEncoder().encode(raw).length;
export function gradeInstructorReview(raw){
  const grades=REVIEW_KEYS.map(k=>raw?.scores?.[k]);
  const scored=grades.every(v=>Number.isInteger(v)&&v>=0&&v<=4);
  const score=scored?Math.round(REVIEW_KEYS.reduce((sum,key)=>sum+REVIEW_WEIGHTS[key]*raw.scores[key]/4,0)):null;
  const hasReasoning=typeof raw?.notes==='string'&&raw.notes.trim().length>=40;
  const hasReviewer=typeof raw?.reviewer==='string'&&raw.reviewer.trim().length>=2;
  const complete=scored&&hasReasoning&&hasReviewer;
  const criticalRisk=scored&&(raw.scores.security<2||raw.scores.recovery<2);
  return Object.freeze({score,complete,criticalRisk,decision:!complete?'sin-revisar':score>=80&&!criticalRisk?'aprobado-en-revision-local':'requiere-mejoras',official:false});
}
export function exportInstructorReview(raw,provider,caseId,now=new Date().toISOString()){
  const review=normalizeInstructorReview(raw,provider,caseId);
  const grade=gradeInstructorReview(review);
  if(!grade.complete)throw new Error('Completa los cinco criterios, el alias y una justificación de 40 caracteres');
  return Object.freeze({...review,reviewedAt:now,grade,notice:'Revisión educativa local sin autenticación ni firma; no equivale a una certificación profesional.'});
}
