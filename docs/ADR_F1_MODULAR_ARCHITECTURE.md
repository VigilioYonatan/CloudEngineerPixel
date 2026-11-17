# ADR F1 — Arquitectura Modular Unidireccional, Ownership de Proveedores y Senior Mode

**Estado:** Aprobado e implementado (`F1-03`, `F1-04`, `F1-05`, `F1-06`, `F1-07`)  
**Fecha:** 2026-11-16  
**Referencias normativas:** `symbol-ownership-architecture`, `refactor-existing-code`, `web-mfe-build-feature`

## Contexto

Hasta V9, `src/App.tsx` (2 215 líneas tras desminificar) concentraba el shell global, el selector de proveedor, las vistas `Home`, `Learn`, `Lesson`, `Lab`, `Simulator`, `Progress`, `Settings` y una función inalcanzable `function Senior()` heredada de V1/V2 (~320 líneas), mientras `src/SeniorWorkbench.tsx` concentraba 956 líneas con catálogo, 4 etapas y panel lateral en un único archivo.

## Decisiones adoptadas

1. **Retiro con trazabilidad de `function Senior()` y `seniorService` (`F1-03`):**
   - Se retiró `function Senior()` y el mapa local `seniorService` de `src/App.tsx`.
   - La contextualización multicloud de los 18 casos Senior permanece en su propietario canónico `src/data/seniorInvestigations.ts` (`investigationFor`), y la ejecución activa permanece en `SeniorWorkbench`.
2. **Aislamiento de la capa `src/app/` (`F1-04`):**
   - Extraídos `AppShell.tsx`, `AppHeader.tsx`, `AppFooter.tsx`, `CloudProviderSwitcher.tsx` y `router.ts` sin dependencias hacia `src/features/` ni lógica de negocio curricular o de simuladores.
   - `src/App.tsx` queda exclusivamente como raíz de composición de vistas.
3. **Extracción de las 8 features por dominio (`F1-05`):**
   - `src/features/{home,curriculum,lessons,labs,simulators,senior,progress,settings}/` con dependencias estrictamente unidireccionales (`App.tsx -> app/ & features/ -> shared/ui/ -> domain/ & lib/ & data/ & config/`), cero carpetas vacías, cero ciclos y cada archivo modular `< 250` líneas.
4. **Registro único `PROVIDER_REGISTRY` (`F1-06`):**
   - `src/domain/providers.ts` centraliza nombres, marcas de insignia (`aws`, `A`, `G`), colores Dark/Light, mascotas, binarios CLI, reservas de subred CIDR por nube (AWS `5`, Azure `5`, GCP `4`) y enlaces oficiales, eliminando ternarios dispersos en la UI.
5. **Descomposición por etapas de `SeniorWorkbench` preservando contratos V7–V9 (`F1-07`):**
   - Dividido en `SeniorCatalog.tsx`, `InvestigationStage.tsx`, `DiagnosisStage.tsx`, `DecisionStage.tsx`, `ReportStage.tsx`, `SeniorSidebar.tsx`, `InstructorReview.tsx`, `use-senior-case-session.ts` y `SeniorWorkbenchPage.tsx`.
   - `src/SeniorWorkbench.tsx` y `src/InstructorReview.tsx` se conservan como fachadas compatibles con los 291 archivos base de V9 (`removed: []`), manteniendo intactas las claves `senior-session:<provider>:<caseId>` y `senior-review:<provider>:<caseId>`.
