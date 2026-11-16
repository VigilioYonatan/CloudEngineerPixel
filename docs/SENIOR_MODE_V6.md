# Senior Mode V6 — investigaciones y evaluación responsable

## Experiencia

18 escenarios de investigación por proveedor (54 contextos AWS/Azure/GCP). El alumno:

1. Abre un expediente sintético con logs, métricas y runbook.
2. Marca como examinadas al menos las dos evidencias principales.
3. Elige y **confirma** una decisión de contención; una decisión incorrecta queda registrada en la bitácora y puede reevaluarse.
4. Redacta un informe estructurado: **hipótesis causal, mitigación, reversión/condiciones de parada, validación y riesgo residual**.
5. Enlaza explícitamente a su informe las dos evidencias examinadas.
6. Reconoce que los puntos son de completitud, no de calidad profesional, y registra la simulación.
7. Exporta JSON del expediente y plantilla de rúbrica para evaluación humana.

## Evaluación automática V6

| Control de completitud | Puntos |
| --- | ---: |
| Decisión adecuada confirmada | 25 |
| Dos evidencias principales examinadas | 20 |
| Dos evidencias principales vinculadas/citadas | 15 |
| Cuatro apartados de informe con ≥60 caracteres | 30 |
| Reconocimiento del alcance educativo | 10 |
| **Total** | **100** |

**Importante:** pulsar «Examinar» y «Citar» no constituye una prueba de comprensión; escribir 60 caracteres tampoco valida un argumento. El informe exige revisión técnica con la rúbrica humana existente: trazabilidad, seguridad, mitigación, verificación, comunicación.

## Migración desde V5

- `progress.seniorAttempts` sigue aceptando reportes antiguos; los nuevos agregan `rollback` y `citations`.
- Los borradores antiguos se conservan. Se muestran con `rollback` vacío para permitir completarlos sin perder las otras secciones.
- La lista de casos y los 54 cuadernos originales **no se eliminan**.
- El motor nuevo `src/lib/seniorEvaluation.mjs` no requiere red y tiene tests de positivos/negativos, citas y reportes incompletos.

## Seguridad

Simulaciones de solo lectura. Las guías pueden proponer comandos para entornos autorizados, pero el navegador nunca ejecuta AWS CLI, Azure CLI, gcloud ni Terraform.
