export type MessagingInput = {
  eventsPublished: number;
  transientFailurePct: number;
  poisonMessages: number;
  idempotencyEnabled: boolean;
  outboxEnabled: boolean;
  dlqEnabled: boolean;
};

export type MessagingResult = {
  modelVersion: string;
  deliveredCount: number;
  duplicateCharges: number;
  dlqCount: number;
  lostEvents: number;
  summary: string;
  steps: string[];
};

export function runMessagingEngine(input: MessagingInput): MessagingResult {
  const redeliveries = Math.round((input.eventsPublished * input.transientFailurePct) / 100);
  const duplicateCharges = input.idempotencyEnabled ? 0 : redeliveries;
  const dlqCount = input.dlqEnabled ? input.poisonMessages : 0;
  const lostEvents = input.outboxEnabled
    ? 0
    : Math.max(1, Math.round(input.eventsPublished * 0.02));
  const deliveredCount = Math.max(0, input.eventsPublished - input.poisonMessages - lostEvents);

  const summary =
    duplicateCharges === 0 && lostEvents === 0 && input.dlqEnabled
      ? `Entrega segura: ${deliveredCount} procesados, 0 cobros duplicados (Idempotency + Outbox) y ${dlqCount} aislados en DLQ.`
      : `Riesgo activo: ${duplicateCharges} cobros duplicados, ${lostEvents} eventos perdidos sin Outbox, ${dlqCount} en DLQ.`;

  return {
    modelVersion: 'msg-v1.0',
    deliveredCount,
    duplicateCharges,
    dlqCount,
    lostEvents,
    summary,
    steps: [
      `1. Entrega at-least-once genera ${redeliveries} reentrega(s) por fallos transitorios.`,
      `2. Idempotency-Key ${input.idempotencyEnabled ? 'ACTIVO -> 0 cobros duplicados' : `DESACTIVADO -> ${duplicateCharges} cobros duplicados`}.`,
      `3. Transactional Outbox ${input.outboxEnabled ? 'ACTIVO -> 0 eventos perdidos' : `AUSENTE -> ${lostEvents} eventos desincronizados`}.`,
      `4. DLQ ${input.dlqEnabled ? `aísla ${dlqCount} poison message(s) para replay auditado` : 'deshabilitada -> bloquea la cola'}.`,
    ],
  };
}
