# STATUS — entity-picker-kit

> **v0.2** · 2026-05-30 — multi-select mode

## Done

- [x] `<ep-entity-picker entityKey="..." [(visible)]="v" (selected)="onPick($event)" />`
- [x] Multi-select: `selectionMode="multiple"` + `(selectedMany)="onPickMany($event)"`
- [x] `provideEntityPickerKit(config)` with entity registry
- [x] Demo in schema-table-kit hub (single + multi)
- [x] Unit tests (`toggleEntityPickerSelection`, `entityPickerRowId`)

## Next

- [ ] Pagination in picker dialog
- [ ] Keyboard navigation improvements
- [ ] ui-primeng dialog skin
