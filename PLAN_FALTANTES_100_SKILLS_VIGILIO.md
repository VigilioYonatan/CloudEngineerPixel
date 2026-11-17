# PLAN MAESTRO PARA LLEGAR AL 100% — CLOUD ENGINEERING ACADEMY (CON SKILLS VIGILIO)

> **Proyecto:** `CloudEngineerPixel` (`cloud-engineering-academy` v9.0.0 → Meta v10.0.0 100% Verificada)  
> **Fecha de auditoría:** 16 de noviembre de 2026  
> **Contratos del repositorio contrastados:** `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md`, `docs/MASTER_SPEC.md`, `docs/SENIOR_MODE_V9.md`, `docs/VERIFICATION_V9.md`  
> **Catálogo de Skills aplicado:** `C:\Users\Admin\Desktop\VIGILIO\arquitectura-rimac-actualizado\platform-actions\skills`  
> **Documentación Canónica aplicada:** `C:\Users\Admin\Desktop\VIGILIO\arquitectura-rimac-actualizado\vigilio-docs`  
> **Regla innegociable de conservación:** Preservar íntegros los **291 archivos originales** del baseline V9; registrar toda adición o modificación en un nuevo manifiesto SHA-256 (`docs/FILE_MANIFEST_V10.json`) sin borrar historia ni sustituir contenido funcional por maquetas vacías.

---

## 1. TRAZABILIDAD DE LECTURA VIGILIO AUTO-SENIOR (`skills_loaded` & `canonical_sources_read`)

Conforme a `vigilio-auto-senior` y `complete-work-no-shortcuts`, este plan se construyó tras **inspeccionar y ejecutar** el repositorio real y **leer íntegramente** las siguientes skills y normas canónicas:

### 1.1 `skills_loaded` (Leídas de `platform-actions/skills/*/SKILL.md`)
1. `vigilio-auto-senior` — Orquestación de ingeniería, fases `PLAN → BUILD → VERIFY → REVIEW`, clasificación honesta `PASS | FAIL | NOT_RUN | BLOCKED`.
2. `complete-work-no-shortcuts` — Cobertura exhaustiva sin recortes, matriz por dimensión, preservación de archivos existentes.
3. `symbol-ownership-architecture` — Ownership de constantes, tipos, utilidades y componentes por feature; cero carpetas vacías o `contracts/` globales artificiales.
4. `refactor-existing-code` — Refactor incremental con tests de caracterización previos antes de dividir monolitos (`src/App.tsx`).
5. `web-mfe-build-feature` — Arquitectura frontend Preact + TypeScript estricto + Vite + separación `app/ | features/ | components/ui/`.
6. `web-mfe-quality` — Accesibilidad WCAG AA, Core Web Vitals (LCP, CLS, INP), presupuestos de bundle, Biome y fuentes locales.
7. `web-mfe-testing` — Pirámide de pruebas: unitarias deterministas, Testing Library Preact y Playwright E2E por `role/label` sin `waitForTimeout`.
8. `web-mfe-security-delivery` — Hardening de navegador, CSP/headers en `public/_headers`, cero secretos en cliente y entregas inmutables.
9. `ui-design-system` — Primitivas/semánticos/component tokens en CSS Custom Properties, paridad real Dark/Light y estados completos.
10. `ui-art-direction` — Dirección de arte GoPixel adaptada a Cloud Engineering y consistencia canónica de la mascota `Cloud Mentor`.
11. `ui-interaction-motion` — Microinteracciones orientadas a tarea y respeto estricto a `prefers-reduced-motion`.
12. `ui-quality-review` — Auditoría visual e interactiva read-only por pantalla, proveedor y viewport.
13. `ux-information-architecture` — Mapa de rutas, deep-linking, breadcrumbs y recuperación de estados de error/vacío/ruta rota.
14. `ux-web-experience` — Semántica HTML (`main`, `header`, `nav`, `dialog`), formularios y ergonomía desktop/tablet.
15. `ux-mobile-experience` — Ergonomía móvil desde `320px`, tap targets `>= 44x44 px`, menús sin elementos ocultos inaccesibles.
16. `ux-accessibility` — Matriz WCAG 2.2 AA, foco visible, navegación por teclado y anuncios `aria-live` / `role="status"`.
17. `aws-platform-foundation` — Criterios técnicos reales para módulos/labs de VPC 3 AZs, OIDC, PrivateLink, S3 privado, KMS, Outbox/SQS/DLQ.
18. `terraform-iac-delivery` — Estado aislado, `use_lockfile`, detección de `ForceNew`/drift, `terraform fmt/validate/test`, Trivy IaC e Infracost.
19. `kubernetes-eks-delivery` & `kubernetes-policy-runtime-security` — Probes, PDB, HPA/KEDA, Pod Identity, NetworkPolicy, Kyverno CEL y contención forense de nodos.
20. `platform-observability-sre`, `platform-finops` & `platform-resilience-disaster-recovery` — SLIs/SLOs, burn-rate, correlación logs/métricas/trazas, atribución de costos, RTO/RPO, backups 3-2-1 y GameDays.
21. `platform-local-production-lab`, `platform-cicd-factory` & `software-supply-chain-security` — Labs locales reproducibles (`compose-vps`, `k8s-gitops`, `cloud-floci`), GitHub Actions fijadas por SHA-40, OIDC y SBOM CycloneDX.
22. `review-code-change` & `repository-readme-architecture` — Revisión read-only por fase y documentación con Quickstart `< 10 min`.

### 1.2 `canonical_sources_read` (Leídas de `vigilio-docs/`)
- `AGENTS.md`, `OPERATING-MODEL.md`, `_sidebar.md`
- `governance/complete-work-coverage-policy.md`
- `standards/engineering/file-and-symbol-ownership.md`
- `standards/testing/e2e-quality-gates.md` (56 controles E2E verificables)
- `standards/experience/components-states-and-contracts.md`
- `stacks/frontend/web-mfe/ui/component-symbol-ownership.md`
- `technology/libraries/preact.md`, `preact-signals.md`, `biome.md`, `playwright.md`

---

## 2. DIAGNÓSTICO REAL DEL REPOSITORIO HOY (EVIDENCIA EJECUTADA)

### 2.1 Estado de Gates Ejecutados Hoy

| Control / Comando | Estado Real | Evidencia Observada |
|---|---|---|
| Repositorio Git (`git status`) | `FAIL` | No existe `.git` (`fatal: not a git repository`). |
| `npm run doctor` | `BLOCKED` | `0/8` dependencias instaladas (`node_modules` ausente) y `package-lock.json` ausente. |
| `npm run verify:source` | `PASS` | Grafo fuente válido: 18 incidentes, 18 diagnósticos, 18 playbooks, 54 cuadernos, 3 mascotas. |
| `npm run security:audit` | `PASS` | Sin sinks DOM inseguros (`innerHTML`/`eval`) ni credenciales cliente en `src/`. |
| `npm test` (`node --test`) | `FAIL` (86 PASS / 2 FAIL / 1 SKIP) | 86 pasan; fallan `integrity-v8.test.mjs` y `release-integrity-v6.test.mjs` por `UNTRACKED: TODO_LO_QUE_DEBE_TENER_ESTA_APP.md`; 1 skip por falta de `typescript` instalado. |
| `npm run security:scan` | `FAIL` | Bug Windows en `scripts/check-secrets.mjs`: `new URL('../', import.meta.url).pathname` genera `C:\C:\Users\...` (`ENOENT`). |
| `npm run typecheck` | `NOT_RUN` | Bloqueado hasta ejecutar `npm install`. |
| `npm run lint` (Biome) | `NOT_RUN` | Bloqueado hasta instalar `@biomejs/biome`; además `biome.json` tiene `recommended: false` y `formatter: false`. |
| `npm run build` (Vite) | `NOT_RUN` | Bloqueado hasta ejecutar `npm install`. |
| `npm run test:e2e` (Playwright) | `NOT_RUN` | 8 tests escritos, 0 corridas reales en navegador Chromium. |

### 2.2 Inventario de lo que YA TENEMOS (Base V9 que se conserva)
- **8 vistas funcionales en SPA**: `Home`, `Learn` (catálogo 18 módulos), `Lesson` (aula 90 temas), `Lab` (checklist + notas), `Simulator` (5 calculadoras básicas), `SeniorWorkbench` (18 incidentes en 4 etapas + checkpoint JSON portable + `InstructorReview`), `Progress` (dashboard + import/export JSON validado) y `SettingsPage`.
- **Persistencia local blindada**: `src/lib/state.ts`, `importValidation.mjs`, `seniorSession.mjs`, `seniorEvaluation.mjs`, `seniorCheckpoint.mjs`, `instructorReview.mjs`.
- **Acervo documental y práctico en disco**: 54 guías de módulo (`labs/{aws,azure,gcp}/*.md`), 3 `main.tf`, 3 guías OIDC (`labs/devsecops/*.md`), 18 cuadernos Senior generales (`labs/senior/*.md`), 54 cuadernos Senior por nube (`labs/senior/providers/*` y `public/senior-guides/*`), 5 imágenes de mascota (`public/assets/*`).

### 2.3 Hallazgos Críticos Descubiertos en Código y Estilos
1. **Bug Windows en `scripts/check-secrets.mjs` (L3, L22)**: usa `.pathname` de `URL` en lugar de `fileURLToPath`, rompiendo el escaneo en Windows.
2. **Controles ocultos e inaccesibles en móvil (`<= 720px`)**: en `src/App.tsx` (L17) los botones **Cambiar tema** y **Configuración** tienen clase `.hide-mobile` (`display: none` en `src/styles.css` L4) y no están dentro del menú móvil `.top-nav`, dejando al usuario móvil sin acceso a Tema ni Ajustes.
3. ** Contraste insuficiente en Modo Claro (`data-theme="light"`)**: `--accent` (`#ff9900` AWS, `#38bdf8` Azure, `#55d99a` GCP) se usa como color de texto sobre `#f2f6fc` / `#ffffff` (ratios `~1.8:1` a `~2.1:1`), incumpliendo WCAG AA (`>= 4.5:1`).
4. **Monolito minificado y código muerto en `src/App.tsx`**: ~50 KB en 39 líneas sin formato; incluye `function Senior()` (L35-L36, ~7 KB de código legado muerto que nunca se renderiza porque `App` monta `SeniorWorkbench`).
5. **54 guías `labs/{aws,azure,gcp}/*.md` y 3 `main.tf` huérfanos de UI**: existen en la carpeta `labs/` (fuera de `public/` y no importados en `src/`), por lo que el estudiante no puede leerlos ni descargarlos desde la vista `Lab`.
6. **Dependencia externa de Google Fonts en `index.html`**: rompe la pureza offline y obliga a abrir `fonts.googleapis.com` / `fonts.gstatic.com` en `public/_headers`.
7. **Versión desactualizada en UI**: `SettingsPage` en `src/App.tsx` (L38) muestra `"Versión 7.0.0"` mientras `package.json` es `9.0.0`.
8. **Teoría/Quizzes por módulo (18) en lugar de por unidad (90) y plantillas clonadas en `src/data/study.ts`**.
9. **Evidencias Senior (`src/data/seniorInvestigations.ts`) genéricas**: usan `cloud_database.main` o `principal=allUsers` igual para las 3 nubes y repiten el mismo comando CLI básico en los 18 casos.

