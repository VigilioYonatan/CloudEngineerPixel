export type SimulatorMode =
  | 'cidr'
  | 'iam'
  | 'scale'
  | 'slo'
  | 'architecture'
  | 'routing'
  | 'terraform-plan'
  | 'k8s'
  | 'load-balancing'
  | 'finops'
  | 'dr'
  | 'messaging';

export type IamAction = 'read' | 'write' | 'admin';

export type IamScope = 'single' | 'all';

export type WorkloadKind = 'web' | 'events' | 'batch';

export type ArchitecturePriority = 'simple' | 'control' | 'scale';

export type ArchitectureCategory = 'compute' | 'serverless';

export type CidrCalculation = {
  net: string;
  broadcast: string;
  count: number;
  prefix: number;
  host: number;
  cloudUsableHosts: number;
  cloudReservedCount: number;
};

export type EducationalIamEvaluation = {
  allowed: boolean;
  explanation: string;
  policyDocument: {
    effect: 'Allow' | 'Deny';
    action: IamAction;
    resource: 'resource/selected' | '*';
    model: 'educational';
  };
};

export type SloBudgetCalculation = {
  downtimeSeconds: number;
  minutes: number;
};
