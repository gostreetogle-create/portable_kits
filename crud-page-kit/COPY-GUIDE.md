# COPY-GUIDE — crud-page-kit

## Copy в consumer

1. `crud-page-kit/src/` → `packages/crud-page-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: <cp-crud-page [config]="cfg" />, CrudStore, provideCrudPageKit()

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **D**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