---

## 3. CHECKLIST MAESTRO `[ ]` DE TODO LO QUE FALTA PARA EL 100%
*(Formato obligatorio: `[ ] ID — Tarea` → **Skills Vigilio + Docs** → **Resultado Verificable para 100%**)*

---

### BLOQUE 0 — Entorno, Git, Dependencias, Bugs Bloqueantes y Manifiesto (8 Tareas · 5/8 Completadas)

- [x] **F0-01 — Inicializar repositorio Git y configurar higiene base de ramas/commits (`PASS`)**
  - **Tarea:** Ejecutar `git init -b main`, verificar `.gitignore` (`node_modules`, `dist`, `playwright-report`, `test-results`, `coverage`, `sbom.cdx.json`) y crear commit inicial inmutable del estado V9 antes de tocar código fuente.
  - **Skills / Vigilio Docs:** `vigilio-auto-senior`, `commit-ai-change`, `platform-repository-workspace` · `vigilio-docs/platform/architecture/workspace-strategy.md`.
  - **Resultado 100%:** `git status` limpio, commit raíz inmutable `806da89` en `main` (`core.autocrlf=false`) y rama activa `feat/AI-0001/f0-foundation-gates`.

- [x] **F0-02 — Corregir bug multiplataforma Windows/Linux en `scripts/check-secrets.mjs` (`PASS`)**
  - **Tarea:** Sustituir `new URL('../', import.meta.url).pathname` por `fileURLToPath(new URL('../', import.meta.url))` en `scripts/check-secrets.mjs` y agregar prueba unitaria + BDD de regresión multiplataforma.
  - **Skills / Vigilio Docs:** `diagnosing-bugs`, `web-mfe-security-delivery` · `vigilio-docs/standards/security/secrets-and-privacy.md`.
  - **Resultado 100%:** `npm run security:scan` termina con exit code `0` en Windows PowerShell y exporta `scanDirectoryForSecrets` cubierto por tests unitarios y BDD Gherkin.

- [x] **F0-03 — Actualizar sistema de manifiesto de integridad (`FILE_MANIFEST_V10.json`) sin borrar archivos V9 (`PASS`)**
  - **Tarea:** Crear script reproducible `scripts/update-manifest.mjs` que verifique que los 291 archivos originales de V9 siguen presentes (`removed: []`), registre `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md`, `PLAN_FALTANTES_100_SKILLS_VIGILIO.md` y los cambios controlados en `docs/FILE_MANIFEST_V10.json`, y actualizar `scripts/verify-integrity.mjs` para validar contra el último manifiesto vigente.
  - **Skills / Vigilio Docs:** `complete-work-no-shortcuts` · `vigilio-docs/governance/complete-work-coverage-policy.md`.
  - **Resultado 100%:** `npm run integrity` y la suite completa `npm test` pasan al 100% (`0 fail`, `291/291` archivos V9 preservados, `0 removed`).

- [x] **F0-04 — Instalar dependencias reales y generar `package-lock.json` auténtico (`PASS`)**
  - **Tarea:** Ejecutar `npm install` contra registry oficial, auditar resoluciones, verificar compatibilidad Preact 10.27 + Signals 2.2 + Vite 7.1 + TS 5.9 + Biome 2.6 + Playwright 1.56 (corrigiendo resolución de paquetes CLI como `@biomejs/biome` en `scripts/project-doctor.mjs`) y versionar `package-lock.json`.
  - **Skills / Vigilio Docs:** `software-supply-chain-security`, `web-mfe-technologies` · `vigilio-docs/technology/versions.md`, `vigilio-docs/standards/devsecops/supply-chain.md`.
  - **Resultado 100%:** `npm run doctor` reporta `8/8 dependencias resueltas`, `package-lock.json: presente` y `npm audit --audit-level=high` reporta `0 vulnerabilities`.

- [x] **F0-05 — Superar compilación estricta de tipos (`npm run typecheck`) (`PASS`)**
  - **Tarea:** Ejecutar `tsc --noEmit` sobre `src` y `tsc --noEmit -p tsconfig.e2e.json` sobre `tests/e2e`, `playwright.config.ts` y `vite.config.ts`, corrigiendo el bug real en `src/SeniorWorkbench.tsx` (`acknowledged: ack` en lugar de `session.ack` inexistente) sin usar `any` ni `@ts-ignore`.
  - **Skills / Vigilio Docs:** `web-mfe-build-feature` · `vigilio-docs/technology/catalog/typescript.md`.
  - **Resultado 100%:** `npm run typecheck` en `PASS` con `0` errores en código de navegador y tests E2E.

- [ ] **F0-06 — Ejecutar y validar primer build productivo con Vite (`npm run build` + `npm run preview`)**
  - **Tarea:** Compilar bundle de producción en `dist/`, comprobar rutas estáticas (`base: './'`), carga de imágenes de mascota y descarga de cuadernos Senior.
  - **Skills / Vigilio Docs:** `web-mfe-quality` · `vigilio-docs/technology/libraries/vite.md`.
  - **Resultado 100%:** `npm run build` genera `dist/` sin warnings críticos y `vite preview` sirve todas las rutas sin 404.

- [ ] **F0-07 — Instalar navegador Chromium de Playwright y ejecutar la suite E2E base actual**
  - **Tarea:** Ejecutar `npx playwright install chromium` y correr los 8 tests actuales (`tests/e2e/academy.spec.ts` y `tests/e2e/senior-checkpoint-v9.spec.ts`) para levantar línea base real en navegador.
  - **Skills / Vigilio Docs:** `web-mfe-testing` · `vigilio-docs/technology/libraries/playwright.md`, `vigilio-docs/standards/testing/environment-preflight-and-e2e.md`.
  - **Resultado 100%:** `8/8` tests E2E existentes pasando en Chromium real (`PASS`).

- [ ] **F0-08 — Sincronizar versión visible de la plataforma y metadatos de entrega**
  - **Tarea:** Eliminar el string quemado `"Versión 7.0.0"` en `SettingsPage` (`src/App.tsx`), alimentándolo desde constante tipada sincronizada con `package.json`, y actualizar el encabezado de `README.md` (que aún dice V8/V6).
  - **Skills / Vigilio Docs:** `symbol-ownership-architecture`, `repository-readme-architecture` · `vigilio-docs/standards/engineering/file-and-symbol-ownership.md`.
  - **Resultado 100%:** Versión coherente en `package.json`, UI (`Ajustes` / `Acerca`), `README.md` y exportaciones JSON.

---

### BLOQUE 1 — Arquitectura Modular, Ownership de Símbolos y Desacople de `App.tsx` (9 Tareas)

- [ ] **F1-01 — Tests de caracterización antes de dividir `src/App.tsx`**
  - **Tarea:** Crear pruebas de integración/E2E que congelen el comportamiento actual de navegación, cambio de proveedor, quiz, lab, simuladores, progreso y ajustes antes de extraer un solo archivo.
  - **Skills / Vigilio Docs:** `refactor-existing-code`, `web-mfe-testing` · `vigilio-docs/standards/engineering/refactoring-existing-code.md`.
  - **Resultado 100%:** Suite de regresión verde que detecta cualquier ruptura durante la modularización.

- [ ] **F1-02 — Formatear código fuente y estilos minificados (`src/App.tsx`, `src/SeniorWorkbench.tsx`, `src/styles.css`)**
  - **Tarea:** Desminificar y formatear con Biome todos los archivos de `src/` para que tengan líneas legibles, diffs limpios y mantenibilidad real.
  - **Skills / Vigilio Docs:** `web-mfe-quality`, `refactor-existing-code` · `vigilio-docs/technology/libraries/biome.md`.
  - **Resultado 100%:** Ningún archivo de código fuente tiene líneas de 15–50 KB; `biome format` pasa al 100%.

- [ ] **F1-03 — Retirar código muerto legado (`function Senior()` en `src/App.tsx`) preservando trazabilidad**
  - **Tarea:** Extraer o archivar limpiamente la función `Senior()` de V1/V2 en `src/App.tsx` (actualmente inalcanzable porque la vista `senior` renderiza `SeniorWorkbench`), verificando que ningún test dependa del texto muerto (ajustando solo si algún test estático grepea `App.tsx`).
  - **Skills / Vigilio Docs:** `refactor-existing-code`, `improve-codebase-architecture` · `vigilio-docs/foundations/engineering/code-quality.md`.
  - **Resultado 100%:** Reducción de ~7 KB de código muerto en el bundle principal sin romper tests de regresión.

- [ ] **F1-04 — Extraer capa `src/app/` (Shell, Header, Footer, ProviderSwitcher, Router)**
  - **Tarea:** Separar `AppShell.tsx`, `AppHeader.tsx`, `AppFooter.tsx`, `CloudProviderSwitcher.tsx` y `router.ts` desde `src/App.tsx` manteniendo `src/App.tsx` como punto de composición limpio.
  - **Skills / Vigilio Docs:** `web-mfe-build-feature`, `symbol-ownership-architecture` · `vigilio-docs/stacks/frontend/web-mfe/architecture/3-arquitectura-estructura-estado.md`.
  - **Resultado 100%:** `src/app/` contiene únicamente layout, shell, navegación y proveedores globales sin lógica de negocio de lecciones ni simuladores.

- [ ] **F1-05 — Extraer features por dominio (`src/features/{home,curriculum,lessons,labs,simulators,senior,progress,settings}/`)**
  - **Tarea:** Mover cada vista y sus subcomponentes privados a su feature propietaria (`features/home/`, `features/curriculum/`, `features/lessons/`, `features/labs/`, `features/simulators/`, `features/senior/`, `features/progress/`, `features/settings/`), colocando constantes de negocio en `constants/*.constants.ts` y tipos propios en `types/*.types.ts` solo donde exista semántica real (cero carpetas vacías).
  - **Skills / Vigilio Docs:** `symbol-ownership-architecture`, `web-mfe-build-feature` · `vigilio-docs/stacks/frontend/web-mfe/ui/component-symbol-ownership.md`, `vigilio-docs/standards/engineering/file-and-symbol-ownership.md`.
  - **Resultado 100%:** Dependencias unidireccionales (`app → features → domain/lib`), cero imports circulares y cada archivo `< 250` líneas legibles.

- [ ] **F1-06 — Centralizar `ProviderRegistry` tipado sin condicionales `if (provider === ...)` dispersos**
  - **Tarea:** Crear registro tipado único (`src/domain/providers.ts`) para nombres, colores accesibles Dark/Light, mascota + poses, CLI, consola, reservas CIDR por nube y enlaces oficiales; reemplazar ternarios `id==='aws'?'aws':id==='azure'?'A':'G'` dispersos en UI.
  - **Skills / Vigilio Docs:** `symbol-ownership-architecture` · `vigilio-docs/standards/engineering/naming-and-boundaries.md`.
  - **Resultado 100%:** Un único punto de verdad para metadatos AWS/Azure/GCP validado por tipos estrictos.

