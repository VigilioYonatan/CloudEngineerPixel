# Laboratorio: Serverless y APIs — GCP

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Diseñar una API serverless con reintentos controlados.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
gcloud functions list
```

## Procedimiento
1. **Funciones y runtimes**: Elegir runtime, límites de memoria/concurrencia y timeout a partir de objetivos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **APIs y puertas de enlace**: Diseñar contrato HTTP, códigos de error, autenticación y throttling.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Eventos, colas y reintentos**: Planificar reintentos con backoff, visibilidad de cola y entregas duplicadas.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Idempotencia y DLQ**: Aplicar idempotency key, deduplicación y envío a DLQ tras reintentos agotados.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Integración con datos administrados**: Configurar conexión mínima a datos con timeout y pooling para evitar saturación.
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
