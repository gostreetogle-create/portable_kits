/**
 * Script: update all per-component spec.ts to use TestBed.overrideComponent
 * with template read from filesystem (+ empty styles).
 * Run from project root: node tools/update-spec-override.mjs
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
    console.warn(`  ✗ Not found: ${relPath}`);
    continue;
  }
  const original = content;

  // Extract the component class name(s) from imports
  const compImportMatch = content.match(/import \{ ([^}]+) \} from '\.\/kp-[^']+\.component'/);
  if (!compImportMatch) {
    console.warn(`  ✗ Cannot find component import in: ${relPath}`);
    continue;
  }
  const compNames = compImportMatch[1];
  // Get the first non-type name (main component class)
  const mainComp = compNames.split(',').map(s => s.trim()).filter(s => !s.startsWith('type '))[0];

  if (!mainComp) {
    console.warn(`  ✗ Cannot extract component name from: ${compNames}`);
    continue;
  }

  // Steps:

  // 1) Replace import for readFileSync + add path/url imports
  // Remove old readFileSync import if exists
  content = content.replace(/import \{ readFileSync \} from 'node:fs';\n/g, '');
  content = content.replace(/import \{ readFileSync, fileURLToPath \} from 'node:(url|fs)';\n/g, '');

  // Add combined imports at the top
  const importBlock = `import { readFileSync } from 'node:fs';\nimport { fileURLToPath } from 'node:url';\nimport { dirname, join } from 'node:path';\n`;
  if (!content.includes("from 'node:path'")) {
    content = content.replace(
      /(import .+ from 'vitest')/,
      `${importBlock}$1`
    );
  }

  // 2) Add template constant after imports, before describe
  const templateVar = `_tmpl`;
  const templateLine = `\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = dirname(__filename);\nconst ${templateVar} = readFileSync(join(__dirname, './kp-${dir}.component.html'), 'utf8');\n`;

  if (!content.includes(templateVar)) {
    content = content.replace(
      /(describe\('Kp\w+')/,
      `${templateLine}$1`
    );
  }

  // 3) Add TestBed.overrideComponent before compileComponents
  const overrideBlock = `  TestBed.overrideComponent(${mainComp}, {\n      set: { template: ${templateVar}, styles: [''], templateUrl: undefined, styleUrl: undefined }\n    });\n    `;

  content = content.replace(
    /await TestBed\.compileComponents\(\);/,
    `${overrideBlock}await TestBed.compileComponents();`
  );

  // 4) Clean up: remove any leftover test-utils imports  
  content = content.replace(/import \{ createComponentAsync \} from '\.\.\/test-utils';\n/g, '');

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Updated: ${relPath} (component: ${mainComp})`);
    changed++;
  }
}

console.log(`\nDone. ${changed} files updated.`);
