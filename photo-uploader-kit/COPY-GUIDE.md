# COPY-GUIDE — photo-uploader-kit

## Copy в consumer

1. `photo-uploader-kit/src/` → `packages/photo-uploader-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: <pu-photo-uploader [(photos)]="photos" />

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **B**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
