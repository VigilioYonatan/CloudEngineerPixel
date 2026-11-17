import type { UnitContentSpec } from '../../../domain/curriculum';
import { buildUnitSpec } from '../unitBuilder';

export const m10To12Specs: Record<string, UnitContentSpec> = Object.fromEntries([
  buildUnitSpec({
    code: '10.01',
    moduleId: 'containers',
    idx: 0,
    title: 'Dockerfiles seguros, multi-stage y capas',
    objective:
      'Construir imágenes mínimas Distroless non-root sin secretos en capas ni tag :latest.',
    mins: 35,
    prereqs: ['03.02'],
    mentalModel:
      'Multi-stage separa herramientas de compilación del runtime Distroless non-root (UID 65532).',
    antipattern: 'Correr como root con FROM node:latest y copiar .env dentro de la imagen.',
    glossary: [
      ['Multi-stage build', 'Compilar en etapa 1, copiar binario a runtime mínimo'],
      ['Distroless', 'Imagen sin shell ni gestores de paquetes'],
    ],
    aws: [
      'Amazon ECR + Scan',
      'aws ecr describe-repositories',
      'Fijar digest SHA256 y activar scan on push',
    ],
    azure: [
      'Azure Container Registry',
      'az acr repository list -n myacr',
      'ACR Tasks permite builds sin Docker local',
    ],
    gcp: [
      'Artifact Registry',
      'gcloud artifacts repositories list',
      'Binary Authorization valida firma de imagen',
    ],
    activity: 'Revisa un Dockerfile aplicando multi-stage, USER 65532 y digest pin.',
  }),
  buildUnitSpec({
    code: '10.02',
    moduleId: 'containers',
    idx: 1,
    title: 'Arquitectura de Kubernetes: nodos, pods y servicios',
    objective:
      'Entender el plano de control, kubelet, Pods efímeros y descubrimiento por Service/DNS.',
    mins: 35,
    prereqs: ['10.01'],
    mentalModel:
      'Un Pod es efímero; un Deployment gestiona réplicas y un Service ofrece IP/DNS estable.',
    antipattern:
      'Exponer Pods con NodePort público o guardar estado crítico dentro del filesystem del contenedor.',
    glossary: [
      ['Control Plane', 'API Server, etcd, Scheduler, Controller Manager'],
      ['Service', 'Abstracción DNS/IP sobre Pods'],
    ],
    aws: [
      'Amazon EKS',
      'aws eks describe-cluster --name prod',
      'EKS gestiona el control plane; EKS Pod Identity para IAM',
    ],
    azure: [
      'Azure Kubernetes Service',
      'az aks list -o table',
      'Soporta Workload Identity con Entra ID',
    ],
    gcp: [
      'Google Kubernetes Engine',
      'gcloud container clusters list',
      'GKE Autopilot gestiona nodos y seguridad base',
    ],
    activity: 'Traza qué ocurre desde kubectl apply hasta que el Pod recibe tráfico.',
  }),
  buildUnitSpec({
    code: '10.03',
    moduleId: 'containers',
    idx: 2,
    title: 'Deployments, probes y límites de recursos',
    objective:
      'Configurar requests/limits, startup/readiness/liveness probes y PodDisruptionBudget.',
    mins: 35,
    prereqs: ['10.02'],
    mentalModel:
      'Sin requests el Scheduler satura nodos; sin memory limit=request ocurren OOMKills sorpresa.',
    antipattern:
      'Desactivar readinessProbe o usar livenessProbe apuntando a BD externa provocando reinicios en cascada.',
    glossary: [
      ['OOMKilled', 'Terminación Exit 137 por superar limit RAM'],
      ['PDB', 'Mínimo de pods disponibles en mantenimientos'],
    ],
    aws: [
      'EKS + Karpenter',
      'kubectl get pods -A --field-selector=status.phase!=Running',
      'Karpenter aprovisiona nodos según Pods Pending',
    ],
    azure: [
      'AKS + Cluster Autoscaler',
      'kubectl describe pod app | tail -n 20',
      'KEDA escala workers por cola Service Bus',
    ],
    gcp: [
      'GKE + Autopilot',
      'kubectl top pods -n prod',
      'VerticalPodAutoscaler sugiere requests reales',
    ],
    activity: 'Simula Pending, OOMKilled y CrashLoopBackOff en K8s Scheduler Lab.',
  }),
  buildUnitSpec({
    code: '10.04',
    moduleId: 'containers',
    idx: 3,
    title: 'Configuración, secretos y almacenamiento en K8s',
    objective:
      'Inyectar configuración no sensible vía ConfigMap y secretos desde KMS/Secrets Manager sin etcd plano.',
    mins: 30,
    prereqs: ['05.03', '10.02'],
    mentalModel:
      'Los Secrets nativos de K8s están en base64 (no cifrados por defecto): sincroniza desde gestor cloud externo.',
    antipattern:
      'Commitear Secrets YAML en Git o usar reclaimPolicy: Delete en PersistentVolumes productivos.',
    glossary: [
      ['External Secrets', 'Sincronización segura desde KMS/Vault'],
      ['reclaimPolicy: Retain', 'Protege disco EBS tras borrar PVC'],
    ],
    aws: [
      'EKS + Secrets Store CSI',
      'kubectl get pdb,pvc -n prod',
      'Cifrar etcd con KMS y usar EBS CSI Retain',
    ],
    azure: [
      'AKS + Key Vault CSI',
      'az aks addon list -n aks -g rg',
      'Azure Key Vault Provider for Secrets Store CSI',
    ],
    gcp: [
      'GKE + Secret Manager CSI',
      'kubectl get storageclass',
      'Usar Workload Identity para leer Secret Manager',
    ],
    activity: 'Audita manifiestos detectando Secrets en Git o reclaimPolicy: Delete.',
  }),
  buildUnitSpec({
    code: '10.05',
    moduleId: 'containers',
    idx: 4,
    title: 'Troubleshooting de CrashLoopBackOff y redes',
    objective: 'Diagnosticar pods degradados leyendo events, logs --previous y NetworkPolicies.',
    mins: 30,
    prereqs: ['10.03'],
    mentalModel:
      'kubectl describe + logs --previous revelan el motivo real antes de tocar réplicas.',
    antipattern:
      'Escalar réplicas a 100 cuando los pods están en CrashLoopBackOff (empeora la caída).',
    glossary: [
      ['CrashLoopBackOff', 'Espera exponencial tras fallos repetidos'],
      ['NetworkPolicy', 'Firewall L3/L4 entre Pods'],
    ],
    aws: [
      'EKS + Cilium / VPC CNI',
      'kubectl logs deploy/api --previous --tail=50',
      'VPC CNI asigna IPs reales de subred VPC',
    ],
    azure: [
      'AKS + Azure CNI / Cilium',
      'kubectl get events --sort-by=.lastTimestamp',
      'Cilium eBPF aplica NetworkPolicies eficientes',
    ],
    gcp: [
      'GKE + Dataplane V2',
      'kubectl describe pod -l app=api',
      'Dataplane V2 usa Cilium eBPF integrado',
    ],
    activity: 'Resuelve el caso Senior S07 (CrashLoopBackOff) aplicando el flujo.',
  }),
  buildUnitSpec({
    code: '11.01',
    moduleId: 'iac',
    idx: 0,
    title: 'Fundamentos declarativos y modelo de Terraform',
    objective: 'Diferenciar código declarativo deseado (.tf) de estado observado (.tfstate).',
    mins: 30,
    prereqs: ['01.05'],
    mentalModel: 'Terraform calcula el diff comparando código HCL, estado remoto y API cloud real.',
    antipattern:
      'Tratar Terraform como script imperativo en lugar de grafo declarativo de dependencias.',
    glossary: [
      ['HCL', 'HashiCorp Configuration Language'],
      ['DAG', 'Grafo acíclico dirigido de recursos'],
    ],
    aws: [
      'Terraform AWS Provider',
      'terraform fmt -check && terraform validate',
      'Usar default_tags en el bloque provider',
    ],
    azure: [
      'Terraform azurerm Provider',
      'terraform validate',
      'Declarar features {} y subscription_id explícito',
    ],
    gcp: [
      'Terraform google Provider',
      'terraform validate',
      'Fijar project y region por defecto en provider',
    ],
    activity: 'Escribe un bloque terraform { required_version } y provider mínimo.',
  }),
  buildUnitSpec({
    code: '11.02',
    moduleId: 'iac',
    idx: 1,
    title: 'Estado remoto, locking y trabajo en equipo',
    objective:
      'Proteger el state en almacenamiento cifrado con versionado y bloqueo concurrente (use_lockfile).',
    mins: 35,
    prereqs: ['11.01'],
    mentalModel: 'Sin state locking remoto dos applies simultáneos corrompen la infraestructura.',
    antipattern:
      'Commitear terraform.tfstate en Git (expone secretos) o usar force-unlock a ciegas.',
    glossary: [
      ['State locking', 'Bloqueo exclusivo durante apply'],
      ['use_lockfile = true', 'Lock nativo S3 en Terraform >=1.10'],
    ],
    aws: [
      'S3 Backend + use_lockfile',
      'terraform init -backend-config=prod.tfbackend',
      'S3 cifrado KMS + versionado + use_lockfile=true',
    ],
    azure: [
      'Azure Blob Backend',
      'az storage container list --account-name tfstate',
      'Blob Storage soporta lease locking nativo',
    ],
    gcp: [
      'GCS Backend',
      'gcloud storage buckets describe gs://tf-state',
      'GCS soporta object versioning y lock nativo',
    ],
    activity: 'Inspecciona el escenario state-lock-conflict en Terraform Plan Lab.',
  }),
  buildUnitSpec({
    code: '11.03',
    moduleId: 'iac',
    idx: 2,
    title: 'Módulos reutilizables y separación de entornos',
    objective:
      'Estructurar módulos versionados y separar states por entorno y capa (red vs datos vs app).',
    mins: 30,
    prereqs: ['11.02'],
    mentalModel:
      'Separar states por capa reduce el blast radius: un error en app nunca toca el state de VPC o BD.',
    antipattern: 'Un solo state monolítico para toda la empresa con cientos de recursos acoplados.',
    glossary: [
      ['Blast radius IaC', 'Recursos afectados por un apply fallido'],
      ['moved block', 'Refactor sin destruir recurso'],
    ],
    aws: [
      'Stacks separados AWS',
      'terraform plan -out=tfplan',
      'Separar network.tfstate, data.tfstate y compute.tfstate',
    ],
    azure: [
      'Stacks por Resource Group',
      'terraform show -no-color tfplan',
      'Aislar estado de hub de red de cargas',
    ],
    gcp: [
      'Stacks por Proyecto GCP',
      'terraform plan -lock-timeout=60s',
      'Aislar proyecto Shared VPC de proyectos de app',
    ],
    activity: 'Divide un monolito .tf en 3 capas con dependencias de solo lectura.',
  }),
  buildUnitSpec({
    code: '11.04',
    moduleId: 'iac',
    idx: 3,
    title: 'Detección de drift y cambios destructivos',
    objective:
      'Detectar modificaciones manuales (-detailed-exitcode) y bloquear ForceNew destructivos en CI.',
    mins: 35,
    prereqs: ['11.03'],
    mentalModel:
      'Antes de aprobar un plan, busca cada "-/+" (destroy and recreate) y activa prevent_destroy en BD.',
    antipattern: 'Ejecutar terraform apply -auto-approve en producción sin revisar ForceNew.',
    glossary: [
      ['ForceNew', 'Atributo que obliga a destruir y recrear'],
      ['Drift', 'Cambio manual fuera de Git'],
    ],
    aws: [
      'Plan & Prevent Destroy',
      'terraform plan -detailed-exitcode',
      'lifecycle { prevent_destroy = true } en RDS',
    ],
    azure: [
      'Drift en AzureRM',
      'terraform plan -refresh-only',
      'refresh-only sincroniza drift aprobado sin destruir',
    ],
    gcp: [
      'Drift en GCP',
      'terraform plan -detailed-exitcode',
      'Exit code 2 indica drift detectado en cron',
    ],
    activity: 'Analiza destroy-recreate-db y out-of-band-drift en Terraform Plan Lab.',
  }),
  buildUnitSpec({
    code: '11.05',
    moduleId: 'iac',
    idx: 4,
    title: 'Seguridad IaC y revisión de planes en PR',
    objective:
      'Integrar tfsec/Checkov/Trivy en PRs y exigir aprobación humana antes del apply productivo.',
    mins: 30,
    prereqs: ['11.04'],
    mentalModel:
      'Los scanners estáticos bloquean 0.0.0.0/0 y discos sin cifrar antes de tocar ninguna nube.',
    antipattern:
      'Saltarse checks de seguridad en PR o aplicar desde laptops sin pipeline auditado.',
    glossary: [
      ['Policy as Code', 'Validación automática OPA/Checkov'],
      ['Plan artifact', 'Plan guardado e inmutable del PR'],
    ],
    aws: ['Checkov + Infracost', 'trivy config ./infra', 'Evaluar costo estimado en cada PR'],
    azure: [
      'PSRuler + Checkov',
      'checkov -d ./infra --framework terraform',
      'Validar TLS y Private Endpoints obligatorios',
    ],
    gcp: [
      'Policy Validation',
      'gcloud beta terraform vet tfplan.json --policy-library=.',
      'Validar contra Org Policies antes de apply',
    ],
    activity: 'Usa CodeReviewLab de Senior S01 para detectar ForceNew e IAM *.',
  }),
  buildUnitSpec({
    code: '12.01',
    moduleId: 'observability',
    idx: 0,
    title: 'Pipelines CI/CD seguros con OIDC',
    objective:
      'Configurar GitHub Actions con permisos mínimos, digest pinning y federación OIDC sin claves.',
    mins: 35,
    prereqs: ['05.02', '11.05'],
    mentalModel:
      'El pipeline CI construye artefactos firmados; el despliegue usa tokens OIDC efímeros por entorno.',
    antipattern:
      'Guardar AWS_ACCESS_KEY_ID en GitHub Secrets y usar actions/checkout sin SHA commit pin.',
    glossary: [
      ['OIDC Federation', 'Autenticación sin secretos estáticos'],
      ['Action SHA Pin', 'Fijar versión por hash inmutable'],
    ],
    aws: [
      'GitHub OIDC -> AWS STS',
      'aws iam get-open-id-connect-provider --open-id-connect-provider-arn arn',
      'Restringir sub claim a repo y rama main',
    ],
    azure: [
      'GitHub OIDC -> Entra ID',
      'az ad app federated-credential list --id appId',
      'Federated Credential por entorno prod/staging',
    ],
    gcp: [
      'GitHub OIDC -> Workload Identity',
      'gcloud iam workload-identity-pools providers list --workload-identity-pool=gh',
      'Condition attribute.repository restringe acceso',
    ],
    activity: 'Audita un workflow YAML en Senior S15 detectando :latest y claves planas.',
  }),
  buildUnitSpec({
    code: '12.02',
    moduleId: 'observability',
    idx: 1,
    title: 'Despliegues progresivos: canary y blue-green',
    objective:
      'Reducir blast radius de releases exponiendo 5%->25%->100% con rollback automático ante 5xx.',
    mins: 30,
    prereqs: ['06.04', '12.01'],
    mentalModel:
      'Canary detecta regresiones en 5% del tráfico antes de afectar al 100% de los usuarios.',
    antipattern: 'Desplegar big-bang al 100% y esperar que los clientes reporten el 503.',
    glossary: [
      ['Canary', 'Tráfico incremental con análisis métrico'],
      ['Blue-Green', 'Dos entornos idénticos con switch rápido'],
    ],
    aws: [
      'CodeDeploy / Argo Rollouts',
      'aws deploy list-deployments',
      'Alarma CloudWatch dispara rollback automático',
    ],
    azure: [
      'App Service Slots / Container Apps',
      'az webapp deployment slot list -n app -g rg',
      'Slot swap con warm-up previo',
    ],
    gcp: [
      'Cloud Run Traffic Split',
      'gcloud run services update-traffic app --to-revisions=v2=10,v1=90',
      'Ajuste porcentual instantáneo en segundos',
    ],
    activity: 'Define puertas de promoción canary (tasa 5xx < 0.5%, p99 < 400ms).',
  }),
  buildUnitSpec({
    code: '12.03',
    moduleId: 'observability',
    idx: 2,
    title: 'Logs estructurados, métricas y trazas',
    objective:
      'Unificar los tres pilares (JSON logs + métricas RED + OpenTelemetry traceparent) sin PII.',
    mins: 30,
    prereqs: ['09.05'],
    mentalModel:
      'Métricas detectan el síntoma, trazas ubican el salto lento, logs explican el detalle.',
    antipattern: 'Loguear tokens JWT, emails o usar IDs de usuario como labels Prometheus.',
    glossary: [
      ['RED Method', 'Rate, Errors, Duration'],
      ['High cardinality', 'Explosión de series temporales por ID único'],
    ],
    aws: [
      'CloudWatch + OTel',
      'aws logs describe-log-groups',
      'Fijar retención explícita para evitar costos infinitos',
    ],
    azure: [
      'Azure Monitor + Log Analytics',
      'az monitor log-analytics workspace list',
      'KQL para cruzar trazas y excepciones',
    ],
    gcp: [
      'Cloud Operations Suite',
      'gcloud logging read "severity>=ERROR" --limit=10',
      'Cloud Trace + Cloud Monitoring integrados',
    ],
    activity: 'Diseña esquema de log JSON seguro excluyendo PII y secretos.',
  }),
  buildUnitSpec({
    code: '12.04',
    moduleId: 'observability',
    idx: 3,
    title: 'SLI, SLO y alertas accionables',
    objective:
      'Configurar alertas multi-window burn-rate enfocadas en el usuario y no en CPU aislada.',
    mins: 35,
    prereqs: ['12.03'],
    mentalModel:
      'Una alerta solo debe despertar al guardia si el presupuesto de error del usuario corre riesgo real.',
    antipattern: 'Configurar 50 alertas por CPU > 80% generando fatiga de alertas.',
    glossary: [
      ['Burn rate', 'Velocidad de consumo del error budget'],
      ['Alert fatigue', 'Ignorar alertas por exceso de ruido'],
    ],
    aws: [
      'CloudWatch SLO / Prometheus',
      'aws cloudwatch describe-alarms --state-value ALARM',
      'Cada alarma enlaza a su runbook',
    ],
    azure: [
      'Azure Monitor Alerts',
      'az monitor metrics alert list',
      'Action Groups enrutan por severidad',
    ],
    gcp: [
      'Cloud Monitoring SLOs',
      'gcloud alpha monitoring slos list --service=app',
      'Soporte nativo de burn-rate alerts',
    ],
    activity: 'Prueba en Observability Lab por qué CPU 88% con SLI sano no pagina.',
  }),
  buildUnitSpec({
    code: '12.05',
    moduleId: 'observability',
    idx: 4,
    title: 'Runbooks y respuesta inicial a incidentes',
    objective:
      'Ejecutar contención reversible guiada por runbook y registrar postmortem sin culpa.',
    mins: 30,
    prereqs: ['12.04'],
    mentalModel:
      'En incidente: primero contén el impacto al usuario, preserva evidencia y luego busca causa raíz.',
    antipattern:
      'Improvisar cambios destructivos en producción sin runbook ni registro de postmortem.',
    glossary: [
      ['Blameless postmortem', 'Foco en fallos de sistema, no culpas'],
      ['MTTR', 'Tiempo medio de recuperación'],
    ],
    aws: [
      'SSM Incident Manager',
      'aws ssm list-documents --filters Key=Owner,Values=Self',
      'Runbooks versionados en Git',
    ],
    azure: [
      'Azure Monitor Runbooks',
      'az automation runbook list -g rg --automation-account-name aa',
      'Validar RBAC de automatización',
    ],
    gcp: [
      'Cloud Monitoring + Runbooks',
      'gcloud monitoring policies list',
      'Documentar rollback paso a paso en Markdown',
    ],
    activity: 'Completa un caso Senior hasta exportar Postmortem / ADR (.md).',
  }),
]);
