# DevSecOps V8: controles y modelo de amenazas

## Alcance

Frontend estático sin backend, sin credenciales cloud y con persistencia local. Los laboratorios IaC requieren cuentas propias y no se ejecutan desde la web. El principal límite de confianza es el navegador del alumno; se consideran no confiables los datos importados, las notas y los informes JSON.

## Controles automáticos

- `npm run verify:source`: inventario y resolución de importaciones relativas, tres mascotas, 18 incidentes, 54 guías públicas y 54 cuadernos fuente.
- `npm run syntax`: parser TypeScript para TS/TSX. **No sustituye el typecheck**.
- `npm test`: pruebas Node para contenidos, evaluación Senior, parsing, revisión docente, importaciones seguras y políticas.
- `npm run security:scan`: heurística de credenciales obvias, sin cobertura de histórico Git.
- `npm run security:audit`: escaneo local contra `eval`, sinks HTML, exposición de variables sensibles y `fetch(http://...)`. **No sustituye un SAST integral**.
- `npm run integrity`: compara hashes de V7 con los de esta versión y detecta eliminaciones o archivos no declarados.
- `npm run lint`: Biome 2.x al instalar dependencias.
- `npm run typecheck` + `npm run build`: TypeScript + Vite al instalar dependencias.
- `npm run test:e2e`: pruebas Playwright en Chromium al instalar navegador y dependencias.
- `npm audit --audit-level=high` + SBOM: requieren dependencias instaladas y `package-lock.json` generado por npm real.

## Riesgos conocidos

| Riesgo | Control / limitación |
|---|---|
| Inyección HTML desde notas importadas | Preact escapa la interpolación de texto, no usar innerHTML ni eval |
| Contenido manipulado en localStorage | Normalizadores, claves permitidas y longitud máxima; no implica identidad verificada |
| Falsa atribución del revisor | Rúbrica formativa sin autenticación, exportación expresamente `official:false` |
| Costos y privilegios de laboratorios reales | Terraform / cloud CLI fuera del frontend; permisos mínimos y cleanup documentado |
| Actualizaciones de dependencias | Dependabot, CodeQL, npm audit; **falta lockfile comprobado** |
| Calidad de curso | Escenarios sintéticos, no representan situaciones reales ni certificación |

## Pendiente para publicación

1. Ejecutar `npm install` con acceso al registro de npm y guardar un `package-lock.json` real.
2. Ejecutar todos los controles, corregir los problemas encontrados y sustituir `npm install` por `npm ci` en CI tras incorporar el lockfile.
3. Realizar revisión de accesibilidad, seguridad CSP bajo el hosting real y pruebas responsive en navegador.
4. Verificar los cuadernos y scripts Terraform en cuentas de prueba con límites de gastos, sin reutilizar credenciales reales.
