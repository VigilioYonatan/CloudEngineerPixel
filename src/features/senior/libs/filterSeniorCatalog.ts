import type { Challenge } from '../../../data/senior';

export type SeniorDomainFilter =
  | 'Todos'
  | 'IaC'
  | 'Security'
  | 'FinOps'
  | 'Kubernetes'
  | 'SRE'
  | 'Resilience'
  | 'Architecture';

export type SeniorStatusFilter = 'Todos' | 'Sin iniciar' | 'En curso' | 'Registrado';

export const SENIOR_DOMAIN_OPTIONS: SeniorDomainFilter[] = [
  'Todos',
  'IaC',
  'Security',
  'FinOps',
  'Kubernetes',
  'SRE',
  'Resilience',
  'Architecture',
];

export const SENIOR_STATUS_OPTIONS: SeniorStatusFilter[] = [
  'Todos',
  'Sin iniciar',
  'En curso',
  'Registrado',
];

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function getChallengeDomain(item: Challenge): Exclude<SeniorDomainFilter, 'Todos'> {
  const haystack = `${item.category} ${item.skills.join(' ')}`.toLowerCase();
  if (haystack.includes('iac') || haystack.includes('terraform')) return 'IaC';
  if (
    haystack.includes('security') ||
    haystack.includes('iam') ||
    haystack.includes('secret') ||
    haystack.includes('devsecops') ||
    haystack.includes('incident')
  )
    return 'Security';
  if (haystack.includes('finops')) return 'FinOps';
  if (haystack.includes('kubernetes') || haystack.includes('k8s')) return 'Kubernetes';
  if (haystack.includes('disaster') || haystack.includes('resilience') || haystack.includes('dr'))
    return 'Resilience';
  if (haystack.includes('sre') || haystack.includes('operations') || haystack.includes('capacity'))
    return 'SRE';
  return 'Architecture';
}

export function getChallengeStatus(
  caseId: string,
  completedIds: Set<string>,
  inProgressIds: Set<string>,
): Exclude<SeniorStatusFilter, 'Todos'> {
  if (completedIds.has(caseId)) return 'Registrado';
  if (inProgressIds.has(caseId)) return 'En curso';
  return 'Sin iniciar';
}

export type FilterSeniorCatalogParams = {
  items: Challenge[];
  query: string;
  severity: string;
  domain: SeniorDomainFilter;
  status: SeniorStatusFilter;
  completedIds: Set<string>;
  inProgressIds: Set<string>;
};

export function filterSeniorCatalog({
  items,
  query,
  severity,
  domain,
  status,
  completedIds,
  inProgressIds,
}: FilterSeniorCatalogParams): Challenge[] {
  const normalizedQuery = normalizeSearchText(query);
  return items.filter((item) => {
    const matchesSeverity = severity === 'Todas' || item.severity === severity;
    const matchesDomain = domain === 'Todos' || getChallengeDomain(item) === domain;
    const itemStatus = getChallengeStatus(item.id, completedIds, inProgressIds);
    const matchesStatus = status === 'Todos' || itemStatus === status;
    const searchable = normalizeSearchText(
      `${item.id} ${item.title} ${item.category} ${item.brief} ${item.skills.join(' ')}`,
    );
    const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
    return matchesSeverity && matchesDomain && matchesStatus && matchesQuery;
  });
}
