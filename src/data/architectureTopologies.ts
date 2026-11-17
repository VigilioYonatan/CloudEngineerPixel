import { challenges } from './senior';
import { modules, type Provider } from './course';

export type ArchitectureLayerStatus = 'healthy' | 'degraded' | 'alert';

export type ArchitectureLayerNode = {
  id: 'ingress' | 'compute' | 'data' | 'control';
  zoneLabel: string;
  service: string;
  boundary: string;
  status: ArchitectureLayerStatus;
};

export type ArchitectureTopology = {
  id: string;
  title: string;
  provider: Provider;
  caption: string;
  accessibleDescription: string;
  layers: readonly [
    ArchitectureLayerNode,
    ArchitectureLayerNode,
    ArchitectureLayerNode,
    ArchitectureLayerNode,
  ];
};

type ArchetypePattern = Record<
  Provider,
  {
    ingress: string;
    compute: string;
    data: string;
    control: string;
    boundaryNote: string;
  }
>;

const ARCHETYPE_PATTERNS: Readonly<Record<string, ArchetypePattern>> = {
  network: {
    aws: {
      ingress: 'Route 53 + CloudFront + ALB (Subred Pública)',
      compute: 'Amazon VPC Regional · Subredes Privadas Multi-AZ',
      data: 'RDS Multi-AZ + S3 vía Gateway VPC Endpoint',
      control: 'IAM + Security Groups Stateful + VPC Flow Logs',
      boundaryNote: 'VPC regional aislada; tráfico privado hacia datos sin salir a Internet.',
    },
    azure: {
      ingress: 'Azure Front Door + Application Gateway WAF',
      compute: 'Azure VNet Regional · Subredes Delegadas + NSG',
      data: 'PostgreSQL Flexible + Blob vía Private Link',
      control: 'Entra ID RBAC + Azure Policy + Network Watcher',
      boundaryNote: 'Resource Group con VNet regional y Private Endpoints sin IP pública.',
    },
    gcp: {
      ingress: 'Cloud DNS + Cloud Armor + Global HTTPS LB',
      compute: 'Google Cloud VPC Global · Subredes Regionales',
      data: 'Cloud SQL Private Service Access + Cloud Storage',
      control: 'Cloud IAM + Hierarchical Firewall + Flow Logs',
      boundaryNote:
        'VPC global sin peering inter-regional; reglas de firewall por Service Account.',
    },
  },
  compute: {
    aws: {
      ingress: 'ALB TLS 1.3 + SSM Session Manager (Sin SSH 22)',
      compute: 'Auto Scaling Group EC2 Linux en Subred Privada',
      data: 'EBS GP3 Cifrado KMS + Snapshots Ciclo de Vida',
      control: 'Instance Profile IMDSv2 + CloudWatch Agent',
      boundaryNote: 'Cero llaves SSH expuestas; administración auditada vía SSM e IMDSv2.',
    },
    azure: {
      ingress: 'Azure Load Balancer + Azure Bastion Privado',
      compute: 'Virtual Machine Scale Sets (VMSS) Multi-Zona',
      data: 'Managed Disks ZRS Cifrados + Azure Backup',
      control: 'System-Assigned Managed Identity + Azure Monitor',
      boundaryNote: 'Acceso administrativo sin IP pública en NIC mediante Azure Bastion.',
    },
    gcp: {
      ingress: 'Cloud Load Balancing + Identity-Aware Proxy (IAP)',
      compute: 'Managed Instance Group (MIG) Compute Engine',
      data: 'Persistent Disk Regional + Snapshot Schedule',
      control: 'VM Service Account + OS Login IAM + Ops Agent',
      boundaryNote: 'Túnel TCP autenticado con IAP y permisos sudo gobernados por IAM.',
    },
  },
  containers: {
    aws: {
      ingress: 'AWS Load Balancer Controller + WAFv2',
      compute: 'Amazon EKS Control Plane + Nodos Privados Multi-AZ',
      data: 'Aurora PostgreSQL + ECR con Escaneo Inmutable',
      control: 'EKS Pod Identity / IRSA + CloudWatch Container Insights',
      boundaryNote: 'Cada ServiceAccount de pod asume un rol IAM mínimo sin credenciales de nodo.',
    },
    azure: {
      ingress: 'Azure App Routing Ingress + WAF Policy',
      compute: 'Azure Kubernetes Service (AKS) + CNI Overlay',
      data: 'Cosmos DB / PostgreSQL + Azure Container Registry',
      control: 'Azure Workload Identity + Container Insights',
      boundaryNote: 'Pods autenticados por OIDC contra Entra ID con Network Policies activas.',
    },
    gcp: {
      ingress: 'GKE Gateway API + Cloud Armor Edge Security',
      compute: 'Google Kubernetes Engine (GKE Autopilot VPC-Native)',
      data: 'AlloyDB / Cloud SQL + Artifact Registry',
      control: 'GKE Workload Identity + Cloud Monitoring Managed Prometheus',
      boundaryNote:
        'Rangos secundarios Alias IP para pods y binarios firmados desde Artifact Registry.',
    },
  },
  serverless: {
    aws: {
      ingress: 'Amazon API Gateway HTTP + EventBridge Bus',
      compute: 'AWS Lambda Idempotente + SQS + Dead-Letter Queue',
      data: 'Amazon DynamoDB On-Demand + S3 Event Notifications',
      control: 'Lambda Execution Role + AWS X-Ray + CloudTrail',
      boundaryNote: 'Desacoplamiento asíncrono con DLQ para aislar reintentos fallidos.',
    },
    azure: {
      ingress: 'Azure API Management + Event Grid Topics',
      compute: 'Azure Functions Flex Consumption + Service Bus DLQ',
      data: 'Azure Cosmos DB Serverless + Blob Containers',
      control: 'Managed Identity + Application Insights Distributed Tracing',
      boundaryNote: 'Procesamiento dirigido por eventos con claves de idempotencia y DLQ.',
    },
    gcp: {
      ingress: 'API Gateway / Cloud Endpoints + Eventarc',
      compute: 'Cloud Run / Cloud Run functions + Pub/Sub DLQ',
      data: 'Firestore / Cloud Storage con Object Versioning',
      control: 'Invoker IAM Role Dedicado + Cloud Trace + Audit Logs',
      boundaryNote: 'Invocación autenticada OIDC entre Pub/Sub y Cloud Run sin acceso anónimo.',
    },
  },
  governance: {
    aws: {
      ingress: 'GitHub Actions OIDC -> STS AssumeRoleWithWebIdentity',
      compute: 'AWS Organizations (OU Prod / Sandbox) + Terraform',
      data: 'S3 State Bucket Versionado + KMS + Object Lock',
      control: 'Service Control Policies (SCP) + Org CloudTrail + Budgets',
      boundaryNote: 'Guardrails preventivos SCP y federación efímera sin Access Keys estáticas.',
    },
    azure: {
      ingress: 'GitHub OIDC -> Entra ID Federated Credentials',
      compute: 'Management Groups + Subscriptions + Terraform/Bicep',
      data: 'Azure Storage State con Blob Lease + Key Vault',
      control: 'Azure Policy Deny/Audit + Cost Management Alerts',
      boundaryNote: 'Separación estricta entre identidad de Plan en PR e identidad de Apply.',
    },
    gcp: {
      ingress: 'GitHub OIDC -> Workload Identity Pool & Provider',
      compute: 'Organization -> Folders -> Projects Aislados + IaC',
      data: 'GCS State Bucket con Versioning + Cloud KMS',
      control: 'Organization Policy Constraints + Cloud Audit Logs',
      boundaryNote:
        'Cero llaves JSON descargadas; políticas de organización heredadas por carpeta.',
    },
  },
};

