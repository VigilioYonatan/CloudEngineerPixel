# S18 · Defensa de arquitectura empresarial

## Contexto
Presenta una plataforma transaccional con requisitos de 99.95%, recuperación y cumplimiento en una nube elegida.

**Señal observada:** `Target: 99.95% availability | RTO 1h | RPO 15m`

## Tarea de la persona que investiga
1. Redactar qué información falta antes de intervenir.
2. Identificar impacto al cliente, servicios afectados y grado de incertidumbre.
3. Plantear hipótesis falsables y consultas de solo lectura para probarlas.
4. Proponer contención reversible, personas responsables y comunicación.
5. Mostrar un plan de corrección, observabilidad y prevención de recurrencia.
6. Decidir si la solución cambia entre AWS, Azure y GCP; justificar.

## Criterio de revisión
Una arquitectura senior comunica decisiones y evidencias de resiliencia y seguridad.

## Formato de informe
- **Resumen ejecutivo**
- **Cronología UTC**
- **Señales y evidencias** (sin secretos)
- **Hipótesis y resultados**
- **Decisión y riesgo residual**
- **Plan de recuperación / rollback**
- **Cambios sistémicos y postmortem**

> Práctica de simulación. No contiene acceso ni ejecución en infraestructura real.
