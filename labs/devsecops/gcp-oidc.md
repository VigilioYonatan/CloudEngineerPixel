# Google Cloud · Workload Identity Federation

**Capacidad cloud:** federación de identidad de workload para que los jobs de GitHub usen tokens efímeros en GCP.

## Laboratorio guiado

1. Define proyecto, identidad, pool/proveedor de federación y repositorio GitHub autorizado.
2. Especifica condiciones de atributos para restringir repository, ref y environment.
3. Diseña impersonación de cuenta de servicio con permisos mínimos sobre recursos de laboratorio.
4. Evita distribuir claves JSON de service accounts; no almacenes claves en `VITE_*`.
5. Consultas de solo lectura: `gcloud config list`, `gcloud iam service-accounts list --project=PROJECT_ID`.
6. Documenta cómo revocar el binding, auditar eventos y limpiar recursos.

**Evidencia exigida:** arquitectura de confianza, configuración de atributos redactada, política IAM revisada, resultados de tests y cleanup.

**Riesgos:** bindings `allUsers`, roles excesivos, ausencia de condiciones y credenciales permanentes.
