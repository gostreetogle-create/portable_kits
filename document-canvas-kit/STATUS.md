# STATUS — document-canvas-kit

> **v0.2** · 2026-05-30 — table/separator blocks + background image

## Done

- [x] `<dc-document-canvas mode="template|instance" [(blocks)]="blocks" />`
- [x] Text/header blocks: inline edit, align toolbar, add/remove
- [x] Table blocks with `tableItems`, column config, footer total
- [x] Separator blocks with line show/hide
- [x] Background image dropzone (template mode)
- [x] Drag-and-drop reorder via sortable-kit
- [x] `insertPlaceholder()` + `pickerRequested` output
- [x] `provideDocumentCanvasKit(config)` — default blocks
- [x] Demo in `schema-table-kit/demo/pages/document-canvas-kit/`
- [x] Unit tests (normalizeBlockOrder, table helpers)

## v0.2 Roadmap

- [ ] Multi-cell text blocks (split card)
- [ ] `kp-document-text-block-edit` dialog port
- [ ] Editable qty/price in instance mode
- [ ] photo-uploader-kit integration for image blocks
- [ ] Full design controls (colors, borders, font size)
