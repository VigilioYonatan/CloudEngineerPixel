# Checklist de Release y Procedimiento de Rollback (V10)

## 1. Gates Obligatorios Pre-Release (`Fail-Closed`)

Ejecutar en limpio desde la raíz del repositorio antes de etiquetar o desplegar cualquier versión:

```bash
npm ci
npm run doctor
npm run verify:offline
npm run typecheck
npm run lint
npm run build
npm run bundle:budget
npm run sbom:check
npm audit --audit-level=high
npm run test:e2e
```

O mediante el comando unificado de release:
```bash
npm run verify:release
```

### Criterios de Aprobación (`100% PASS`)
- [x] **Conservación V9:** `docs/FILE_MANIFEST_V10.json` conserva los **291 archivos base** (`removed: []`) y `npm run integrity` pasa con `0 issues`.
- [x] **Calidad estática:** `npm run typecheck` (`0` errores en `src` y `tests/e2e`) y `npm run lint` (`biome check` con `0` errores).
- [x] **Seguridad y Supply Chain:** `npm run security:scan`, `npm run security:audit`, `npm audit --audit-level=high` (`0` vulnerabilidades altas/críticas) y `npm run sbom:check` (`sbom.cdx.json` CycloneDX válido).
- [x] **Presupuesto de rendimiento:** `npm run bundle:budget` confirma entrypoint JS `< 60 KB` gzipped, CSS `< 32 KB` gzipped y `dist/_headers` íntegro sin CDNs externos.
- [x] **Pruebas automatizadas:** Suite completa Node (`node --test tests/*.test.mjs`) y Playwright Chromium (`npm run test:e2e`) al 100% en verde.

---

## 2. Verificación Post-Despliegue en Hosting Estático

Tras publicar la carpeta `dist/` en Cloudflare Pages, Netlify, S3+CloudFront, Azure Static Web Apps o Firebase Hosting:

1. **Cabeceras HTTP de seguridad (`dist/_headers`):**
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
   - `Content-Security-Policy` estricta `'self'` sin `fonts.googleapis.com` ni `fonts.gstatic.com`.
   - `Cross-Origin-Opener-Policy: same-origin` y `X-Content-Type-Options: nosniff`.
2. **Smoke funcional multicloud:**
   - Abrir `/?cloud=aws#/`, `/?cloud=azure#/aprender`, `/?cloud=gcp#/senior/s01` y `/#/simuladores/routing`.
   - Confirmar `0` errores en consola y carga local de fuentes WOFF2 (`/fonts/*.woff2`).

---

## 3. Procedimiento de Rollback Inmediato

Dado que la plataforma es una SPA estática inmutable sin base de datos remota y con almacenamiento local retrocompatible (`schemaVersion: 2` preserva sesiones V1–V10):

1. **En proveedor de hosting estático (Cloudflare Pages / Netlify / Vercel):** Promover instantáneamente el deployment inmutable anterior desde el panel o CLI (< 60 segundos).
2. **En S3 + CloudFront / Object Storage:** Sincronizar el artefacto `dist/` del tag Git estable anterior e invalidar únicamente `/index.html` y `/_headers` (los chunks con hash en `/assets/*` son inmutables).
3. **Impacto en datos del estudiante:** Nulo; `migrateProgressSnapshot` e `inspectStoredProgressRaw` garantizan que ningún progreso local sea borrado durante un rollback de frontend.
