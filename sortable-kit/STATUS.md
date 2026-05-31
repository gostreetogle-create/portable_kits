# STATUS — sortable-kit

> **v0.1** · 2026-05-30 — Angular CDK drag-and-drop directives

## Done

- [x] `SortableListDirective`, `SortableItemDirective`, `SortableHandleDirective`
- [x] `moveSortableItems()`, `SortableDropEvent`
- [x] SCSS (`.so-sortable-*`)
- [x] Demo in `schema-table-kit/demo/pages/sortable-kit/`
- [x] Unit tests

## v0.2 Roadmap

- [ ] Native HTML5 DnD variant (optional, CDK-free)
- [ ] Touch device support improvements
- [ ] Animated transitions for reorder
- [ ] Standalone demo app in `sortable-kit/demo/`

## Notes

- Uses **Angular CDK drag-drop** (same as KPPDF source).
- Requires `@angular/cdk` + `provideAnimations()` in consumer.
