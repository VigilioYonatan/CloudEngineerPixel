/** Curated core explanations independent from providers. Never substitute for official documentation. */
export const knowledge: Record<
  string,
  { principle: string; tradeoff: string; failure: string; example: string }
> = {
  'cloud-fundamentals': {
    principle:
      'La nube convierte capacidad informática en recursos bajo demanda, pero mantiene responsabilidades: la plataforma protege su infraestructura y el cliente protege identidades, configuración, acceso y datos según el servicio.',
    tradeoff:
      'IaaS ofrece control del sistema operativo; PaaS reduce tareas operativas; SaaS prioriza consumir una funcionalidad. Más abstracción significa menos control directo, no ausencia de responsabilidad.',
    failure:
      'Seleccionar regiones sin analizar residencia de datos, latencia y servicios disponibles puede invalidar una arquitectura desde el inicio.',
    example:
      'Un sitio estático puede usar almacenamiento de objetos y CDN; una aplicación con procesos de larga duración puede requerir contenedores o máquinas virtuales.',
  },
  networks: {
    principle:
      'Una red cloud define alcance de direcciones, aislamiento, ruteo y reglas de tráfico. CIDR representa cuántas direcciones contiene cada subred; una ruta indica a dónde enviar un paquete.',
    tradeoff:
      'Publicar recursos simplifica la conectividad pero aumenta la superficie de ataque. Private endpoints y NAT mejoran el control, aunque agregan componentes y costo.',
    failure:
      'Tener IP privadas válidas no garantiza conexión: pueden faltar rutas, DNS, firewall, security groups, NSG o permisos del servicio destino.',
    example:
      'Frontend público detrás de un balanceador; API y base de datos en segmentos privados. Solo el balanceador recibe tráfico desde Internet.',
  },
  compute: {
    principle:
      'Las VM proporcionan CPU, memoria, disco y conectividad sobre hardware compartido. Su diseño exige elegir imagen, tamaño, ubicación, identidad, sistema operativo y gestión de parches.',
    tradeoff:
      'Una instancia grande simplifica la operación pero reduce flexibilidad; escalar horizontalmente mejora resiliencia si la aplicación es stateless y existe balanceo.',
    failure:
      'Acceso SSH abierto a todo Internet, imágenes sin parches o discos sin respaldo pueden convertirse en incidentes de seguridad o pérdida de datos.',
    example:
      'Servidor Linux con cuenta no privilegiada, claves SSH, acceso desde bastión o mecanismo administrado y logs centralizados.',
  },
  storage: {
    principle:
      'Object storage guarda objetos identificados por claves; block storage presenta volúmenes; file storage expone sistemas compartidos. No son sustitutos equivalentes.',
    tradeoff:
      'Object storage ofrece gran durabilidad pero no es POSIX por defecto. Las bases de datos administradas reducen operación, pero requieren diseño de escalado, conexión y backup.',
    failure:
      'Conceder lectura pública por error o asumir que una copia de seguridad no probada equivale a recuperación disponible.',
    example:
      'Imágenes en bucket privado, acceso temporal firmado y versión de objetos; base SQL para transacciones consistentes.',
  },
  identity: {
    principle:
      'Las identidades realizan acciones sobre recursos mediante permisos. Una política debe precisar quién, qué acciones, sobre cuáles recursos y bajo qué condiciones.',
    tradeoff:
      'Permisos amplios aceleran pruebas pero exponen todos los recursos. Roles específicos y acceso temporal cuestan algo más de diseño.',
    failure:
      'Credenciales permanentes en git y permisos wildcard facilitan escalamiento lateral y compromiso de datos.',
    example:
      'Un pipeline CI usa OIDC y permiso limitado para publicar una imagen en un único registro, sin claves estáticas.',
  },
  costs: {
    principle:
      'La factura cloud combina cómputo, almacenamiento, operaciones, transferencia y servicios administrados. El costo final depende de consumo y configuración.',
    tradeoff:
      'Reserva de capacidad reduce precio unitario pero exige previsión; serverless paga consumo con otras restricciones. Medir costos por producto o equipo permite decisiones comparables.',
    failure:
      'Dejar recursos activos tras ejercicios, crear gateways y transferencias sin control o confundir capas gratuitas con servicios gratuitos permanentes.',
    example:
      'Presupuesto con alerta temprana, etiquetas owner/environment, estimación antes del despliegue y cleanup verificado al cerrar el laboratorio.',
  },
  'cloud-cli': {
    principle:
      'La CLI traduce acciones del operador en llamadas a APIs del proveedor. Toda ejecución depende del contexto autenticado y de los permisos efectivos.',
    tradeoff:
      'Scripts repetibles evitan clics manuales pero los comandos mal parametrizados pueden actuar en la cuenta equivocada.',
    failure:
      'Ejecutar acciones destructivas con credenciales administrativas sin comprobar cuenta, proyecto, región y objetivo.',
    example:
      'Antes de modificar recursos, listar identidad activa y usar modo dry-run o plan cuando exista; registrar el cambio en control de versiones.',
  },
  'advanced-network': {
    principle:
      'La conectividad empresarial incorpora balanceo de carga, NAT, DNS privado, conectividad híbrida y puntos de acceso privados.',
    tradeoff:
      'El balanceador mejora disponibilidad pero puede añadir costo y punto de configuración; separar tráfico por capas mejora seguridad a cambio de complejidad.',
    failure:
      'Una dependencia de DNS híbrido mal diseñada puede convertir una caída externa en una indisponibilidad de servicios internos.',
    example:
      'Un LB público enruta a servicios privados que acceden a datos por private endpoint, con TLS de extremo a extremo cuando se requiere.',
  },
  serverless: {
    principle:
      'Serverless abstrae el aprovisionamiento de cómputo y escala ejecuciones. Los eventos pueden reintentarse y no siempre garantizan entrega única.',
    tradeoff:
      'El escalado automático reduce operación, pero pueden existir cold starts, límites de concurrencia, duraciones y costos difíciles de predecir a alto volumen.',
    failure:
      'Una función que cobra dos veces el mismo pedido porque el mensaje se entregó más de una vez.',
    example:
      'Consumidor con idempotency key, reintentos con backoff, dead-letter queue y correlación de logs.',
  },
  containers: {
    principle:
      'Una imagen contiene dependencias; el contenedor ejecuta un proceso aislado. Kubernetes administra despliegue, servicio, configuración y actualización de cargas.',
    tradeoff:
      'Kubernetes ofrece herramientas potentes de orquestación pero aumenta el costo operativo; PaaS de contenedores puede ser más simple en proyectos pequeños.',
    failure:
      'Desplegar imágenes sin versionar, sin probes o como root privilegiado puede causar incidentes y escalados fallidos.',
    example:
      'Deployment con replicas, resource requests/limits, readiness probe, política de actualización y registry escaneado.',
  },
  iac: {
    principle:
      'La infraestructura como código convierte recursos declarativos en artefactos revisables. Terraform compara configuración, estado y APIs para producir un plan.',
    tradeoff:
      'El estado remoto permite colaboración pero necesita locking, cifrado y acceso restringido; los módulos favorecen reutilización sin perder visibilidad del cambio.',
    failure:
      'Aceptar un plan que reemplaza una base de datos sin analizar atributos ForceNew, dependencias y recuperación.',
    example:
      'Pull request con terraform fmt/validate/plan, revisión humana y apply autorizado con identidad temporal.',
  },
  observability: {
    principle:
      'Logs explican eventos, métricas cuantifican tendencias y trazas conectan solicitudes entre servicios. CI/CD transforma cambios aprobados en despliegues trazables.',
    tradeoff:
      'Instrumentar cada señal tiene costo; se deben definir objetivos de servicio y retenciones relevantes, evitando alertas de ruido.',
    failure:
      'Un pipeline que despliega sin health checks ni rollback puede producir interrupciones y diagnóstico lento.',
    example:
      'Build firmado, pruebas, despliegue canary, alarmas de latencia p99 y rollback automatizable.',
  },
  'software-architecture': {
    principle:
      'La arquitectura asigna responsabilidades y define contratos. Los sistemas distribuidos introducen fallos parciales, latencia de red y consistencia no instantánea.',
    tradeoff:
      'Microservicios aumentan autonomía de equipos pero también operaciones, coordinación, observabilidad y costo. Un monolito modular puede ser la decisión correcta.',
    failure:
      'Una transacción distribuida entre ocho servicios falla a mitad del proceso y deja estados inconsistentes.',
    example:
      'Definir límites de dominio, eventos de negocio, contratos y decisiones documentadas en ADR.',
  },
  governance: {
    principle:
      'La gobernanza establece estructuras organizativas, permisos heredados, políticas, límites de gasto y controles de cumplimiento antes de crear recursos.',
    tradeoff:
      'Guardrails centralizados previenen riesgos, pero deben permitir autonomía mediante roles de bajo privilegio y rutas aprobadas de excepción.',
    failure:
      'Un equipo crea recursos en una región no permitida y procesa datos sujetos a requisitos de residencia.',
    example:
      'Landing zone con cuentas/proyectos separados, logs centralizados, políticas de ubicación, SSO y budget.',
  },
  resilience: {
    principle:
      'RTO mide el tiempo máximo objetivo para restaurar servicio; RPO mide la pérdida máxima tolerable de datos. Disponibilidad requiere eliminar puntos únicos de fallo.',
    tradeoff:
      'Multi-región ofrece protección mayor, pero incrementa replicación, operación, costo y dificultad de consistencia; multi-zona puede cubrir muchos objetivos.',
    failure:
      'Activar failover sin verificar retraso de replicación y perder transacciones no recuperables.',
    example:
      'Prueba trimestral de restauración con tiempo medido, procedimiento documentado y validación de integridad.',
  },
  'data-architecture': {
    principle:
      'Las decisiones sobre datos incluyen consistencia, latencia, patrón de consulta, ciclo de vida y necesidad de integración síncrona o asíncrona.',
    tradeoff:
      'NoSQL puede escalar ciertos accesos pero traslada al diseño más decisiones sobre consulta, transacciones y consistencia.',
    failure:
      'Procesar eventos duplicados sin claves idempotentes causa doble cobro o inventarios inconsistentes.',
    example:
      'Base SQL transaccional, outbox pattern, cola con reintentos y almacenamiento analítico separado del OLTP.',
  },
  'sre-finops': {
    principle:
      'SRE conecta objetivos de confiabilidad con prácticas operativas; FinOps conecta uso tecnológico con responsabilidad económica y decisiones de producto.',
    tradeoff:
      'Desplegar más rápido compite con preservar error budget. Reducir capacidad ahorra dinero pero puede degradar el SLO si se hace sin medición.',
    failure:
      'Un escalado agresivo aumenta réplicas pero satura una dependencia crítica, generando una caída mayor.',
    example:
      'SLI de éxito y latencia, SLO mensual, alertas por burn rate, postmortem sin culpas y costo por transacción.',
  },
  capstone: {
    principle:
      'La solución arquitectónica se evalúa contra objetivos de negocio, requisitos no funcionales, riesgos, seguridad, operación y costo total.',
    tradeoff:
      'La portabilidad total entre nubes reduce dependencia pero sacrifica servicios administrados específicos y aumenta complejidad. Multicloud no siempre aporta valor.',
    failure:
      'Defender una plataforma con un diagrama elegante sin datos de RTO/RPO, permisos, costos ni pruebas de recuperación.',
    example:
      'ADR que compara dos diseños, justifica el elegido, documenta pruebas de carga/DR y presenta TCO y amenazas.',
  },
};
