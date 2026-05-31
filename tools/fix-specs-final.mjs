import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const base = join(root, 'ui-primeng-kit/src/angular');

const dirs = readdirSync(base, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

// Add missing imports per component type
const extraImportsMap = new Map();
extraImportsMap.set('toast', `import { MessageService } from 'primeng/api';`);
extraImportsMap.set('confirm-dialog', `import { ConfirmationService } from 'primeng/api';`);
extraImportsMap.set('breadcrumbs', `import { Router } from '@angular/router';`);
extraImportsMap.set('breadcrumbs', `import { Router } from '@angular/router';`);
extraImportsMap.set('dialog', `import { NoopAnimationsModule } from '@angular/platform-browser/animations';`);

// Extra imports & providers per component
const groupFixes = {
  'toast': {
    addImport: "import { MessageService } from 'primeng/api';",
    testOptions: '{ extraProviders: [MessageService] }',
  },
  'confirm-dialog': {
    addImport: "import { ConfirmationService } from 'primeng/api';",
    testOptions: '{ extraProviders: [ConfirmationService] }',
  },
  'breadcrumbs': {
    addImport: "import { provideRouter } from '@angular/router';",
    testOptions: "{ extraProviders: [provideRouter([])] }",
    // Breadcrumbs spec created new Router() which won't work — will need special handling
  },
  'dialog': {
    addImport: "import { NoopAnimationsModule } from '@angular/platform-browser/animations';",
    testOptions: "{ extraImports: [NoopAnimationsModule] }",
  },
};

let updatedCount = 0;

for (const dir of dirs) {
  const specPath = join(base, dir, `kp-${dir}.component.spec.ts`);
  if (!existsSync(specPath)) continue;

  let content = readFileSync(specPath, 'utf8');
  const original = content;

  // Remove unused TestBed import
  content = content.replace(
    /import \{ TestBed \} from '@angular\/core\/testing';\n/g,
    ''
  );

  // Fix double await
  content = content.replace(/await await createTestFixture/g, 'await createTestFixture');

  // Fix createTestFixture calls to use options format where needed
  const fix = groupFixes[dir];
  if (fix) {
    // Add import
    if (!content.includes(fix.addImport.split("'")[1])) {
      content = content.replace(
        /(import .+ from '.+';)\n/,
        `$1\n${fix.addImport}\n`
      );
    }

    // Fix createTestFixture calls to pass options
    // Match: await createTestFixture(KpXxxComponent)
    // Replace with: await createTestFixture(KpXxxComponent, { extraProviders: [...] })
    const componentName = `Kp${dir.charAt(0).toUpperCase()}${dir.slice(1).replace(/-./g, m => m[1].toUpperCase())}Component`;
    const regex = new RegExp(`(await createTestFixture\\()(${componentName})(\\))`, 'g');
    content = content.replace(regex, `$1$2, ${fix.testOptions}$3`);
  }

  // Fix clean up blank lines
  content = content.replace(/\n{3,}/g, '\n\n');

  if (content !== original) {
    writeFileSync(specPath, content, 'utf8');
    updatedCount++;
    console.log(`✓ ${dir}`);
  }
}

console.log(`\nUpdated ${updatedCount} spec files`);
