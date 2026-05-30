# COPY-GUIDE — ui-primeng-kit

## Copy в consumer

1. `ui-primeng-kit/src/` → `packages/ui-primeng-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: KpButton, KpInput, KpTable, KpDialog, ... barrel export

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **B**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
