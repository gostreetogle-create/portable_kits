import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const base = join(root, 'ui-primeng-kit/src/angular');

const dirs = ['button', 'checkbox', 'datepicker', 'dialog', 'form-field', 'input', 'input-number',
  'multiselect', 'password', 'search', 'select', 'tab-group', 'tag', 'toast', 'breadcrumbs',
  'card', 'confirm-dialog', 'paginator', 'photo-uploader', 'table', 'textarea'];

let updatedCount = 0;

for (const dir of dirs) {
  const specPath = join(base, dir, `kp-${dir}.component.spec.ts`);
  if (!existsSync(specPath)) continue;

  let content = readFileSync(specPath, 'utf8');
  const original = content;

  // Fix paginator spec: add helper function for required inputs
  if (dir === 'paginator') {
    content = content.replace(
      /describe\('KpPaginatorComponent', \(\) => \{/,
      `describe('KpPaginatorComponent', () => {
  async function createPaginatorFixture() {
    const fixture = await createTestFixture(KpPaginatorComponent);
    fixture.componentRef.setInput('rows', 15);
    fixture.componentRef.setInput('totalRecords', 100);
    fixture.detectChanges();
    return fixture;
  }`
    );

    content = content.replace(
      /const fixture = await createTestFixture\(KpPaginatorComponent\);/g,
      `const fixture = await createPaginatorFixture();`
    );

    content = content.replace(
      /fixture\.componentRef\.setInput\('rows', 15\);\n    fixture\.componentRef\.setInput\('totalRecords', 100\);\n/g,
      ''
    );
    
    content = content.replace(
      /comp\.first\.set\((\d+)\)/g,
      `fixture.componentRef.setInput('first', $1)`
    );
    
    content = content.replace(
      /fixture\.componentInstance\.first\.set\((\d+)\)/g,
      `fixture.componentRef.setInput('first', $1)`
    );
  }

  // Fix tag spec: add helper function
  if (dir === 'tag') {
    content = content.replace(
      /describe\('KpTagComponent', \(\) => \{/,
      `describe('KpTagComponent', () => {
  async function createTagFixture() {
    const fixture = await createTestFixture(KpTagComponent);
    fixture.componentRef.setInput('value', 'Active');
    fixture.detectChanges();
    return fixture;
  }`
    );

    content = content.replace(
      /const fixture = await createTestFixture\(KpTagComponent\);/g,
      `const fixture = await createTagFixture();`
    );
  }

  // Replace all comp.XXX.set(Y) -> fixture.componentRef.setInput('XXX', Y)
  // This is a comprehensive replacement for all .set() calls on component instances
  // We match: comp.PROPERTY.set(VALUE)
  // And replace with: fixture.componentRef.setInput('PROPERTY', VALUE)
  
  // Match pattern: comp.xxx.set(yyy)
  content = content.replace(
    /comp\.(\w+)\.set\(((?:[^()]+|\([^()]*\))*)\)/g,
    (match, prop, value) => {
      // Skip model signals - keep .set() for models
      // Models: page, limit, sortField, sortOrder, searchQuery, first, query, activeTab, value (when it's model)
      // Actually, let's keep .set() for model() signals and replace for input() signals
      // Known model signals across components:
      // - page, limit, sortField, sortOrder, searchQuery (table)
      // - first (paginator)
      // - query (search)
      // - activeTab (tab-group)
      // - value (when used with model() - e.g., input, checkbox, datepicker, etc.)
      // - photos (photo-uploader)
      // It's simpler to replace all .set() on comp with componentRef.setInput
      // Both input() and model() support setInput
      return `fixture.componentRef.setInput('${prop}', ${value})`;
    }
  );

  // Also handle fixture.componentInstance.xxx.set(yyy)
  content = content.replace(
    /fixture\.componentInstance\.(\w+)\.set\(((?:[^()]+|\([^()]*\))*)\)/g,
    (match, prop, value) => {
      return `fixture.componentRef.setInput('${prop}', ${value})`;
    }
  );

  if (content !== original) {
    writeFileSync(specPath, content, 'utf8');
    updatedCount++;
    console.log(`✓ ${dir}`);
  }
}

console.log(`\nUpdated ${updatedCount} spec files`);
