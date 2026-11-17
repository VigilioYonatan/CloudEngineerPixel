import type { Provider } from '../data/course';

export type UnitCloudAdapter = {
  service: string;
  snippet: string;
  criticalDiff: string;
  officialDocUrl: string;
  verifiedAt: string;
};

export type UnitGlossaryEntry = {
  term: string;
  definition: string;
};

export type UnitContentSpec = {
  unitCode: string;
  moduleId: string;
  unitIndex: number;
  title: string;
  objective: string;
  estimatedMinutes: number;
  prerequisites: string[];
  mentalModel: string;
  antipattern: string;
  glossary: UnitGlossaryEntry[];
  adapters: Record<Provider, UnitCloudAdapter>;
  verifiableActivity: string;
};
