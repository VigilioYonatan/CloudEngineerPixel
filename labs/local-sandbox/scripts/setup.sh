#!/usr/bin/env bash
set -euo pipefail

echo "[CEA Local Sandbox] Verificando Docker / Rootless Podman..."
docker info >/dev/null
if [[ ! -f ".env" ]]; then
  cp .env.example .env
fi
docker compose -f compose.yaml up -d --wait
echo "[OK] Entorno local activo en http://127.0.0.1:8088 (PostgreSQL aislado en red interna)."
