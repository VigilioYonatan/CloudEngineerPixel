import { CheckCircle2, ShieldAlert, Terminal } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { runObservabilityEngine } from '../engines/observabilityEngine';

export function ObservabilityLabView() {
  const [sloTargetPct, setSloTargetPct] = useState(99.9);
  const [errorRate1hPct, setErrorRate1hPct] = useState(1.8);
  const [errorRate6hPct, setErrorRate6hPct] = useState(0.8);
  const [cpuPct, setCpuPct] = useState(88);
  const [traceparentValid, setTraceparentValid] = useState(true);

  const res = runObservabilityEngine({
    sloTargetPct,
    errorRate1hPct,
    errorRate6hPct,
    cpuPct,
    traceparentValid,
  });

  return (
    <div class="sim-lab-grid">
      <div class="sim-controller">
        <div class="card-heading">
          <Terminal size={19} />
          <h3>Observability & Burn-Rate Alert Lab</h3>
        </div>
        <label>
          Tasa error 1h: <strong>{errorRate1hPct.toFixed(1)}%</strong>
          <input
            type="range"
            min={0}
            max={5}
            step={0.1}
            value={errorRate1hPct}
            onInput={(e) => setErrorRate1hPct(Number((e.currentTarget as HTMLInputElement).value))}
          />
        </label>
        <label>
          Tasa error 6h: <strong>{errorRate6hPct.toFixed(1)}%</strong>
          <input
            type="range"
            min={0}
            max={3}
            step={0.1}
            value={errorRate6hPct}
            onInput={(e) => setErrorRate6hPct(Number((e.currentTarget as HTMLInputElement).value))}
          />
        </label>
        <label>
          Uso CPU nodo: <strong>{cpuPct}%</strong>
          <input
            type="range"
            min={10}
            max={100}
            value={cpuPct}
            onInput={(e) => setCpuPct(Number((e.currentTarget as HTMLInputElement).value))}
          />
        </label>
        <label>
          SLO objetivo: <strong>{sloTargetPct}%</strong>
          <select
            value={String(sloTargetPct)}
            onChange={(e) => setSloTargetPct(Number((e.currentTarget as HTMLSelectElement).value))}
          >
            <option value="99.9">99.9%</option>
            <option value="99.95">99.95%</option>
          </select>
        </label>
        <label class="sim-check">
          <input
            type="checkbox"
            checked={traceparentValid}
            onChange={(e) => setTraceparentValid((e.currentTarget as HTMLInputElement).checked)}
          />
          Header W3C traceparent propagado
        </label>
      </div>
      <div class="sim-result">
        <span class="eyebrow">
          <span class="eyebrow-square" /> SEVERIDAD: {res.severityLabel.toUpperCase()}
        </span>
        <div class={`result-banner ${res.pageAlert || res.ticketAlert ? 'bad' : 'good'}`}>
          {res.pageAlert || res.ticketAlert ? (
            <ShieldAlert size={22} />
          ) : (
            <CheckCircle2 size={22} />
          )}{' '}
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
