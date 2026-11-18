import { ArrowRight, Check, CheckCircle2 } from 'lucide-preact';
import { Tag } from '../../../shared/ui/Tag';

type LabDeliverableAsideProps = {
  isLabDone: boolean;
  allChecked: boolean;
  checkedCount: number;
  onCompleteLab: () => void;
  onOpenSenior: () => void;
};

export function LabDeliverableAside({
  isLabDone,
  allChecked,
  checkedCount,
  onCompleteLab,
  onOpenSenior,
}: LabDeliverableAsideProps) {
  return (
    <aside class="lab-aside">
      <div class="info-card lab-sidecard">
        <Tag kind="accent">ENTREGABLE</Tag>
        <h3>Criterio de aprobación</h3>
        <p>Completa el checklist de seguridad, registra tus evidencias y confirma la práctica.</p>
        <div class="score-ring">{isLabDone ? '100%' : `${checkedCount * 20}%`}</div>
        <button
          type="button"
          class={`btn full-width ${isLabDone ? 'btn-complete' : 'btn-primary'}`}
          disabled={!allChecked && !isLabDone}
          onClick={onCompleteLab}
        >
          {isLabDone ? (
            <>
              <CheckCircle2 size={17} /> Laboratorio registrado
            </>
          ) : (
            <>
              <Check size={17} /> Registrar práctica
            </>
          )}
        </button>
        <button
          type="button"
          class="btn btn-ghost full-width"
          onClick={onOpenSenior}
          style={{ marginTop: '10px' }}
        >
          Probar desafíos Senior <ArrowRight size={16} />
        </button>
      </div>
    </aside>
  );
}
