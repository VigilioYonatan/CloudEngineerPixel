# Senior Mode V4 — Cuadernos por proveedor, auditoría y revisión

## Alcance implementado

Esta entrega **conserva todos los archivos de V3** y añade:

- 54 cuadernos detallados (`labs/senior/providers/{aws,azure,gcp}/s01..s18.md`).
- Los mismos 54 archivos públicos en `public/senior-guides/` para descargar desde la vista del incidente, sin backend.
- Metadatos de práctica por incidente en `src/data/seniorPractices.ts` (objetivos, evidencias exigibles, errores habituales y dos consultas read-only por proveedor).
- Panel lateral en Senior Workbench con guía adaptada al incidente y a la nube activa.
- Bitácora de intentos registrados por proveedor y posibilidad de reabrir el caso.
- El clic en una opción no genera una entrada de intento: se registra el intento después de completar investigación, decisión e informe.
- Pruebas automatizadas de las 54 guías, las descargas, las señales de completitud y la seguridad básica de los comandos.

## Flujo Senior

1. Seleccionar AWS, Azure o GCP en el encabezado.
2. Abrir Senior Mode y filtrar casos por categoría o severidad.
3. Inspeccionar evidencias sintéticas y leer el análisis de los artefactos.
4. Tomar una decisión de contención con justificación.
5. Escribir causa raíz, mitigación y validación en el informe.
6. Descargar el cuaderno por proveedor para seguir investigando fuera de la aplicación.
7. Registrar la simulación y exportar el JSON para revisión por un instructor.

## Evaluación y límites

La puntuación de 100 puntos de la interfaz **no evalúa calidad técnica**: 40 decisión inicial correcta, 20 evidencias visualizadas, 30 informe escrito (longitud mínima), 10 confirmación. El informe es una declaración del estudiante, no una verificación externa. Un instructor debe revisar hipótesis, evidencia, reversibilidad y resultados antes de acreditar conocimientos.

No se conecta a AWS, Azure o Google Cloud. No se ejecutan comandos en la aplicación, no se solicitan claves, no se garantiza que los comandos de consulta funcionen en todos los permisos o servicios. Los ejemplos externos son solamente un punto de partida y requieren contexto autorizado. Las guías no crean recursos; si un alumno usa recursos externos debe controlar costos y limpiarlos.

## Pruebas

`npm test` ejecuta pruebas de integridad y regresión. `npm run typecheck` y `npm run build` requieren `npm install`, que no pudo realizarse en el entorno de empaquetado por indisponibilidad DNS del registro npm. Los fuentes fueron analizados con el parser TypeScript instalado globalmente; **esto no reemplaza** el typecheck, build o pruebas visuales en navegador.

## Próximas tareas para comercialización

- Auditoría humana de los 54 cuadernos, con revisión de equivalencia funcional de servicios y comandos de cada proveedor.
- E2E en Chrome/Firefox, pruebas de teclado y accesibilidad, capturas responsive.
- Revisión de profundidad docente de las 90 unidades (240 horas son horas planificadas, no contenido audiovisual impartido y validado).
- Evaluación docente con autenticación, permisos y persistencia segura si se necesita un LMS con alumnos reales.
- Ejecución de laboratorios cloud en sandboxes controlados, no desde el navegador público.
