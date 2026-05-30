# eav-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **A**  
> **Приоритет:** P3 · **Универсальность:** domain

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `features/attribute-definitions, EAV in products` |
| **Public API** | <eav-attribute-editor entityKey="..." />, EavSchemaProvider |
| **Зависимости** | schema-table-kit, crud-page-kit |
| **Префикс** | `eav-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`eav-kit/src/`** → `packages/eav-kit/src/`

Path alias:

```json
"@eav-kit/core": ["packages/eav-kit/src/core/index.ts"],
"@eav-kit/angular": ["packages/eav-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd eav-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
