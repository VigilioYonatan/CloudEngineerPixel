import type {SeniorSession} from './seniorSession.mjs';
export declare const SENIOR_CHECKPOINT_SCHEMA: string;
export declare const SENIOR_CHECKPOINT_VERSION: number;
export declare const SENIOR_CHECKPOINT_MAX_BYTES: number;
export declare function createSeniorCheckpoint(provider:'aws'|'azure'|'gcp', caseId:string, session:SeniorSession, exportedAt?:string): {
  schema:string; version:number; provider:string; caseId:string; exportedAt:string; simulation:boolean;
  session:SeniorSession; notice:string;
};
export declare function parseSeniorCheckpoint(contents:string,expectedProvider:'aws'|'azure'|'gcp',expectedCaseId:string):SeniorSession;
