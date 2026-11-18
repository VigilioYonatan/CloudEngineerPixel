export type GlossaryCategory =
  | 'Redes'
  | 'Identidad y Seguridad'
  | 'Resiliencia y SRE'
  | 'Datos y Mensajería'
  | 'IaC y Supply Chain'
  | 'Cómputo y FinOps';

export type GlossaryEntry = {
  id: string;
  term: string;
  acronymExpansion: string;
  category: GlossaryCategory;
  beginnerSummary: string;
  architectNote: string;
  providerNuance: {
    aws: string;
    azure: string;
    gcp: string;
  };
};

export const GLOSSARY_CATEGORIES: readonly ('Todas' | GlossaryCategory)[] = [
  'Todas',
  'Redes',
  'Identidad y Seguridad',
  'Resiliencia y SRE',
  'Datos y Mensajería',
  'IaC y Supply Chain',
  'Cómputo y FinOps',
];

export const CLOUD_GLOSSARY: readonly GlossaryEntry[] = [
  {
    id: 'cidr',
    term: 'CIDR',
    acronymExpansion: 'Classless Inter-Domain Routing',
    category: 'Redes',
    beginnerSummary:
      'Notación como 10.0.0.0/24 que indica cuántas direcciones IP caben en una red. Cuanto mayor es el número tras la barra (/28 vs /16), menos IPs tiene la subred.',
    architectNote:
      'Planifica bloques no solapados entre entornos y regiones para permitir peering o tránsito privado futuro.',
    providerNuance: {
      aws: 'Amazon VPC reserva 5 IPs por subred (red, router, DNS, futuro y broadcast).',
      azure: 'Azure VNet también reserva 5 direcciones IP en cada subred.',
      gcp: 'Google Cloud VPC es global y reserva 4 direcciones IP por rango de subred.',
    },
  },
  {
    id: 'vpc',
    term: 'VPC / VNet',
    acronymExpansion: 'Virtual Private Cloud / Virtual Network',
    category: 'Redes',
    beginnerSummary:
      'Tu red privada aislada dentro de la nube donde despliegas servidores, contenedores y bases de datos sin exponerlos directamente a Internet.',
    architectNote:
      'Separa siempre subredes públicas (balanceadores), privadas (cómputo) y aisladas (datos sin salida a Internet).',
    providerNuance: {
      aws: 'Amazon VPC tiene alcance regional; las subredes pertenecen a una sola AZ.',
      azure: 'Azure Virtual Network es regional y sus subredes abarcan las AZs de la región.',
      gcp: 'Google Cloud VPC es global y sus subredes son regionales.',
    },
  },
  {
    id: 'nat',
    term: 'NAT',
    acronymExpansion: 'Network Address Translation',
    category: 'Redes',
    beginnerSummary:
      'Puerta que permite a servidores privados salir a Internet (ej. descargar parches) impidiendo que Internet inicie conexiones entrantes hacia ellos.',
    architectNote:
      'Evita cruzar tráfico masivo hacia S3/Blob/GCS por NAT Gateway; usa Private Endpoints para ahorrar cargos por GB.',
    providerNuance: {
      aws: 'NAT Gateway cobra por hora + GB procesado; despliega uno por AZ en producción.',
      azure: 'Azure NAT Gateway es zonal/regional con tarifa horaria + datos procesados.',
      gcp: 'Cloud NAT opera a nivel de software en Andromeda sin instancia cuello de botella.',
    },
  },
  {
    id: 'sg-nsg',
    term: 'SG / NSG',
    acronymExpansion: 'Security Group / Network Security Group',
    category: 'Redes',
    beginnerSummary:
      'Cortafuegos virtual con estado (stateful): si permites que entre una petición legítima, la respuesta sale automáticamente sin abrir reglas extra.',
    architectNote:
      'Referencia identificadores de grupo (App-SG -> DB-SG en puerto 5432) en lugar de abrir bloques 0.0.0.0/0.',
    providerNuance: {
      aws: 'Security Groups solo tienen reglas Allow; las NACL de subred son stateless.',
      azure: 'NSG evalúa reglas Allow y Deny ordenadas por número de prioridad.',
      gcp: 'VPC Firewall Rules y Hierarchical Policies soportan Allow/Deny con prioridades.',
    },
  },
  {
    id: 'iam',
    term: 'IAM',
    acronymExpansion: 'Identity and Access Management',
    category: 'Identidad y Seguridad',
    beginnerSummary:
      'Sistema que decide quién (usuario, servicio o pipeline) puede ejecutar qué acción sobre qué recurso exacto.',
    architectNote:
      'Aplica privilegio mínimo estricto, credenciales efímeras (STS/Managed Identity) y cero claves de largo plazo.',
    providerNuance: {
      aws: 'Evalúa Identity Policies + Resource Policies + SCPs; un Explicit Deny gana siempre.',
      azure:
        'Separa identidad en Microsoft Entra ID y autorización en Azure RBAC + Deny Assignments.',
      gcp: 'Hereda bindings IAM jerárquicamente desde Organización -> Folder -> Project -> Recurso.',
    },
  },
  {
    id: 'rbac',
    term: 'RBAC',
    acronymExpansion: 'Role-Based Access Control',
    category: 'Identidad y Seguridad',
    beginnerSummary:
      'Asignar permisos a roles de trabajo (ej. Lector de Facturación, Operador K8s) en lugar de dar permisos sueltos persona por persona.',
    architectNote:
      'Combina RBAC con ABAC (etiquetas de entorno/equipo) y revisiones periódicas de accesos privilegiados.',
    providerNuance: {
      aws: 'Se implementa mediante IAM Roles asumibles vía sts:AssumeRole e IAM Identity Center.',
      azure:
        'Nativo en Azure RBAC sobre Management Groups, Suscripciones, Resource Groups o recursos.',
      gcp: 'Predefined y Custom IAM Roles vinculados a principales (grupos o Service Accounts).',
    },
  },
  {
    id: 'oidc',
    term: 'OIDC',
    acronymExpansion: 'OpenID Connect (Workload Federation)',
    category: 'Identidad y Seguridad',
    beginnerSummary:
      'Permite que GitHub Actions o Kubernetes obtenga un pase temporal de 15–60 min en la nube sin guardar contraseñas ni claves permanentes en el repositorio.',
    architectNote:
      'Restringe siempre la condición sub/subject al repositorio, rama o entorno exacto para impedir suplantación.',
    providerNuance: {
      aws: 'IAM OIDC Identity Provider validando token.actions.githubusercontent.com y condición sub.',
      azure:
        'Federated Identity Credentials sobre App Registration o User-Assigned Managed Identity.',
      gcp: 'Workload Identity Federation con attribute-condition restringiendo repository_owner y ref.',
    },
  },
  {
    id: 'kms',
    term: 'KMS',
    acronymExpansion: 'Key Management Service',
    category: 'Identidad y Seguridad',
    beginnerSummary:
      'Bóveda criptográfica administrada que genera, rota y protege las llaves maestras con las que se cifran discos, backups y bases de datos.',
    architectNote:
      'Usa Envelope Encryption (DEK cifrada por KEK en KMS) y separa quién administra la llave de quién lee los datos.',
    providerNuance: {
      aws: 'AWS KMS distingue AWS Managed Keys y Customer Managed Keys (CMK) con Key Policies.',
      azure: 'Azure Key Vault / Managed HSM gestiona llaves, secretos y certificados.',
      gcp: 'Cloud KMS soporta CMEK, rotación automática e integración EKM externa.',
    },
  },
  {
    id: 'zero-trust',
    term: 'Zero Trust',
    acronymExpansion: 'Arquitectura de Confianza Cero',
    category: 'Identidad y Seguridad',
    beginnerSummary:
      'Principio de "nunca confiar por estar en la misma red interna; verificar siempre identidad, contexto y cifrado en cada llamada".',
    architectNote:
      'Exige mTLS o identidad de carga de trabajo, microsegmentación y autorización por petición.',
    providerNuance: {
      aws: 'Verified Access, VPC Lattice e IAM Roles Anywhere / Pod Identity.',
      azure: 'Conditional Access en Entra ID, Private Link y políticas Zero Trust nativas.',
      gcp: 'BeyondCorp Enterprise (Identity-Aware Proxy) nacido del modelo Zero Trust de Google.',
    },
  },
  {
    id: 'sli',
    term: 'SLI',
    acronymExpansion: 'Service Level Indicator',
    category: 'Resiliencia y SRE',
    beginnerSummary:
      'La métrica exacta que mide la experiencia real del usuario: por ejemplo, porcentaje de peticiones HTTP exitosas o latencia p95 menor a 300 ms.',
    architectNote:
      'Mide síntomas percibidos por el cliente en el borde/balanceador, no el uso promedio de CPU de un servidor.',
    providerNuance: {
      aws: 'Métricas de ALB/CloudWatch Application Signals o consultas EMF.',
      azure: 'Application Insights request success rate y duración percentil.',
      gcp: 'Cloud Monitoring Service Monitoring con SLIs nativos basados en Istio/GKE/Cloud Run.',
    },
  },
  {
    id: 'slo',
    term: 'SLO',
    acronymExpansion: 'Service Level Objective',
    category: 'Resiliencia y SRE',
    beginnerSummary:
      'La meta numérica interna de fiabilidad para un SLI (ej. 99.9% de éxito en una ventana móvil de 30 días, equivalente a ~43.2 min de margen).',
    architectNote:
      'Define un SLO ligeramente más estricto que el SLA contractual para reaccionar antes de penalizaciones.',
    providerNuance: {
      aws: 'CloudWatch Application Signals SLOs con alertas de burn-rate.',
      azure: 'Workbooks de SLO sobre Azure Monitor / Prometheus gestionado.',
      gcp: 'SLOs nativos en Cloud Monitoring con presupuestos de error multi-ventana.',
    },
  },
  {
    id: 'error-budget',
    term: 'Error Budget',
    acronymExpansion: 'Presupuesto de Error Operativo',
    category: 'Resiliencia y SRE',
    beginnerSummary:
      'El margen permitido de fallos (100% menos el SLO). Si el SLO es 99.9%, tu presupuesto de error es 0.1% para desplegar cambios e innovar.',
    architectNote:
      'Si el burn-rate agota el presupuesto, prioriza estabilidad, postmortems y tests antes de nuevas features.',
    providerNuance: {
      aws: 'Monitoreado vía alarmas compuestas de ventana corta (1h) y larga (6h).',
      azure: 'Alertas PromQL multi-burn-rate en Azure Monitor Managed Prometheus.',
      gcp: 'Burn-rate alerts integradas directamente en el panel de Cloud Monitoring SLOs.',
    },
  },
  {
    id: 'rto',
    term: 'RTO',
    acronymExpansion: 'Recovery Time Objective',
    category: 'Resiliencia y SRE',
    beginnerSummary:
      'Tiempo máximo aceptable que el sistema puede tardar en volver a operar tras un desastre (ej. recuperar el servicio en menos de 30 minutos).',
    architectNote:
      'Un RTO real incluye detección, decisión, promoción de réplica, propagación DNS y calentamiento de cachés.',
    providerNuance: {
      aws: 'Route 53 Application Recovery Controller + Aurora Global Database acortan el RTO.',
      azure: 'Azure Site Recovery y Front Door health-based failover.',
      gcp: 'Cloud Load Balancing global anycast + Cloud SQL cross-region replica promotion.',
    },
  },
  {
    id: 'rpo',
    term: 'RPO',
    acronymExpansion: 'Recovery Point Objective',
    category: 'Resiliencia y SRE',
    beginnerSummary:
      'Cantidad máxima de datos medida en tiempo que el negocio tolera perder (ej. RPO de 5 minutos significa perder como máximo los últimos 5 min de escrituras).',
    architectNote:
      'Backups diarios dan RPO de 24h; para RPO cercano a minutos/segundos necesitas PITR continuo o replicación.',
    providerNuance: {
      aws: 'RDS Point-In-Time Recovery (logs cada 5 min) o Aurora Global (< 1s típico).',
      azure: 'Geo-restore vs Zone-redundant HA y Active Geo-Replication en Azure SQL.',
      gcp: 'Cloud SQL PITR con binary logs/WAL archivados continuamente en Cloud Storage.',
    },
  },
  {
    id: 'dlq',
    term: 'DLQ',
    acronymExpansion: 'Dead-Letter Queue (Cola de Mensajes Fallidos)',
    category: 'Datos y Mensajería',
    beginnerSummary:
      'Cola lateral donde se apartan los mensajes "venenosos" que fallan tras varios reintentos, evitando que bloqueen el resto de pedidos sanos.',
    architectNote:
      'Alerta siempre si DLQ > 0 y construye herramienta controlada de redrive tras corregir el bug.',
    providerNuance: {
      aws: 'Amazon SQS Redrive Policy con maxReceiveCount y StartMessageMoveTask.',
      azure: 'Subcola automática /$DeadLetterQueue integrada en cada cola de Azure Service Bus.',
      gcp: 'Cloud Pub/Sub Dead-Letter Topic con maxDeliveryAttempts (5 a 100).',
    },
  },
  {
    id: 'idempotency',
    term: 'Idempotencia',
    acronymExpansion: 'Ejecución Repetible sin Efectos Duplicados',
    category: 'Datos y Mensajería',
    beginnerSummary:
      'Garantía de que procesar el mismo mensaje o pago dos veces produce exactamente el mismo resultado que procesarlo una sola vez (sin cobrar doble).',
    architectNote:
      'Persiste idempotency_key con restricción UNIQUE en la misma transacción ACID junto al patrón Outbox.',
    providerNuance: {
      aws: 'DynamoDB Conditional Writes o PostgreSQL UNIQUE constraint en RDS.',
      azure: 'Duplicate Detection en Azure Service Bus + claves únicas en base de datos.',
      gcp: 'Transacciones en Cloud Spanner / Cloud SQL verificando clave de operación.',
    },
  },
  {
    id: 'outbox',
    term: 'Outbox',
    acronymExpansion: 'Transactional Outbox Pattern',
    category: 'Datos y Mensajería',
    beginnerSummary:
      'Guardar el cambio de negocio y el evento pendiente en la misma base de datos a la vez, para luego publicarlo a la cola sin perder mensajes a mitad de camino.',
    architectNote:
      'Elimina el antipatrón dual-write (escribir en DB y publicar en broker sin atomicidad).',
    providerNuance: {
      aws: 'Tabla outbox en RDS/DynamoDB Streams -> EventBridge Pipes / SQS.',
      azure: 'Cosmos DB Change Feed o tabla outbox SQL -> Azure Service Bus.',
      gcp: 'Tabla outbox en Cloud SQL / Spanner Change Streams -> Pub/Sub.',
    },
  },
  {
    id: 'state-locking',
    term: 'State Locking',
    acronymExpansion: 'Bloqueo Concurrente del Estado de IaC',
    category: 'IaC y Supply Chain',
    beginnerSummary:
      'Candado automático que impide que dos ingenieros o dos pipelines ejecuten terraform apply al mismo tiempo y corrompan el mapa de infraestructura.',
    architectNote:
      'Nunca guardes terraform.tfstate en laptops ni desactives -lock=false en pipelines compartidos.',
    providerNuance: {
      aws: 'Backend S3 cifrado con versionado y use_lockfile nativo (Terraform >= 1.10+).',
      azure: 'Azure Blob Storage aprovecha Blob Leases nativos para bloquear el estado.',
      gcp: 'Google Cloud Storage soporta bloqueo de objetos y versionado nativo para tfstate.',
    },
  },
  {
    id: 'drift',
    term: 'Drift',
    acronymExpansion: 'Configuration Drift (Deriva de Infraestructura)',
    category: 'IaC y Supply Chain',
    beginnerSummary:
      'Diferencia peligrosa entre lo que dice tu código Terraform en Git y lo que alguien modificó manualmente haciendo clic en la consola web.',
    architectNote:
      'Programa terraform plan -detailed-exitcode periódico de solo lectura para detectar cambios manuales.',
    providerNuance: {
      aws: 'Cambios ClickOps en Security Groups o IAM detectables vía CloudTrail + plan.',
      azure: 'Modificaciones manuales en Portal detectables con Activity Log + What-If / plan.',
      gcp: 'Cambios en consola auditados en Cloud Audit Logs y detectados en plan programado.',
    },
  },
  {
    id: 'forcenew',
    term: 'ForceNew',
    acronymExpansion: 'Destroy and Recreate Replacement en IaC',
    category: 'IaC y Supply Chain',
    beginnerSummary:
      'Cambio en un atributo inmutable (como el nombre o VPC de una base de datos) que obliga a Terraform a destruir el recurso actual y crear uno vacío.',
    architectNote:
      'Protege recursos con datos mediante lifecycle { prevent_destroy = true } y migraciones blue/green.',
    providerNuance: {
      aws: 'Aparece como "-/+ must be replaced" en aws_db_instance o aws_eks_cluster.',
      azure: 'Frecuente al cambiar location, SKU base o red en recursos stateful de AzureRM.',
      gcp: 'Común al alterar name o network en google_sql_database_instance.',
    },
  },
  {
    id: 'sbom',
    term: 'SBOM',
    acronymExpansion: 'Software Bill of Materials',
    category: 'IaC y Supply Chain',
    beginnerSummary:
      'Lista oficial de ingredientes (todas las librerías directas y transitivas con sus versiones exactas) que componen tu aplicación o contenedor.',
    architectNote:
      'Genera SBOM en formato CycloneDX o SPDX en cada build para responder en minutos ante nuevos CVEs.',
    providerNuance: {
      aws: 'Amazon Inspector escanea imágenes en ECR y exporta inventarios SBOM.',
      azure: 'Microsoft Defender for Containers + artefactos OCI firmados en ACR.',
      gcp: 'Artifact Analysis genera y evalúa vulnerabilidades sobre imágenes en Artifact Registry.',
    },
  },
  {
    id: 'pdb',
    term: 'PDB',
    acronymExpansion: 'PodDisruptionBudget (Kubernetes)',
    category: 'Cómputo y FinOps',
    beginnerSummary:
      'Regla de seguridad en Kubernetes que prohíbe vaciar todos tus contenedores a la vez durante un mantenimiento de nodos (ej. mantener siempre 2 activos).',
    architectNote:
      'Sin PDB y al menos 2 réplicas en distintos nodos, un simple kubectl drain provoca caída del servicio.',
    providerNuance: {
      aws: 'Esencial en EKS al actualizar Managed Node Groups o usar Karpenter consolidation.',
      azure: 'Protege cargas durante node image upgrades automáticos en AKS.',
      gcp: 'Respetado por GKE Autopilot y Standard durante surge upgrades de node pools.',
    },
  },
  {
    id: 'finops',
    term: 'FinOps',
    acronymExpansion: 'Cloud Financial Operations',
    category: 'Cómputo y FinOps',
    beginnerSummary:
      'Disciplina de ingeniería y negocio para entender, atribuir y optimizar cada dólar gastado en la nube midiendo el costo por cliente o transacción.',
    architectNote:
      'Exige etiquetado obligatorio (Owner, CostCenter, Environment), alertas de anomalías y métricas de costo unitario.',
    providerNuance: {
      aws: 'AWS Cost Explorer, Budgets, Cost Anomaly Detection y Compute Savings Plans.',
      azure: 'Microsoft Cost Management + Advisor y Azure Reservations / Savings Plans.',
      gcp: 'Cloud Billing Reports, Budgets y Committed Use Discounts (CUDs).',
    },
  },
];

function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

export function searchGlossary(
  query: string,
  category: 'Todas' | GlossaryCategory = 'Todas',
): GlossaryEntry[] {
  const needle = normalizeSearch(query);
  return CLOUD_GLOSSARY.filter((entry) => {
    if (category !== 'Todas' && entry.category !== category) return false;
    if (!needle) return true;
    const haystack = normalizeSearch(
      `${entry.term} ${entry.acronymExpansion} ${entry.category} ${entry.beginnerSummary} ${entry.architectNote}`,
    );
    return haystack.includes(needle);
  });
}
