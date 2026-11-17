import type { UnitContentSpec } from '../../../domain/curriculum';
import { buildUnitSpec } from '../unitBuilder';

export const m07To09Specs: Record<string, UnitContentSpec> = Object.fromEntries([
  buildUnitSpec({
    code: '07.01',
    moduleId: 'cloud-cli',
    idx: 0,
    title: 'CLI de AWS, Azure y GCP: perfiles y contextos',
    objective:
      'Cambiar de cuenta/suscripción/proyecto sin riesgo de ejecutar comandos en el entorno equivocado.',
    mins: 30,
    prereqs: ['01.05'],
    mentalModel:
      'Verifica siempre identidad y contexto antes de cualquier escritura: prod y dev nunca comparten perfil por defecto.',
    antipattern: 'Usar perfil default con credenciales productivas sin confirmaciones de contexto.',
    glossary: [
      ['Profile/Context', 'Ámbito autenticado de CLI'],
      ['SSO session', 'Token temporal renovable'],
    ],
    aws: [
      'AWS CLI Profiles',
      'aws sts get-caller-identity --profile prod-ro',
      'AWS_PROFILE separa cuentas y roles',
    ],
    azure: [
      'Azure CLI Context',
      'az account show --query "{name:name,id:id}"',
      'az account set cambia suscripción activa',
    ],
    gcp: [
      'gcloud Configurations',
      'gcloud config configurations list',
      'CLOUDSDK_ACTIVE_CONFIG_NAME aísla proyectos',
    ],
    activity: 'Valida identidad en modo solo lectura con --profile / configurations.',
  }),
  buildUnitSpec({
    code: '07.02',
    moduleId: 'cloud-cli',
    idx: 1,
    title: 'Consultas con jq y filtros de API',
    objective:
      'Extraer campos exactos de respuestas JSON de nube para automatización determinista.',
    mins: 30,
    prereqs: ['07.01'],
    mentalModel:
      'Filtra en servidor (--query/--filter) y procesa con jq para scripts predecibles sin parsear texto humano.',
    antipattern: 'Usar grep/awk sobre salidas tabulares que cambian con el ancho de terminal.',
    glossary: [
      ['JMESPath', 'Lenguaje nativo de --query en AWS/Azure'],
      ['jq', 'Procesador JSON seguro en CLI'],
    ],
    aws: [
      '--query & jq',
      'aws ec2 describe-vpcs --query "Vpcs[].VpcId" --output json | jq -r ".[]"',
      'JMESPath filtra antes de imprimir',
    ],
    azure: [
      'az --query',
      'az vm list --query "[].{name:name,rg:resourceGroup}" -o json | jq .',
      'Mismo motor JMESPath integrado',
    ],
    gcp: [
      'gcloud --format=json',
      'gcloud compute instances list --format="json(name,zone)" | jq .',
      '--filter reduce payload desde API',
    ],
    activity: 'Extrae IDs y etiquetas de recursos activos con --query + jq.',
  }),
  buildUnitSpec({
    code: '07.03',
    moduleId: 'cloud-cli',
    idx: 2,
    title: 'Bash seguro para automatización operativa',
    objective: 'Escribir scripts Bash resilientes con set -euo pipefail y validación de variables.',
    mins: 35,
    prereqs: ['07.02'],
    mentalModel:
      'Un script sin set -euo pipefail continúa ejecutándose tras un fallo previo y puede borrar el entorno equivocado.',
    antipattern: 'Omitir comillas en "$VAR" o ignorar códigos de salida en pipelines.',
    glossary: [
      ['set -euo pipefail', 'Fallo rápido ante error, variable indefinida o pipe roto'],
      ['trap', 'Limpieza segura al salir'],
    ],
    aws: [
      'Bash + AWS CLI',
      'set -euo pipefail; aws s3 ls --profile "${AWS_PROFILE:?}"',
      'Verifica AWS_PROFILE antes de operar',
    ],
    azure: [
      'Bash + Azure CLI',
      'set -euo pipefail; az group show -n "${RG:?}" -o none',
      'az ... -o none evita ruido en logs CI',
    ],
    gcp: [
      'Bash + gcloud',
      'set -euo pipefail; gcloud projects describe "${PROJECT_ID:?}"',
      'Falla inmediatamente si falta PROJECT_ID',
    ],
    activity: 'Reescribe un script inseguro añadiendo set -euo pipefail y trap.',
  }),
  buildUnitSpec({
    code: '07.04',
    moduleId: 'cloud-cli',
    idx: 3,
    title: 'Operaciones idempotentes y dry-run',
    objective:
      'Garantizar que re-ejecutar un script ante fallo parcial produzca exactamente el mismo estado.',
    mins: 30,
    prereqs: ['07.03'],
    mentalModel:
      'En automatización cloud, reintentar es la norma; todo script debe tolerar ejecutarse 2 o 10 veces.',
    antipattern: 'Asumir que un recurso no existe y fallar (o duplicar) en el segundo intento.',
    glossary: [
      ['Idempotencia', 'Mismo resultado tras N ejecuciones'],
      ['Dry-run', 'Simulación previa sin mutar estado'],
    ],
    aws: [
      'AWS --dry-run',
      'aws ec2 run-instances --dry-run ... || true',
      'Muchos comandos EC2 validan permisos con --dry-run',
    ],
    azure: [
      'az deployment group what-if',
      'az deployment group what-if -g rg -f main.bicep',
      'what-if previsualiza cambios ARM/Bicep',
    ],
    gcp: [
      'gcloud declarative',
      'gcloud deployment-manager deployments update --preview',
      'Comprobar existencia previa antes de crear',
    ],
    activity: 'Diseña paso check-or-create idempotente con flag --dry-run.',
  }),
  buildUnitSpec({
    code: '07.05',
    moduleId: 'cloud-cli',
    idx: 4,
    title: 'Auditoría de scripts sin secretos embebidos',
    objective:
      'Eliminar credenciales hardcodeadas, tokens en stdout y comandos destructivos sin confirmación.',
    mins: 25,
    prereqs: ['07.03'],
    mentalModel:
      'Nunca imprimas secretos en stdout ni pases contraseñas como argumentos visibles en ps/logs.',
    antipattern: 'Activar set -x mientras se manipulan tokens o variables con credenciales.',
    glossary: [
      ['Masking', 'Ocultar secretos en logs de CI'],
      ['ShellCheck', 'Linter estático para Bash'],
    ],
    aws: [
      'AWS CLI + ShellCheck',
      'shellcheck deploy.sh && aws sts get-caller-identity',
      'No exportar AWS_SECRET_ACCESS_KEY en scripts',
    ],
    azure: [
      'Azure CLI + OIDC',
      'az account get-access-token --query expiresOn',
      'Evitar az login -p con contraseña en historial',
    ],
    gcp: [
      'gcloud + Secret Manager',
      'gcloud secrets versions access latest --secret=db-url >/dev/null',
      'Consumir secreto en memoria sin escribir a disco',
    ],
    activity: 'Audita un script buscando fugas por set -x o claves planas.',
  }),
  buildUnitSpec({
    code: '08.01',
    moduleId: 'advanced-network',
    idx: 0,
    title: 'Diseño multi-VPC, peering y hubs de red',
    objective: 'Interconectar decenas de VPCs mediante arquitectura Hub-and-Spoke sin mallas N×N.',
    mins: 35,
    prereqs: ['02.02'],
    mentalModel:
      'El peering no es transitivo: para conectar decenas de redes usa un hub central (Transit Gateway / vWAN / NCC).',
    antipattern:
      'Crear peering todos-contra-todos (malla completa) imposible de mantener y auditar.',
    glossary: [
      ['Hub-and-Spoke', 'Topología centralizada de enrutamiento'],
      ['Non-transitive', 'A-B y B-C no conecta A-C'],
    ],
    aws: [
      'AWS Transit Gateway',
      'aws ec2 describe-transit-gateways',
      'TGW centraliza VPCs y VPN/Direct Connect',
    ],
    azure: [
      'Azure Virtual WAN / Hub',
      'az network vhub list -o table',
      'Hub VNet con Azure Firewall centralizado',
    ],
    gcp: [
      'Network Connectivity Center',
      'gcloud network-connectivity hubs list',
      'VPC en GCP ya es global entre regiones',
    ],
    activity: 'Calcula enlaces ahorrados entre 6 VPCs usando Hub vs malla peering.',
  }),
  buildUnitSpec({
    code: '08.02',
    moduleId: 'advanced-network',
    idx: 1,
    title: 'Private Endpoints y tráfico sin internet público',
    objective:
      'Acceder a Storage, BD y Secretos por red privada interna eliminando costos y riesgos de NAT.',
    mins: 35,
    prereqs: ['02.04'],
    mentalModel:
      'Los Private Endpoints proyectan servicios PaaS dentro de tu VPC con IP privada y DNS interno.',
    antipattern:
      'Enviar terabytes hacia S3/Blob atravesando un NAT Gateway público pagando $0.045/GB.',
    glossary: [
      ['PrivateLink / Private Endpoint', 'Acceso privado L4 dentro de VPC'],
      ['Gateway Endpoint', 'Ruta privada gratuita en tabla VPC'],
    ],
    aws: [
      'AWS PrivateLink & Gateway Endpoint',
      'aws ec2 describe-vpc-endpoints',
      'Gateway Endpoint para S3/DynamoDB es gratuito',
    ],
    azure: [
      'Azure Private Link',
      'az network private-endpoint list -o table',
      'Requiere Private DNS Zone vinculada',
    ],
    gcp: [
      'Private Service Connect',
      'gcloud compute forwarding-rules list',
      'Conecta servicios gestionados con IP interna VPC',
    ],
    activity: 'Verifica en Routing & Firewall Lab qué ocurre al desactivar Private Endpoint.',
  }),
  buildUnitSpec({
    code: '08.03',
    moduleId: 'advanced-network',
    idx: 2,
    title: 'Ingress, TLS mutuo y terminación segura',
    objective:
      'Terminar TLS moderno (TLS 1.2/1.3) en borde con certificados gestionados y cifrado extremo a extremo.',
    mins: 30,
    prereqs: ['03.04'],
    mentalModel:
      'La terminación TLS en borde protege al usuario; el re-cifrado interno (o mTLS) protege dentro de la red.',
    antipattern:
      'Usar certificados auto-firmados caducados o tráfico HTTP plano interno en cargas multi-tenant.',
    glossary: [
      ['mTLS', 'Autenticación mutua cliente-servidor por certificado'],
      ['HSTS', 'Forzar HTTPS en navegador'],
    ],
    aws: [
      'ACM + ALB TLS 1.3',
      'aws acm list-certificates',
      'ACM renueva certificados públicos automáticamente',
    ],
    azure: [
      'App Gateway + Key Vault Certs',
      'az network application-gateway ssl-cert list',
      'Soporta política TLS 1.3 estricta',
    ],
    gcp: [
      'Certificate Manager + LB',
      'gcloud certificate-manager certificates list',
      'Certificados gestionados multi-región en Anycast LB',
    ],
    activity: 'Define política de cifrado borde -> ingress -> pod.',
  }),
  buildUnitSpec({
    code: '08.04',
    moduleId: 'advanced-network',
    idx: 3,
    title: 'CDN, WAF y protección en borde',
    objective:
      'Absorber picos estáticos en caché de borde y mitigar OWASP Top 10 / DDoS antes del origen.',
    mins: 30,
    prereqs: ['08.03'],
    mentalModel:
      'Bloquear bots, SQLi y tráfico estático en el borde reduce carga de origen y egress.',
    antipattern: 'Exponer el Origin S3 o ALB directamente permitiendo saltarse el WAF/CDN.',
    glossary: [
      ['OAC', 'Origin Access Control para S3 privado'],
      ['WAF', 'Firewall de aplicaciones L7'],
    ],
    aws: [
      'CloudFront + AWS WAF',
      'aws wafv2 list-web-acls --scope CLOUDFRONT',
      'OAC impide acceso directo al bucket S3',
    ],
    azure: [
      'Azure Front Door + WAF',
      'az afd profile list -o table',
      'Private Link hacia origen evita IP pública',
    ],
    gcp: [
      'Cloud CDN + Cloud Armor',
      'gcloud compute security-policies list',
      'Cloud Armor filtra DDoS y reglas OWASP en borde',
    ],
    activity: 'Configura mentalmente OAC + WAF para bloquear acceso directo al origen.',
  }),
  buildUnitSpec({
    code: '08.05',
    moduleId: 'advanced-network',
    idx: 4,
    title: 'Diagnóstico de paquetes, timeouts y latencia',
    objective:
      'Aislar si un timeout tcp/5432 proviene de ruta, firewall, DNS o saturación de socket.',
    mins: 35,
    prereqs: ['02.03', '08.02'],
    mentalModel:
      'Timeout silencioso suele ser firewall/ruta drop; Connection Refused suele ser puerto cerrado en destino.',
    antipattern: 'Deshabilitar TLS o abrir 0.0.0.0/0 para "probar rápido" y dejarlo abierto.',
    glossary: [
      ['Timeout vs Refused', 'Paquete descartado vs puerto sin escucha'],
      ['Flow Logs', 'Telemetría ACCEPT/REJECT de red'],
    ],
    aws: [
      'VPC Flow Logs & Reachability',
      'aws ec2 describe-flow-logs',
      'Reachability Analyzer verifica ruta sin enviar tráfico',
    ],
    azure: [
      'Network Watcher',
      'az network watcher show-next-hop -g rg --vm app',
      'IP Flow Verify valida reglas NSG exactas',
    ],
    gcp: [
      'Connectivity Tests',
      'gcloud network-management connectivity-tests list',
      'Simula ruta y firewall sin paquetes reales',
    ],
    activity: 'Resuelve el bloqueo de NACL/SG en el Simulador Routing & Firewall 3D.',
  }),
  buildUnitSpec({
    code: '09.01',
    moduleId: 'serverless',
    idx: 0,
    title: 'Funciones FaaS y límites de ejecución',
    objective: 'Diseñar funciones stateless acotadas por timeout, memoria y concurrencia máxima.',
    mins: 30,
    prereqs: ['03.05'],
    mentalModel:
      'FaaS escala por petición, pero hereda cold starts y puede agotar conexiones de BD si no hay pool/límite.',
    antipattern:
      'Abrir una conexión PostgreSQL nueva en cada invocación sin RDS Proxy / pool externo.',
    glossary: [
      ['Cold start', 'Latencia de arranque de contenedor efímero'],
      ['Reserved concurrency', 'Techo máximo de instancias'],
    ],
    aws: [
      'AWS Lambda',
      'aws lambda list-functions --max-items 5',
      'Máximo 15 min por invocación; cobrar por GB-s',
    ],
    azure: [
      'Azure Functions',
      'az functionapp list -o table',
      'Consumption plan escala a cero; Flex para VNet',
    ],
    gcp: [
      'Cloud Run Functions',
      'gcloud functions list --v2',
      'Basado en Cloud Run sobre Knative/containers',
    ],
    activity: 'Calcula por qué 500 Lambdas concurrentes tumban un PostgreSQL sin proxy.',
  }),
  buildUnitSpec({
    code: '09.02',
    moduleId: 'serverless',
    idx: 1,
    title: 'API Gateways, throttling y contratos',
    objective:
      'Proteger backends con rate limiting, validación de schema y autenticación JWT/OIDC en borde.',
    mins: 30,
    prereqs: ['08.03', '09.01'],
    mentalModel:
      'El API Gateway rechaza tráfico malformado o abusivo antes de consumir cómputo ni base de datos.',
    antipattern:
      'Pasar payloads ilimitados sin throttling exponiendo la API a agotamiento de presupuesto.',
    glossary: [
      ['Throttling', 'Límite de peticiones por segundo/cliente'],
      ['JWT Authorizer', 'Validación criptográfica en borde'],
    ],
    aws: [
      'Amazon API Gateway',
      'aws apigatewayv2 get-apis',
      'HTTP API ofrece menor latencia y costo que REST API',
    ],
    azure: [
      'Azure API Management',
      'az apim list -o table',
      'Políticas XML para rate-limit y JWT validation',
    ],
    gcp: [
      'Apigee / API Gateway',
      'gcloud api-gateway apis list',
      'OpenAPI spec define contratos y cuotas',
    ],
    activity: 'Define límites de burst, rate y tamaño máximo de payload.',
  }),
  buildUnitSpec({
    code: '09.03',
    moduleId: 'serverless',
    idx: 2,
    title: 'Colas, tópicos y desacoplamiento por eventos',
    objective:
      'Separar productores de consumidores lentos usando colas punto a punto y pub/sub fan-out.',
    mins: 30,
    prereqs: ['09.01'],
    mentalModel:
      'Las colas suavizan picos de tráfico (load leveling) y permiten reintentar sin bloquear al usuario.',
    antipattern:
      'Encadenar 8 llamadas HTTP síncronas cuando el paso puede procesarse asíncronamente.',
    glossary: [
      ['Queue vs Topic', 'Un consumidor (SQS) vs N suscriptores (SNS)'],
      ['Backpressure', 'Absorber exceso en cola'],
    ],
    aws: [
      'Amazon SQS + SNS',
      'aws sqs list-queues',
      'Visibility timeout debe superar tiempo máximo de proceso',
    ],
    azure: [
      'Azure Service Bus',
      'az servicebus namespace list -o table',
      'Soporta sesiones ordenadas y transacciones',
    ],
    gcp: ['Cloud Pub/Sub', 'gcloud pubsub topics list', 'Entrega push o pull con ack deadline'],
    activity: 'Diseña flujo Pedido -> Outbox -> Cola -> Facturación.',
  }),
  buildUnitSpec({
    code: '09.04',
    moduleId: 'serverless',
    idx: 3,
    title: 'Idempotencia, reintentos y Dead Letter Queues',
    objective:
      'Evitar cobros o efectos duplicados en entregas at-least-once y aislar poison messages en DLQ.',
    mins: 35,
    prereqs: ['09.03'],
    mentalModel:
      'Toda cola cloud entrega al menos una vez (at-least-once): la idempotencia del consumidor es obligatoria.',
    antipattern:
      'Desactivar reintentos o procesar pagos sin clave única idempotency_key (caso S14).',
    glossary: [
      ['Idempotency key', 'Clave única de negocio deduplicada en BD'],
      ['DLQ', 'Cola de mensajes fallidos tras N reintentos'],
    ],
    aws: [
      'SQS DLQ + DynamoDB/PG Lock',
      'aws sqs get-queue-attributes --attribute-names RedrivePolicy',
      'Redrive de DLQ tras corregir el bug',
    ],
    azure: [
      'Service Bus DLQ',
      'az servicebus queue show -n q --namespace-name ns',
      'Subcola /$DeadLetterQueue integrada',
    ],
    gcp: [
      'Pub/Sub Dead Letter Topic',
      'gcloud pubsub subscriptions describe sub',
      'max-delivery-attempts entre 5 y 100',
    ],
    activity: 'Valida en Messaging & DLQ Lab cómo Idempotency + Outbox eliminan duplicados.',
  }),
  buildUnitSpec({
    code: '09.05',
    moduleId: 'serverless',
    idx: 4,
    title: 'Observabilidad en arquitecturas serverless',
    objective:
      'Correlacionar trazas distribuidas entre API Gateway, colas y workers mediante traceparent.',
    mins: 25,
    prereqs: ['09.04'],
    mentalModel:
      'Sin propagation de trace_id entre productor y cola, depurar un fallo asíncrono es imposible.',
    antipattern:
      'Loguear payloads PII completos o crear millones de métricas por user_id (alta cardinalidad).',
    glossary: [
      ['W3C traceparent', 'Header estándar de traza distribuida'],
      ['Structured logging', 'JSON con traceId y severity'],
    ],
    aws: [
      'AWS X-Ray / OTel',
      'aws xray get-trace-summaries --start-time ... --end-time ...',
      'X-Ray propaga contexto automáticamente en SQS/Lambda',
    ],
    azure: [
      'Application Insights',
      'az monitor app-insights component show',
      'Correlación automática en Service Bus',
    ],
    gcp: [
      'Cloud Trace',
      'gcloud logging read "trace:*" --limit=5',
      'Cloud Logging enlaza logs con Cloud Trace',
    ],
    activity: 'Inspecciona en Observability Lab cómo afecta traceparent al diagnóstico.',
  }),
]);
