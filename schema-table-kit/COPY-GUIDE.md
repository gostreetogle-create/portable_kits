# COPY-GUIDE — что переносить в новый проект

Kit живёт в repo **portable-kits** → `portable-kits/schema-table-kit/`.  
В production-проект (KPPDF или другой) переносится **не вся папка и не весь repo**, а только **`src/`** + свой config.

---

## Две зоны

```
portable-kits/                      ← git repo (оглавление)
└── schema-table-kit/
    ├── src/                        ← ★ КОПИРУЕТЕ в consumer
    ├── README.md, CONCEPTS.md      ← опционально (справка)
    ├── demo/                       ← НЕ копируете
    ├── demo-server/                ← НЕ копируете
    ├── tests/                      ← НЕ копируете
    └── package.json                ← НЕ копируете (у consumer свой)
```

---

## Что именно копировать

### Минимум (обязательно)

Скопируйте папку **`src/`** целиком:

```
src/
├── core/       — types, validation (без Angular)
├── angular/    — st-schema-column-builder, provideSchemaTableKit()
├── express/    — createSchemaRouter() (если есть Express backend)
└── index.ts    — barrel (optional)
```

**Куда положить в consumer-проекте** — на выбор:

| Вариант | Путь в новом проекте |
|---------|----------------------|
| Copy folder | `packages/schema-table-kit/src/` |
| Git submodule | `libs/schema-table-kit/src/` |
| Monorepo Nx | `libs/schema-table-kit/src/` |

### Создаёте сами в consumer (не копируете из demo)

| Файл | Где в consumer | Зачем |
|------|----------------|-------|
| **`schema-tables.config.ts`** | `src/app/schema-tables.config.ts` | Ваши entities: products, orders, … |
| Форма с builder | ваша страница (напр. `document-table-types-page`) | key, label + `<st-schema-column-builder>` |

Demo `mock-data/schema-tables.config.ts` — **образец**, не копируйте как есть в KPPDF. Возьмите структуру, заполните своими коллекциями.

---

## Подключение — по шагам

### 1. Скопировать `src/`

```bash
# из clone portable-kits
cp -r portable-kits/schema-table-kit/src  ./packages/schema-table-kit/src

# или git submodule:
# git submodule add <repo-url> packages/portable-kits
# copy from packages/portable-kits/schema-table-kit/src
```

### 2. Path alias в `tsconfig.json` consumer

```json
{
  "compilerOptions": {
    "paths": {
      "@schema-table-kit/core": ["packages/schema-table-kit/src/core/index.ts"],
      "@schema-table-kit/angular": ["packages/schema-table-kit/src/angular/index.ts"],
      "@schema-table-kit/express": ["packages/schema-table-kit/src/express/index.ts"]
    }
  }
}
```

Пути подставьте под свою структуру папок.

### 3. Config проекта

```typescript
// src/app/schema-tables.config.ts
import type { SchemaTableKitConfig } from '@schema-table-kit/core';

export const SCHEMA_TABLES_CONFIG: SchemaTableKitConfig = {
  provider: 'static',   // или 'http' — см. ниже
  entities: [
    {
      key: 'products',
      label: 'Товары',
      apiPath: '/products',
      schemaVersion: '1.0.0',
      fields: [
        { field: 'sku', label: 'Артикул', type: 'text' },
        { field: 'name', label: 'Наименование', type: 'text' },
        // … все поля вашей коллекции
        { field: '_id', label: 'ID', selectable: false },
      ],
    },
    // orders, counterparties — по мере необходимости
  ],
};
```

### 4. Angular — `app.config.ts`

```typescript
import { provideSchemaTableKit } from '@schema-table-kit/angular';
import { SCHEMA_TABLES_CONFIG } from './schema-tables.config';

export const appConfig = {
  providers: [
    provideSchemaTableKit(SCHEMA_TABLES_CONFIG),
    // … остальные providers
  ],
};
```

### 5. Angular — форма (ваша страница)

```typescript
import { SchemaColumnBuilderComponent } from '@schema-table-kit/angular';

@Component({
  imports: [ReactiveFormsModule, SchemaColumnBuilderComponent],
  // …
})
```

```html
<form [formGroup]="form">
  <input formControlName="key" placeholder="Код таблицы" />
  <input formControlName="label" placeholder="Название" />

  <st-schema-column-builder formControlName="builder" />
</form>
```

Поля `key` и `label` — **ваша форма**, не часть kit.

### 6. Express backend (optional)

Если FE в режиме `provider: 'http'`:

```typescript
import { createSchemaRouter } from '@schema-table-kit/express';
import { SCHEMA_TABLES_CONFIG } from './schema-tables.config';

app.use(
  '/api/v1/schema',
  authMiddleware,                    // ваш RBAC
  createSchemaRouter(SCHEMA_TABLES_CONFIG),
);
```

Тот же `SCHEMA_TABLES_CONFIG` — **один config** на FE и BE.

---

## Static vs HTTP в consumer

| Режим | Когда | Config |
|-------|-------|--------|
| **static** | Config в коде FE, без schema API | `provider: 'static', entities: [...]` |
| **http** | Config на backend, FE тянет по API | `provider: 'http', schemaApiUrl: '/api/v1/schema'` |

Для KPPDF логичнее **http** + `createSchemaRouter` на backend (config не дублировать в bundle).

---

## Чеклист после копирования

- [ ] Скопирован только `src/` (не demo, не node_modules)
- [ ] Path alias в tsconfig
- [ ] Свой `schema-tables.config.ts` с entities проекта
- [ ] `provideSchemaTableKit()` в app.config
- [ ] `<st-schema-column-builder>` в нужной форме
- [ ] (optional) `createSchemaRouter` на Express
- [ ] `ng build` проходит без ошибок

---

## Что НЕ нужно делать

- ❌ Копировать весь repo `portable-kits/` или папку kit с demo в consumer
- ❌ Копировать компонент builder под каждую сущность
- ❌ Публиковать в npm (v1 — copy / submodule)
- ❌ Тянуть `demo/` в production-проект

---

## Обновление kit в consumer

Когда kit доработали в отдельном repo:

1. Замените `packages/schema-table-kit/src/` новой версией `src/`
2. Проверьте `schema-tables.config.ts` (новые поля / schemaVersion)
3. `ng build` + smoke на форме с builder

Config consumer **не перезаписывается** — только библиотека.

---

## См. также

- [CONCEPTS.md](./CONCEPTS.md) — зачем один builder, config vs TableDefinition
- [INTEGRATION-KPPDF.md](./INTEGRATION-KPPDF.md) — конкретно для KPPDF
- [QUICKSTART.md](./QUICKSTART.md) — как гонять demo при разработке kit
