export type K8sPodState = 'Running' | 'Pending' | 'OOMKilled' | 'CrashLoopBackOff';

export type K8sLabInput = {
  desiredReplicas: number;
  nodeCpuCapacity: number;
  nodeRamMbCapacity: number;
  podCpuRequest: number;
  podRamRequestMb: number;
  podRamLimitMb: number;
  actualPeakRamMb: number;
  readinessHealthy: boolean;
  livenessHealthy: boolean;
  pdbMinAvailable: number;
};

export type K8sLabResult = {
  modelVersion: string;
  state: K8sPodState;
  schedulableReplicas: number;
  pdbSafeForDrain: boolean;
  summary: string;
  steps: string[];
};

export function runK8sLabEngine(input: K8sLabInput): K8sLabResult {
  const maxByCpu = Math.floor(input.nodeCpuCapacity / Math.max(0.1, input.podCpuRequest));
  const maxByRam = Math.floor(input.nodeRamMbCapacity / Math.max(64, input.podRamRequestMb));
  const schedulableReplicas = Math.max(0, Math.min(input.desiredReplicas, maxByCpu, maxByRam));

  let state: K8sPodState = 'Running';
  let summary = `${schedulableReplicas}/${input.desiredReplicas} réplicas Running y listas para tráfico.`;

  if (schedulableReplicas < input.desiredReplicas) {
    state = 'Pending';
    summary = `Falta capacidad en nodos (${schedulableReplicas}/${input.desiredReplicas} agendadas): pods en Pending.`;
  } else if (input.actualPeakRamMb > input.podRamLimitMb) {
    state = 'OOMKilled';
    summary = `Consumo pico (${input.actualPeakRamMb} MiB) supera memory limit (${input.podRamLimitMb} MiB): OOMKilled (Exit 137).`;
  } else if (!input.livenessHealthy || !input.readinessHealthy) {
    state = 'CrashLoopBackOff';
    summary = !input.livenessHealthy
      ? 'livenessProbe falla repetidamente: kubelet reinicia el contenedor (CrashLoopBackOff).'
      : 'readinessProbe falla: pod excluido de Endpoints (servicio degradado).';
  }

  const pdbSafeForDrain = schedulableReplicas - 1 >= input.pdbMinAvailable;

  return {
    modelVersion: 'k8s-v1.0',
    state,
    schedulableReplicas,
    pdbSafeForDrain,
    summary,
    steps: [
      `1. Capacidad de nodo: CPU admite ${maxByCpu} pods, RAM admite ${maxByRam} pods.`,
      `2. Memoria: request ${input.podRamRequestMb} MiB / limit ${input.podRamLimitMb} MiB vs pico ${input.actualPeakRamMb} MiB.`,
      `3. Probes: readiness=${input.readinessHealthy ? 'OK' : 'FAIL'}, liveness=${input.livenessHealthy ? 'OK' : 'FAIL'}.`,
      `4. PDB minAvailable=${input.pdbMinAvailable}: drenado de nodo ${pdbSafeForDrain ? 'seguro' : 'bloqueado por PDB'}.`,
    ],
  };
}
