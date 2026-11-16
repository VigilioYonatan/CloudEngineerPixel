# Senior Mode V3 — Manual del estudiante e instructor

## Qué es

Simulador educativo de incidentes de infraestructura cloud para **AWS, Azure y GCP**, con 18 expedientes independientes y tres etapas: investigación, decisión y documentación. Cada incidente incluye tres fuentes sintéticas de evidencia, una rúbrica profesional, contexto por proveedor y un ejemplo de comando de lectura. **No accede a cuentas reales**.

## Flujo del alumno

1. En el header, elegir AWS, Azure o GCP.
2. Acceder a Senior Mode, buscar por competencia o severidad, abrir un caso.
3. Revisar los artefactos en **Investigar** y pulsar *Examinar* en las dos fuentes principales. Contrastar registros, métricas, políticas o configuraciones.
4. Ir a **Decidir** y seleccionar la mejor primera respuesta. La interfaz muestra la explicación, y registra el intento (incluidos errores) en almacenamiento local.
5. En **Informe y evaluación**, redactar tres apartados: causa raíz/hipótesis, contención/mitigación, validación/riesgo residual. Cada apartado requiere un mínimo de 50 caracteres; este umbral mide solo completitud.
6. Marcar la confirmación de que las evidencias se analizaron y de que la simulación necesita revisión externa para acreditar competencias.
7. Guardar el borrador o exportar el expediente como JSON; registrar la simulación si cumplen los criterios de completitud.

## Criterio de puntuación

| Condición | Puntaje de completitud |
|---|---:|
| Decisión inicial correcta | 40 |
| Dos artefactos principales examinados | 20 |
| Tres apartados del informe completos | 30 |
| Confirmación expresa del alcance | 10 |

**No es evaluación semántica** ni certificación profesional. Para acreditar competencias, un docente debe revisar razonamiento, hipótesis, evidencia técnica y riesgo residual. Una redacción irrelevante también puede superar los límites de caracteres. Los intentos no correctos se registran como práctica, no equivalen a una evaluación supervisada.

## Persistencia y privacidad

Los registros se almacenan localmente mediante `cea:progress`, con `seniorAttempts` opcional para compatibilidad con exportaciones V1/V2, e informes en `notes["senior:<provider>:<case>"]`. Se conservan hasta 300 intentos recientes para limitar tamaño. No se transmiten datos a un servidor. Evita incluir información de clientes, credenciales o secretos en los informes. Exportación JSON es responsabilidad del usuario.

## Alcances y limitaciones técnicas

- El selector de proveedor cambia servicios y comandos ilustrativos; no ejecuta comandos.
- Datos, logs, incidentes y criterios son ficticios y simplificados para enseñanza.
- No incorpora evaluador de IA ni grading automático semántico.
- La puntuación se puede completar mediante autodeclaraciones; **nunca** presentarla como acreditación.
- Se requiere una instalación npm y una compilación de Vite en un entorno con dependencias para verificar el navegador y el render. Esta entrega verificó sintaxis TypeScript y pruebas Node, pero no compilación de navegador por inaccesibilidad de npm.

## Siguiente nivel: verificación docente

Para evaluación acreditable, añadir revisión humana con rúbrica específica por incidente y evidencia reproducible (planes Terraform, política IAM, manifiestos Kubernetes, cálculos RTO/RPO y pruebas de rollback) en un backend autenticado. No almacenar secretos ni permitir destrucción de recursos sin controles.
