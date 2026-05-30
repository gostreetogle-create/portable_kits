# COPY-GUIDE — crud-factory-kit

## Copy в consumer

1. `crud-factory-kit/src/` → `packages/crud-factory-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: createCrudRouter(model, { permPrefix, ... })

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **C**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
