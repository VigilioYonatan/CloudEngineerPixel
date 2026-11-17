export type LoadBalancingInput = {
  incomingRps: number;
  healthyInstances: number;
  degradedInstances: number;
  capacityPerInstance: number;
  poolSizePerInstance: number;
  dbMaxConnections: number;
  backpressureEnabled: boolean;
};

export type LoadBalancingResult = {
  modelVersion: string;
  saturated: boolean;
  effectiveCapacityRps: number;
  totalDbConnections: number;
  estimatedLatencyMs: number;
  summary: string;
  steps: string[];
};

export function runLoadBalancingEngine(input: LoadBalancingInput): LoadBalancingResult {
  const totalInstances = input.healthyInstances + input.degradedInstances;
  const effectiveCapacityRps = input.healthyInstances * input.capacityPerInstance;
  const rawConnections = totalInstances * input.poolSizePerInstance;
  const totalDbConnections = input.backpressureEnabled
    ? Math.min(rawConnections, Math.floor(input.dbMaxConnections * 0.85))
    : rawConnections;
  const dbExhausted = totalDbConnections >= input.dbMaxConnections;
  const overload = input.incomingRps > effectiveCapacityRps;
  const saturated = dbExhausted || overload;

  const estimatedLatencyMs = dbExhausted
    ? 3400
    : overload
      ? 950
      : Math.round(35 + (input.incomingRps / Math.max(1, effectiveCapacityRps)) * 45);

  const summary = dbExhausted
    ? `Colapso aguas abajo (S16): ${totalDbConnections}/${input.dbMaxConnections} conexiones agotan la base de datos.`
    : overload
      ? `Saturación de cómputo: ${input.incomingRps} RPS superan ${effectiveCapacityRps} RPS sanos.`
      : `Tráfico absorbido (${input.incomingRps}/${effectiveCapacityRps} RPS) con ${totalDbConnections}/${input.dbMaxConnections} conexiones BD.`;

  return {
    modelVersion: 'lb-v1.0',
    saturated,
    effectiveCapacityRps,
    totalDbConnections,
    estimatedLatencyMs,
    summary,
    steps: [
      `1. Health checks retiran ${input.degradedInstances} instancia(s) degradada(s); quedan ${input.healthyInstances} sanas (${effectiveCapacityRps} RPS).`,
      `2. Pool total hacia BD: ${totalInstances} × ${input.poolSizePerInstance} = ${rawConnections} conexiones (backpressure=${input.backpressureEnabled ? 'ACTIVO' : 'OFF'}).`,
      `3. Latencia estimada: ${estimatedLatencyMs} ms (${dbExhausted ? 'cola de conexiones saturada' : 'saludable'}).`,
    ],
  };
}
