# STATUS — entity-picker-kit

> **v0.1** · ported 2026-05-30 from KPPDF `shared/ui/kp-product-picker/` (simplified)

## Done

- [x] `<ep-entity-picker entityKey="..." [(visible)]="v" (selected)="onPick($event)" />`
- [x] `provideEntityPickerKit(config)` with per-entity search fn
- [x] Generic table + modal UI (no ui-primeng-kit dependency)
- [x] Demo in `schema-table-kit/demo/pages/entity-picker-kit/`

## Notes

- KPPDF product-picker is ~570 lines with filters, pagination, multi-select, PrimeNG widgets.
- Portable v0.1: single-select modal + search + configurable columns.
- Multi-select, cart, filters — next iteration.

## Next

- [ ] Multi-select mode (from KPPDF `multiple()` + cart)
- [ ] Pagination component integration
- [ ] Filter slots / product-specific presets
- [ ] Optional ui-primeng-kit skin
