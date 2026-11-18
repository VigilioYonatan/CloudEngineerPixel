import { Download, FileCode2, FileText, Shield } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { MarkdownViewer } from '../../../components/ui/MarkdownViewer';
import type { Provider } from '../../../data/course';
import {
  loadEnterpriseTerraformSource,
  loadModuleLabMarkdown,
  loadOidcGuideMarkdown,
} from '../../../lib/markdownGuideLoader';
import { downloadLabTextFile } from '../libs/labPersistenceAndExport';

type GuideSubTab = 'module' | 'oidc' | 'terraform';

type LabMarkdownGuidePanelProps = {
  provider: Provider;
  moduleId: string;
};

export function LabMarkdownGuidePanel({ provider, moduleId }: LabMarkdownGuidePanelProps) {
  const [subTab, setSubTab] = useState<GuideSubTab>('module');
  const [moduleMd, setModuleMd] = useState<string | null>(null);
  const [oidcMd, setOidcMd] = useState<string | null>(null);
  const [tfCode, setTfCode] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    let active = true;
    setStatus('loading');
    Promise.all([
      loadModuleLabMarkdown(provider, moduleId),
      loadOidcGuideMarkdown(provider),
      loadEnterpriseTerraformSource(provider),
    ])
      .then(([modDoc, oidcDoc, tfDoc]) => {
        if (!active) return;
        setModuleMd(modDoc);
        setOidcMd(oidcDoc);
        setTfCode(tfDoc);
        setStatus(modDoc ? 'ready' : 'missing');
      })
      .catch(() => {
        if (active) setStatus('missing');
      });

    return () => {
      active = false;
    };
  }, [provider, moduleId]);

  const activePath =
    subTab === 'module'
      ? `labs/${provider}/${moduleId}.md`
      : subTab === 'oidc'
        ? `labs/devsecops/${provider}-oidc.md`
        : `labs/${provider}/enterprise-finops.tf`;

  const handleDownloadActive = () => {
    if (subTab === 'module' && moduleMd) {
      downloadLabTextFile(moduleMd, `${provider}-${moduleId}-lab.md`, 'text/markdown');
    } else if (subTab === 'oidc' && oidcMd) {
      downloadLabTextFile(oidcMd, `${provider}-oidc-devsecops.md`, 'text/markdown');
    } else if (subTab === 'terraform' && tfCode) {
      downloadLabTextFile(tfCode, `${provider}-enterprise-finops.tf`, 'text/plain');
    }
  };

  return (
    <section class="info-card">
      <div class="lab-guide-toolbar">
        <div class="card-heading" style={{ marginBottom: 0 }}>
          <FileText size={19} />
          <h3>
            Material oficial del repositorio (<code>{activePath}</code>)
          </h3>
        </div>
        <button
          type="button"
          class="btn btn-secondary btn-compact"
          disabled={status !== 'ready'}
          onClick={handleDownloadActive}
        >
          <Download size={14} /> Descargar archivo
        </button>
      </div>

      <div class="gopixel-tabs" role="toolbar" aria-label="Seleccionar material del repositorio">
        <button
          type="button"
          class={subTab === 'module' ? 'active' : ''}
          onClick={() => setSubTab('module')}
        >
          <FileText size={14} /> Guía del módulo ({provider.toUpperCase()})
        </button>
        <button
          type="button"
          class={subTab === 'oidc' ? 'active' : ''}
          onClick={() => setSubTab('oidc')}
        >
          <Shield size={14} /> Federación OIDC sin secretos
        </button>
        <button
          type="button"
          class={subTab === 'terraform' ? 'active' : ''}
          onClick={() => setSubTab('terraform')}
        >
          <FileCode2 size={14} /> Terraform Enterprise + FinOps
        </button>
      </div>

      {status === 'loading' && (
        <p role="status">Cargando cuaderno técnico del módulo para {provider.toUpperCase()}...</p>
      )}
      {status === 'missing' && (
        <p role="alert">No se encontró el archivo Markdown del laboratorio solicitado.</p>
      )}
      {status === 'ready' && subTab === 'module' && moduleMd && (
        <MarkdownViewer markdown={moduleMd} provider={provider} />
      )}
      {status === 'ready' && subTab === 'oidc' && oidcMd && (
        <MarkdownViewer markdown={oidcMd} provider={provider} />
      )}
      {status === 'ready' && subTab === 'terraform' && tfCode && (
        <div>
          <p class="helper-text">
            Validación estática local recomendada:{' '}
            <code>terraform init -backend=false && terraform fmt -check && terraform validate</code>
          </p>
          <CodeBlock
            code={tfCode}
            language="hcl"
            provider={provider}
            risk="creates-cost"
            contextLabel={activePath}
          />
        </div>
      )}
    </section>
  );
}
