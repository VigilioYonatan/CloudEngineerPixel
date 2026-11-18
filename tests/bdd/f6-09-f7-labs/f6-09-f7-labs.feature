# language: es
Característica: Glosario técnico global y Laboratorios conectados con Sandbox Local, Terraform, Anti-Secretos y Exportador (F6-09, F7-01..F7-08)

  Escenario: F6-09 Glosario técnico contextual y buscador global de siglas cloud
    Dado que cargo el glosario técnico de ingeniería cloud
    Cuando busco términos clave como CIDR, OIDC, RTO, SLO, DLQ, KMS, Drift y SBOM sin distinguir tildes
    Entonces el glosario contiene al menos 20 términos con matices AWS, Azure y GCP
    Y GlossaryModal se expone de forma accesible desde AppHeader y UnitSpecPanel

  Escenario: F7-01, F7-02, F7-03 y F7-04 Guías conectadas, 3 modalidades, kit prod-local y Terraform enterprise
    Dado que inspecciono los materiales de laboratorio y el kit local-sandbox
    Cuando verifico las 54 guías de módulo, las 3 guías OIDC, compose.yaml, Kind y enterprise-finops.tf
    Entonces LabPage distingue explícitamente Modalidad A, Modalidad B y Modalidad C más Cuaderno Markdown descargable
    Y compose.yaml no expone ningún puerto en 0.0.0.0 e incluye scripts setup, verify y cleanup en PowerShell y Bash
    Y los módulos enterprise-finops.tf fijan required_providers y etiquetas FinOps obligatorias

  Escenario: F7-05, F7-06, F7-07 y F7-08 Checklist persistente, filtro anti-secretos, metadatos y reporte de evidencia
    Dado que trabajo en un laboratorio con checklist, notas y metadatos por módulo
    Cuando persisto pasos marcados, intento guardar un secreto simulado y genero un reporte limpio
    Entonces el checklist y la modalidad se restauran íntegros por proveedor y módulo
    Y secretGuard detecta y bloquea claves AWS, API keys, tokens GitHub, llaves privadas y JWTs
    Y los 18 módulos declaran permisos mínimos, tiempo, costos, post-cleanup y exportan reporte con aviso honesto
