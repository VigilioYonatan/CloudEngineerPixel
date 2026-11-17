import { FileText } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import { MarkdownViewer } from '../../../components/ui/MarkdownViewer';
import type { Provider } from '../../../data/course';
import { loadModuleLabMarkdown } from '../../../lib/markdownGuideLoader';

type LabMarkdownGuidePanelProps = {
  provider: Provider;
  moduleId: string;
};

export function LabMarkdownGuidePanel({ provider, moduleId }: LabMarkdownGuidePanelProps) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    let active = true;
    setStatus('loading');
    loadModuleLabMarkdown(provider, moduleId)
      .then((content) => {
        if (!active) return;
        if (content) {
          setMarkdown(content);
          setStatus('ready');
        } else {
          setMarkdown(null);
          setStatus('missing');
        }
      })
      .catch(() => {
        if (active) setStatus('missing');
      });

    return () => {
      active = false;
    };
  }, [provider, moduleId]);

  return (
    <section class="info-card">
      <div class="card-heading">
        <FileText size={19} />
        <h3>
          Guía oficial del repositorio (<code>{`labs/${provider}/${moduleId}.md`}</code>)
        </h3>
      </div>
      {status === 'loading' && (
        <p role="status">Cargando cuaderno técnico del módulo para {provider.toUpperCase()}...</p>
      )}
      {status === 'missing' && (
        <p role="alert">No se encontró el archivo Markdown del laboratorio solicitado.</p>
      )}
      {status === 'ready' && markdown && <MarkdownViewer markdown={markdown} provider={provider} />}
    </section>
  );
}
