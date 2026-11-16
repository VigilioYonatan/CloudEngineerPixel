# AWS · CI/CD con identidad federada

**Capacidad cloud:** federación OIDC de GitHub Actions con AWS IAM, en vez de claves `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` permanentes.

## Laboratorio guiado

1. Identifica el repositorio, rama y entorno autorizados para el `sub` de GitHub OIDC.
2. Define el alcance del rol: solo permisos indispensables para un despliegue de laboratorio.
3. Diseña la política de confianza validando `aud` y `sub` específicos; **nunca** uses un comodín para cualquier repositorio.
4. Exige aprobaciones para operaciones de infraestructura de impacto y revisa CloudTrail.
5. Contrasta comandos de solo lectura: `aws sts get-caller-identity`, `aws iam get-role --role-name NOMBRE_ROL`.
6. Documenta cómo revocar el acceso y cómo eliminar recursos del laboratorio.

**Evidencia exigida:** diagrama de confianza, política redactada sin credenciales, registro de revisión, tabla de permisos mínimos, plan de reversión y control de costos.

**Riesgos:** permisos demasiado amplios, `sub` genérico, credenciales permanentes, estado Terraform expuesto y falta de retención de logs.
