# Laboratorio: Redes y conectividad — GCP

**Nivel:** Ruta práctica multicloud · **Modalidad:** guiada, no automatizada · **Cuenta real:** opcional.

## Competencia verificable
Diseñar una red segmentada, aplicar reglas y justificar el direccionamiento.

## Requisitos y límites
- Usa una cuenta/proyecto de laboratorio con presupuesto, MFA y roles de mínimo privilegio.
- No copies tokens ni datos sensibles en el informe.
- La actividad de consulta no tiene por qué generar cargos, pero los recursos asociados sí podrían hacerlo.
- Si no tienes acceso a cloud, prepara los diseños y evidencias teóricas, sin afirmar un despliegue real.

## Diagnóstico inicial (solo lectura, revisa contexto)
```bash
gcloud compute networks list
```

## Procedimiento
1. **IPv4, CIDR, DNS y HTTP**: Calcular máscaras, rangos, resolución DNS y flujo HTTP/TLS antes de abrir puertos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
2. **VPC, VNet y subredes**: Definir un rango CIDR que evite superposición y dos subredes con objetivos distintos.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
3. **Rutas y gateways**: Explicar next-hop, ruta por defecto y cuándo un gateway de Internet o NAT resulta necesario.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
4. **Firewalls, NSG y security groups**: Crear una matriz origen-destino-puerto-protocolo y aplicar denegación por defecto.
   - Evidencia: documenta resultado esperado, riesgo y una prueba de verificación.
5. **Redes públicas y privadas**: Ubicar balanceador en público y servicios/datos en privado; validar rutas de salida.
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
