# Laboratorio: Docker y Kubernetes — AWS

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Contenerizar y desplegar una aplicación con controles básicos.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
aws eks list-clusters
```

## Procedimiento
1. **Dockerfiles y capas**: Construir imagen multi-stage con usuario no root, caché y mínimo tamaño.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Registry y seguridad de imágenes**: Firmar o fijar digest y escanear la imagen antes de publicarla.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Pods, Deployments y Services**: Escribir Deployment con probes, requests/limits y Service interno.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **EKS, AKS y GKE**: Comparar responsabilidades operativas de EKS, AKS y GKE por modo de nodos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Autoscaling y rollout seguro**: Crear estrategia rolling y comprobar HPA con métricas y límites del backend.
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
