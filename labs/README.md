# Laboratorio de redes multicloud — Terraform

**Estos archivos NO se ejecutan desde la web y no contienen claves.** Son ejemplos iniciales de red para revisar y ejecutar fuera de la academia. Las nubes no son totalmente equivalentes: VPC de AWS es regional, las subredes de Azure viven dentro de una VNet y GCP tiene VPC global y subredes regionales.

## Requisitos

- Terraform compatible con los `required_version` de cada ejemplo.
- CLI del proveedor, autenticación con permisos limitados y MFA cuando proceda.
- Cuenta/proyecto *exclusivamente de laboratorio*. Revise precios y establezca presupuesto/alertas.
- Confirme identificador de cuenta, región y recursos existentes. **Nunca ejecute `destroy` sobre un directorio/state de producción.**

## Preparación y ejecución

Desde `labs/aws`, `labs/azure` o `labs/gcp`:

```bash
terraform init
terraform fmt -check
terraform validate
terraform plan -out=lab.tfplan
# Revise TODO el plan, especialmente reemplazos/destrucciones.
terraform apply lab.tfplan
```

Para GCP pase `-var='project_id=mi-proyecto-lab'` durante `plan` si no usa `TF_VAR_project_id`. Azure requiere una suscripción visible en `az account show`; AWS use una identidad/rol de laboratorio. Antes de aplicar, revise políticas locales de la organización y costos vigentes.

## Evidencia y cleanup

Capture el ID de red creado, CIDR y subred, sin mostrar tokens. Tras finalizar, revise el plan de eliminación y ejecute desde la MISMA carpeta/estado de laboratorio:

```bash
terraform plan -destroy
terraform destroy
```

Compruebe en la consola del proveedor que los recursos desaparecieron, que no quedan recursos auxiliares ni cargos pendientes; algunas facturas se reflejan con demora. Los archivos de estado pueden contener información sensible: no los publique.
