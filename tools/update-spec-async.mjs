/**
 * Script: update all per-component spec.ts files to use async createComponent + compileComponents.
 * Run from project root: node tools/update-spec-async.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Manually list all spec files
const specDirs = [
  'button', 'input', 'dialog', 'select', 'checkbox', 'tag', 'card', 'search',
  'textarea', 'multiselect', 'input-number', 'datepicker', 'password',
  'breadcrumbs', 'tab-group', 'toast', 'confirm-dialog', 'form-field',
  'photo-uploader', 'paginator', 'table',
];

const specFiles = specDirs.map(d => `ui-primeng-kit/src/angular/${d}/kp-${d}.component.spec.ts`);
// Special case: the spec file name doesn't always match the dir name
// Let me also add the non-standard ones if needed
// Actually all our specs follow the pattern kp-{dir}.component.spec.ts where dir matches

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

  // 1. Make createComponent async and add compileComponents
  // Pattern: function createComponent() { ... TestBed.configureTestingModule(...); ... }
  content = content.replace(
    /(function createComponent\(\) \{\n)([\s\S]*?)(  \})/g,
    (match, p1, body, p3) => {
      const newBody = body.replace(
        /(TestBed\.configureTestingModule\([^;]+?\);)/,
        '$1\n    await TestBed.compileComponents();'
      );
      return 'async ' + p1 + newBody + p3;
    }
  );

  // 2. Change it() handlers to async and add await to createComponent()
  content = content.replace(
    /it\s*\(\s*'([^']*?)'\s*,\s*\(\s*\)\s*=>\s*\{/g,
    "it('$1', async () => {"
  );

  content = content.replace(
    /const fixture = createComponent\(\);/g,
    'const fixture = await createComponent();'
  );

  // Handle the case where there's no fixture variable but createComponent is called
  // e.g., expect(createComponent().componentInstance).toBeTruthy()
  // But our tests all use fixture pattern

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Updated: ${relPath}`);
    changed++;
  }
}

console.log(`\nDone. ${changed}/${specFiles.length} files updated.`);
