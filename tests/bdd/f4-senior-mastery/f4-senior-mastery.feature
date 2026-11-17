# language: es
Característica: Maestría Senior Mode en decisiones, postmortem ADR, cuadernos, filtros y refuerzo (F4-05..F4-09)

  Escenario: Decisiones con trade-offs reales y posiciones variadas (F4-05)
    Dado que cargo los 18 casos y diagnósticos de Senior Mode
    Cuando verifico la distribución de índices correctos y los datos de trade-off por opción
    Entonces los índices correctos varían entre A, B y C sin patrón fijo en las 3 opciones
    Y cada caso incluye comparación de mitigación inmediata vs solución permanente y feedback por opción

  Escenario: Postmortem/ADR opcional con descarga en Markdown compatible con V9 (F4-06)
    Dado que tengo una sesión Senior con las 4 secciones requeridas y campos opcionales ADR
    Cuando genero el Postmortem / ADR en formato Markdown
    Entonces el documento Markdown incluye título del caso, proveedor, evidencias y secciones ADR
    Y la sesión base de 4 campos sigue siendo 100% compatible con normalizeSeniorSession

  Escenario: Previsualización integrada de cuadernos Markdown desde SeniorSidebar (F4-07)
    Dado que inspecciono el componente SeniorSidebar y los 54 cuadernos en public/senior-guides
    Cuando valido la existencia del disparador accesible de vista previa y las rutas de cuaderno
    Entonces existe un botón integrado para previsualizar el cuaderno con cierre por Escape
    Y los 54 archivos Markdown de AWS, Azure y GCP existen y tienen contenido sustancial

  Escenario: Filtros de catálogo por dominio, estado y búsqueda sin acentos (F4-08)
    Dado que filtro los 18 casos del catálogo Senior con historial parcial del alumno
    Cuando busco "filtracion" sin tilde y combino filtros de dominio y estado
    Entonces encuentra el caso "Filtración de secretos en repositorio" ignorando diacríticos
    Y al filtrar por dominio y estado devuelve el subconjunto exacto esperado

  Escenario: Vínculos de refuerzo al Aula e inspección de intentos en Bitácora (F4-09)
    Dado que mapeo los 18 casos Senior a módulos y unidades del plan de estudios
    Cuando verifico cada referencia curricular y la UI de etapas y bitácora
    Entonces cada caso apunta a un moduleId y unitIndex válido de src/data/course.ts
    Y DecisionStage, DiagnosisStage y SeniorCatalog exponen refuerzo al Aula e inspección de intentos
