# STATUS — schema-data-table-kit

> **v0.1** · ported 2026-05-30 (new component; KPPDF uses `kp-table` inline)

## Done

- [x] `<sdt-schema-data-table [columns]="..." [rows]="..." />`
- [x] `formatSchemaCell()` with local `getFieldValue` (no cross-kit dependency)
- [x] `provideSchemaDataTableKit(config)`
- [x] Demo in `schema-table-kit/demo/pages/schema-data-table-kit/`
- [x] Unit tests

## Notes

- KPPDF has no standalone schema-data-table — tables rendered via `kp-table` + column config.
- v0.1: plain HTML table; sorting/pagination deferred to ui-primeng-kit / crud-page-kit.
- Self-contained: no imports from other kits.

## Next

- [ ] `tableKey` → resolve columns from saved TableDefinition provider
- [ ] Sortable columns, pagination
- [ ] Integration with document-canvas-kit table blocks
