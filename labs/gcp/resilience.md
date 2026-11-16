# Laboratorio: HA y recuperación — GCP

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Diseñar una estrategia de continuidad con objetivos comprobables.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
gcloud compute zones list
```

## Procedimiento
1. **RTO y RPO**: Convertir impacto de negocio en objetivos medibles RTO y RPO.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Multi-AZ y multi-región**: Comparar zonas/regiones y medir diferencias reales de tiempo/costo.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Failover y replicación**: Diseñar replicación, quórum, lag y failover con validación de consistencia.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Chaos testing y game days**: Ejecutar game day seguro con hipótesis y mecanismo de parada.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Runbooks y ejercicios DR**: Documentar runbook completo con responsables, pruebas y hora de recuperación.
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
