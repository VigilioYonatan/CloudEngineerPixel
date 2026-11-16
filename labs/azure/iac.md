# Laboratorio: Terraform e IaC — AZURE

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Versionar infraestructura y revisar los planes antes de aplicarlos.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
terraform plan -out=lab.tfplan
```

## Procedimiento
1. **Terraform providers, recursos y variables**: Explicar providers, resources, data sources y variables con un plan sin apply.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **State remoto y locking**: Restringir acceso al state, cifrarlo, bloquear concurrencia y separar entornos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Plan, apply y drift**: Diferenciar refresh, drift, plan y apply; interpretar cambios destructivos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Módulos y ambientes**: Extraer módulos versionados con inputs, outputs, validaciones y tests.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Revisión de cambios destructivos**: Aprobar o bloquear PR según blast radius, force replacement, backup y rollback.
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
