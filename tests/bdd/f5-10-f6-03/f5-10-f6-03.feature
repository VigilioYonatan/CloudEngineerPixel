# language: es
Característica: Observability Lab, Fichas de Modelo en Simuladores y Currículo Profundo Nivel 1-2 (F5-10..F6-03)

  Escenario: Nuevo Simulador 13 Observability & Burn-Rate Alert Lab (F5-10)
    Dado que cargo observabilityEngine.ts en src/features/simulators/engines
    Cuando evalúo tasas de burn rate en ventanas 1h y 6h frente a alertas por CPU aislada
    Entonces clasifica severidad multi-window multi-burn-rate y valida traceparent

  Escenario: Catálogo de Simuladores con fichas de modelo, supuestos y límites (F5-11)
    Dado que inspecciono simulatorCatalogMeta.ts y SimulatorsPage.tsx
    Cuando verifico los 13 motores de simulación
    Entonces cada motor tiene categoría, versión, fórmula/reglas y simplificaciones documentadas

  Escenario: Contrato tipado UnitContentSpec en src/domain/curriculum.ts (F6-01)
    Dado que inspecciono src/domain/curriculum.ts
    Cuando valido el esquema UnitContentSpec
    Entonces incluye objetivo, modelo mental, antipatrón, glosario, adaptadores AWS/Azure/GCP con verifiedAt y actividad

  Escenario: Contenido único para las 30 unidades de Nivel 1 Fundamentos (F6-02)
    Dado que cargo las 30 unidades de Nivel 1 (Módulos 01 a 06)
    Cuando verifico mentalModel y antipattern de cada unidad
    Entonces existen las 30 unidades sin textos duplicados entre temas y con snippets por nube

  Escenario: Contenido único para las 30 unidades de Nivel 2 Ingeniería (F6-03)
    Dado que cargo las 30 unidades de Nivel 2 (Módulos 07 a 12)
    Cuando verifico cobertura técnica Vigilio (set -euo pipefail, OIDC, non-root, probes, state locking)
    Entonces existen las 30 unidades sin textos duplicados y con prácticas DevSecOps reales
