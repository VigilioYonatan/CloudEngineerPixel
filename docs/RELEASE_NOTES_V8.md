# Cloud Engineering Academy V8 — cambios

Se mantiene íntegra la V7, sin eliminaciones. Se conserva la experiencia educativa GoPixel adaptada a cloud, las tres paletas y mascotas, las 90 unidades, 18 casos Senior, 54 cuadernos y cinco simuladores.

## Implementado en esta versión

- `src/InstructorReview.tsx`: rúbrica opcional en un caso Senior registrado; guardado y descarga JSON.
- `src/lib/instructorReview.mjs` y `.d.mts`: validación estricta de contexto proveedor/caso, normalización de entradas y cálculo ponderado, sin declarar certificación.
- `schemas/instructor-review.schema.json`: contrato de exportación.
- `src/SeniorWorkbench.tsx`: integra la revisión y evita registrar repetidamente un caso completado.
- `scripts/security-audit.mjs`: controles DevSecOps sin dependencia de npm.
- `scripts/check-typescript-syntax.mjs`: análisis de sintaxis TS/TSX usando TypeScript disponible local o globalmente.
- `tests/instructor-review-v8.test.mjs`, `tests/devsecops-v8.test.mjs`: casos unitarios, negativos y de seguridad.
- `tests/e2e/academy.spec.ts`: nueva prueba del panel docente y corrección del selector de etapas.
- `.github/workflows`: etapa de auditoría de fuentes DevSecOps y lint adicional.
- `docs/*_V8.md`: guía docente, riesgos y verificación.

## Estado de release

El proyecto es una **academia estática educativa con funcionalidades locales**, no una plataforma de producción validada. Las 240 horas designan la malla prevista, no 240 horas de material docente plenamente validado. Los incidentes son sintéticos. Nunca colocar tokens de AWS, Azure o GCP en el navegador.
