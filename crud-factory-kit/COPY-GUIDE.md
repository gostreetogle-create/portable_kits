# COPY-GUIDE — crud-factory-kit

## Copy to consumer

1. `crud-factory-kit/src/` → `packages/crud-factory-kit/src/`
2. Path alias in tsconfig consumer
3. Configure (see README)
4. Wire public API: createCrudRouter(model, { permPrefix, ... })

## Do not copy

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Pattern **C**

| Copy | Folders |
|------|---------|
| Consumer | `src/` |

See [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
