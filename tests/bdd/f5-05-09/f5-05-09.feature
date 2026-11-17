# language: es
Característica: Cinco nuevos laboratorios de simulación cloud interactivos (F5-05..F5-09)

  Escenario: Nuevo Simulador 08 Kubernetes Scheduler & Failure Lab (F5-05)
    Dado que cargo k8sLabEngine.ts en src/features/simulators/engines
    Cuando evalúo requests/limits, PodDisruptionBudget, probes y HPA
    Entonces detecta determinísticamente estados Running, Pending, OOMKilled y CrashLoopBackOff

  Escenario: Nuevo Simulador 09 Load Balancing & Dependency Backpressure Lab (F5-06)
    Dado que cargo loadBalancingEngine.ts en src/features/simulators/engines
    Cuando aumento réplicas sin pool/backpressure frente al límite de conexiones de BD
    Entonces advierte saturación de base de datos aguas abajo conectando con S16

  Escenario: Nuevo Simulador 10 FinOps & Cloud Cost Scenario Lab (F5-07)
    Dado que cargo finopsEngine.ts en src/features/simulators/engines
    Cuando comparo on-demand vs reservas/ARM64, NAT Gateway vs VPC Endpoint y egress
    Entonces calcula ahorro porcentual bajo etiqueta explícita de modelo hipotético educativo

  Escenario: Nuevo Simulador 11 Disaster Recovery RTO / RPO Studio (F5-08)
    Dado que cargo drEngine.ts en src/features/simulators/engines
    Cuando comparo Backup & Restore, Pilot Light, Warm Standby y Active/Active contra objetivos RTO/RPO
    Entonces valida numéricamente cumplimiento o incumplimiento de RTO/RPO y costo relativo

  Escenario: Nuevo Simulador 12 Messaging, Retries & Idempotency Lab (F5-09)
    Dado que cargo messagingEngine.ts en src/features/simulators/engines
    Cuando simulo entrega at-least-once con fallos transitorios y mensajes venenosos
    Entonces demuestra cobros duplicados sin idempotency_key y eliminación de duplicados con Outbox + DLQ
