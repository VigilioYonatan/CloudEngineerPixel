export type RoutingPresetId =
  | 'healthy-three-tier'
  | 'missing-nat-egress'
  | 'nacl-stateless-return-block'
  | 'sg-db-port-closed'
  | 'public-db-exposure-blocked';

export type RoutingHopStatus = 'pass' | 'blocked' | 'skipped';

export type RoutingHop = {
  id: 'internet' | 'public-alb' | 'private-app' | 'isolated-db';
  label: string;
  status: RoutingHopStatus;
  detail: string;
};

export type RoutingEngineInput = {
  preset: RoutingPresetId;
  routeMatch: 'igw-0.0.0.0/0' | 'nat-gw' | 'local-vpc' | 'blackhole';
  sgAllowsPort: boolean;
  naclReturnAllowsEphemeral: boolean;
  privateEndpointEnabled: boolean;
};

export type RoutingEngineResult = {
  modelVersion: string;
  allowed: boolean;
  blockedHop: number | null;
  summary: string;
  hops: RoutingHop[];
  steps: string[];
};

export const ROUTING_PRESETS: Record<
  RoutingPresetId,
  { label: string; config: Omit<RoutingEngineInput, 'preset'> }
> = {
  'healthy-three-tier': {
    label: 'Tráfico sano Internet -> ALB -> App -> DB (Private Endpoint)',
    config: {
      routeMatch: 'local-vpc',
      sgAllowsPort: true,
      naclReturnAllowsEphemeral: true,
      privateEndpointEnabled: true,
    },
  },
  'missing-nat-egress': {
    label: 'Subred privada sin ruta NAT/Local válida (blackhole)',
    config: {
      routeMatch: 'blackhole',
      sgAllowsPort: true,
      naclReturnAllowsEphemeral: true,
      privateEndpointEnabled: true,
    },
  },
  'nacl-stateless-return-block': {
    label: 'NACL stateless bloquea puertos efímeros de retorno (1024-65535)',
    config: {
      routeMatch: 'local-vpc',
      sgAllowsPort: true,
      naclReturnAllowsEphemeral: false,
      privateEndpointEnabled: true,
    },
  },
  'sg-db-port-closed': {
    label: 'Security Group / Firewall bloquea tcp/5432 hacia BD aislada',
    config: {
      routeMatch: 'local-vpc',
      sgAllowsPort: false,
      naclReturnAllowsEphemeral: true,
      privateEndpointEnabled: true,
    },
  },
  'public-db-exposure-blocked': {
    label: 'Intento sin Private Endpoint hacia recurso interno restringido',
    config: {
      routeMatch: 'igw-0.0.0.0/0',
      sgAllowsPort: true,
      naclReturnAllowsEphemeral: true,
      privateEndpointEnabled: false,
    },
  },
};

export function runRoutingEngine(input: RoutingEngineInput): RoutingEngineResult {
  const hops: RoutingHop[] = [
    {
      id: 'internet',
      label: 'Internet / Cliente HTTPS',
      status: 'pass',
      detail: 'Solicitud TLS 443 hacia punto de entrada público.',
    },
    {
      id: 'public-alb',
      label: 'Subred Pública (ALB / NAT)',
      status: input.naclReturnAllowsEphemeral ? 'pass' : 'blocked',
      detail: input.naclReturnAllowsEphemeral
        ? 'NACL stateless permite ingreso 443 y retorno efímero (1024-65535).'
        : 'Bloqueo en Salto 2: NACL stateless rechaza el tráfico de retorno efímero.',
    },
    {
      id: 'private-app',
      label: 'Subred Privada (App)',
      status: !input.naclReturnAllowsEphemeral
        ? 'skipped'
        : input.routeMatch === 'blackhole'
          ? 'blocked'
          : 'pass',
      detail:
        input.routeMatch === 'blackhole'
          ? 'Bloqueo en Salto 3: Longest Prefix Match cae en ruta blackhole sin destino.'
          : `Tabla de rutas resuelve vía ${input.routeMatch}.`,
    },
    {
      id: 'isolated-db',
      label: 'Subred Aislada (DB / Private Endpoint)',
      status:
        !input.naclReturnAllowsEphemeral || input.routeMatch === 'blackhole'
          ? 'skipped'
          : !input.sgAllowsPort || !input.privateEndpointEnabled
            ? 'blocked'
            : 'pass',
      detail: !input.sgAllowsPort
        ? 'Bloqueo en Salto 4: Security Group / NSG no autoriza tcp/5432 desde App.'
        : !input.privateEndpointEnabled
          ? 'Bloqueo en Salto 4: Private Endpoint deshabilitado; política bloquea salida pública.'
          : 'Conexión stateful permitida por SG + Private Endpoint.',
    },
  ];

  const blockedIdx = hops.findIndex((h) => h.status === 'blocked');
  const allowed = blockedIdx === -1;
  const blockedHop = allowed ? null : blockedIdx + 1;
  const summary = allowed
    ? 'Paquete entregado extremo a extremo (4/4 saltos válidos).'
    : `Paquete bloqueado en salto ${blockedHop} (${hops[blockedIdx].label}).`;

  return {
    modelVersion: 'routing-v1.0',
    allowed,
    blockedHop,
    summary,
    hops,
    steps: hops.map(
      (h, i) => `Salto ${i + 1} · ${h.label}: [${h.status.toUpperCase()}] ${h.detail}`,
    ),
  };
}
