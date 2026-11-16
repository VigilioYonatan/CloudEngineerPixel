# S14 · Eventos duplicados en cobros

## Contexto
Reintentos de cola provocaron cobros duplicados a clientes.

**Señal observada:** `message redelivery count 2-4; duplicate payment IDs`

## Tarea de la persona que investiga
1. Redactar qué información falta antes de intervenir.
2. Identificar impacto al cliente, servicios afectados y grado de incertidumbre.
3. Plantear hipótesis falsables y consultas de solo lectura para probarlas.
4. Proponer contención reversible, personas responsables y comunicación.
5. Mostrar un plan de corrección, observabilidad y prevención de recurrencia.
6. Decidir si la solución cambia entre AWS, Azure y GCP; justificar.

## Criterio de revisión
La semántica at-least-once exige diseñar efectos idempotentes y reconciliación.

## Formato de informe
- **Resumen ejecutivo**
- **Cronología UTC**
- **Señales y evidencias** (sin secretos)
- **Hipótesis y resultados**
- **Decisión y riesgo residual**
- **Plan de recuperación / rollback**
- **Cambios sistémicos y postmortem**

> Práctica de simulación. No contiene acceso ni ejecución en infraestructura real.
