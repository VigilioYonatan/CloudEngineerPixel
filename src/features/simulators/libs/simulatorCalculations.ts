import { getProviderMeta, type CloudProviderId } from '../../../domain/providers';
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

function formatIpv4Int(value: number): string {
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join('.');
}

export function calculateCidrSubnet(
  cidr_input: string,
  cloud_id: CloudProviderId = 'aws',
): CidrCalculation | null {
  const parts = cidr_input.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
  if (!parts || parts.slice(1, 5).some((octet) => Number(octet) > 255) || Number(parts[5]) > 32) {
    return null;
  }

  const prefix = Number(parts[5]);
  const count = 2 ** (32 - prefix);
  const ip_int = parts.slice(1, 5).reduce((acc, octet) => ((acc << 8) | Number(octet)) >>> 0, 0);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const net = ip_int & mask;
  const reserved_count = getProviderMeta(cloud_id).cidrReservation.reservedCount;

  return {
    net: formatIpv4Int(net >>> 0),
    broadcast: formatIpv4Int((net | ~mask) >>> 0),
    count,
    prefix,
    host: Math.max(0, count - 2),
    cloudUsableHosts: Math.max(0, count - reserved_count),
    cloudReservedCount: reserved_count,
  };
}

export function evaluateEducationalIam(
  action: IamAction,
  scope: IamScope,
): EducationalIamEvaluation {
  const allowed = action === 'read' || (action === 'write' && scope === 'single');
  const explanation =
    action === 'admin'
      ? 'Las operaciones administrativas amplias requieren privilegios explícitos y una justificación fuerte.'
      : scope === 'all' && action === 'write'
        ? 'Modificar todos los recursos viola el alcance de esta política mínima de ejemplo.'
        : 'La operación está dentro de las reglas educativas configuradas.';

  return {
    allowed,
    explanation,
    policyDocument: {
      effect: allowed ? 'Allow' : 'Deny',
      action,
      resource: scope === 'single' ? 'resource/selected' : '*',
      model: 'educational',
    },
  };
}

export function calculateReplicaPlan(rps: number, capacity_per_replica: number): number {
  return Math.ceil(rps / Math.max(1, capacity_per_replica));
}

export function calculateSloBudget(availability: number, days: number): SloBudgetCalculation {
  const downtime_seconds = Math.round((1 - availability / 100) * days * 24 * 60 * 60);
  return {
    downtimeSeconds: downtime_seconds,
    minutes: Math.floor(downtime_seconds / 60),
  };
}

export function recommendArchitectureService(
  workload: WorkloadKind,
  priority: ArchitecturePriority,
): ArchitectureCategory {
  if (workload === 'events') return 'serverless';
  return priority === 'control' ? 'compute' : 'serverless';
}
