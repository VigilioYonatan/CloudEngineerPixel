# Seguridad / Vulnerability disclosure

Este proyecto es una **academia educativa**; las simulaciones y expedientes Senior usan datos ficticios. No conectar cuentas ni credenciales de producción al navegador. No cargar secretos, archivos `.tfstate`, claves privadas ni tokens al repositorio.

## Reporte responsable

No publiques credenciales ni pruebas de explotación en issues públicos. Usa el canal privado de seguridad del repositorio (GitHub Security Advisories) si está habilitado, o contacta de forma privada a quien administre este despliegue.

## Límites

- No existe backend de aislamiento ni aprovisionamiento remoto. El navegador NO ejecuta comandos AWS, Azure, GCP o Terraform.
- Progreso y reportes se almacenan localmente en el dispositivo del estudiante; los archivos de exportación pueden incluir datos introducidos por el usuario.
- El importador limita tamaños, claves y puntuaciones, pero no reemplaza autenticación ni autorización.
- Los análisis de npm audit y el escaneo de secretos son controles parciales; requieren seguimiento humano y proveedores de seguridad adicionales antes de desplegar en producción.
- Los comandos de laboratorio deben revisarse en cuentas de práctica, con cuotas, presupuestos, identidades mínimas y destrucción controlada.
