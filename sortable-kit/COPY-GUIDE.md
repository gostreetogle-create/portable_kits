# COPY-GUIDE — sortable-kit

## Copy в consumer

1. `sortable-kit/src/` → `packages/sortable-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: soSortableList, soSortableItem, soSortableHandle, moveSortableItems()

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **B**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
