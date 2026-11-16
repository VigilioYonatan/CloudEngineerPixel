# Laboratorio: SRE, plataforma y FinOps — AWS

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Operar servicios conforme a SLO y optimizar costos sin dañar la fiabilidad.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
aws cloudwatch list-alarms
```

## Procedimiento
1. **SLI, SLO y error budgets**: Definir SLI de éxito y latencia, ventana SLO y burn-rate.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Gestión de incidentes y postmortems**: Usar severidad, roles, timeline, comunicación y postmortem sin culpables.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Platform Engineering y GitOps**: Ofrecer camino de despliegue autoservicio con guardrails y GitOps.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Observabilidad avanzada**: Diseñar trazas, métricas de saturación y alarmas de causa/impacto.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Optimización, reservas y costos unitarios**: Medir coste por transacción, reservas y rightsizing sin degradar SLO.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.

## Entregables
- Diagrama con límites de confianza y servicios usados.
- Tabla con decisiones, alternativas descartadas y razón.
- Evidencias de resultado o simulación explícitamente etiquetadas.
- Registro de costos esperados, medidas de seguridad y plan de cleanup.

## Rúbrica (100 puntos)
| Criterio | Puntos |
|---|---:|
| Solución técnicamente razonada | 30 |
| Seguridad y mínimo privilegio | 25 |
| Pruebas y evidencia reproducible | 25 |
| Riesgos, costos y limpieza | 20 |

## Cleanup
Identifica explícitamente los recursos creados, elimínalos con el mecanismo aprobado y verifica estado y cargos remanentes; no ejecutes comandos destructivos sin conocer dependencias.
