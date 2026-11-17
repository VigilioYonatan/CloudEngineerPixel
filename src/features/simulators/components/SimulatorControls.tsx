import { Play, Terminal } from 'lucide-preact';
import {
  SCALE_CAPACITY_RANGE,
  SCALE_RPS_RANGE,
  SLO_AVAILABILITY_RANGE,
  SLO_WINDOW_DAYS_OPTIONS,
} from '../constants/simulator.constants';
import type {
  ArchitecturePriority,
  IamAction,
  IamScope,
  SimulatorMode,
  WorkloadKind,
} from '../types/simulator.types';
import { IamPolicyControls } from './IamPolicyControls';

type SimulatorControlsProps = {
  mode: SimulatorMode;
  cidr: string;
  onChangeCidr: (value: string) => void;
  action: IamAction;
  onChangeAction: (value: IamAction) => void;
  scope: IamScope;
  onChangeScope: (value: IamScope) => void;
  guardrailDeny?: boolean;
  onChangeGuardrailDeny?: (value: boolean) => void;
  mfaRequired?: boolean;
  onChangeMfaRequired?: (value: boolean) => void;
  mfaPresent?: boolean;
  onChangeMfaPresent?: (value: boolean) => void;
  regionMatched?: boolean;
  onChangeRegionMatched?: (value: boolean) => void;
  rps: number;
  onChangeRps: (value: number) => void;
  capacity: number;
  onChangeCapacity: (value: number) => void;
  workload: WorkloadKind;
  onChangeWorkload: (value: WorkloadKind) => void;
  priority: ArchitecturePriority;
  onChangePriority: (value: ArchitecturePriority) => void;
  availability: number;
  onChangeAvailability: (value: number) => void;
  days: number;
  onChangeDays: (value: number) => void;
  onRunSimulation: () => void;
};

export function SimulatorControls(props: SimulatorControlsProps) {
  const { mode } = props;

  return (
    <div class="sim-controller">
      <div class="card-heading">
        <Terminal size={19} />
        <h3>Configuración del experimento</h3>
      </div>

      {mode === 'cidr' ? (
        <>
          <label>
            Red con prefijo CIDR
            <input
              value={props.cidr}
              onInput={(event) =>
                props.onChangeCidr((event.currentTarget as HTMLInputElement).value)
              }
              placeholder="10.0.0.0/24"
            />
          </label>
          <p>Prueba /16, /24, /28 y observa cómo cambia la capacidad del segmento.</p>
        </>
      ) : mode === 'iam' ? (
        <IamPolicyControls
          action={props.action}
          onChangeAction={props.onChangeAction}
          scope={props.scope}
          onChangeScope={props.onChangeScope}
          guardrailDeny={props.guardrailDeny}
          onChangeGuardrailDeny={props.onChangeGuardrailDeny}
          mfaRequired={props.mfaRequired}
          onChangeMfaRequired={props.onChangeMfaRequired}
          mfaPresent={props.mfaPresent}
          onChangeMfaPresent={props.onChangeMfaPresent}
          regionMatched={props.regionMatched}
          onChangeRegionMatched={props.onChangeRegionMatched}
        />
      ) : mode === 'scale' ? (
        <>
          <label>
            Solicitudes por segundo <strong>{props.rps} req/s</strong>
            <input
              type="range"
              min={SCALE_RPS_RANGE.min}
              max={SCALE_RPS_RANGE.max}
              step={SCALE_RPS_RANGE.step}
              value={props.rps}
              onInput={(event) =>
                props.onChangeRps(Number((event.currentTarget as HTMLInputElement).value))
              }
            />
          </label>
          <label>
            Capacidad estimada por réplica <strong>{props.capacity} req/s</strong>
            <input
              type="range"
              min={SCALE_CAPACITY_RANGE.min}
              max={SCALE_CAPACITY_RANGE.max}
              step={SCALE_CAPACITY_RANGE.step}
              value={props.capacity}
              onInput={(event) =>
                props.onChangeCapacity(Number((event.currentTarget as HTMLInputElement).value))
              }
            />
          </label>
          <p>
            Modelo teórico sin latencia, colas ni límites de dependencias. En sistemas reales se
            requiere medir carga y margen.
          </p>
        </>
      ) : mode === 'architecture' ? (
        <>
          <label>
            Tipo de carga
            <select
              value={props.workload}
              onChange={(event) =>
                props.onChangeWorkload(
                  (event.currentTarget as HTMLSelectElement).value as WorkloadKind,
                )
              }
            >
              <option value="web">Sitio web / API</option>
              <option value="events">Eventos asíncronos</option>
              <option value="batch">Procesamiento por lotes</option>
            </select>
          </label>
          <label>
            Prioridad principal
            <select
              value={props.priority}
              onChange={(event) =>
                props.onChangePriority(
                  (event.currentTarget as HTMLSelectElement).value as ArchitecturePriority,
                )
              }
            >
              <option value="simple">Menor complejidad operativa</option>
              <option value="control">Control del runtime y sistema</option>
              <option value="scale">Escalado automático</option>
            </select>
          </label>
          <p>
            Este motor propone un punto de partida, no una arquitectura validada. Antes de decidir
            debes revisar identidad, presupuesto, requisitos de red, rendimiento y RTO/RPO.
          </p>
        </>
      ) : (
        <>
          <label>
            Objetivo de disponibilidad <strong>{props.availability}%</strong>
            <input
              type="range"
              min={SLO_AVAILABILITY_RANGE.min}
              max={SLO_AVAILABILITY_RANGE.max}
              step={SLO_AVAILABILITY_RANGE.step}
              value={props.availability}
              onInput={(event) =>
                props.onChangeAvailability(Number((event.currentTarget as HTMLInputElement).value))
              }
            />
          </label>
          <label>
            Ventana del objetivo
            <select
              value={props.days}
              onChange={(event) =>
                props.onChangeDays(Number((event.currentTarget as HTMLSelectElement).value))
              }
            >
              {SLO_WINDOW_DAYS_OPTIONS.map((window_days) => (
                <option key={window_days} value={window_days}>
                  {window_days} días
                </option>
              ))}
            </select>
          </label>
          <p>
            El presupuesto de error no equivale al downtime real observado ni garantiza fiabilidad.
          </p>
        </>
      )}

      <button class="btn btn-primary full-width" onClick={props.onRunSimulation}>
        <Play size={17} /> Ejecutar simulación
      </button>
    </div>
  );
}
