# COPY-GUIDE — placeholder-kit

## Copy to consumer

1. `placeholder-kit/src/` → `packages/placeholder-kit/src/`
2. Path alias in tsconfig consumer
3. Configure (see README)
4. Wire public API: resolvePlaceholders(text, ctx), <ph-placeholder-picker />

## Do not copy

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Pattern **A**

| Copy | Folders |
|------|---------|
| Consumer | `src/` |

See [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
