import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function resolveLocalImport(from_file, specifier) {
  const base = path.resolve(path.dirname(from_file), specifier);
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`, `${base}.mts`, `${base}.mjs`, `${base}.js`]) {
    try {
      readFileSync(candidate);
      return candidate;
    } catch {
      // Try next extension
    }
  }
  throw new Error(`Cannot resolve import "${specifier}" from ${from_file}`);
}

/**
 * Transpiles a small Pure-TS module subgraph from `src/` into a temporary ESM directory
 * so `node --test` can execute real TypeScript domain/router/calculation modules directly.
 */
export async function importTsModule(rel_entry_path) {
  const abs_entry = path.join(ROOT_DIR, rel_entry_path);
  const sandbox = mkdtempSync(path.join(tmpdir(), 'cea-ts-test-'));
  const visited = new Set();

  function emitFile(abs_file) {
    const normalized = path.normalize(abs_file);
    if (visited.has(normalized)) return;
    visited.add(normalized);

    const rel_from_root = path.relative(ROOT_DIR, normalized);
    const raw = readFileSync(normalized, 'utf8');

    if (normalized.endsWith('.json')) {
      const out_json = path.join(sandbox, `${rel_from_root}.mjs`);
      mkdirParent(out_json);
      writeFileSync(out_json, `export default ${raw};\n`, 'utf8');
      return;
    }

    if (normalized.endsWith('.mjs') || normalized.endsWith('.js')) {
      const out_mjs = path.join(sandbox, rel_from_root);
      mkdirParent(out_mjs);
      writeFileSync(out_mjs, raw, 'utf8');
      return;
    }

    const rewritten = raw
      .replace(/(from\s+['"])(\.[^'"]+)(['"])/g, (_full, prefix, spec, suffix) => {
        const target = resolveLocalImport(normalized, spec);
        emitFile(target);
        let rel_target = path.relative(path.dirname(normalized), target).replace(/\\/g, '/');
        if (!rel_target.startsWith('.')) rel_target = `./${rel_target}`;
        if (rel_target.endsWith('.json')) {
          return `${prefix}${rel_target}.mjs${suffix}`;
        }
        const mjs_spec = rel_target.replace(/\.(?:tsx|ts|mts)$/, '.mjs');
        return `${prefix}${mjs_spec}${suffix}`;
      })
      .replace(/(from\s+['"])([^./][^'"]*)(['"])/g, (_full, prefix, spec, suffix) => {
        if (spec.startsWith('node:')) return `${prefix}${spec}${suffix}`;
        return `${prefix}${import.meta.resolve(spec)}${suffix}`;
      });

    const transpiled = ts.transpileModule(rewritten, {
      fileName: normalized,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.ReactJSX,
        jsxImportSource: 'preact',
      },
    });

    const out_rel = rel_from_root.replace(/\.(?:tsx|ts|mts)$/, '.mjs');
    const out_file = path.join(sandbox, out_rel);
    mkdirParent(out_file);
    writeFileSync(out_file, transpiled.outputText, 'utf8');
  }

  function mkdirParent(file_path) {
    const dir = path.dirname(file_path);
    require('node:fs').mkdirSync(dir, { recursive: true });
  }

  try {
    emitFile(abs_entry);
    const entry_mjs = path.join(sandbox, rel_entry_path.replace(/\.(?:tsx|ts|mts)$/, '.mjs'));
    return await import(pathToFileURL(entry_mjs).href);
  } finally {
    setTimeout(() => {
      try {
        rmSync(sandbox, { recursive: true, force: true });
      } catch {
        // Ignore Windows file lock cleanup race
      }
    }, 250);
  }
}