- [ ] **F1-07 — Modularizar `SeniorWorkbench.tsx` por etapas sin romper contratos de sesión V7–V9**
  - **Tarea:** Dividir `SeniorWorkbench.tsx` en `SeniorCatalog.tsx`, `InvestigationStage.tsx`, `DiagnosisStage.tsx`, `DecisionStage.tsx`, `ReportStage.tsx`, `SeniorSidebar.tsx` e `InstructorReview.tsx` dentro de `src/features/senior/`, manteniendo intactas las claves `senior-session:<provider>:<caseId>` y `senior-review:<provider>:<caseId>`.
  - **Skills / Vigilio Docs:** `refactor-existing-code`, `web-mfe-build-feature` · `vigilio-docs/technology/libraries/preact-signals.md`.
  - **Resultado 100%:** Sesiones guardadas en V7, V8 y V9 se hidratan sin pérdida de datos y todos los tests `senior-*.test.mjs` pasan.

- [ ] **F1-08 — Implementar Code-Splitting / Lazy Loading por ruta pesada**
  - **Tarea:** Cargar bajo demanda (`lazy` / dynamic `import()`) las vistas pesadas (`SeniorWorkbench`, `Simulators`, banco completo de las 90 unidades y guías de `Labs`) con estado `loading` accesible sin salto de layout.
  - **Skills / Vigilio Docs:** `web-mfe-quality` · `vigilio-docs/technology/libraries/preact.md`, `vigilio-docs/stacks/frontend/web-mfe/quality/8-calidad-seo-accesibilidad-rendimiento.md`.
  - **Resultado 100%:** Chunk inicial JS ligero (`< 60 KB` gzipped) y transiciones instantáneas medidas en `vite build`.

- [ ] **F1-09 — Migrar y versionar el esquema de almacenamiento local (`schemaVersion: 2`) con retrocompatibilidad V1–V9**
  - **Tarea:** Añadir `schemaVersion` explícito, timestamps ISO UTC y función pura de migración V1→V2 en `importValidation.mjs` y `state.ts`, ofreciendo descarga de respaldo crudo si algún JSON local estuviera corrupto antes de reiniciar estado (prohibido `localStorage.clear()` silencioso).
  - **Skills / Vigilio Docs:** `web-mfe-security-delivery`, `refactor-existing-code` · `vigilio-docs/standards/engineering/refactoring-existing-code.md`.
  - **Resultado 100%:** Importar JSONs antiguos V1–V9 migra limpiamente al nuevo modelo sin perder notas, intentos Senior ni progreso por proveedor.

---

### BLOQUE 2 — Páginas, Rutas y Navegación Faltantes (8 Tareas)

- [ ] **F2-01 — Router Hash completo con Deep-Linking y Query Params estables**
  - **Tarea:** Soportar rutas profundas canónicas: `#/` (Home), `#/mapa` (Mapa Curricular), `#/aprender` (Catálogo), `#/aula/:moduleId/:unitIndex` (Lección exacta), `#/labs` (Catálogo Labs), `#/labs/:moduleId` (Lab específico), `#/simuladores/:simId` (Simulador específico), `#/senior` (Catálogo Senior), `#/senior/:caseId` (Expediente Senior), `#/proyectos` (3 Proyectos Portfolio), `#/progreso`, `#/ajustes`, `#/acerca`, manteniendo `?cloud=aws|azure|gcp` y compatibilidad hacia atrás con hashes cortos V9 (`#learn`, `#lesson/networks`, `#senior`).
  - **Skills / Vigilio Docs:** `ux-information-architecture`, `web-mfe-build-feature` · `vigilio-docs/standards/experience/information-architecture-and-user-flows.md`.
  - **Resultado 100%:** Recargar el navegador o compartir cualquier URL abre exactamente el módulo, unidad, simulador o caso Senior y proveedor indicados.

- [ ] **F2-02 — Nueva página `/#/mapa` (Mapa Curricular Interactivo y Matriz de Competencias)**
  - **Tarea:** Construir vista visual del recorrido `Nivel 1 Fundamentos (60h) → Nivel 2 Ingeniería (80h) → Nivel 3 Arquitectura (100h) → Senior Mode (18 incidentes)` mostrando prerrequisitos recomendados, competencias desbloqueadas por módulo, modalidades disponibles (`Concepto`, `Simulador`, `Local`, `Cloud Real`) y enlace directo a cada unidad.
  - **Skills / Vigilio Docs:** `ux-information-architecture`, `ux-web-experience` · `vigilio-docs/standards/experience/product-originality-and-platform-blueprints.md`.
  - **Resultado 100%:** Pantalla `/#/mapa` navegable por teclado y móvil, conectada a datos reales de `course.ts` y progreso del alumno.

- [ ] **F2-03 — Nueva página `/#/labs` (Catálogo Global de los 54 Laboratorios + 3 DevSecOps OIDC + 3 Proyectos)**
  - **Tarea:** Crear página dedicada de exploración de laboratorios con filtros por **Proveedor** (`AWS / Azure / GCP`), **Nivel**, **Modalidad** (`Simulado / Local Docker-Kind / Cuenta Propia`) y **Advertencia de Costo** (`Gratis local / Free-tier elegible / Genera cargos`).
  - **Skills / Vigilio Docs:** `ux-information-architecture`, `ux-web-experience` · `vigilio-docs/standards/experience/information-architecture-and-user-flows.md`.
  - **Resultado 100%:** Acceso directo a todas las prácticas desde el menú principal y filtros combinables con estado vacío recuperable.

- [ ] **F2-04 — Nueva página `/#/proyectos` (3 Proyectos Integradores y Portfolio Defendible)**
  - **Tarea:** Implementar vista dedicada para el **Proyecto 1 (Sitio Estático Seguro + Costos)**, **Proyecto 2 (API Contenedores/Serverless + IaC + CI/CD OIDC + Observabilidad)** y **Proyecto 3 (Capstone Arquitecto Multicloud con C4, Threat Model, RTO/RPO, SLO y TCO)**, con checklist de entregables, rúbrica ponderada y exportador de plantilla ADR/Portfolio en Markdown.
  - **Skills / Vigilio Docs:** `aws-platform-foundation`, `platform-observability-sre`, `ux-web-experience` · `vigilio-docs/platform/sre/adr-threat-modeling.md`.
  - **Resultado 100%:** Los 3 proyectos curriculares exigidos en la sección 21 de `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` existen como experiencia interactiva y descargable.

- [ ] **F2-05 — Nueva página `/#/acerca` (Metodología, Alcance Honesto, Seguridad Cloud y Licencias)**
  - **Tarea:** Crear vista informativa con la metodología "1 concepto común → 3 implementaciones cloud → criterio Senior", límites explícitos (sin ejecución cloud desde navegador ni certificación oficial de proveedores), guía de seguridad de cuentas (`CLOUD_SAFETY.md`) y aviso legal de marcas independientes.
  - **Skills / Vigilio Docs:** `ux-information-architecture`, `repository-readme-architecture` · `vigilio-docs/standards/experience/content-forms-localization-and-trust.md`.
  - **Resultado 100%:** Enlaces del `Footer` (Privacidad, Seguridad Cloud, Metodología, No afiliación) navegan a secciones reales y verificables.

- [ ] **F2-06 — Pantalla de recuperación ante ruta inexistente o recurso inválido (`NotFound / Recovery State`)**
  - **Tarea:** Cuando la URL contenga un `moduleId`, `unitIndex`, `simId` o `caseId` inexistente, mostrar componente `RouteRecoveryState` explicando qué falló y ofreciendo volver a `Inicio` o al catálogo correspondiente sin perder el progreso ni el proveedor activo.
  - **Skills / Vigilio Docs:** `ux-information-architecture`, `ui-design-system` · `vigilio-docs/standards/experience/components-states-and-contracts.md`.
  - **Resultado 100%:** Cero redirecciones mudas o pantallas rotas ante hashes malformados (`#/aula/no-existe`, `#/senior/s99`).

- [ ] **F2-07 — Onboarding ligero de primera visita y botón real «Continuar donde me quedé»**
  - **Tarea:** En la primera visita sin `cea:provider` previo, permitir escoger ruta inicial (`AWS`, `Azure` o `Google Cloud`) con breve guía según perfil, y guardar `lastVisited: { view, moduleId, unitIndex }` para que el CTA `"Continuar aprendiendo"` lleve exactamente a la última unidad pendiente (no siempre al catálogo general).
  - **Skills / Vigilio Docs:** `ux-web-experience`, `ux-information-architecture` · `vigilio-docs/standards/experience/information-architecture-and-user-flows.md`.
  - **Resultado 100%:** El botón principal del Hero reanuda la lección exacta en curso y el onboarding no bloquea la exploración libre.

- [ ] **F2-08 — Protección de cambios sin guardar al cambiar de Proveedor o Ruta**
  - **Tarea:** Si el usuario tiene texto en edición sin guardar en un informe Senior o una importación en curso y cambia el selector de proveedor en el Header, pedir confirmación accesible o autoguardar atómicamente en el scope previo antes de conmutar el contexto.
  - **Skills / Vigilio Docs:** `ux-web-experience`, `web-mfe-build-feature` · `vigilio-docs/standards/experience/components-states-and-contracts.md`.
  - **Resultado 100%:** Cero pérdida accidental de borradores o contaminación cruzada al conmutar `AWS ↔ Azure ↔ GCP`.

---

### BLOQUE 3 — Design System, Tokens WCAG AA, Responsive Móvil, Mascota y Componentes UI (11 Tareas)

- [ ] **F3-01 — Corregir sistema de tokens CSS para contraste WCAG 2.2 AA en Dark y Light Mode**
  - **Tarea:** Separar en `src/design-system/tokens.css` el acento decorativo (`--accent-surface`, `--accent-border`) del acento de texto/enlaces (`--accent-text`) y texto sobre botón primario (`--on-accent`). Ajustar en `data-theme="light"` tonos accesibles (ej. AWS `#b45309`, Azure `#0369a1`, GCP `#15803d` para texto sobre blanco) garantizando ratio `>= 4.5:1` en texto normal y `>= 3:1` en controles UI.
  - **Skills / Vigilio Docs:** `ui-design-system`, `ux-accessibility` · `vigilio-docs/standards/experience/design-tokens-modes-and-theming.md`, `vigilio-docs/standards/experience/accessibility-inclusive-interactions.md`.
  - **Resultado 100%:** Auditoría automática `axe-core` pasa con `0` violaciones de `color-contrast` en las 6 combinaciones `(AWS, Azure, GCP) × (Dark, Light)`.

- [ ] **F3-02 — Arreglar menú móvil (`<= 720px`) para exponer Tema, Configuración y rutas completas**
  - **Tarea:** Incorporar dentro del drawer/menú móvil los controles de **Tema (Oscuro/Claro)**, **Configuración**, **Laboratorios** y **Mapa Curricular** (que hoy desaparecen por `.hide-mobile`), asegurando cierre con `Escape`, cierre al navegar, bloqueo de scroll de fondo controlado y tap targets `>= 44x44 px`.
  - **Skills / Vigilio Docs:** `ux-mobile-experience`, `ux-accessibility` · `vigilio-docs/standards/experience/responsive-adaptive-safe-area.md`.
  - **Resultado 100%:** En `320px` y `390px` todas las funciones de la app son 100% operables con dedo y teclado sin horizontal overflow.

