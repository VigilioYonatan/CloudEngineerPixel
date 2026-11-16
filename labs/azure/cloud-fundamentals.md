# Laboratorio: Fundamentos Cloud — AZURE

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Explicar las bases de una solución cloud y escoger servicios con criterio.

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
1. **Modelos IaaS, PaaS y SaaS**: Comparar responsabilidad operativa: máquina virtual (IaaS), runtime administrado (PaaS) y aplicación final (SaaS).
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Regiones, zonas y responsabilidad compartida**: Identificar localización de datos, dominios de fallo y responsabilidades del proveedor y del cliente.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Alta disponibilidad y escalabilidad**: Separar disponibilidad de capacidad; medir SLA y evitar puntos únicos de fallo.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Cuentas, proyectos y organización**: Distinguir organización, cuenta/suscripción/proyecto, identidad y facturación antes de crear recursos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Arquitectura y diagrama de una solución**: Trazar usuarios, entrada, cómputo, datos, salida, confianza y costes en un diagrama.
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