function selectModuleArchetype(moduleId: string): string {
  if (moduleId === 'networks' || moduleId === 'advanced-network') return 'network';
  if (moduleId === 'compute' || moduleId === 'storage' || moduleId === 'resilience')
    return 'compute';
  if (moduleId === 'containers' || moduleId === 'observability' || moduleId === 'sre-finops')
    return 'containers';
  if (
    moduleId === 'serverless' ||
    moduleId === 'software-architecture' ||
    moduleId === 'data-architecture'
  )
    return 'serverless';
  return 'governance';
}

function selectSeniorFaultConfig(caseId: string): {
  archetype: string;
  faultLayer: 'ingress' | 'compute' | 'data' | 'control';
} {
  const num = Number.parseInt(caseId.replace(/\D/g, ''), 10) || 1;
  if ([1, 8, 9, 13].includes(num)) return { archetype: 'governance', faultLayer: 'data' };
  if ([2, 3, 6, 15].includes(num)) return { archetype: 'governance', faultLayer: 'control' };
  if ([4, 5].includes(num)) return { archetype: 'network', faultLayer: 'ingress' };
  if ([7, 10, 12, 16].includes(num)) return { archetype: 'containers', faultLayer: 'compute' };
  return { archetype: 'serverless', faultLayer: 'compute' };
}

