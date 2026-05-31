# COPY-GUIDE — options-resolver-kit

## Copy to consumer

1. `options-resolver-kit/src/` → `packages/options-resolver-kit/src/`
2. Path alias in tsconfig consumer
3. Configure (see README)
4. Wire public API: provideOptionsResolver(config), OptionsResolver.getOptions(entityKey)

## Do not copy

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Pattern **D**

| Copy | Folders |
|------|---------|
| Consumer | `src/` |

See [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
