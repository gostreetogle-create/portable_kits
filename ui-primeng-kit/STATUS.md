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
- `/modules/ui-kit-composer` — **конструктор v0.1**: палитра, preview, properties, localStorage draft, export JSON

## Presets

- Пример export: `variants/presets/primary-large-button.example.json`
- Утверждённые пресеты вручную кладутся в `variants/presets/` (runtime load — v0.2+)

## Notes

- Selectors use `up-kp-*` prefix (KPPDF uses `app-kp-*`).
- Consumer must call `providePrimeNG({ theme: { preset: Aura, ... } })` and import tokens + primeicons CSS.
- 19+ KPPDF components remain for future ports (table, select, paginator, …).

## Visual customization vision

- [x] **Composer v0.1** — `/modules/ui-kit-composer` (palette + canvas + properties, button/input)
- Roadmap v0.2+: compositions, SCSS export, catalog preset load — [docs/UI-KIT-VISUAL-CUSTOMIZATION-VISION.md](../docs/UI-KIT-VISUAL-CUSTOMIZATION-VISION.md)

## Done

- [x] `<up-kp-table>` — data-driven table: toolbar, search, sorting, pagination, row actions, empty state
- [x] `<up-kp-paginator>` — PrimeNG Paginator wrapper with page report

## Next

- [ ] KpSelect, KpAutocomplete, KpToggle, KpChip, KpBadge, KpMenu, KpFileUpload, KpImage
- [ ] KppdfPreset theme override helper in `provideUiPrimengKit()`
- [ ] Standalone demo app in `ui-primeng-kit/demo/`
- [ ] v0.2 composer: compositions (row/card), import JSON