export function getModuleTopology(moduleId: string, provider: Provider): ArchitectureTopology {
  const mod = modules.find((item) => item.id === moduleId) || modules[0];
  const archetypeKey = selectModuleArchetype(mod.id);
  const spec = ARCHETYPE_PATTERNS[archetypeKey][provider];

  const layers: ArchitectureTopology['layers'] = [
    {
      id: 'ingress',
      zoneLabel: '01 · Internet / Edge',
      service: spec.ingress,
      boundary: 'Perímetro público TLS/WAF',
      status: 'healthy',
    },
    {
      id: 'compute',
      zoneLabel: '02 · App Privada',
      service: spec.compute,
      boundary: 'Subred privada sin exposición directa',
      status: 'healthy',
    },
    {
      id: 'data',
      zoneLabel: '03 · Datos Aislados',
      service: spec.data,
      boundary: 'Persistencia cifrada y respaldada',
      status: 'healthy',
    },
    {
      id: 'control',
      zoneLabel: '04 · IAM y Observabilidad',
      service: spec.control,
      boundary: ' Plano transversal de gobierno',
      status: 'healthy',
    },
  ];

  const caption = `Topología de referencia (${provider.toUpperCase()}) para ${mod.title}: ${spec.boundaryNote}`;
  const accessibleDescription = `Flujo de cuatro capas en ${provider.toUpperCase()}: entrada por ${spec.ingress}, ejecución privada en ${spec.compute}, persistencia aislada en ${spec.data}, gobernado transversalmente por ${spec.control}.`;

  return {
    id: `module:${mod.id}:${provider}`,
    title: `Arquitectura · ${mod.title}`,
    provider,
    caption,
    accessibleDescription,
    layers,
  };
}

export function getSeniorCaseTopology(caseId: string, provider: Provider): ArchitectureTopology {
  const challenge = challenges.find((item) => item.id === caseId) || challenges[0];
  const { archetype, faultLayer } = selectSeniorFaultConfig(challenge.id);
  const spec = ARCHETYPE_PATTERNS[archetype][provider];

  const statusFor = (id: 'ingress' | 'compute' | 'data' | 'control'): ArchitectureLayerStatus =>
    id === faultLayer ? 'alert' : id === 'control' ? 'degraded' : 'healthy';

  const layers: ArchitectureTopology['layers'] = [
    {
      id: 'ingress',
      zoneLabel: '01 · Entrada / Perímetro',
      service: spec.ingress,
      boundary: 'Frontera externa',
      status: statusFor('ingress'),
    },
    {
      id: 'compute',
      zoneLabel: '02 · Ejecución / Red',
      service: spec.compute,
      boundary: 'Plano de aplicación',
      status: statusFor('compute'),
    },
    {
      id: 'data',
      zoneLabel: '03 · Estado / Storage',
      service: spec.data,
      boundary: 'Plano de datos críticos',
      status: statusFor('data'),
    },
    {
      id: 'control',
      zoneLabel: '04 · IAM / Telemetría',
      service: spec.control,
      boundary: 'Señales de auditoría',
      status: statusFor('control'),
    },
  ];

  return {
    id: `senior:${challenge.id}:${provider}`,
    title: `Mapa de impacto · ${challenge.id.toUpperCase()} ${challenge.title}`,
    provider,
    caption: `Zona bajo investigación en ${provider.toUpperCase()} (${challenge.category}): inspecciona la capa marcada en alerta antes de aplicar cambios.`,
    accessibleDescription: `Topología del incidente ${challenge.id.toUpperCase()} en ${provider.toUpperCase()} con foco de investigación en la capa ${faultLayer}. Servicios involucrados: ${spec.ingress}, ${spec.compute}, ${spec.data} y ${spec.control}.`,
    layers,
  };
}
