// Where the two npm dependencies are loaded from. DAIOps installs them once into
// /opt/pretty-mermaid/node_modules (daiops.yaml), because an employee workspace may have no
// internet when a diagram is rendered. A local `npm install` in the skill folder still works.
import { createRequire } from 'module';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

const CANDIDATES = [
  process.env.PRETTY_MERMAID_MODULES,
  join(skillRoot, 'node_modules'),
  '/opt/pretty-mermaid/node_modules',
].filter(Boolean);

export function modulesRoot() {
  const root = CANDIDATES.find((dir) => existsSync(join(dir, 'beautiful-mermaid', 'package.json')));
  if (!root) {
    console.error(`[pretty-mermaid] Dependencies not found in: ${CANDIDATES.join(', ')}`);
    console.error(`Install them with: npm install --prefix /opt/pretty-mermaid beautiful-mermaid@1.1.3 @resvg/resvg-js@2.6.2`);
    process.exit(1);
  }
  return root;
}

export async function loadBeautifulMermaid() {
  return import(pathToFileURL(join(modulesRoot(), 'beautiful-mermaid', 'dist', 'index.js')).href);
}

export function loadResvg() {
  return createRequire(join(modulesRoot(), 'noop.js'))('@resvg/resvg-js');
}
