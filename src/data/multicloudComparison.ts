import type { Provider } from './course';

export type ProviderArchitectureSpec = {
  service: string;
  hierarchy: string;
  iamModel: string;
  billingModel: string;
};

export type MulticloudComparisonEntry = {
  capabilityId: string;
  title: string;
  providers: Record<Provider, ProviderArchitectureSpec>;
  nonEquivalence: string;
};

export const MULTICLOUD_CAPABILITY_COMPARISONS: Readonly<
  Record<string, MulticloudComparisonEntry>
> = {
  fundamentals: {
    capabilityId: 'fundamentals',
    title: 'Jerarquía Organizacional y Aislamiento de Cuentas',
    providers: {
      aws: {
        service: 'AWS Organizations + Control Tower',
        hierarchy: 'Organization Root -> Organizational Units (OU) -> AWS Account -> Región -> AZ.',
        iamModel: 'Service Control Policies (SCP) fijan límites máximos; IAM otorga permisos.',
        billingModel: 'Consolidated Billing en cuenta pagadora; facturación aislada por cuenta.',
      },
      azure: {
        service: 'Microsoft Entra Tenant + Management Groups',
        hierarchy: 'Tenant -> Management Groups -> Subscription -> Resource Group -> Región.',
        iamModel: 'Azure Policy impone guardrails; Azure RBAC hereda desde Management Group.',
        billingModel:
          'Facturación por Subscription y seguimiento granular por Resource Group/Tags.',
      },
      gcp: {
        service: 'Google Cloud Organization + Resource Manager',
        hierarchy: 'Organization -> Folders -> Project -> Recursos globales, regionales o zonales.',
        iamModel:
          'Organization Policies restringen configuraciones; IAM Bindings heredan hacia abajo.',
        billingModel: 'Cloud Billing Account vinculada a múltiples Projects con etiquetas FinOps.',
      },
    },
    nonEquivalence:
      'Azure exige un Resource Group obligatorio para todo recurso; AWS agrupa por Cuenta/Región/Tags y GCP aísla límites de API, cuotas y red directamente a nivel de Project.',
  },
  network: {
    capabilityId: 'network',
    title: 'Redes Virtuales, Subredes y Enrutamiento (VPC / VNet)',
    providers: {
      aws: {
        service: 'Amazon VPC + Transit Gateway',
        hierarchy:
          'VPC estrictamente regional; cada subred está anclada a 1 sola Availability Zone.',
        iamModel:
          'Security Groups stateful por ENI + Network ACL stateless por subred + VPC Endpoint Policies.',
        billingModel:
          'NAT Gateway por hora y GB procesado, datos inter-AZ e IPv4 pública por hora.',
      },
      azure: {
        service: 'Azure Virtual Network (VNet) + Virtual WAN',
        hierarchy:
          'VNet regional dentro de un Resource Group; las subredes abarcan múltiples zonas.',
        iamModel:
          'Network Security Groups (NSG) y Application Security Groups (ASG) en subred o NIC.',
        billingModel: 'NAT Gateway, VNet Peering por GB entrante/saliente y tráfico inter-zonal.',
      },
      gcp: {
        service: 'Google Cloud VPC + Cloud Router',
        hierarchy:
          'VPC global que cruza regiones sin peering; cada subred es regional (multi-zona).',
        iamModel:
          'Hierarchical Firewall Policies + VPC Firewall Rules basadas en Service Accounts o Tags.',
        billingModel:
          'Cloud NAT por puerta/hora y GB, egress inter-regional y uso de IPs externas.',
      },
    },
    nonEquivalence:
      'Una VPC en GCP es global y sus subredes son regionales (reservando 4 IPs por CIDR), mientras que en AWS la VPC es regional y cada subred vive en una sola AZ (AWS y Azure reservan 5 IPs por CIDR).',
  },
  compute: {
    capabilityId: 'compute',
    title: 'Cómputo Elástico, Identidad de Máquina y Acceso Remoto',
    providers: {
      aws: {
        service: 'Amazon EC2 + Systems Manager Session Manager',
        hierarchy:
          'Instancia zonal conectada por ENI a una subred de AZ con volúmenes EBS zonales.',
        iamModel:
          'Instance Profile con IAM Role temporal vía IMDSv2 (sin llaves estáticas en disco).',
        billingModel: 'Por segundo/hora (On-Demand, Savings Plans, Spot) más EBS GP3 provisionado.',
      },
      azure: {
        service: 'Azure Virtual Machines + Azure Bastion',
        hierarchy:
          'VM en Resource Group y Región (opcionalmente anclada a Availability Zone o VMSS).',
        iamModel: 'System/User-Assigned Managed Identity autenticada contra Entra ID vía IMDS.',
        billingModel:
          'Cómputo por minuto/hora (Pay-as-you-go, Reservations, Spot) más Managed Disks.',
      },
      gcp: {
        service: 'Compute Engine + Identity-Aware Proxy (IAP TCP)',
        hierarchy: 'VM zonal dentro de un Project conectada a subred regional de una VPC global.',
        iamModel: 'Service Account adjunta a la VM + OS Login gobernado por roles IAM.',
        billingModel:
          'Por segundo con Sustained Use Discounts automáticos, Committed Use y Spot VMs.',
      },
    },
    nonEquivalence:
      'En GCP las claves SSH y sudo pueden gobernarse centralmente vía IAM OS Login + IAP sin IP pública; en AWS el equivalente sin bastión es SSM Session Manager y en Azure requiere Azure Bastion o Entra Login.',
  },
  storage: {
    capabilityId: 'storage',
    title: 'Almacenamiento de Objetos, Ciclo de Vida y Durabilidad',
    providers: {
      aws: {
        service: 'Amazon S3',
        hierarchy: 'Namespace global de nombre de bucket, pero datos almacenados en una Región.',
        iamModel: 'Unión de IAM Policies, S3 Bucket Policies, Block Public Access y KMS Grants.',
        billingModel:
          'GB-mes por clase (Standard, IA, Glacier), solicitudes PUT/GET y transferencia.',
      },
      azure: {
        service: 'Azure Blob Storage',
        hierarchy:
          'Subscription -> Resource Group -> Storage Account (regional) -> Container -> Blob.',
        iamModel:
          'Entra ID RBAC sobre planos de control/datos, SAS Tokens acotados y Private Link.',
        billingModel:
          'Capacidad por tier (Hot, Cool, Cold, Archive), redundancia LRS/ZRS/GRS y operaciones.',
      },
      gcp: {
        service: 'Cloud Storage',
        hierarchy:
          'Project -> Bucket ( ubicación regional, dual-region o multi-region ) -> Objeto.',
        iamModel: 'Uniform Bucket-Level Access recomendado con IAM Bindings y CMEK en Cloud KMS.',
        billingModel:
          'GB-mes por clase (Standard, Nearline, Coldline, Archive), operaciones y recuperación.',
      },
    },
    nonEquivalence:
      'Azure introduce la capa intermedia Storage Account antes del contenedor; AWS S3 y GCP Cloud Storage operan directamente sobre buckets con nombres globalmente únicos.',
  },
  identity: {
    capabilityId: 'identity',
    title: 'Identidad Cloud, Federación OIDC y Mínimo Privilegio',
    providers: {
      aws: {
        service: 'AWS IAM + IAM Identity Center + STS',
        hierarchy:
          'IAM es global por cuenta; STS emite credenciales cortas AssumeRoleWithWebIdentity.',
        iamModel:
          'Evaluación explícita: Deny gana siempre; requiere cruce de SCP, Boundary, Identity y Resource Policy.',
        billingModel:
          'IAM y STS no tienen cargo directo; KMS cobra por CMK mensual y llamadas criptográficas.',
      },
      azure: {
        service: 'Microsoft Entra ID + Workload Identity Federation',
        hierarchy:
          'Identidades viven en el Tenant global; permisos RBAC se asignan en MG/Sub/RG/Recurso.',
        iamModel:
          'Separación estricta entre roles de directorio Entra ID y roles de recursos Azure RBAC.',
        billingModel:
          'Entra ID Free incluido; funciones P1/P2 (Conditional Access, PIM) se licencian por usuario.',
      },
      gcp: {
        service: 'Cloud IAM + Workload Identity Federation',
        hierarchy:
          'Identidades de Google/Cloud Identity federadas hacia Organization, Folder o Project.',
        iamModel:
          'Bindings aditivos (Principal + Role sobre Recurso) más IAM Deny Policies explícitas.',
        billingModel:
          'Cloud IAM y Workload Identity Federation sin costo; Secret Manager y KMS por uso.',
      },
    },
    nonEquivalence:
      'En GCP las políticas IAM tradicionales son aditivas por herencia (no puedes quitar en un Project un rol Allow heredado desde Organization salvo usando IAM Deny Policies); en AWS cada cuenta nace aislada por defecto.',
  },
  kubernetes: {
    capabilityId: 'kubernetes',
    title: 'Kubernetes Administrado e Identidad de Pods',
    providers: {
      aws: {
        service: 'Amazon EKS (Managed Node Groups / Fargate)',
        hierarchy: 'Clúster regional multi-AZ con ENIs de la VPC asignadas vía AWS VPC CNI.',
        iamModel: 'EKS Pod Identity / IRSA vincula ServiceAccount de Kubernetes con IAM Role.',
        billingModel:
          'Cargo fijo por hora por cada clúster EKS (control plane) más nodos EC2/Fargate.',
      },
      azure: {
        service: 'Azure Kubernetes Service (AKS)',
        hierarchy: 'Clúster en Resource Group con Node Pools sobre VMSS y Azure CNI Overlay.',
        iamModel:
          'Azure Workload Identity federa ServiceAccount del pod con User-Assigned Managed Identity.',
        billingModel: 'Tier Free para laboratorio o Standard con SLA de uptime por hora más VMSS.',
      },
      gcp: {
        service: 'Google Kubernetes Engine (GKE Standard / Autopilot)',
        hierarchy: 'Clúster zonal o regional VPC-native usando rangos secundarios de IP para pods.',
        iamModel: 'Workload Identity Federation for GKE mapea KSA directamente a permisos IAM.',
        billingModel:
          'Crédito mensual para un clúster zonal/Autopilot; cobro por pod en Autopilot o nodos.',
      },
    },
    nonEquivalence:
      'AWS EKS consume IPs primarias de subred por cada pod con VPC CNI estándar (riesgo de agotamiento CIDR), mientras GKE usa Alias IP en rangos secundarios y AKS ofrece Azure CNI Overlay aislado.',
  },
  serverless: {
    capabilityId: 'serverless',
    title: 'Cómputo Serverless, Eventos e Idempotencia',
    providers: {
      aws: {
        service: 'AWS Lambda + EventBridge + SQS',
        hierarchy: 'Función regional ejecutada en microVMs Firecracker; acceso opcional a VPC.',
        iamModel:
          'Execution Role (lo que Lambda puede hacer) separado de Resource Policy (quién la invoca).',
        billingModel:
          'Por millón de invocaciones y GB-segundo consumido (más Provisioned Concurrency).',
      },
      azure: {
        service: 'Azure Functions + Event Grid + Service Bus',
        hierarchy:
          'Function App desplegada sobre un Hosting Plan (Flex Consumption, Premium o Dedicated).',
        iamModel:
          'Managed Identity saliente y autorización por Entra ID o Function Keys entrantes.',
        billingModel:
          'Depende del plan: por ejecución en Consumption o instancias calientes en Premium.',
      },
      gcp: {
        service: 'Cloud Run / Cloud Run functions + Eventarc + Pub/Sub',
        hierarchy:
          'Servicio regional basado en contenedores OCI sobre infraestructura serverless unificada.',
        iamModel:
          'Invocación autenticada mediante rol roles/run.invoker e identidad de ejecución dedicada.',
        billingModel:
          'CPU/memoria solo durante requests (o instancia mínima > 0) más número de solicitudes.',
      },
    },
    nonEquivalence:
      'En GCP, funciones y contenedores convergen sobre Cloud Run (modelo estándar HTTP/OCI con concurrencia multi-request por instancia), mientras AWS Lambda aísla 1 evento simultáneo por entorno de ejecución.',
  },
  database: {
    capabilityId: 'database',
    title: 'Bases de Datos Administradas, Alta Disponibilidad y RPO/RTO',
    providers: {
      aws: {
        service: 'Amazon RDS / Aurora + DynamoDB',
        hierarchy:
          'Subnet Group multi-AZ dentro de VPC; réplica síncrona standby para failover automático.',
        iamModel: 'Security Groups de red + IAM Database Authentication + cifrado KMS.',
        billingModel:
          'Instancia por hora, IOPS/almacenamiento, snapshots extra y transferencia cross-AZ.',
      },
      azure: {
        service: 'Azure Database for PostgreSQL Flexible + Cosmos DB',
        hierarchy:
          'Servidor regional con opción Zone-Redundant HA y Private Endpoint / VNet Integration.',
        iamModel: 'Autenticación nativa con identidades de Microsoft Entra ID y Private DNS Zones.',
        billingModel:
          'vCores + RAM por hora, IOPS/disco provisionado y retención extendida de backups.',
      },
      gcp: {
        service: 'Cloud SQL + AlloyDB + Firestore/Spanner',
        hierarchy:
          'Instancia regional con HA primario/standby entre zonas vía Private Service Access.',
        iamModel: 'Cloud SQL Auth Proxy + IAM Database Authentication sin abrir IPs públicas.',
        billingModel:
          'vCPU y memoria dedicadas por hora, discos SSD regionales (doble en HA) y egress.',
      },
    },
    nonEquivalence:
      'GCP ofrece Cloud SQL Auth Proxy para cifrar y autenticar conexiones por IAM sin gestionar certificados SSL manuales; en AWS RDS Proxy es un componente facturado por separado por vCPU.',
  },
  monitor: {
    capabilityId: 'monitor',
    title: 'Observabilidad, Auditoría Inmutable, SLOs y FinOps',
    providers: {
      aws: {
        service: 'Amazon CloudWatch + AWS CloudTrail + X-Ray',
        hierarchy:
          'Métricas y Log Groups regionales; CloudTrail Organization Trail agrega auditoría.',
        iamModel: 'Políticas IAM por Log Group y retención protegida en buckets S3 Object Lock.',
        billingModel:
          'Ingesta de logs por GB (alto impacto de costo), métricas custom, alarmas y queries.',
      },
      azure: {
        service: 'Azure Monitor + Log Analytics + Activity Log',
        hierarchy:
          'Activity Log de suscripción enrutado vía Diagnostic Settings a Log Analytics Workspace.',
        iamModel: 'RBAC por Workspace o por recurso (Resource-context queries con lenguaje KQL).',
        billingModel:
          'GB diarios ingeridos en Log Analytics (Commitment Tiers) y retención posterior.',
      },
      gcp: {
        service: 'Cloud Monitoring + Cloud Logging + Cloud Audit Logs',
        hierarchy:
          'Log Router por Project/Folder/Org hacia Log Buckets con soporte nativo de SLOs.',
        iamModel:
          'Admin Activity Audit Logs siempre activos e inmutables; Data Access configurable.',
        billingModel:
          'Primer tramo mensual gratuito por proyecto; cobro por GiB ingerido en Cloud Logging.',
      },
    },
    nonEquivalence:
      'En Azure debes configurar explícitamente Diagnostic Settings en cada recurso para enviar logs de plataforma a un Log Analytics Workspace; en GCP los Admin Activity Audit Logs están activos sin cargo ni configuración previa.',
  },
  iac: {
    capabilityId: 'iac',
    title: 'Infraestructura como Código (IaC) y Custodia de Estado Remoto',
    providers: {
      aws: {
        service: 'Terraform / OpenTofu (Backend S3) + CloudFormation',
        hierarchy:
          'Bucket S3 versionado y cifrado con KMS + bloqueo nativo S3 lockfile / DynamoDB.',
        iamModel: 'GitHub Actions OIDC asume rol de Plan (lectura) separado del rol de Apply.',
        billingModel:
          'Terraform es gratuito; solo pagas centavos del backend S3/KMS y los recursos creados.',
      },
      azure: {
        service: 'Terraform / OpenTofu (Backend AzureRM) + Bicep',
        hierarchy: 'Storage Account dedicada con Blob Leases automáticos para bloqueo de estado.',
        iamModel:
          'Federated Credentials en Entra ID separando Service Principals de PR vs Producción.',
        billingModel:
          'Bicep no requiere archivo de estado externo; Terraform cobra solo centavos del Blob.',
      },
      gcp: {
        service: 'Terraform / OpenTofu (Backend GCS) + Infrastructure Manager',
        hierarchy:
          'Bucket de Cloud Storage con Object Versioning y bloqueo fuerte consistente nativo.',
        iamModel:
          'Workload Identity Pool sin JSON keys e impersonación de Service Account de despliegue.',
        billingModel:
          'Solo almacenamiento del objeto tfstate en GCS más los recursos aprovisionados.',
      },
    },
    nonEquivalence:
      'Azure Bicep y AWS CloudFormation delegan el estado al plano de control del proveedor, mientras Terraform/OpenTofu exige proteger, versionar y bloquear explícitamente el archivo tfstate remoto.',
  },
};

const MODULE_TO_COMPARISON_KEY: Readonly<Record<string, string>> = {
  'cloud-fundamentals': 'fundamentals',
  networks: 'network',
  compute: 'compute',
  storage: 'storage',
  identity: 'identity',
  costs: 'fundamentals',
  'cloud-cli': 'identity',
  'advanced-network': 'network',
  serverless: 'serverless',
  containers: 'kubernetes',
  iac: 'iac',
  observability: 'monitor',
  'software-architecture': 'serverless',
  governance: 'fundamentals',
  resilience: 'database',
  'data-architecture': 'database',
  'sre-finops': 'monitor',
  capstone: 'iac',
};

export function getModuleMulticloudComparison(moduleId: string): MulticloudComparisonEntry {
  const key = MODULE_TO_COMPARISON_KEY[moduleId] || 'fundamentals';
  return MULTICLOUD_CAPABILITY_COMPARISONS[key];
}