- [ ] **F3-03 — Componente `ConfirmDialog` accesible (reemplazo de `window.confirm`)**
  - **Tarea:** Construir `src/components/ui/ConfirmDialog.tsx` usando `<dialog>` semántico / ARIA `role="alertdialog"`, *focus trap*, cierre con `Escape`, restauración del foco al botón invocador y resumen claro del impacto para: *Reiniciar progreso*, *Sobrescribir progreso global* y *Restaurar checkpoint Senior*.
  - **Skills / Vigilio Docs:** `ui-design-system`, `ux-accessibility` · `vigilio-docs/standards/experience/components-states-and-contracts.md`.
  - **Resultado 100%:** Cero llamadas a `window.confirm` nativo; diálogos probados con teclado (`Tab`, `Shift+Tab`, `Escape`, `Enter`).

- [ ] **F3-04 — Componente `CodeBlock` de ingeniería con clasificación de riesgo y copiado accesible**
  - **Tarea:** Crear `src/components/ui/CodeBlock.tsx` que muestre lenguaje (`bash`, `hcl`, `yaml`, `json`), proveedor, badge obligatorio de efecto (`SOLO LECTURA` verde | `CREA RECURSOS / COSTO` ámbar | `DESTRUCTIVO / REQUIERE PLAN` rojo), scroll horizontal limpio en `320px` y botón copiar con anuncio `aria-live`.
  - **Skills / Vigilio Docs:** `ui-design-system`, `ux-web-experience` · `vigilio-docs/standards/experience/components-states-and-contracts.md`.
  - **Resultado 100%:** Todo comando o snippet en Aula, Labs y Senior declara explícitamente su nivel de riesgo operativo y financiero.

- [ ] **F3-05 — Componente `CloudServiceComparison` (Comparador Multicloud 3 columnas / acordeón móvil)**
  - **Tarea:** Crear componente reutilizable en Aula que compare para la unidad activa **AWS vs Azure vs GCP**: servicio principal, jerarquía/alcance (ej. VPC regional vs global), modelo de permisos, facturación clave y **qué NO es equivalente** entre los tres.
  - **Skills / Vigilio Docs:** `ui-design-system`, `ux-mobile-experience` · `vigilio-docs/standards/experience/responsive-adaptive-safe-area.md`.
  - **Resultado 100%:** Cada unidad permite abrir/ver "Comparar las 3 nubes" sin tablas rotas en móvil.

- [ ] **F3-06 — Componente `ArchitectureDiagram` accesible (SVG temático + descripción estructurada)**
  - **Tarea:** Crear renderizador declarativo de diagramas topológicos (capas Internet → Edge/LB → App privada → Datos aislados / Observabilidad / IAM) adaptable a tokens Dark/Light y proveedor activo, acompañado siempre de `<figcaption>` y descripción textual accesible para lectores de pantalla.
  - **Skills / Vigilio Docs:** `ux-accessibility`, `ui-art-direction` · `vigilio-docs/standards/experience/accessibility-inclusive-interactions.md`.
  - **Resultado 100%:** Los 18 módulos y casos Senior cuentan con diagrama técnico claro, escalable y accesible sin imágenes pixeladas.

- [ ] **F3-07 — Componente `MarkdownViewer` seguro (Cero XSS / Cero `dangerouslySetInnerHTML` sin filtro)**
  - **Tarea:** Implementar parser estructural seguro a nodos Preact (encabezados, listas, tablas responsivas, callouts de advertencia y bloques de código enlazados a `CodeBlock`) para renderizar dentro de la SPA las 54 guías de `labs/{aws,azure,gcp}/*.md` y los 54 cuadernos Senior sin inyectar HTML crudo.
  - **Skills / Vigilio Docs:** `web-mfe-security-delivery`, `web-mfe-build-feature` · `vigilio-docs/stacks/frontend/web-mfe/security/9-seguridad-hardening-privacidad.md`.
  - **Resultado 100%:** Renderizado rico de guías Markdown dentro de la app manteniendo `0` usos de `innerHTML` / `dangerouslySetInnerHTML`.

- [ ] **F3-08 — Componente `CloudMentor` unificado con dimensiones reservadas (Cero CLS) y poses contextuales**
  - **Tarea:** Crear `src/components/mascot/CloudMentor.tsx` preservando intactos los 5 archivos originales de `public/assets/`, reservando `width`/`height` y `aspect-ratio` explícitos para evitar saltos de layout al cambiar de proveedor, recortando/mapeando poses de `cloud-mentor-poses.png` o variantes SVG/badge de estado (bienvenida, explicando, celebrando quiz, pensando, alerta incidente, empty state) manteniendo los rasgos canónicos aprobados (nube con lentes rectangulares, headset y equipo táctico).
  - **Skills / Vigilio Docs:** `ui-art-direction`, `web-mfe-quality` · `vigilio-docs/standards/experience/visual-art-direction-and-originality.md`.
  - **Resultado 100%:** `CLS < 0.02` al cambiar `AWS ↔ Azure ↔ GCP`, sin halos blancos defectuosos en Dark/Light mode y `alt` semántico correcto.

- [ ] **F3-09 — Estados transversales de UI (`BannerStorageError`, `OfflineIndicator`, `EmptyState`, `Tabs` ARIA)**
  - **Tarea:** Añadir barra persistente recuperable cuando `localStorage` falle (con botón directo de exportación JSON), indicador discreto de estado sin red (aclarando que la SPA sigue funcionando local salvo links externos), y corregir `ProgressBar` con `role="progressbar"`, `aria-valuenow`, `aria-valuemin` y `aria-valuemax`.
  - **Skills / Vigilio Docs:** `ux-accessibility`, `ui-design-system` · `vigilio-docs/standards/experience/components-states-and-contracts.md`.
  - **Resultado 100%:** Todos los widgets interactivos anuncian valor, estado y errores a lectores de pantalla.

- [ ] **F3-10 — Preferencias avanzadas en `SettingsPage` (Movimiento reducido, Gestión granular de datos)**
  - **Tarea:** Agregar en Ajustes: toggle explícito de **Reducir animaciones** (`data-motion="reduced"` además de respetar `@media (prefers-reduced-motion)`), exportación/borrado granular (poder reiniciar solo una nube o solo un expediente Senior sin perder toda la academia) e resumen de uso de almacenamiento local.
  - **Skills / Vigilio Docs:** `ui-interaction-motion`, `ux-web-experience` · `vigilio-docs/standards/experience/motion-feedback-and-haptics.md`.
  - **Resultado 100%:** Control total del usuario sobre accesibilidad motriz/vestibular y sobre sus datos locales.

- [ ] **F3-11 — Auto-alojar tipografías WOFF2 locales y eliminar dependencia de Google Fonts en `index.html`**
  - **Tarea:** Incluir los subsets latinos WOFF2 de `DM Sans`, `Space Grotesk` y `JetBrains Mono` en `public/fonts/` con `@font-face` y `font-display: swap`, retirando los `<link href="https://fonts.googleapis.com...">` de `index.html`.
  - **Skills / Vigilio Docs:** `web-mfe-quality`, `web-mfe-security-delivery` · `vigilio-docs/stacks/frontend/web-mfe/security/9-seguridad-hardening-privacidad.md`.
  - **Resultado 100%:** Carga 100% local/offline sin fugas de IP a terceros y CSP endurecida sin dominios externos.

---

### BLOQUE 4 — Senior Mode Nivel Producción Educativa (10 Tareas)

- [ ] **F4-01 — Evidencias (`Exhibits`) realistas y nativas por proveedor para las 54 combinaciones (`18 casos × 3 nubes`)**
  - **Tarea:** Ampliar `src/data/seniorInvestigations.ts` para que cada caso `S01–S18` entregue artefactos específicos según `aws`, `azure` o `gcp` (ej. en `S01`: diff real de `aws_db_instance` vs `azurerm_postgresql_flexible_server` vs `google_sql_database_instance`; en `S09`: S3 Bucket Policy + PublicAccessBlock vs Azure Blob anonymous access vs GCS IAM `allUsers`), con `evidenceId`, timestamp ISO, fuente (`CloudTrail / Activity Log / Cloud Audit Logs`) y comandos CLI de diagnóstico específicos por caso y nube.
  - **Skills / Vigilio Docs:** `aws-platform-foundation`, `terraform-iac-delivery`, `kubernetes-eks-delivery`, `complete-work-no-shortcuts` · `vigilio-docs/platform/sre/operational-evidence.md`.
  - **Resultado 100%:** Cambiar de AWS a Azure o GCP en cualquier caso Senior actualiza logs, configuraciones, nombres de recursos y comandos al ecosistema real elegido.

- [ ] **F4-02 — Añadir contrapruebas / «Red Herrings» (ruido operativo realista) en la etapa Investigar**
  - **Tarea:** Incluir en cada expediente al menos un artefacto secundario benigno o síntoma colateral (ej. pico de CPU normal de cronjob o warning no relacionado) para que el alumno deba distinguir correlación real de falsa alarma al citar evidencias.
  - **Skills / Vigilio Docs:** `platform-observability-sre`, `diagnosing-bugs` · `vigilio-docs/standards/observability/slo-runbooks.md`.
  - **Resultado 100%:** Evaluación de citas verifica que el alumno seleccione las evidencias causales y descarte el distractor con explicación formativa.

- [ ] **F4-03 — Componente `IncidentTimeline` interactivo por caso Senior**
  - **Tarea:** Añadir línea de tiempo cronológica (`T-15m`, `T-00m alerta`, `T+04m síntoma`, `T+10m escalado`) vinculando despliegues, cambios de configuración, métricas y alertas para entrenar análisis de causalidad temporal.
  - **Skills / Vigilio Docs:** `platform-observability-sre`, `ux-web-experience` · `vigilio-docs/platform-runtime/1-observability-contract.md`.
  - **Resultado 100%:** Cada uno de los 18 expedientes cuenta con timeline navegable e inspeccionable.

- [ ] **F4-04 — Nuevo laboratorio embebido `CodeReviewLab` para incidentes de código/configuración (S01, S02, S03, S07, S09, S12, S15)**
  - **Tarea:** Permitir inspeccionar fragmentos numerados por línea de HCL Terraform, políticas IAM/RBAC, `Deployment.yaml` de Kubernetes y workflows de GitHub Actions para señalar la línea exacta del defecto de seguridad/resiliencia y comparar contra la versión remediada.
  - **Skills / Vigilio Docs:** `terraform-iac-delivery`, `kubernetes-policy-runtime-security`, `software-supply-chain-security` · `vigilio-docs/platform/security/supply-chain.md`.
  - **Resultado 100%:** Revisión práctica de código de infraestructura determinista e interactiva dentro del expediente Senior.

- [ ] **F4-05 — Separar Mitigación Inmediata vs Reparación Permanente y aleatorizar/variar posición de respuestas**
  - **Tarea:** Verificar que en `seniorDiagnostics.ts` y `senior.ts` la opción correcta no siga un patrón predecible, detallar en cada opción de decisión el **trade-off** (impacto en usuarios, tiempo, reversibilidad y riesgo de seguridad) y explicar por qué cada distractor empeora el incidente.
  - **Skills / Vigilio Docs:** `platform-resilience-disaster-recovery`, `complete-work-no-shortcuts` · `vigilio-docs/platform/sre/backup-disaster-recovery.md`.
  - **Resultado 100%:** Feedback específico por opción elegida (no un único texto genérico) en los 18 casos.

