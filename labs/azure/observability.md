# Laboratorio: CI/CD y observabilidad — AZURE

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Entregar una aplicación con pipeline y señales de salud verificables.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
az monitor action-group list
```

## Procedimiento
1. **Git y ramas de integración**: Elegir estrategia de ramas y revisiones para cambios de infraestructura.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **GitHub Actions y OIDC**: Usar OIDC de corta duración, permisos específicos y checks obligatorios en CI.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Logs, métricas y trazas**: Correlacionar un traceId con latencia p99, logs estructurados y métricas RED.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Alertas y dashboards**: Elegir alertas accionables con umbrales y objetivos de SLO, evitando ruido.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Proyecto: aplicación de varias capas**: Entregar API + datos + observabilidad con verificaciones de salud y rollback.
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
