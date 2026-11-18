# Matriz de Aceptación V10 — Cloud Engineering Academy (`54/54` Celdas + Flujo `36.1`)

> **Contrato trazado:** `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` (Sección 36 y Sección 36.1) y `PLAN_FALTANTES_100_SKILLS_VIGILIO.md` (`F8-12`)  
> **Fecha de ejecución verificada:** `2026-11-18T00:48:14-05:00`  
> **Entorno real de ejecución:** Windows (`win32`), Node.js `v24.22.0`, Preact `10.27.x`, Vite `7.3.8`, Biome `2.6.8`, Playwright `1.56.x` (Chromium headless `1280×720`, `768×1024`, `390×844`, `320×640`), `@axe-core/playwright` `4.14.0`  
> **Comando maestro ejecutado:** `npm run verify:release` → **Exit code `0`** (`217/217` tests Node/BDD en `5.14s` + `45/45` tests Playwright E2E en `40.4s`)

---

## 1. Matriz de Aceptación por Pantalla y Proveedor (`18 filas × 3 nubes = 54 celdas`)

Cada celda `[x]` cuenta con evidencia automatizada ejecutada en las tres nubes (`AWS`, `Azure`, `GCP`), modos `Dark` y `Light`, viewports desktop/tablet/móvil (`320px`, `390px`, `768px`, `1440px`) y auditoría WCAG 2.2 AA (`@axe-core/playwright`).

