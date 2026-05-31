# STATUS — placeholder-kit

> **v0.1** · 2026-05-30 — placeholder resolution + picker component

## Done

- [x] `resolvePlaceholders()`, `resolvePlaceholderBlock()`, `extractPlaceholderTokens()`, `resolvePlaceholderToken()`
- [x] `TemplatePlaceholderService` (Angular)
- [x] `wrapPlaceholderDisplay()`, `escapeHtml()`, `formatDate()`
- [x] `DEFAULT_PLACEHOLDER_REGISTRY`, `buildPlaceholderGroups()`
- [x] `<ph-placeholder-picker [(visible)]="v" (placeholderSelected)="onPick($event)" />`
- [x] `providePlaceholderKit(config)` — custom registry, field aliases
- [x] Generic `PlaceholderContext` (Record-based, no KPPDF types)
- [x] Demo in `schema-table-kit/demo/pages/placeholder-kit/`
- [x] Unit tests (resolve + display util)

## v0.2 Roadmap

- [ ] Full token registry from KPPDF (30+ tokens)
- [ ] Express endpoint helpers in `src/express/`
- [ ] Nested placeholder support (e.g. `{{org.address.city}}`)
- [ ] Placeholder preview in document canvas

## Notes

- Full KPPDF registry has 30+ tokens; v0.1 ships a representative subset (extensible via config).
- Legacy alias `org.address` → `org.legalAddress` preserved.
