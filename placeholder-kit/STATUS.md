# STATUS — placeholder-kit

> **v0.1** · ported 2026-05-30 from KPPDF `shared/placeholder/` + `kp-placeholder-picker`

## Done

- [x] `resolvePlaceholders()`, `resolvePlaceholderBlock()`, `extractPlaceholderTokens()`, `resolvePlaceholderToken()`
- [x] `TemplatePlaceholderService` (Angular)
- [x] `wrapPlaceholderDisplay()`, `escapeHtml()`, `formatRuDate()`
- [x] `DEFAULT_PLACEHOLDER_REGISTRY`, `buildPlaceholderGroups()`
- [x] `<ph-placeholder-picker [(visible)]="v" (placeholderSelected)="onPick($event)" />`
- [x] `providePlaceholderKit(config)` — custom registry, field aliases
- [x] Generic `PlaceholderContext` (Record-based, no KPPDF types)
- [x] Demo in `schema-table-kit/demo/pages/placeholder-kit/`
- [x] Unit tests (resolve + display util)

## Notes

- Full KPPDF registry has 30+ tokens; v0.1 ships a representative subset (extensible via config).
- Legacy alias `org.address` → `org.legalAddress` preserved.

## Next

- [ ] Full token registry from KPPDF
- [x] `resolvePlaceholderBlock()` for document-canvas integration
- [ ] Express endpoint helpers in `src/express/` (pattern A)