| # | Pantalla / flujo | AWS | Azure | GCP | Prueba decisiva verificada | Suite / Archivo de Evidencia (`PASS`) |
|---:|---|:---:|:---:|:---:|---|---|
| 01 | **Home + hero** | [x] | [x] | [x] | Mascota `CloudMentor` (`CLS < 0.02`), órbita 2026 solo en Home, tema Dark/Light, CTA «Continuar donde me quedé», `0` overflow (`320px`–`1440px`). | `tests/e2e/academy.spec.ts`, `tests/e2e/f3-components-and-states.spec.ts`, `tests/e2e/f3-f4-fonts-senior.spec.ts`, `tests/e2e/f8-e2e-complete-matrix.spec.ts` |
| 02 | **Selector de nube** | [x] | [x] | [x] | Conmutación transaccional `AWS → Azure → GCP → AWS`, sincronización `?cloud=`, autoguardado atómico de borradores sin contaminación cruzada. | `tests/e2e/f2-completion.spec.ts`, `tests/e2e/f8-e2e-complete-matrix.spec.ts` (`E2E-01`, `E2E-03`) |
| 03 | **Catálogo (`/aprender` y `/mapa`)** | [x] | [x] | [x] | 18 módulos (240h), filtros por nivel, búsqueda textual, recuperación de búsqueda vacía y mapa curricular interactivo. | `tests/e2e/characterization-f1.spec.ts`, `tests/e2e/f1-f2-routing-map-labs.spec.ts` |
| 04 | **Aula común** | [x] | [x] | [x] | Núcleo conceptual común + adaptador nativo por proveedor (`CloudServiceComparison` 3 columnas / acordeón `320px` y `ArchitectureDiagram` SVG). | `tests/e2e/f3-design-system-a11y.spec.ts`, `tests/e2e/f3-components-and-states.spec.ts`, `tests/f8-02-curriculum-and-senior-coverage.test.mjs` |
| 05 | **Quiz** | [x] | [x] | [x] | Banco curado (`>= 90` reactivos), feedback razonado por opción, reintento sin perder `bestScore` e incremento de `attempts`. | `tests/e2e/f6-04-08.spec.ts`, `tests/e2e/f8-e2e-complete-matrix.spec.ts` (`E2E-02`) |
| 06 | **Taller por unidad (90 unidades)** | [x] | [x] | [x] | 90 unidades únicas (`01.01`–`18.05`, `0` textos duplicados), `270` enlaces oficiales `https://`, glosario contextual y dinámicas GoPixel (`Bug Hunter`, `Order Steps`, `Architecture Match`). | `tests/f8-02-curriculum-and-senior-coverage.test.mjs`, `tests/e2e/f5-10-f6-03.spec.ts`, `tests/e2e/f6-04-08.spec.ts`, `tests/e2e/f6-09-f7-labs.spec.ts` |
| 07 | **Laboratorio (`/labs` y `/labs/:id`)** | [x] | [x] | [x] | Catálogo de 60 prácticas, Modalidades A/B/C, visor y descarga de las 54 guías `.md` + 3 OIDC + 3 `enterprise-finops.tf`, checklist persistente, bloqueo de secretos `AKIA...` y exportación `.md`/`.json`. | `tests/bdd-f6-09-f7-labs.test.mjs`, `tests/e2e/f6-09-f7-labs.spec.ts`, `tests/e2e/f8-e2e-complete-matrix.spec.ts` (`E2E-04`) |
| 08 | **Simuladores (`/simuladores/:id`)** | [x] | [x] | [x] | 13 motores deterministas puros (`cidr`, `iam`, `autoscaling`, `slo`, `arch`, `routing`, `tfplan`, `k8s`, `lb`, `finops`, `dr`, `messaging`, `observability`) con casos límite (`/0`, `/31`, `/32`, CIDR inválido, `Deny > Allow`) y exportación de reporte. | `tests/f8-01-simulators-exhaustive.test.mjs`, `tests/e2e/f4-10-f5-01-04.spec.ts`, `tests/e2e/f5-05-09.spec.ts`, `tests/e2e/f8-e2e-complete-matrix.spec.ts` (`E2E-05`) |
| 09 | **Senior catálogo (`/senior`)** | [x] | [x] | [x] | 18 casos ejecutivos con diseño responsive, filtros por dominio/severidad/estado, búsqueda insensible a tildes y contraste AA. | `tests/e2e/f4-senior-mastery.spec.ts`, `tests/e2e/f3-design-system-a11y.spec.ts` |
| 10 | **Senior investigación** | [x] | [x] | [x] | 54 conjuntos de `Exhibits` nativos (`18 × 3`), `IncidentTimeline`, `CodeReviewLab`, visor `WorkbookModal` y persistencia aislada por proveedor. | `tests/f8-02-curriculum-and-senior-coverage.test.mjs`, `tests/e2e/f3-f4-fonts-senior.spec.ts`, `tests/e2e/academy.spec.ts` |
| 11 | **Senior diagnóstico** | [x] | [x] | [x] | Selección de hipótesis causal, detección formativa de `Red Herring` (contraprueba) y bloqueo de avance sin evidencia mínima. | `tests/e2e/f3-f4-fonts-senior.spec.ts`, `tests/e2e/academy.spec.ts` |
| 12 | **Senior decisión** | [x] | [x] | [x] | Separación Mitigación Inmediata vs Reparación Permanente, trade-offs explícitos por opción y registro de intentos. | `tests/e2e/f4-senior-mastery.spec.ts`, `tests/e2e/characterization-f1.spec.ts` |
| 13 | **Senior informe** | [x] | [x] | [x] | 4 secciones obligatorias (`cause`, `mitigation`, `rollback`, `validation`) + campos ADR/Postmortem opcionales, citas causales, filtro anti-secretos y descarga `.md` + `.json`. | `tests/e2e/f4-senior-mastery.spec.ts`, `tests/e2e/characterization-f1.spec.ts` |
| 14 | **Senior checkpoint** | [x] | [x] | [x] | Validación estricta de `provider` y `caseId`, rechazo de backups de otra nube sin perder borrador local y restauración con `ConfirmDialog`. | `tests/e2e/senior-checkpoint-v9.spec.ts`, `tests/e2e/f8-e2e-complete-matrix.spec.ts` (`E2E-07`) |
| 15 | **Revisión docente local** | [x] | [x] | [x] | Importación/evaluación contra `schemas/instructor-review.schema.json`, rúbrica ponderada y etiqueta permanente «Revisión local no autenticada». | `tests/e2e/academy.spec.ts`, `tests/bdd-f4-10-f5-01-04.test.mjs` |
| 16 | **Mi progreso (`/progreso`)** | [x] | [x] | [x] | Desglose transparente en 6 dimensiones por nube, exportación firmada con `schemaVersion: 2`, rechazo de JSON malicioso/corrupto y cuarentena recuperable. | `tests/e2e/f6-04-08.spec.ts`, `tests/e2e/f8-e2e-complete-matrix.spec.ts` (`E2E-09`), `tests/f8-03-router-storage-secretguard.test.mjs` |
| 17 | **Configuración (`/ajustes`)** | [x] | [x] | [x] | Tema Dark/Light, `data-motion="reduced"`, versión sincronizada desde `package.json`, reinicio granular por nube con `ConfirmDialog` accesible. | `tests/e2e/f3-components-and-states.spec.ts`, `tests/e2e/f3-design-system-a11y.spec.ts`, `tests/e2e/characterization-f1.spec.ts` |
| 18 | **Footer y documentación (`/acerca`)** | [x] | [x] | [x] | Enlaces verificados a `Metodología`, `Seguridad Cloud`, `Privacidad` y `No afiliación`, sin promesas falsas de certificación oficial. | `tests/e2e/f2-completion.spec.ts` (`F2-05`) |

