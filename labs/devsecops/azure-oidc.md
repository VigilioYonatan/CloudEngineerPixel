# Azure · Workload identity federation

**Capacidad cloud:** credenciales federadas de Microsoft Entra ID para GitHub Actions, sin secretos de aplicación duraderos.

## Laboratorio guiado

1. Define la suscripción, grupo de recursos de práctica y el entorno GitHub autorizado.
2. Identifica la aplicación o identidad administrada a la que se asociará la credencial federada.
3. Restringe issuer, audience y subject a la identidad exacta del workflow/repo/entorno.
4. Asigna el rol Azure RBAC mínimo en el **grupo de recursos de laboratorio**, no en toda la suscripción.
5. Para diagnóstico solo lectura: `az account show --output table`, `az role assignment list --assignee OBJECT_ID --output table`.
6. Documenta acceso temporal, auditoría, reversión y limpieza de recursos.

**Evidencia exigida:** trust boundary, asignaciones RBAC, resultados de validación del workflow, revisión de cambios y comprobación de costos.

**Riesgos:** Contributor en toda la suscripción, sujetos OIDC amplios, permisos no necesarios, secretos en logs y falta de segregación de entornos.
