import { signal } from '@preact/signals';

export type ConfirmDialogTone = 'danger' | 'warning' | 'primary';

export type ConfirmDialogOptions = {
  title: string;
  description: string;
  impactSummary?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmDialogTone;
};

export type ActiveConfirmRequest = {
  id: number;
  title: string;
  description: string;
  impactSummary?: string;
  confirmLabel: string;
  cancelLabel: string;
  tone: ConfirmDialogTone;
};

let nextRequestId = 1;
let pendingResolver: ((confirmed: boolean) => void) | null = null;

export const activeConfirmRequest = signal<ActiveConfirmRequest | null>(null);

export function resolveActiveConfirm(confirmed: boolean): void {
  const resolver = pendingResolver;
  pendingResolver = null;
  activeConfirmRequest.value = null;
  if (resolver) {
    resolver(confirmed);
  }
}

export function requestConfirm(options: ConfirmDialogOptions): Promise<boolean> {
  if (pendingResolver) {
    const staleResolver = pendingResolver;
    pendingResolver = null;
    staleResolver(false);
  }

  const requestId = nextRequestId++;
  activeConfirmRequest.value = {
    id: requestId,
    title: options.title,
    description: options.description,
    impactSummary: options.impactSummary,
    confirmLabel: options.confirmLabel || 'Confirmar',
    cancelLabel: options.cancelLabel || 'Cancelar',
    tone: options.tone || 'warning',
  };

  return new Promise<boolean>((resolve) => {
    pendingResolver = resolve;
  });
}
