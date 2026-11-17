import { CheckCircle2, ShieldAlert, Terminal } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { runK8sLabEngine } from '../engines/k8sLabEngine';
import { runLoadBalancingEngine } from '../engines/loadBalancingEngine';
import type { SimulatorMode } from '../types/simulator.types';
import { FinopsDrMessagingLabs } from './FinopsDrMessagingLabs';

export function ExtendedSimulatorLabs({ mode }: { mode: SimulatorMode }) {
  const [desiredPods, setDesiredPods] = useState(4);
  const [peakRam, setPeakRam] = useState(512);
  const [livenessOk, setLivenessOk] = useState(true);
  const [healthyNodes, setHealthyNodes] = useState(4);
  const [poolSize, setPoolSize] = useState(15);
  const [backpressure, setBackpressure] = useState(false);

  if (mode === 'k8s') {
    const res = runK8sLabEngine({
      desiredReplicas: desiredPods,
      nodeCpuCapacity: 4,
      nodeRamMbCapacity: 4096,
      podCpuRequest: 0.5,
      podRamRequestMb: 512,
      podRamLimitMb: 768,
      actualPeakRamMb: peakRam,
      readinessHealthy: true,
      livenessHealthy: livenessOk,
      pdbMinAvailable: 2,
    });
    return (
      <div class="sim-lab-grid">
        <div class="sim-controller">
          <div class="card-heading">
            <Terminal size={19} />
            <h3>Kubernetes Scheduler & Failure Lab</h3>
          </div>
          <label>
            Réplicas deseadas: <strong>{desiredPods}</strong>
            <input
              type="range"
              min={1}
              max={12}
              value={desiredPods}
              onInput={(e) => setDesiredPods(Number((e.currentTarget as HTMLInputElement).value))}
            />
          </label>
          <label>
            Consumo pico RAM (limit 768 MiB): <strong>{peakRam} MiB</strong>
            <input
              type="range"
              min={256}
              max={1024}
              step={64}
              value={peakRam}
              onInput={(e) => setPeakRam(Number((e.currentTarget as HTMLInputElement).value))}
            />
          </label>
          <label class="sim-check">
            <input
              type="checkbox"
              checked={livenessOk}
              onChange={(e) => setLivenessOk((e.currentTarget as HTMLInputElement).checked)}
            />
            livenessProbe saludable
          </label>
        </div>
        <div class="sim-result">
          <span class="eyebrow">
            <span class="eyebrow-square" /> ESTADO POD: {res.state}
          </span>
          <div class={`result-banner ${res.state === 'Running' ? 'good' : 'bad'}`}>
            {res.state === 'Running' ? <CheckCircle2 size={22} /> : <ShieldAlert size={22} />}{' '}
            {res.summary}
          </div>
          <ul class="sim-steps-list">
            {res.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (mode === 'load-balancing') {
    const res = runLoadBalancingEngine({
      incomingRps: 900,
      healthyInstances: healthyNodes,
      degradedInstances: 1,
      capacityPerInstance: 250,
      poolSizePerInstance: poolSize,
      dbMaxConnections: 60,
      backpressureEnabled: backpressure,
    });
    return (
      <div class="sim-lab-grid">
        <div class="sim-controller">
          <div class="card-heading">
            <Terminal size={19} />
            <h3>Load Balancing & Backpressure</h3>
          </div>
          <label>
            Instancias sanas: <strong>{healthyNodes}</strong>
            <input
              type="range"
              min={1}
              max={10}
              value={healthyNodes}
              onInput={(e) => setHealthyNodes(Number((e.currentTarget as HTMLInputElement).value))}
            />
          </label>
          <label>
            Pool por instancia: <strong>{poolSize} conns</strong>
            <input
              type="range"
              min={5}
              max={30}
              value={poolSize}
              onInput={(e) => setPoolSize(Number((e.currentTarget as HTMLInputElement).value))}
            />
          </label>
          <label class="sim-check">
            <input
              type="checkbox"
              checked={backpressure}
              onChange={(e) => setBackpressure((e.currentTarget as HTMLInputElement).checked)}
            />
            Habilitar PgBouncer / Backpressure (S16)
          </label>
        </div>
        <div class="sim-result">
          <span class="eyebrow">
            <span class="eyebrow-square" /> LATENCIA ~{res.estimatedLatencyMs} MS
          </span>
          <div class={`result-banner ${!res.saturated ? 'good' : 'bad'}`}>
            {!res.saturated ? <CheckCircle2 size={22} /> : <ShieldAlert size={22} />} {res.summary}
          </div>
          <ul class="sim-steps-list">
            {res.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return <FinopsDrMessagingLabs mode={mode} />;
}
