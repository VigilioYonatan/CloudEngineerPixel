Característica: Proyectos integradores, página Acerca y Footer verificable, recuperación de rutas inválidas, onboarding y protección de borradores

  Escenario: F2-04 presenta los 3 proyectos integradores con rúbricas al 100 por ciento y exportador Markdown de ADR
    Dado el catálogo de proyectos en src/features/projects y el generador buildPortfolioAdrMarkdown
    Cuando se inspeccionan los 3 proyectos curriculares y se genera la plantilla Markdown para AWS
    Entonces existen Proyecto 1, Proyecto 2 y Proyecto 3 Capstone con rúbricas de 100 puntos y plantilla ADR descargable

  Escenario: F2-05 presenta la página /#/acerca con metodología, seguridad cloud, privacidad y no afiliación enlazadas desde el Footer
    Dado las secciones de src/features/about y el componente AppFooter
    Cuando se auditan los enlaces del pie de página y el contenido de las 4 secciones informativas
    Entonces AppFooter enlaza a Metodología, Seguridad Cloud, Privacidad y No afiliación y AboutPage expone límites honestos

  Escenario: F2-06 muestra RouteRecoveryState ante hashes inexistentes o parámetros inválidos sin perder proveedor ni progreso
    Dado el router mejorado en src/app/router.ts y el componente RouteRecoveryState
    Cuando se evalúan hashes rotos como aula inexistente, índice fuera de rango o caso Senior s99
    Entonces el router devuelve diagnósticos de recuperación accionables hacia Inicio o el catálogo correspondiente

  Escenario: F2-07 ofrece onboarding ligero en primera visita y reanuda exactamente la última unidad pendiente desde el Hero
    Dado el resolutor resolveResumeTarget y el componente FirstVisitOnboardingCard
    Cuando un alumno visita sin proveedor previo o registra avance parcial en una unidad específica
    Entonces el onboarding guía la elección inicial sin bloquear y el CTA reanuda la lección exacta pendiente

  Escenario: F2-08 autoguarda borradores en su scope original al cambiar de proveedor o ruta y protege importaciones en curso
    Dado el coordinador createContextSwitchCoordinator en src/lib/contextSwitchGuard.ts
    Cuando existe un borrador sucio en AWS o una importación activa y se solicita conmutar a Azure
    Entonces el borrador se persiste atómicamente en AWS sin contaminar Azure y la importación en vuelo exige confirmación
