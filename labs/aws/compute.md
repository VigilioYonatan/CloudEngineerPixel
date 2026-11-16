# Laboratorio: Cómputo y Linux — AWS

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Provisionar un servidor de forma segura y verificar su funcionamiento.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
aws ec2 describe-instances --region us-east-1
```

## Procedimiento
1. **Linux, SSH y claves**: Aplicar acceso con claves, usuario no root, parches y autenticación de identidad.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Máquinas virtuales e imágenes**: Comparar imagen, disco de arranque y metadatos; declarar tamaño y zona.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Tipos de instancias y tamaños**: Elegir vCPU/memoria con métricas de carga, no por intuición.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Discos, snapshots y usuario de arranque**: Decidir persistencia y probar restauración del volumen sin depender del host.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Disponibilidad y escalamiento básico**: Implementar mínimo dos réplicas y health check antes de hablar de alta disponibilidad.
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
