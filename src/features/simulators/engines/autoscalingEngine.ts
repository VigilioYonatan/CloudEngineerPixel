export type AutoscalingEngineResult = {
  modelVersion: string;
  replicas: number;
  totalCapacity: number;
  utilizationPct: number;
  estimatedDbConnections: number;
  steps: string[];
};

export function runAutoscalingEngine(
  rps: number,
  capacityPerReplica: number,
  poolPerReplica = 10,
): AutoscalingEngineResult {
  const safeCap = Math.max(1, capacityPerReplica);
  const replicas = Math.max(1, Math.ceil(rps / safeCap));
  const totalCapacity = replicas * safeCap;
  const utilizationPct = Math.round((rps / totalCapacity) * 100);
  const estimatedDbConnections = replicas * poolPerReplica;

  return {
    modelVersion: 'autoscaling-v2.0',
    replicas,
    totalCapacity,
    utilizationPct,
    estimatedDbConnections,
    steps: [
      `1. Demanda entrante: ${rps} RPS / ${safeCap} RPS por réplica = ${replicas} réplica(s).`,
      `2. Capacidad total provisionada: ${totalCapacity} RPS (${utilizationPct}% de uso objetivo).`,
      `3. Impacto aguas abajo: ${replicas} × ${poolPerReplica} conexiones = ${estimatedDbConnections} conexiones máximas a BD.`,
    ],
  };
}
