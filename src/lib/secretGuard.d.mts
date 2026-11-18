export type SecretMatch = {
  id: string;
  label: string;
};

export function detectAccidentalSecrets(input: string): SecretMatch[];
export function hasAccidentalSecrets(input: string): boolean;
