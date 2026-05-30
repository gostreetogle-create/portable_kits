import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..'); // portable_kits root — kit folders напрямую здесь

const GITIGNORE = `node_modules/
dist/
out-tsc/
.angular/
.env
*.log
`;

const kits = [
  {
    name: 'schema-data-table-kit',
    prefix: 'sdt',
    pattern: 'A',
    status: 'planned',
    priority: 'P1',
    universal: 'domain',
    source: 'kp-document-block-editor tables, quotation-editor customTableColumns',
    publicApi: '<sdt-schema-data-table tableKey="..." [rows]="..." />',
    deps: 'schema-table-kit core (types, getFieldValue)',
    kppdfOnly: false,
  },
  {
    name: 'entity-picker-kit',
    prefix: 'ep',
    pattern: 'BD',
    status: 'planned',
    priority: 'P1',
    universal: 'high',
    source: 'shared/ui/kp-product-picker/',
    publicApi: '<ep-entity-picker entityKey="products" [(visible)]="v" (selected)="onPick($event)" />',
    deps: '@angular/core, @angular/forms',
    kppdfOnly: false,
  },
  {
    name: 'document-canvas-kit',
    prefix: 'dc',
    pattern: 'B',
    status: 'planned',
    priority: 'P2',
    universal: 'domain',
    source: 'shared/ui/kp-document-block-editor/, kp-document-text-block-edit/',
    publicApi: '<dc-document-canvas mode="instance|template" [(blocks)]="blocks" />',
    deps: 'native HTML, --dc-* CSS vars',
    kppdfOnly: false,
  },
  {
    name: 'photo-uploader-kit',
    prefix: 'pu',
    pattern: 'B',
    status: 'planned',
    priority: 'P2',
    universal: 'high',
    source: 'shared/ui/kp-photo-uploader.component.ts',
    publicApi: '<pu-photo-uploader [(photos)]="photos" />',
    deps: '@angular/core, @angular/forms only',
    kppdfOnly: false,
  },
  {
    name: 'sortable-kit',
    prefix: 'so',
    pattern: 'B',
    status: 'planned',
    priority: 'P2',
    universal: 'high',
    source: 'shared/ui/kp-sortable/*',
    publicApi: 'soSortableList, soSortableItem, soSortableHandle, moveSortableItems()',
    deps: '@angular/core only, no CDK',
    kppdfOnly: false,
  },
  {
    name: 'placeholder-kit',
    prefix: 'ph',
    pattern: 'A',
    status: 'planned',
    priority: 'P2',
    universal: 'domain',
    source: 'shared/placeholder/, kp-placeholder-picker',
    publicApi: 'resolvePlaceholders(text, ctx), <ph-placeholder-picker />',
    deps: 'core dot-path',
    kppdfOnly: false,
  },
  {
    name: 'crud-page-kit',
    prefix: 'cp',
    pattern: 'D',
    status: 'planned',
    priority: 'P2',
    universal: 'high',
    source: 'shared/crud/kp-crud-page, crud-store, crud-api',
    publicApi: '<cp-crud-page [config]="cfg" />, CrudStore, provideCrudPageKit()',
    deps: 'ui-primeng-kit or native; schema-table-kit for columns (later)',
    kppdfOnly: false,
  },
  {
    name: 'crud-factory-kit',
    prefix: 'cf',
    pattern: 'C',
    status: 'planned',
    priority: 'P2',
    universal: 'high',
    source: 'backend/src/utils/crud-factory.ts',
    publicApi: 'createCrudRouter(model, { permPrefix, ... })',
    deps: 'express, mongoose (peer)',
    kppdfOnly: false,
  },
  {
    name: 'options-resolver-kit',
    prefix: 'or',
    pattern: 'D',
    status: 'planned',
    priority: 'P3',
    universal: 'high',
    source: 'shared/services/*-options.service.ts',
    publicApi: 'provideOptionsResolver(config), OptionsResolver.getOptions(entityKey)',
    deps: '@angular/core, HttpClient optional',
    kppdfOnly: false,
  },
  {
    name: 'ui-primeng-kit',
    prefix: 'ui',
    pattern: 'B',
    status: 'planned',
    priority: 'P3',
    universal: 'high',
    source: 'shared/ui/kp-* (22+ components)',
    publicApi: 'KpButton, KpInput, KpTable, KpDialog, ... barrel export',
    deps: 'primeng, primeicons (peer)',
    kppdfOnly: false,
  },
  {
    name: 'auth-rbac-kit',
    prefix: 'ar',
    pattern: 'CD',
    status: 'planned',
    priority: 'P3',
    universal: 'low',
    source: 'core/permissions.ts, auth guards, backend JWT',
    publicApi: 'provideAuthRbacKit(), hasPermission(), createAuthMiddleware()',
    deps: 'consumer seed roles; extract after crud-factory-kit',
    kppdfOnly: false,
  },
  {
    name: 'eav-kit',
    prefix: 'eav',
    pattern: 'A',
    status: 'planned',
    priority: 'P3',
    universal: 'domain',
    source: 'features/attribute-definitions, EAV in products',
    publicApi: '<eav-attribute-editor entityKey="..." />, EavSchemaProvider',
    deps: 'schema-table-kit, crud-page-kit',
    kppdfOnly: false,
  },
  {
    name: 'quotation-editor',
    prefix: 'qe',
    pattern: 'E',
    status: 'kppdf-only',
    priority: 'P0',
    universal: 'no',
    source: 'features/quotations/quotation-editor.component.ts',
    publicApi: '— не portable kit',
    deps: 'KPPDF product',
    kppdfOnly: true,
  },
  {
    name: 'layout-shell-kit',
    prefix: 'ls',
    pattern: 'E',
    status: 'kppdf-only',
    priority: 'P3',
    universal: 'no',
    source: 'layout/*, menu, kp-breadcrumbs ROUTE_LABELS',
    publicApi: '— не portable kit',
    deps: 'KPPDF IA + RBAC',
    kppdfOnly: true,
  },
];

