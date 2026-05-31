# COPY-GUIDE — entity-picker-kit

## Copy to consumer

1. `entity-picker-kit/src/` → `packages/entity-picker-kit/src/`
2. Path alias in tsconfig consumer
3. Configure (see README)
4. Wire public API: <ep-entity-picker entityKey="products" [(visible)]="v" (selected)="onPick($event)" />

## Do not copy

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Pattern **BD**

| Copy | Folders |
|------|---------|
| Consumer | `src/` |

See [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
