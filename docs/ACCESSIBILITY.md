# Matriz de Accesibilidad e Inclusión (WCAG 2.2 Nivel AA)

## 1. Estándar Aplicado

Cloud Engineering Academy verifica cumplimiento **WCAG 2.2 AA** de forma automatizada y estructural en las **6 combinaciones temáticas**:
`(AWS, Microsoft Azure, Google Cloud) × (Modo Oscuro, Modo Claro)` y en los viewports `320px`, `390px`, `768px`, `1024px` y `1440px`.

---

## 2. Arquitectura de Tokens y Contraste (`src/design-system/tokens.css`)

| Uso Semántico | Modo Oscuro (`#090f1c` / `#101a2b`) | Modo Claro (`#f2f6fc` / `#ffffff`) | Ratio Mínimo Exigido |
|---|---|---|---|
| Texto primario (`--text`) | `#f0f5ff` | `#0f1d30` | `>= 12:1` (AAA) |
| Texto secundario (`--muted`) | `#a6b7ce` | `#435368` | `>= 5.5:1` (AA) |
| Acento textual AWS (`--accent-text`) | `#ffb340` | `#9a3412` | `>= 4.5:1` (AA) |
| Acento textual Azure (`--accent-text`) | `#5ccbfa` | `#075985` | `>= 4.5:1` (AA) |
| Acento textual GCP (`--accent-text`) | `#65e0a6` | `#166534` | `>= 4.5:1` (AA) |
| Estados semánticos (`Crítica` / `Alta` / `Media`) | `--red-text` / `--gold-text` / `--blue-text` | `#9f1239` / `#92400e` / `#1e40af` | `>= 4.5:1` (AA) |

- Los colores decorativos de borde/superficie (`--accent-surface`, `--accent-border`) están desacoplados del color de texto (`--accent-text`) para impedir texto naranja o celeste ilegible sobre fondos claros.

---

## 3. Controles Interactivos, Teclado y Lectores de Pantalla

1. **Landmarks semánticos:** `<header>`, `<nav aria-label="Navegación principal">`, `<main>` y `<footer>` presentes en todas las rutas.
2. **Diálogos modales accesibles:**
   - `ConfirmDialog` (`role="alertdialog"`, ciclo de foco con `Tab`/`Shift+Tab`, cancelación con `Escape` y devolución de foco al botón disparador).
   - `WorkbookModal` y `GlossaryModal` (`role="dialog"`, `aria-modal="true"`, cierre con `Escape` y restauración de foco).
3. ** pestañas y pasos ARIA:**
   - `AccessibleTabs` soporta `role="tablist"`, `role="tab"`, `aria-selected` y navegación con flechas `ArrowRight` / `ArrowLeft` / `Home` / `End`.
   - `SeniorWorkbench` utiliza `<nav aria-label="Etapas del incidente">` con `aria-current="step"`.
4. **Barras de progreso y anuncios vivos:**
   - `ProgressBar` declara `role="progressbar"`, `aria-valuenow`, `aria-valuemin={0}` y `aria-valuemax`.
   - Notificaciones, copiado de código, conteos filtrados y alertas de almacenamiento/secretos emplean `role="status"` (`aria-live="polite"`) o `role="alert"`.
5. **Ergonomía móvil y motriz:**
   - Áreas táctiles mínimas `>= 44×44 px` en controles móviles y cajón de navegación completo desde `320px` con `0` overflow horizontal.
   - Respeto estricto a `@media (prefers-reduced-motion: reduce)` y preferencia explícita `data-motion="reduced"` en Ajustes (desactiva animaciones continuas y stepped de Pixel UX).

---

## 4. Cómo Ejecutar la Auditoría de Accesibilidad

```bash
npx playwright test tests/e2e/f3-design-system-a11y.spec.ts tests/e2e/f8-e2e-complete-matrix.spec.ts
```