- [ ] **F4-06 — Ampliar el Informe Senior a estándar Postmortem / ADR profesional y exportar a Markdown + JSON**
  - **Tarea:** Mantener compatibilidad con los 4 campos obligatorios de V9 (`cause`, `mitigation`, `rollback`, `validation`) y añadir secciones estructuradas opcionales/profesionales (`impact`, `discardedHypotheses`, `communicationPlan`, `preventiveActions`), más botón **Descargar Postmortem / ADR (.md)** listo para portfolio además del JSON actual.
  - **Skills / Vigilio Docs:** `platform-observability-sre` · `vigilio-docs/platform/sre/adr-threat-modeling.md`.
  - **Resultado 100%:** El estudiante puede exportar un documento Markdown limpio de ingeniería además del respaldo JSON portable.

- [ ] **F4-07 — Visor integrado del Cuaderno Práctico del proveedor dentro de Senior Mode**
  - **Tarea:** Además del link de descarga `/senior-guides/${p}/${id}.md`, permitir previsualizar el cuaderno específico del proveedor directamente en un panel/modal con `MarkdownViewer` sin salir del expediente.
  - **Skills / Vigilio Docs:** `ux-web-experience`, `web-mfe-build-feature` · `vigilio-docs/standards/experience/information-architecture-and-user-flows.md`.
  - **Resultado 100%:** Consulta inmediata de los 54 cuadernos Senior en desktop y móvil.

- [ ] **F4-08 — Filtros completos en el catálogo Senior y normalización de búsqueda en español**
  - **Tarea:** Añadir al catálogo Senior filtro por **Dominio/Categoría** (`IaC`, `Security`, `FinOps`, `Kubernetes`, `SRE`, `Resilience/DR`, `Architecture`), filtro por **Estado del alumno** (`Todos`, `Sin iniciar`, `En curso`, `Registrado`) y búsqueda insensible a tildes/mayúsculas (`filtración` == `filtracion`).
  - **Skills / Vigilio Docs:** `ux-information-architecture`, `ux-web-experience` · `vigilio-docs/standards/experience/content-forms-localization-and-trust.md`.
  - **Resultado 100%:** Descubribilidad instantánea de los 18 casos con contador exacto de resultados filtrados.

- [ ] **F4-09 — Motor de recomendación de refuerzo post-intento y comparador de historial**
  - **Tarea:** Vincular cada caso `S01–S18` con los módulos y unidades curriculares relacionados (ej. `S01 → Módulo 11 Terraform unidades 11.03 y 11.05`; `S14 → Módulo 09 Serverless unidad 09.04` y `Módulo 16 Datos`), mostrando enlaces directos de repaso tras un intento fallido y permitiendo inspeccionar intentos previos en la Bitácora.
  - **Skills / Vigilio Docs:** `ux-information-architecture`, `complete-work-no-shortcuts` · `vigilio-docs/standards/engineering/use-case-traceability.md`.
  - **Resultado 100%:** Ciclo pedagógico cerrado entre Senior Mode y las 90 unidades del Aula.

- [ ] **F4-10 — Importación/Exportación de Revisión Docente Local con validación de schema JSON**
  - **Tarea:** Permitir al instructor/revisor importar un `expediente-senior-<cloud>-<case>.json` o `informe-<cloud>-<case>.json` del alumno para evaluarlo localmente contra `schemas/instructor-review.schema.json` sin tocar el propio borrador del revisor, manteniendo siempre visible la etiqueta `"Revisión local no autenticada"`.
  - **Skills / Vigilio Docs:** `web-mfe-security-delivery`, `web-mfe-build-feature` · `vigilio-docs/standards/security/authorization.md`.
  - **Resultado 100%:** Flujo completo alumno → exporta informe → docente revisa con rúbrica ponderada → exporta feedback JSON validado.

---

### BLOQUE 5 — Motores de Simulación Puros + Nuevos Simuladores Interactivos (11 Tareas)

- [ ] **F5-01 — Extraer y endurecer los 5 motores existentes como funciones puras tipadas (`src/features/simulators/engines/`)**
  - **Tarea:** Sacar de `App.tsx` los motores `cidrEngine.ts`, `iamEngine.ts`, `autoscalingEngine.ts`, `sloEngine.ts` y `architectureDecisionEngine.ts` con entradas/salidas estrictas, versión del modelo, explicaciones paso a paso, botón `Reiniciar`, `Copiar resultado` y `Descargar reporte`.
  - **Skills / Vigilio Docs:** `symbol-ownership-architecture`, `web-mfe-build-feature` · `vigilio-docs/standards/engineering/file-and-symbol-ownership.md`.
  - **Resultado 100%:** 100% de lógica matemática/evaluativa desacoplada del DOM y probada unitariamente; en CIDR calcula además IPs reservadas reales por nube (`AWS = 5`, `Azure = 5`, `GCP = 4`) y casos `/0`, `/31`, `/32`.

- [ ] **F5-02 — Mejorar `iamEngine.ts` con evaluación explícita de `Deny > Allow`, condiciones y alcance por nube**
  - **Tarea:** Soportar múltiples declaraciones (Identity Policy + Resource Policy / Guardrail SCP / Azure Deny Assignment / GCP IAM Binding), demostrando precedencia de `Explicit Deny`, `Implicit Deny` por defecto y condiciones básicas (`MFA`, región), declarando explícitamente las diferencias del modelo educativo frente al evaluador oficial.
  - **Skills / Vigilio Docs:** `aws-platform-foundation` · `vigilio-docs/standards/security/authorization.md`.
  - **Resultado 100%:** Simulador IAM enseña mínimo privilegio real, *explicit deny* y diferencias AWS IAM vs Azure RBAC vs GCP IAM.

- [ ] **F5-03 — Nuevo Simulador 06: `Routing & Firewall Lab` (`routingEngine.ts`)**
  - **Tarea:** Simular flujo de paquetes entre Internet, subred pública (ALB/NAT), subred privada (App) y subred aislada (DB) evaluando tabla de rutas (longest prefix match), Security Groups (stateful) vs NACL/NSG/Firewall Rules y Private Endpoints.
  - **Skills / Vigilio Docs:** `aws-platform-foundation`, `web-mfe-build-feature` · `vigilio-docs/platform/aws/platform-foundation.md`.
  - **Resultado 100%:** Diagnostica visualmente si un paquete llega o cae bloqueado y en qué salto exacto ocurre el bloqueo.

- [ ] **F5-04 — Nuevo Simulador 07: `Terraform Plan & Drift Inspector` (`terraformPlanEngine.ts`)**
  - **Tarea:** Analizar escenarios de `terraform plan` (`create`, `update in-place`, `destroy and recreate / ForceNew`, `drift` fuera de banda y falta de `state locking`), calculando blast radius y recomendando acción segura (`prevent_destroy`, `moved`, ventana/restore drill).
  - **Skills / Vigilio Docs:** `terraform-iac-delivery` · `vigilio-docs/platform/iac/state-and-drift.md`.
  - **Resultado 100%:** Entrena lectura crítica de planes IaC sin ejecutar binarios ni pedir credenciales.

- [ ] **F5-05 — Nuevo Simulador 08: `Kubernetes Scheduler & Failure Lab` (`k8sLabEngine.ts`)**
  - **Tarea:** Simular asignación de Pods en nodos según `requests/limits` de CPU/RAM, `PodDisruptionBudget`, `readinessProbe`/`livenessProbe`, `HPA` y causas de `Pending`, `OOMKilled` y `CrashLoopBackOff`.
  - **Skills / Vigilio Docs:** `kubernetes-eks-delivery`, `platform-scalability-capacity` · `vigilio-docs/platform/kubernetes/scalability-capacity.md`.
  - **Resultado 100%:** Demuestra determinísticamente por qué un rollout falla o satura nodos antes de tocar un clúster.

- [ ] **F5-06 — Nuevo Simulador 09: `Load Balancing & Dependency Backpressure Lab` (`loadBalancingEngine.ts`)**
  - **Tarea:** Modelar tráfico entrante, instancias sanas/degradadas, health checks, latencia y límite de conexiones de una base de datos aguas abajo (demostrando cómo autoescalar réplicas sin pool/backpressure tumba la DB).
  - **Skills / Vigilio Docs:** `platform-scalability-capacity`, `platform-observability-sre` · `vigilio-docs/platform/architecture/reference-topologies.md`.
  - **Resultado 100%:** Conecta los conceptos de Redes Avanzadas, SRE y el caso Senior `S16`.

- [ ] **F5-07 — Nuevo Simulador 10: `FinOps & Cloud Cost Scenario Lab` (`finopsEngine.ts`)**
  - **Tarea:** Modelar escenarios de costo unitario (cómputo on-demand vs reservas/ARM64, cargos por GB en NAT Gateway vs VPC Endpoints, egress inter-región, tiers de object storage y cardinalidad de métricas), etiquetado claramente como **modelo hipotético educativo** con supuestos transparentes.
  - **Skills / Vigilio Docs:** `platform-finops` · `vigilio-docs/platform/finops/cloud-cost-intelligence.md`.
  - **Resultado 100%:** Calcula impacto porcentual de decisiones de arquitectura sobre la factura sin fingir tarifas oficiales en vivo.

- [ ] **F5-08 — Nuevo Simulador 11: `Disaster Recovery RTO / RPO Studio` (`drEngine.ts`)**
  - **Tarea:** Evaluar estrategias (`Backup & Restore`, `Pilot Light`, `Warm Standby`, `Multi-Site Active/Active`) frente a objetivos `RTO` y `RPO`, lag de replicación y costo operativo relativo, detectando incumplimientos de pérdida de datos aceptable.
  - **Skills / Vigilio Docs:** `platform-resilience-disaster-recovery` · `vigilio-docs/platform/sre/backup-disaster-recovery.md`.
  - **Resultado 100%:** Valida numéricamente si una topología cumple el `RTO/RPO` exigido por negocio.

- [ ] **F5-09 — Nuevo Simulador 12: `Messaging, Retries & Idempotency Lab` (`messagingEngine.ts`)**
  - **Tarea:** Simular productor → cola (`SQS / Service Bus / PubSub`) → consumidor con entrega *at-least-once*, fallos transitorios, mensajes venenosos → `DLQ` y efecto con/sin `idempotency_key` + `Outbox`.
  - **Skills / Vigilio Docs:** `aws-platform-foundation`, `platform-data-reliability` · `vigilio-docs/standards/messaging/outbox-idempotency.md`.
  - **Resultado 100%:** Demuestra visualmente por qué ocurren cobros duplicados y cómo la idempotencia + DLQ los eliminan.

- [ ] **F5-10 — Nuevo Simulador 13: `Observability & Burn-Rate Alert Lab` (`observabilityEngine.ts`)**
  - **Tarea:** Ampliar cálculo de SLO con tasas de consumo de presupuesto de error (*burn rate* ventana corta 1h / larga 6h), diferencia entre alertar por síntoma de usuario vs CPU aislada y correlación `traceparent`.
  - **Skills / Vigilio Docs:** `platform-observability-sre` · `vigilio-docs/standards/observability/slo-runbooks.md`.
  - **Resultado 100%:** El alumno comprende alertas multi-window multi-burn-rate estilo SRE moderno.

