import { Bug, CheckCircle2, Layers, ListOrdered, RotateCcw } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { services, type Provider } from '../../../data/course';

type GameTab = 'bug-hunter' | 'order-steps' | 'arch-match';

const BUG_LINES = [
  'resource "aws_db_instance" "prod" {',
  '  engine = "postgres"',
  '  publicly_accessible = true # BUG: exposición directa',
  '  backup_retention_period = 14',
  '}',
];

const EXPECTED_ORDER = [
  '1. Validar identidad y contexto (STS / account)',
  '2. Revisar plan declarativo (-detailed-exitcode)',
  '3. Aplicar en staging con smoke test y rollback',
  '4. Ejecutar cleanup / verificar etiquetas FinOps',
];

export function GoPixelMicroGames({ cloudId }: { cloudId: Provider }) {
  const [tab, setTab] = useState<GameTab>('bug-hunter');
  const [pickedLine, setPickedLine] = useState<number | null>(null);
  const [orderPicked, setOrderPicked] = useState<string[]>([]);
  const [matchedCompute, setMatchedCompute] = useState<string>('');

  const shuffled = [EXPECTED_ORDER[2], EXPECTED_ORDER[0], EXPECTED_ORDER[3], EXPECTED_ORDER[1]];
  const orderCorrect =
    orderPicked.length === 4 && orderPicked.every((item, idx) => item === EXPECTED_ORDER[idx]);
  const expectedService = services[cloudId].serverless.label;

  return (
    <section class="info-card gopixel-games" aria-label="Micro-retos interactivos GoPixel">
      <div class="card-heading">
        <Bug size={19} />
        <h3>Dinámicas interactivas · GoPixel Studio</h3>
      </div>

      <div class="gopixel-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'bug-hunter'}
          class={tab === 'bug-hunter' ? 'active' : ''}
          onClick={() => setTab('bug-hunter')}
        >
          <Bug size={14} /> Bug Hunter
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'order-steps'}
          class={tab === 'order-steps' ? 'active' : ''}
          onClick={() => setTab('order-steps')}
        >
          <ListOrdered size={14} /> Ordenar Despliegue
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'arch-match'}
          class={tab === 'arch-match' ? 'active' : ''}
          onClick={() => setTab('arch-match')}
        >
          <Layers size={14} /> Architecture Match
        </button>
      </div>

      {tab === 'bug-hunter' && (
        <div class="gopixel-panel">
          <p class="sr-hint">Haz clic en la línea con riesgo de seguridad antes de desplegar:</p>
          <div class="gopixel-code">
            {BUG_LINES.map((line, idx) => (
              <button
                type="button"
                key={line}
                class={`gopixel-line ${pickedLine === idx ? (idx === 2 ? 'line-ok' : 'line-bad') : ''}`}
                onClick={() => setPickedLine(idx)}
              >
                <span>{idx + 1}</span> <code>{line}</code>
              </button>
            ))}
          </div>
          {pickedLine !== null && (
            <p role="status" class="sr-hint">
              {pickedLine === 2
                ? '✓ Detectado: publicly_accessible = true expone la BD a Internet.'
                : 'Revisa qué propiedad rompe el aislamiento privado.'}
            </p>
          )}
        </div>
      )}

      {tab === 'order-steps' && (
        <div class="gopixel-panel">
          <p class="sr-hint">Selecciona los pasos en el orden seguro de ingeniería:</p>
          <div class="gopixel-order-pool">
            {shuffled.map((step) => (
              <button
                type="button"
                key={step}
                disabled={orderPicked.includes(step)}
                class="btn btn-secondary btn-compact"
                onClick={() => setOrderPicked((prev) => [...prev, step])}
              >
                {step}
              </button>
            ))}
          </div>
          {orderPicked.length > 0 && (
            <div class="gopixel-order-result">
              <ol>
                {orderPicked.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <button
                type="button"
                class="btn btn-ghost btn-compact"
                onClick={() => setOrderPicked([])}
              >
                <RotateCcw size={13} /> Reiniciar orden
              </button>
              {orderPicked.length === 4 && (
                <p role="status" class="sr-hint">
                  {orderCorrect
                    ? '✓ Secuencia segura verificada.'
                    : 'Orden incorrecto: primero identidad/contexto, luego plan, staging y cleanup.'}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {tab === 'arch-match' && (
        <div class="gopixel-panel">
          <p class="sr-hint">
            Requisito en {cloudId.toUpperCase()}: «API orientada a eventos que escala a cero sin
            administrar nodos». ¿Qué servicio eliges?
          </p>
          <div class="gopixel-order-pool">
            {[
              expectedService,
              services[cloudId].compute.label,
              services[cloudId].storage.label,
            ].map((label) => (
              <button
                type="button"
                key={label}
                class={`btn btn-secondary btn-compact ${matchedCompute === label ? 'decision-selected' : ''}`}
                onClick={() => setMatchedCompute(label)}
              >
                {label}
              </button>
            ))}
          </div>
          {matchedCompute && (
            <p role="status" class="sr-hint">
              {matchedCompute === expectedService ? (
                <>
                  <CheckCircle2 size={14} /> Correcto: {expectedService} encaja con eventos y escala
                  elástica.
                </>
              ) : (
                'Ese servicio cubre cómputo/almacenamiento base, pero no eventos serverless.'
              )}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
