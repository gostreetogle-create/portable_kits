# COPY-GUIDE — quotation-editor

## Copy to consumer

1. `quotation-editor/src/` → `packages/quotation-editor/src/`
2. Path alias in tsconfig consumer
3. Configure (see README)
4. Wire public API: <qe-quotation-editor [(blocks)]="..." />, provideQuotationEditorKit()

## Dependencies (also copy)

- document-canvas-kit
- entity-picker-kit
- placeholder-kit
- sortable-kit

## Do not copy

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Pattern **B**

| Copy | Folders |
|------|---------|
| Consumer | `src/` |

See [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
