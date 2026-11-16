# Laboratorio: Seguridad y gobernanza — AWS

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Definir controles preventivos y detectivos para una organización.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
aws organizations describe-organization
```

## Procedimiento
1. **Landing zones y organización**: Diseñar landing zone con auditoría, red, identidad y logging centralizados.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Políticas, cuentas y jerarquía**: Separar ambientes y equipos en estructura de cuentas/suscripciones/proyectos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Zero Trust y segmentación**: Revisar amenazas de identidad, red y datos bajo enfoque Zero Trust.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **KMS, secretos y auditoría**: Definir custodia de claves y políticas de acceso y trazabilidad de secretos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Compliance y threat modeling**: Hacer threat model con activos, fronteras de confianza, mitigaciones y pruebas.
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
