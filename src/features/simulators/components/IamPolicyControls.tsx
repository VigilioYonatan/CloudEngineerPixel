import type { IamAction, IamScope } from '../types/simulator.types';

type IamPolicyControlsProps = {
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
};

export function IamPolicyControls(props: IamPolicyControlsProps) {
  return (
    <>
      <label>
        Acción requerida
        <select
          value={props.action}
          onChange={(e) =>
            props.onChangeAction((e.currentTarget as HTMLSelectElement).value as IamAction)
          }
        >
          <option value="read">Lectura de recursos</option>
          <option value="write">Modificar recursos</option>
          <option value="admin">Administrador completo</option>
        </select>
      </label>
      <label>
        Ámbito asignado
        <select
          value={props.scope}
          onChange={(e) =>
            props.onChangeScope((e.currentTarget as HTMLSelectElement).value as IamScope)
          }
        >
          <option value="single">Recurso específico</option>
          <option value="all">Todos los recursos</option>
        </select>
      </label>
      <label class="sim-check">
        <input
          type="checkbox"
          checked={Boolean(props.guardrailDeny)}
          onChange={(e) =>
            props.onChangeGuardrailDeny?.((e.currentTarget as HTMLInputElement).checked)
          }
        />
        Guardrail organizacional Explicit Deny (SCP / Deny Assignment)
      </label>
      <label class="sim-check">
        <input
          type="checkbox"
          checked={Boolean(props.mfaRequired)}
          onChange={(e) =>
            props.onChangeMfaRequired?.((e.currentTarget as HTMLInputElement).checked)
          }
        />
        Exigir condición MFA
      </label>
      {props.mfaRequired && (
        <label class="sim-check">
          <input
            type="checkbox"
            checked={Boolean(props.mfaPresent)}
            onChange={(e) =>
              props.onChangeMfaPresent?.((e.currentTarget as HTMLInputElement).checked)
            }
          />
          Token temporal incluye MFA verificado
        </label>
      )}
      <label class="sim-check">
        <input
          type="checkbox"
          checked={props.regionMatched !== false}
          onChange={(e) =>
            props.onChangeRegionMatched?.((e.currentTarget as HTMLInputElement).checked)
          }
        />
        Solicitud dentro de la región autorizada
      </label>
      <p>
        Política simplificada para aprender mínimo privilegio. No reemplaza un evaluador IAM real.
      </p>
    </>
  );
}
