# S05 · Subred que no alcanza la base de datos

## Contexto
La API no conecta con una base privada desplegada en otra subred.

**Señal observada:** `connection timeout tcp/5432`

## Tarea de la persona que investiga
1. Redactar qué información falta antes de intervenir.
2. Identificar impacto al cliente, servicios afectados y grado de incertidumbre.
3. Plantear hipótesis falsables y consultas de solo lectura para probarlas.
4. Proponer contención reversible, personas responsables y comunicación.
5. Mostrar un plan de corrección, observabilidad y prevención de recurrencia.
6. Decidir si la solución cambia entre AWS, Azure y GCP; justificar.

## Criterio de revisión
La conectividad se resuelve por capas sin exponer innecesariamente la base.

## Formato de informe
- **Resumen ejecutivo**
- **Cronología UTC**
- **Señales y evidencias** (sin secretos)
- **Hipótesis y resultados**
- **Decisión y riesgo residual**
- **Plan de recuperación / rollback**
- **Cambios sistémicos y postmortem**

> Práctica de simulación. No contiene acceso ni ejecución en infraestructura real.