- [ ] **F5-11 — Catálogo de Simuladores con fichas de modelo, supuestos y límites documentados**
  - **Tarea:** En `/#/simuladores`, organizar los 13 motores por categoría (`Redes`, `Seguridad`, `Cómputo/K8s`, `IaC`, `Datos/Eventos`, `SRE/FinOps`, `Arquitectura`), mostrando en cada uno versión del motor, fórmula/reglas aplicadas y qué simplificaciones hace respecto a la nube real.
  - **Skills / Vigilio Docs:** `ux-information-architecture`, `complete-work-no-shortcuts` · `vigilio-docs/standards/experience/content-forms-localization-and-trust.md`.
  - **Resultado 100%:** Cero "cajas negras" en las simulaciones; cada resultado explica el *por qué* técnico.

---

### BLOQUE 6 — Currículo Profundo de 240h: 90 Unidades Reales, Quizzes y Progreso 6D (9 Tareas)

- [ ] **F6-01 — Diseñar contrato tipado de Unidad (`UnitContentSpec`) con núcleo común + adaptadores AWS/Azure/GCP**
  - **Tarea:** Crear esquema tipado en `src/domain/curriculum.ts` para que cada una de las 90 unidades (`01.01` a `18.05`) posea: objetivo observable, tiempo estimado, prerrequisitos, modelo mental específico, antipatrón real, glosario, adaptador específico por nube (`servicio`, `snippet CLI/IaC`, `diferencia crítica`, `doc oficial` con `verifiedAt`) y actividad verificable.
  - **Skills / Vigilio Docs:** `symbol-ownership-architecture`, `complete-work-no-shortcuts` · `vigilio-docs/standards/engineering/file-and-symbol-ownership.md`.
  - **Resultado 100%:** Contrato de datos capaz de alimentar las 90 lecciones sin repetir bloques clónicos.

- [ ] **F6-02 — Desarrollar contenido específico y único para las 30 unidades del Nivel 1: Fundamentos (Módulos 01–06)**
  - **Tarea:** Reemplazar el texto genérico repetido de `studyUnits` en `cloud-fundamentals`, `networks`, `compute`, `storage`, `identity` y `costs` (unidades `01.01` a `06.05`) con teoría propia por unidad, ejemplos concretos AWS/Azure/GCP, snippets seguros y glosario para principiantes.
  - **Skills / Vigilio Docs:** `complete-work-no-shortcuts`, `aws-platform-foundation`, `platform-finops` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Anexo A.01–A.06).
  - **Resultado 100%:** 30 unidades básicas con explicación original, antipatrón propio y cero párrafos copiados/pegados entre temas.

- [ ] **F6-03 — Desarrollar contenido específico y único para las 30 unidades del Nivel 2: Ingeniería (Módulos 07–12)**
  - **Tarea:** Producir el contenido completo de `cloud-cli`, `advanced-network`, `serverless`, `containers`, `iac` y `observability` (unidades `07.01` a `12.05`) alineado a buenas prácticas Vigilio: scripts Bash con `set -euo pipefail`, endpoints privados, idempotencia/DLQ, Docker non-root/Distroless, K8s probes/resources, Terraform remote state locking y GitHub Actions con OIDC.
  - **Skills / Vigilio Docs:** `complete-work-no-shortcuts`, `terraform-iac-delivery`, `kubernetes-eks-delivery`, `platform-cicd-factory`, `platform-observability-sre` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Anexo A.07–A.12).
  - **Resultado 100%:** 30 unidades intermedias con fragmentos reales de Bash, Dockerfile, Kubernetes YAML, HCL y GitHub Actions diferenciados por proveedor.

- [ ] **F6-04 — Desarrollar contenido específico y único para las 30 unidades del Nivel 3: Arquitectura (Módulos 13–18)**
  - **Tarea:** Producir el contenido completo de `software-architecture`, `governance`, `resilience`, `data-architecture`, `sre-finops` y `capstone` (unidades `13.01` a `18.05`): monolito modular vs microservicios, ADR, Landing Zones, Zero Trust, KMS, RTO/RPO, GameDays, Outbox/consistencia, SLIs/SLOs, Platform Engineering y TCO multicloud.
  - **Skills / Vigilio Docs:** `complete-work-no-shortcuts`, `vigilio-architecture-guide`, `platform-resilience-disaster-recovery`, `platform-finops`, `platform-data-reliability` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Anexo A.13–A.18).
  - **Resultado 100%:** Las 90 unidades del plan de 240h poseen contenido técnico profundo, único y auditable por tests de no-duplicación.

- [ ] **F6-05 — Ampliar el banco de evaluaciones de 18 preguntas únicas a banco completo por competencia/unidad**
  - **Tarea:** Crear al menos 3–5 preguntas razonadas por módulo (cubriendo las 90 unidades, mínimo 90–108 reactivos curados) con selección única, selección múltiple, lectura de snippets/planes y análisis de fallos, incluyendo explicación detallada de por qué acierta o falla cada opción y enlace a la unidad de refuerzo.
  - **Skills / Vigilio Docs:** `complete-work-no-shortcuts`, `web-mfe-build-feature` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 12).
  - **Resultado 100%:** Ningún módulo se aprueba memorizando una única pregunta trivial de 3 opciones.

- [ ] **F6-06 — Implementar dinámicas interactivas estilo GoPixel (`Bug Hunter`, `Ordenar Despliegue`, `Architecture Match`)**
  - **Tarea:** Añadir en el Aula micro-retos deterministas: encontrar el bug de seguridad/costo en un snippet HCL/YAML/IAM (`Bug Hunter`), ordenar los pasos seguros de aprovisionamiento y cleanup (`Order Steps`) y emparejar requisitos no funcionales con servicios del proveedor activo (`Architecture Match`).
  - **Skills / Vigilio Docs:** `ux-web-experience`, `ui-interaction-motion` · `docs/MASTER_SPEC.md` (Sección 9).
  - **Resultado 100%:** Aprendizaje activo tipo GoPixel sin inflar XP por recargar la página.

- [ ] **F6-07 — Preservar historial de intentos y mejor puntuación en Quizzes sin sobrescribir logros**
  - **Tarea:** Corregir `setQuiz` en `state.ts` (que hoy sobrescribe `100` con `0` si el alumno vuelve a probar una opción incorrecta por curiosidad) guardando `{ bestScore, lastScore, attempts }` por proveedor y módulo/unidad.
  - **Skills / Vigilio Docs:** `web-mfe-build-feature` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 12.2).
  - **Resultado 100%:** Reintentar con fines de estudio conserva `bestScore` e incrementa `attempts` de forma idempotente.

- [ ] **F6-08 — Separar las 6 dimensiones del progreso académico en `Progress` y `Learn`**
  - **Tarea:** Desglosar en `Mi progreso` y en las tarjetas de módulo métricas independientes y transparentes: **(1) Teoría/Unidades trabajadas**, **(2) Evaluaciones aprobadas**, **(3) Simuladores practicados**, **(4) Laboratorios autodeclarados con evidencia**, **(5) Proyectos integradores**, **(6) Expedientes Senior registrados**, distinguiendo progreso conceptual transversal de práctica por nube.
  - **Skills / Vigilio Docs:** `ux-information-architecture`, `ux-web-experience` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 10.2).
  - **Resultado 100%:** Cero porcentajes ambiguos; el alumno sabe exactamente qué practicó en AWS, en Azure y en GCP.

- [ ] **F6-09 — Glosario técnico contextual y buscador global de conceptos/siglas**
  - **Tarea:** Incorporar glosario consultable (`CIDR`, `IAM`, `RBAC`, `OIDC`, `RTO`, `RPO`, `SLI`, `SLO`, `DLQ`, `KMS`, `NAT`, `NSG`, `SG`, `State Locking`, `Drift`, `SBOM`, `FinOps`) accesible desde el Aula para no bloquear a principiantes absolutos.
  - **Skills / Vigilio Docs:** `ux-web-experience`, `ux-accessibility` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 11.1).
  - **Resultado 100%:** Cobertura completa para el perfil *Principiante absoluto* hasta *Arquitecto*.

---

### BLOQUE 7 — Laboratorios Conectados: 54 Guías, `prod-local`, Terraform y Cleanup (8 Tareas)

- [ ] **F7-01 — Conectar las 54 guías `labs/{aws,azure,gcp}/*.md` y las 3 guías `labs/devsecops/*.md` a la vista `Lab`**
  - **Tarea:** Exponer de forma estática/empaquetada las guías Markdown existentes en `labs/` (conservando intactos los archivos originales en `labs/` por integridad V9) para renderizarlas con `MarkdownViewer` dentro de `#/labs/:moduleId` y permitir descargar el `.md` específico del proveedor activo.
  - **Skills / Vigilio Docs:** `web-mfe-build-feature`, `complete-work-no-shortcuts` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 13.5).
  - **Resultado 100%:** Las 54 guías de módulo y 3 guías OIDC dejan de ser archivos huérfanos en el repo y son 100% visibles y descargables en la UI.

- [ ] **F7-02 — Distinguir explícitamente las 3 modalidades en `Lab` (`Modalidad A: Simulador`, `Modalidad B: Local`, `Modalidad C: Cuenta Propia`)**
  - **Tarea:** Reestructurar los tabs de `Lab` en las 3 modalidades oficiales del contrato, enlazando el simulador correspondiente en Modalidad A, instrucciones Docker/Compose/Kind/Terraform local en Modalidad B y preflight de costos/MFA/región/cleanup en Modalidad C.
  - **Skills / Vigilio Docs:** `platform-local-production-lab`, `ux-web-experience` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 13.1–13.3).
  - **Resultado 100%:** Un alumno sin tarjeta de crédito ni cuenta cloud puede practicar en Modalidad A y B sin fricción ni confusión.

- [ ] **F7-03 — Crear kit de laboratorio local reproducible (`labs/local-sandbox/`) alineado a `platform-local-production-lab`**
  - **Tarea:** Añadir un kit local seguro basado en `compose.yaml` (aplicación HTTP de ejemplo + PostgreSQL + proxy/redes aisladas sin puertos expuestos a `0.0.0.0` innecesarios, más manifiestos Kubernetes de ejemplo para Kind) con scripts `setup`, `verify` y `cleanup` documentados para Windows (PowerShell) y Linux/macOS (Bash), sin credenciales reales.
  - **Skills / Vigilio Docs:** `platform-local-production-lab`, `platform-compose-vps-delivery` · `vigilio-docs/platform/labs/production-local-simulation.md`.
  - **Resultado 100%:** Práctica local ejecutable y verificable en el equipo del alumno para módulos de Redes, Contenedores, Datos y Observabilidad.

- [ ] **F7-04 — Enriquecer y validar estáticamente los ejemplos Terraform (`labs/{aws,azure,gcp}/`)**
  - **Tarea:** Conservar intactos `labs/{aws,azure,gcp}/main.tf` si el manifiesto lo requiere o documentar su evolución controlada añadiendo ejemplos modulares con versiones fijadas (`required_providers`), etiquetas obligatorias FinOps (`Owner`, `Environment`, `CostCenter`, `ExpiresAt`), variables tipadas, outputs sin secretos y guía de `terraform fmt -check` + `terraform validate`.
  - **Skills / Vigilio Docs:** `terraform-iac-delivery`, `platform-finops` · `vigilio-docs/platform/iac/terraform-delivery.md`.
  - **Resultado 100%:** Materiales IaC con buenas prácticas enterprise reales y advertencias explícitas de facturación y `destroy` revisado.