function hasAngular(p) {
  return !p.includes('C') || p.includes('B') || p.includes('D') || p.includes('A');
}
function hasExpress(p) {
  return p.includes('A') || p.includes('C');
}
function hasCore(p) {
  return p !== 'B' && p !== 'E';
}

function pkgJson(name, desc) {
  return JSON.stringify(
    {
      name,
      version: '0.0.0-scaffold',
      private: true,
      description: desc,
      scripts: {
        test: 'vitest run',
        'test:watch': 'vitest',
      },
      devDependencies: {
        typescript: '~5.9.0',
        vitest: '^3.0.0',
      },
    },
    null,
    2,
  );
}

function readme(k) {
  if (k.kppdfOnly) {
    return `# ${k.name}

**🔒 KPPDF-only — не portable kit**

| | |
|--|--|
| Источник KPPDF | \`${k.source}\` |
| Паттерн | **E** — остаётся в kppdf-3.0 |
| Универсальность | ${k.universal} |

Эту папку **не копируют** в другие проекты. Служит напоминанием в каталоге portable_kits.

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
`;
  }

  return `# ${k.name}

> **Статус:** ${k.status === 'planned' ? '📋 scaffold — реализация не начата' : k.status}  
> **Паттерн упаковки:** **${k.pattern}**  
> **Приоритет:** ${k.priority} · **Универсальность:** ${k.universal}

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | \`${k.source}\` |
| **Public API** | ${k.publicApi} |
| **Зависимости** | ${k.deps} |
| **Префикс** | \`${k.prefix}-\` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **\`${k.name}/src/\`** → \`packages/${k.name}/src/\`

Path alias:

\`\`\`json
"@${k.name}/core": ["packages/${k.name}/src/core/index.ts"],
"@${k.name}/angular": ["packages/${k.name}/src/angular/index.ts"]
\`\`\`

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

\`\`\`bash
cd ${k.name}
# после реализации demo:
npm install && npm start
\`\`\`

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
`;
}

function copyGuide(k) {
  if (k.kppdfOnly) return '';
  return `# COPY-GUIDE — ${k.name}

## Copy в consumer

1. \`${k.name}/src/\` → \`packages/${k.name}/src/\`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: ${k.publicApi}

## Не копировать

- \`demo/\`, \`tests/\`, \`node_modules/\`, scaffold-only files

## Паттерн **${k.pattern}**

| Copy | Папки |
|------|--------|
| Consumer | \`src/\` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
`;
}

