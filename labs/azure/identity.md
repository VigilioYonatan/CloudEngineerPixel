# Laboratorio: IAM y seguridad inicial — AZURE

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Aplicar mínimo privilegio e identificar permisos excesivos.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
az role assignment list --assignee OBJECT_ID
```

## Procedimiento
1. **Responsabilidad compartida**: Construir matriz de responsabilidad cliente/proveedor por servicio y tipo de dato.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Usuarios, grupos, roles y políticas**: Modelar principal, recurso, acción, condición y efecto de una política.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **MFA y mínimo privilegio**: Definir MFA para humanos y credenciales temporales para máquinas, con mínimo privilegio.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Cifrado, claves y secretos**: Separar cifrado en tránsito/reposo de custodia de claves y rotación de secretos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Auditoría y acceso seguro**: Rastrear quién hizo qué sobre cuál recurso y conservar evidencias auditables.
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
