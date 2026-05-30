# COPY-GUIDE — entity-picker-kit

## Copy в consumer

1. `entity-picker-kit/src/` → `packages/entity-picker-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: <ep-entity-picker entityKey="products" [(visible)]="v" (selected)="onPick($event)" />

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **BD**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
