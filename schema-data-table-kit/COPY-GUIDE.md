# COPY-GUIDE — schema-data-table-kit

## Copy в consumer

1. `schema-data-table-kit/src/` → `packages/schema-data-table-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: <sdt-schema-data-table tableKey="..." [rows]="..." />

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **A**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
