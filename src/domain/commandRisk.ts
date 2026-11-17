import type { CloudProviderId } from './providers';

export type CodeLanguage = 'bash' | 'hcl' | 'yaml' | 'json' | 'log';

export type CommandRiskLevel = 'read-only' | 'creates-cost' | 'destructive';

export type CommandRiskLabel =
  | 'SOLO LECTURA'
  | 'CREA RECURSOS / COSTO'
  | 'DESTRUCTIVO / REQUIERE PLAN';

export type CommandSnippetMetadata = {
  language: CodeLanguage;
  risk: CommandRiskLevel;
  riskLabel: CommandRiskLabel;
  providerBadge: string;
};

const DESTRUCTIVE_PATTERN =
  /\b(?:terraform\s+destroy|kubectl\s+delete|helm\s+uninstall|rm\s+-rf|aws\s+\S+\s+(?:delete-|terminate-|rb\b|rm\b|purge-)|az\s+(?:\S+\s+)*delete\b|gcloud\s+(?:\S+\s+)*delete\b)\b/i;

const COST_OR_MUTATION_PATTERN =
  /\b(?:terraform\s+apply|kubectl\s+apply|helm\s+(?:install|upgrade)|aws\s+\S+\s+(?:run-instances|create-|put-|update-|allocate-|start-)|az\s+(?:\S+\s+)*(?:create|update|scale|start|deploy)\b|gcloud\s+(?:\S+\s+)*(?:create|deploy|update|resize)\b)\b/i;

export function detectSnippetLanguage(code: string, explicitLanguage?: CodeLanguage): CodeLanguage {
  if (explicitLanguage) return explicitLanguage;
  const trimmed = code.trim();

  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    return 'json';
  }
  if (/^\s*(?:resource|variable|output|provider|module|terraform)\s+[^{\n]*\{/m.test(trimmed)) {
    return 'hcl';
  }
  if (/^\s*(?:apiVersion|kind|metadata|spec|jobs|on)\s*:/m.test(trimmed)) {
    return 'yaml';
  }
  if (
    /^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}/.test(trimmed) ||
    /\b(?:ERROR|WARN|INFO|CRITICAL|HTTP\/\d)\b/.test(trimmed)
  ) {
    if (!/^\s*(?:\$\s*)?(?:aws|az|gcloud|terraform|kubectl)\b/m.test(trimmed)) {
      return 'log';
    }
  }
  return 'bash';
}

export function classifyCommandRisk(
  code: string,
  explicitRisk?: CommandRiskLevel,
): CommandRiskLevel {
  if (explicitRisk) return explicitRisk;
  if (DESTRUCTIVE_PATTERN.test(code)) return 'destructive';
  if (COST_OR_MUTATION_PATTERN.test(code)) return 'creates-cost';
  return 'read-only';
}

export function getCommandRiskLabel(risk: CommandRiskLevel): CommandRiskLabel {
  if (risk === 'destructive') return 'DESTRUCTIVO / REQUIERE PLAN';
  if (risk === 'creates-cost') return 'CREA RECURSOS / COSTO';
  return 'SOLO LECTURA';
}

export function detectProviderBadge(
  code: string,
  explicitProvider?: CloudProviderId | string,
): string {
  if (explicitProvider) return explicitProvider.toUpperCase();
  if (/\bterraform\b/i.test(code)) return 'TERRAFORM';
  if (/^\s*(?:\$\s*)?aws\b/m.test(code)) return 'AWS';
  if (/^\s*(?:\$\s*)?az\b/m.test(code)) return 'AZURE';
  if (/^\s*(?:\$\s*)?gcloud\b/m.test(code)) return 'GCP';
  if (/\bkubectl\b/i.test(code)) return 'KUBERNETES';
  return 'MULTICLOUD';
}

export function analyzeCommandSnippet(
  code: string,
  options?: {
    language?: CodeLanguage;
    risk?: CommandRiskLevel;
    provider?: CloudProviderId | string;
  },
): CommandSnippetMetadata {
  const language = detectSnippetLanguage(code, options?.language);
  const risk = classifyCommandRisk(code, options?.risk);
  return {
    language,
    risk,
    riskLabel: getCommandRiskLabel(risk),
    providerBadge: detectProviderBadge(code, options?.provider),
  };
}
