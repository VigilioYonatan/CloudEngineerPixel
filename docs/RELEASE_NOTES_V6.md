# Release V6 — Senior + DevSecOps + pruebas

## Resumen técnico

La V6 es un parche acumulativo sobre la V5. Todos los archivos heredados permanecen; los cambios se describen en el manifiesto SHA-256 de `docs/FILE_MANIFEST_V6.json`.

### Nuevas funciones

- Puntuación Senior V6 en función pura con 5 factores independientes y 100 puntos.
- Confirmación explícita de decisión, revisión de dos artefactos, cita explícita de los dos artefactos y reporte de cuatro secciones.
- Registro local de decisiones incorrectas (sin convertirlas en graduación).
- Compatibilidad con borradores antiguos, añadiendo campo vacío de reversión.
- Sanitización de rollback y referencias en los backups de progreso.
- DevSecOps con auditoría npm, SBOM, CodeQL, workflow de pruebas de navegador y flujo Biome ampliado.
- Tres guías nuevas de CI/CD federado con OIDC AWS/Azure/GCP; el alumno sigue sin entregar credenciales a la SPA.

### Revisión y criterios de aceptación

- Todas las pruebas Node deben pasar.
- El manifiesto debe mostrar `removed: []`.
- Ninguna credencial ni token Cloud real se expone en archivos frontend.
- El cliente no puede registrar un expediente Senior sin confirmar decisión, citar evidencias y redactar las cuatro partes del informe.
- Los intentos erróneos no se contabilizan como casos completados.
- La evaluación semántica sigue siendo humana.

### Evidencia de verificación local

- **44 pruebas** de Node superadas durante el empaquetado.
- **11 archivos TS/TSX** del código fuente parseados sin errores sintácticos con el compilador TypeScript global.
- Escaneo heurístico de patrones de credenciales sin coincidencias.
- Manifiesto SHA-256: 234 archivos originales presentes; 0 eliminados.

### Pendientes y límites conocidos

Sin instalación npm no es posible certificar TypeScript, Biome, build Vite, SCA remoto ni Playwright. Consultar `docs/PROJECT_STATUS_V6.md`.
