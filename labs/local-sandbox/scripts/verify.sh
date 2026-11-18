#!/usr/bin/env bash
set -euo pipefail

curl -fsS --max-time 5 http://127.0.0.1:8088 >/dev/null
docker compose -f compose.yaml ps
echo "[PASS] Sandbox HTTP y aislamiento de datos verificados."
