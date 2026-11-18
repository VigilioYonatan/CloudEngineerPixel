import { Check, Copy } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import {
  analyzeCommandSnippet,
  type CodeLanguage,
  type CommandRiskLevel,
} from '../../domain/commandRisk';
import type { CloudProviderId } from '../../domain/providers';
import { notify } from '../../lib/state';

export type CodeBlockProps = {
  code: string;
  language?: CodeLanguage;
  provider?: CloudProviderId | string;
  risk?: CommandRiskLevel;
  contextLabel?: string;
  prefixDollar?: boolean;
};

export function CodeBlock({
  code,
  language,
  provider,
  risk,
  contextLabel,
  prefixDollar = false,
}: CodeBlockProps) {
  const [copiedState, setCopiedState] = useState<'idle' | 'copied' | 'manual'>('idle');
  const meta = analyzeCommandSnippet(code, { language, risk, provider });

  useEffect(() => {
    if (copiedState === 'idle') return;
    const timer = window.setTimeout(() => setCopiedState('idle'), 2600);
    return () => window.clearTimeout(timer);
  }, [copiedState]);

  const handleCopy = () => {
    if (!navigator.clipboard?.writeText) {
      setCopiedState('manual');
      notify('Copia manualmente el comando');
      return;
    }
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedState('copied');
        notify('Comando copiado');
      })
      .catch(() => {
        setCopiedState('manual');
        notify('Copia manualmente el comando');
      });
  };

  const renderedCode = prefixDollar ? `$ ${code}` : code;

  return (
    <div class={`terminal-block code-block code-risk-${meta.risk}`}>
      <div class="terminal-bar code-block-bar">
        <span class="terminal-lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        <div class="code-block-badges">
          <span class="code-badge code-badge-lang">{meta.language.toUpperCase()}</span>
          <span class="code-badge code-badge-provider">{meta.providerBadge}</span>
          <span class={`code-badge code-badge-risk risk-${meta.risk}`}>{meta.riskLabel}</span>
          {contextLabel && <span class="code-block-context">{contextLabel}</span>}
        </div>

        <button
          type="button"
          class="code-copy-btn"
          aria-label="Copiar comando al portapapeles"
          title="Copiar comando"
          onClick={handleCopy}
        >
          {copiedState === 'copied' ? <Check size={14} /> : <Copy size={14} />}
          <span>{copiedState === 'copied' ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>

      <span class="sr-only" role="status" aria-live="polite">
        {copiedState === 'copied'
          ? 'Comando copiado al portapapeles'
          : copiedState === 'manual'
            ? 'Selecciona y copia manualmente el comando'
            : ''}
      </span>

      <pre>
        <code>{renderedCode}</code>
      </pre>
    </div>
  );
}
