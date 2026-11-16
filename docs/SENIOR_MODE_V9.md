# Senior Mode V9 — Operaciones, expediente portable y seguimiento seguro

## Objetivo

La V9 hace que cada uno de los 18 casos de incidente tenga un **briefing de operaciones** específico, no solo una pregunta de opción múltiple. Sigue siendo un simulador educativo: **no ejecuta Terraform, kubectl ni comandos AWS/Azure/GCP** y **no acredita una certificación**.

## Flujo de respuesta al incidente

1. **Investigar:** inspección explícita de las señales primarias y secundarias, más un briefing contextual sobre impacto, propietarios, contención, acciones inseguras y recuperación.
2. **Diagnosticar:** contrastar las dos evidencias principales y justificar la hipótesis sintética.
3. **Decidir:** seleccionar una respuesta inicial, confirmarla, revisar las explicaciones y corregir intentos si fuera necesario.
4. **Informe:** documentar causa raíz, mitigación, reversión, verificación y dos referencias a las señales inspeccionadas. La plataforma comprueba completitud, no la verdad técnica del texto.
5. **Revisión docente opcional:** después de registrar una simulación, un formulario local recoge notas y una rúbrica de cinco criterios. **No verifica identidad** y no equivale a una nota oficial.

## Nueva portabilidad de un solo caso

- Botón **Guardar JSON del caso**: exporta solo la sesión del caso y proveedor elegidos (p. ej. `expediente-senior-azure-s07.json`).
- Control **Importar JSON del caso**: valida la estructura, el tamaño y la coincidencia exacta del proveedor y del caso. Solicita confirmación antes de reemplazar el borrador.
- Tamaño máximo por archivo: 48 KiB UTF-8.
- Normaliza etapa, opciones, evidencias y cuatro campos del informe; no lee ni escribe tokens cloud.
- **No** restaura calificaciones, revisiones ni certificaciones. Las respuestas proceden de un JSON sin firma y pueden modificarse, así que nunca se usan como prueba de autoría.
- Una sesión de otro proveedor o incidente se rechaza y no altera el expediente visible.
- El respaldo global del alumno sigue disponible en Configuración; el respaldo de caso **no** reemplaza la exportación completa de progreso.

## Riesgos conocidos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| El usuario envía un expediente malicioso | Parseo JSON limitado, scope exacto, normalización a campos conocidos, sin HTML dinámico |
| Cambia de AWS a GCP mientras se lee un fichero | Verificación del scope activo antes y después de la confirmación |
| El usuario pierde `localStorage` | Aviso de escritura fallida; exportación manual de progreso y expedientes |
| Informe aparentemente técnico pero vacío de sustancia | La evaluación automática se etiqueta como completitud; la revisión humana sigue siendo obligatoria para acreditar conocimiento |
| Credenciales expuestas en el aula | No se solicitan ni almacenan claves reales; los comandos mostrados son ejemplos para cuentas autorizadas |

## Contrato de un expediente portable

```json
{
  "schema": "cloud-engineering-academy/senior-checkpoint",
  "version": 1,
  "provider": "azure",
  "caseId": "s07",
  "exportedAt": "2026-11-11T12:20:00.000Z",
  "simulation": true,
  "session": {
    "version": 1,
    "stage": "investigar",
    "choice": null,
    "decisionLocked": false,
    "diagnosisChoice": null,
    "diagnosisLocked": false,
    "inspected": [],
    "cited": [],
    "answers": {"cause":"", "mitigation":"", "rollback":"", "validation":""},
    "acknowledged": false
  },
  "notice": "Expediente educativo local, sin firma ni revisión de identidad. No acredita competencia profesional."
}
```

## Controles de aceptación

- 18 incidentes, 18 diagnósticos, 18 playbooks y 54 cuadernos multicloud.
- Persistencia separada por `senior-session:<provider>:<caseId>`.
- Rechazo de `provider` o `caseId` incorrectos y de snapshots incompletos o mayores de 48 KiB.
- Conservación de todo el contenido V8 y comparación SHA-256 en `FILE_MANIFEST_V9.json`.
- Pruebas Node de la lógica y pruebas Playwright redactadas para el flujo de importación/exportación. Estas últimas requieren dependencias instaladas y navegador real para ejecutarse.
