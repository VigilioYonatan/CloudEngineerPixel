# Laboratorio: Redes avanzadas — AWS

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Diseñar conectividad privada y resiliente para servicios de negocio.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
aws elbv2 describe-load-balancers
```

## Procedimiento
1. **NAT y rutas avanzadas**: Simular tabla de rutas y NAT de salida, diferenciando retorno de tráfico.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **Load balancers y health checks**: Describir health checks y política de backends antes de exponer un balanceador.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **VPN y conectividad híbrida**: Documentar CIDR remotos, criptografía de túnel, rutas y dependencias híbridas.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Private endpoints y DNS**: Resolver split-horizon DNS, endpoints privados y reglas de acceso efectivas.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **TLS y arquitecturas de tres capas**: Presentar esquema navegador → LB → API privada → BD, incluyendo TLS por salto.
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
