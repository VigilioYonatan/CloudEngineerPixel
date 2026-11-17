export type ScopedDraftFlusher = {
  id: string;
  scopeLabel: string;
  isDirty: () => boolean;
  flush: () => void;
};

export type ContextSwitchPreparation = {
  allowed: boolean;
  flushedCount: number;
  flushedLabels: string[];
};

export function createContextSwitchCoordinator() {
  const flushers = new Map<string, ScopedDraftFlusher>();
  let active_imports = 0;

  return {
    registerFlusher(flusher: ScopedDraftFlusher): () => void {
      flushers.set(flusher.id, flusher);
      return () => {
        if (flushers.get(flusher.id) === flusher) {
          flushers.delete(flusher.id);
        }
      };
    },

    beginAsyncImport(): () => void {
      active_imports += 1;
      let finished = false;
      return () => {
        if (!finished) {
          finished = true;
          active_imports = Math.max(0, active_imports - 1);
        }
      };
    },

    hasAsyncImportInFlight(): boolean {
      return active_imports > 0;
    },

    prepareContextSwitch(
      confirm_fn: (message: string) => boolean = (msg) =>
        typeof window !== 'undefined' ? window.confirm(msg) : true,
    ): ContextSwitchPreparation {
      if (active_imports > 0) {
        const confirmed = confirm_fn(
          'Hay una importación de expediente en curso. ¿Deseas cancelar la operación pendiente y cambiar de contexto?',
        );
        if (!confirmed) {
          return { allowed: false, flushedCount: 0, flushedLabels: [] };
        }
      }

      const flushed_labels: string[] = [];
      for (const flusher of flushers.values()) {
        if (flusher.isDirty()) {
          flusher.flush();
          flushed_labels.push(flusher.scopeLabel);
        }
      }

      return {
        allowed: true,
        flushedCount: flushed_labels.length,
        flushedLabels: flushed_labels,
      };
    },
  };
}

export const appContextGuard = createContextSwitchCoordinator();
