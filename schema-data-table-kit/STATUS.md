# STATUS — schema-data-table-kit

> **v0.1** · 2026-05-30 — schema-driven data table

## Done

- [x] `<sdt-schema-data-table [columns]="..." [rows]="..." />`
- [x] `formatSchemaCell()` with local `getFieldValue` (no cross-kit dependency)
- [x] `provideSchemaDataTableKit(config)`
- [x] Demo in `schema-table-kit/demo/pages/schema-data-table-kit/`
- [x] Unit tests

## v0.2 Roadmap

- [ ] Sortable columns, pagination
- [ ] `tableKey` → resolve columns from saved TableDefinition provider
- [ ] Integration with document-canvas-kit table blocks
- [ ] Row selection / click handler

## Notes

- KPPDF has no standalone schema-data-table — tables rendered via `kp-table` + column config.
- v0.1: plain HTML table; sorting/pagination deferred to ui-primeng-kit / crud-page-kit.
- Self-contained: no imports from other kits.
