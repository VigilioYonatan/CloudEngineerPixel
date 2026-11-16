# Seguridad de laboratorios: obligatorio antes de usar cuentas reales

- Cuenta/suscripción/proyecto exclusivos para capacitación; jamás producción.
- MFA para identidades humanas y permisos temporales / mínimos.
- Alertas de costos y presupuestos antes del laboratorio; los alertas no bloquean necesariamente consumo.
- Recopilar solo evidencias anonimizadas y nunca copiar archivos de credenciales.
- Evitar redes públicas, puertos administrativos globales y buckets públicos.
- No ejecutar terraform apply/destroy a ciegas. Revisar plan, dependencias y estado.
- Los ejemplos de Terraform pueden generar costes: están fuera del navegador.
- Cada laboratorio requiere verificación final de eliminación y revisión de costos diferidos.
- Un navegador público no debe manejar credenciales cloud ni aplicar Terraform.
