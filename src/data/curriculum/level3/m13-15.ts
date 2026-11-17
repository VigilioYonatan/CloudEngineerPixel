import type { UnitContentSpec } from '../../../domain/curriculum';
import { buildUnitSpec } from '../unitBuilder';

export const m13To15Specs: Record<string, UnitContentSpec> = Object.fromEntries([
  buildUnitSpec({
    code: '13.01',
    moduleId: 'software-architecture',
    idx: 0,
    title: 'Monolito modular vs microservicios',
    objective:
      'Elegir monolito modular como punto de partida y extraer microservicios solo ante límites reales de equipo o escala.',
    mins: 35,
    prereqs: ['08.01', '10.02'],
    mentalModel:
      'Los microservicios resuelven autonomía organizacional y escalado asimétrico, no deuda de código.',
    antipattern:
      'Fragmentar un MVP de 2 desarrolladores en 12 microservicios distribuidos con latencia en cascada.',
    glossary: [
      ['Monolito modular', 'Módulos con fronteras estrictas en un proceso'],
      ['Distributed monolith', 'Microservicios acoplados por BD compartida'],
    ],
    aws: [
      'ECS / EKS Modular',
      'aws ecs list-services --cluster prod',
      'Un solo despliegue modular simplifica rollback',
    ],
    azure: [
      'Container Apps / AKS',
      'az containerapp list -o table',
      'Dapr o colas desacoplan cuando crece el equipo',
    ],
    gcp: [
      'Cloud Run Services',
      'gcloud run services list',
      'Escala independiente por módulo HTTP/evento',
    ],
    activity: 'Evalúa 3 criterios para justificar o rechazar extraer un microservicio.',
  }),
  buildUnitSpec({
    code: '13.02',
    moduleId: 'software-architecture',
    idx: 1,
    title: 'Arquitecturas orientadas a eventos y consistencia',
    objective:
      'Diseñar flujos asíncronos con consistencia eventual, correlación y contratos de evento versionados.',
    mins: 35,
    prereqs: ['09.04', '13.01'],
    mentalModel:
      'Los eventos desacoplan disponibilidad temporal, pero exigen tolerar desorden y duplicados.',
    antipattern:
      'Publicar eventos internos con esquemas acoplados a tablas privadas sin versionado.',
    glossary: [
      ['Eventual consistency', 'Convergencia diferida entre vistas'],
      ['Schema registry', 'Contrato versionado de eventos'],
    ],
    aws: [
      'EventBridge + SQS',
      'aws events list-event-buses',
      'EventBridge enruta por reglas sin acoplar productores',
    ],
    azure: [
      'Event Grid + Service Bus',
      'az eventgrid topic list -o table',
      'Event Grid para notificaciones; Service Bus para comandos',
    ],
    gcp: [
      'Eventarc + Pub/Sub',
      'gcloud eventarc triggers list',
      'CloudEvents estandariza metadatos entre servicios',
    ],
    activity: 'Define contrato v1 de evento OrderPaid sin exponer campos PII.',
  }),
  buildUnitSpec({
    code: '13.03',
    moduleId: 'software-architecture',
    idx: 2,
    title: 'Resiliencia de llamadas: timeouts, retries y circuit breakers',
    objective:
      'Evitar cascadas de fallos acotando timeouts, backoff con jitter y circuit breakers.',
    mins: 35,
    prereqs: ['08.05'],
    mentalModel:
      'Sin timeouts ni circuit breakers, una dependencia lenta agota todos los hilos del llamador.',
    antipattern:
      'Reintentar 5 veces sin jitter multiplicando por 5x el tráfico contra un servicio saturado (S11).',
    glossary: [
      ['Jitter', 'Aleatoriedad en backoff para evitar thundering herd'],
      ['Circuit breaker', 'Cortocircuito rápido ante fallos'],
    ],
    aws: [
      'ALB / Envoy / App Mesh',
      'aws xray get-service-graph --start-time ... --end-time ...',
      'Timeouts decrecientes a lo largo de la cadena',
    ],
    azure: [
      'API Management / Envoy',
      'az network application-gateway http-settings list',
      'Políticas de retry solo en errores idempotentes',
    ],
    gcp: [
      'Cloud Service Mesh',
      'gcloud compute backend-services describe bs',
      'Outlier detection expulsa instancias degradadas',
    ],
    activity: 'Calcula presupuesto de timeout para 3 saltos sincrónicos (< 800 ms total).',
  }),
  buildUnitSpec({
    code: '13.04',
    moduleId: 'software-architecture',
    idx: 3,
    title: 'Multi-tenancy y aislamiento de clientes',
    objective:
      'Aislar datos, cuotas y llaves entre tenants (Silo, Bridge o Pool con tenant_id obligatorio).',
    mins: 35,
    prereqs: ['05.01', '13.01'],
    mentalModel:
      'El aislamiento multi-tenant falla cuando una sola query omite WHERE tenant_id o un pool ruidoso satura al vecino.',
    antipattern:
      'Confiar el aislamiento de tenant únicamente a un filtro en el frontend o al ID de URL.',
    glossary: [
      ['Noisy neighbor', 'Tenant que consume recursos compartidos'],
      ['RLS', 'Row-Level Security en PostgreSQL'],
    ],
    aws: [
      'Cognito + PostgreSQL RLS',
      'aws rds describe-db-clusters',
      'Evaluar Silo por cliente regulado vs Pool con RLS',
    ],
    azure: [
      'Entra ID + Cosmos Partition',
      'az cosmosdb sql container show ...',
      'Partition key por tenantId acota lecturas',
    ],
    gcp: [
      'IAM + Cloud SQL RLS',
      'gcloud sql databases list -i inst',
      'Cuotas por tenant en API Gateway',
    ],
    activity: 'Diseña prueba negativa de acceso cruzado entre Tenant A y Tenant B.',
  }),
  buildUnitSpec({
    code: '13.05',
    moduleId: 'software-architecture',
    idx: 4,
    title: 'ADRs y documentación de decisiones técnicas',
    objective:
      'Registrar contexto, opciones descartadas, trade-offs y consecuencias en ADRs inmutables.',
    mins: 25,
    prereqs: ['13.01'],
    mentalModel:
      'Un ADR nunca se reescribe borrando la historia: nuevas decisiones crean un nuevo ADR que reemplaza al anterior.',
    antipattern:
      'Tomar decisiones críticas en chats efímeros sin documentar por qué se descartaron alternativas.',
    glossary: [
      ['ADR', 'Architecture Decision Record'],
      ['Supersedes', 'ADR nuevo que reemplaza a uno previo'],
    ],
    aws: [
      'Git ADRs + Well-Architected',
      'aws wellarchitected list-workloads',
      'Vincular cada cambio mayor de IaC a su ADR',
    ],
    azure: [
      'Git ADRs + Cloud Adoption',
      'az advisor recommendation list',
      'Registrar impactos de costo y RTO/RPO',
    ],
    gcp: [
      'Git ADRs + Architecture Center',
      'gcloud recommender recommendations list',
      'Documentar fecha de revisión y owner',
    ],
    activity: 'Redacta un ADR de 1 página eligiendo Postgres RLS vs BD por tenant.',
  }),
  buildUnitSpec({
    code: '14.01',
    moduleId: 'governance',
    idx: 0,
    title: 'Landing Zones y estructura multi-cuenta',
    objective:
      'Segregar cuentas/proyectos de Seguridad, Logs, Red compartida y Workloads bajo políticas comunes.',
    mins: 35,
    prereqs: ['01.04', '05.04'],
    mentalModel:
      'Una Landing Zone automatiza identidad, logs centrales y red base antes de desplegar la primera app.',
    antipattern: 'Crear cuentas manuales sin baseline de auditoría ni límites de servicio.',
    glossary: [
      ['Landing Zone', 'Base multi-cuenta automatizada'],
      ['Log Archive', 'Cuenta inmutable de auditoría'],
    ],
    aws: [
      'AWS Control Tower / AFT',
      'aws controltower list-enabled-baselines',
      'OUs Security, Infrastructure y Workloads',
    ],
    azure: [
      'Azure Landing Zones',
      'az account management-group list',
      'Platform vs Landing Zones Management Groups',
    ],
    gcp: [
      'GCP Enterprise Foundation',
      'gcloud resource-manager folders list --organization=123',
      'Shared VPC + Folder Hierarchy por entorno',
    ],
    activity: 'Mapea las 4 unidades organizativas mínimas de una Landing Zone.',
  }),
  buildUnitSpec({
    code: '14.02',
    moduleId: 'governance',
    idx: 1,
    title: 'Arquitectura Zero Trust en la nube',
    objective:
      'Verificar explícitamente identidad, dispositivo y contexto en cada salto sin confiar en la red interna.',
    mins: 35,
    prereqs: ['05.02', '08.03'],
    mentalModel:
      'Zero Trust asume brecha en el perímetro: cada servicio autentica y autoriza cada petición.',
    antipattern:
      'Permitir tráfico sin autenticación entre microservicios solo por estar dentro de la misma VPC.',
    glossary: [
      ['Zero Trust', 'Nunca confiar, siempre verificar'],
      ['Least-privilege mesh', 'Identidad SPIFFE/mTLS por workload'],
    ],
    aws: [
      'Verified Access + IAM + mTLS',
      'aws ec2 describe-verified-access-instances',
      'Identidad IAM/STS + VPC Lattice',
    ],
    azure: [
      'Entra ID + Private Link + mTLS',
      'az ad sp list --show-mine',
      'Conditional Access por riesgo y dispositivo',
    ],
    gcp: [
      'BeyondCorp Enterprise + Mesh',
      'gcloud iap settings get',
      'IAP + Workload Identity + Cloud Service Mesh',
    ],
    activity: 'Identifica 3 controles Zero Trust entre API pública, Worker y BD.',
  }),
  buildUnitSpec({
    code: '14.03',
    moduleId: 'governance',
    idx: 2,
    title: 'Políticas como código y prevención en CI/CD',
    objective: 'Bloquear configuraciones inseguras en PR y admisión K8s mediante OPA/Kyverno CEL.',
    mins: 30,
    prereqs: ['10.04', '11.05'],
    mentalModel:
      'Policy as Code convierte reglas de seguridad en pruebas automáticas reproducibles en cada commit.',
    antipattern:
      'Detectar un bucket público o pod privilegiado semanas después en una auditoría manual.',
    glossary: [
      ['Admission Controller', 'Valida manifiestos antes de persistir en etcd'],
      ['Kyverno CEL', 'Políticas declarativas nativas K8s'],
    ],
    aws: [
      'OPA / Kyverno en EKS',
      'kubectl get validatingadmissionpolicies',
      'Bloquear privileged:true y hostPath en producción',
    ],
    azure: [
      'Azure Policy for AKS',
      'az policy state list --filter "ComplianceState eq \'NonCompliant\'"',
      'Gatekeeper integrado en AKS',
    ],
    gcp: [
      'Policy Controller (Anthos/GKE)',
      'gcloud container hub policycontroller describe',
      'ConstraintTemplates compartidos por organización',
    ],
    activity: 'Define regla de admisión que rechace contenedores root o :latest.',
  }),
  buildUnitSpec({
    code: '14.04',
    moduleId: 'governance',
    idx: 3,
    title: 'Gestión avanzada de claves y KMS',
    objective:
      'Implementar envelope encryption, rotación anual y separación de administradores KMS vs datos.',
    mins: 30,
    prereqs: ['04.05'],
    mentalModel:
      'El administrador de infraestructura no debe poder descifrar datos de clientes sin dejar rastro KMS.',
    antipattern: 'Usar la misma llave sin rotación para todos los entornos dev y prod.',
    glossary: [
      ['Envelope encryption', 'DEK cifra datos; KEK (KMS) cifra la DEK'],
      ['Key policy', 'Control de quién usa vs administra la llave'],
    ],
    aws: [
      'AWS KMS Key Policies',
      'aws kms get-key-rotation-status --key-id id',
      'Separar kms:Decrypt (app) de kms:PutKeyPolicy (admin)',
    ],
    azure: [
      'Azure Key Vault HSM',
      'az keyvault key list --vault-name kv',
      'BYOK/HSM con RBAC granular por llave',
    ],
    gcp: [
      'Cloud KMS / EKM',
      'gcloud kms keys list --keyring=kr --location=global',
      'Rotation period declarativo en Terraform',
    ],
    activity: 'Explica por qué envelope encryption evita enviar gigabytes a KMS.',
  }),
  buildUnitSpec({
    code: '14.05',
    moduleId: 'governance',
    idx: 4,
    title: 'Cumplimiento continuo, postura y respuesta',
    objective:
      'Correlacionar hallazgos de postura (CSPM) con playbooks automatizados de contención.',
    mins: 30,
    prereqs: ['05.05', '14.01'],
    mentalModel:
      'La seguridad continua mide deriva de postura en tiempo real y responde con evidencias forenses.',
    antipattern:
      'Ignorar alertas críticas de GuardDuty/Defender o borrar recursos comprometidos destruyendo evidencia (S12).',
    glossary: [
      ['CSPM', 'Cloud Security Posture Management'],
      ['Forensic snapshot', 'Copia aislada antes de aislar/terminar'],
    ],
    aws: [
      'Security Hub + GuardDuty',
      'aws securityhub get-findings --max-items 5',
      'EventBridge dispara notificación ante hallazgo Crítico',
    ],
    azure: [
      'Defender for Cloud',
      'az security assessment list -o table',
      'Secure Score mide postura por suscripción',
    ],
    gcp: [
      'Security Command Center',
      'gcloud scc findings list 123',
      'Event Threat Detection alerta sobre exfiltración',
    ],
    activity: 'Traza flujo de respuesta ante pod privilegiado sospechoso (caso S12).',
  }),
  buildUnitSpec({
    code: '15.01',
    moduleId: 'resilience',
    idx: 0,
    title: 'RTO, RPO y dominios de fallo reales',
    objective:
      'Traducir requisitos de negocio en objetivos medibles de RTO (tiempo) y RPO (pérdida máxima de datos).',
    mins: 30,
    prereqs: ['01.02', '04.05'],
    mentalModel:
      'RPO dicta la frecuencia de respaldo/replicación; RTO dicta la automatización de conmutación.',
    antipattern:
      'Prometer RTO 5 min y RPO 0 con una estrategia manual de Backup & Restore (S08/S13).',
    glossary: [
      ['RTO', 'Recovery Time Objective (tiempo máximo caído)'],
      ['RPO', 'Recovery Point Objective (pérdida máxima)'],
    ],
    aws: [
      'AWS Backup + Multi-Region',
      'aws backup list-recovery-points-by-backup-vault --backup-vault-name Default',
      'Copiar snapshots hacia otra región y cuenta',
    ],
    azure: [
      'Azure Backup Vault + GRS',
      'az backup vault list -o table',
      'GRS/GZRS replica asíncronamente a región pareja',
    ],
    gcp: [
      'Backup and DR Service',
      'gcloud sql backups list -i inst',
      'Backups multi-región inmutables',
    ],
    activity: 'Valida en DR Studio qué estrategias cumplen RTO<=15m y RPO<=5m.',
  }),
  buildUnitSpec({
    code: '15.02',
    moduleId: 'resilience',
    idx: 1,
    title: 'Estrategias Backup, Pilot Light, Warm Standby y Active/Active',
    objective:
      'Equilibrar costo operativo frente a velocidad de recuperación según criticidad del servicio.',
    mins: 35,
    prereqs: ['15.01'],
    mentalModel:
      'Cada salto de Backup -> Pilot Light -> Warm Standby -> Active/Active reduce RTO/RPO pero multiplica costo y complejidad.',
    antipattern:
      'Implementar Active/Active multi-región sin resolver consistencia de escritura ni presupuesto FinOps.',
    glossary: [
      ['Pilot Light', 'Datos replicados, cómputo apagado hasta failover'],
      ['Split-brain', 'Dos primarios escribiendo en paralelo'],
    ],
    aws: [
      'Aurora Global Database',
      'aws rds describe-global-clusters',
      'RPO típico < 1s y promoción regional rápida',
    ],
    azure: [
      'Azure Front Door + SQL Failover',
      'az sql failover-group list -g rg -s srv',
      'Failover group mantiene endpoint único',
    ],
    gcp: [
      'Cloud Spanner / AlloyDB',
      'gcloud spanner instances list',
      'Spanner ofrece consistencia global fuerte',
    ],
    activity: 'Justifica qué estrategia DR elegirías para facturación vs portal de reportes.',
  }),
  buildUnitSpec({
    code: '15.03',
    moduleId: 'resilience',
    idx: 2,
    title: 'Pruebas de restauración y GameDays',
    objective:
      'Ejecutar simulacros periódicos cronometrados para certificar RTO/RPO reales y runbooks.',
    mins: 30,
    prereqs: ['15.01'],
    mentalModel:
      'Un plan DR que nunca se ensayó bajo GameDay es ficción: la falla aparecerá en el peor momento.',
    antipattern:
      'Marcar DR aprobado porque "la consola muestra backup verde" sin probar restauración aislada (S08).',
    glossary: [
      ['GameDay', 'Simulacro controlado de fallo en equipo'],
      ['Chaos Mesh / FIS', 'Inyección controlada de fallos'],
    ],
    aws: [
      'AWS Fault Injection Service',
      'aws fis list-experiment-templates',
      'Inyectar pérdida de AZ o latencia en staging',
    ],
    azure: [
      'Azure Chaos Studio',
      'az rest --method get --url https://management.azure.com/...',
      'Experimentos sobre AKS y VMSS',
    ],
    gcp: [
      'GKE Chaos / Cloud Run',
      'gcloud compute regions describe us-central1',
      'Validar drain zonal y failback posterior',
    ],
    activity: 'Redacta plantilla de GameDay con métricas pre/post y criterio de aborto.',
  }),
  buildUnitSpec({
    code: '15.04',
    moduleId: 'resilience',
    idx: 3,
    title: 'Failover regional, DNS y consistencia de datos',
    objective:
      'Ejecutar conmutación regional segura verificando lag de réplica, TTL DNS y plan de failback.',
    mins: 35,
    prereqs: ['15.02'],
    mentalModel:
      'Cambiar DNS sin revisar el lag de réplica o el plan de failback convierte una caída en corrupción de datos.',
    antipattern: 'Forzar failover automático sin fencing ni prevención de split-brain (S13).',
    glossary: [
      ['Fencing', 'Aislar antiguo primario antes de promover'],
      ['Failback', 'Retorno ordenado a región primaria'],
    ],
    aws: [
      'Route 53 Failover + Health Checks',
      'aws route53 list-health-checks',
      'TTL bajo (60s) para conmutación DNS predecible',
    ],
    azure: [
      'Azure Traffic Manager / AFD',
      'az network traffic-manager profile list',
      'Health probes multi-ubicación',
    ],
    gcp: [
      'Cloud DNS Routing Policies',
      'gcloud dns record-sets list -z zone',
      'Global LB redirige sin esperar propagación DNS',
    ],
    activity: 'Evalúa en Senior S13 si 14 min de lag cumple RPO de 15 min.',
  }),
  buildUnitSpec({
    code: '15.05',
    moduleId: 'resilience',
    idx: 4,
    title: 'Degradación elegante ante fallas parciales',
    objective:
      'Mantener funciones críticas activas cuando caen cachés, recomendaciones o servicios secundarios.',
    mins: 30,
    prereqs: ['13.03'],
    mentalModel:
      'Si falla una función secundaria (recomendaciones/caché), el flujo principal (checkout/lectura) debe seguir operando.',
    antipattern:
      'Tumbar toda la página principal porque el servicio de avatares o caché Valkey dio timeout.',
    glossary: [
      ['Graceful degradation', 'Operar con funcionalidad reducida segura'],
      ['Fallback cache', 'Respuesta degradada controlada'],
    ],
    aws: [
      'CloudFront + Feature Flags',
      'aws appconfig list-applications',
      'AppConfig permite apagar módulos no críticos en segundos',
    ],
    azure: [
      'Azure App Configuration',
      'az appconfig list -o table',
      'Feature flags dinámicos desactivan dependencias rotas',
    ],
    gcp: [
      'Firebase / Cloud Run Fallbacks',
      'gcloud run services describe api',
      'Degradar lecturas de caché hacia réplica protegida',
    ],
    activity: 'Diseña plan de degradación si Valkey queda inaccesible 10 minutos.',
  }),
]);
