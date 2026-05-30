# schema-data-table-kit

> **Статус:** ✅ v0.1 — ported from KPPDF (new component)  
> **Паттерн упаковки:** **A**  
> **Приоритет:** P1 · **Универсальность:** domain

## Назначение

Таблица данных по schema-table config (plain HTML v0.1).

| | |
|--|--|
| **Источник KPPDF** | inline `kp-table` + column config |
| **Public API** | `<sdt-schema-data-table [columns]="..." [rows]="..." />` |
| **Зависимости** | schema-table-kit core (`getFieldValue`) |
| **Префикс** | `sdt-` |

## Упаковка (consumer)

Copy **`schema-data-table-kit/src/`** → `packages/schema-data-table-kit/src/`

Path alias:

```json
"@schema-data-table-kit/core": ["packages/schema-data-table-kit/src/core/index.ts"],
"@schema-data-table-kit/angular": ["packages/schema-data-table-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

Demo и тесты через hub `schema-table-kit`:

```bash
cd schema-table-kit
npm test
ng serve demo --port 4201
```

См. [STATUS.md](./STATUS.md)
