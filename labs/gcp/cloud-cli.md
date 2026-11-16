# Laboratorio: CLI y automatización — GCP

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Automatizar tareas cloud sin exponer secretos.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
gcloud config configurations list
```

## Procedimiento
1. **CLI de AWS, Azure y GCP**: Inspeccionar versión, autenticación y ayuda de los comandos de AWS, Azure y GCP.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Perfiles, cuentas y contexto**: Imprimir contexto activo y evitar operaciones cruzadas entre ambientes.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Bash y scripting seguro**: Escribir scripts bash con set -euo pipefail, parámetros y operaciones idempotentes.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Variables de entorno y credenciales**: Evitar imprimir secretos y preferir federación OIDC y sesiones temporales.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Automatización de tareas repetibles**: Programar inventario de recursos con salida reproducible y ejecución auditable.
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
