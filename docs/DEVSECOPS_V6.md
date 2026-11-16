# DevSecOps V6: cadena de controles

## Controles entregados

1. **TypeScript estricto:** `npm run typecheck`; exige dependencias instaladas.
2. **Biome:** `npm run lint` ahora revisa `src/`, `tests/` y `scripts/`, no solo tres archivos. Configuración deliberadamente gradual para respetar el código legado.
3. **Node Test Runner:** `npm test` ejecuta regresiones del currículo, importación JSON, integridad y motor de evaluación Senior.
4. **Playwright:** `npm run test:e2e` prueba visualmente el selector de nube, la navegación Senior y el header móvil (Chromium).
5. **SCA:** `npm audit --audit-level=high` bloquea vulnerabilidades altas/críticas en CI.
6. **SBOM:** `npm sbom --sbom-format cyclonedx` adjunta lista de componentes como artefacto CI.
7. **SAST:** workflow independiente de CodeQL para JavaScript/TypeScript (sujeto a disponibilidad del repositorio y permisos).
8. **Secret scanning:** escáner heurístico `scripts/check-secrets.mjs`. No sustituye un detector especializado.
9. **Cadena de custodia:** `scripts/verify-integrity.mjs` verifica integridad SHA-256 y que ningún archivo de V5 fue eliminado.
10. **Dependabot:** actualización programada de dependencias y GitHub Actions.

## Riesgos que permanecen

- **Sin lockfile real:** no se pudo alcanzar npm en el entorno de construcción. Generar y versionar un `package-lock.json` real desde una instalación exitosa. No inventar uno. Después cambiar `npm install` por `npm ci` en ambos workflows.
- **Sin build ni browser test ejecutado en esta entrega:** no afirmar éxito de TypeScript, Biome, `vite build`, `npm audit`, Playwright ni CodeQL hasta que se ejecuten con dependencias reales. Las pruebas puras de Node y el parseo TS sí son ejecutables localmente.
- **Sin autenticación ni servidor:** toda evaluación es educativa y toda evidencia proviene de casos sintéticos. No hay provisionamiento ni credenciales cloud en el navegador.
- **Revisión docente:** el motor Senior verifica completitud y citas de evidencias, nunca semántica ni desempeño en producción.
- **CSP:** la política `_headers` depende del proveedor de hosting; en desarrollo Vite usa HMR y necesita ajustes específicos.
- **CodeQL y SBOM:** requieren permisos y capacidades de GitHub Actions y pueden no ejecutarse en forks o repositorios con seguridad deshabilitada.

## Revisión y publicación

```sh
npm install
npm run typecheck
npm test
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
npm run security:scan
npm run integrity
npm audit --audit-level=high
npm sbom --sbom-format cyclonedx > sbom.cdx.json
```

**No almacenar** access keys, service principals, private keys, archivos `.tfstate`, secretos Terraform ni tokens en el proyecto. Usar roles temporales de laboratorio con permisos mínimos, presupuestos y limpieza comprobada.
