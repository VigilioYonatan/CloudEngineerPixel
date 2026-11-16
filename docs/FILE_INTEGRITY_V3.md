# Auditoría de integridad V2 → V3

Origen: `CLOUD_ENGINEERING_ACADEMY_APP_V2.zip` entregado anteriormente.

Política: **no eliminar archivos existentes**. Preservar todos los materiales de cursos, los 54 laboratorios por proveedor, las 18 guías Senior y las cinco imágenes de la mascota. Se admite modificar archivos de entrada para integrar mejoras y añadir nuevos.

Nuevos archivos de código:

- `src/data/seniorInvestigations.ts`: 18 expedientes con tres artefactos y equivalencias por proveedor.
- `src/SeniorWorkbench.tsx`: interfaz de investigación, toma de decisiones y redacción de informe.
- `tests/senior-v3.test.mjs`: pruebas para contenido, lógica de completitud, importación y sintaxis.

Archivos modificados:

- `src/App.tsx`: conecta la nueva consola Senior; conserva la implementación Senior V2 para referencia.
- `src/lib/state.ts`: registra intentos por nube, preserva formatos V1/V2 e informes locales.
- `src/styles.css`: nuevos estilos Senior responsive, heredando tema proveedor.

La comparación automatizada de entradas ZIP se realiza al empaquetar y su resultado se adjunta al final de este documento.

## Resultado de comparación de archivos

- Archivos originales: **104**.
- Archivos finales: **109**.
- Archivos originales faltantes: **0**.
- Archivos originales modificados (de forma intencional): **4**.
- Archivos añadidos: **5**.

### Archivos modificados

- `README.md`
- `src/styles.css`
- `src/App.tsx`
- `src/lib/state.ts`

### Archivos nuevos

- `docs/FILE_INTEGRITY_V3.md`
- `docs/SENIOR_MODE_V3.md`
- `src/SeniorWorkbench.tsx`
- `src/data/seniorInvestigations.ts`
- `tests/senior-v3.test.mjs`
