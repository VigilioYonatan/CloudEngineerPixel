import { getProviderMeta, type CloudProviderId } from '../../../domain/providers';

export type CidrEngineResult = {
  modelVersion: string;
  net: string;
  broadcast: string;
  count: number;
  prefix: number;
  host: number;
  cloudUsableHosts: number;
  cloudReservedCount: number;
  steps: string[];
};

function formatIpv4Int(value: number): string {
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join('.');
}

export function runCidrEngine(
  cidrInput: string,
  cloudId: CloudProviderId = 'aws',
): CidrEngineResult | null {
  const parts = cidrInput.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
  if (!parts || parts.slice(1, 5).some((octet) => Number(octet) > 255) || Number(parts[5]) > 32) {
    return null;
  }

  const prefix = Number(parts[5]);
  const count = 2 ** (32 - prefix);
  const ipInt = parts.slice(1, 5).reduce((acc, octet) => ((acc << 8) | Number(octet)) >>> 0, 0);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const net = (ipInt & mask) >>> 0;
  const broadcast = (net | (~mask >>> 0)) >>> 0;
  const meta = getProviderMeta(cloudId);
  const reserved = meta.cidrReservation.reservedCount;

  const rfcHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : Math.max(0, count - 2);
  const cloudUsableHosts = prefix >= 31 ? 0 : Math.max(0, count - reserved);

  const steps = [
    `1. Prefijo /${prefix} define 2^(32 - ${prefix}) = ${count.toLocaleString('es-ES')} direcciones totales.`,
    `2. Red base ${formatIpv4Int(net)} y broadcast ${formatIpv4Int(broadcast)}.`,
    prefix === 32
      ? '3. Caso /32: ruta de host único (1 IP), no válida como subred VPC/VNet.'
      : prefix === 31
        ? '3. Caso /31 (RFC 3021): enlace punto a punto (2 hosts), incompatible con subred cloud estándar.'
        : prefix === 0
          ? '3. Caso /0: bloque universal 0.0.0.0/0 (todo el espacio IPv4).'
          : `3. RFC clásico reserva 2 IPs (red + broadcast) = ${rfcHosts.toLocaleString('es-ES')} hosts.`,
    `4. ${meta.short} reserva ${reserved} IPs internas -> ${cloudUsableHosts.toLocaleString('es-ES')} utilizables.`,
  ];

  return {
    modelVersion: 'cidr-v2.0',
    net: formatIpv4Int(net),
    broadcast: formatIpv4Int(broadcast),
    count,
    prefix,
    host: rfcHosts,
    cloudUsableHosts,
    cloudReservedCount: reserved,
    steps,
  };
}
