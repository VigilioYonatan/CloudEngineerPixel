import type { CloudProviderId } from '../../../domain/providers';
import { runArchitectureDecisionEngine } from '../engines/architectureDecisionEngine';
import { runAutoscalingEngine } from '../engines/autoscalingEngine';
import { runCidrEngine } from '../engines/cidrEngine';
import { runIamEngine } from '../engines/iamEngine';
import { runSloEngine } from '../engines/sloEngine';
import type {
  ArchitectureCategory,
  ArchitecturePriority,
  CidrCalculation,
  EducationalIamEvaluation,
  IamAction,
  IamScope,
  SloBudgetCalculation,
  WorkloadKind,
} from '../types/simulator.types';

export function calculateCidrSubnet(
  cidrInput: string,
  cloudId: CloudProviderId = 'aws',
): CidrCalculation | null {
  const res = runCidrEngine(cidrInput, cloudId);
  if (!res) return null;
  return {
    net: res.net,
    broadcast: res.broadcast,
    count: res.count,
    prefix: res.prefix,
    host: res.host,
    cloudUsableHosts: res.cloudUsableHosts,
    cloudReservedCount: res.cloudReservedCount,
  };
}

export function evaluateEducationalIam(
  action: IamAction,
  scope: IamScope,
): EducationalIamEvaluation {
  const res = runIamEngine({
    cloudId: 'aws',
    action,
    scope,
    guardrailDeny: false,
    mfaRequired: false,
    mfaPresent: true,
    regionMatched: true,
  });
  return {
    allowed: res.allowed,
    explanation: res.explanation,
    policyDocument: {
      effect: res.policyDocument.effect,
      action: res.policyDocument.action,
      resource: res.policyDocument.resource,
      model: 'educational',
    },
  };
}

export function calculateReplicaPlan(rps: number, capacityPerReplica: number): number {
  return runAutoscalingEngine(rps, capacityPerReplica).replicas;
}

export function calculateSloBudget(availability: number, days: number): SloBudgetCalculation {
  const res = runSloEngine(availability, days);
  return { downtimeSeconds: res.downtimeSeconds, minutes: res.minutes };
}

export function recommendArchitectureService(
  workload: WorkloadKind,
  priority: ArchitecturePriority,
): ArchitectureCategory {
  return runArchitectureDecisionEngine('aws', workload, priority).category;
}