function statusMd(k) {
  return `# STATUS — ${k.name}

| Поле | Значение |
|------|----------|
| Статус | ${k.kppdfOnly ? '🔒 kppdf-only' : '📋 scaffold'} |
| Паттерн | ${k.pattern} |
| Приоритет | ${k.priority} |

## TODO (реализация)

- [ ] Перенести логику из KPPDF: \`${k.source}\`
- [ ] Zero import из kppdf-3.0
- [ ] Demo \`npm start\` изолированно
- [ ] Vitest green
- [ ] COPY-GUIDE + INTEGRATION-KPPDF.md
- [ ] Строка в корневом README portable_kits

## KPPDF paths для извлечения

\`\`\`
kppdf-3.0/${k.source.split(',')[0].trim()}
\`\`\`
`;
}

function writeKit(k) {
  const root = join(OUT, k.name);
  if (existsSync(root)) {
    console.log(`skip ${k.name} — already exists`);
    return;
  }
  mkdirSync(root, { recursive: true });

  writeFileSync(join(root, '.gitignore'), GITIGNORE);
  writeFileSync(join(root, 'README.md'), readme(k));
  writeFileSync(join(root, 'STATUS.md'), statusMd(k));

  if (!k.kppdfOnly) {
    writeFileSync(join(root, 'COPY-GUIDE.md'), copyGuide(k));
    writeFileSync(
      join(root, 'QUICKSTART.md'),
      `# QUICKSTART — ${k.name}\n\nScaffold. После реализации: \`npm install && npm start\`.\n`,
    );
    writeFileSync(
      join(root, 'INTEGRATION-KPPDF.md'),
      `# INTEGRATION-KPPDF — ${k.name}\n\nBacklog. Подключать в KPPDF только после ✅ demo + tests.\n\nИсточник: \`${k.source}\`\n`,
    );
    writeFileSync(join(root, 'package.json'), pkgJson(k.name, `Portable kit: ${k.name} (scaffold)`));

    if (hasCore(k.pattern) || k.pattern.includes('D')) {
      mkdirSync(join(root, 'src', 'core'), { recursive: true });
      writeFileSync(
        join(root, 'src', 'core', 'types.ts'),
        `/** TODO: types for ${k.name} — copy/adapt from KPPDF, no imports from kppdf */\nexport {};\n`,
      );
      writeFileSync(
        join(root, 'src', 'core', 'index.ts'),
        `export * from './types';\n`,
      );
    }

    if (k.pattern.includes('B') || k.pattern.includes('D') || k.pattern.includes('A')) {
      mkdirSync(join(root, 'src', 'angular'), { recursive: true });
      writeFileSync(
        join(root, 'src', 'angular', 'index.ts'),
        `/** TODO: ${k.publicApi} */\nexport {};\n`,
      );
    }

    if (hasExpress(k.pattern)) {
      mkdirSync(join(root, 'src', 'express'), { recursive: true });
      writeFileSync(
        join(root, 'src', 'express', 'index.ts'),
        `/** TODO: Express adapter for ${k.name} */\nexport {};\n`,
      );
    }

    const barrel = [];
    if (hasCore(k.pattern) || k.pattern.includes('D')) barrel.push(`export * from './core/index';`);
    if (k.pattern.includes('B') || k.pattern.includes('D') || k.pattern.includes('A'))
      barrel.push(`export * from './angular/index';`);
    if (hasExpress(k.pattern)) barrel.push(`export * from './express/index';`);
    writeFileSync(join(root, 'src', 'index.ts'), `/** Public barrel — ${k.name} */\n${barrel.join('\n')}\n`);

    mkdirSync(join(root, 'demo'), { recursive: true });
    writeFileSync(
      join(root, 'demo', 'README.md'),
      `# Demo — ${k.name}\n\nTODO: isolated Angular demo (no KPPDF).\n`,
    );

    mkdirSync(join(root, 'tests'), { recursive: true });
    writeFileSync(
      join(root, 'tests', 'scaffold.spec.ts'),
      `import { describe, it, expect } from 'vitest';\n\ndescribe('${k.name}', () => {\n  it('scaffold placeholder', () => {\n    expect(true).toBe(true);\n  });\n});\n`,
    );
    writeFileSync(
      join(root, 'vitest.config.ts'),
      `import { defineConfig } from 'vitest/config';\nexport default defineConfig({ test: { include: ['tests/**/*.spec.ts'] } });\n`,
    );
  }
}

mkdirSync(OUT, { recursive: true });

for (const k of kits) {
  writeKit(k);
}

console.log(`Scaffold complete → ${OUT} (kit folders at repo root)`);
