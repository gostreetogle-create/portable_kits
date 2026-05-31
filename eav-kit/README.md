# eav-kit

> **Status:** ✅ v0.1  
> **Packaging pattern:** **A**  
> **Priority:** P3 · **Universality:** domain

## Purpose

Entity-Attribute-Value attribute definition editor component.

| | |
|--|--|
| **KPPDF source** | `features/attribute-definitions`, EAV in products |
| **Public API** | `<eav-attribute-editor entityKey="..." />`, `provideEavKit()` |
| **Dependencies** | schema-table-kit (future), crud-page-kit (future) |
| **Prefix** | `eav-` (components / CSS vars) |

## Packaging (consumer)

Copy **`eav-kit/src/`** → `packages/eav-kit/src/`

Path alias:

```json
"@eav-kit/core": ["packages/eav-kit/src/core/index.ts"],
"@eav-kit/angular": ["packages/eav-kit/src/angular/index.ts"]
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
