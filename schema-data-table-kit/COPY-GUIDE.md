# COPY-GUIDE — schema-data-table-kit

## Copy to consumer

1. `schema-data-table-kit/src/` → `packages/schema-data-table-kit/src/`
2. Path alias in tsconfig consumer
3. Configure (see README)
4. Wire public API: <sdt-schema-data-table tableKey="..." [rows]="..." />

## Do not copy

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Pattern **A**

| Copy | Folders |
|------|---------|
| Consumer | `src/` |

See [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
