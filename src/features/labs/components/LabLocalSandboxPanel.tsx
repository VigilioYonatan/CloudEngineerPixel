import { Boxes, Download, Laptop, ShieldCheck } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { loadLocalSandboxFile } from '../../../lib/markdownGuideLoader';
import { downloadLabTextFile } from '../libs/labPersistenceAndExport';

const POWERSHELL_STEPS = [
  'cd labs/local-sandbox',
  'powershell -ExecutionPolicy Bypass -File .\\scripts\\setup.ps1',
  'powershell -ExecutionPolicy Bypass -File .\\scripts\\verify.ps1',
  'powershell -ExecutionPolicy Bypass -File .\\scripts\\cleanup.ps1',
].join('\n');

const BASH_STEPS = [
  'cd labs/local-sandbox',
  'bash ./scripts/setup.sh && bash ./scripts/verify.sh',
  '# Práctica opcional Kubernetes local con Kind:',
  'kind create cluster --name cea-lab && kubectl apply -f k8s-kind-manifest.yaml',
  'kind delete cluster --name cea-lab && bash ./scripts/cleanup.sh',
].join('\n');

export function LabLocalSandboxPanel() {
  const [composeYaml, setComposeYaml] = useState('');
  const [kindYaml, setKindYaml] = useState('');

  useEffect(() => {
    void loadLocalSandboxFile('compose.yaml').then((val) => setComposeYaml(val || ''));
    void loadLocalSandboxFile('k8s-kind-manifest.yaml').then((val) => setKindYaml(val || ''));
  }, []);

  return (
    <section class="info-card">
      <div class="card-heading">
        <Laptop size={19} />
        <h3>Modalidad B · Laboratorio Local Reproducible (Docker Compose & Kind)</h3>
      </div>
      <p>
        Practica redes aisladas, contenedores non-root, probes y presupuestos de disrupción en tu
        equipo local{' '}
        <strong>sin tarjeta de crédito, sin cuenta cloud y sin exponer `0.0.0.0`</strong>.
        Requisitos mínimos: 2 vCPU, 4 GB RAM y Docker / Podman Rootless.
      </p>

      <div class="sr-report-actions" style={{ marginBottom: '14px' }}>
        {composeYaml && (
          <button
            type="button"
            class="btn btn-secondary btn-compact"
            onClick={() => downloadLabTextFile(composeYaml, 'compose.yaml', 'text/yaml')}
          >
            <Download size={14} /> Descargar compose.yaml
          </button>
        )}
        {kindYaml && (
          <button
            type="button"
            class="btn btn-secondary btn-compact"
            onClick={() => downloadLabTextFile(kindYaml, 'k8s-kind-manifest.yaml', 'text/yaml')}
          >
            <Boxes size={14} /> Descargar k8s-kind-manifest.yaml
          </button>
        )}
      </div>

      <h4>Windows (PowerShell) — Setup, Verify & Cleanup</h4>
      <CodeBlock
        code={POWERSHELL_STEPS}
        language="powershell"
        provider="LOCAL"
        risk="read-only"
        contextLabel="labs/local-sandbox"
      />

      <h4>Linux / macOS / WSL2 (Bash + Kind)</h4>
      <CodeBlock
        code={BASH_STEPS}
        language="bash"
        provider="LOCAL"
        risk="read-only"
        contextLabel="labs/local-sandbox"
        prefixDollar
      />

      <div class="md-callout">
        <ShieldCheck size={16} />
        <span>
          <b>Límite honesto frente a nube real:</b> `prod-local` valida segmentación de red interna
          (`internal: true`), healthchecks y manifiestos K8s, pero no reproduce IAM oficial del
          proveedor ni latencia física multizona.
        </span>
      </div>
    </section>
  );
}
