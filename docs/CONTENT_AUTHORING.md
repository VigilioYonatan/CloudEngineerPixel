# Guía Editorial y de Autoría de Contenidos — Cloud Engineering Academy

## 1. Principios Pedagógicos y Técnicos

1. **Cero relleno clónico:** Cada una de las **90 unidades** (`01.01` a `18.05`) debe enseñar un modelo mental único, un antipatrón real de producción y una actividad verificable distinta (`tests/f8-02-curriculum-and-senior-coverage.test.mjs` falla automáticamente si se duplica cualquier texto).
2. **Equivalencia funcional ≠ equivalencia arquitectónica:** Al documentar AWS, Azure y Google Cloud, explica siempre **qué NO es equivalente** (ej. VPC regional en AWS/Azure frente a VPC global en GCP; Security Groups stateful solo-Allow frente a NSG/Firewall con prioridades Allow/Deny).
3. **Clasificación obligatoria de riesgo operativo:** Todo bloque CLI o IaC renderizado con `CodeBlock` declara explícitamente `read-only` (`SOLO LECTURA`), `creates-cost` (`CREA RECURSOS / COSTO`) o `destructive` (`DESTRUCTIVO / REQUIERE PLAN`).
4. **Cero secretos reales:** Usa exclusivamente identificadores sintéticos (`10.42.0.0/16`, `arn:aws:iam::111122223333:role/example`, `REDACTED`). `npm run security:scan` bloquea cualquier patrón de credencial en el árbol fuente.

---

## 2. Cómo Editar o Ampliar una Unidad Curricular (`UnitContentSpec`)

1. Ubica el nivel correspondiente en `src/data/curriculum/{level1,level2,level3}/`.
2. Respeta el contrato `UnitContentSpec` definido en `src/domain/curriculum.ts`:
   - `unitCode` (`"02.01"`), `moduleId`, `unitIndex` (`0..4`), `title`, `objective`, `estimatedMinutes`.
   - `mentalModel`: analogía y mecanismo técnico preciso (`>= 25` caracteres, único en las 90 unidades).
   - `antipattern`: fallo real en producción y su consecuencia operativa (`>= 25` caracteres, único).
   - `glossary`: siglas clave conectadas al buscador global (`GlossaryModal`).
   - `adapters.{aws,azure,gcp}`: `service`, `snippet`, `criticalDiff`, `officialDocUrl` (`https://...`) y `verifiedAt` (`YYYY-MM-DD`).
   - `verifiableActivity`: comprobación práctica determinista.
3. Ejecuta `node --test tests/f8-02-curriculum-and-senior-coverage.test.mjs` para verificar unicidad y enlaces `https://`.

---

## 3. Cómo Añadir o Revisar un Caso de Senior Mode

Cada caso `s01`..`s18` articula cinco piezas sincronizadas:
- `src/data/senior.ts`: metadatos del incidente, señal de alerta, opciones de contención y skills.
- `src/data/seniorInvestigations.ts` + `src/data/seniorProviderExhibits.ts`: al menos **2 artefactos causales primarios** y **1 contraprueba benigna (`isDistractor: true`)** diferenciados nativamente para AWS, Azure y GCP.
- `src/data/seniorDiagnostics.ts`: hipótesis de causa raíz con índices correctos variados (`0, 1, 2`).
- `src/data/seniorTradeoffs.ts`: comparación de mitigación inmediata vs solución permanente y análisis por opción.
- `src/data/seniorCurriculumLinks.ts`: vínculo directo de refuerzo hacia `moduleId` + `unitIndex`.

---

## 4. Conservación del Manifiesto de Integridad

- **Prohibido eliminar** cualquiera de los **291 archivos originales** del baseline V9 (`removed` debe permanecer `[]`).
- Tras agregar o modificar archivos legítimos, actualiza el manifiesto SHA-256 ejecutando:
  ```bash
  npm run manifest:update
  npm run integrity
  ```
