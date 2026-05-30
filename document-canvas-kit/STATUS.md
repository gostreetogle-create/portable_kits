# STATUS — document-canvas-kit

> **v0.1** · ported 2026-05-30 from KPPDF `kp-document-block-editor` (minimal: text blocks + sortable)

## Done

- [x] `<dc-document-canvas mode="template|instance" [(blocks)]="blocks" />`
- [x] Text/header blocks: inline edit, align toolbar, add/remove
- [x] Drag-and-drop reorder via sortable-kit
- [x] `insertPlaceholder()` + `placeholderRequested` output (works with placeholder-kit picker)
- [x] `provideDocumentCanvasKit(config)` — default blocks
- [x] Demo in `schema-table-kit/demo/pages/document-canvas-kit/`
- [x] Unit tests (`normalizeBlockOrder`)

## Notes

- KPPDF full editor is ~870 lines + tables, separators, background, PrimeNG controls.
- v0.1 intentionally scoped to text blocks + sortable; tables/photos deferred.

## Next

- [ ] Table blocks + `TableItem` rows (from KPPDF types)
- [ ] Separator blocks, background image dropzone
- [ ] `kp-document-text-block-edit` dialog port
- [ ] photo-uploader-kit integration for image blocks
- [ ] Full design controls (colors, borders, font size)
