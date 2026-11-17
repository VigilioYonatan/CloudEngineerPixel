---
name: pixel-senior-ux
description: Sistema visual Pixel Senior UX/UI: combina tipografía pixel Silkscreen auto-alojada en numerales ASCII 01..18 y watermarks con prosa legible en DM Sans/Space Grotesk, etiquetas técnicas nítidas en JetBrains Mono e iconos SVG pixel-art 16x16 crispEdges.
---

# Pixel Senior UX/UI Skill

## Cuándo aplicar tipografía Pixel (`"Silkscreen"`)

- **SÍ usar `"Silkscreen"` (estrictamente en numerales ASCII puros):**
  - Numerales de fondo / watermarks (`01`, `02`, `03`..`18` en `.level-ghost-num`, `.senior-card-ghost`).
  - Índices de nivel, módulos y etapas (`01`..`18` en `.level-icon span`, `.module-num`, `.sr-stage-tabs button span`, `.map-unit-index`, `.steps-list li > span`).
- **NO usar `"Silkscreen"`:**
  - Palabras en español con tildes (`CRÍTICA`, `DIAGNÓSTICO`) ni siglas con `C` (`CLOUD`, `CIDR`, `VPC`) en tamaños pequeños: usar `"JetBrains Mono"` (`700`) para nitidez tipográfica total.
  - Contadores KPI numéricos dinámicos (`0`, `18`, `240h`, `13`, `0/90`): usar `"Space Grotesk"` (`700`, `tabular-nums`) para proporción ejecutiva limpia.
  - Párrafos, explicaciones técnicas, opciones de quiz, formularios ni código (`DM Sans`, `Space Grotesk` y `JetBrains Mono`).

## Iconografía Pixel-Art en Navbar (`16x16`)

- Usar `shape-rendering="crispEdges"` sobre rejilla entera `viewBox="0 0 16 16"`.
- Conservar `currentColor` para integrarse en tema oscuro/claro y reserva de dorado (`--gold`) en el icono corona de **Senior Mode**.
- Mantener áreas táctiles `>= 44px` en móvil.

## Animaciones Pixel (`steps`) y Tarjetas Ejecutivas

- Usar transiciones discretas (`steps(2, end)` o `steps(4)`) para cursores parpadeantes (`pixelBlink`), pulso de corona/watermarks y hover de iconos pixel.
- En tarjetas de incidentes (`.senior-card`), incluir siempre jerarquía completa sin huecos vacíos: pill semántico de severidad (`Crítica` / `Alta` / `Media` con contraste WCAG AA en dark y light), título, resumen, preview de telemetría en bloque terminal compacto (`item.signal`), chips de skills y pie de acción.
- Desactivar obligatoriamente animaciones bajo `[data-motion="reduced"]` y `@media (prefers-reduced-motion: reduce)`.
- Prohibido cargar fuentes desde CDNs externos (usar siempre `/fonts/silkscreen-latin.woff2` local bajo CSP estricta).
