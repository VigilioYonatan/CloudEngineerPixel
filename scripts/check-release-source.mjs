/** Node-only static checks: runnable before npm dependencies are installed. */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(root, rel), 'utf8');

const errors = [];
const cases = [...read('src/data/senior.ts').matchAll(/id:\s*['"](s\d\d)['"]/g)].map((m) => m[1]);
const diagnostics = [
  ...read('src/data/seniorDiagnostics.ts').matchAll(/^\s*(s\d\d):\s*\{/gm),
].map((m) => m[1]);
const providers = ['aws', 'azure', 'gcp'];
const playbooks = [...read('src/data/seniorPlaybooks.ts').matchAll(/^\s*(s\d\d):\s*\{/gm)].map(
  (m) => m[1],
);

if (playbooks.length !== 18 || playbooks.join(',') !== cases.join(',')) {
  errors.push('Playbooks do not correspond to 18 Senior incidents');
}
if (cases.length !== 18 || new Set(cases).size !== 18) {
  errors.push('Expected 18 unique Senior incidents');
}
if (diagnostics.length !== 18 || diagnostics.join(',') !== cases.join(',')) {
  errors.push('Diagnostic cases do not correspond to Senior incidents');
}

for (const cloud of providers) {
  const mascot = {
    aws: 'cloud-mentor-original.jpg',
    azure: 'cloud-mentor-azure.png',
    gcp: 'cloud-mentor-gcp.png',
  }[cloud];
  if (!existsSync(join(root, 'public/assets', mascot))) {
    errors.push(`Missing ${cloud} mascot`);
  }
  for (const id of cases) {
    for (const folder of [`labs/senior/providers/${cloud}`, `public/senior-guides/${cloud}`]) {
      const filename = join(root, folder, `${id}.md`);
      if (!existsSync(filename) || statSync(filename).size < 400) {
        errors.push(`Missing/incomplete workbook: ${folder}/${id}.md`);
      }
    }
  }
}

function collectSourceFiles(abs_dir) {
  return readdirSync(abs_dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(abs_dir, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(full);
    return ['.ts', '.tsx', '.mts', '.mjs', '.js'].includes(extname(entry.name))
      ? [relative(root, full).replace(/\\/g, '/')]
      : [];
  });
}

// Validate local source references across all modules in src/ without needing a bundler installed.
const source_files = collectSourceFiles(join(root, 'src'));
for (const rel of source_files) {
  for (const match of read(rel).matchAll(/from\s+['"](\.[^'"\n]+)['"]/g)) {
    const target = resolve(root, dirname(rel), match[1]);
    const candidates = [
      target,
      `${target}.ts`,
      `${target}.tsx`,
      `${target}.mts`,
      `${target}.mjs`,
      `${target}.js`,
    ];
    if (!candidates.some(existsSync)) {
      errors.push(`Unresolved source import ${rel}: ${match[1]}`);
    }
  }
}

if (errors.length) {
  errors.forEach((x) => console.error(x));
  process.exit(1);
}
console.log(
  `Source graph valid: ${source_files.length} src modules, ${cases.length} incidents, ${diagnostics.length} diagnoses, ${playbooks.length} playbooks, ${cases.length * providers.length} provider notebooks, 3 mascots.`,
);
