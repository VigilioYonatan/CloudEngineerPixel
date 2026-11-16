# Ruta DevSecOps multicloud

Este bloque complementa los módulos de CI/CD, seguridad, infraestructura como código, observabilidad y Senior Mode. Son **ejercicios para cuentas de laboratorio autorizadas**, no scripts ejecutados por la web.

## Objetivos transversales

- Comprender identidad federada de corta duración (GitHub Actions OIDC) y evitar secretos permanentes.
- Establecer permisos mínimos para despliegues de prueba.
- Separar validación (`terraform fmt`, `terraform validate`, plan) de aplicación (revisión humana y cambio autorizado).
- Construir SBOM, auditoría de dependencias, firma/verificación de artefactos y controles de release.
- Mantener plan de reversión y evidencia de cada cambio.
- Controlar costos antes y después de una práctica, y destruir recursos creados **solo en el laboratorio**.

## Cómo practicar

1. Escoge un proveedor de la academia.
2. Lee la guía del proveedor y anota nombres de servicios equivalentes.
3. Describe una relación de confianza OIDC de forma conceptual, sin copiar credenciales.
4. Prepara un pull request ficticio con controles de calidad, evaluación de riesgos y aprobación.
5. Define evidencias: salida de test, plan Terraform redactado, reporte SCA, captura de métricas y procedimiento de cleanup.
6. Revisa los hallazgos con un docente y documenta las diferencias entre AWS, Azure y GCP.

**No se incluyen comandos que creen roles con permisos irrestrictos ni instrucciones para desactivar controles.**
