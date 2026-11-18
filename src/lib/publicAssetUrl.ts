export function resolvePublicUrl(assetPath: string): string {
  const clean = assetPath.replace(/^\.?\//, '');
  const metaEnv = (import.meta as unknown as { env?: { BASE_URL?: string } }).env;
  const rawBase = metaEnv?.BASE_URL ?? './';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  return `${base}${clean}`;
}
