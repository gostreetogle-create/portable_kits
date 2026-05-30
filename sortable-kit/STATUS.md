# STATUS — sortable-kit

> **v0.1** · ported 2026-05-30 from KPPDF `shared/ui/kp-sortable/*`

## Done

- [x] `SortableListDirective`, `SortableItemDirective`, `SortableHandleDirective`
- [x] `moveSortableItems()`, `SortableDropEvent`
- [x] SCSS (`.so-sortable-*`)
- [x] Demo in `schema-table-kit/demo/pages/sortable-kit/`
- [x] Unit tests

## Notes

- Uses **Angular CDK drag-drop** (same as KPPDF source). README scaffold mentioned "no CDK" — actual port matches kppdf implementation.
- Requires `@angular/cdk` + `provideAnimations()` in consumer.

## Next

- [ ] Native HTML5 DnD variant (optional, if CDK-free is required)
- [ ] Standalone demo app in `sortable-kit/demo/`
