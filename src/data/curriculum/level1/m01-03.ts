import type { UnitContentSpec } from '../../../domain/curriculum';
import { buildUnitSpec } from '../unitBuilder';

export const m01To03Specs: Record<string, UnitContentSpec> = Object.fromEntries([
  buildUnitSpec({
    code: '01.01',
    moduleId: 'cloud-fundamentals',
    idx: 0,
    title: 'Modelos IaaS, PaaS y SaaS',
    objective: 'Clasificar qué capas administra el proveedor y cuáles el equipo de ingeniería.',
    mins: 25,
    prereqs: [],
    mentalModel:
      'A mayor abstracción (IaaS -> PaaS -> SaaS) menos parches de SO, pero menor control de kernel/red.',
    antipattern:
      'Elegir IaaS con VMs manuales cuando un runtime PaaS cubre los requisitos sin equipo de sistemas.',
    glossary: [
      ['IaaS', 'Cómputo/red virtualizada'],
      ['PaaS', 'Runtime administrado sin parches de SO'],
    ],
    aws: [
      'EC2 / Elastic Beanstalk',
      'aws ec2 describe-instances --max-items 5',
      'Beanstalk gestiona plataforma; EC2 exige parches propios',
    ],
    azure: [
      'Azure VM / App Service',
      'az webapp list --output table',
      'App Service abstrae SO e IIS/Kestrel',
    ],
    gcp: [
      'Compute Engine / App Engine',
      'gcloud app versions list',
      'App Engine escala a cero en estándar',
    ],
    activity:
      'Clasifica 3 componentes de un e-commerce en IaaS/PaaS/SaaS justificando quién parchea el SO.',
  }),
  buildUnitSpec({
    code: '01.02',
    moduleId: 'cloud-fundamentals',
    idx: 1,
    title: 'Regiones, zonas y responsabilidad compartida',
    objective:
      'Separar soberanía de datos (Región) de aislamiento físico (Zona de Disponibilidad).',
    mins: 25,
    prereqs: ['01.01'],
    mentalModel:
      'Una Región define jurisdicción y latencia; múltiples AZs absorben fallos de energía o red local.',
    antipattern:
      'Desplegar todas las réplicas en una sola AZ asumiendo que "estar en la nube" garantiza alta disponibilidad.',
    glossary: [
      ['AZ', 'Datacenter aislado en una región'],
      ['Responsabilidad compartida', 'El cliente siempre protege datos e IAM'],
    ],
    aws: [
      'AWS Regions & AZs',
      'aws ec2 describe-availability-zones',
      'Las AZs se mapean aleatoriamente por cuenta',
    ],
    azure: [
      'Azure Regions & Zones',
      'az account list-locations -o table',
      'No todas las regiones soportan 3 Availability Zones',
    ],
    gcp: [
      'GCP Regions & Zones',
      'gcloud compute zones list',
      'Las VPC en GCP son globales; las subredes son regionales',
    ],
    activity:
      'Mapea qué falla si cae una AZ vs una Región completa y quién responde por el cifrado.',
  }),
  buildUnitSpec({
    code: '01.03',
    moduleId: 'cloud-fundamentals',
    idx: 2,
    title: 'Alta disponibilidad y escalabilidad',
    objective:
      'Diferenciar disponibilidad (uptime ante fallos) de escalabilidad (absorber carga creciente).',
    mins: 30,
    prereqs: ['01.02'],
    mentalModel:
      'Un sistema puede escalar a 50 réplicas y seguir teniendo SPOF si comparte una sola BD sin réplica.',
    antipattern:
      'Subir tamaño vertical de VM (scale-up) esperando evitar caídas durante mantenimientos.',
    glossary: [
      ['SPOF', 'Punto único de fallo'],
      ['Scale-out', 'Añadir réplicas stateless horizontales'],
    ],
    aws: [
      'Auto Scaling + Multi-AZ',
      'aws autoscaling describe-auto-scaling-groups',
      'Multi-AZ síncrono en RDS para HA',
    ],
    azure: [
      'VMSS + Zone Redundant',
      'az vmss list -o table',
      'Zone-redundant balancea entre 3 zonas',
    ],
    gcp: [
      'Managed Instance Groups',
      'gcloud compute instance-groups managed list',
      'MIG regional distribuye entre zonas',
    ],
    activity:
      'Identifica 2 SPOFs en una arquitectura web monolítica y propón eliminación sin downtime.',
  }),
  buildUnitSpec({
    code: '01.04',
    moduleId: 'cloud-fundamentals',
    idx: 3,
    title: 'Organización por cuentas, suscripciones y proyectos',
    objective: 'Aislar entornos dev/staging/prod con fronteras administrativas y de facturación.',
    mins: 25,
    prereqs: ['01.02'],
    mentalModel:
      'La frontera de cuenta/suscripción/proyecto limita el radio de explosión IAM y separa presupuestos.',
    antipattern:
      'Mezclar dev y prod dentro de la misma cuenta/proyecto separados solo por prefijos de nombre.',
    glossary: [
      ['Blast radius', 'Alcance máximo de un fallo o brecha'],
      ['Guardrail', 'Política preventiva de organización'],
    ],
    aws: [
      'AWS Organizations',
      'aws organizations list-accounts',
      'SCP aplica techo máximo a cuentas miembro',
    ],
    azure: [
      'Management Groups & Subscriptions',
      'az account subscription list',
      'Azure Policy hereda por Management Group',
    ],
    gcp: [
      'Folders & Projects',
      'gcloud projects list',
      'Org Policies restringen servicios por Folder/Project',
    ],
    activity: 'Dibuja un árbol de 3 entornos (sandbox, staging, prod) con límites de presupuesto.',
  }),
  buildUnitSpec({
    code: '01.05',
    moduleId: 'cloud-fundamentals',
    idx: 4,
    title: 'Lectura de consola, CLI y APIs',
    objective:
      'Comprender que Consola, CLI y Terraform invocan exactamente la misma API REST autenticada.',
    mins: 20,
    prereqs: ['01.04'],
    mentalModel:
      'Todo clic en consola se traduce a una llamada API auditada; la CLI automatiza y deja trazabilidad.',
    antipattern: 'Hacer cambios manuales en consola productiva sin registrar en IaC ni auditoría.',
    glossary: [
      ['Control Plane', 'API de creación/gestión de recursos'],
      ['Data Plane', 'Tráfico operativo de la app'],
    ],
    aws: [
      'AWS CloudTrail + CLI',
      'aws sts get-caller-identity',
      'sts get-caller-identity verifica rol activo',
    ],
    azure: [
      'Azure Activity Log + CLI',
      'az account show',
      'ARM (Azure Resource Manager) unifica todas las APIs',
    ],
    gcp: [
      'Cloud Audit Logs + gcloud',
      'gcloud auth list',
      'Cloud Resource Manager valida permisos por proyecto',
    ],
    activity: 'Ejecuta en modo lectura el comando de identidad activa en tu nube elegida.',
  }),
  buildUnitSpec({
    code: '02.01',
    moduleId: 'networks',
    idx: 0,
    title: 'CIDR, subredes y cálculo de IPs',
    objective: 'Calcular máscaras /16, /24, /28 descontando IPs reservadas reales del proveedor.',
    mins: 35,
    prereqs: ['01.02'],
    mentalModel:
      'Planificar CIDRs sin solapamiento evita bloqueos imposibles al conectar VPCs por peering.',
    antipattern:
      'Usar 10.0.0.0/16 en todas las cuentas dev y prod, impidiendo peering o VPN futuro.',
    glossary: [
      ['CIDR', 'Notación de prefijo de red IPv4'],
      ['Overlapping', 'Solapamiento de rangos IP'],
    ],
    aws: [
      'Amazon VPC Subnets',
      'aws ec2 describe-subnets --query "Subnets[].CidrBlock"',
      'AWS reserva 5 IPs por subred',
    ],
    azure: [
      'Azure VNet Subnets',
      'az network vnet subnet list -g rg --vnet-name vnet',
      'Azure reserva 5 IPs por subred',
    ],
    gcp: [
      'GCP VPC Subnets',
      'gcloud compute networks subnets list',
      'GCP reserva 4 IPs por subred',
    ],
    activity:
      'Divide 10.20.0.0/16 en 3 subredes (/24) calculando IPs utilizables en el Simulador CIDR.',
  }),
  buildUnitSpec({
    code: '02.02',
    moduleId: 'networks',
    idx: 1,
    title: 'Subredes públicas, privadas y tablas de rutas',
    objective: 'Distinguir una subred pública (ruta IGW) de una privada (ruta NAT/local).',
    mins: 30,
    prereqs: ['02.01'],
    mentalModel:
      'Una subred es pública únicamente si su tabla de rutas apunta 0.0.0.0/0 hacia un Internet Gateway.',
    antipattern:
      'Colocar servidores de aplicación o bases de datos en subred pública solo para descargar paquetes.',
    glossary: [
      ['IGW', 'Internet Gateway bidireccional'],
      ['NAT Gateway', 'Salida controlada sin entrada desde Internet'],
    ],
    aws: [
      'VPC Route Tables',
      'aws ec2 describe-route-tables',
      'NAT Gateway cobra por hora + GB procesado',
    ],
    azure: [
      'UDR & Azure NAT Gateway',
      'az network route-table list',
      'Salida por defecto sin NAT cambia en VNets nuevas',
    ],
    gcp: [
      'Cloud Router + Cloud NAT',
      'gcloud compute routers nats list --router=r1',
      'Cloud NAT opera sin IPs externas en VMs',
    ],
    activity: 'Traza el paquete de salida de una VM privada actualizando paquetes vía NAT.',
  }),
  buildUnitSpec({
    code: '02.03',
    moduleId: 'networks',
    idx: 2,
    title: 'Security Groups, NACL y firewalls cloud',
    objective: 'Diferenciar reglas stateful (SG/NSG) de reglas stateless (NACL).',
    mins: 30,
    prereqs: ['02.02'],
    mentalModel:
      'Stateful recuerda la conexión de retorno; stateless exige abrir explícitamente puertos efímeros.',
    antipattern: 'Abrir 0.0.0.0/0 en puertos administrativos (22/3389) o base de datos (5432).',
    glossary: [
      ['Stateful', 'Retorno permitido automáticamente'],
      ['Ephemeral ports', 'Rango 1024-65535 de respuesta'],
    ],
    aws: [
      'Security Groups & NACLs',
      'aws ec2 describe-security-groups',
      'SG solo soporta Allow; NACL soporta Allow/Deny',
    ],
    azure: [
      'NSG (Network Security Group)',
      'az network nsg list',
      'NSG usa prioridades numéricas 100-4096',
    ],
    gcp: [
      'VPC Firewall Rules',
      'gcloud compute firewall-rules list',
      'Reglas globales por target-tags o service-account',
    ],
    activity: 'Valida en Routing & Firewall Lab qué ocurre si una NACL bloquea puertos efímeros.',
  }),
  buildUnitSpec({
    code: '02.04',
    moduleId: 'networks',
    idx: 3,
    title: 'DNS cloud y resolución privada',
    objective: 'Resolver nombres internos hacia IPs privadas sin salir a Internet.',
    mins: 25,
    prereqs: ['02.02'],
    mentalModel:
      'DNS privado desacopla IPs efímeras de los clientes mediante registros internos versionados.',
    antipattern: 'Hardcodear IPs privadas en variables de entorno o archivos de configuración.',
    glossary: [
      ['Split-horizon DNS', 'Resolución distinta interna vs pública'],
      ['TTL', 'Tiempo de caché de respuesta DNS'],
    ],
    aws: [
      'Route 53 Private Hosted Zone',
      'aws route53 list-hosted-zones',
      'VPC requiere enableDnsHostnames=true',
    ],
    azure: [
      'Azure Private DNS Zone',
      'az network private-dns zone list',
      'Requiere Virtual Network Link explícito',
    ],
    gcp: [
      'Cloud DNS Private Zone',
      'gcloud dns managed-zones list',
      'Asociada a redes VPC autorizadas',
    ],
    activity: 'Diseña esquema split-horizon para api.interna.corp evitando IPs estáticas.',
  }),
  buildUnitSpec({
    code: '02.05',
    moduleId: 'networks',
    idx: 4,
    title: 'Acceso remoto seguro sin exponer SSH',
    objective:
      'Reemplazar bastiones SSH abiertos a 0.0.0.0/0 por túneles auditados basados en identidad.',
    mins: 25,
    prereqs: ['02.03'],
    mentalModel:
      'La identidad IAM/OIDC sustituye llaves SSH estáticas y elimina puertos 22 abiertos en borde.',
    antipattern: 'Compartir un archivo .pem único entre todo el equipo con puerto 22 abierto.',
    glossary: [
      ['Zero-port ingress', 'Acceso sin puertos entrantes abiertos'],
      ['Session audit', 'Registro de comandos/sesión'],
    ],
    aws: [
      'AWS SSM Session Manager',
      'aws ssm start-session --target i-1234',
      'No requiere IP pública ni puerto 22',
    ],
    azure: ['Azure Bastion', 'az network bastion list', 'Conecta por TLS 443 desde portal/CLI'],
    gcp: [
      'IAP TCP Forwarding',
      'gcloud compute ssh vm --tunnel-through-iap',
      'Proxy autenticado por IAM sobre 35.235.240.0/20',
    ],
    activity: 'Compara riesgo y costo de bastión EC2 tradicional vs SSM/IAP.',
  }),
  buildUnitSpec({
    code: '03.01',
    moduleId: 'compute',
    idx: 0,
    title: 'Ciclo de vida de máquinas virtuales',
    objective: 'Controlar aprovisionamiento, metadata IMDSv2, estados stopped vs terminated.',
    mins: 25,
    prereqs: ['01.01'],
    mentalModel: 'Una VM detenida sigue pagando discos EBS/Managed Disks y conserva IPs asignadas.',
    antipattern: 'Dejar IMDSv1 activo permitiendo ataques SSRF hacia credenciales de instancia.',
    glossary: [
      ['IMDSv2', 'Metadata con token de sesión'],
      ['Ephemeral vs Persistent', 'Disco raíz vs volumen de datos'],
    ],
    aws: [
      'Amazon EC2',
      'aws ec2 describe-instances --query "Reservations[].Instances[].State.Name"',
      'Exigir http-tokens=required (IMDSv2)',
    ],
    azure: [
      'Azure Virtual Machines',
      'az vm list -d -o table',
      'Usar deallocate para dejar de cobrar cómputo',
    ],
    gcp: [
      'Compute Engine',
      'gcloud compute instances list',
      'Metadatos usan header Metadata-Flavor: Google',
    ],
    activity: 'Lista qué recursos siguen generando cargo cuando detienes una VM.',
  }),
  buildUnitSpec({
    code: '03.02',
    moduleId: 'compute',
    idx: 1,
    title: 'Imágenes base, cloud-init y metadata',
    objective:
      'Construir imágenes inmutables (Golden Images) en lugar de configurar servidores manualmente.',
    mins: 30,
    prereqs: ['03.01'],
    mentalModel:
      'Trata los servidores como ganado desechable (immutable), nunca como mascotas parcheadas a mano.',
    antipattern: 'Ejecutar apt upgrade y editar /etc vía SSH tras cada despliegue.',
    glossary: [
      ['Golden Image', 'AMI/Imagen pre-endurecida y escaneada'],
      ['cloud-init', 'Bootstrap declarativo al arranque'],
    ],
    aws: [
      'EC2 Image Builder / AMI',
      'aws ec2 describe-images --owners self',
      'Las AMIs son regionales; copiar entre regiones',
    ],
    azure: [
      'Azure Compute Gallery',
      'az sig image-definition list -g rg -r gal',
      'Replica imágenes entre regiones automáticamente',
    ],
    gcp: [
      'Packer / GCE Images',
      'gcloud compute images list --no-standard-images',
      'Imágenes globales reutilizables entre zonas',
    ],
    activity: 'Escribe un snippet cloud-init mínimo no destructivo que cree usuario sin root.',
  }),
  buildUnitSpec({
    code: '03.03',
    moduleId: 'compute',
    idx: 2,
    title: 'Linux esencial para Cloud Engineers',
    objective: 'Diagnosticar procesos, sockets, disco y systemd sin reiniciar a ciegas.',
    mins: 35,
    prereqs: ['03.01'],
    mentalModel:
      'Antes de reiniciar, inspecciona CPU/memoria/sockets/logs: reiniciar borra evidencia efímera.',
    antipattern:
      'Reiniciar el servicio en bucle ante error 500 sin leer journalctl ni espacio en disco.',
    glossary: [
      ['systemd', 'Gestor de servicios y logs journald'],
      ['inode', 'Estructura de archivo que puede agotarse antes del GB'],
    ],
    aws: [
      'Linux en Amazon Linux / Ubuntu',
      'journalctl -u app.service -n 50 --no-pager',
      'Verificar df -h y df -i en /var/log',
    ],
    azure: ['Linux en Azure VM', 'ss -tulpn | head -n 20', 'Waagent gestiona extensiones de VM'],
    gcp: [
      'Linux en Container-Optimized OS',
      'systemctl status docker --no-pager',
      'COS usa sistema de archivos raíz inmutable',
    ],
    activity: 'Ordena 4 comandos read-only para diagnosticar disco lleno y puerto bloqueado.',
  }),
  buildUnitSpec({
    code: '03.04',
    moduleId: 'compute',
    idx: 3,
    title: 'Balanceadores de carga y health checks',
    objective:
      'Configurar health checks profundos que verifiquen dependencias reales antes de recibir tráfico.',
    mins: 30,
    prereqs: ['02.03', '03.01'],
    mentalModel:
      'Un balanceador solo protege al usuario si el health check refleja la salud real del proceso.',
    antipattern:
      'Devolver HTTP 200 estático en /health mientras el pool de base de datos está caído.',
    glossary: [
      ['L7 ALB', 'Balanceador HTTP/HTTPS por ruta/host'],
      ['Connection draining', 'Esperar fin de requests en vuelo'],
    ],
    aws: [
      'AWS Application Load Balancer',
      'aws elbv2 describe-target-health --target-group-arn arn',
      'Deregistration delay evita cortar requests',
    ],
    azure: [
      'Azure Application Gateway',
      'az network application-gateway show-backend-health',
      'Soporta WAF integrado en borde',
    ],
    gcp: [
      'Cloud Load Balancing (HTTP/S)',
      'gcloud compute backend-services get-health bs',
      'Global Anycast IP única para múltiples regiones',
    ],
    activity: 'Diseña un endpoint /readyz distinto de /livez explicando qué valida cada uno.',
  }),
  buildUnitSpec({
    code: '03.05',
    moduleId: 'compute',
    idx: 4,
    title: 'Grupos de autoescalado',
    objective:
      'Calibrar métricas objetivo, cooldowns y límites máximos contra capacidad aguas abajo.',
    mins: 30,
    prereqs: ['03.04'],
    mentalModel:
      'Escalar cómputo sin acotar conexiones hacia la BD convierte un pico en una caída total (S16).',
    antipattern:
      'Configurar maxCapacity=100 sin revisar max_connections de PostgreSQL ni presupuesto FinOps.',
    glossary: [
      ['Cooldown', 'Espera entre acciones de escalado'],
      ['Target tracking', 'Mantener métrica cerca del umbral'],
    ],
    aws: [
      'EC2 Auto Scaling',
      'aws autoscaling describe-scaling-activities',
      'Predictive scaling anticipa patrones diarios',
    ],
    azure: [
      'VM Scale Sets Autoscale',
      'az monitor autoscale list -g rg',
      'Reglas separadas para scale-out y scale-in',
    ],
    gcp: [
      'MIG Autoscaler',
      'gcloud compute instance-groups managed describe ig',
      'Escala por CPU, RPS de LB o métricas custom',
    ],
    activity:
      'Usa el Simulador Autoescalado + Load Balancing para detectar el límite de 60 conns BD.',
  }),
]);