---

## 2. Evidencia de Aceptación Especial `36.1` (Cambio de Nube en Senior Mode `S07 AWS ↔ Azure`)

Automatizado de extremo a extremo en `tests/e2e/f8-e2e-complete-matrix.spec.ts` (`F8-08 (E2E-06, E2E-07, E2E-08 & Section 36.1)`) y `tests/e2e/senior-checkpoint-v9.spec.ts`:

| Paso del contrato `36.1` | Resultado | Verificación ejecutada (`695ms` en Chromium) |
|---|:---:|---|
| 1. Abrir `S07` en `AWS` y examinar evidencias | `PASS` | `/#/senior/s07?cloud=aws` marca evidencias nativas AWS (`1/` inspeccionada). |
| 2. Cambiar a `Azure` desde el header | `PASS` | Clic en botón `Azure` del `CloudProviderSwitcher` actualiza `?cloud=azure`. |
| 3. Verificar que el incidente corresponde a `Azure` y no hereda selección `AWS` | `PASS` | Contador de evidencias en `Azure` permanece en `0/` y muestra recursos AKS/Azure. |
| 4. Volver a `AWS` y recuperar investigación previa | `PASS` | Al volver a `AWS`, la evidencia inspeccionada sigue marcada (`1/`). |
| 5. Exportar JSON del caso `AWS` | `PASS` | Botón `Guardar JSON del caso` descarga `checkpoint-aws-s07.json` válido. |
| 6. Intentar importarlo en `Azure`: rechazo sin perder borrador `Azure` | `PASS` | Importar el JSON de `AWS` estando en `Azure` es rechazado explícitamente (`Pertenece a AWS`) preservando intacta la sesión `Azure`. |
| 7. Volver a `AWS` e importar: restauración con confirmación | `PASS` | En `AWS` abre `ConfirmDialog` (`role="alertdialog"`) y restaura el checkpoint al confirmar. |
| 8. Recargar pestaña y confirmar persistencia | `PASS` | `page.reload()` hidrata `senior-session:aws:s07` sin pérdida de progreso. |
| 9. Teclado y viewport móvil sin errores de foco ni overflow | `PASS` | Probado con `Tab`/`Escape` y auditoría `320px`/`390px` (`scrollWidth <= innerWidth`). |

---

## 3. Controles Transversales de Resiliencia y Calidad (`E2E-10`, `E2E-11`, `E2E-12`)

- **Accesibilidad WCAG 2.2 AA (`@axe-core/playwright`):** `0` violaciones `critical`/`serious` en las 6 combinaciones `(AWS, Azure, GCP) × (Dark, Light)` y en viewports `320px`, `390px`, `768px`, `1440px` (`tests/e2e/f3-design-system-a11y.spec.ts`, `tests/e2e/f8-e2e-complete-matrix.spec.ts`).
- **Modo Offline Real (`context.setOffline(true)`):** Tipografías WOFF2 auto-alojadas (`DM Sans`, `Space Grotesk`, `JetBrains Mono`, `Silkscreen`), simuladores, lecciones y Senior Mode operan sin red externa y muestran `OfflineIndicator` (`tests/e2e/f3-f4-fonts-senior.spec.ts`, `tests/e2e/f8-e2e-complete-matrix.spec.ts`).
- **Fallo de Cuota en `localStorage` (`QuotaExceededError`) y Corrupción:** Al simular fallo de `Storage.prototype.setItem`, aparece `BannerStorageError` recuperable sin colapsar la SPA ni mostrar falsos guardados (`tests/e2e/f8-e2e-complete-matrix.spec.ts`, `tests/e2e/f1-f2-routing-map-labs.spec.ts`).
