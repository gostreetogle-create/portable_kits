# COPY-GUIDE — sortable-kit

## Copy to consumer

1. `sortable-kit/src/` → `packages/sortable-kit/src/`
2. Path alias in tsconfig consumer
3. Configure (see README)
4. Wire public API: soSortableList, soSortableItem, soSortableHandle, moveSortableItems()

## Do not copy

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Pattern **B**

| Copy | Folders |
|------|---------|
| Consumer | `src/` |

See [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
