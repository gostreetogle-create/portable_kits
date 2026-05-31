# STATUS — ui-primeng-kit

> **v0.1** · 2026-05-30 — PrimeNG wrapper components (button, input, dialog, table, paginator)

## Done

- [x] `<up-kp-button>` — premium/flat variants, severity matrix, tooltips
- [x] `<up-kp-input>` — label, validation error, autofocus
- [x] `<up-kp-dialog>` — modal, footer slot `[upKpDialogFooter]`, focus first field
- [x] `<up-kp-table>` — data-driven table: toolbar, search, sorting, pagination, row actions, empty state
- [x] `<up-kp-paginator>` — PrimeNG Paginator wrapper with page report
- [x] Design tokens SCSS (`styles/_tokens.scss`, `_kp-button.scss`, `_kp-field.scss`)
- [x] `provideUiPrimengKit()`
- [x] Component catalog hub with per-type demo pages
- [x] UI Kit Composer v0.1 (`/modules/ui-kit-composer`): palette, canvas, properties, localStorage draft, export JSON
- [x] Unit tests (barrel exports)

## v0.2 Roadmap

- [ ] KpSelect, KpAutocomplete, KpToggle, KpChip, KpBadge, KpMenu, KpFileUpload, KpImage
- [x] `UiPrimengPresetOverride` type + `presetOverrides` in config
- [ ] Composer v0.2: compositions (row/card), import JSON
- [ ] SCSS export & clipboard copy in composer
- [ ] Standalone demo app in `ui-primeng-kit/demo/`

## Notes

- Selectors use `up-kp-*` prefix (KPPDF uses `app-kp-*`).
- Consumer must call `providePrimeNG({ theme: { preset: Aura, ... } })` and import tokens + primeicons CSS.
- 19+ KPPDF components remain for future ports.
- Visual customization vision: [docs/UI-KIT-VISUAL-CUSTOMIZATION-VISION.md](../docs/UI-KIT-VISUAL-CUSTOMIZATION-VISION.md)
