# Estado real de Cloud Engineering Academy V6

## Entregado en el ZIP

- SPA Preact + TypeScript + Vite + Signals con branding AWS / Azure / GCP y mascota que cambia según proveedor.
- 18 módulos y 90 unidades organizados en un **plan de 240 horas**, más 54 guías por proveedor, laboratorios Terraform de inicio y 5 simuladores educativos.
- 18 expedientes Senior, 54 cuadernos específicos y rúbricas humanas; motor V6 con decisión confirmada, evidencia examinada/citada, reversión, validación y bitácora.
- Guardado local, JSON import/export saneado, tema claro/oscuro y vistas responsive.
- CI GitHub Actions, Biome ampliado, TypeScript estricto configurado, dependencia SCA, SBOM, CodeQL, Dependabot, pruebas Node y test suite de Playwright.
- Manifiesto de integridad SHA-256 para preservar los archivos de V5.

## Verificaciones ejecutadas en la creación

- `node --test tests/*.test.mjs` (número y resultado en `docs/RELEASE_NOTES_V6.md`).
- Parseo TS/TSX mediante el compilador TypeScript global (sin diagnóstico sintáctico).
- `node scripts/check-secrets.mjs` (escaneo heurístico local, no revisión de seguridad exhaustiva).
- `node scripts/verify-integrity.mjs` y prueba de CRC del ZIP.

## Validaciones que NO pudieron concluir

- `npm install` falla por DNS contra registry.npmjs.org en el entorno de autoría.
- Por ello **no se validaron** `npm run build`, `npm run typecheck` con dependencias resueltas, `npm run lint` con Biome, `npm audit`, CodeQL ni Playwright contra un navegador real.
- No existe un `package-lock.json` válido. No se generó uno artificial.
- La calidad de las respuestas del alumno y de las guías técnicas requiere revisión docente; la aplicación no ejecuta servicios reales de las tres nubes.
- Las 240 horas son una **planificación curricular**, no 240 horas de videos o clases completamente desarrollados y revisados.

## Definición de listo para producción (no alcanzada aún)

1. Instalar dependencias en CI con npm público, generar lockfile, versionarlo y usar `npm ci`.
2. Ejecutar y corregir `npm run verify` y `npm run test:e2e` en desktop y móvil.
3. Revisar accesibilidad, flujo de guardado, reporte JSON y compatibilidad de enlaces y CSP en hosting real.
4. Confirmar exactitud del contenido con expertos AWS/Azure/GCP y probar laboratorios en cuentas aisladas y con presupuestos.
5. Definir autenticación, privacidad, contenido licenciado y controles de cumplimiento si se pretende operar con usuarios reales.