- [ ] **F7-05 — Persistir estado de checklists de Laboratorio por proveedor y módulo**
  - **Tarea:** En `src/App.tsx` (L32), el array `checks` de `Lab` hoy vive solo en `useState([false,false,false,false,false])` y se pierde al recargar la página. Persistirlo de forma segura por `${provider}:${moduleId}` en `progress` junto con la modalidad elegida.
  - **Skills / Vigilio Docs:** `web-mfe-build-feature` · `vigilio-docs/technology/libraries/preact-signals.md`.
  - **Resultado 100%:** Recargar la página en mitad de un laboratorio conserva los pasos verificados y el cuaderno de evidencias.

- [ ] **F7-06 — Detector local preventivo de secretos accidentales en notas y cuadernos del alumno**
  - **Tarea:** Antes de guardar notas en `localStorage` o exportar un JSON/Markdown de progreso o Senior Mode, pasar un filtro heurístico local (patrones `AKIA...`, `AIza...`, `ghp_...`, `-----BEGIN PRIVATE KEY-----`, JWTs `eyJ...`) que advierta y bloquee pegados accidentales de credenciales reales por parte del estudiante.
  - **Skills / Vigilio Docs:** `web-mfe-security-delivery` · `vigilio-docs/standards/security/secrets-and-privacy.md`.
  - **Resultado 100%:** Protección activa al alumno para que no exporte ni persista secretos reales en su navegador.

- [ ] **F7-07 — Metadatos verificables en cada guía de laboratorio (permisos mínimos, tiempo, riesgo de costo y fecha de revisión)**
  - **Tarea:** Incorporar ficha estructurada visible en las 18×3 prácticas indicando duración estimada, prerrequisitos, permisos IAM/RBAC mínimos de consulta, recursos que podrían facturar y checklist de verificación post-cleanup.
  - **Skills / Vigilio Docs:** `aws-platform-foundation`, `platform-finops` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 13.4).
  - **Resultado 100%:** Cumplimiento total del contrato de seguridad y costos de laboratorios (`docs/CLOUD_SAFETY.md`).

- [ ] **F7-08 — Exportador de Evidencia de Laboratorio en Markdown/JSON para entrega docente**
  - **Tarea:** Añadir en `Lab` botón `"Exportar reporte de práctica"` que descargue el módulo, proveedor, modalidad declarada, pasos verificados, notas del alumno y descargo de responsabilidad ("autodeclarado local, no verificado contra API cloud").
  - **Skills / Vigilio Docs:** `ux-web-experience`, `complete-work-no-shortcuts` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 13.1).
  - **Resultado 100%:** Entregable limpio y trazable para revisión por un instructor.

---

### BLOQUE 8 — Suite Completa de Testing: Unitarios, Componentes, E2E Playwright y Accesibilidad (12 Tareas)

- [ ] **F8-01 — Tests unitarios exhaustivos para los 13 motores de simulación (`tests/simulators-*.test.mjs`)**
  - **Tarea:** Cubrir happy paths, límites matemáticos (`/0`, `/31`, `/32`, IPs inválidas, overflow, carga `0`, disponibilidad `100%` y `99.99%`), diferencias por proveedor y entradas malformadas en los 5 motores base + los 8 nuevos.
  - **Skills / Vigilio Docs:** `web-mfe-testing`, `complete-work-no-shortcuts` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 28.2).
  - **Resultado 100%:** 100% de los motores puros de simulación cubiertos por pruebas rápidas deterministas sin DOM.

- [ ] **F8-02 — Tests unitarios de Currículo, No-Duplicación de las 90 Unidades y Cobertura 54×Senior**
  - **Tarea:** Escribir tests automáticos que verifiquen que las 90 unidades tienen textos únicos (prohibido boilerplate clonado), enlaces `https://` válidos a docs oficiales, quizzes completos y que los 18 casos × 3 nubes tienen exhibits diferenciados por proveedor.
  - **Skills / Vigilio Docs:** `complete-work-no-shortcuts` · `vigilio-docs/governance/complete-work-coverage-policy.md`.
  - **Resultado 100%:** Gate automático en `npm test` que impide introducir contenido vacío o repetido.

- [ ] **F8-03 — Tests unitarios de Router, Migraciones de Storage (`V1–V9 → V10`) y Detector de Secretos en Notas**
  - **Tarea:** Probar parsing de todas las rutas hash + `?cloud=`, normalización de rutas rotas, migración sin pérdida de JSONs heredados, rechazo de payloads adversarios (`__proto__`, `NaN`, archivos `> 8 MB`) y bloqueo de claves `AKIA...` en notas.
  - **Skills / Vigilio Docs:** `web-mfe-testing`, `web-mfe-security-delivery` · `vigilio-docs/standards/testing/strategy.md`.
  - **Resultado 100%:** Fronteras de estado y persistencia probadas con entradas hostiles.

- [ ] **F8-04 — E2E-01 & E2E-03: Navegación Multicloud Transaccional y Aislamiento de Progreso entre Nubes**
  - **Tarea:** Automatizar en Playwright el cambio `AWS → Azure → GCP → AWS` desde Home, Catálogo, Aula, Simuladores y Senior, verificando cambio de paleta, mascota, nombres de servicios, URL `?cloud=` y que completar una lección/lab en AWS no la marque completada en Azure/GCP.
  - **Skills / Vigilio Docs:** `web-mfe-testing` · `vigilio-docs/standards/testing/e2e-quality-gates.md`, `vigilio-docs/technology/libraries/playwright.md`.
  - **Resultado 100%:** `PASS` en navegador real usando exclusivamente selectores accesibles (`getByRole`, `getByLabel`) y cero `waitForTimeout`.

- [ ] **F8-05 — E2E-02: Recorrido completo de Aula, las 90 Unidades, Quiz sin perder mejor nota y Persistencia tras Reload**
  - **Tarea:** Probar entrar a un módulo, navegar entre sus 5 unidades por URL y sidebar, abrir comparativa de las 3 nubes, aprobar quiz, reintentar con fallo verificando que `bestScore` se conserva, marcar unidad y recargar página.
  - **Skills / Vigilio Docs:** `web-mfe-testing` · `vigilio-docs/stacks/frontend/web-mfe/testing/e2e-playwright.md`.
  - **Resultado 100%:** Flujo pedagógico central verificado de extremo a extremo.

- [ ] **F8-06 — E2E-04: Flujo completo de Laboratorio, Lectura de Guía Markdown, Checklist Persistente y Descarga**
  - **Tarea:** Probar `/#/labs`, filtrar laboratorios, abrir un lab, visualizar la guía Markdown del proveedor activo, marcar los 5 checks, recargar para comprobar persistencia, guardar evidencia, verificar bloqueo si se pega una clave `AKIA` simulada y descargar reporte.
  - **Skills / Vigilio Docs:** `web-mfe-testing` · `vigilio-docs/standards/testing/e2e-quality-gates.md`.
  - **Resultado 100%:** Verificación E2E real de laboratorios en las tres rutas cloud.

- [ ] **F8-07 — E2E-05: Ejecución en navegador de los Simuladores Interactivos (Casos válidos y de error)**
  - **Tarea:** Automatizar interacción con los simuladores en `/#/simuladores/:id` probando entradas válidas, entradas fuera de rango/inválidas, incremento de ejecuciones y descarga/copia de reporte.
  - **Skills / Vigilio Docs:** `web-mfe-testing` · `vigilio-docs/technology/libraries/playwright.md`.
  - **Resultado 100%:** Todos los motores responden en UI sin errores de consola ni excepciones no controladas.

- [ ] **F8-08 — E2E-06, E2E-07 & E2E-08: Recorrido Integral Senior Mode + Checkpoints Adversarios + Revisión Docente**
  - **Tarea:** Completar un expediente de principio a fin (Investigar 2+ evidencias → Diagnosticar → Decidir → Redactar 4 secciones + Postmortem → Citar → Registrar → Exportar JSON y Markdown → Importar rechazando otro proveedor con `ConfirmDialog` accesible → Completar y exportar `InstructorReview`).
  - **Skills / Vigilio Docs:** `web-mfe-testing` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 36.1).
  - **Resultado 100%:** Matriz especial de cambio de nube en Senior Mode (`S07 AWS ↔ Azure`) 100% automatizada y en `PASS`.

- [ ] **F8-09 — E2E-09: Exportación, Importación Global, Cancelación en `ConfirmDialog` y Rechazo de JSON Malicioso**
  - **Tarea:** Verificar en `/#/progreso` la descarga de `cloud-academy-progreso.json`, cancelación del diálogo de borrado sin perder datos, rechazo de JSON corrupto y restauración íntegra tras reinicio.
  - **Skills / Vigilio Docs:** `web-mfe-testing`, `web-mfe-security-delivery` · `vigilio-docs/standards/testing/e2e-quality-gates.md`.
  - **Resultado 100%:** Garantía E2E de cero pérdida de datos del estudiante.

- [ ] **F8-10 — E2E-10: Auditoría Automatizada de Accesibilidad (`@axe-core/playwright`) + Teclado + Responsive (`320px`, `390px`, `768px`, `1440px`)**
  - **Tarea:** Integrar `@axe-core/playwright` (o auditoría WCAG AA en Playwright) sobre todas las pantallas en `AWS/Azure/GCP × Dark/Light`, probar navegación completa con `Tab`/`Enter`/`Escape`, comprobar que en `320px`/`390px` Tema y Ajustes son accesibles desde el menú móvil y verificar `scrollWidth <= innerWidth` (cero overflow horizontal).
  - **Skills / Vigilio Docs:** `ux-accessibility`, `ux-mobile-experience`, `ui-quality-review` · `vigilio-docs/standards/experience/ux-quality-gates-and-ci-cd.md`.
  - **Resultado 100%:** `0` violaciones críticas/serias de accesibilidad y responsive comprobado matemáticamente en todos los breakpoints del contrato.

- [ ] **F8-11 — E2E-11 & E2E-12: Modo Offline (`context.setOffline(true)`), Rutas Rotas y Fallo de `localStorage`**
  - **Tarea:** Simular corte de red tras cargar la SPA para demostrar que lecciones, simuladores y Senior Mode siguen operando sin colgarse por fuentes o llamadas externas; probar `#/ruta-inexistente` y simular cuota excedida en `Storage.prototype.setItem` comprobando que aparece el banner de recuperación.
  - **Skills / Vigilio Docs:** `web-mfe-testing`, `ux-web-experience` · `vigilio-docs/standards/testing/e2e-quality-gates.md` (Controles 5, 38, 46).
  - **Resultado 100%:** Resiliencia total de cliente probada ante fallos de red, rutas y almacenamiento.

- [ ] **F8-12 — Matriz de Aceptación Documentada (`docs/ACCEPTANCE_REPORT_V10.md`)**
  - **Tarea:** Generar reporte trazable con el resultado real (`PASS` con comando, duración y entorno) de las **18 filas × 3 nubes = 54 celdas** de la Sección 36 de `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md`.
  - **Skills / Vigilio Docs:** `platform-validation-evidence`, `ui-quality-review` · `vigilio-docs/platform/sre/operational-evidence.md`.
  - **Resultado 100%:** Evidencia auditable celda por celda sin un solo `[x]` marcado sin prueba ejecutada.

