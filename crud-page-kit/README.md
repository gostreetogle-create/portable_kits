# crud-page-kit

> **Status:** ✅ v0.1  
> **Packaging pattern:** **D**  
> **Priority:** P2 · **Universality:** high

## Purpose

Generic CRUD page shell: CrudStore, list component, inline create/edit, permission hooks.

| | |
|--|--|
| **KPPDF source** | `shared/crud/kp-crud-page`, crud-store, crud-api |
| **Public API** | `<cp-crud-page [store]="store" [config]="cfg" />`, `CrudStore`, `provideCrudPageKit()` |
| **Dependencies** | ui-primeng-kit or native; schema-table-kit for columns (future) |
| **Prefix** | `cp-` (components / CSS vars) |

## Packaging (consumer)

Copy **`crud-page-kit/src/`** → `packages/crud-page-kit/src/`

Path alias:

```json
"@crud-page-kit/core": ["packages/crud-page-kit/src/core/index.ts"],
"@crud-page-kit/angular": ["packages/crud-page-kit/src/angular/index.ts"]
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
