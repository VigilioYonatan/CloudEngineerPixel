import type { Provider } from '../course';
import type { UnitCloudAdapter, UnitContentSpec } from '../../domain/curriculum';

export type CompactUnitInput = {
  code: string;
  moduleId: string;
  idx: number;
  title: string;
  objective: string;
  mins: number;
  prereqs: string[];
  mentalModel: string;
  antipattern: string;
  glossary: [string, string][];
  aws: [string, string, string];
  azure: [string, string, string];
  gcp: [string, string, string];
  activity: string;
};

const DOCS: Record<Provider, string> = {
  aws: 'https://docs.aws.amazon.com/',
  azure: 'https://learn.microsoft.com/azure/',
  gcp: 'https://cloud.google.com/docs',
};

function toAdapter(
  p: Provider,
  [service, snippet, criticalDiff]: [string, string, string],
): UnitCloudAdapter {
  return { service, snippet, criticalDiff, officialDocUrl: DOCS[p], verifiedAt: '2026-11-16' };
}

export function buildUnitSpec(u: CompactUnitInput): [string, UnitContentSpec] {
  return [
    `${u.moduleId}:${u.idx}`,
    {
      unitCode: u.code,
      moduleId: u.moduleId,
      unitIndex: u.idx,
      title: u.title,
      objective: u.objective,
      estimatedMinutes: u.mins,
      prerequisites: u.prereqs,
      mentalModel: u.mentalModel,
      antipattern: u.antipattern,
      glossary: u.glossary.map(([term, definition]) => ({ term, definition })),
      adapters: {
        aws: toAdapter('aws', u.aws),
        azure: toAdapter('azure', u.azure),
        gcp: toAdapter('gcp', u.gcp),
      },
      verifiableActivity: u.activity,
    },
  ];
}
