export type TerraformScenarioId =
  | 'create-stateless'
  | 'update-in-place-tags'
  | 'destroy-recreate-db'
  | 'out-of-band-drift'
  | 'state-lock-conflict';

export type BlastRadiusLevel = 'Bajo' | 'Medio' | 'Alto' | 'Crítico';

export type TerraformPlanAnalysis = {
  modelVersion: string;
  scenario: TerraformScenarioId;
  title: string;
  planSummary: string;
  blastRadius: BlastRadiusLevel;
  forcesReplacement: boolean;
  dataLossRisk: boolean;
  recommendedAction: string;
  guardrails: string[];
  steps: string[];
};

const SCENARIO_MAP: Record<
  TerraformScenarioId,
  Omit<TerraformPlanAnalysis, 'modelVersion' | 'scenario'>
> = {
  'create-stateless': {
    title: 'Creación de recurso stateless nuevo',
    planSummary: 'Plan: 2 to add, 0 to change, 0 to destroy.',
    blastRadius: 'Bajo',
    forcesReplacement: false,
    dataLossRisk: false,
    recommendedAction: 'Aprobar plan tras validar etiquetas, cifrado y mínimo privilegio.',
    guardrails: ['Remote state cifrado', 'use_lockfile = true', 'Plan revisado en PR'],
    steps: [
      '1. Ningún recurso existente es modificado ni destruido.',
      '2. Blast radius Bajo: impacto acotado a recursos nuevos.',
      '3. Aplicar vía pipeline OIDC tras revisión.',
    ],
  },
  'update-in-place-tags': {
    title: 'Actualización in-place de metadatos/etiquetas',
    planSummary: 'Plan: 0 to add, 3 to change, 0 to destroy.',
    blastRadius: 'Bajo',
    forcesReplacement: false,
    dataLossRisk: false,
    recommendedAction:
      'Confirmar que todos los cambios muestran (~) in-place y no (-/+) replacement.',
    guardrails: ['Verificar diff línea a línea', 'Sin ForceNew en atributos'],
    steps: [
      '1. Operación in-place (~): preserva IDs, discos y conexiones activas.',
      '2. Validar que no existan efectos secundarios en políticas IAM/red.',
    ],
  },
  'destroy-recreate-db': {
    title: 'Sustitución destructiva ForceNew en base de datos',
    planSummary: 'Plan: 1 to add, 0 to change, 1 to destroy (# forces replacement).',
    blastRadius: 'Crítico',
    forcesReplacement: true,
    dataLossRisk: true,
    recommendedAction:
      'Detener apply, activar lifecycle { prevent_destroy = true }, evaluar bloque moved o migración + restore drill.',
    guardrails: [
      'lifecycle { prevent_destroy = true }',
      'Snapshot y restore drill cronometrado antes de ventana',
      'ADR firmado para cambios de almacenamiento/motor',
    ],
    steps: [
      '1. Señal crítica: "-/+" destroy and then create replacement en recurso con estado.',
      '2. Blast radius Crítico: pérdida potencial de datos y caída prolongada.',
      '3. Mitigación: bloquear en CI, revisar atributo ForceNew y planificar migración segura.',
    ],
  },
  'out-of-band-drift': {
    title: 'Deriva manual detectada fuera de Git (exitcode 2)',
    planSummary:
      'Note: Objects have changed outside of Terraform (Security Group abierto 0.0.0.0/0).',
    blastRadius: 'Alto',
    forcesReplacement: false,
    dataLossRisk: false,
    recommendedAction:
      'Hacer triage: si no es hotfix autorizado con ADR, reconciliar con terraform apply desde Git y restringir acceso de consola.',
    guardrails: [
      'Detección programada con terraform plan -detailed-exitcode',
      'Separación de permisos en consola productiva',
    ],
    steps: [
      '1. Drift detectado: infraestructura real diverge de la definición declarativa en Git.',
      '2. Evaluar si el cambio manual fue emergencia aprobada o exposición insegura.',
      '3. Reconciliar estado mediante PR/ADR o revertir al baseline de Git.',
    ],
  },
  'state-lock-conflict': {
    title: 'Conflicto de bloqueo concurrente de estado',
    planSummary: 'Error acquiring the state lock (Lock Info: ID=... OperationTypeApply).',
    blastRadius: 'Medio',
    forcesReplacement: false,
    dataLossRisk: true,
    recommendedAction:
      'Nunca ejecutar force-unlock sin confirmar que el otro pipeline terminó; usar backend S3 con use_lockfile = true.',
    guardrails: [
      'use_lockfile = true en Terraform >= 1.10',
      'Partición de state por entorno/stack',
      'Prohibido force-unlock automático en CI',
    ],
    steps: [
      '1. Dos ejecuciones compiten por el mismo archivo .tfstate.',
      '2. Forzar desbloqueo mientras corre otro apply corrompe el estado remoto.',
      '3. Verificar PID/run activo antes de cualquier intervención.',
    ],
  },
};

export function runTerraformPlanEngine(scenario: TerraformScenarioId): TerraformPlanAnalysis {
  return {
    modelVersion: 'tf-plan-v1.0',
    scenario,
    ...SCENARIO_MAP[scenario],
  };
}
