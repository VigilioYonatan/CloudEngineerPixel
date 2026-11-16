# Matriz de aceptación visual y de UX — V8

Se debe ejecutar en Chrome/Chromium y Safari móvil antes de publicar. La suite `tests/e2e/academy.spec.ts` automatiza una parte, pero en este entorno no pudo ejecutarse.

| Pantalla | AWS | Azure | GCP | Móvil | Qué comprobar |
|---|---|---|---|---|---|
| Home y hero | ◻ | ◻ | ◻ | ◻ | Paleta del proveedor, mascota, navegación y CTA |
| Formación | ◻ | ◻ | ◻ | ◻ | 18 módulos, filtros, 90 unidades y progreso |
| Aula/quiz | ◻ | ◻ | ◻ | ◻ | Ejemplos del proveedor, respuestas, estado persistente |
| Simuladores | ◻ | ◻ | ◻ | ◻ | CIDR, IAM, autoescalado, SLO y decisiones |
| Senior Mode | ◻ | ◻ | ◻ | ◻ | 18 casos, selector, datos sintéticos, evidencias y diagnóstico |
| Informe Senior | ◻ | ◻ | ◻ | ◻ | Cuatro secciones, citas, exportación JSON |
| Revisión docente local | ◻ | ◻ | ◻ | ◻ | Cinco criterios, guardado por caso/nube, exportación no certificante |
| Progreso | ◻ | ◻ | ◻ | ◻ | Exportación/importación, rechazo de archivos corruptos |
| Accesibilidad | ◻ | ◻ | ◻ | ◻ | Focus visible, teclado, zoom 200%, contraste, lectores de pantalla |
| Seguridad hosting | ◻ | ◻ | ◻ | ◻ | HTTPS, CSP, cabeceras, ausencia de secretos en frontend |

**Estado de las casillas:** pendientes de QA real, no marcadas como aprobadas automáticamente.

## Recorrido manual de prueba Senior

1. Seleccionar AWS, abrir S01 y leer dos señales.
2. Confirmar hipótesis y acción, redactar las cuatro secciones y citar las dos evidencias.
3. Registrar una sola simulación; recargar y comprobar el historial y el bloqueo de doble registro.
4. Abrir la revisión docente local, probar notas insuficientes, dimensión de seguridad crítica y una revisión válida.
5. Guardar/exportar JSON, recargar y comprobar persistencia.
6. Cambiar a Azure y verificar que ni el expediente ni la rúbrica AWS se copian; repetir con GCP.
7. Exportar/importar progreso, revisar que datos malformed y claves peligrosas se rechazan.
