# schema-data-table-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **A**  
> **Приоритет:** P1 · **Универсальность:** domain

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `kp-document-block-editor tables, quotation-editor customTableColumns` |
| **Public API** | <sdt-schema-data-table tableKey="..." [rows]="..." /> |
| **Зависимости** | schema-table-kit core (types, getFieldValue) |
| **Префикс** | `sdt-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`schema-data-table-kit/src/`** → `packages/schema-data-table-kit/src/`

Path alias:

```json
"@schema-data-table-kit/core": ["packages/schema-data-table-kit/src/core/index.ts"],
"@schema-data-table-kit/angular": ["packages/schema-data-table-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd schema-data-table-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
