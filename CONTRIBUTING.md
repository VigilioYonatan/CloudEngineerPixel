# Contribuir a Cloud Engineering Academy

## Principios

- No borres módulos, laboratorios, imágenes o expedientes existentes para resolver errores.
- No añadas API keys, secretos, archivos `tfstate`, credenciales cloud ni datos reales de incidentes al repositorio.
- Los módulos base explican el concepto y las implementaciones son específicas por proveedor.
- El puntaje automático de Senior solo mide completitud; las revisiones manuales deben identificarse como no autenticadas.
- Para cambios de fuentes, ejecuta `npm run verify:offline`; después de instalar dependencias, `npm run verify` y `npm run test:e2e`.
- Los archivos `docs/FILE_MANIFEST_V*.json` documentan una release cerrada. Para una release nueva, calcular hashes desde el ZIP anterior, listar añadidos y modificados, y comprobar que `removed:[]`.

## Reproducción del entorno

1. Node >=22.12 con conexión a npm.
2. `npm install` (generará lockfile si es la primera instalación).
3. `npm run dev` para desarrollo.
4. `npm run verify`, `npx playwright install chromium`, `npm run test:e2e`.
5. No publicar ni afirmar que está validado si falla alguna etapa.

## Buenas prácticas cloud

- Prioriza permisos mínimos, endpoints privados, presupuestos y limpieza de recursos.
- Las guías pueden mostrar comandos de lectura; cualquier comando de escritura o destrucción debe advertir su alcance.
- Documenta equivalencias y diferencias concretas entre AWS, Azure y GCP.
