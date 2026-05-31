/**
 * Script: update all per-component spec.ts files to use createComponentAsync from test-utils.
 * Run from project root: node tools/update-spec-helper.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const specDirs = [
  'button', 'input', 'dialog', 'select', 'checkbox', 'tag', 'card', 'search',
  'textarea', 'multiselect', 'input-number', 'datepicker', 'password',
  'breadcrumbs', 'tab-group', 'toast', 'confirm-dialog', 'form-field',
  'photo-uploader', 'paginator', 'table',
];

const specFiles = specDirs.map(d => `ui-primeng-kit/src/angular/${d}/kp-${d}.component.spec.ts`);

console.log(`Found ${specFiles.length} spec files`);
let changed = 0;

for (const relPath of specFiles) {
  const filePath = path.join(root, relPath);
  let content;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch {
    console.warn(`  ✗ Not found: ${relPath}`);
    continue;
  }
  const original = content;

  // Determine the number of `../` needed (component is one level deep: ui-primeng-kit/src/angular/{dir}/kp-*.spec.ts)
  const importPath = '../test-utils';

  // Add import if not already there
  if (!content.includes("from '../test-utils'")) {
    content = content.replace(
      "from './kp-",
      `from '../test-utils';\nimport { Kp`
    );
    // Hmm, this won't work cleanly. Let me try a different approach.
  }

  // Restore original for next attempt
  content = original;

  // Better: replace the existing import and function
  
  // Step 1: Extract component class name from the import
  const compMatch = content.match(/import \{ ([^}]+) \} from '\.\/kp-[^']+';/);
  if (!compMatch) {
    console.warn(`  ✗ Cannot find component import in: ${relPath}`);
    continue;
  }
  const compName = compMatch[1];
  // Get just the component class name (may have type exports)
  const classNames = compName.split(',').map(s => s.trim()).filter(s => !s.startsWith('type '));
  const mainComp = classNames[0] || compName;

  // Step 2: Add import for test-utils
  if (!content.includes("from '../test-utils'")) {
    // Add after the existing import block
    content = content.replace(
      /(import .+? from '\.\/kp-.+?';\n)/,
      `$1import { createComponentAsync } from '../test-utils';\n`
    );
  }

  // Step 3: Remove the old createComponent function and replace calls
  // Remove everything from "async function createComponent() {" to just before the next "  it("
  content = content.replace(
    /  async function createComponent\(\) \{\n[\s\S]*?\n  \}\n\n/g,
    ''
  );

  // Step 4: Replace fixture creation with createComponentAsync
  content = content.replace(
    /const fixture = await createComponent\(\);/g,
    `const fixture = await createComponentAsync(${mainComp});`
  );

  // Step 5: For tests that don't use fixture variable (though all current ones do)
  // Also handle leftover calls
  content = content.replace(
    /await createComponent\(\)/g,
    `await createComponentAsync(${mainComp})`
  );

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Updated: ${relPath} (component: ${mainComp})`);
    changed++;
  }
}

console.log(`\nDone. ${changed}/${specFiles.length} files updated.`);
