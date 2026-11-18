import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

export const INITIAL_JS_GZIP_BUDGET_BYTES = 60 * 1024;
export const INITIAL_CSS_GZIP_BUDGET_BYTES = 32 * 1024;

export function verifyBundleBudget(distDir = DIST_DIR) {
  const indexHtmlPath = path.join(distDir, 'index.html');
  const headersPath = path.join(distDir, '_headers');
  if (!existsSync(indexHtmlPath)) {
    throw new Error('dist/index.html missing — run npm run build before bundle:budget');
  }
  if (!existsSync(headersPath)) {
    throw new Error('dist/_headers missing from build output');
  }

  const headersRaw = readFileSync(headersPath, 'utf8');
  for (const requiredHeader of [
    'Strict-Transport-Security:',
    'Cross-Origin-Opener-Policy: same-origin',
    'Content-Security-Policy:',
  ]) {
    if (!headersRaw.includes(requiredHeader)) {
      throw new Error(`dist/_headers missing required directive: ${requiredHeader}`);
    }
  }
  if (headersRaw.includes('fonts.googleapis.com') || headersRaw.includes('fonts.gstatic.com')) {
    throw new Error('dist/_headers must not allow external Google Fonts CDNs');
  }

  const assetFiles = readdirSync(path.join(distDir, 'assets'));
  const entryJs = assetFiles.find((f) => /^index-[A-Za-z0-9_-]+\.js$/.test(f));
  const entryCss = assetFiles.find((f) => /^index-[A-Za-z0-9_-]+\.css$/.test(f));
  if (!entryJs || !entryCss) {
    throw new Error('Could not locate entry index-*.js or index-*.css in dist/assets');
  }

  const jsGzipBytes = gzipSync(readFileSync(path.join(distDir, 'assets', entryJs))).length;
  const cssGzipBytes = gzipSync(readFileSync(path.join(distDir, 'assets', entryCss))).length;

  if (jsGzipBytes > INITIAL_JS_GZIP_BUDGET_BYTES) {
    throw new Error(
      `Initial JS entry ${entryJs} is ${jsGzipBytes} B gzipped (budget <= ${INITIAL_JS_GZIP_BUDGET_BYTES} B)`,
    );
  }
  if (cssGzipBytes > INITIAL_CSS_GZIP_BUDGET_BYTES) {
    throw new Error(
      `Initial CSS ${entryCss} is ${cssGzipBytes} B gzipped (budget <= ${INITIAL_CSS_GZIP_BUDGET_BYTES} B)`,
    );
  }

  return { entryJs, jsGzipBytes, entryCss, cssGzipBytes };
}

const isCli =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const res = verifyBundleBudget();
  console.log(
    `Bundle budget PASS: ${res.entryJs} = ${(res.jsGzipBytes / 1024).toFixed(2)} KB gzip (<= 60 KB), ${res.entryCss} = ${(res.cssGzipBytes / 1024).toFixed(2)} KB gzip (<= 32 KB)`,
  );
}
