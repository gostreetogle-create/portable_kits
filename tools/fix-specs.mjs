import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const componentsDir = join(root, 'ui-primeng-kit/src/angular');

const dirs = readdirSync(componentsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let updatedCount = 0;

for (const dir of dirs) {
  const specPath = join(componentsDir, dir, `kp-${dir}.component.spec.ts`);
  if (!existsSync(specPath)) continue;

  let content = readFileSync(specPath, 'utf8');
  const original = content;

  // 1. Remove unused TestBed import (only if createTestFixture is used)
  content = content.replace(
    /import \{ TestBed \} from '@angular\/core\/testing';\n/g,
    ''
  );

  // 2. Fix double await → single await
  content = content.replace(/await await createTestFixture/g, 'await createTestFixture');

  // 3. Fix double blank lines
  content = content.replace(/\n{3,}/g, '\n\n');

  if (content !== original) {
    writeFileSync(specPath, content, 'utf8');
    updatedCount++;
    console.log(`✓ ${dir}/kp-${dir}.component.spec.ts`);
  }
}

console.log(`\nUpdated ${updatedCount} spec files`);
