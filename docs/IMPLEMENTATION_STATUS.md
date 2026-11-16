# Estado de implementación: versión entregada

## Implementado en código fuente

- App shell y navegación por hash con Preact Signals.
- Tres temas por proveedor, tema claro/oscuro, mascota base aprobada y variantes gráficas.
- Inicio con hero, estadísticas, niveles, rutas y llamada a Senior Mode.
- 18 módulos y 90 unidades, seis módulos por nivel (60/80/100 horas curriculares proyectadas).
- Explicaciones conceptuales **por módulo**, texto de contexto **por tema**, ejemplos y servicios por nube.
- 18 autoevaluaciones distintas con explicación inmediata, registradas por proveedor.
- 18 laboratorios guiados con cinco controles, notas y enlaces/documentación propios de proveedor.
- Cuatro simuladores interactivos locales: CIDR IPv4, IAM educativo, capacidad por réplica, SLO/error budget.
- 18 escenarios Senior, con decisión, informe, rúbrica y registro local.
- Panel de progreso con export/import; URL selecciona la nube.
- Tres ejemplos iniciales Terraform para redes básicas.

## No implementado / no se debe afirmar como implementado

- 240 horas de contenido editorial desarrollado a nivel libro/curso: **solo existe el índice de 240 h y material introductorio por módulo**. La profundidad requerida para impartir 240 h completas es un proyecto editorial posterior.
- Sandbox cloud real, ejecutor de CLI/Terraform/Kubernetes en el navegador, comprobación efectiva de recursos y costes en tiempo real.
- Sistema multiusuario, SSO, backend, certificados oficiales, evaluaciones por instructor.
- Motor IAM real, simulador Kubernetes con procesos reales o ejecución de planes Terraform.
- Suite E2E de navegador automatizada o builds comprobados con npm en el entorno sin red.
- El selector de proveedor cambia visuales, comandos, servicios y enlaces; no cambia el universo completo de ejercicios a casos exclusivos de cada proveedor todavía.

## Calidad / siguiente gate

- Parser TSX: validado con TypeScript global disponible en el entorno de creación.
- Test de integridad de currículo: `npm test` (usa Node nativo, sin dependencias).
- Compilación real: ejecutar `npm install && npm run build` en un equipo con npm disponible.
- E2E: agregar Playwright, revisar móvil, dark/light y accesibilidad.
