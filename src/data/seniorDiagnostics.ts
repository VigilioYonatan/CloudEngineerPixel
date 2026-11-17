/** Diagnósticos basados exclusivamente en las pistas sintéticas de cada incidente. */
export type Diagnostic = {
  question: string;
  choices: readonly [string, string, string];
  correct: number;
  explanation: string;
};

export const seniorDiagnostics: Record<string, Diagnostic> = {
  s01: {
    question:
      'El plan sustituye una base de datos persistente. ¿Qué hipótesis debes verificar primero?',
    choices: [
      'Un atributo de sustitución o drift está forzando el reemplazo',
      'La zona horaria del navegador cambió',
      'El balanceador necesita más réplicas',
    ],
    correct: 0,
    explanation:
      'Un reemplazo en Terraform exige contrastar el diff, el estado, ForceNew, dependencias y la capacidad real de recuperación antes de aprobar.',
  },
  s02: {
    question:
      'Un pipeline conserva permisos demasiado amplios. ¿Qué evidencia identifica el riesgo principal?',
    choices: [
      'La versión del sistema operativo del runner',
      'Las acciones, recursos y condiciones efectivas asignadas al rol',
      'La cantidad de commits del repositorio',
    ],
    correct: 1,
    explanation:
      'Para mínimo privilegio se comparan las acciones realmente requeridas contra las permitidas por el rol y sus condiciones.',
  },
  s03: {
    question: 'Apareció un secreto en un repositorio. ¿Cuál es la inferencia segura?',
    choices: [
      'Borrar el último commit garantiza que nadie lo utilizó',
      'No es necesario investigar si la rama es privada',
      'La credencial debe considerarse expuesta; hay que revocarla y auditar su uso',
    ],
    correct: 2,
    explanation:
      'El historial, forks, logs y caches pueden conservar secretos; la respuesta prioriza revocación y delimitación del alcance.',
  },
  s04: {
    question:
      'Después del despliegue aumentan los errores 5xx. ¿Cuál es la correlación prioritaria?',
    choices: [
      'La cuenta de usuarios de la plataforma',
      'Cambios de release, readiness y health checks frente a errores y latencia',
      'El nombre comercial del proveedor',
    ],
    correct: 1,
    explanation:
      'Una hipótesis de regresión debe correlacionarse con métricas y eventos del cambio antes de revertir de forma controlada.',
  },
  s05: {
    question:
      'Una aplicación en subred privada no conecta con la base de datos. ¿Qué validas primero?',
    choices: [
      'Rutas, DNS, puertos y reglas entre origen y destino',
      'Hacer pública la base de datos',
      'Cambiar de nube sin investigar',
    ],
    correct: 0,
    explanation:
      'La ruta efectiva, resolución de nombres y permisos de red permiten aislar conectividad sin romper el aislamiento.',
  },
  s06: {
    question:
      'La factura sube sin aumento equivalente del tráfico. ¿Qué análisis explica el desvío?',
    choices: [
      'Reducir recursos a ciegas',
      'Ignorar la facturación hasta final de mes',
      'Atribuir uso por servicio, región, recurso y propietario',
    ],
    correct: 2,
    explanation:
      'La atribución por etiquetas, cuentas y periodos permite distinguir crecimiento legítimo, recursos huérfanos y costes inesperados.',
  },
  s07: {
    question: 'Un pod entra en CrashLoopBackOff. ¿Qué señal es más diagnóstica?',
    choices: [
      'Número de repositorios del equipo',
      'Eventos, estado anterior y logs del contenedor previo',
      'Cantidad de zonas cloud del tenant',
    ],
    correct: 1,
    explanation:
      'Los eventos y los logs del contenedor previo ayudan a aislar fallos de configuración, dependencias o startup probes.',
  },
  s08: {
    question:
      'Los backups aparecen exitosos, pero nadie logra restaurar. ¿Qué demuestra recuperación?',
    choices: [
      'Una restauración probada y cronometrada con integridad y RTO/RPO',
      'Que la consola diga “backup completed”',
      'Que la retención sea de varios días',
    ],
    correct: 0,
    explanation:
      'Solo un restore drill repetible valida que los datos sirven y que se cumplen los objetivos acordados.',
  },
  s09: {
    question:
      'Objetos internos aceptan solicitudes anónimas. ¿Qué comprobación caracteriza la exposición?',
    choices: [
      'Número de máquinas virtuales disponibles',
      'Velocidad del almacenamiento',
      'Política efectiva, acceso anónimo observado y alcance de objetos afectados',
    ],
    correct: 2,
    explanation:
      'La exposición real combina permisos efectivos, acceso observado y ventana temporal; la contención debe preceder al análisis detallado.',
  },
  s10: {
    question: 'El error budget de 30 días se agotó. ¿Qué recomendación es más coherente con SRE?',
    choices: [
      'Aprobar todas las entregas porque la disponibilidad media es alta',
      'Aplicar política de cambios y priorizar recuperación de fiabilidad',
      'Desactivar las alertas de disponibilidad',
    ],
    correct: 1,
    explanation:
      'Un presupuesto de error agotado debe orientar el ritmo de cambios y la reducción del riesgo según la política SLO.',
  },
  s11: {
    question:
      'El p99 crece hasta 3,5 segundos y el tramo inventory domina la traza. ¿Qué investigas?',
    choices: [
      'Dependencia lenta, reintentos encadenados y timeouts',
      'Tamaño del logotipo de la interfaz',
      'Habilitar permisos de administrador',
    ],
    correct: 0,
    explanation:
      'El waterfall muestra dónde se gasta el tiempo; los reintentos multiplican latencia y pueden agravar la saturación.',
  },
  s12: {
    question: 'Aparece un pod privilegiado sospechoso en un nodo. ¿Qué lectura es prioritaria?',
    choices: [
      'Borrar los eventos de auditoría',
      'Recrear todo el clúster de inmediato',
      'Preservar evidencia, delimitar identidad y aislar con un plan autorizado',
    ],
    correct: 2,
    explanation:
      'La contención debe conservar señales forenses y considerar identidades, credenciales montadas y movimiento lateral.',
  },
  s13: {
    question:
      'La región principal falla y la réplica tiene 14 minutos de retraso. ¿Qué valida el failover?',
    choices: [
      'Que una región secundaria exista',
      'Que el retraso y la capacidad cumplen RPO/RTO con una conmutación comprobada',
      'Que el tráfico tenga CDN',
    ],
    correct: 1,
    explanation:
      'RPO/RTO y consistencia condicionan la decisión; una réplica disponible no implica failover seguro.',
  },
  s14: {
    question: 'Una cola reentrega mensajes y aparecen cobros duplicados. ¿Qué falta probablemente?',
    choices: [
      'Consumo idempotente con clave de negocio y restricciones verificables',
      'Mayor tamaño de instancia',
      'Eliminar todos los reintentos sin análisis',
    ],
    correct: 0,
    explanation:
      'La entrega al menos una vez requiere deduplicación o efectos idempotentes y reparación de operaciones ya duplicadas.',
  },
  s15: {
    question:
      'El pipeline usa imagen latest y credenciales de larga vida. ¿Qué combinación reduce riesgo?',
    choices: [
      'Desactivar el escaneo para acelerar entregas',
      'Guardar los secretos en logs',
      'Fijar digest, verificar procedencia/SBOM y adoptar identidad federada OIDC',
    ],
    correct: 2,
    explanation:
      'La defensa de cadena de suministro combina identidad efímera, integridad de artefactos y controles verificables.',
  },
  s16: {
    question:
      'Al subir réplicas, aumentan los 5xx y la base llega a su máximo de conexiones. ¿Por qué?',
    choices: [
      'El navegador se quedó sin memoria',
      'Cada réplica aporta conexiones y agota un límite compartido',
      'El certificado TLS está próximo a vencer',
    ],
    correct: 1,
    explanation:
      'El escalamiento horizontal puede saturar pools y conexiones compartidas; se necesitan presupuestos y pruebas de carga.',
  },
  s17: {
    question:
      'Se propone multicloud sin exigencias regulatorias ni beneficio de resiliencia demostrado. ¿Qué decisión procede?',
    choices: [
      'Comparar requisitos, TCO, operación y resiliencia antes de sumar proveedores',
      'Añadir tres nubes siempre aumenta la disponibilidad automáticamente',
      'Duplicar todos los datos sin analizar costes de transferencia',
    ],
    correct: 0,
    explanation:
      'Multicloud se justifica con requisitos medibles, no como objetivo por sí mismo; puede aumentar complejidad y costes.',
  },
  s18: {
    question:
      'Se presenta una arquitectura con RTO/RPO y cifrado “pendientes”. ¿Qué falta para aprobarla?',
    choices: [
      'Usar un diagrama con más iconos',
      'Elegir el servicio con más funciones',
      'Evidencias y pruebas de controles, recuperación y objetivos de servicio',
    ],
    correct: 2,
    explanation:
      'Una arquitectura se valida contra requisitos medibles y riesgos residuales, no solo por su apariencia.',
  },
};
