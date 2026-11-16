# Laboratorio: Arquitectura Cloud Native — GCP

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Justificar una arquitectura en función de requisitos y trade-offs.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
gcloud api-gateway gateways list --location=REGION
```

## Procedimiento
1. **Monolito modular vs microservicios**: Comparar monolito modular con microservicios mediante independencia de equipos y coste.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Patrones distribuidos**: Explicar retry, timeout, circuit breaker, bulkhead y fallos parciales.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Event-driven y consistencia**: Distinguir delivery at-least-once y consistencia eventual con invariantes de negocio.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Contratos, latencia y fallos parciales**: Establecer contrato API, presupuesto de latencia y política de degradación.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Architecture Decision Records**: Redactar ADR con contexto, alternativas, decisión, consecuencias y revisiones.
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
