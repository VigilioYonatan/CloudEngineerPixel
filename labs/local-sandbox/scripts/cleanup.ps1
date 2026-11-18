$ErrorActionPreference = "Stop"
docker compose -f compose.yaml down -v --remove-orphans
if (Test-Path ".env") {
  Remove-Item ".env" -Force
}
Write-Host "[CLEAN] Contenedores, redes y volúmenes efímeros eliminados."
