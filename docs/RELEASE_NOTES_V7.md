# Auditoría de entrega V7

**Origen inmutable:** `CLOUD_ENGINEERING_ACADEMY_V6_SENIOR_DEVSECOPS.zip`.

## Garantía de preservación

El manifiesto `docs/FILE_MANIFEST_V7.json` contiene el hash SHA-256 de **cada archivo de la V6** y del estado actual de cada archivo de la V7. El verificador falla si falta uno de los archivos antiguos, se modifica un archivo sin actualizar su hash, aparece una ruta sin inventariar o la lista de borrados no está vacía. Los archivos originales de la V6 se conservan; se modifican algunos de ellos deliberadamente para añadir funcionalidad sin eliminarlos.

## Mejoras verificables

1. Dieciocho diagnósticos específicos de causa técnica (`src/data/seniorDiagnostics.ts`).
2. Cuatro etapas obligatorias de Senior: investigación, diagnóstico, decisión e informe. Las señales deben inspeccionarse antes de confirmar la hipótesis.
3. Expedientes guardados por caso y nube, con normalización de datos y compatibilidad con notas anteriores.
4. Límite de longitud en los informes, importación de respaldos de hasta 8 MB y ruta de almacenamiento controlada.
5. Pruebas `node:test` para normalización, seguridad de datos y cobertura curricular, junto con un verificador de grafo de fuentes que no necesita npm.
6. Dos casos E2E nuevos con Playwright (recuperación de expediente y compuertas Senior), aún pendientes de ejecución de navegador.
7. Documentación, README, estilos y versión de producto sincronizados.

## Validaciones y límites

**Pruebas de Node, auditoría ZIP, comprobación de sintaxis TypeScript/TSX y escaneo de patrones de secretos:** los resultados se encuentran en `docs/VERIFICATION_V7.md`, generado con las mediciones finales.

**Build de Vite, typecheck semántico completo, Biome, npm audit y Playwright:** el entorno no dispuso de acceso funcional al registro npm para instalar dependencias; **no deben marcarse como superados**. Reproducir en un equipo con npm accesible:

```sh
npm install
npm run verify
npx playwright install chromium
npm run test:e2e
```

Este paquete contiene un **frontend educativo estático mejorado**, no una plataforma SaaS de producción, ni sandboxes gestionados, ni las 240 horas de clases audiovisuales ya impartibles. El puntaje Senior determina completitud de la simulación; un docente debe evaluar la calidad técnica.
