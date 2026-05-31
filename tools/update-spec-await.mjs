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

  // Replace all "const fixture = createTestFixture(" with "const fixture = await createTestFixture("
  content = content.replace(
    /const fixture = createTestFixture\(/g,
    'const fixture = await createTestFixture('
  );

  // Catch any non-fixture assignment calls (shouldn't exist in our files, but just in case)
  content = content.replace(
    /(?<!const fixture = )createTestFixture\(/g,
    'await createTestFixture('
  );

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`  Updated: ${relPath}`);
    changed++;
  }
}

console.log(`\nDone. ${changed} files updated.`);
