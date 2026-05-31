# schema-data-table-kit

> **Статус:** ✅ v0.1 — ported from KPPDF (new component)  
> **Паттерн упаковки:** **A**  
> **Приоритет:** P1 · **Универсальность:** domain

## Purpose

Data table component using column config (plain HTML v0.1, no PrimeNG dependency).

| | |
|--|--|
| **KPPDF source** | inline `kp-table` + column config |
| **Public API** | `<sdt-schema-data-table [columns]="..." [rows]="..." />` |
| **Dependencies** | `@angular/core`, `@angular/forms` only |
| **Prefix** | `sdt-` |

## Packaging (consumer)

Copy **`schema-data-table-kit/src/`** → `packages/schema-data-table-kit/src/`

Path alias:

```json
"@schema-data-table-kit/core": ["packages/schema-data-table-kit/src/core/index.ts"],
"@schema-data-table-kit/angular": ["packages/schema-data-table-kit/src/angular/index.ts"]
```

Details: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Development

Demo and tests via `schema-table-kit` hub:

```bash
cd schema-table-kit
npm test
ng serve demo --port 4201
```

See [STATUS.md](./STATUS.md)
