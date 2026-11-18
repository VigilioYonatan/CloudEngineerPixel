import type { Provider } from '../data/course';

const RAW_LAB_MARKDOWN_LOADERS = import.meta.glob('../../labs/**/*.{md,tf,yaml}', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

async function loadByRelativeLabsPath(relativePath: string): Promise<string | null> {
  const key = `../../labs/${relativePath}`;
  const loader = RAW_LAB_MARKDOWN_LOADERS[key];
  if (!loader) return null;
  return loader();
}

export async function loadModuleLabMarkdown(
  provider: Provider,
  moduleId: string,
): Promise<string | null> {
  return loadByRelativeLabsPath(`${provider}/${moduleId}.md`);
}

export async function loadSeniorWorkbookMarkdown(
  provider: Provider,
  caseId: string,
): Promise<string | null> {
  return loadByRelativeLabsPath(`senior/providers/${provider}/${caseId}.md`);
}

export async function loadOidcGuideMarkdown(provider: Provider): Promise<string | null> {
  return loadByRelativeLabsPath(`devsecops/${provider}-oidc.md`);
}

export async function loadEnterpriseTerraformSource(provider: Provider): Promise<string | null> {
  return loadByRelativeLabsPath(`${provider}/enterprise-finops.tf`);
}

export async function loadLocalSandboxFile(
  fileName: 'compose.yaml' | 'k8s-kind-manifest.yaml' | 'README.md',
): Promise<string | null> {
  return loadByRelativeLabsPath(`local-sandbox/${fileName}`);
}
