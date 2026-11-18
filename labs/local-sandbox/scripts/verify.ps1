$ErrorActionPreference = "Stop"
$resp = Invoke-WebRequest -Uri "http://127.0.0.1:8088" -UseBasicParsing -TimeoutSec 5
if ($resp.StatusCode -ne 200) {
  throw "Respuesta inesperada: $($resp.StatusCode)"
}
docker compose -f compose.yaml ps
Write-Host "[PASS] Sandbox HTTP y red aislada verificados correctamente."
