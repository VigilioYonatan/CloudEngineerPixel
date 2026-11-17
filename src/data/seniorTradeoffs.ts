export type SeniorTradeoff = {
  immediateMitigation: string;
  permanentFix: string;
  userImpact: string;
  reversibility: string;
  securityRisk: string;
  optionFeedback: readonly [string, string, string];
};

export const seniorTradeoffs: Record<string, SeniorTradeoff> = {
  s01: {
    immediateMitigation: 'Bloquear el apply destructivo en CI y validar el diff ForceNew.',
    permanentFix: 'Migrar con blue/green o snapshot verificado + prevent_destroy en IaC.',
    userImpact: 'Evita caída total de escrituras y pérdida de sesión en hora pico.',
    reversibility: 'Alta antes de apply; crítica o imposible tras destroy.',
    securityRisk: 'Riesgo de perder cifrado KMS o políticas si se recrea sin revisión.',
    optionFeedback: [
      'Aplicar a ciegas destruye la BD primaria en producción y rompe el RPO.',
      'Correcto: pausar y auditar state/plan protege datos y habilita migración segura.',
      'Ejecutar destroy agrava el incidente eliminando el recurso persistente.',
    ],
  },
  s02: {
    immediateMitigation: 'Retirar Action:* y acotar Resource al ARN de la función.',
    permanentFix: 'Federación OIDC por entorno + boundary policy y test IAM negativo.',
    userImpact: 'Nulo para usuarios finales; protege cuentas productivas.',
    reversibility: 'Alta mediante versionado de política IAM en IaC.',
    securityRisk: 'Un token comprometido en CI con Action:* toma control total del tenant.',
    optionFeedback: [
      'Ser interno no impide compromisos de dependencias o runners compartidos.',
      'Compartir credenciales rompe trazabilidad e impide revocación granular.',
      'Correcto: mínimo privilegio + identidad efímera OIDC acotan el radio de explosión.',
    ],
  },
  s03: {
    immediateMitigation: 'Revocar/rotar la credencial expuesta y bloquear su uso activo.',
    permanentFix: 'Pre-commit secret scanning, push protection y limpieza de historial.',
    userImpact: 'Breve reautenticación si el servicio depende de la clave rotada.',
    reversibility: 'Irreversible la exposición pública; la rotación anula el secreto filtrado.',
    securityRisk: 'Bots escanean commits públicos en segundos buscando credenciales.',
    optionFeedback: [
      'Borrar el archivo actual deja el secreto intacto en el historial de Git.',
      'Correcto: asumir compromiso, rotar, auditar accesos y sanear historial.',
      'Renombrar la variable no invalida ni retira la credencial comprometida.',
    ],
  },
  s04: {
    immediateMitigation: 'Rollback controlado a la versión estable y drenaje de targets.',
    permanentFix: 'Canary progresivo con gates de readiness y métricas 5xx automáticas.',
    userImpact: 'Recupera disponibilidad en minutos en lugar de prolongar 503.',
    reversibility: 'Alta con despliegue inmutable y artefacto previo etiquetado.',
    securityRisk: 'Deshabilitar alarmas oculta regresiones o fallos de integridad.',
    optionFeedback: [
      'Reiniciar sin diagnóstico consume tiempo de RTO sin corregir el fallo.',
      'Correcto: restaurar el servicio primero y analizar trazas/probes después.',
      'Eliminar alarmas silencia la observabilidad sin mitigar el 503.',
    ],
  },
  s05: {
    immediateMitigation: 'Corregir reglas Security Group/NSG y ruta privada en tcp/5432.',
    permanentFix: 'Tests de conectividad privada en pipeline y DNS privado gestionado.',
    userImpact: 'Restaura comunicación API-BD sin exponer tráfico a Internet.',
    reversibility: 'Alta al ajustar reglas declarativas de red.',
    securityRisk: 'Hacer pública la base de datos expone superficie directa de ataque.',
    optionFeedback: [
      'Exponer la base públicamente viola aislamiento y multiplica riesgo de intrusión.',
      'Correcto: diagnosticar por capas (rutas, DNS, puertos y firewall privado).',
      'Deshabilitar TLS expone credenciales y datos en tránsito.',
    ],
  },
  s06: {
    immediateMitigation: 'Identificar top-spenders (egress, nodos ociosos) y detener fugas.',
    permanentFix: 'Etiquetado obligatorio en CI, presupuestos y right-sizing continuo.',
    userImpact: 'Mantiene SLO sin recortes ciegos en cargas críticas.',
    reversibility: 'Alta ajustando cuotas, autoscaling y reservas.',
    securityRisk: 'Picos anómalos pueden delatar abuso o minería no autorizada.',
    optionFeedback: [
      'Apagar producción indiscriminadamente genera caída total de negocio.',
      'Ocultar el desvío agrava el impacto financiero mensual.',
      'Correcto: atribuir por servicio/etiqueta antes de optimizar con seguridad.',
    ],
  },
  s07: {
    immediateMitigation: 'Inspeccionar describe/events y logs --previous antes de escalar.',
    permanentFix: 'Ajustar startup/readiness probes, configmaps y límites de recursos.',
    userImpact: 'Evita multiplicar pods fallando que saturan el plano de control.',
    reversibility: 'Alta revisando manifiestos o revirtiendo la revisión.',
    securityRisk: 'Quitar probes permite tráfico hacia contenedores corruptos.',
    optionFeedback: [
      'Escalar a 100 réplicas multiplica el fallo y presiona dependencias.',
      'Correcto: leer eventos, estado previo y logs para aislar la causa raíz.',
      'Eliminar probes y alertas oculta degradación activa.',
    ],
  },
  s08: {
    immediateMitigation: 'Ejecutar restore drill aislado y medir RTO/RPO reales.',
    permanentFix: 'Simulacros trimestrales automatizados e inmutabilidad 3-2-1.',
    userImpact: 'Cero impacto en producción al probar en namespace aislado.',
    reversibility: 'N/A (ensayo aislado no destructivo).',
    securityRisk: 'Sin restore probado un ransomware o borrado accidental es irrecuperable.',
    optionFeedback: [
      'Un estado "succeeded" sin restore no demuestra integridad ni RPO.',
      'Correcto: cronometrar restauración aislada y validar consistencia.',
      'Desactivar respaldos antiguos sin validar deja al sistema indefenso.',
    ],
  },
  s09: {
    immediateMitigation: 'Cerrar acceso público/anónimo y habilitar bloqueo de bucket.',
    permanentFix: 'Política deny-public-read en organización + auditoría de accesos.',
    userImpact: 'Solo corta lecturas no autorizadas; apps usan identidad IAM.',
    reversibility: 'Media: los objetos ya descargados requieren análisis de brecha.',
    securityRisk: 'Exfiltración directa de documentos sensibles sin autenticación.',
    optionFeedback: [
      'Renombrar el bucket rompe clientes y no elimina el riesgo si la política sigue.',
      'Mantener acceso anónimo perpetúa la brecha de datos.',
      'Correcto: restringir acceso de inmediato, auditar logs y medir exposición.',
    ],
  },
  s10: {
    immediateMitigation: 'Congelar despliegues no críticos según política de error budget.',
    permanentFix: 'Invertir sprint en fiabilidad, alertas SLO y rollback automático.',
    userImpact: 'Protege la experiencia del usuario frente a nuevas regresiones.',
    reversibility: 'Alta al gobernar releases por presupuesto de error.',
    securityRisk: 'Acelerar sin verificación eleva probabilidad de fallos y brechas.',
    optionFeedback: [
      'Ignorar el presupuesto agotado degrada el servicio y rompe acuerdos SLA.',
      'Correcto: priorizar estabilidad y recuperación del SLO antes de nuevas features.',
      'Eliminar el SLO oculta la degradación sin mejorar la fiabilidad.',
    ],
  },
  s11: {
    immediateMitigation: 'Añadir timeouts acotados, caché selectiva y cortar reintentos.',
    permanentFix: 'Desacoplar saltos sincrónicos con mensajería asíncrona o BFF.',
    userImpact: 'Reduce p99 de 3.5s a sub-segundo eliminando cascadas.',
    reversibility: 'Media-alta mediante feature flags y patrón Strangler.',
    securityRisk: 'Reintentos sin límite amplifican auto-DoS en picos.',
    optionFeedback: [
      'Añadir más microservicios empeora los saltos de red y el p99.',
      'Correcto: perfilar trazas, ajustar timeouts/caché y reducir acoplamiento.',
      'Cambiar UI visual no altera la latencia real del backend.',
    ],
  },
  s12: {
    immediateMitigation: 'Acordonar/aislar el nodo, capturar memoria/logs y rotar secretos.',
    permanentFix: 'Pod Security Standards restricted + OPA/Kyverno contra privilegiados.',
    userImpact: 'Reprograma cargas sanas en otros nodos sin perder forense.',
    reversibility: 'Alta drenando cargas sanas y reemplazando el nodo comprometido.',
    securityRisk: 'Borrar logs destruye trazabilidad de movimiento lateral.',
    optionFeedback: [
      'Borrar logs impide investigar alcance y compromiso de secretos.',
      'Descartar como falso positivo deja un atacante activo en el clúster.',
      'Correcto: aislar nodo, preservar evidencia forense y rotar credenciales.',
    ],
  },
  s13: {
    immediateMitigation: 'Ejecutar runbook de failover validando retraso de réplica y DNS.',
    permanentFix: 'Ensayos GameDay multi-región con métricas de RPO/RTO verificadas.',
    userImpact: 'Restablece tráfico global tras validar integridad de estado.',
    reversibility: 'Media: requiere plan de failback y reconciliación posterior.',
    securityRisk: 'Failover improvisado arriesga split-brain o inconsistencia de datos.',
    optionFeedback: [
      'Aplicar failover controlado por runbook verifica RPO y evita improvisación.',
      'Esperar indefinidamente incumple RTO y prolonga caída regional.',
      'Crear recursos ad-hoc sin dependencias agrava la desincronización.',
    ],
  },
  s14: {
    immediateMitigation: 'Pausar reintentos ciegos, deduplicar por clave y conciliar cobros.',
    permanentFix: 'Idempotency-Key transaccional en BD + outbox pattern.',
    userImpact: 'Evita cargos duplicados y acelera reembolso/conciliación.',
    reversibility: 'Media: los cobros ya ejecutados requieren compensación contable.',
    securityRisk: 'Sin idempotencia, fallos transitorios generan impacto financiero directo.',
    optionFeedback: [
      'Desactivar reintentos provoca pérdida silenciosa de operaciones válidas.',
      'Correcto: diseñar consumidor idempotente con clave de negocio única.',
      'Aumentar concurrencia multiplica las colisiones de cobro duplicado.',
    ],
  },
  s15: {
    immediateMitigation: 'Fijar imágenes por digest SHA256 y rotar claves estáticas a OIDC.',
    permanentFix: 'SBOM, firma Cosign y verificación de procedencia en admisión.',
    userImpact: 'Sin impacto en usuarios; elimina deriva mutable en despliegues.',
    reversibility: 'Alta al pinnear digests inmutables en Git.',
    securityRisk: 'Etiqueta :latest + claves permanentes facilitan supply chain attack.',
    optionFeedback: [
      'Apagar el pipeline indefinidamente bloquea parches de seguridad críticos.',
      'Guardar más claves estáticas amplía la superficie de fuga.',
      'Correcto: pinnear digest, escanear artefactos/SBOM y federar OIDC.',
    ],
  },
  s16: {
    immediateMitigation: 'Limitar concurrencia/autoscaling y proteger pool de conexiones BD.',
    permanentFix: 'Connection pooler (PgBouncer/Proxy) + circuit breaker + load testing.',
    userImpact: 'Estabiliza la BD evitando que todas las réplicas caigan en cascada.',
    reversibility: 'Alta ajustando maxReplicas y parámetros de pool.',
    securityRisk: 'Sin límites de tasa ni cuotas, picos legítimos tumban la plataforma.',
    optionFeedback: [
      'Correcto: acotar concurrencia y dimensionar pools extremo a extremo.',
      'Duplicar réplicas multiplica las conexiones abiertas y empeora el colapso.',
      'Quitar cuotas elimina los frenos de seguridad ante saturación.',
    ],
  },
  s17: {
    immediateMitigation: 'Frenar duplicación multi-nube no justificada y evaluar TCO real.',
    permanentFix: 'ADR comparando requisitos regulatorios, disponibilidad y costo operativo.',
    userImpact: 'Evita latencia entre nubes y sobrecarga cognitiva del equipo.',
    reversibility: 'Muy baja una vez acoplados servicios propietarios en 3 nubes.',
    securityRisk: 'Tres planos IAM distintos multiplican errores de configuración.',
    optionFeedback: [
      'Desplegar en tres nubes por estética triplica costos y superficie de error.',
      'Descartar por dogma impide evaluar requisitos reales de portabilidad.',
      'Correcto: decidir con matriz de requisitos, TCO y ADR firmado.',
    ],
  },
  s18: {
    immediateMitigation: 'Exigir ADR, threat model y evidencias de RTO/RPO antes de aprobar.',
    permanentFix: 'Arquitectura medible: controles de seguridad, DR probado y presupuesto.',
    userImpact: 'Garantiza 99.95% con resiliencia y cumplimiento verificables.',
    reversibility: 'Alta en fase de diseño; costosa tras puesta en producción.',
    securityRisk: 'Aprobar controles "pendientes" traslada vulnerabilidades a producción.',
    optionFeedback: [
      'Enumerar logos y certificaciones no demuestra controles técnicos.',
      'Correcto: diseñar componentes, riesgos, pruebas, costos y ADR medibles.',
      'Prometer cero fallas sin pruebas ignora la realidad operativa.',
    ],
  },
};
