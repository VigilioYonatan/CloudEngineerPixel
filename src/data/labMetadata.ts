import type { SimulatorRouteId } from '../app/router';
import type { Provider } from './course';

export type LabVerifiableMetadata = {
  moduleId: string;
  estimatedMinutes: number;
  prerequisites: string[];
  linkedSimulator: SimulatorRouteId;
  minimumPermissions: Record<Provider, string>;
  billableResources: Record<Provider, string>;
  postCleanupChecks: Record<Provider, string>;
  reviewedAt: string;
};

const BASE_PERMS: Record<string, Record<Provider, string>> = {
  network: {
    aws: 'ec2:DescribeVpcs, ec2:DescribeSubnets, ec2:DescribeRouteTables',
    azure: 'Microsoft.Network/virtualNetworks/read, routeTables/read',
    gcp: 'compute.networks.get, compute.subnetworks.list, compute.routes.list',
  },
  compute: {
    aws: 'ec2:DescribeInstances, ssm:DescribeInstanceInformation',
    azure: 'Microsoft.Compute/virtualMachines/read',
    gcp: 'compute.instances.list, compute.zones.list',
  },
  storage: {
    aws: 's3:ListAllMyBuckets, s3:GetBucketPublicAccessBlock, s3:GetEncryptionConfiguration',
    azure: 'Microsoft.Storage/storageAccounts/read, blobServices/containers/read',
    gcp: 'storage.buckets.get, storage.buckets.getIamPolicy',
  },
  security: {
    aws: 'iam:GetRole, iam:ListAttachedRolePolicies, kms:DescribeKey',
    azure: 'Microsoft.Authorization/roleAssignments/read, Microsoft.KeyVault/vaults/read',
    gcp: 'resourcemanager.projects.getIamPolicy, cloudkms.cryptoKeys.get',
  },
  finops: {
    aws: 'ce:GetCostAndUsage, budgets:ViewBudget',
    azure: 'Microsoft.Consumption/usageDetails/read, Microsoft.CostManagement/query/read',
    gcp: 'billing.accounts.getSpendingInformation, billing.budgets.list',
  },
  k8s: {
    aws: 'eks:DescribeCluster, eks:ListNodegroups',
    azure: 'Microsoft.ContainerService/managedClusters/read',
    gcp: 'container.clusters.get, container.Operations.list',
  },
  observability: {
    aws: 'cloudwatch:DescribeAlarms, logs:DescribeLogGroups',
    azure: 'Microsoft.Insights/metricAlerts/read, components/read',
    gcp: 'monitoring.alertPolicies.list, logging.sinks.list',
  },
  data: {
    aws: 'rds:DescribeDBInstances, sqs:GetQueueAttributes',
    azure: 'Microsoft.DBforPostgreSQL/flexibleServers/read, Microsoft.ServiceBus/namespaces/read',
    gcp: 'cloudsql.instances.list, pubsub.subscriptions.get',
  },
};

function buildMeta(
  moduleId: string,
  estimatedMinutes: number,
  prerequisites: string[],
  linkedSimulator: SimulatorRouteId,
  permGroup: keyof typeof BASE_PERMS,
  billableResources: Record<Provider, string>,
  postCleanupChecks: Record<Provider, string>,
): LabVerifiableMetadata {
  return {
    moduleId,
    estimatedMinutes,
    prerequisites,
    linkedSimulator,
    minimumPermissions: BASE_PERMS[permGroup],
    billableResources,
    postCleanupChecks,
    reviewedAt: '2026-11-17',
  };
}

