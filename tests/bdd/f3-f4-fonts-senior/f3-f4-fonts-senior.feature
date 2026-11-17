# language: es
Característica: Tipografías WOFF2 auto-alojadas con CSP endurecida y Senior Mode con evidencias nativas 18x3, distractores SRE, timeline causal y CodeReviewLab (F3-11 y F4-01 a F4-04)
  Como ingeniero cloud en formación resolviendo incidentes de producción
  Quiero tipografías 100 por ciento locales sin llamadas a terceros y expedientes Senior con telemetría nativa por nube, ruido operativo realista, línea de tiempo cronológica e inspección de código línea por línea
  Para entrenar diagnóstico causal real bajo condiciones offline, seguras y específicas para AWS, Azure y Google Cloud

  Escenario: F3-11 Las tipografías DM Sans, Space Grotesk y JetBrains Mono se sirven en WOFF2 local sin referencias a Google Fonts ni dominios externos en CSP
    Dado los archivos binarios WOFF2 en public/fonts, index.html, public/_headers y src/design-system/fonts.css
    Cuando se verifican las cabeceras binarias wOF2, las declaraciones font-face y la política Content-Security-Policy
    Entonces existen los 6 archivos WOFF2 válidos con font-display swap y cero referencias a fonts.googleapis.com o fonts.gstatic.com en index.html y _headers

  Escenario: F4-01 Las 54 combinaciones de casos Senior (18 casos por 3 nubes) entregan evidencias, fuentes, timestamps y CLI nativos del proveedor elegido
    Dado el catálogo de investigación Senior en src/data/seniorInvestigations.ts y src/data/seniorProviderExhibits.ts
    Cuando se consulta investigationFor para los 18 casos s01 a s18 en AWS, Azure y GCP
    Entonces las 54 combinaciones entregan evidenceId, timestamp ISO, fuente de auditoría nativa, artefactos diferenciados por proveedor y comando específico del caso

  Escenario: F4-02 Cada expediente Senior incorpora una contraprueba benigna (Red Herring) y el motor de citas bloquea falsas alarmas
    Dado el motor de evaluación en src/lib/seniorEvaluation.mjs y las evidencias de los 18 casos Senior
    Cuando el alumno inspecciona las señales causales junto con el distractor y cita por error la contraprueba benigna
    Entonces cada caso incluye un artefacto distractor con explicación formativa y evaluateSeniorEvidence rechaza citationsReady mientras el distractor siga citado

  Escenario: F4-03 IncidentTimeline modela la cronología causal T-15m a T+10m para los 18 incidentes Senior
    Dado el catálogo cronológico en src/data/seniorTimelines.ts y el componente src/features/senior/components/IncidentTimeline.tsx
    Cuando se consulta la línea de tiempo de cada caso s01 a s18 para AWS, Azure y GCP
    Entonces cada expediente presenta al menos 4 hitos cronológicos ordenados vinculando cambios, alertas, síntomas y escalado

  Escenario: F4-04 CodeReviewLab ofrece inspección numerada por línea y versión remediada para los 7 incidentes de código y configuración
    Dado el catálogo de código auditable en src/data/seniorCodeReviews.ts y el componente src/features/senior/components/CodeReviewLab.tsx
    Cuando se evalúan los casos S01, S02, S03, S07, S09, S12 y S15 en los tres proveedores cloud
    Entonces cada ejercicio expone líneas numeradas, identifica con precisión las líneas defectuosas con explicación técnica y provee el código remediado seguro
