import { CheckCircle2, ShieldAlert, Terminal } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { runDrEngine, type DrStrategyId } from '../engines/drEngine';
import { runFinopsEngine, type FinopsInput } from '../engines/finopsEngine';
import { runMessagingEngine } from '../engines/messagingEngine';
import type { SimulatorMode } from '../types/simulator.types';

export function FinopsDrMessagingLabs({ mode }: { mode: SimulatorMode }) {
  const [pricingModel, setPricingModel] =
    useState<FinopsInput['pricingModel']>('arm64-graviton-spot');
  const [vpcEndpoint, setVpcEndpoint] = useState(true);
  const [drStrategy, setDrStrategy] = useState<DrStrategyId>('pilot-light');
  const [targetRto, setTargetRto] = useState(30);
  const [targetRpo, setTargetRpo] = useState(15);
  const [idempotency, setIdempotency] = useState(true);
  const [outbox, setOutbox] = useState(true);
  const [dlq, setDlq] = useState(true);

  if (mode === 'finops') {
    const res = runFinopsEngine({
      baselineMonthlyComputeUsd: 1200,
      pricingModel,
      natTrafficGb: 2000,
      useVpcGatewayEndpoint: vpcEndpoint,
      crossRegionEgressGb: 500,
      highCardinalityMetrics: false,
    });
    return (
      <div class="sim-lab-grid">
        <div class="sim-controller">
          <div class="card-heading">
            <Terminal size={19} />
            <h3>FinOps & Cloud Cost Lab</h3>
          </div>
          <label>
            Modelo de cómputo
            <select
              value={pricingModel}
              onChange={(e) =>
                setPricingModel(
                  (e.currentTarget as HTMLSelectElement).value as FinopsInput['pricingModel'],
                )
              }
            >
              <option value="on-demand">On-Demand (100%)</option>
              <option value="reserved-1yr">Reserved / Savings Plan (1 año)</option>
              <option value="arm64-graviton-spot">ARM64 + Spot consolidado</option>
            </select>
          </label>
          <label class="sim-check">
            <input
              type="checkbox"
              checked={vpcEndpoint}
              onChange={(e) => setVpcEndpoint((e.currentTarget as HTMLInputElement).checked)}
            />
            Enrutar tráfico S3/Storage por VPC Gateway Endpoint
          </label>
        </div>
        <div class="sim-result">
          <span class="eyebrow">
            <span class="eyebrow-square" /> AHORRO ESTIMADO {res.savingsPct}%
          </span>
          <div class="result-big">
            ${res.optimizedTotalUsd}/mes <small>vs ${res.baselineTotalUsd} base</small>
          </div>
          <p class="sr-hint">{res.disclaimer}</p>
          <ul class="sim-steps-list">
            {res.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (mode === 'dr') {
    const res = runDrEngine({
      strategy: drStrategy,
      targetRtoMinutes: targetRto,
      targetRpoMinutes: targetRpo,
    });
    return (
      <div class="sim-lab-grid">
        <div class="sim-controller">
          <div class="card-heading">
            <Terminal size={19} />
            <h3>Disaster Recovery RTO / RPO Studio</h3>
          </div>
          <label>
            Estrategia DR
            <select
              value={drStrategy}
              onChange={(e) =>
                setDrStrategy((e.currentTarget as HTMLSelectElement).value as DrStrategyId)
              }
            >
              <option value="backup-restore">Backup & Restore</option>
              <option value="pilot-light">Pilot Light</option>
              <option value="warm-standby">Warm Standby</option>
              <option value="active-active">Multi-Site Active/Active</option>
            </select>
          </label>
          <label>
            RTO objetivo (min): <strong>{targetRto} min</strong>
            <input
              type="range"
              min={1}
              max={240}
              value={targetRto}
              onInput={(e) => setTargetRto(Number((e.currentTarget as HTMLInputElement).value))}
            />
          </label>
          <label>
            RPO objetivo (min): <strong>{targetRpo} min</strong>
            <input
              type="range"
              min={0}
              max={60}
              value={targetRpo}
              onInput={(e) => setTargetRpo(Number((e.currentTarget as HTMLInputElement).value))}
            />
          </label>
        </div>
        <div class="sim-result">
          <span class="eyebrow">
            <span class="eyebrow-square" /> COSTO RELATIVO: {res.relativeCost}
          </span>
          <div class={`result-banner ${res.meetsTargets ? 'good' : 'bad'}`}>
            {res.meetsTargets ? <CheckCircle2 size={22} /> : <ShieldAlert size={22} />}{' '}
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

  const msg = runMessagingEngine({
    eventsPublished: 1000,
    transientFailurePct: 5,
    poisonMessages: 3,
    idempotencyEnabled: idempotency,
    outboxEnabled: outbox,
    dlqEnabled: dlq,
  });
  return (
    <div class="sim-lab-grid">
      <div class="sim-controller">
        <div class="card-heading">
          <Terminal size={19} />
          <h3>Messaging, Retries & Idempotency</h3>
        </div>
        <label class="sim-check">
          <input
            type="checkbox"
            checked={idempotency}
            onChange={(e) => setIdempotency((e.currentTarget as HTMLInputElement).checked)}
          />{' '}
          Clave idempotency_key activa
        </label>
        <label class="sim-check">
          <input
            type="checkbox"
            checked={outbox}
            onChange={(e) => setOutbox((e.currentTarget as HTMLInputElement).checked)}
          />{' '}
          Transactional Outbox
        </label>
        <label class="sim-check">
          <input
            type="checkbox"
            checked={dlq}
            onChange={(e) => setDlq((e.currentTarget as HTMLInputElement).checked)}
          />{' '}
          Dead Letter Queue (DLQ) habilitada
        </label>
      </div>
      <div class="sim-result">
        <span class="eyebrow">
          <span class="eyebrow-square" /> DUPLICADOS: {msg.duplicateCharges} · DLQ: {msg.dlqCount}
        </span>
        <div
          class={`result-banner ${msg.duplicateCharges === 0 && msg.lostEvents === 0 ? 'good' : 'bad'}`}
        >
          {msg.duplicateCharges === 0 && msg.lostEvents === 0 ? (
            <CheckCircle2 size={22} />
          ) : (
            <ShieldAlert size={22} />
          )}{' '}
          {msg.summary}
        </div>
        <ul class="sim-steps-list">
          {msg.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
