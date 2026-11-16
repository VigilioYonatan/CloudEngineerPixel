# Laboratorio: Datos e integración — GCP

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Escoger patrones de datos y diseñar integraciones resilientes.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
gcloud sql instances list
```

## Procedimiento
1. **SQL y NoSQL con trade-offs**: Seleccionar SQL/NoSQL según patrones de consulta, transacciones y evolución.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Cachés y consistencia**: Comparar caché write-through/cache-aside y políticas de invalidación.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Mensajería y streaming**: Diseñar colas y streams con orden, reintentos, idempotencia y DLQ.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Data lakes y pipelines**: Separar ingesta, lake y consumo; gestionar esquemas y calidad de datos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Gobernanza y seguridad de datos**: Aplicar clasificación, retención, acceso, residencia y cifrado de datos.
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
