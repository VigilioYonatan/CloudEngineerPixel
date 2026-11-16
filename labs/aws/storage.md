# Laboratorio: Storage y bases de datos — AWS

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Seleccionar almacenamiento según el uso y configurar protección de datos.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
aws s3 ls
```

## Procedimiento
1. **Object, block y file storage**: Distinguir semánticas de objeto, volumen de bloques y sistema POSIX compartido.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Buckets y contenedores de objetos**: Diseñar bucket privado, políticas de acceso y nombres/ubicación sin exponer contenido.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Cifrado y ciclo de vida**: Seleccionar cifrado, versionado, retención y políticas de lifecycle con prueba de recuperación.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Bases de datos SQL administradas**: Escoger PostgreSQL administrado, red privada, rotación de secreto y backups.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Backup y restauración**: Hacer restore drill, medir RTO y comprobar integridad de los datos recuperados.
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
