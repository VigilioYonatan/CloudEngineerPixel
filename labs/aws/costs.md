# Laboratorio: Costos y primer despliegue — AWS

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Desplegar un recurso controlando costos y eliminarlo correctamente.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
aws budgets describe-budgets --account-id ACCOUNT_ID
```

## Procedimiento
1. **Precios y modelos de cobro**: Enumerar dimensiones de cobro: tiempo, solicitudes, almacenamiento, red y servicios auxiliares.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Presupuestos y alertas**: Crear alertas por umbral y comprobar periodicidad/retardo de reportes de gasto.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Etiquetas de costo y ownership**: Diseñar etiquetas owner, environment y cost-center para asignación de gasto.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Despliegue de una página estática**: Publicar sitio estático privado/público según necesidad, controlar CDN y cache.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Cleanup y comprobación final**: Eliminar recursos en orden de dependencias y comprobar facturación residual posterior.
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
