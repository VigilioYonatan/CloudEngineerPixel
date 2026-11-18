$ErrorActionPreference = "Stop"
Write-Host "[CEA Local Sandbox] Verificando Docker Engine..."
docker info | Out-Null
if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
}
docker compose -f compose.yaml up -d --wait
Write-Host "[OK] Entorno local activo en http://127.0.0.1:8088 (PostgreSQL aislado en private_data)."
