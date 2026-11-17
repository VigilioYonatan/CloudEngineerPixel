import {
  Activity,
  FlaskConical,
  Gauge,
  Layers,
  Network,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-preact';
import { useState } from 'preact/hooks';
import { AccessibleTabs } from '../../../components/ui/AccessibleTabs';
import { currentSimMode, navigate, notify, progress, provider } from '../../../lib/state';
import { SimulatorControls } from '../components/SimulatorControls';
import { SimulatorResults } from '../components/SimulatorResults';
import {
  DEFAULT_CIDR_INPUT,
  DEFAULT_REPLICA_CAPACITY,
  DEFAULT_RPS,
  DEFAULT_SLO_AVAILABILITY,
  DEFAULT_SLO_WINDOW_DAYS,
} from '../constants/simulator.constants';
import {
  calculateCidrSubnet,
  calculateReplicaPlan,
  calculateSloBudget,
  evaluateEducationalIam,
  recommendArchitectureService,
} from '../libs/simulatorCalculations';
import type {
  ArchitecturePriority,
  IamAction,
  IamScope,
  SimulatorMode,
  WorkloadKind,
} from '../types/simulator.types';

type SimulatorTab = {
  id: SimulatorMode;
  title: string;
  icon: LucideIcon;
};

const SIMULATOR_TABS: readonly SimulatorTab[] = [
  { id: 'cidr', title: 'Redes / CIDR', icon: Network },
  { id: 'iam', title: 'Decisiones IAM', icon: ShieldCheck },
  { id: 'scale', title: 'Autoescalado', icon: Gauge },
  { id: 'slo', title: 'SLO & Fiabilidad', icon: Activity },
  { id: 'architecture', title: 'Architecture Studio', icon: Layers },
];

export function SimulatorsPage() {
  const mode = currentSimMode.value;
  const [cidr, setCidr] = useState(DEFAULT_CIDR_INPUT);
  const [action, setAction] = useState<IamAction>('read');
  const [scope, setScope] = useState<IamScope>('single');
  const [rps, setRps] = useState(DEFAULT_RPS);
  const [capacity, setCapacity] = useState(DEFAULT_REPLICA_CAPACITY);
  const [availability, setAvailability] = useState(DEFAULT_SLO_AVAILABILITY);
  const [days, setDays] = useState(DEFAULT_SLO_WINDOW_DAYS);
  const [runs, setRuns] = useState(0);
  const [workload, setWorkload] = useState<WorkloadKind>('web');
  const [priority, setPriority] = useState<ArchitecturePriority>('simple');

  const active_cloud = provider.value;
  const cidr_result = calculateCidrSubnet(cidr, active_cloud);
  const iam_evaluation = evaluateEducationalIam(action, scope);
  const replicas = calculateReplicaPlan(rps, capacity);
  const slo_budget = calculateSloBudget(availability, days);
  const architecture = recommendArchitectureService(workload, priority);

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
            Entornos didácticos que funcionan en tu navegador. Sin credenciales y sin cargos de
            infraestructura.
          </p>
        </div>
        <div class="intro-stat">
          <span>LABORATORIOS</span>
          <strong>05</strong>
          <small>motores interactivos</small>
        </div>
      </section>

      <AccessibleTabs
        ariaLabel="Motores de simulación cloud"
        className="sim-tabs"
        activeClassName="sim-active"
        activeId={mode}
        onSelect={(simId) => navigate('simulator', { simId })}
        items={SIMULATOR_TABS.map((tab) => {
          const TabIcon = tab.icon;
          return {
            id: tab.id,
            label: tab.title,
            icon: <TabIcon size={20} />,
          };
        })}
      />

      <div class="sim-body">
        <SimulatorControls
          mode={mode}
          cidr={cidr}
          onChangeCidr={setCidr}
          action={action}
          onChangeAction={setAction}
          scope={scope}
          onChangeScope={setScope}
          rps={rps}
          onChangeRps={setRps}
          capacity={capacity}
          onChangeCapacity={setCapacity}
          workload={workload}
          onChangeWorkload={setWorkload}
          priority={priority}
          onChangePriority={setPriority}
          availability={availability}
          onChangeAvailability={setAvailability}
          days={days}
          onChangeDays={setDays}
          onRunSimulation={() => {
            setRuns((prev) => prev + 1);
            progress.value = { ...progress.value, simRuns: progress.value.simRuns + 1 };
            notify('Simulación actualizada');
          }}
        />
        <SimulatorResults
          mode={mode}
          cloudId={active_cloud}
          cidrResult={cidr_result}
          iamEvaluation={iam_evaluation}
          replicas={replicas}
          architecture={architecture}
          workload={workload}
          priority={priority}
          availability={availability}
          days={days}
          sloBudget={slo_budget}
          runs={runs}
        />
      </div>
    </main>
  );
}
