# COPY-GUIDE — options-resolver-kit

## Copy в consumer

1. `options-resolver-kit/src/` → `packages/options-resolver-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: provideOptionsResolver(config), OptionsResolver.getOptions(entityKey)

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **D**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
