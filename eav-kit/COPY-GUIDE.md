# COPY-GUIDE — eav-kit

## Copy to consumer

1. `eav-kit/src/` → `packages/eav-kit/src/`
2. Path alias in tsconfig consumer
3. Configure (see README)
4. Wire public API: <eav-attribute-editor entityKey="..." />, EavSchemaProvider

## Do not copy

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Pattern **A**

| Copy | Folders |
|------|---------|
| Consumer | `src/` |

See [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
