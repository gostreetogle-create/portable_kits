# COPY-GUIDE — document-canvas-kit

## Copy в consumer

1. `document-canvas-kit/src/` → `packages/document-canvas-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: <dc-document-canvas mode="instance|template" [(blocks)]="blocks" />

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **B**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
