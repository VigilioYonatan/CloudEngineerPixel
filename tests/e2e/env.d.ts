/**
 * Minimal Node runtime ambient declarations exclusively for Playwright E2E and Vite/Playwright config files.
 * Kept isolated from `src/` so browser code cannot accidentally reference Node globals.
 */
interface Buffer extends Uint8Array {
  toString(encoding?: 'utf8' | 'hex' | 'base64'): string;
}

declare var Buffer: {
  from(input: string, encoding?: 'utf8' | 'hex' | 'base64'): Buffer;
  from(input: ArrayBuffer | ArrayLike<number>): Buffer;
  isBuffer(value: unknown): value is Buffer;
};

declare var process: {
  readonly env: Readonly<Record<string, string | undefined>>;
};
