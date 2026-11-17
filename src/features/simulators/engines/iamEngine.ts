import type { CloudProviderId } from '../../../domain/providers';
import type { IamAction, IamScope } from '../types/simulator.types';

export type IamEngineInput = {
  cloudId: CloudProviderId;
  action: IamAction;
  scope: IamScope;
  guardrailDeny: boolean;
  mfaRequired: boolean;
  mfaPresent: boolean;
  regionMatched: boolean;
};

export type IamDecisionVerdict = 'allow' | 'explicit-deny' | 'implicit-deny';

export type IamEngineResult = {
  modelVersion: string;
  allowed: boolean;
  verdict: IamDecisionVerdict;
  explanation: string;
  officialModelNote: string;
  cloudLayerLabel: string;
  steps: string[];
  policyDocument: {
    effect: 'Allow' | 'Deny';
    action: IamAction;
    resource: 'resource/selected' | '*';
    model: 'educational';
    conditions: { mfaRequired: boolean; mfaPresent: boolean; regionMatched: boolean };
  };
};

const CLOUD_LAYERS: Record<CloudProviderId, string> = {
  aws: 'Identity Policy + Resource Policy + SCP Guardrail',
  azure: 'Azure RBAC Role Assignment + Azure Deny Assignment',
  gcp: 'GCP IAM Binding + Organization Policy Constraint',
};

export function runIamEngine(input: IamEngineInput): IamEngineResult {
  const { cloudId, action, scope, guardrailDeny, mfaRequired, mfaPresent, regionMatched } = input;
  const identityAllows = action === 'read' || (action === 'write' && scope === 'single');
  const conditionsOk = (!mfaRequired || mfaPresent) && regionMatched;

  let verdict: IamDecisionVerdict = 'implicit-deny';
  let explanation =
    'Sin una declaración Allow que cubra acción, recurso y condiciones, aplica implicit-deny por defecto.';

  if (guardrailDeny) {
    verdict = 'explicit-deny';
    explanation = `Un guardrail organizacional (${CLOUD_LAYERS[cloudId]}) emite explicit-deny; prevalece sobre cualquier Allow.`;
  } else if (action === 'admin') {
    verdict = 'implicit-deny';
    explanation =
      'Las operaciones administrativas amplias no están permitidas en la política base de mínimo privilegio.';
  } else if (identityAllows && !conditionsOk) {
    verdict = 'implicit-deny';
    explanation = !regionMatched
      ? 'Condición de región no satisfecha: la solicitud cae en implicit-deny.'
      : 'La política exige MFA activo en el token temporal; sin MFA aplica implicit-deny.';
  } else if (identityAllows && conditionsOk) {
    verdict = 'allow';
    explanation =
      'Identity/Resource policy conceden Allow, no existe explicit-deny y todas las condiciones se cumplen.';
  } else if (action === 'write' && scope === 'all') {
    verdict = 'implicit-deny';
    explanation = 'Escribir sobre todos los recursos (*) excede el alcance mínimo permitido.';
  }

  const allowed = verdict === 'allow';
  const steps = [
    `1. Capa evaluada (${cloudId.toUpperCase()}): ${CLOUD_LAYERS[cloudId]}.`,
    `2. Guardrail / Deny explícito: ${guardrailDeny ? 'ACTIVO -> explicit-deny inmediato' : 'ninguno'}.`,
    `3. Coincidencia Allow base (${action} en ${scope}): ${identityAllows ? 'sí' : 'no'}.`,
    `4. Condiciones (MFA=${mfaRequired ? (mfaPresent ? 'OK' : 'FALTA') : 'no requerido'}, Región=${regionMatched ? 'OK' : 'FUERA'}): ${conditionsOk ? 'cumplidas' : 'bloqueadas'}.`,
    `5. Veredicto final: ${verdict.toUpperCase()}.`,
  ];

  return {
    modelVersion: 'iam-v2.0',
    allowed,
    verdict,
    explanation,
    officialModelNote:
      'Modelo educativo simplificado; difiere del evaluador oficial de políticas en producción (ABAC, session policies y límites de permisos completos).',
    cloudLayerLabel: CLOUD_LAYERS[cloudId],
    steps,
    policyDocument: {
      effect: allowed ? 'Allow' : 'Deny',
      action,
      resource: scope === 'single' ? 'resource/selected' : '*',
      model: 'educational',
      conditions: { mfaRequired, mfaPresent, regionMatched },
    },
  };
}
