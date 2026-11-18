#!/usr/bin/env bash
set -euo pipefail

docker compose -f compose.yaml down -v --remove-orphans
rm -f .env
echo "[CLEAN] Contenedores, redes y volúmenes efímeros eliminados."
