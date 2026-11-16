# Senior Mode V8 — revisión docente y trazabilidad

## Principios

1. Los **18 incidentes** siguen disponibles para AWS, Azure y Google Cloud.
2. Cada expediente requiere examinar dos evidencias sintéticas, confirmar la hipótesis, confirmar una contención defendible y completar causa, mitigación, rollback y validación.
3. El puntaje automático **0–100 mide completitud**, no conocimiento técnico real. El caso se registra únicamente una vez por proveedor en el progreso local.
4. Cuando el caso se registra, aparece **Revisión docente local**, disponible a cualquier persona con acceso al mismo navegador. **No hay autenticación del revisor**. Las notas no son un certificado ni una firma.
5. La revisión manual se puede guardar localmente y exportar en JSON, conforme al esquema `schemas/instructor-review.schema.json`.

## Rúbrica (0 a 4 por dimensión)

| Dimensión | Peso | Pregunta evaluadora |
|---|---:|---|
| Trazabilidad de evidencia | 25% | ¿La hipótesis está relacionada con indicadores identificables? |
| Seguridad | 20% | ¿La contención evita privilegios excesivos y pérdida de datos? |
| Recuperación | 25% | ¿Existe reversión con disparadores y responsables? |
| Validación | 20% | ¿Se definieron señales y umbrales de recuperación? |
| Comunicación | 10% | ¿Hay responsables, línea temporal y postmortem? |

Puntaje = suma ponderada de `(puntos / 4) × peso`. Puntuación local formativa aprobada: **80/100** o más, con **seguridad y recuperación al menos 2/4**. La revisión exige alias de revisor, las cinco notas y una explicación de al menos 40 caracteres. Sin identidad verificada, toda exportación se marca `official:false`.

## Flujo recomendado del instructor

- Solicitar el `informe-<nube>-<caso>.json` del estudiante.
- Revisar artefactos, causalidad, riesgos y supuestos. Pedir evidencia externa cuando el alumno realice laboratorios reales fuera de esta plataforma.
- Completar las cinco dimensiones en el panel. Guardar el borrador y exportar `revision-local-<nube>-<caso>.json`.
- Comunicar correcciones y, si procede, programar una nueva evaluación supervisada.

## Seguridad y privacidad

- No almacenar claves cloud, secretos, correos personales ni datos reales de incidentes en la academia.
- Los informes y revisiones se guardan **solo en localStorage** hasta que el usuario los exporta; no hay envío a un servidor.
- Los JSON importados se consideran no confiables. La rúbrica exportada es editable; no se debe utilizar como prueba criptográfica de autoría.
- La privacidad del alumno y retención de reportes requieren un sistema institucional fuera de este proyecto si se usa de forma comercial.
