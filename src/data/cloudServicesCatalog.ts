import type { Provider } from './course';

export type CloudServiceHighlight = {
  category: string;
  name: string;
  shortLabel: string;
  summary: string;
};

export const CLOUD_ESSENTIAL_SERVICES_2026: Readonly<
  Record<Provider, readonly CloudServiceHighlight[]>
> = {
  aws: [
    {
      category: 'Cómputo',
      name: 'Amazon EC2',
      shortLabel: 'Amazon EC2',
      summary: 'Instancias elásticas con Graviton4, Savings Plans e IMDSv2.',
    },
    {
      category: 'Kubernetes',
      name: 'Amazon EKS Auto Mode',
      shortLabel: 'EKS Auto Mode',
      summary: 'Gestión automática de nodos, cómputo, almacenamiento y red en EKS.',
    },
    {
      category: 'Serverless',
      name: 'AWS Lambda',
      shortLabel: 'AWS Lambda',
      summary: 'Funciones orientadas a eventos integradas con EventBridge y SQS.',
    },
    {
      category: 'Redes',
      name: 'Amazon VPC',
      shortLabel: 'Amazon VPC',
      summary: 'Subredes zonales, Transit Gateway y PrivateLink sin tráfico público.',
    },
    {
      category: 'Storage',
      name: 'Amazon S3',
      shortLabel: 'Amazon S3',
      summary: 'Almacenamiento de objetos con Object Lock, KMS y Block Public Access.',
    },
    {
      category: 'Bases de Datos',
      name: 'Amazon Aurora',
      shortLabel: 'Aurora / RDS',
      summary: 'Motor relacional distribuido compatible con PostgreSQL y MySQL.',
    },
    {
      category: 'Identidad',
      name: 'AWS IAM Identity Center',
      shortLabel: 'IAM Identity Center',
      summary: 'Federación SSO multi-cuenta, STS OIDC y mínimo privilegio.',
    },
    {
      category: 'IA Generativa',
      name: 'Amazon Bedrock',
      shortLabel: 'Amazon Bedrock',
      summary: 'Plataforma administrada de modelos fundacionales, RAG y agentes.',
    },
    {
      category: 'Observabilidad',
      name: 'Amazon CloudWatch',
      shortLabel: 'CloudWatch + X-Ray',
      summary: 'Métricas, logs, alarmas SLO y trazas distribuidas.',
    },
  ],
  azure: [
    {
      category: 'Cómputo',
      name: 'Azure Virtual Machines',
      shortLabel: 'Azure VMs',
      summary: 'Máquinas virtuales y VMSS con acceso seguro vía Azure Bastion.',
    },
    {
      category: 'Contenedores',
      name: 'Azure Container Apps',
      shortLabel: 'Container Apps',
      summary: 'Microservicios y agentes serverless sobre Kubernetes administrado.',
    },
    {
      category: 'Kubernetes',
      name: 'Azure Kubernetes Service (AKS)',
      shortLabel: 'Azure AKS',
      summary: 'Orquestación empresarial con Azure CNI Overlay y Workload Identity.',
    },
    {
      category: 'Serverless',
      name: 'Azure Functions',
      shortLabel: 'Azure Functions',
      summary: 'Ejecución por eventos con plan Flex Consumption y Service Bus.',
    },
    {
      category: 'Redes',
      name: 'Azure Virtual Network',
      shortLabel: 'Azure VNet',
      summary: 'Subredes multi-zona, NSG, Application Gateway WAF y Private Link.',
    },
    {
      category: 'Bases de Datos',
      name: 'Azure Cosmos DB & PostgreSQL Flexible',
      shortLabel: 'Cosmos DB',
      summary: 'Base distribuida con búsqueda vectorial nativa y PostgreSQL HA.',
    },
    {
      category: 'Identidad',
      name: 'Microsoft Entra ID',
      shortLabel: 'Entra ID',
      summary: 'Identidad Zero Trust, Managed Identities y Workload Federation.',
    },
    {
      category: 'IA Generativa',
      name: 'Microsoft Foundry',
      shortLabel: 'Microsoft Foundry',
      summary: 'Plataforma unificada (antes Azure AI Foundry) para modelos y agentes.',
    },
    {
      category: 'Observabilidad',
      name: 'Azure Monitor',
      shortLabel: 'Azure Monitor',
      summary: 'Métricas, Log Analytics KQL y Application Insights.',
    },
  ],
  gcp: [
    {
      category: 'Cómputo',
      name: 'Compute Engine',
      shortLabel: 'Compute Engine',
      summary: 'VMs zonales con OS Login IAM e Identity-Aware Proxy (IAP).',
    },
    {
      category: 'Kubernetes',
      name: 'GKE Autopilot',
      shortLabel: 'GKE Autopilot',
      summary: 'Kubernetes totalmente gestionado con cobro por pod y VPC-native.',
    },
    {
      category: 'Serverless',
      name: 'Cloud Run & Cloud Run functions',
      shortLabel: 'Cloud Run functions',
      summary: 'Plataforma serverless unificada para contenedores OCI y funciones Eventarc.',
    },
    {
      category: 'Redes',
      name: 'Google Cloud VPC',
      shortLabel: 'Cloud VPC Global',
      summary: 'Red global con subredes regionales, Cloud Armor y Cloud NAT.',
    },
    {
      category: 'Storage',
      name: 'Cloud Storage',
      shortLabel: 'Cloud Storage',
      summary: 'Buckets regionales y dual-region con Uniform Access y CMEK.',
    },
    {
      category: 'Bases de Datos',
      name: 'AlloyDB & Cloud SQL',
      shortLabel: 'AlloyDB / Cloud SQL',
      summary: 'PostgreSQL de alto rendimiento con almacenamiento distribuido e IAM Auth.',
    },
    {
      category: 'Identidad',
      name: 'Google Cloud IAM',
      shortLabel: 'Cloud IAM',
      summary: 'Jerarquía Org/Folder/Project, Deny Policies y Workload Identity.',
    },
    {
      category: 'IA Generativa',
      name: 'Vertex AI',
      shortLabel: 'Vertex AI',
      summary: 'Modelos Gemini, Model Garden, RAG y agentes con SDK google-genai.',
    },
    {
      category: 'Observabilidad',
      name: 'Cloud Monitoring & Logging',
      shortLabel: 'Cloud Monitoring',
      summary: 'SLOs nativos, Cloud Trace y Cloud Audit Logs inmutables.',
    },
  ],
};

export const SENIOR_MODE_PILLARS: readonly string[] = [
  'Incidentes Reales',
  'Zero Trust OIDC',
  'RTO / RPO & FinOps',
];