---

### BLOQUE 9 — DevSecOps, Supply Chain, Biome Estricto, CSP y Documentación Final (10 Tareas)

- [ ] **F9-01 — Endurecer `biome.json` (`recommended: true`, `formatter: enabled`, `noExplicitAny: error`, `noUnusedVariables: error`)**
  - **Tarea:** Activar el linter recomendado y el formateador de Biome sobre `src`, `tests` y `scripts`, corrigiendo todos los hallazgos reales y cambiando el script CI a `biome ci src tests scripts`.
  - **Skills / Vigilio Docs:** `web-mfe-quality`, `coderabbit-compliance` · `vigilio-docs/technology/libraries/biome.md`.
  - **Resultado 100%:** `npm run lint` (`biome ci`) pasa con `0` errores y `0` reglas desactivadas injustificadamente.

- [ ] **F9-02 — Endurecer `.github/workflows/{quality,devsecops,codeql}.yml` según `platform-cicd-factory` y `software-supply-chain-security`**
  - **Tarea:** Fijar todas las GitHub Actions (`actions/checkout`, `actions/setup-node`, `actions/upload-artifact`, `github/codeql-action`) a **commit SHA completo de 40 caracteres** (con comentario de versión), añadir `persist-credentials: false` en `checkout`, cambiar `npm install` por `npm ci` usando el nuevo `package-lock.json`, y prohibir `continue-on-error: true`.
  - **Skills / Vigilio Docs:** `platform-cicd-factory`, `software-supply-chain-security` · `vigilio-docs/platform/cicd/pipeline-factory.md`, `vigilio-docs/platform/security/supply-chain.md`.
  - **Resultado 100%:** Workflows deterministas, reproducibles y endurecidos contra ataques de cadena de suministro.

- [ ] **F9-03 — Endurecer `public/_headers` (CSP sin CDNs externos, HSTS y aislamiento cross-origin)**
  - **Tarea:** Tras auto-alojar las fuentes WOFF2 (F3-11), retirar `https://fonts.googleapis.com` y `https://fonts.gstatic.com` de `Content-Security-Policy`, añadir `Strict-Transport-Security`, `Cross-Origin-Opener-Policy: same-origin` y test unitario/E2E que valide la presencia y sintaxis de todas las cabeceras en `public/_headers` y `dist/_headers`.
  - **Skills / Vigilio Docs:** `web-mfe-security-delivery` · `vigilio-docs/adr/0005-sin-dependencias-para-cabeceras-de-seguridad.md`.
  - **Resultado 100%:** Cabeceras de seguridad autónomas, sin dependencias externas y copiadas en `dist/` al compilar.

- [ ] **F9-04 — Generar y validar SBOM CycloneDX + Auditoría SCA (`npm audit`)**
  - **Tarea:** Ejecutar `npm audit --audit-level=high` (`0` vulnerabilidades altas/críticas) y verificar generación limpia de `npm sbom --sbom-format cyclonedx` mediante script `npm run sbom:check`.
  - **Skills / Vigilio Docs:** `software-supply-chain-security` · `vigilio-docs/standards/devsecops/supply-chain.md`.
  - **Resultado 100%:** Árbol de dependencias limpio y SBOM verificable localmente y en CI.

- [ ] **F9-05 — Presupuesto de Bundle y Performance (`scripts/check-bundle-budget.mjs`)**
  - **Tarea:** Añadir gate post-build que mida el tamaño de los chunks JS/CSS e imágenes en `dist/` y falle si el entrypoint inicial supera el presupuesto definido, previniendo regresiones al agregar el contenido de las 90 unidades.
  - **Skills / Vigilio Docs:** `web-mfe-quality` · `vigilio-docs/stacks/frontend/web-mfe/quality/8-calidad-seo-accesibilidad-rendimiento.md`.
  - **Resultado 100%:** Rendimiento garantizado por gate automático en `npm run verify`.

- [ ] **F9-06 — Crear documentación arquitectónica y editorial faltante (`docs/ARCHITECTURE.md`, `docs/CONTENT_AUTHORING.md`, `docs/ACCESSIBILITY.md`, `docs/RELEASE_CHECKLIST.md`)**
  - **Tarea:** Redactar los 4 documentos operativos pedidos en la Sección 34.1 de `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` con diagramas Mermaid reales de la SPA modularizada, guía para añadir nuevas unidades/casos Senior, matriz de accesibilidad y runbook de release/rollback.
  - **Skills / Vigilio Docs:** `architecture-traceability`, `skill-create-docs` · `vigilio-docs/governance/documentation-dry-and-ownership.md`.
  - **Resultado 100%:** Gobierno documental completo sin contradicciones con el código ejecutable.

- [ ] **F9-07 — Reescribir `README.md` al estándar de 15 secciones de `repository-readme-architecture` (conservando notas históricas en `CHANGELOG.md` / `docs/RELEASE_NOTES_V*.md`)**
  - **Tarea:** Estructurar `README.md` con Quickstart `< 10 min`, arquitectura real V10, árbol de carpetas con ownership, comandos de testing/verificación, límites éticos/técnicos honestos y troubleshooting en Windows/Linux/macOS.
  - **Skills / Vigilio Docs:** `repository-readme-architecture` · `vigilio-docs/standards/engineering/readme-standard.md`.
  - **Resultado 100%:** Cualquier ingeniero o docente levanta, entiende y audita el proyecto en menos de 10 minutos.

- [ ] **F9-08 — Ejecutar Revisión Independiente Read-Only (`review-code-change` + `ui-quality-review`)**
  - **Tarea:** Al cerrar cada bloque y antes de la entrega final, ejecutar fase `REVIEW` estrictamente en modo **solo lectura** revisando `git diff`, seguridad, contratos, accesibilidad, conservación de los 291 archivos V9 y cobertura de tests; si hay hallazgos `BLOQUEANTE | ALTA | MEDIA`, abrir ciclo `FIX` y repetir `REVIEW`.
  - **Skills / Vigilio Docs:** `review-code-change`, `ui-quality-review`, `vigilio-auto-senior` · `vigilio-docs/standards/engineering/change-impact-and-review-gates.md`.
  - **Resultado 100%:** Veredicto `APPROVE` con `0` hallazgos bloqueantes, altos o medios pendientes.

- [ ] **F9-09 — Gate Único Maestro `npm run verify:release` 100% en Verde (`PASS`)**
  - **Tarea:** Ejecutar de principio a fin en limpio: `npm ci && npm run doctor && npm run verify:offline && npm run typecheck && npm run lint && npm run build && npm run sbom:check && npm audit --audit-level=high && npm run test:e2e`.
  - **Skills / Vigilio Docs:** `vigilio-auto-senior`, `complete-work-no-shortcuts` · `vigilio-docs/governance/implementation-readiness-2026.md`.
  - **Resultado 100%:** Todos los controles automatizados en `PASS` real (cero `FAIL`, cero `BLOCKED`, cero `NOT_RUN` en el alcance frontend estático).

- [ ] **F9-10 — Sellado de Manifiesto Final `docs/FILE_MANIFEST_V10.json`, `docs/VERIFICATION_V10.md` y Cierre Git (`commit-ai-change`)**
  - **Tarea:** Regenerar hashes SHA-256 finales comprobando `removed.length === 0` respecto a los 291 archivos base de V9, documentar logs exactos de verificación en `docs/VERIFICATION_V10.md` y realizar commits limpios trazables sin hacer push no autorizado.
  - **Skills / Vigilio Docs:** `commit-ai-change`, `complete-work-no-shortcuts` · `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 39 y 40).
  - **Resultado 100%:** Repositorio **10/10 Production-Ready** como academia interactiva estática multicloud.

---

## 4. RESUMEN DE CONTEO Y SECUENCIA ÓPTIMA DE EJECUCIÓN

| Bloque | Enfoque | Tareas `[ ]` | Skills Principales de Vigilio |
|---|---|---:|---|
| **Bloque 0** | Entorno, Git, `npm install`, Fix Windows, Manifiesto y Build Base | 8 | `vigilio-auto-senior`, `diagnosing-bugs`, `software-supply-chain-security` |
| **Bloque 1** | Refactor Modular de `App.tsx`, Ownership y Migración Storage | 9 | `refactor-existing-code`, `symbol-ownership-architecture`, `web-mfe-build-feature` |
| **Bloque 2** | Páginas y Rutas Faltantes (`/#/mapa`, `/#/labs`, `/#/proyectos`, `/#/acerca`, Deep-links) | 8 | `ux-information-architecture`, `ux-web-experience`, `web-mfe-build-feature` |
| **Bloque 3** | Design System, Contraste Light/Dark AA, Menú Móvil, Modales, Diagramas y Mascota | 11 | `ui-design-system`, `ux-accessibility`, `ux-mobile-experience`, `ui-art-direction` |
| **Bloque 4** | Senior Mode Nivel Producción (54 Exhibits Nativos, Red Herrings, `CodeReviewLab`, Timeline, Postmortem) | 10 | `aws-platform-foundation`, `terraform-iac-delivery`, `kubernetes-eks-delivery`, `platform-observability-sre` |
| **Bloque 5** | 5 Motores Puros Endurecidos + 8 Nuevos Simuladores Interactivos (13 en total) | 11 | `platform-finops`, `platform-resilience-disaster-recovery`, `platform-scalability-capacity` |
| **Bloque 6** | Contenido Único de las 90 Unidades, Banco de Quizzes, Minijuegos GoPixel y Progreso 6D | 9 | `complete-work-no-shortcuts`, `vigilio-architecture-guide`, `ux-web-experience` |
| **Bloque 7** | Conexión UI de las 54 Guías `labs/*.md`, Sandbox Local `prod-local`, Terraform y Filtro Anti-Secretos | 8 | `platform-local-production-lab`, `terraform-iac-delivery`, `web-mfe-security-delivery` |
| **Bloque 8** | Suite Completa de Pruebas (Unitarios de 13 Simuladores, 12 Flujos E2E Playwright, `axe` A11y, Offline) | 12 | `web-mfe-testing`, `ux-accessibility`, `ui-quality-review`, `platform-validation-evidence` |
| **Bloque 9** | Biome Estricto, CI SHA-Pinned, CSP Local Sin Google Fonts, SBOM, Docs y Gate Final `10/10` | 10 | `platform-cicd-factory`, `software-supply-chain-security`, `repository-readme-architecture`, `review-code-change` |
| **TOTAL** | **Hoja de Ruta Completa al 100% (Alcance SPA Educativa Multicloud)** | **96 tareas** | **22 Skills Vigilio + 12 Normas Canónicas `vigilio-docs`** |

> **Nota sobre Fase SaaS / Backend Futuro (Sección 31 de `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` — `FUTURO CONDICIONAL`):**  
> Autenticación real de usuarios/docentes, progreso sincronizado en PostgreSQL y workers efímeros de sandboxes cloud **NO forman parte del 100% de la fase SPA estática** por decisión explícita de producto (`MASTER_SPEC.md` regla 6 y 8: *"evitar sobreingeniería; MVP sin backend obligatorio"*). Si en una etapa comercial posterior decides abrir esa fase SaaS, se activarán entonces `node-nest-build-feature`, `node-nest-persistence`, `node-nest-security-aws` y `node-nest-testing`.
