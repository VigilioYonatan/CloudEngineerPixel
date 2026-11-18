# Laboratorio Local Reproducible (`prod-local` · Modalidad B)

Este kit permite practicar **Redes aisladas, Contenedores non-root, Salud HTTP y Kubernetes (Kind)** en tu propio equipo **sin tarjeta de crédito, sin cuenta cloud y sin exponer puertos en `0.0.0.0`**.

## Requisitos mínimos
- **CPU / RAM:** 2 vCPU, 4 GB RAM libres.
- **Runtime:** Docker Desktop, Docker Engine o Podman Rootless + Compose v2.
- **Opcional (Módulo 10 Kubernetes):** `kind` + `kubectl`.

## Flujo en Windows (PowerShell)
```powershell
cd labs/local-sandbox
powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\verify.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\cleanup.ps1
```

## Flujo en Linux / macOS / WSL2 (Bash)
```bash
cd labs/local-sandbox
bash ./scripts/setup.sh
bash ./scripts/verify.sh
bash ./scripts/cleanup.sh
```

## Práctica opcional en Kubernetes local (`Kind`)
```bash
kind create cluster --name cea-lab
kubectl apply -f k8s-kind-manifest.yaml
kubectl -n cea-sandbox get pods,pdb,networkpolicy
kind delete cluster --name cea-lab
```

## Límites honestos frente a nube real
- Emula segmentación de red (`public_edge` vs `private_data` con `internal: true`), probes y presupuestos de disrupción (`PDB`), pero **no** reproduce latencia inter-AZ física, IAM oficial del proveedor ni facturación por transferencia.
