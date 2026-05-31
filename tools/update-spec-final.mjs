/**
 * Final script: update all per-component spec.ts to use createTestFixture from test-utils.
 * Removes filesystem-reading code and inline createComponent functions.
 * Run from project root: node tools/update-spec-final.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const specDirs = [
  'button', 'input', 'dialog', 'select', 'checkbox', 'tag', 'card', 'search',
  'textarea', 'multiselect', 'input-number', 'datepicker', 'password',
  'breadcrumbs', 'tab-group', 'toast', 'confirm-dialog', 'form-field',
  'photo-uploader', 'paginator', 'table',
];

let changed = 0;

for (const dir of specDirs) {
  const relPath = `ui-primeng-kit/src/angular/${dir}/kp-${dir}.component.spec.ts`;
  const filePath = path.join(root, relPath);
  let content;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch {
    console.warn(`  Skipped: ${relPath}`);
    continue;
  }
  const original = content;

  // Extract the component class name
  const compImportMatch = content.match(/import \{ ([^}]+) \} from '\.\/kp-[^']+\.component'/);
  if (!compImportMatch) continue;
  const compNames = compImportMatch[1];
  const mainComp = compNames.split(',').map(s => s.trim()).filter(s => !s.startsWith('type '))[0];
  if (!mainComp) continue;

  // Remove all filesystem-related code (readFileSync, fileURLToPath, dirname, join, __filename, __dirname, _tmpl vars)
  content = content.replace(/import \{ readFileSync \} from 'node:fs';\n/g, '');
  content = content.replace(/import \{ fileURLToPath \} from 'node:url';\n/g, '');
  content = content.replace(/import \{ dirname, join \} from 'node:path';\n/g, '');
  content = content.replace(/const __filename = fileURLToPath\(import\.meta\.url\);\n/g, '');
  content = content.replace(/const __dirname = dirname\(__filename\);\n/g, '');
  content = content.replace(/const _tmpl = readFileSync\(.*?utf8'\);\n/g, '');
  content = content.replace(/const _tmpl = readFileSync\(.*?utf8'\);\n/g, ''); // twice for safety
  
  // Remove any test-utils import from previous scripts
  content = content.replace(/import \{ createComponentAsync \} from '\.\.\/test-utils';\n/g, '');
  content = content.replace(/import \{ createTestFixture \} from '\.\.\/test-utils';\n/g, '');

  // Add import for createTestFixture from test-utils
  // Put it after the vitest import line
  content = content.replace(
    /(from 'vitest';\n)/,
    "$1import { createTestFixture } from '../test-utils';\n"
  );

  // Remove the old async function createComponent block
  // Match from "async function createComponent() {" to the closing "}" before "it("
  content = content.replace(
    /  async function createComponent\(\) \{\n[\s\S]*?\n  \}\n\n/g,
    ''
  );

  // Remove overrideComponent blocks (from previous scripts)
  content = content.replace(
    /  TestBed\.overrideComponent\(\w+,\s*\{[^}]+set:\s*\{[^}]+\}\s*\}\);\n\s*/g,
    ''
  );

  // Replace "const fixture = await createComponent();" with createTestFixture call
  content = content.replace(
    /const fixture = await createComponent\(\);/g,
    `const fixture = createTestFixture(${mainComp});`
  );

  // Also handle any other createComponent() calls
  content = content.replace(/await createComponent\(\)/g, `createTestFixture(${mainComp})`);

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`  Updated: ${relPath}`);
    changed++;
  }
}

console.log(`\nDone. ${changed} files updated.`);
