# S01 · Cambios destructivos en Terraform

## Contexto
El pipeline propone reemplazar una base de datos de producción durante una ventana comercial activa.

**Señal observada:** `Plan: 1 to add, 0 to change, 1 to destroy. db-primary must be replaced.`

## Tarea de la persona que investiga
1. Redactar qué información falta antes de intervenir.
2. Identificar impacto al cliente, servicios afectados y grado de incertidumbre.
3. Plantear hipótesis falsables y consultas de solo lectura para probarlas.
4. Proponer contención reversible, personas responsables y comunicación.
5. Mostrar un plan de corrección, observabilidad y prevención de recurrencia.
6. Decidir si la solución cambia entre AWS, Azure y GCP; justificar.

## Criterio de revisión
Una sustitución destructiva requiere verificar la causa, dependencias, backups y un plan autorizado.

## Formato de informe
- **Resumen ejecutivo**
- **Cronología UTC**
- **Señales y evidencias** (sin secretos)
- **Hipótesis y resultados**
- **Decisión y riesgo residual**
- **Plan de recuperación / rollback**
- **Cambios sistémicos y postmortem**

> Práctica de simulación. No contiene acceso ni ejecución en infraestructura real.
