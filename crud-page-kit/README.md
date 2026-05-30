# crud-page-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **D**  
> **Приоритет:** P2 · **Универсальность:** high

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `shared/crud/kp-crud-page, crud-store, crud-api` |
| **Public API** | <cp-crud-page [config]="cfg" />, CrudStore, provideCrudPageKit() |
| **Зависимости** | ui-primeng-kit or native; schema-table-kit for columns (later) |
| **Префикс** | `cp-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`crud-page-kit/src/`** → `packages/crud-page-kit/src/`

Path alias:

```json
"@crud-page-kit/core": ["packages/crud-page-kit/src/core/index.ts"],
"@crud-page-kit/angular": ["packages/crud-page-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd crud-page-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
