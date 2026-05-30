# STATUS — ui-primeng-kit

> **v0.1** · ported 2026-05-30 from KPPDF `shared/ui/kp-button`, `kp-input`, `kp-dialog`

## Done

- [x] `<up-kp-button>` — premium/flat variants, severity matrix, tooltips
- [x] `<up-kp-input>` — label, validation error, autofocus
- [x] `<up-kp-dialog>` — modal, footer slot `[upKpDialogFooter]`, focus first field
- [x] Design tokens SCSS (`styles/_tokens.scss`, `_kp-button.scss`, `_kp-field.scss`)
- [x] `provideUiPrimengKit()`
- [x] Demo in `schema-table-kit/demo/pages/ui-primeng-kit/` — **component catalog hub** with per-type demo pages
- [x] Unit tests (barrel exports)

## Demo UX

- `/modules/ui-primeng-kit` — таблица всех kp-* типов (ready / planned)
- `/modules/ui-primeng-kit/button|input|dialog` — demo всех вариантов одного типа
- `/modules/ui-primeng-kit/:id` — заглушка для planned компонентов

## Notes

- Selectors use `up-kp-*` prefix (KPPDF uses `app-kp-*`).
- Consumer must call `providePrimeNG({ theme: { preset: Aura, ... } })` and import tokens + primeicons CSS.
- 19+ KPPDF components remain for future ports (table, select, paginator, …).

## Visual customization vision

Playground (side panel, Save → approved variant) — **не реализовано**. Архитектурный аудит и roadmap: [docs/UI-KIT-VISUAL-CUSTOMIZATION-VISION.md](../docs/UI-KIT-VISUAL-CUSTOMIZATION-VISION.md).

## Next

- [ ] KpTable, KpSelect, KpPaginator
- [ ] KppdfPreset theme override helper in `provideUiPrimengKit()`
- [ ] Standalone demo app in `ui-primeng-kit/demo/`
- [ ] v0.2 demo style playground (button page) — см. vision doc
