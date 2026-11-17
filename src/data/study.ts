// Material original de práctica por unidad. No se presenta como laboratorio cloud ejecutado.
export type StudyUnit = {
  focus: string;
  exercise: string;
  verify: string;
  pitfalls: string[];
  compare: string;
  question: string;
};
export const studyUnits: Record<string, StudyUnit> = {
  'cloud-fundamentals:0': {
    focus:
      'Comparar responsabilidad operativa: máquina virtual (IaaS), runtime administrado (PaaS) y aplicación final (SaaS).',
    exercise:
      'Situación: el equipo debe trabajar sobre «Modelos IaaS, PaaS y SaaS» para una aplicación de tres capas que requiere controles auditables. Comparar responsabilidad operativa: máquina virtual (IaaS), runtime administrado (PaaS) y aplicación final (SaaS). Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Explicar las bases de una solución cloud y escoger servicios con criterio.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Modelos IaaS, PaaS y SaaS» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Modelos IaaS, PaaS y SaaS» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Modelos IaaS, PaaS y SaaS» cumple el objetivo sin crear riesgo operativo?',
  },
  'cloud-fundamentals:1': {
    focus:
      'Identificar localización de datos, dominios de fallo y responsabilidades del proveedor y del cliente.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Regiones, zonas y responsabilidad compartida» para una aplicación de tres capas que requiere controles auditables. Identificar localización de datos, dominios de fallo y responsabilidades del proveedor y del cliente. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Explicar las bases de una solución cloud y escoger servicios con criterio.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Regiones, zonas y responsabilidad compartida» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Regiones, zonas y responsabilidad compartida» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Regiones, zonas y responsabilidad compartida» cumple el objetivo sin crear riesgo operativo?',
  },
  'cloud-fundamentals:2': {
    focus: 'Separar disponibilidad de capacidad; medir SLA y evitar puntos únicos de fallo.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Alta disponibilidad y escalabilidad» para una aplicación de tres capas que requiere controles auditables. Separar disponibilidad de capacidad; medir SLA y evitar puntos únicos de fallo. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Explicar las bases de una solución cloud y escoger servicios con criterio.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Alta disponibilidad y escalabilidad» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Alta disponibilidad y escalabilidad» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Alta disponibilidad y escalabilidad» cumple el objetivo sin crear riesgo operativo?',
  },
  'cloud-fundamentals:3': {
    focus:
      'Distinguir organización, cuenta/suscripción/proyecto, identidad y facturación antes de crear recursos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Cuentas, proyectos y organización» para una aplicación de tres capas que requiere controles auditables. Distinguir organización, cuenta/suscripción/proyecto, identidad y facturación antes de crear recursos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Explicar las bases de una solución cloud y escoger servicios con criterio.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Cuentas, proyectos y organización» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Cuentas, proyectos y organización» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Cuentas, proyectos y organización» cumple el objetivo sin crear riesgo operativo?',
  },
  'cloud-fundamentals:4': {
    focus: 'Trazar usuarios, entrada, cómputo, datos, salida, confianza y costes en un diagrama.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Arquitectura y diagrama de una solución» para una aplicación de tres capas que requiere controles auditables. Trazar usuarios, entrada, cómputo, datos, salida, confianza y costes en un diagrama. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Explicar las bases de una solución cloud y escoger servicios con criterio.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Arquitectura y diagrama de una solución» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Arquitectura y diagrama de una solución» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Arquitectura y diagrama de una solución» cumple el objetivo sin crear riesgo operativo?',
  },
  'networks:0': {
    focus: 'Calcular máscaras, rangos, resolución DNS y flujo HTTP/TLS antes de abrir puertos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «IPv4, CIDR, DNS y HTTP» para una aplicación de tres capas que requiere controles auditables. Calcular máscaras, rangos, resolución DNS y flujo HTTP/TLS antes de abrir puertos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una red segmentada, aplicar reglas y justificar el direccionamiento.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «IPv4, CIDR, DNS y HTTP» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «IPv4, CIDR, DNS y HTTP» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «IPv4, CIDR, DNS y HTTP» cumple el objetivo sin crear riesgo operativo?',
  },
  'networks:1': {
    focus: 'Definir un rango CIDR que evite superposición y dos subredes con objetivos distintos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «VPC, VNet y subredes» para una aplicación de tres capas que requiere controles auditables. Definir un rango CIDR que evite superposición y dos subredes con objetivos distintos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una red segmentada, aplicar reglas y justificar el direccionamiento.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «VPC, VNet y subredes» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «VPC, VNet y subredes» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «VPC, VNet y subredes» cumple el objetivo sin crear riesgo operativo?',
  },
  'networks:2': {
    focus:
      'Explicar next-hop, ruta por defecto y cuándo un gateway de Internet o NAT resulta necesario.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Rutas y gateways» para una aplicación de tres capas que requiere controles auditables. Explicar next-hop, ruta por defecto y cuándo un gateway de Internet o NAT resulta necesario. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una red segmentada, aplicar reglas y justificar el direccionamiento.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Rutas y gateways» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Rutas y gateways» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Rutas y gateways» cumple el objetivo sin crear riesgo operativo?',
  },
  'networks:3': {
    focus: 'Crear una matriz origen-destino-puerto-protocolo y aplicar denegación por defecto.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Firewalls, NSG y security groups» para una aplicación de tres capas que requiere controles auditables. Crear una matriz origen-destino-puerto-protocolo y aplicar denegación por defecto. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una red segmentada, aplicar reglas y justificar el direccionamiento.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Firewalls, NSG y security groups» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Firewalls, NSG y security groups» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Firewalls, NSG y security groups» cumple el objetivo sin crear riesgo operativo?',
  },
  'networks:4': {
    focus: 'Ubicar balanceador en público y servicios/datos en privado; validar rutas de salida.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Redes públicas y privadas» para una aplicación de tres capas que requiere controles auditables. Ubicar balanceador en público y servicios/datos en privado; validar rutas de salida. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una red segmentada, aplicar reglas y justificar el direccionamiento.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Redes públicas y privadas» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Redes públicas y privadas» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Redes públicas y privadas» cumple el objetivo sin crear riesgo operativo?',
  },
  'compute:0': {
    focus: 'Aplicar acceso con claves, usuario no root, parches y autenticación de identidad.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Linux, SSH y claves» para una aplicación de tres capas que requiere controles auditables. Aplicar acceso con claves, usuario no root, parches y autenticación de identidad. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Provisionar un servidor de forma segura y verificar su funcionamiento.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Linux, SSH y claves» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Linux, SSH y claves» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Linux, SSH y claves» cumple el objetivo sin crear riesgo operativo?',
  },
  'compute:1': {
    focus: 'Comparar imagen, disco de arranque y metadatos; declarar tamaño y zona.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Máquinas virtuales e imágenes» para una aplicación de tres capas que requiere controles auditables. Comparar imagen, disco de arranque y metadatos; declarar tamaño y zona. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Provisionar un servidor de forma segura y verificar su funcionamiento.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Máquinas virtuales e imágenes» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Máquinas virtuales e imágenes» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Máquinas virtuales e imágenes» cumple el objetivo sin crear riesgo operativo?',
  },
  'compute:2': {
    focus: 'Elegir vCPU/memoria con métricas de carga, no por intuición.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Tipos de instancias y tamaños» para una aplicación de tres capas que requiere controles auditables. Elegir vCPU/memoria con métricas de carga, no por intuición. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Provisionar un servidor de forma segura y verificar su funcionamiento.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Tipos de instancias y tamaños» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Tipos de instancias y tamaños» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Tipos de instancias y tamaños» cumple el objetivo sin crear riesgo operativo?',
  },
  'compute:3': {
    focus: 'Decidir persistencia y probar restauración del volumen sin depender del host.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Discos, snapshots y usuario de arranque» para una aplicación de tres capas que requiere controles auditables. Decidir persistencia y probar restauración del volumen sin depender del host. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Provisionar un servidor de forma segura y verificar su funcionamiento.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Discos, snapshots y usuario de arranque» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Discos, snapshots y usuario de arranque» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Discos, snapshots y usuario de arranque» cumple el objetivo sin crear riesgo operativo?',
  },
  'compute:4': {
    focus: 'Implementar mínimo dos réplicas y health check antes de hablar de alta disponibilidad.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Disponibilidad y escalamiento básico» para una aplicación de tres capas que requiere controles auditables. Implementar mínimo dos réplicas y health check antes de hablar de alta disponibilidad. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Provisionar un servidor de forma segura y verificar su funcionamiento.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Disponibilidad y escalamiento básico» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Disponibilidad y escalamiento básico» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Disponibilidad y escalamiento básico» cumple el objetivo sin crear riesgo operativo?',
  },
  'storage:0': {
    focus: 'Distinguir semánticas de objeto, volumen de bloques y sistema POSIX compartido.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Object, block y file storage» para una aplicación de tres capas que requiere controles auditables. Distinguir semánticas de objeto, volumen de bloques y sistema POSIX compartido. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Seleccionar almacenamiento según el uso y configurar protección de datos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Object, block y file storage» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Object, block y file storage» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Object, block y file storage» cumple el objetivo sin crear riesgo operativo?',
  },
  'storage:1': {
    focus: 'Diseñar bucket privado, políticas de acceso y nombres/ubicación sin exponer contenido.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Buckets y contenedores de objetos» para una aplicación de tres capas que requiere controles auditables. Diseñar bucket privado, políticas de acceso y nombres/ubicación sin exponer contenido. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Seleccionar almacenamiento según el uso y configurar protección de datos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Buckets y contenedores de objetos» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Buckets y contenedores de objetos» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Buckets y contenedores de objetos» cumple el objetivo sin crear riesgo operativo?',
  },
  'storage:2': {
    focus:
      'Seleccionar cifrado, versionado, retención y políticas de lifecycle con prueba de recuperación.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Cifrado y ciclo de vida» para una aplicación de tres capas que requiere controles auditables. Seleccionar cifrado, versionado, retención y políticas de lifecycle con prueba de recuperación. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Seleccionar almacenamiento según el uso y configurar protección de datos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Cifrado y ciclo de vida» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Cifrado y ciclo de vida» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Cifrado y ciclo de vida» cumple el objetivo sin crear riesgo operativo?',
  },
  'storage:3': {
    focus: 'Escoger PostgreSQL administrado, red privada, rotación de secreto y backups.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Bases de datos SQL administradas» para una aplicación de tres capas que requiere controles auditables. Escoger PostgreSQL administrado, red privada, rotación de secreto y backups. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Seleccionar almacenamiento según el uso y configurar protección de datos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Bases de datos SQL administradas» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Bases de datos SQL administradas» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Bases de datos SQL administradas» cumple el objetivo sin crear riesgo operativo?',
  },
  'storage:4': {
    focus: 'Hacer restore drill, medir RTO y comprobar integridad de los datos recuperados.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Backup y restauración» para una aplicación de tres capas que requiere controles auditables. Hacer restore drill, medir RTO y comprobar integridad de los datos recuperados. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Seleccionar almacenamiento según el uso y configurar protección de datos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Backup y restauración» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Backup y restauración» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Backup y restauración» cumple el objetivo sin crear riesgo operativo?',
  },
  'identity:0': {
    focus: 'Construir matriz de responsabilidad cliente/proveedor por servicio y tipo de dato.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Responsabilidad compartida» para una aplicación de tres capas que requiere controles auditables. Construir matriz de responsabilidad cliente/proveedor por servicio y tipo de dato. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Aplicar mínimo privilegio e identificar permisos excesivos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Responsabilidad compartida» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Responsabilidad compartida» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Responsabilidad compartida» cumple el objetivo sin crear riesgo operativo?',
  },
  'identity:1': {
    focus: 'Modelar principal, recurso, acción, condición y efecto de una política.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Usuarios, grupos, roles y políticas» para una aplicación de tres capas que requiere controles auditables. Modelar principal, recurso, acción, condición y efecto de una política. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Aplicar mínimo privilegio e identificar permisos excesivos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Usuarios, grupos, roles y políticas» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Usuarios, grupos, roles y políticas» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Usuarios, grupos, roles y políticas» cumple el objetivo sin crear riesgo operativo?',
  },
  'identity:2': {
    focus:
      'Definir MFA para humanos y credenciales temporales para máquinas, con mínimo privilegio.',
    exercise:
      'Situación: el equipo debe trabajar sobre «MFA y mínimo privilegio» para una aplicación de tres capas que requiere controles auditables. Definir MFA para humanos y credenciales temporales para máquinas, con mínimo privilegio. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Aplicar mínimo privilegio e identificar permisos excesivos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «MFA y mínimo privilegio» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «MFA y mínimo privilegio» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «MFA y mínimo privilegio» cumple el objetivo sin crear riesgo operativo?',
  },
  'identity:3': {
    focus: 'Separar cifrado en tránsito/reposo de custodia de claves y rotación de secretos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Cifrado, claves y secretos» para una aplicación de tres capas que requiere controles auditables. Separar cifrado en tránsito/reposo de custodia de claves y rotación de secretos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Aplicar mínimo privilegio e identificar permisos excesivos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Cifrado, claves y secretos» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Cifrado, claves y secretos» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Cifrado, claves y secretos» cumple el objetivo sin crear riesgo operativo?',
  },
  'identity:4': {
    focus: 'Rastrear quién hizo qué sobre cuál recurso y conservar evidencias auditables.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Auditoría y acceso seguro» para una aplicación de tres capas que requiere controles auditables. Rastrear quién hizo qué sobre cuál recurso y conservar evidencias auditables. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Aplicar mínimo privilegio e identificar permisos excesivos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Auditoría y acceso seguro» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Auditoría y acceso seguro» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Auditoría y acceso seguro» cumple el objetivo sin crear riesgo operativo?',
  },
  'costs:0': {
    focus:
      'Enumerar dimensiones de cobro: tiempo, solicitudes, almacenamiento, red y servicios auxiliares.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Precios y modelos de cobro» para una aplicación de tres capas que requiere controles auditables. Enumerar dimensiones de cobro: tiempo, solicitudes, almacenamiento, red y servicios auxiliares. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Desplegar un recurso controlando costos y eliminarlo correctamente.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Precios y modelos de cobro» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Precios y modelos de cobro» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Precios y modelos de cobro» cumple el objetivo sin crear riesgo operativo?',
  },
  'costs:1': {
    focus: 'Crear alertas por umbral y comprobar periodicidad/retardo de reportes de gasto.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Presupuestos y alertas» para una aplicación de tres capas que requiere controles auditables. Crear alertas por umbral y comprobar periodicidad/retardo de reportes de gasto. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Desplegar un recurso controlando costos y eliminarlo correctamente.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Presupuestos y alertas» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Presupuestos y alertas» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Presupuestos y alertas» cumple el objetivo sin crear riesgo operativo?',
  },
  'costs:2': {
    focus: 'Diseñar etiquetas owner, environment y cost-center para asignación de gasto.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Etiquetas de costo y ownership» para una aplicación de tres capas que requiere controles auditables. Diseñar etiquetas owner, environment y cost-center para asignación de gasto. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Desplegar un recurso controlando costos y eliminarlo correctamente.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Etiquetas de costo y ownership» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Etiquetas de costo y ownership» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Etiquetas de costo y ownership» cumple el objetivo sin crear riesgo operativo?',
  },
  'costs:3': {
    focus: 'Publicar sitio estático privado/público según necesidad, controlar CDN y cache.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Despliegue de una página estática» para una aplicación de tres capas que requiere controles auditables. Publicar sitio estático privado/público según necesidad, controlar CDN y cache. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Desplegar un recurso controlando costos y eliminarlo correctamente.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Despliegue de una página estática» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Despliegue de una página estática» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Despliegue de una página estática» cumple el objetivo sin crear riesgo operativo?',
  },
  'costs:4': {
    focus: 'Eliminar recursos en orden de dependencias y comprobar facturación residual posterior.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Cleanup y comprobación final» para una aplicación de tres capas que requiere controles auditables. Eliminar recursos en orden de dependencias y comprobar facturación residual posterior. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Desplegar un recurso controlando costos y eliminarlo correctamente.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Cleanup y comprobación final» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Cleanup y comprobación final» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Cleanup y comprobación final» cumple el objetivo sin crear riesgo operativo?',
  },
  'cloud-cli:0': {
    focus: 'Inspeccionar versión, autenticación y ayuda de los comandos de AWS, Azure y GCP.',
    exercise:
      'Situación: el equipo debe trabajar sobre «CLI de AWS, Azure y GCP» para una aplicación de tres capas que requiere controles auditables. Inspeccionar versión, autenticación y ayuda de los comandos de AWS, Azure y GCP. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Automatizar tareas cloud sin exponer secretos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «CLI de AWS, Azure y GCP» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «CLI de AWS, Azure y GCP» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «CLI de AWS, Azure y GCP» cumple el objetivo sin crear riesgo operativo?',
  },
  'cloud-cli:1': {
    focus: 'Imprimir contexto activo y evitar operaciones cruzadas entre ambientes.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Perfiles, cuentas y contexto» para una aplicación de tres capas que requiere controles auditables. Imprimir contexto activo y evitar operaciones cruzadas entre ambientes. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Automatizar tareas cloud sin exponer secretos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Perfiles, cuentas y contexto» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Perfiles, cuentas y contexto» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Perfiles, cuentas y contexto» cumple el objetivo sin crear riesgo operativo?',
  },
  'cloud-cli:2': {
    focus: 'Escribir scripts bash con set -euo pipefail, parámetros y operaciones idempotentes.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Bash y scripting seguro» para una aplicación de tres capas que requiere controles auditables. Escribir scripts bash con set -euo pipefail, parámetros y operaciones idempotentes. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Automatizar tareas cloud sin exponer secretos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Bash y scripting seguro» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Bash y scripting seguro» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Bash y scripting seguro» cumple el objetivo sin crear riesgo operativo?',
  },
  'cloud-cli:3': {
    focus: 'Evitar imprimir secretos y preferir federación OIDC y sesiones temporales.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Variables de entorno y credenciales» para una aplicación de tres capas que requiere controles auditables. Evitar imprimir secretos y preferir federación OIDC y sesiones temporales. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Automatizar tareas cloud sin exponer secretos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Variables de entorno y credenciales» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Variables de entorno y credenciales» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Variables de entorno y credenciales» cumple el objetivo sin crear riesgo operativo?',
  },
  'cloud-cli:4': {
    focus: 'Programar inventario de recursos con salida reproducible y ejecución auditable.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Automatización de tareas repetibles» para una aplicación de tres capas que requiere controles auditables. Programar inventario de recursos con salida reproducible y ejecución auditable. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Automatizar tareas cloud sin exponer secretos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Automatización de tareas repetibles» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Automatización de tareas repetibles» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Automatización de tareas repetibles» cumple el objetivo sin crear riesgo operativo?',
  },
  'advanced-network:0': {
    focus: 'Simular tabla de rutas y NAT de salida, diferenciando retorno de tráfico.',
    exercise:
      'Situación: el equipo debe trabajar sobre «NAT y rutas avanzadas» para una aplicación de tres capas que requiere controles auditables. Simular tabla de rutas y NAT de salida, diferenciando retorno de tráfico. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar conectividad privada y resiliente para servicios de negocio.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «NAT y rutas avanzadas» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «NAT y rutas avanzadas» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «NAT y rutas avanzadas» cumple el objetivo sin crear riesgo operativo?',
  },
  'advanced-network:1': {
    focus: 'Describir health checks y política de backends antes de exponer un balanceador.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Load balancers y health checks» para una aplicación de tres capas que requiere controles auditables. Describir health checks y política de backends antes de exponer un balanceador. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar conectividad privada y resiliente para servicios de negocio.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Load balancers y health checks» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Load balancers y health checks» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Load balancers y health checks» cumple el objetivo sin crear riesgo operativo?',
  },
  'advanced-network:2': {
    focus: 'Documentar CIDR remotos, criptografía de túnel, rutas y dependencias híbridas.',
    exercise:
      'Situación: el equipo debe trabajar sobre «VPN y conectividad híbrida» para una aplicación de tres capas que requiere controles auditables. Documentar CIDR remotos, criptografía de túnel, rutas y dependencias híbridas. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar conectividad privada y resiliente para servicios de negocio.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «VPN y conectividad híbrida» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «VPN y conectividad híbrida» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «VPN y conectividad híbrida» cumple el objetivo sin crear riesgo operativo?',
  },
  'advanced-network:3': {
    focus: 'Resolver split-horizon DNS, endpoints privados y reglas de acceso efectivas.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Private endpoints y DNS» para una aplicación de tres capas que requiere controles auditables. Resolver split-horizon DNS, endpoints privados y reglas de acceso efectivas. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar conectividad privada y resiliente para servicios de negocio.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Private endpoints y DNS» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Private endpoints y DNS» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Private endpoints y DNS» cumple el objetivo sin crear riesgo operativo?',
  },
  'advanced-network:4': {
    focus: 'Presentar esquema navegador → LB → API privada → BD, incluyendo TLS por salto.',
    exercise:
      'Situación: el equipo debe trabajar sobre «TLS y arquitecturas de tres capas» para una aplicación de tres capas que requiere controles auditables. Presentar esquema navegador → LB → API privada → BD, incluyendo TLS por salto. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar conectividad privada y resiliente para servicios de negocio.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «TLS y arquitecturas de tres capas» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «TLS y arquitecturas de tres capas» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «TLS y arquitecturas de tres capas» cumple el objetivo sin crear riesgo operativo?',
  },
  'serverless:0': {
    focus: 'Elegir runtime, límites de memoria/concurrencia y timeout a partir de objetivos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Funciones y runtimes» para una aplicación de tres capas que requiere controles auditables. Elegir runtime, límites de memoria/concurrencia y timeout a partir de objetivos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una API serverless con reintentos controlados.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Funciones y runtimes» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Funciones y runtimes» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Funciones y runtimes» cumple el objetivo sin crear riesgo operativo?',
  },
  'serverless:1': {
    focus: 'Diseñar contrato HTTP, códigos de error, autenticación y throttling.',
    exercise:
      'Situación: el equipo debe trabajar sobre «APIs y puertas de enlace» para una aplicación de tres capas que requiere controles auditables. Diseñar contrato HTTP, códigos de error, autenticación y throttling. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una API serverless con reintentos controlados.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «APIs y puertas de enlace» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «APIs y puertas de enlace» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «APIs y puertas de enlace» cumple el objetivo sin crear riesgo operativo?',
  },
  'serverless:2': {
    focus: 'Planificar reintentos con backoff, visibilidad de cola y entregas duplicadas.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Eventos, colas y reintentos» para una aplicación de tres capas que requiere controles auditables. Planificar reintentos con backoff, visibilidad de cola y entregas duplicadas. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una API serverless con reintentos controlados.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Eventos, colas y reintentos» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Eventos, colas y reintentos» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Eventos, colas y reintentos» cumple el objetivo sin crear riesgo operativo?',
  },
  'serverless:3': {
    focus: 'Aplicar idempotency key, deduplicación y envío a DLQ tras reintentos agotados.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Idempotencia y DLQ» para una aplicación de tres capas que requiere controles auditables. Aplicar idempotency key, deduplicación y envío a DLQ tras reintentos agotados. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una API serverless con reintentos controlados.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Idempotencia y DLQ» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Idempotencia y DLQ» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Idempotencia y DLQ» cumple el objetivo sin crear riesgo operativo?',
  },
  'serverless:4': {
    focus: 'Configurar conexión mínima a datos con timeout y pooling para evitar saturación.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Integración con datos administrados» para una aplicación de tres capas que requiere controles auditables. Configurar conexión mínima a datos con timeout y pooling para evitar saturación. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una API serverless con reintentos controlados.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Integración con datos administrados» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Integración con datos administrados» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Integración con datos administrados» cumple el objetivo sin crear riesgo operativo?',
  },
  'containers:0': {
    focus: 'Construir imagen multi-stage con usuario no root, caché y mínimo tamaño.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Dockerfiles y capas» para una aplicación de tres capas que requiere controles auditables. Construir imagen multi-stage con usuario no root, caché y mínimo tamaño. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Contenerizar y desplegar una aplicación con controles básicos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Dockerfiles y capas» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Dockerfiles y capas» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Dockerfiles y capas» cumple el objetivo sin crear riesgo operativo?',
  },
  'containers:1': {
    focus: 'Firmar o fijar digest y escanear la imagen antes de publicarla.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Registry y seguridad de imágenes» para una aplicación de tres capas que requiere controles auditables. Firmar o fijar digest y escanear la imagen antes de publicarla. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Contenerizar y desplegar una aplicación con controles básicos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Registry y seguridad de imágenes» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Registry y seguridad de imágenes» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Registry y seguridad de imágenes» cumple el objetivo sin crear riesgo operativo?',
  },
  'containers:2': {
    focus: 'Escribir Deployment con probes, requests/limits y Service interno.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Pods, Deployments y Services» para una aplicación de tres capas que requiere controles auditables. Escribir Deployment con probes, requests/limits y Service interno. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Contenerizar y desplegar una aplicación con controles básicos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Pods, Deployments y Services» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Pods, Deployments y Services» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Pods, Deployments y Services» cumple el objetivo sin crear riesgo operativo?',
  },
  'containers:3': {
    focus: 'Comparar responsabilidades operativas de EKS, AKS y GKE por modo de nodos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «EKS, AKS y GKE» para una aplicación de tres capas que requiere controles auditables. Comparar responsabilidades operativas de EKS, AKS y GKE por modo de nodos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Contenerizar y desplegar una aplicación con controles básicos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «EKS, AKS y GKE» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «EKS, AKS y GKE» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «EKS, AKS y GKE» cumple el objetivo sin crear riesgo operativo?',
  },
  'containers:4': {
    focus: 'Crear estrategia rolling y comprobar HPA con métricas y límites del backend.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Autoscaling y rollout seguro» para una aplicación de tres capas que requiere controles auditables. Crear estrategia rolling y comprobar HPA con métricas y límites del backend. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Contenerizar y desplegar una aplicación con controles básicos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Autoscaling y rollout seguro» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Autoscaling y rollout seguro» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Autoscaling y rollout seguro» cumple el objetivo sin crear riesgo operativo?',
  },
  'iac:0': {
    focus: 'Explicar providers, resources, data sources y variables con un plan sin apply.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Terraform providers, recursos y variables» para una aplicación de tres capas que requiere controles auditables. Explicar providers, resources, data sources y variables con un plan sin apply. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Versionar infraestructura y revisar los planes antes de aplicarlos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Terraform providers, recursos y variables» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Terraform providers, recursos y variables» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Terraform providers, recursos y variables» cumple el objetivo sin crear riesgo operativo?',
  },
  'iac:1': {
    focus: 'Restringir acceso al state, cifrarlo, bloquear concurrencia y separar entornos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «State remoto y locking» para una aplicación de tres capas que requiere controles auditables. Restringir acceso al state, cifrarlo, bloquear concurrencia y separar entornos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Versionar infraestructura y revisar los planes antes de aplicarlos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «State remoto y locking» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «State remoto y locking» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «State remoto y locking» cumple el objetivo sin crear riesgo operativo?',
  },
  'iac:2': {
    focus: 'Diferenciar refresh, drift, plan y apply; interpretar cambios destructivos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Plan, apply y drift» para una aplicación de tres capas que requiere controles auditables. Diferenciar refresh, drift, plan y apply; interpretar cambios destructivos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Versionar infraestructura y revisar los planes antes de aplicarlos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Plan, apply y drift» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Plan, apply y drift» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Plan, apply y drift» cumple el objetivo sin crear riesgo operativo?',
  },
  'iac:3': {
    focus: 'Extraer módulos versionados con inputs, outputs, validaciones y tests.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Módulos y ambientes» para una aplicación de tres capas que requiere controles auditables. Extraer módulos versionados con inputs, outputs, validaciones y tests. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Versionar infraestructura y revisar los planes antes de aplicarlos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Módulos y ambientes» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Módulos y ambientes» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Módulos y ambientes» cumple el objetivo sin crear riesgo operativo?',
  },
  'iac:4': {
    focus: 'Aprobar o bloquear PR según blast radius, force replacement, backup y rollback.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Revisión de cambios destructivos» para una aplicación de tres capas que requiere controles auditables. Aprobar o bloquear PR según blast radius, force replacement, backup y rollback. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Versionar infraestructura y revisar los planes antes de aplicarlos.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Revisión de cambios destructivos» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Revisión de cambios destructivos» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Revisión de cambios destructivos» cumple el objetivo sin crear riesgo operativo?',
  },
  'observability:0': {
    focus: 'Elegir estrategia de ramas y revisiones para cambios de infraestructura.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Git y ramas de integración» para una aplicación de tres capas que requiere controles auditables. Elegir estrategia de ramas y revisiones para cambios de infraestructura. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Entregar una aplicación con pipeline y señales de salud verificables.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Git y ramas de integración» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Git y ramas de integración» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Git y ramas de integración» cumple el objetivo sin crear riesgo operativo?',
  },
  'observability:1': {
    focus: 'Usar OIDC de corta duración, permisos específicos y checks obligatorios en CI.',
    exercise:
      'Situación: el equipo debe trabajar sobre «GitHub Actions y OIDC» para una aplicación de tres capas que requiere controles auditables. Usar OIDC de corta duración, permisos específicos y checks obligatorios en CI. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Entregar una aplicación con pipeline y señales de salud verificables.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «GitHub Actions y OIDC» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «GitHub Actions y OIDC» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «GitHub Actions y OIDC» cumple el objetivo sin crear riesgo operativo?',
  },
  'observability:2': {
    focus: 'Correlacionar un traceId con latencia p99, logs estructurados y métricas RED.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Logs, métricas y trazas» para una aplicación de tres capas que requiere controles auditables. Correlacionar un traceId con latencia p99, logs estructurados y métricas RED. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Entregar una aplicación con pipeline y señales de salud verificables.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Logs, métricas y trazas» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Logs, métricas y trazas» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Logs, métricas y trazas» cumple el objetivo sin crear riesgo operativo?',
  },
  'observability:3': {
    focus: 'Elegir alertas accionables con umbrales y objetivos de SLO, evitando ruido.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Alertas y dashboards» para una aplicación de tres capas que requiere controles auditables. Elegir alertas accionables con umbrales y objetivos de SLO, evitando ruido. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Entregar una aplicación con pipeline y señales de salud verificables.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Alertas y dashboards» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Alertas y dashboards» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Alertas y dashboards» cumple el objetivo sin crear riesgo operativo?',
  },
  'observability:4': {
    focus: 'Entregar API + datos + observabilidad con verificaciones de salud y rollback.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Proyecto: aplicación de varias capas» para una aplicación de tres capas que requiere controles auditables. Entregar API + datos + observabilidad con verificaciones de salud y rollback. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Entregar una aplicación con pipeline y señales de salud verificables.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Proyecto: aplicación de varias capas» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Proyecto: aplicación de varias capas» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Proyecto: aplicación de varias capas» cumple el objetivo sin crear riesgo operativo?',
  },
  'software-architecture:0': {
    focus:
      'Comparar monolito modular con microservicios mediante independencia de equipos y coste.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Monolito modular vs microservicios» para una aplicación de tres capas que requiere controles auditables. Comparar monolito modular con microservicios mediante independencia de equipos y coste. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Justificar una arquitectura en función de requisitos y trade-offs.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Monolito modular vs microservicios» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Monolito modular vs microservicios» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Monolito modular vs microservicios» cumple el objetivo sin crear riesgo operativo?',
  },
  'software-architecture:1': {
    focus: 'Explicar retry, timeout, circuit breaker, bulkhead y fallos parciales.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Patrones distribuidos» para una aplicación de tres capas que requiere controles auditables. Explicar retry, timeout, circuit breaker, bulkhead y fallos parciales. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Justificar una arquitectura en función de requisitos y trade-offs.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Patrones distribuidos» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Patrones distribuidos» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Patrones distribuidos» cumple el objetivo sin crear riesgo operativo?',
  },
  'software-architecture:2': {
    focus: 'Distinguir delivery at-least-once y consistencia eventual con invariantes de negocio.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Event-driven y consistencia» para una aplicación de tres capas que requiere controles auditables. Distinguir delivery at-least-once y consistencia eventual con invariantes de negocio. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Justificar una arquitectura en función de requisitos y trade-offs.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Event-driven y consistencia» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Event-driven y consistencia» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Event-driven y consistencia» cumple el objetivo sin crear riesgo operativo?',
  },
  'software-architecture:3': {
    focus: 'Establecer contrato API, presupuesto de latencia y política de degradación.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Contratos, latencia y fallos parciales» para una aplicación de tres capas que requiere controles auditables. Establecer contrato API, presupuesto de latencia y política de degradación. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Justificar una arquitectura en función de requisitos y trade-offs.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Contratos, latencia y fallos parciales» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Contratos, latencia y fallos parciales» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Contratos, latencia y fallos parciales» cumple el objetivo sin crear riesgo operativo?',
  },
  'software-architecture:4': {
    focus: 'Redactar ADR con contexto, alternativas, decisión, consecuencias y revisiones.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Architecture Decision Records» para una aplicación de tres capas que requiere controles auditables. Redactar ADR con contexto, alternativas, decisión, consecuencias y revisiones. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Justificar una arquitectura en función de requisitos y trade-offs.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Architecture Decision Records» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Architecture Decision Records» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Architecture Decision Records» cumple el objetivo sin crear riesgo operativo?',
  },
  'governance:0': {
    focus: 'Diseñar landing zone con auditoría, red, identidad y logging centralizados.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Landing zones y organización» para una aplicación de tres capas que requiere controles auditables. Diseñar landing zone con auditoría, red, identidad y logging centralizados. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Definir controles preventivos y detectivos para una organización.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Landing zones y organización» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Landing zones y organización» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Landing zones y organización» cumple el objetivo sin crear riesgo operativo?',
  },
  'governance:1': {
    focus: 'Separar ambientes y equipos en estructura de cuentas/suscripciones/proyectos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Políticas, cuentas y jerarquía» para una aplicación de tres capas que requiere controles auditables. Separar ambientes y equipos en estructura de cuentas/suscripciones/proyectos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Definir controles preventivos y detectivos para una organización.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Políticas, cuentas y jerarquía» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Políticas, cuentas y jerarquía» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Políticas, cuentas y jerarquía» cumple el objetivo sin crear riesgo operativo?',
  },
  'governance:2': {
    focus: 'Revisar amenazas de identidad, red y datos bajo enfoque Zero Trust.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Zero Trust y segmentación» para una aplicación de tres capas que requiere controles auditables. Revisar amenazas de identidad, red y datos bajo enfoque Zero Trust. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Definir controles preventivos y detectivos para una organización.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Zero Trust y segmentación» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Zero Trust y segmentación» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Zero Trust y segmentación» cumple el objetivo sin crear riesgo operativo?',
  },
  'governance:3': {
    focus: 'Definir custodia de claves y políticas de acceso y trazabilidad de secretos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «KMS, secretos y auditoría» para una aplicación de tres capas que requiere controles auditables. Definir custodia de claves y políticas de acceso y trazabilidad de secretos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Definir controles preventivos y detectivos para una organización.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «KMS, secretos y auditoría» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «KMS, secretos y auditoría» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «KMS, secretos y auditoría» cumple el objetivo sin crear riesgo operativo?',
  },
  'governance:4': {
    focus: 'Hacer threat model con activos, fronteras de confianza, mitigaciones y pruebas.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Compliance y threat modeling» para una aplicación de tres capas que requiere controles auditables. Hacer threat model con activos, fronteras de confianza, mitigaciones y pruebas. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Definir controles preventivos y detectivos para una organización.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Compliance y threat modeling» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Compliance y threat modeling» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Compliance y threat modeling» cumple el objetivo sin crear riesgo operativo?',
  },
  'resilience:0': {
    focus: 'Convertir impacto de negocio en objetivos medibles RTO y RPO.',
    exercise:
      'Situación: el equipo debe trabajar sobre «RTO y RPO» para una aplicación de tres capas que requiere controles auditables. Convertir impacto de negocio en objetivos medibles RTO y RPO. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una estrategia de continuidad con objetivos comprobables.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «RTO y RPO» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «RTO y RPO» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «RTO y RPO» cumple el objetivo sin crear riesgo operativo?',
  },
  'resilience:1': {
    focus: 'Comparar zonas/regiones y medir diferencias reales de tiempo/costo.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Multi-AZ y multi-región» para una aplicación de tres capas que requiere controles auditables. Comparar zonas/regiones y medir diferencias reales de tiempo/costo. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una estrategia de continuidad con objetivos comprobables.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Multi-AZ y multi-región» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Multi-AZ y multi-región» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Multi-AZ y multi-región» cumple el objetivo sin crear riesgo operativo?',
  },
  'resilience:2': {
    focus: 'Diseñar replicación, quórum, lag y failover con validación de consistencia.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Failover y replicación» para una aplicación de tres capas que requiere controles auditables. Diseñar replicación, quórum, lag y failover con validación de consistencia. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una estrategia de continuidad con objetivos comprobables.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Failover y replicación» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Failover y replicación» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Failover y replicación» cumple el objetivo sin crear riesgo operativo?',
  },
  'resilience:3': {
    focus: 'Ejecutar game day seguro con hipótesis y mecanismo de parada.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Chaos testing y game days» para una aplicación de tres capas que requiere controles auditables. Ejecutar game day seguro con hipótesis y mecanismo de parada. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una estrategia de continuidad con objetivos comprobables.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Chaos testing y game days» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Chaos testing y game days» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Chaos testing y game days» cumple el objetivo sin crear riesgo operativo?',
  },
  'resilience:4': {
    focus: 'Documentar runbook completo con responsables, pruebas y hora de recuperación.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Runbooks y ejercicios DR» para una aplicación de tres capas que requiere controles auditables. Documentar runbook completo con responsables, pruebas y hora de recuperación. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Diseñar una estrategia de continuidad con objetivos comprobables.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Runbooks y ejercicios DR» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Runbooks y ejercicios DR» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Runbooks y ejercicios DR» cumple el objetivo sin crear riesgo operativo?',
  },
  'data-architecture:0': {
    focus: 'Seleccionar SQL/NoSQL según patrones de consulta, transacciones y evolución.',
    exercise:
      'Situación: el equipo debe trabajar sobre «SQL y NoSQL con trade-offs» para una aplicación de tres capas que requiere controles auditables. Seleccionar SQL/NoSQL según patrones de consulta, transacciones y evolución. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Escoger patrones de datos y diseñar integraciones resilientes.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «SQL y NoSQL con trade-offs» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «SQL y NoSQL con trade-offs» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «SQL y NoSQL con trade-offs» cumple el objetivo sin crear riesgo operativo?',
  },
  'data-architecture:1': {
    focus: 'Comparar caché write-through/cache-aside y políticas de invalidación.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Cachés y consistencia» para una aplicación de tres capas que requiere controles auditables. Comparar caché write-through/cache-aside y políticas de invalidación. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Escoger patrones de datos y diseñar integraciones resilientes.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Cachés y consistencia» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Cachés y consistencia» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Cachés y consistencia» cumple el objetivo sin crear riesgo operativo?',
  },
  'data-architecture:2': {
    focus: 'Diseñar colas y streams con orden, reintentos, idempotencia y DLQ.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Mensajería y streaming» para una aplicación de tres capas que requiere controles auditables. Diseñar colas y streams con orden, reintentos, idempotencia y DLQ. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Escoger patrones de datos y diseñar integraciones resilientes.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Mensajería y streaming» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Mensajería y streaming» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Mensajería y streaming» cumple el objetivo sin crear riesgo operativo?',
  },
  'data-architecture:3': {
    focus: 'Separar ingesta, lake y consumo; gestionar esquemas y calidad de datos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Data lakes y pipelines» para una aplicación de tres capas que requiere controles auditables. Separar ingesta, lake y consumo; gestionar esquemas y calidad de datos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Escoger patrones de datos y diseñar integraciones resilientes.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Data lakes y pipelines» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Data lakes y pipelines» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Data lakes y pipelines» cumple el objetivo sin crear riesgo operativo?',
  },
  'data-architecture:4': {
    focus: 'Aplicar clasificación, retención, acceso, residencia y cifrado de datos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Gobernanza y seguridad de datos» para una aplicación de tres capas que requiere controles auditables. Aplicar clasificación, retención, acceso, residencia y cifrado de datos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Escoger patrones de datos y diseñar integraciones resilientes.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Gobernanza y seguridad de datos» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Gobernanza y seguridad de datos» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Gobernanza y seguridad de datos» cumple el objetivo sin crear riesgo operativo?',
  },
  'sre-finops:0': {
    focus: 'Definir SLI de éxito y latencia, ventana SLO y burn-rate.',
    exercise:
      'Situación: el equipo debe trabajar sobre «SLI, SLO y error budgets» para una aplicación de tres capas que requiere controles auditables. Definir SLI de éxito y latencia, ventana SLO y burn-rate. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Operar servicios conforme a SLO y optimizar costos sin dañar la fiabilidad.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «SLI, SLO y error budgets» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «SLI, SLO y error budgets» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «SLI, SLO y error budgets» cumple el objetivo sin crear riesgo operativo?',
  },
  'sre-finops:1': {
    focus: 'Usar severidad, roles, timeline, comunicación y postmortem sin culpables.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Gestión de incidentes y postmortems» para una aplicación de tres capas que requiere controles auditables. Usar severidad, roles, timeline, comunicación y postmortem sin culpables. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Operar servicios conforme a SLO y optimizar costos sin dañar la fiabilidad.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Gestión de incidentes y postmortems» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Gestión de incidentes y postmortems» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Gestión de incidentes y postmortems» cumple el objetivo sin crear riesgo operativo?',
  },
  'sre-finops:2': {
    focus: 'Ofrecer camino de despliegue autoservicio con guardrails y GitOps.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Platform Engineering y GitOps» para una aplicación de tres capas que requiere controles auditables. Ofrecer camino de despliegue autoservicio con guardrails y GitOps. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Operar servicios conforme a SLO y optimizar costos sin dañar la fiabilidad.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Platform Engineering y GitOps» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Platform Engineering y GitOps» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Platform Engineering y GitOps» cumple el objetivo sin crear riesgo operativo?',
  },
  'sre-finops:3': {
    focus: 'Diseñar trazas, métricas de saturación y alarmas de causa/impacto.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Observabilidad avanzada» para una aplicación de tres capas que requiere controles auditables. Diseñar trazas, métricas de saturación y alarmas de causa/impacto. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Operar servicios conforme a SLO y optimizar costos sin dañar la fiabilidad.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Observabilidad avanzada» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Observabilidad avanzada» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Observabilidad avanzada» cumple el objetivo sin crear riesgo operativo?',
  },
  'sre-finops:4': {
    focus: 'Medir coste por transacción, reservas y rightsizing sin degradar SLO.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Optimización, reservas y costos unitarios» para una aplicación de tres capas que requiere controles auditables. Medir coste por transacción, reservas y rightsizing sin degradar SLO. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Operar servicios conforme a SLO y optimizar costos sin dañar la fiabilidad.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Optimización, reservas y costos unitarios» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Optimización, reservas y costos unitarios» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Optimización, reservas y costos unitarios» cumple el objetivo sin crear riesgo operativo?',
  },
  'capstone:0': {
    focus: 'Convertir requisitos funcionales y no funcionales en criterios medibles.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Requisitos funcionales y no funcionales» para una aplicación de tres capas que requiere controles auditables. Convertir requisitos funcionales y no funcionales en criterios medibles. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Defender una arquitectura ante evaluación técnica y económica.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Requisitos funcionales y no funcionales» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Requisitos funcionales y no funcionales» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Requisitos funcionales y no funcionales» cumple el objetivo sin crear riesgo operativo?',
  },
  'capstone:1': {
    focus: 'Dibujar flujo y trust boundaries, asociando amenazas a mitigaciones.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Diseño y threat model» para una aplicación de tres capas que requiere controles auditables. Dibujar flujo y trust boundaries, asociando amenazas a mitigaciones. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Defender una arquitectura ante evaluación técnica y económica.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Diseño y threat model» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Diseño y threat model» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Diseño y threat model» cumple el objetivo sin crear riesgo operativo?',
  },
  'capstone:2': {
    focus: 'Describir pipeline IaC, pruebas, deploy, rollback y telemetría de extremo a extremo.',
    exercise:
      'Situación: el equipo debe trabajar sobre «IaC, CI/CD y observabilidad» para una aplicación de tres capas que requiere controles auditables. Describir pipeline IaC, pruebas, deploy, rollback y telemetría de extremo a extremo. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Defender una arquitectura ante evaluación técnica y económica.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «IaC, CI/CD y observabilidad» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «IaC, CI/CD y observabilidad» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «IaC, CI/CD y observabilidad» cumple el objetivo sin crear riesgo operativo?',
  },
  'capstone:3': {
    focus: 'Ejecutar plan de carga y recuperación, estimar TCO con supuestos explícitos.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Pruebas, DR y estimación de costos» para una aplicación de tres capas que requiere controles auditables. Ejecutar plan de carga y recuperación, estimar TCO con supuestos explícitos. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Defender una arquitectura ante evaluación técnica y económica.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Pruebas, DR y estimación de costos» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Pruebas, DR y estimación de costos» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Pruebas, DR y estimación de costos» cumple el objetivo sin crear riesgo operativo?',
  },
  'capstone:4': {
    focus: 'Defender ADR con opciones, costos, riesgos, KPIs y evidencia comprobable.',
    exercise:
      'Situación: el equipo debe trabajar sobre «Defensa técnica y decisión multicloud» para una aplicación de tres capas que requiere controles auditables. Defender ADR con opciones, costos, riesgos, KPIs y evidencia comprobable. Entrega una decisión de ingeniería, un pequeño diagrama o manifiesto y una explicación del impacto.',
    verify:
      'Evidencia aceptable: configuración o pseudocódigo revisable, hipótesis explícitas, prueba negativa, criterio de reversión y relación con el resultado del módulo: Defender una arquitectura ante evaluación técnica y económica.',
    pitfalls: [
      'Evitar asumir que un recurso habilitado prueba que «Defensa técnica y decisión multicloud» funciona de extremo a extremo.',
      'No conceder permisos globales ni guardar credenciales en código, logs o capturas.',
      'No confundir una prueba de lectura con una validación de resiliencia o seguridad.',
    ],
    compare:
      'Compara cómo se aplica «Defensa técnica y decisión multicloud» en AWS, Azure y GCP: jerarquía de recursos, ámbito de la red, permisos, automatización, cuotas y facturación. No asumas equivalencia uno a uno.',
    question:
      '¿Qué evidencia demostraría que el diseño de «Defensa técnica y decisión multicloud» cumple el objetivo sin crear riesgo operativo?',
  },
};
