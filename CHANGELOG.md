# Changelog Histórico — Cloud Engineering Academy

> Este archivo preserva la trazabilidad histórica completa desde V1 hasta V10, complementando `docs/RELEASE_NOTES_V6.md` .. `docs/RELEASE_NOTES_V9.md` y los manifiestos inmutables `docs/FILE_MANIFEST_V*.json`.

---

## [V10] — 2026-11-18 · Arquitectura Modular, 90 Unidades Reales, 13 Simuladores, Senior Mastery & DevSecOps Hardening
- Conservación íntegra de los **291 archivos base de V9** (`removed: []`) verificada por `docs/FILE_MANIFEST_V10.json`.
- Desacople modular de `src/App.tsx` y `src/SeniorWorkbench.tsx` en `src/app/`, `src/features/*`, `src/components/`, `src/domain/` y `src/shared/` (`< 250` líneas por módulo, code-splitting `< 60 KB` gzip inicial).
- Router Hash canónico con deep-linking (`#/mapa`, `#/aprender`, `#/aula/:moduleId/:unitIndex`, `#/labs`, `#/simuladores/:simId`, `#/senior/:caseId`, `#/proyectos`, `#/progreso`, `#/ajustes`, `#/acerca`), `RouteRecoveryState`, onboarding y `contextSwitchGuard`.
- Sistema de diseño WCAG 2.2 AA (`AWS / Azure / GCP × Dark / Light`), fuentes WOFF2 locales (`DM Sans`, `Space Grotesk`, `JetBrains Mono`, `Silkscreen`) y sistema visual **Pixel Senior UX**.
- **90 unidades curriculares únicas** (`UnitContentSpec`), banco de **90 preguntas razonadas** (`bestScore` idempotente), micro-retos GoPixel, **Glosario técnico global** y progreso en **6 dimensiones**.
- **13 motores puros de simulación** (incluyendo visualizador 3D de saltos de red con Three.js en `Routing & Firewall Lab`).
- **Senior Mode nivel producción educativa:** 54 investigaciones nativas por nube, distractores SRE, `IncidentTimeline`, `CodeReviewLab`, matriz de trade-offs, exportación Postmortem/ADR (`.md` + `.json`) y validación `instructor-review.schema.json`.
- **Laboratorios conectados:** 3 modalidades explícitas, kit `labs/local-sandbox/` (`compose.yaml` sin exposición `0.0.0.0` + Kind + scripts PowerShell/Bash), ejemplos `enterprise-finops.tf`, checklist persistente, detector preventivo local anti-secretos (`secretGuard`) y exportador de evidencias.
- Hardening DevSecOps: `biome ci` con `preset: "recommended"`, GitHub Actions fijadas por SHA de 40 caracteres con `persist-credentials: false` y `npm ci`, `public/_headers` con CSP/HSTS/COOP, `sbom:check` CycloneDX y presupuesto automático de bundle.

---

## [V9] · Expedientes Senior portables y guías operativas
- 18 guías operativas de incidente y respaldo por caso/proveedor (`Guardar JSON del caso` / `Importar JSON del caso`) con aislamiento estricto de scope. Ver `docs/SENIOR_MODE_V9.md` y `docs/VERIFICATION_V9.md`.

## [V8] · Revisión docente local y controles DevSecOps estáticos
- `InstructorReview` local no autenticado con rúbrica ponderada (5 dimensiones) y auditoría estática `scripts/security-audit.mjs`. Ver `docs/RELEASE_NOTES_V8.md` y `docs/DEVSECOPS_V8.md`.

## [V7] · Senior Mode en 4 etapas con compuerta diagnóstica
- Etapas `Investigar → Diagnosticar → Decidir → Informe`, 18 diagnósticos técnicos y persistencia aislada por proveedor y caso. Ver `docs/SENIOR_MODE_V7.md`.

## [V6] · Evaluación determinista con citas de evidencia, OIDC y SBOM
- Motor `src/lib/seniorEvaluation.mjs`, guías OIDC en `labs/devsecops/`, workflows CI/CodeQL y manifiesto SHA-256 `docs/FILE_MANIFEST_V6.json`.

## [V5] · Validación de importaciones, Biome base y escáner heurístico de secretos
- `src/lib/importValidation.mjs`, `scripts/check-secrets.mjs`, `SECURITY.md` y `.github/dependabot.yml`.

## [V3 – V4] · Consola investigativa Senior y 54 cuadernos por proveedor
- 18 expedientes Senior y 54 cuadernos descargables en `labs/senior/providers/` y `public/senior-guides/`.

## [V1 – V2] · Base SPA Multicloud, 18 módulos, 90 talleres y 5 simuladores iniciales
- Catálogo multicloud AWS/Azure/GCP, mascota `Cloud Mentor`, 54 guías `labs/{aws,azure,gcp}/*.md` y 5 calculadoras locales.
