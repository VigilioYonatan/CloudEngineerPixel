import { useState } from 'preact/hooks';
import { currentSimMode, notify, provider } from '../../../lib/state';
import {
  DEFAULT_CIDR_INPUT,
  DEFAULT_REPLICA_CAPACITY,
  DEFAULT_RPS,
  DEFAULT_SLO_AVAILABILITY,
  DEFAULT_SLO_WINDOW_DAYS,
} from '../constants/simulator.constants';
import { runArchitectureDecisionEngine } from '../engines/architectureDecisionEngine';
import { runAutoscalingEngine } from '../engines/autoscalingEngine';
import { runCidrEngine } from '../engines/cidrEngine';
import { runIamEngine } from '../engines/iamEngine';
import {
  ROUTING_PRESETS,
  runRoutingEngine,
  type RoutingEngineInput,
  type RoutingPresetId,
} from '../engines/routingEngine';
import { runSloEngine } from '../engines/sloEngine';
import { runTerraformPlanEngine, type TerraformScenarioId } from '../engines/terraformPlanEngine';
import type {
  ArchitecturePriority,
  IamAction,
  IamScope,
  WorkloadKind,
} from '../types/simulator.types';

export function useSimulatorsState() {
  const mode = currentSimMode.value;
  const cloud = provider.value;
  const [cidr, setCidr] = useState(DEFAULT_CIDR_INPUT);
  const [action, setAction] = useState<IamAction>('read');
  const [scope, setScope] = useState<IamScope>('single');
  const [guardrailDeny, setGuardrailDeny] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaPresent, setMfaPresent] = useState(true);
  const [regionMatched, setRegionMatched] = useState(true);
  const [rps, setRps] = useState(DEFAULT_RPS);
  const [capacity, setCapacity] = useState(DEFAULT_REPLICA_CAPACITY);
  const [availability, setAvailability] = useState(DEFAULT_SLO_AVAILABILITY);
  const [days, setDays] = useState(DEFAULT_SLO_WINDOW_DAYS);
  const [runs, setRuns] = useState(0);
  const [workload, setWorkload] = useState<WorkloadKind>('web');
  const [priority, setPriority] = useState<ArchitecturePriority>('simple');
  const [routingInput, setRoutingInput] = useState<RoutingEngineInput>({
    preset: 'healthy-three-tier',
    ...ROUTING_PRESETS['healthy-three-tier'].config,
  });
  const [tfScenario, setTfScenario] = useState<TerraformScenarioId>('destroy-recreate-db');

  const cidrRes = runCidrEngine(cidr, cloud);
  const iamRes = runIamEngine({
    cloudId: cloud,
    action,
    scope,
    guardrailDeny,
    mfaRequired,
    mfaPresent,
    regionMatched,
  });
  const scaleRes = runAutoscalingEngine(rps, capacity);
  const sloRes = runSloEngine(availability, days);
  const archRes = runArchitectureDecisionEngine(cloud, workload, priority);
  const routingRes = runRoutingEngine(routingInput);
  const tfRes = runTerraformPlanEngine(tfScenario);

  const activeReport =
    mode === 'cidr'
      ? cidrRes
      : mode === 'iam'
        ? iamRes
        : mode === 'scale'
          ? scaleRes
          : mode === 'slo'
            ? sloRes
            : mode === 'architecture'
              ? archRes
              : mode === 'routing'
                ? routingRes
                : tfRes;

  const activeSteps =
    mode === 'cidr'
      ? cidrRes?.steps
      : mode === 'iam'
        ? iamRes.steps
        : mode === 'scale'
          ? scaleRes.steps
          : mode === 'slo'
            ? sloRes.steps
            : archRes.steps;

  const resetAll = () => {
    setCidr(DEFAULT_CIDR_INPUT);
    setAction('read');
    setScope('single');
    setGuardrailDeny(false);
    setMfaRequired(false);
    setMfaPresent(true);
    setRegionMatched(true);
    setRps(DEFAULT_RPS);
    setCapacity(DEFAULT_REPLICA_CAPACITY);
    setAvailability(DEFAULT_SLO_AVAILABILITY);
    setDays(DEFAULT_SLO_WINDOW_DAYS);
    setWorkload('web');
    setPriority('simple');
    setRoutingInput({
      preset: 'healthy-three-tier',
      ...ROUTING_PRESETS['healthy-three-tier'].config,
    });
    setTfScenario('destroy-recreate-db');
    notify('Parámetros del simulador reiniciados');
  };

  return {
    mode,
    cloud,
    cidr,
    setCidr,
    action,
    setAction,
    scope,
    setScope,
    guardrailDeny,
    setGuardrailDeny,
    mfaRequired,
    setMfaRequired,
    mfaPresent,
    setMfaPresent,
    regionMatched,
    setRegionMatched,
    rps,
    setRps,
    capacity,
    setCapacity,
    availability,
    setAvailability,
    days,
    setDays,
    runs,
    setRuns,
    workload,
    setWorkload,
    priority,
    setPriority,
    routingInput,
    setRoutingInput,
    selectRoutingPreset: (preset: RoutingPresetId) =>
      setRoutingInput({ preset, ...ROUTING_PRESETS[preset].config }),
    tfScenario,
    setTfScenario,
    cidrRes,
    iamRes,
    scaleRes,
    sloRes,
    archRes,
    routingRes,
    tfRes,
    activeReport,
    activeSteps,
    resetAll,
  };
}
