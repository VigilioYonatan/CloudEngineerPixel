import { AlertTriangle, CheckCircle2, Flame, ShieldAlert, Terminal } from 'lucide-preact';
import { lazy, Suspense } from 'preact/compat';
import {
  ROUTING_PRESETS,
  type RoutingEngineInput,
  type RoutingEngineResult,
  type RoutingPresetId,
} from '../engines/routingEngine';
import type { TerraformPlanAnalysis, TerraformScenarioId } from '../engines/terraformPlanEngine';

const Routing3DCanvas = lazy(() => import('./Routing3DCanvas'));

type RoutingViewProps = {
  input: RoutingEngineInput;
  result: RoutingEngineResult;
  onSelectPreset: (preset: RoutingPresetId) => void;
  onUpdateInput: (patch: Partial<RoutingEngineInput>) => void;
};

export function RoutingLabView({ input, result, onSelectPreset, onUpdateInput }: RoutingViewProps) {
  return (
    <div class="sim-lab-grid">
      <div class="sim-controller">
        <div class="card-heading">
          <Terminal size={19} />
          <h3>Routing & Firewall Lab</h3>
        </div>
        <label>
          Escenario de tráfico
          <select
            value={input.preset}
            onChange={(e) =>
              onSelectPreset((e.currentTarget as HTMLSelectElement).value as RoutingPresetId)
            }
          >
            {Object.entries(ROUTING_PRESETS).map(([id, item]) => (
              <option key={id} value={id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label class="sim-check">
          <input
            type="checkbox"
            checked={input.sgAllowsPort}
            onChange={(e) =>
              onUpdateInput({ sgAllowsPort: (e.currentTarget as HTMLInputElement).checked })
            }
          />
          Security Group / NSG autoriza tcp/5432
        </label>
        <label class="sim-check">
          <input
            type="checkbox"
            checked={input.naclReturnAllowsEphemeral}
            onChange={(e) =>
              onUpdateInput({
                naclReturnAllowsEphemeral: (e.currentTarget as HTMLInputElement).checked,
              })
            }
          />
          NACL stateless permite retorno efímero (1024-65535)
        </label>
        <label class="sim-check">
          <input
            type="checkbox"
            checked={input.privateEndpointEnabled}
            onChange={(e) =>
              onUpdateInput({
                privateEndpointEnabled: (e.currentTarget as HTMLInputElement).checked,
              })
            }
          />
          Private Endpoint habilitado hacia DB aislada
        </label>
      </div>

      <div class="sim-result">
        <span class="eyebrow">
          <span class="eyebrow-square" /> SALTO A SALTO · THREE.JS 3D
        </span>
        <div class={`result-banner ${result.allowed ? 'good' : 'bad'}`}>
          {result.allowed ? <CheckCircle2 size={22} /> : <ShieldAlert size={22} />} {result.summary}
        </div>
        <Suspense fallback={<p role="status">Cargando escena 3D...</p>}>
          <Routing3DCanvas result={result} />
        </Suspense>
        <ul class="sim-steps-list">
          {result.hops.map((hop, idx) => (
            <li key={hop.id} class={`sim-hop-${hop.status}`}>
              <strong>
                Salto {idx + 1} · {hop.label}:
              </strong>{' '}
              {hop.detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type TerraformViewProps = {
  scenario: TerraformScenarioId;
  analysis: TerraformPlanAnalysis;
  onChangeScenario: (id: TerraformScenarioId) => void;
};

export function TerraformPlanLabView({ scenario, analysis, onChangeScenario }: TerraformViewProps) {
  return (
    <div class="sim-lab-grid">
      <div class="sim-controller">
        <div class="card-heading">
          <Terminal size={19} />
          <h3>Terraform Plan & Drift Inspector</h3>
        </div>
        <label>
          Escenario de plan / estado
          <select
            value={scenario}
            onChange={(e) =>
              onChangeScenario((e.currentTarget as HTMLSelectElement).value as TerraformScenarioId)
            }
          >
            <option value="create-stateless">Create recurso stateless (+2)</option>
            <option value="update-in-place-tags">Update in-place de etiquetas (~3)</option>
            <option value="destroy-recreate-db">ForceNew destructivo en BD (-/+)</option>
            <option value="out-of-band-drift">Drift manual fuera de Git (exitcode 2)</option>
            <option value="state-lock-conflict">Conflicto de State Lock concurrente</option>
          </select>
        </label>
        <p class="sr-hint">
          Entrenador determinista de lectura crítica de planes IaC sin credenciales ni ejecución
          real.
        </p>
      </div>

      <div class="sim-result">
        <span class="eyebrow">
          <span class="eyebrow-square" /> BLAST RADIUS: {analysis.blastRadius.toUpperCase()}
        </span>
        <div class={`result-banner ${analysis.dataLossRisk ? 'bad' : 'good'}`}>
          {analysis.dataLossRisk ? <Flame size={22} /> : <AlertTriangle size={22} />}{' '}
          {analysis.title}
        </div>
        <pre class="sim-plan-box">{analysis.planSummary}</pre>
        <p>
          <strong>Acción recomendada:</strong> {analysis.recommendedAction}
        </p>
        <ul class="sim-steps-list">
          {analysis.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
