# crud-factory-kit

> **Status:** ✅ v0.1 — ported from KPPDF  
> **Packaging pattern:** **C**  
> **Priority:** P1 · **Universality:** high

## Purpose

Express CRUD router from Mongoose model.

| | |
|--|--|
| **KPPDF source** | `backend/src/utils/crud-factory.ts` |
| **Public API** | `createCrudRouter(model, { permPrefix, ... })` |
| **Dependencies** | express, mongoose (peer) |
| **Prefix** | `cf-` |

## Packaging (consumer)

Copy **`crud-factory-kit/src/`** → `packages/crud-factory-kit/src/`

Path alias:

```json
"@crud-factory-kit/core": ["packages/crud-factory-kit/src/core/index.ts"],
"@crud-factory-kit/express": ["packages/crud-factory-kit/src/express/index.ts"]
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