export const LAB_METADATA_BY_MODULE: Record<string, LabVerifiableMetadata> = {
  'cloud-fundamentals': buildMeta(
    'cloud-fundamentals',
    35,
    ['Conceptos básicos de HTTP e IP'],
    'architecture',
    'compute',
    {
      aws: 'Consultas IAM/Regiones gratis; instancias EC2 fuera de Free Tier generan cobro horario.',
      azure: 'Resource Groups sin costo; VMs y IPs públicas estáticas generan cargo por hora.',
      gcp: 'Proyectos y consultas gcloud sin cargo; instancias Compute Engine facturan por segundo.',
    },
    {
      aws: 'Verificar 0 instancias running con aws ec2 describe-instances.',
      azure: 'Confirmar eliminación del grupo con az group exists -n rg-cea-lab.',
      gcp: 'Comprobar gcloud compute instances list vacío en el proyecto.',
    },
  ),
  networks: buildMeta(
    'networks',
    45,
    ['Fundamentos Cloud', 'Notación CIDR'],
    'cidr',
    'network',
    {
      aws: 'VPC/Subnets gratis; NAT Gateway e IPv4 públicas ociosas sí generan cargo por hora.',
      azure: 'VNet/NSG gratis; Azure NAT Gateway y Public IP Standard facturan por hora.',
      gcp: 'VPC/Firewall gratis; Cloud NAT e IPs externas reservadas sin uso generan cargos.',
    },
    {
      aws: 'aws ec2 describe-nat-gateways y describe-addresses deben devolver 0 activos.',
      azure: 'az network public-ip list -g rg-cea-lab debe quedar vacío.',
      gcp: 'gcloud compute addresses list sin reservas estáticas huérfanas.',
    },
  ),
  compute: buildMeta(
    'compute',
    50,
    ['Redes y conectividad', 'Terminal Linux'],
    'scale',
    'compute',
    {
      aws: 'Instancias EC2 y volúmenes EBS GP3 persistentes tras detener la VM.',
      azure:
        'Virtual Machines y Managed Disks cobran aunque la VM no esté desasignada (deallocated).',
      gcp: 'Compute Engine VMs y Persistent Disks asociados.',
    },
    {
      aws: 'Verificar estado terminated y 0 volúmenes available en aws ec2 describe-volumes.',
      azure: 'Eliminar Resource Group completo para no dejar discos ni NICs huérfanas.',
      gcp: 'Comprobar gcloud compute disks list vacío tras borrar la instancia.',
    },
  ),
  storage: buildMeta(
    'storage',
    40,
    ['Fundamentos Cloud'],
    'finops',
    'storage',
    {
      aws: 'S3 cobra por GB-mes almacenado, solicitudes PUT/GET y transferencia saliente.',
      azure: 'Blob Storage factura capacidad, operaciones y recuperación en tiers Cool/Archive.',
      gcp: 'Cloud Storage cobra almacenamiento, operaciones Clase A/B y rescate temprano Coldline/Archive.',
    },
    {
      aws: 'Vaciar versiones multiparte abortadas y eliminar el bucket de laboratorio.',
      azure: 'Eliminar el Storage Account de prueba tras validar soft-delete.',
      gcp: 'Ejecutar gcloud storage rm -r sobre el bucket efímero.',
    },
  ),
  identity: buildMeta(
    'identity',
    45,
    ['Fundamentos Cloud'],
    'iam',
    'security',
    {
      aws: 'IAM Roles/Policies son gratuitos; llaves KMS CMK y Secrets Manager tienen tarifa mensual.',
      azure: 'RBAC es gratuito; operaciones en Key Vault y licencias Entra P2 tienen costo.',
      gcp: 'Cloud IAM es gratuito; versiones activas de llaves KMS/Secret Manager tienen cargo.',
    },
    {
      aws: 'Revocar sesiones y eliminar roles temporales de prueba sin claves AKIA activas.',
      azure: 'Borrar asignaciones RBAC y identidades administradas creadas para el taller.',
      gcp: 'Eliminar Service Accounts de laboratorio sin llaves JSON descargadas.',
    },
  ),
  costs: buildMeta(
    'costs',
    35,
    ['Cómputo, Almacenamiento y Redes'],
    'finops',
    'finops',
    {
      aws: 'Primeros presupuestos básicos gratis; consultas API de Cost Explorer tienen microcargo.',
      azure: 'Cost Management + Budgets gratuitos sobre suscripciones Azure.',
      gcp: 'Cloud Billing Budgets y exportación estándar a BigQuery (costo mínimo de storage BQ).',
    },
    {
      aws: 'Confirmar umbral de alerta en AWS Budgets y ausencia de recursos de cómputo activos.',
      azure: 'Revisar Cost Analysis del grupo de recursos en $0 proyectado.',
      gcp: 'Verificar filtros del presupuesto en Cloud Billing.',
    },
  ),
  'cloud-cli': buildMeta(
    'cloud-cli',
    45,
    ['Linux básico y variables de entorno'],
    'iam',
    'security',
    {
      aws: 'AWS CLI/CloudShell sin costo directo salvo recursos creados por scripts.',
      azure: 'Azure CLI local gratis; Azure Cloud Shell requiere cuenta Files pequeña.',
      gcp: 'gcloud CLI y Cloud Shell gratuitos dentro de cuota semanal.',
    },
    {
      aws: 'Limpiar perfiles temporales y verificar sts get-caller-identity desconectado.',
      azure: 'Ejecutar az logout si trabajaste en equipo compartido.',
      gcp: 'Revocar credenciales temporales con gcloud auth revoke si aplica.',
    },
  ),
  'advanced-network': buildMeta(
    'advanced-network',
    60,
    ['Redes y conectividad', 'IAM'],
    'routing',
    'network',
    {
      aws: 'Interface VPC Endpoints (PrivateLink), Transit Gateway y ALB cobran por hora + datos.',
      azure:
        'Azure Private Endpoints, VNet Peering egress y Application Gateway facturan por hora/GB.',
      gcp: 'Private Service Connect endpoints con reglas de reenvío y Cloud Load Balancing.',
    },
    {
      aws: 'Eliminar VPC Endpoints de interfaz inmediatamente tras validar DNS privado.',
      azure: 'Borrar Private Endpoints y zonas Private DNS vinculadas.',
      gcp: 'Eliminar forwarding rules globales/regionales tras la prueba.',
    },
  ),
  serverless: buildMeta(
    'serverless',
    50,
    ['IAM', 'Automatización CLI'],
    'messaging',
    'data',
    {
      aws: 'Lambda y SQS tienen amplia capa gratuita; loops infinitos sin DLQ disparan costos.',
      azure:
        'Azure Functions Consumption y Service Bus Basic tienen bajo costo; Premium factura fijo.',
      gcp: 'Cloud Run y Pub/Sub facturan por uso real; configurar max-instances evita picos.',
    },
    {
      aws: 'Eliminar funciones, EventSourceMappings y colas SQS/DLQ de laboratorio.',
      azure: 'Purgar Function App y namespace de Service Bus de prueba.',
      gcp: 'Borrar servicio Cloud Run y suscripciones Pub/Sub activas.',
    },
  ),
  containers: buildMeta(
    'containers',
    65,
    ['Cómputo Linux', 'Redes'],
    'k8s',
    'k8s',
    {
      aws: 'IMPORTANTE: Control plane de EKS cuesta ~$0.10/h más nodos EC2; prefiere Modalidad B (Kind).',
      azure: 'AKS Free tier no cobra control plane, pero los nodos VM y discos sí facturan.',
      gcp: 'GKE cobra tarifa de gestión tras el primer clúster zonal gratuito + recursos de nodos/pods.',
    },
    {
      aws: 'En local: kind delete cluster. En nube: eksctl/terraform destroy + revisar ELBs/EBS.',
      azure: 'Confirmar eliminación completa del grupo MC_* generado por AKS.',
      gcp: 'Verificar 0 clústeres en gcloud container clusters list y 0 discos huérfanos.',
    },
  ),
  iac: buildMeta(
    'iac',
    60,
    ['CLI', 'IAM OIDC'],
    'terraform-plan',
    'network',
    {
      aws: 'Bucket S3 de estado cuesta centavos; el costo depende de los recursos declarados en HCL.',
      azure: 'Storage Account para tfstate tiene costo mínimo; validar plan antes de apply.',
      gcp: 'Bucket GCS para tfstate de bajo costo; revisar siempre recursos antes de aplicar.',
    },
    {
      aws: 'terraform destroy && terraform state list debe devolver 0 recursos gestionados.',
      azure: 'terraform destroy y verificar grupo de recursos vacío.',
      gcp: 'terraform destroy comprobando que no queden direcciones ni redes activas.',
    },
  ),
  observability: buildMeta(
    'observability',
    50,
    ['Cómputo o Serverless'],
    'observability',
    'observability',
    {
      aws: 'Ingesta de logs CloudWatch ($/GB), métricas custom de alta cardinalidad y trazas X-Ray.',
      azure: 'Ingesta en Log Analytics Workspace ($/GB) tras cuota gratuita mensual.',
      gcp: 'Cloud Logging/Monitoring sobre la cuota mensual de ingesta por proyecto.',
    },
    {
      aws: 'Fijar retention_in_days corto (7 días) o borrar grupos de logs de laboratorio.',
      azure: 'Eliminar Workspace de prueba o reducir retención diaria.',
      gcp: 'Desactivar sinks adicionales y políticas de alerta de prueba.',
    },
  ),
  'software-architecture': buildMeta(
    'software-architecture',
    55,
    ['Serverless', 'Contenedores', 'Redes'],
    'architecture',
    'compute',
    {
      aws: 'Taller de diseño y ADR sin costo cloud obligatorio (Modalidad A recomendada).',
      azure: 'Modelado arquitectónico C4/ADR sin gasto de infraestructura.',
      gcp: 'Evaluación de límites modulares y contratos sin crear recursos facturables.',
    },
    {
      aws: 'Sin recursos cloud si se resolvió en simulador y plantilla ADR.',
      azure: 'Sin recursos remanentes en suscripción.',
      gcp: 'Sin servicios desplegados en el proyecto.',
    },
  ),
  governance: buildMeta(
    'governance',
    55,
    ['IAM', 'Terraform IaC'],
    'iam',
    'security',
    {
      aws: 'Organizations/SCPs son gratis; AWS Config Rules y KMS CMKs generan cargos por evaluación/mes.',
      azure: 'Management Groups y Azure Policy gratis; Key Vault HSM tiene costo.',
      gcp: 'Organization Policies gratis; llaves Cloud KMS facturan por versión activa.',
    },
    {
      aws: 'Desactivar grabadores AWS Config temporales si se encendieron en cuenta de prueba.',
      azure: 'Retirar asignaciones de política de laboratorio.',
      gcp: 'Programar destrucción de llaves KMS de prueba no productivas.',
    },
  ),
  resilience: buildMeta(
    'resilience',
    65,
    ['Almacenamiento', 'Redes avanzadas'],
    'dr',
    'data',
    {
      aws: 'Réplicas Multi-AZ/Cross-Region en RDS y snapshots almacenados generan cargos continuos.',
      azure: 'Zone-redundant HA y geo-réplicas duplican cómputo/almacenamiento de base de datos.',
      gcp: 'Instancias Regional HA en Cloud SQL y réplicas cross-region facturan 2x instancia.',
    },
    {
      aws: 'Eliminar réplicas, instancias RDS y snapshots manuales finales del ejercicio.',
      azure: 'Borrar servidores primarios, réplicas y backups retenidos manualmente.',
      gcp: 'Eliminar réplicas de lectura antes de destruir la instancia primaria Cloud SQL.',
    },
  ),
  'data-architecture': buildMeta(
    'data-architecture',
    60,
    ['Almacenamiento', 'Serverless / Eventos'],
    'messaging',
    'data',
    {
      aws: 'RDS/Aurora, DynamoDB on-demand y consultas Athena por TB escaneado.',
      azure: 'Azure SQL / PostgreSQL Flexible Server y RU/s en Cosmos DB.',
      gcp: 'Cloud SQL, Spanner Processing Units y consultas BigQuery por TB procesado.',
    },
    {
      aws: 'Verificar 0 clústeres RDS/Aurora activos tras finalizar la práctica.',
      azure: 'Confirmar eliminación de servidores de datos y namespaces de eventos.',
      gcp: 'Comprobar ausencia de instancias Spanner/Cloud SQL encendidas.',
    },
  ),
  'sre-finops': buildMeta(
    'sre-finops',
    55,
    ['Observabilidad', 'Costos'],
    'slo',
    'observability',
    {
      aws: 'Práctica centrada en SLIs/SLOs, burn-rate y modelo económico en simulador local.',
      azure: 'Análisis de presupuestos de error y costo unitario sin gasto extra.',
      gcp: 'Definición de SLOs y FinOps sobre métricas sintéticas.',
    },
    {
      aws: 'Eliminar alarmas compuestas de prueba si se crearon en CloudWatch.',
      azure: 'Retirar reglas de alerta de laboratorio en Azure Monitor.',
      gcp: 'Limpiar SLOs sintéticos de prueba en Cloud Monitoring.',
    },
  ),
  capstone: buildMeta(
    'capstone',
    90,
    ['Niveles 1, 2 y 3 completados'],
    'architecture',
    'network',
    {
      aws: 'Diseño integral defendible (ADR, C4, Threat Model, RTO/RPO, TCO) realizable 100% sin cargos.',
      azure: 'Si despliegas prototipo real, usa RG único con etiqueta ExpiresAt y presupuesto.',
      gcp: 'Si despliegas prototipo real, aisla todo en un proyecto dedicado efímero.',
    },
    {
      aws: 'Ejecutar auditoría completa de recursos etiquetados con CostCenter=CC-ACADEMY-001.',
      azure: 'Eliminar el Resource Group del prototipo y exportar tu ADR final.',
      gcp: 'Apagar/eliminar el proyecto efímero del prototipo tras exportar evidencias.',
    },
  ),
};

export function getLabMetadata(moduleId: string): LabVerifiableMetadata {
  return LAB_METADATA_BY_MODULE[moduleId] || LAB_METADATA_BY_MODULE['cloud-fundamentals'];
}
