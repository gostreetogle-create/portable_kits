# COPY-GUIDE — eav-kit

## Copy в consumer

1. `eav-kit/src/` → `packages/eav-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: <eav-attribute-editor entityKey="..." />, EavSchemaProvider

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **A**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
