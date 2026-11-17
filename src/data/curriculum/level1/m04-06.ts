import type { UnitContentSpec } from '../../../domain/curriculum';
import { buildUnitSpec } from '../unitBuilder';

export const m04To06Specs: Record<string, UnitContentSpec> = Object.fromEntries([
  buildUnitSpec({
    code: '04.01',
    moduleId: 'storage',
    idx: 0,
    title: 'Object Storage: buckets, versiones y ciclo de vida',
    objective:
      'Configurar cifrado, versionado, bloqueo público y reglas lifecycle sin exponer objetos.',
    mins: 30,
    prereqs: ['01.04'],
    mentalModel:
      'Object Storage no es POSIX: es almacenamiento plano por clave HTTP con durabilidad 11 nueves.',
    antipattern:
      'Desactivar Block Public Access para servir assets en lugar de usar CDN + Origin Access.',
    glossary: [
      ['Lifecycle rule', 'Transición automática a tiers fríos'],
      ['Versioning', 'Protección contra sobrescritura/borrado'],
    ],
    aws: [
      'Amazon S3',
      'aws s3api get-public-access-block --bucket my-bucket',
      'S3 Block Public Access a nivel de cuenta',
    ],
    azure: [
      'Azure Blob Storage',
      'az storage account show -n acct --query allowBlobPublicAccess',
      'Contenedores dentro de Storage Account',
    ],
    gcp: [
      'Cloud Storage',
      'gcloud storage buckets describe gs://my-bucket',
      'Uniform bucket-level access desactiva ACLs heredadas',
    ],
    activity: 'Define una regla lifecycle para mover logs >30 días a archivo frío.',
  }),
  buildUnitSpec({
    code: '04.02',
    moduleId: 'storage',
    idx: 1,
    title: 'Block Storage, snapshots e IOPS',
    objective:
      'Dimensionar volúmenes en bloque según throughput/IOPS y respaldar mediante snapshots.',
    mins: 25,
    prereqs: ['03.01'],
    mentalModel:
      'El disco en bloque pertenece a una sola AZ; un snapshot lo respalda de forma incremental en Object Storage.',
    antipattern:
      'Usar reclaimPolicy: Delete en producción arriesgando borrado permanente del volumen.',
    glossary: [
      ['IOPS', 'Operaciones de E/S por segundo'],
      ['Snapshot incremental', 'Solo guarda bloques modificados'],
    ],
    aws: [
      'Amazon EBS (gp3)',
      'aws ec2 describe-volumes --query "Volumes[].{Id:VolumeId,Type:VolumeType}"',
      'gp3 desacopla IOPS del tamaño en GB',
    ],
    azure: [
      'Azure Managed Disks',
      'az disk list -o table',
      'Premium SSD v2 permite ajustar IOPS/MBps',
    ],
    gcp: [
      'Persistent Disk (Hyperdisk)',
      'gcloud compute disks list',
      'Regional Persistent Disk replica síncrono entre 2 zonas',
    ],
    activity: 'Calcula por qué un volumen EBS gp3 supera a gp2 en costo/rendimiento.',
  }),
  buildUnitSpec({
    code: '04.03',
    moduleId: 'storage',
    idx: 2,
    title: 'Bases de datos relacionales administradas',
    objective: 'Delegar parches y HA Multi-AZ manteniendo control sobre índices, pools y backups.',
    mins: 35,
    prereqs: ['02.02', '04.02'],
    mentalModel:
      'Una BD administrada resuelve parches y failover, pero no optimiza consultas N+1 ni pools saturados.',
    antipattern:
      'Marcar publiclyAccessible=true en producción para conectarse desde laptops personales.',
    glossary: [
      ['Multi-AZ', 'Réplica síncrona en otra zona'],
      ['PITR', 'Recuperación a un segundo exacto (WAL)'],
    ],
    aws: [
      'Amazon RDS / Aurora',
      'aws rds describe-db-instances --query "DBInstances[].MultiAZ"',
      'RDS Proxy mitiga tormentas de conexiones',
    ],
    azure: [
      'Azure Database for PostgreSQL',
      'az postgres flexible-server list -o table',
      'Flexible Server soporta Zone-Redundant HA',
    ],
    gcp: [
      'Cloud SQL',
      'gcloud sql instances list',
      'Cloud SQL Auth Proxy cifra sin exponer IP pública',
    ],
    activity: 'Compara failover síncrono Multi-AZ vs Read Replica asíncrona.',
  }),
  buildUnitSpec({
    code: '04.04',
    moduleId: 'storage',
    idx: 3,
    title: 'NoSQL y cachés gestionadas',
    objective: 'Elegir almacenes clave-valor/documento y diseñar invalidación segura en caché.',
    mins: 30,
    prereqs: ['04.03'],
    mentalModel:
      'La caché acelera lecturas repetidas pero nunca es la fuente de verdad; debe degradar con elegancia.',
    antipattern: 'Usar Redis/Valkey sin TTL ni límites de memoria provocando evictions en cascada.',
    glossary: [
      ['Cache-aside', 'Leer caché -> miss -> BD -> poblar'],
      ['TTL', 'Expiración automática de clave'],
    ],
    aws: [
      'DynamoDB & ElastiCache',
      'aws dynamodb list-tables',
      'DynamoDB ofrece latencia de un dígito ms',
    ],
    azure: [
      'Cosmos DB & Azure Cache',
      'az cosmosdb list -o table',
      'Cosmos ofrece 5 niveles de consistencia',
    ],
    gcp: [
      'Firestore & Memorystore',
      'gcloud redis instances list --region=us-central1',
      'Memorystore reside en red privada VPC',
    ],
    activity: 'Explica qué ocurre si cae Valkey (cache stampede) y cómo mitigarlo.',
  }),
  buildUnitSpec({
    code: '04.05',
    moduleId: 'storage',
    idx: 4,
    title: 'Cifrado en tránsito, en reposo y backups',
    objective: 'Garantizar TLS 1.2+/1.3 en tránsito, KMS en reposo y ensayos de restauración.',
    mins: 30,
    prereqs: ['04.01', '04.03'],
    mentalModel:
      'Un backup "verde" que nunca se ha restaurado en entorno aislado es solo una suposición optimista.',
    antipattern:
      'Almacenar la llave de descifrado en el mismo host o cuenta que los datos productivos.',
    glossary: [
      ['CMK/KMS', 'Llave gestionada con auditoría y rotación'],
      ['Restore drill', 'Simulacro cronometrado de restauración'],
    ],
    aws: ['AWS KMS + AWS Backup', 'aws kms list-keys', 'KMS audita cada Decrypt en CloudTrail'],
    azure: [
      'Azure Key Vault',
      'az keyvault list -o table',
      'Soft-delete y purge protection obligatorios',
    ],
    gcp: [
      'Cloud KMS',
      'gcloud kms keyrings list --location=global',
      'CMEK permite rotación controlada por el cliente',
    ],
    activity: 'Redacta un checklist de 4 pasos para un restore drill en namespace aislado.',
  }),
  buildUnitSpec({
    code: '05.01',
    moduleId: 'identity',
    idx: 0,
    title: 'Identidades, roles y principio de mínimo privilegio',
    objective:
      'Construir políticas IAM acotadas a acciones y recursos específicos en lugar de comodines.',
    mins: 30,
    prereqs: ['01.04'],
    mentalModel:
      'Concede exactamente el permiso necesario, sobre el recurso exacto, durante el menor tiempo posible.',
    antipattern:
      'Asignar AdministratorAccess o Action:* Resource:* a un microservicio o runner CI.',
    glossary: [
      ['Least privilege', 'Mínimo permiso necesario'],
      ['Resource ARN/ID', 'Identificador único del recurso'],
    ],
    aws: [
      'AWS IAM Roles',
      'aws iam list-roles --max-items 5',
      'Preferir Roles STS sobre IAM Users',
    ],
    azure: [
      'Azure RBAC',
      'az role assignment list --assignee user@dom',
      'Roles integrados Reader/Contributor/Owner',
    ],
    gcp: [
      'Cloud IAM',
      'gcloud projects get-iam-policy proj-id',
      'Bindings por Principal + Role + Resource',
    ],
    activity: 'Prueba en el Simulador IAM cómo Explicit Deny bloquea incluso con Allow.',
  }),
  buildUnitSpec({
    code: '05.02',
    moduleId: 'identity',
    idx: 1,
    title: 'Autenticación humana vs identidad de máquina',
    objective:
      'Separar SSO/MFA humano de identidades federadas OIDC/Workload Identity para workloads.',
    mins: 30,
    prereqs: ['05.01'],
    mentalModel:
      'Los humanos usan SSO + MFA; las máquinas usan tokens efímeros OIDC, nunca contraseñas fijas.',
    antipattern: 'Generar Access Keys permanentes para GitHub Actions o pods Kubernetes.',
    glossary: [
      ['OIDC', 'Federación con tokens JWT efímeros'],
      ['Workload Identity', 'Identidad nativa de pod/servicio'],
    ],
    aws: [
      'IAM Identity Center & OIDC',
      'aws iam list-open-id-connect-providers',
      'GitHub OIDC intercambia JWT por STS temporal',
    ],
    azure: [
      'Entra ID & Managed Identity',
      'az identity list -o table',
      'System/User Managed Identity elimina secretos',
    ],
    gcp: [
      'Workload Identity Federation',
      'gcloud iam workload-identity-pools list --location=global',
      'Conecta pods/CI sin JSON service account keys',
    ],
    activity: 'Diagrama el flujo de intercambio de token OIDC entre CI y la nube.',
  }),
  buildUnitSpec({
    code: '05.03',
    moduleId: 'identity',
    idx: 2,
    title: 'Gestión segura de secretos',
    objective:
      'Rotar secretos automáticamente desde un gestor dedicado sin guardarlos en Git ni logs.',
    mins: 30,
    prereqs: ['05.02'],
    mentalModel:
      'Un secreto commiteado en Git público debe asumirse comprometido para siempre aunque borres el archivo.',
    antipattern: 'Pasar DB_PASSWORD en texto plano dentro de Dockerfiles o logs de arranque.',
    glossary: [
      ['Secret rotation', 'Cambio automático sin caída'],
      ['Git history leak', 'Exposición persistente en commits previos'],
    ],
    aws: [
      'AWS Secrets Manager',
      'aws secretsmanager list-secrets',
      'Rotación nativa integrada con RDS',
    ],
    azure: [
      'Azure Key Vault Secrets',
      'az keyvault secret list --vault-name kv',
      'Acceso mediante Managed Identity + RBAC',
    ],
    gcp: ['Secret Manager', 'gcloud secrets list', 'Versionado inmutable de secretos por revisión'],
    activity: 'Enumera los 3 pasos obligatorios tras detectar una clave filtrada en Git.',
  }),
  buildUnitSpec({
    code: '05.04',
    moduleId: 'identity',
    idx: 3,
    title: 'Políticas y límites de permiso',
    objective:
      'Aplicar guardrails preventivos (SCP, Azure Policy, Org Policy) a nivel organizacional.',
    mins: 25,
    prereqs: ['01.04', '05.01'],
    mentalModel:
      'Los guardrails organizacionales fijan el techo máximo: nadie abajo puede saltárselos.',
    antipattern:
      'Confiar solo en revisiones manuales para impedir buckets públicos o regiones prohibidas.',
    glossary: [
      ['SCP', 'Service Control Policy en AWS'],
      ['Deny Assignment', 'Bloqueo explícito heredado en Azure'],
    ],
    aws: [
      'AWS Organizations SCP',
      'aws organizations list-policies --filter SERVICE_CONTROL_POLICY',
      'SCP no otorga permisos, solo restringe',
    ],
    azure: [
      'Azure Policy',
      'az policy assignment list -o table',
      'Efectos Deny, Audit y DeployIfNotExists',
    ],
    gcp: [
      'Organization Policy',
      'gcloud org-policies list --organization=123',
      'Restringe IPs externas o service account keys',
    ],
    activity: 'Diseña una política que prohíba crear recursos fuera de tu región aprobada.',
  }),
  buildUnitSpec({
    code: '05.05',
    moduleId: 'identity',
    idx: 4,
    title: 'Auditoría y trazabilidad básica',
    objective:
      'Responder quién hizo qué, cuándo y desde dónde usando registros de auditoría inmutables.',
    mins: 25,
    prereqs: ['05.01'],
    mentalModel:
      'Sin logs de plano de control centralizados e inmutables, un incidente de seguridad es ciego.',
    antipattern:
      'Guardar logs de auditoría en la misma cuenta sin protección contra borrado por el atacante.',
    glossary: [
      ['Control plane log', 'Registro de llamadas API administrativas'],
      ['Immutability', 'WORM / Object Lock contra alteración'],
    ],
    aws: [
      'CloudTrail Lake / S3',
      'aws cloudtrail describe-trails',
      'Multi-region trail hacia cuenta Log Archive',
    ],
    azure: [
      'Activity Log + Log Analytics',
      'az monitor activity-log list --max-events 5',
      'Exportar hacia workspace centralizado',
    ],
    gcp: [
      'Cloud Audit Logs',
      'gcloud logging logs list',
      'Admin Activity logs siempre activos y gratuitos',
    ],
    activity: 'Identifica qué eventos buscarías primero tras una escalada de privilegios.',
  }),
  buildUnitSpec({
    code: '06.01',
    moduleId: 'costs',
    idx: 0,
    title: 'Facturación cloud y modelos de pago',
    objective:
      'Distinguir costos por cómputo, almacenamiento, transferencia de red y servicios gestionados.',
    mins: 25,
    prereqs: ['01.01'],
    mentalModel:
      'En la nube pagas por capacidad provisionada, almacenamiento retenido y tráfico de salida (egress).',
    antipattern:
      'Estimar solo el precio de la VM olvidando NAT Gateway, discos y egress inter-región.',
    glossary: [
      ['Egress', 'Tráfico saliente hacia Internet u otra región'],
      ['On-Demand', 'Pago por uso sin compromiso'],
    ],
    aws: [
      'AWS Cost Explorer',
      'aws ce get-cost-and-usage --help',
      'Data transfer out suele sorprender en facturas',
    ],
    azure: [
      'Microsoft Cost Management',
      'az consumption usage list --top 5',
      'Precios varían por región y moneda',
    ],
    gcp: [
      'Cloud Billing',
      'gcloud billing accounts list',
      'Descuentos por uso continuo (SUD) automáticos',
    ],
    activity: 'Desglosa 4 líneas de costo de una app web de 3 capas.',
  }),
  buildUnitSpec({
    code: '06.02',
    moduleId: 'costs',
    idx: 1,
    title: 'Presupuestos, alertas y etiquetas',
    objective:
      'Imponer etiquetas obligatorias (Owner, CostCenter, Env) y alertas tempranas de gasto.',
    mins: 25,
    prereqs: ['06.01'],
    mentalModel:
      'Lo que no tiene etiqueta de propietario/centro de costo no puede atribuirse ni optimizarse.',
    antipattern: 'Revisar la factura una sola vez al final del mes cuando el desvío ya ocurrió.',
    glossary: [
      ['Cost Allocation Tag', 'Metadato para desglose financiero'],
      ['Anomaly Detection', 'Alerta automática por pico inusual'],
    ],
    aws: [
      'AWS Budgets & Tags',
      'aws budgets describe-budgets --account-id 123456789012',
      'Usar default_tags en provider Terraform',
    ],
    azure: [
      'Azure Budgets & Tags',
      'az consumption budget list',
      'Alertas al 50%, 80% y 100% del presupuesto',
    ],
    gcp: [
      'Cloud Billing Budgets',
      'gcloud billing budgets list --billing-account=01',
      'Labels se heredan vía Terraform/Projects',
    ],
    activity: 'Define 4 tags obligatorios y umbrales de alerta progresiva.',
  }),
  buildUnitSpec({
    code: '06.03',
    moduleId: 'costs',
    idx: 2,
    title: 'Capa gratuita y límites seguros',
    objective:
      'Distinguir recursos Always Free de créditos temporales y evitar sorpresas en laboratorio.',
    mins: 20,
    prereqs: ['06.02'],
    mentalModel:
      'Always Free tiene límites estrictos de horas/GB; superar un umbral factura automáticamente.',
    antipattern:
      'Dejar NAT Gateways, Load Balancers o clústeres K8s encendidos tras terminar prácticas.',
    glossary: [
      ['Always Free', 'Cuota gratuita permanente acotada'],
      ['Teardown', 'Destrucción ordenada tras práctica'],
    ],
    aws: [
      'AWS Free Tier',
      'aws budgets describe-notifications-for-budget --help',
      'NAT Gateway NO entra en capa gratuita',
    ],
    azure: [
      'Azure Free Services',
      'az group list -o table',
      'Agrupar labs en un Resource Group para limpiar fácil',
    ],
    gcp: [
      'GCP Free Tier',
      'gcloud projects list',
      'e2-micro en regiones US seleccionadas entra Always Free',
    ],
    activity: 'Crea un checklist de limpieza post-laboratorio (teardown).',
  }),
  buildUnitSpec({
    code: '06.04',
    moduleId: 'costs',
    idx: 3,
    title: 'Primer despliegue limpio y reversible',
    objective: 'Publicar un servicio mínimo con rollback claro y verificación post-despliegue.',
    mins: 30,
    prereqs: ['01.05', '06.03'],
    mentalModel:
      'Todo despliegue profesional define de antemano cómo validar salud y cómo revertir en minutos.',
    antipattern: 'Desplegar directo a producción sin artifact versionado ni criterio de rollback.',
    glossary: [
      ['Rollback', 'Retorno controlado a versión estable previa'],
      ['Smoke test', 'Comprobación mínima tras deploy'],
    ],
    aws: [
      'ECS / App Runner',
      'aws apprunner list-services',
      'Revisiones inmutables permiten rollback rápido',
    ],
    azure: [
      'Azure Container Apps',
      'az containerapp revision list -n app -g rg',
      'Traffic splitting nativo entre revisiones',
    ],
    gcp: [
      'Cloud Run',
      'gcloud run revisions list --service=app',
      'Cada deploy crea revisión inmutable versionada',
    ],
    activity: 'Documenta plan de deploy + smoke check + rollback en 5 líneas.',
  }),
  buildUnitSpec({
    code: '06.05',
    moduleId: 'costs',
    idx: 4,
    title: 'Cleanup y disciplina de costos',
    objective:
      'Detectar recursos huérfanos (discos sin adjuntar, IPs elásticas ociosas, snapshots antiguos).',
    mins: 25,
    prereqs: ['06.04'],
    mentalModel:
      'Los recursos huérfanos tras pruebas o deletes parciales son la fuga FinOps más común.',
    antipattern:
      'Borrar una VM olvidando el disco, la IP pública reservada y el Load Balancer asociado.',
    glossary: [
      ['Orphaned resource', 'Recurso activo sin consumidor real'],
      ['Right-sizing', 'Ajustar tamaño a uso medido'],
    ],
    aws: [
      'EC2 Unattached Volumes',
      'aws ec2 describe-volumes --filters Name=status,Values=available',
      'IPs elásticas no asociadas generan costo por hora',
    ],
    azure: [
      'Unattached Managed Disks',
      'az disk list --query "[?managedBy==null]"',
      'Limpiar Resource Group completo al cerrar lab',
    ],
    gcp: [
      'Unused Disks & Static IPs',
      'gcloud compute addresses list --filter="status=RESERVED"',
      'Recommender identifica VMs ociosas',
    ],
    activity: 'Prueba en FinOps Lab cuánto ahorra VPC Endpoint vs NAT Gateway.',
  }),
]);
