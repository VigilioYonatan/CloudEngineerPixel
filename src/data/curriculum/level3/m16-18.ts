import type { UnitContentSpec } from '../../../domain/curriculum';
import { buildUnitSpec } from '../unitBuilder';

export const m16To18Specs: Record<string, UnitContentSpec> = Object.fromEntries([
  buildUnitSpec({
    code: '16.01',
    moduleId: 'data-architecture',
    idx: 0,
    title: 'Patrones OLTP, OLAP y separación de cargas',
    objective:
      'Separar transacciones de baja latencia (OLTP) de consultas analíticas pesadas (OLAP).',
    mins: 30,
    prereqs: ['04.03'],
    mentalModel:
      'Ejecutar reportes analíticos pesados sobre la BD transaccional primaria degrada el checkout en vivo.',
    antipattern:
      'Conectar herramientas BI directamente a la instancia primaria de producción en hora pico.',
    glossary: [
      ['OLTP', 'Transacciones cortas de alta concurrencia'],
      ['OLAP', 'Agregaciones columnares sobre históricos'],
    ],
    aws: [
      'RDS + Redshift / Athena',
      'aws rds describe-db-instances',
      'Read Replica o CDC hacia S3/Athena para BI',
    ],
    azure: [
      'Azure PG + Synapse / Fabric',
      'az postgres flexible-server replica list -g rg -n srv',
      'Réplica de lectura aísla queries analíticas',
    ],
    gcp: [
      'Cloud SQL + BigQuery',
      'gcloud sql instances describe inst',
      'Datastream replica cambios hacia BigQuery sin impacto',
    ],
    activity: 'Traza flujo OLTP -> CDC/Read Replica -> Analítica sin bloquear escrituras.',
  }),
  buildUnitSpec({
    code: '16.02',
    moduleId: 'data-architecture',
    idx: 1,
    title: 'Patrón Outbox, CDC y entregas confiables',
    objective:
      'Garantizar atomicidad entre estado de negocio y emisión de eventos mediante tabla Outbox transaccional.',
    mins: 35,
    prereqs: ['09.04', '13.02'],
    mentalModel:
      'Commit en BD + publish en cola NO es atómico: escribe el evento en la misma transacción Outbox.',
    antipattern:
      'Ejecutar await db.save(); await sqs.publish() afirmando entrega exacta sin reconciliación.',
    glossary: [
      ['Transactional Outbox', 'Tabla de eventos en la misma transacción SQL'],
      ['CDC', 'Change Data Capture desde WAL'],
    ],
    aws: [
      'PG Outbox + DMS / Poller -> SQS',
      'aws sqs get-queue-url --queue-name orders',
      'Publicador independiente lee Outbox con lease',
    ],
    azure: [
      'PG Outbox + Service Bus',
      'az servicebus topic list --namespace-name ns',
      'Evita mensajes fantasmas si falla el commit',
    ],
    gcp: [
      'Cloud SQL Outbox + Pub/Sub',
      'gcloud pubsub topics list',
      'Garantiza cero pérdida de eventos ante caída de red',
    ],
    activity: 'Compara en Messaging Lab eventos perdidos con y sin Outbox.',
  }),
  buildUnitSpec({
    code: '16.03',
    moduleId: 'data-architecture',
    idx: 2,
    title: 'Streaming, particionado y orden de eventos',
    objective:
      'Elegir clave de partición para preservar orden por agregado sin crear particiones calientes.',
    mins: 30,
    prereqs: ['16.02'],
    mentalModel:
      'El orden solo se garantiza dentro de una partición; una mala partition key crea cuellos de botella.',
    antipattern:
      'Usar una sola partición global o una clave constante concentrando el 100% del tráfico.',
    glossary: [
      ['Partition key', 'Clave que agrupa eventos ordenados'],
      ['Hot partition', 'Partición saturada por tráfico desigual'],
    ],
    aws: [
      'Amazon Kinesis / MSK',
      'aws kinesis list-streams',
      'PartitionKey por customerId/orderId distribuye carga',
    ],
    azure: [
      'Azure Event Hubs',
      'az eventhubs eventhub list -g rg --namespace-name ns',
      'Consumer groups independientes por servicio',
    ],
    gcp: [
      'Pub/Sub Ordering Keys',
      'gcloud pubsub subscriptions list',
      'Ordering keys mantienen secuencia por entidad',
    ],
    activity: 'Elige partition key para eventos de pagos evitando hot partitions.',
  }),
  buildUnitSpec({
    code: '16.04',
    moduleId: 'data-architecture',
    idx: 3,
    title: 'Data lakes, formatos columnares y gobernanza',
    objective:
      'Almacenar datos analíticos particionados en Parquet/Iceberg con catálogo y ciclo de vida.',
    mins: 30,
    prereqs: ['04.01', '16.01'],
    mentalModel:
      'Parquet columnar + particionado por fecha reduce hasta 90% el escaneo y costo de queries serverless.',
    antipattern: 'Consultar millones de JSON pequeños sin compactación en Object Storage.',
    glossary: [
      ['Parquet', 'Formato columnar comprimido'],
      ['Small files problem', 'Miles de objetos diminutos frenan lectura'],
    ],
    aws: [
      'S3 + Glue + Athena',
      'aws glue get-databases',
      'Particionar por year/month/day en Parquet',
    ],
    azure: [
      'ADLS Gen2 + Delta Lake',
      'az storage fs list --account-name adls',
      'Delta Lake añade transacciones ACID sobre Parquet',
    ],
    gcp: [
      'GCS + BigLake / Iceberg',
      'gcloud alpha bq tables list',
      'BigLake unifica gobernanza sobre Parquet/Iceberg',
    ],
    activity: 'Calcula ahorro de escaneo pasando de JSON plano a Parquet particionado.',
  }),
  buildUnitSpec({
    code: '16.05',
    moduleId: 'data-architecture',
    idx: 4,
    title: 'Retención, privacidad y calidad de datos',
    objective:
      'Aplicar minimización PII, anonimización y políticas de retención/borrado auditables.',
    mins: 25,
    prereqs: ['04.05', '16.04'],
    mentalModel:
      'Los datos personales sin retención definida ni clasificación son un pasivo legal y de seguridad.',
    antipattern:
      'Copiar volcados de producción con PII sin enmascarar hacia entornos de desarrollo.',
    glossary: [
      ['PII', 'Información personalmente identificable'],
      ['Data masking', 'Ofuscación reversible o irreversible en dev'],
    ],
    aws: [
      'Amazon Macie + S3 Lifecycle',
      'aws macie2 get-macie-session',
      'Macie detecta PII expuesta en buckets S3',
    ],
    azure: [
      'Microsoft Purview',
      'az purview account list -o table',
      'Clasificación y linaje automático de datos',
    ],
    gcp: [
      'Cloud DLP (Sensitive Data Protection)',
      'gcloud dlp inspect-templates list',
      'Redacta o tokeniza PII antes de analítica',
    ],
    activity: 'Define política de retención y enmascaramiento para staging.',
  }),
  buildUnitSpec({
    code: '17.01',
    moduleId: 'sre-finops',
    idx: 0,
    title: 'Presupuestos de error y políticas de despliegue',
    objective:
      'Gobernar velocidad de entregas usando el error budget restante como árbitro objetivo.',
    mins: 30,
    prereqs: ['12.04'],
    mentalModel:
      'Cuando el error budget llega a 0%, se detienen features no críticas y se invierte en fiabilidad (S10).',
    antipattern: 'Aprobar despliegues riesgosos con error budget agotado por presión comercial.',
    glossary: [
      ['Error budget policy', 'Regla acordada ante agotamiento de SLO'],
      ['Reliability sprint', 'Iteración dedicada a deuda operativa'],
    ],
    aws: [
      'SLO + Release Gate',
      'aws cloudwatch get-metric-statistics --help',
      'Automatizar bloqueo de deploy si burn-rate supera umbral',
    ],
    azure: [
      'Azure Monitor + Pipelines Gate',
      'az pipelines release list',
      'Pre-deployment gate verifica salud SLO',
    ],
    gcp: [
      'Cloud Monitoring Error Budget',
      'gcloud alpha monitoring slos list --service=app',
      'Dashboard compartido producto + ingeniería',
    ],
    activity: 'Resuelve el dilema comercial del caso Senior S10.',
  }),
  buildUnitSpec({
    code: '17.02',
    moduleId: 'sre-finops',
    idx: 1,
    title: 'Platform Engineering y golden paths',
    objective:
      'Ofrecer plantillas autoservicio seguras (Golden Paths) que hagan fácil cumplir seguridad y FinOps.',
    mins: 30,
    prereqs: ['11.03', '14.03'],
    mentalModel:
      'Una buena plataforma interna reduce carga cognitiva: el camino seguro es también el más rápido.',
    antipattern: 'Imponer 20 tickets manuales de aprobación sin plantillas reutilizables.',
    glossary: [
      ['Golden Path', 'Plantilla opinada con seguridad y observabilidad incluidas'],
      ['IDP', 'Internal Developer Platform'],
    ],
    aws: [
      'Service Catalog / Proton / Terraform',
      'aws servicecatalog list-portfolios',
      'Módulos curados con tags y KMS por defecto',
    ],
    azure: [
      'Azure Deployment Environments',
      'az devcenter dev environment list',
      'Entornos pre-aprobados con RBAC acotado',
    ],
    gcp: [
      'Cloud Foundation Blueprints',
      'gcloud infra-manager deployments list',
      'Blueprints validados con Org Policies',
    ],
    activity: 'Diseña los 5 ingredientes mínimos de un Golden Path de microservicio.',
  }),
  buildUnitSpec({
    code: '17.03',
    moduleId: 'sre-finops',
    idx: 2,
    title: 'FinOps avanzado: right-sizing, reservas y egress',
    objective:
      'Combinar ARM64, Savings Plans/Reservations, Spot en workers y eliminación de cargos NAT/egress.',
    mins: 35,
    prereqs: ['06.05', '08.02'],
    mentalModel:
      'Optimizar FinOps empieza por arquitectura (endpoints privados, caché, ARM64), antes que negociar descuentos.',
    antipattern: 'Comprar reservas de 3 años para instancias sobredimensionadas al 10% de CPU.',
    glossary: [
      ['Unit economics', 'Costo por transacción o cliente activo'],
      ['Graviton/ARM64', 'Arquitectura de mayor eficiencia precio/watt'],
    ],
    aws: [
      'Compute Optimizer + OpenCost',
      'aws compute-optimizer get-ec2-instance-recommendations',
      'ARM64 Graviton + VPC Gateway Endpoint',
    ],
    azure: [
      'Azure Advisor + Reservations',
      'az advisor recommendation list --category Cost',
      'Hybrid Benefit y Savings Plans',
    ],
    gcp: [
      'Active Assist + CUDs',
      'gcloud recommender recommendations list --recommender=google.compute.instance.MachineTypeRecommender',
      'Committed Use Discounts flexibles',
    ],
    activity: 'Modela combinación ARM64 + Endpoint en FinOps Lab superando 45% ahorro.',
  }),
  buildUnitSpec({
    code: '17.04',
    moduleId: 'sre-finops',
    idx: 3,
    title: 'Capacidad, pruebas de carga y cuellos de botella',
    objective:
      'Ejecutar pruebas de carga progresivas identificando el primer recurso saturado extremo a extremo.',
    mins: 30,
    prereqs: ['03.05', '13.03'],
    mentalModel:
      'La capacidad real de un sistema la dicta su dependencia más lenta o limitada (usualmente la BD).',
    antipattern: 'Lanzar pruebas de carga directo a producción sin avisar ni proteger cuotas.',
    glossary: [
      ['k6 / Locust', 'Herramientas reproducibles de prueba de carga'],
      ['Saturation point', 'Punto donde latencia p99 se dispara'],
    ],
    aws: [
      'Load Testing + CloudWatch',
      'aws rds describe-db-instances --query "DBInstances[].MaxAllocatedStorage"',
      'Medir CPU, conexiones BD y p99 simultáneamente',
    ],
    azure: [
      'Azure Load Testing',
      'az load list -o table',
      'Correlacionar métricas servidor durante rampa',
    ],
    gcp: [
      'Cloud Trace + Load Runner',
      'gcloud monitoring dashboards list',
      'Detectar contención de locks y pools',
    ],
    activity: 'Identifica cuello de botella BD en Load Balancing & Backpressure Lab.',
  }),
  buildUnitSpec({
    code: '17.05',
    moduleId: 'sre-finops',
    idx: 4,
    title: 'Postmortems sin culpa y mejora continua',
    objective:
      'Convertir cada incidente en acciones preventivas verificables con owner, fecha y prueba negativa.',
    mins: 25,
    prereqs: ['12.05'],
    mentalModel:
      'Culpar personas oculta fallos sistémicos; los postmortems fortalecen guardrails y runbooks.',
    antipattern:
      'Cerrar un postmortem con "tener más cuidado la próxima vez" sin cambios técnicos.',
    glossary: [
      ['Action item', 'Acción técnica con dueño y verificación en CI'],
      ['Timeline', 'Cronología objetiva T-15m a T+10m'],
    ],
    aws: [
      'Postmortem ADR Markdown',
      'aws ssm list-ops-items',
      'Cada acción preventiva enlaza a PR/test',
    ],
    azure: [
      'Postmortem + Work Items',
      'az boards work-item show --id 1',
      'Incluir análisis de detección y contención',
    ],
    gcp: [
      'SRE Postmortem Culture',
      'gcloud logging read "severity>=ERROR" --limit=3',
      'Revisar tiempo de detección (TTD) y mitigación (TTM)',
    ],
    activity: 'Exporta un Postmortem / ADR (.md) completo con acciones preventivas.',
  }),
  buildUnitSpec({
    code: '18.01',
    moduleId: 'capstone',
    idx: 0,
    title: 'Análisis de requisitos funcionales y no funcionales',
    objective:
      'Traducir requisitos de negocio en SLOs (99.95%), RTO/RPO, cumplimiento y límites de costo.',
    mins: 35,
    prereqs: ['13.05', '15.01'],
    mentalModel:
      'Toda arquitectura senior parte de números verificables (SLO, RTO, RPO, p99, presupuesto), nunca de logos.',
    antipattern:
      'Diseñar multicloud complejo sin requisito regulatorio ni de resiliencia que lo justifique (S17).',
    glossary: [
      ['NFR', 'Requisito no funcional medible'],
      ['TCO', 'Costo total de propiedad incluyendo operación'],
    ],
    aws: [
      'Requisitos -> AWS Well-Architected',
      'aws wellarchitected get-milestone --help',
      'Documentar supuestos y restricciones antes de elegir servicios',
    ],
    azure: [
      'Requisitos -> Azure Architecture',
      'az account show',
      'Mapear zonas disponibles y cumplimiento regional',
    ],
    gcp: [
      'Requisitos -> GCP Architecture',
      'gcloud projects describe proj',
      'Definir cuotas y presupuestos por carpeta',
    ],
    activity: 'Completa matriz de requisitos NFR para plataforma transaccional 99.95%.',
  }),
  buildUnitSpec({
    code: '18.02',
    moduleId: 'capstone',
    idx: 1,
    title: 'Diseño de topología, red y datos',
    objective:
      'Integrar subredes públicas/privadas/aisladas, Private Endpoints, BD Multi-AZ y mensajería Outbox.',
    mins: 40,
    prereqs: ['08.02', '16.02', '18.01'],
    mentalModel:
      'Capas limpias con mínimo alcance de red: borde WAF/ALB -> App privada -> Datos aislados sin IP pública.',
    antipattern:
      'Conectar directamente Internet con la base de datos o mezclar cargas públicas y privadas.',
    glossary: [
      ['Defense in depth', 'Múltiples capas independientes de control'],
      ['Three-tier isolated', 'Borde, aplicación privada y datos aislados'],
    ],
    aws: [
      'VPC 3-Tier + Aurora + SQS',
      'aws ec2 describe-vpcs',
      'Subredes privadas en 3 AZs + Gateway Endpoint S3',
    ],
    azure: [
      'VNet 3-Tier + PG + Service Bus',
      'az network vnet list -o table',
      'Private Link + Private DNS Zones',
    ],
    gcp: [
      'VPC + Cloud Run + Cloud SQL + Pub/Sub',
      'gcloud compute networks list',
      'Serverless VPC Access / Direct VPC Egress',
    ],
    activity: 'Valida tu topología de 4 saltos en Routing & Firewall Lab 3D.',
  }),
  buildUnitSpec({
    code: '18.03',
    moduleId: 'capstone',
    idx: 2,
    title: 'Seguridad, identidad y gobierno de la solución',
    objective:
      'Incorporar OIDC en CI/CD, mínimo privilegio IAM, KMS, secretos rotables y Policy as Code.',
    mins: 35,
    prereqs: ['12.01', '14.03', '18.02'],
    mentalModel:
      'La seguridad no se añade al final: identidad efímera, cifrado KMS y políticas en PR nacen con la arquitectura.',
    antipattern:
      'Dejar "cifrado y controles IAM pendientes para fase 2" antes de salir a producción (S18).',
    glossary: [
      ['Threat model', 'Activos, actores, límites de confianza y amenazas'],
      ['Residual risk', 'Riesgo remanente aceptado formalmente'],
    ],
    aws: [
      'STS OIDC + KMS + Security Hub',
      'aws iam list-policies --scope Local',
      'Cero credenciales estáticas en repositorios ni contenedores',
    ],
    azure: [
      'Entra Managed Identity + Key Vault',
      'az role assignment list',
      'Deny Assignments + Azure Policy en producción',
    ],
    gcp: [
      'Workload Identity + KMS + Org Policy',
      'gcloud kms keyrings list --location=global',
      'Uniform bucket access y IAP en herramientas internas',
    ],
    activity: 'Redacta tabla de 5 amenazas y sus controles automatizados.',
  }),
  buildUnitSpec({
    code: '18.04',
    moduleId: 'capstone',
    idx: 3,
    title: 'Plan de observabilidad, resiliencia y costos',
    objective:
      'Cerrar el diseño con SLO burn-rate alerts, plan DR ensayado y estimación FinOps mensual.',
    mins: 35,
    prereqs: ['15.03', '17.03', '18.03'],
    mentalModel:
      'Una arquitectura no está terminada sin saber cómo se observa, cómo se recupera y cuánto cuesta operar.',
    antipattern:
      'Presentar diagramas bonitos sin presupuesto mensual, sin GameDay ni alertas accionables.',
    glossary: [
      ['Operability', 'Capacidad de operar, depurar y recuperar a bajo costo'],
      ['Runbook', 'Guía ejecutable ante incidente'],
    ],
    aws: [
      'CloudWatch SLO + Backup + Budgets',
      'aws ce get-cost-and-usage --help',
      'Presupuesto con alertas al 50%, 80% y 100%',
    ],
    azure: [
      'Azure Monitor + Backup + Cost Mgmt',
      'az monitor metrics alert list',
      'Simulacros trimestrales con RTO/RPO cronometrados',
    ],
    gcp: [
      'Cloud Monitoring + DR + Billing',
      'gcloud billing budgets list --billing-account=01',
      'Burn-rate alerts multi-window 1h/6h',
    ],
    activity: 'Calcula error budget, estrategia DR y ahorro FinOps en los simuladores.',
  }),
  buildUnitSpec({
    code: '18.05',
    moduleId: 'capstone',
    idx: 4,
    title: 'Defensa técnica, ADR y comparativa multicloud',
    objective:
      'Defender decisiones arquitectónicas con trade-offs medibles, riesgos residuales y ADR firmado.',
    mins: 35,
    prereqs: ['18.04'],
    mentalModel:
      'El criterio senior se demuestra justificando qué descartaste, qué riesgo aceptas y cómo lo verificas.',
    antipattern:
      'Vender una arquitectura como "cero fallas posibles" o basar decisiones en moda tecnológica.',
    glossary: [
      ['Architecture defense', 'Sustentación con evidencia, métricas y trade-offs'],
      ['Exit criteria', 'Criterios objetivos para aprobar salida'],
    ],
    aws: [
      'Capstone Defense AWS',
      'aws wellarchitected list-workloads',
      'Entregar diagrama, threat model, plan DR y ADR',
    ],
    azure: [
      'Capstone Defense Azure',
      'az advisor recommendation list',
      'Comparar TCO y equivalencias no 1:1 frente a AWS/GCP',
    ],
    gcp: [
      'Capstone Defense GCP',
      'gcloud projects list',
      'Demostrar portabilidad razonada sin sobreingeniería',
    ],
    activity: 'Completa el caso Senior S18 (Defensa de arquitectura empresarial).',
  }),
]);
