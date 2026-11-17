Característica: Lazy loading por ruta, migración schemaVersion 2, deep-linking Hash y páginas Mapa Curricular y Catálogo Global de Labs

  Escenario: F1-08 aplica code-splitting por ruta pesada dejando el chunk inicial bajo 60 KB gzipped con estado loading accesible
    Dado el build productivo de Vite en dist/assets y el componente RouteLoadingState
    Cuando se inspeccionan los chunks JS emitidos y se mide el peso gzip del entrypoint inicial
    Entonces existen múltiples chunks separados por ruta, el entrypoint pesa menos de 60 KB gzipped y el estado loading expone aria-busy

  Escenario: F1-09 migra respaldos V1 a V9 hacia schemaVersion 2 y protege localStorage corrupto sin borrado silencioso
    Dado el motor de migración en importValidation.mjs y la gestión de almacenamiento en state.ts
    Cuando se migran instantáneas heredadas V1 y V9 y se simula una cadena corrupta en localStorage
    Entonces los respaldos heredados migran a schemaVersion 2 con timestamp ISO UTC y el estado corrupto ofrece descarga cruda sin usar localStorage.clear

  Escenario: F2-01 resuelve deep-linking canónico para mapa, aula con índice de unidad, labs, simuladores y senior manteniendo retrocompatibilidad V9
    Dado el router de hashes en src/app/router.ts
    Cuando se parsean rutas profundas canónicas y hashes cortos heredados de V9
    Entonces todas las rutas resuelven vista, módulo, unidad, simulador o caso Senior exactos preservando el formato canónico

  Escenario: F2-02 presenta la página /#/mapa con recorrido 240h + 18 incidentes Senior, prerrequisitos, modalidades y enlaces a las 90 unidades
    Dado el modelo del Mapa Curricular y la página CurriculumMapPage
    Cuando se construye el recorrido para el proveedor activo con el progreso del alumno
    Entonces expone los 3 niveles de 60h, 80h y 100h más 18 incidentes Senior con prerrequisitos, 4 modalidades y 90 enlaces directos a unidades

  Escenario: F2-03 presenta el catálogo global /#/labs con 54 labs, 3 guías DevSecOps OIDC, 3 proyectos y filtros combinables recuperables
    Dado el catálogo global de laboratorios y su motor de filtrado
    Cuando se combinan filtros por proveedor, nivel, modalidad, costo y texto o se fuerza una búsqueda sin coincidencias
    Entonces el catálogo reúne exactamente 60 prácticas reales y permite filtrar y recuperar el estado vacío sin perder contexto
