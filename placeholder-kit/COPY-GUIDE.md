# COPY-GUIDE — placeholder-kit

## Copy в consumer

1. `placeholder-kit/src/` → `packages/placeholder-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: resolvePlaceholders(text, ctx), <ph-placeholder-picker />

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **A**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
