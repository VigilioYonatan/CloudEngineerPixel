import {
  Activity,
  CheckCircle2,
  ExternalLink,
  Gauge,
  Layers,
  Network,
  Server,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-preact';
import { services, type Provider } from '../../../data/course';
import { getProviderMeta } from '../../../domain/providers';
import { Tag } from '../../../shared/ui/Tag';
import { MAX_RENDERED_REPLICA_BARS } from '../constants/simulator.constants';
import type {
  ArchitectureCategory,
  ArchitecturePriority,
  CidrCalculation,
  EducationalIamEvaluation,
  SimulatorMode,
  SloBudgetCalculation,
  WorkloadKind,
} from '../types/simulator.types';

type SimulatorResultsProps = {
  mode: SimulatorMode;
  cloudId: Provider;
  cidrResult: CidrCalculation | null;
  iamEvaluation: EducationalIamEvaluation;
  replicas: number;
  architecture: ArchitectureCategory;
  workload: WorkloadKind;
  priority: ArchitecturePriority;
  availability: number;
  days: number;
  sloBudget: SloBudgetCalculation;
  runs: number;
};

export function SimulatorResults(props: SimulatorResultsProps) {
  const { mode, cloudId } = props;
  const cloud_meta = getProviderMeta(cloudId);

  return (
    <div class="sim-result">
      <span class="eyebrow">
        <span class="eyebrow-square" /> RESULTADO · {cloud_meta.short}
      </span>

      {mode === 'cidr' ? (
        <>
          <div class="result-heading">
            <Network size={28} />
            <h2>Calculadora de subredes</h2>
          </div>
          {props.cidrResult ? (
            <>
              <div class="result-big">
                {props.cidrResult.count.toLocaleString('es-ES')}
                <small>direcciones totales</small>
              </div>
              <div class="result-stats">
                <div>
                  <small>Dirección de red</small>
                  <strong>{props.cidrResult.net}</strong>
                </div>
                <div>
                  <small>Última dirección</small>
                  <strong>{props.cidrResult.broadcast}</strong>
                </div>
                <div>
                  <small>Prefijo</small>
                  <strong>/{props.cidrResult.prefix}</strong>
                </div>
                <div>
                  <small>Hosts teóricos IPv4*</small>
                  <strong>{props.cidrResult.host}</strong>
                </div>
              </div>
              <p class="result-note">
                * {cloud_meta.cidrReservation.notes} Hosts usables estimados en {cloud_meta.short}:{' '}
                <strong>{props.cidrResult.cloudUsableHosts}</strong>.
              </p>
            </>
          ) : (
            <div class="empty-state">
              Formato inválido. Utiliza IPv4/prefijo, por ejemplo 10.0.0.0/24.
            </div>
          )}
        </>
      ) : mode === 'iam' ? (
        <>
          <div class="result-heading">
            <ShieldCheck size={28} />
            <h2>Evaluador didáctico IAM</h2>
          </div>
          <div class={`result-banner ${props.iamEvaluation.allowed ? 'good' : 'bad'}`}>
            {props.iamEvaluation.allowed ? <CheckCircle2 size={23} /> : <ShieldAlert size={23} />}{' '}
            {props.iamEvaluation.allowed ? 'Permitido en el modelo' : 'Denegado en el modelo'}
          </div>
          <p>{props.iamEvaluation.explanation}</p>
          <div class="terminal-block">
            <pre>
              <code>{JSON.stringify(props.iamEvaluation.policyDocument, null, 2)}</code>
            </pre>
          </div>
        </>
      ) : mode === 'scale' ? (
        <>
          <div class="result-heading">
            <Gauge size={28} />
            <h2>Planificador de réplicas</h2>
          </div>
          <div class="result-big">
            {props.replicas}
            <small>réplicas teóricas necesarias</small>
          </div>
          <div class="bar-visual">
            {Array.from(
              { length: Math.min(MAX_RENDERED_REPLICA_BARS, props.replicas) },
              (_, index) => (
                <div key={`replica-${index + 1}`} title={`Réplica ${index + 1}`}>
                  <Server size={22} />
                </div>
              ),
            )}
          </div>
          <p class="result-note">
            Este cálculo supone distribución ideal. La base de datos, el arranque, las cuotas y el
            presupuesto pueden limitar el escalamiento real.
          </p>
        </>
      ) : mode === 'architecture' ? (
        <>
          <div class="result-heading">
            <Layers size={28} />
            <h2>Architecture Decision Studio</h2>
          </div>
          <div class="result-big" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>
            {services[cloudId][props.architecture].label}
            <small>Punto de partida sugerido en {cloud_meta.short}</small>
          </div>
          <p class="result-note">
            {props.workload === 'events'
              ? 'El procesamiento por eventos exige idempotencia, reintentos controlados, DLQ y observabilidad.'
              : props.workload === 'batch'
                ? 'El procesamiento por lotes requiere colas, planificación, tiempos de ejecución máximos y control de costes.'
                : 'Una aplicación web debe resolver identidad, almacenamiento de sesión, entrada segura, métricas y persistencia.'}
          </p>
          <div class="result-stats">
            <div>
              <small>Alternativa</small>
              <strong>
                {
                  services[cloudId][props.architecture === 'compute' ? 'serverless' : 'compute']
                    .label
                }
              </strong>
            </div>
            <div>
              <small>Restricción priorizada</small>
              <strong>
                {props.priority === 'simple'
                  ? 'Simplicidad'
                  : props.priority === 'control'
                    ? 'Control'
                    : 'Escala'}
              </strong>
            </div>
          </div>
          <a
            class="official-link"
            target="_blank"
            rel="noopener noreferrer"
            href={services[cloudId][props.architecture].doc}
          >
            Revisar documentación oficial <ExternalLink size={15} />
          </a>
          <p class="result-note">
            Una decisión madura compara al menos dos opciones con TCO, seguridad, escalabilidad,
            RTO/RPO y capacidad de operación.
          </p>
        </>
      ) : (
        <>
          <div class="result-heading">
            <Activity size={28} />
            <h2>Presupuesto de error SLO</h2>
          </div>
          <div class="result-big">
            {props.sloBudget.minutes.toLocaleString('es-ES')} min
            <small>indisponibilidad máxima teórica en {props.days} días</small>
          </div>
          <div class="result-stats">
            <div>
              <small>Objetivo SLO</small>
              <strong>{props.availability.toFixed(2)}%</strong>
            </div>
            <div>
              <small>Ventana</small>
              <strong>{props.days} días</strong>
            </div>
          </div>
          <p class="result-note">
            Error budget aproximado: (1 − SLO) × duración. El indicador debe definirse con un SLI
            apropiado.
          </p>
        </>
      )}

      {props.runs > 0 && <Tag kind="accent">{props.runs} ejecuciones en esta sesión</Tag>}
    </div>
  );
}
