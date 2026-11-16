# Laboratorio: Proyecto Arquitecto Multicloud — AZURE

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Defender una arquitectura ante evaluación técnica y económica.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
az account show
```

## Procedimiento
1. **Requisitos funcionales y no funcionales**: Convertir requisitos funcionales y no funcionales en criterios medibles.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Diseño y threat model**: Dibujar flujo y trust boundaries, asociando amenazas a mitigaciones.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **IaC, CI/CD y observabilidad**: Describir pipeline IaC, pruebas, deploy, rollback y telemetría de extremo a extremo.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Pruebas, DR y estimación de costos**: Ejecutar plan de carga y recuperación, estimar TCO con supuestos explícitos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Defensa técnica y decisión multicloud**: Defender ADR con opciones, costos, riesgos, KPIs y evidencia comprobable.
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
