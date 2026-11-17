import {
  Activity,
  Boxes,
  Copy,
  DollarSign,
  Download,
  FileCode2,
  FlaskConical,
  Gauge,
  HardDriveDownload,
  Layers,
  MailCheck,
  Network,
  Radar,
  RotateCcw,
  Route,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-preact';
import { AccessibleTabs } from '../../../components/ui/AccessibleTabs';
import { navigate, notify, progress } from '../../../lib/state';
import { ExtendedSimulatorLabs } from '../components/ExtendedSimulatorLabs';
import { ObservabilityLabView } from '../components/ObservabilityLabView';
import { RoutingLabView, TerraformPlanLabView } from '../components/RoutingAndTerraformView';
import { SimulatorControls } from '../components/SimulatorControls';
import { SimulatorModelCard } from '../components/SimulatorModelCard';
import { SimulatorResults } from '../components/SimulatorResults';
import { SIMULATOR_CATALOG_META } from '../constants/simulatorCatalogMeta';
import { useSimulatorsState } from '../hooks/useSimulatorsState';
import type { SimulatorMode } from '../types/simulator.types';

const SIMULATOR_TABS: readonly { id: SimulatorMode; title: string; icon: LucideIcon }[] = [
  { id: 'cidr', title: 'Redes / CIDR', icon: Network },
  { id: 'iam', title: 'Decisiones IAM', icon: ShieldCheck },
  { id: 'scale', title: 'Autoescalado', icon: Gauge },
  { id: 'slo', title: 'SLO & Fiabilidad', icon: Activity },
  { id: 'architecture', title: 'Architecture Studio', icon: Layers },
  { id: 'routing', title: 'Routing & Firewall', icon: Route },
  { id: 'terraform-plan', title: 'Terraform Plan & Drift', icon: FileCode2 },
  { id: 'k8s', title: 'K8s Scheduler', icon: Boxes },
  { id: 'load-balancing', title: 'Load Balancing', icon: Scale },
  { id: 'finops', title: 'FinOps Cost', icon: DollarSign },
  { id: 'dr', title: 'DR Studio', icon: HardDriveDownload },
  { id: 'messaging', title: 'Messaging & DLQ', icon: MailCheck },
  { id: 'observability', title: 'Observability & Burn-Rate', icon: Radar },
];

export function SimulatorsPage() {
  const s = useSimulatorsState();

  const copyResult = async () => {
    try {
      await navigator.clipboard?.writeText(JSON.stringify(s.activeReport, null, 2));
      notify('Resultado copiado al portapapeles');
    } catch {
      notify('No se pudo acceder al portapapeles');
    }
  };

  const downloadSimReport = () => {
    const blob = new Blob(
      [JSON.stringify({ provider: s.cloud, mode: s.mode, result: s.activeReport }, null, 2)],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simulador-${s.cloud}-${s.mode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main class="page-container">
      <div class="page-kicker">
        <FlaskConical size={16} /> CLOUD ENGINEERING LAB
      </div>
      <section class="page-intro">
        <div>
          <h1>
            Simula. Experimenta. <span>Comprende.</span>
          </h1>
          <p>
            Entornos didácticos deterministas que funcionan en tu navegador. Sin credenciales y sin
            cargos de infraestructura.
          </p>
        </div>
        <div class="intro-stat">
          <span>LABORATORIOS</span>
          <strong>13</strong>
          <small>motores interactivos</small>
        </div>
      </section>

      <AccessibleTabs
        ariaLabel="Motores de simulación cloud"
        className="sim-tabs"
        activeClassName="sim-active"
        activeId={s.mode}
        onSelect={(simId) => navigate('simulator', { simId })}
        items={SIMULATOR_TABS.map((tab) => {
          const TabIcon = tab.icon;
          return { id: tab.id, label: tab.title, icon: <TabIcon size={20} /> };
        })}
      />

      <div class="sim-actions-bar">
        <button type="button" class="btn btn-secondary btn-compact" onClick={s.resetAll}>
          <RotateCcw size={14} /> Reiniciar
        </button>
        <button
          type="button"
          class="btn btn-secondary btn-compact"
          onClick={() => void copyResult()}
        >
          <Copy size={14} /> Copiar resultado
        </button>
        <button type="button" class="btn btn-secondary btn-compact" onClick={downloadSimReport}>
          <Download size={14} /> Descargar reporte
        </button>
      </div>

      <SimulatorModelCard meta={SIMULATOR_CATALOG_META[s.mode]} />

      {s.mode === 'routing' ? (
        <RoutingLabView
          input={s.routingInput}
          result={s.routingRes}
          onSelectPreset={s.selectRoutingPreset}
          onUpdateInput={(patch) => s.setRoutingInput((prev) => ({ ...prev, ...patch }))}
        />
      ) : s.mode === 'terraform-plan' ? (
        <TerraformPlanLabView
          scenario={s.tfScenario}
          analysis={s.tfRes}
          onChangeScenario={s.setTfScenario}
        />
      ) : s.mode === 'observability' ? (
        <ObservabilityLabView />
      ) : ['k8s', 'load-balancing', 'finops', 'dr', 'messaging'].includes(s.mode) ? (
        <ExtendedSimulatorLabs mode={s.mode} />
      ) : (
        <div class="sim-body">
          <SimulatorControls
            mode={s.mode}
            cidr={s.cidr}
            onChangeCidr={s.setCidr}
            action={s.action}
            onChangeAction={s.setAction}
            scope={s.scope}
            onChangeScope={s.setScope}
            guardrailDeny={s.guardrailDeny}
            onChangeGuardrailDeny={s.setGuardrailDeny}
            mfaRequired={s.mfaRequired}
            onChangeMfaRequired={s.setMfaRequired}
            mfaPresent={s.mfaPresent}
            onChangeMfaPresent={s.setMfaPresent}
            regionMatched={s.regionMatched}
            onChangeRegionMatched={s.setRegionMatched}
            rps={s.rps}
            onChangeRps={s.setRps}
            capacity={s.capacity}
            onChangeCapacity={s.setCapacity}
            workload={s.workload}
            onChangeWorkload={s.setWorkload}
            priority={s.priority}
            onChangePriority={s.setPriority}
            availability={s.availability}
            onChangeAvailability={s.setAvailability}
            days={s.days}
            onChangeDays={s.setDays}
            onRunSimulation={() => {
              s.setRuns((prev) => prev + 1);
              progress.value = { ...progress.value, simRuns: progress.value.simRuns + 1 };
              notify('Simulación actualizada');
            }}
          />
          <SimulatorResults
            mode={s.mode}
            cloudId={s.cloud}
            cidrResult={s.cidrRes}
            iamEvaluation={s.iamRes}
            replicas={s.scaleRes.replicas}
            architecture={s.archRes.category}
            workload={s.workload}
            priority={s.priority}
            availability={s.availability}
            days={s.days}
            sloBudget={s.sloRes}
            runs={s.runs}
            steps={s.activeSteps}
            officialModelNote={s.mode === 'iam' ? s.iamRes.officialModelNote : undefined}
          />
        </div>
      )}
    </main>
  );
}
