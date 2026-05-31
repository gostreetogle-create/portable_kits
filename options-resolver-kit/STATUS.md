# STATUS — options-resolver-kit

> **v0.1** · 2026-05-30 — config-driven options resolver

## Done

- [x] `OptionsResolver` service with cache
- [x] `provideOptionsResolver(config)`
- [x] Core types: `SelectOption`, `EntityOptionsDefinition`
- [x] Demo in `schema-table-kit/demo/pages/options-resolver-kit/`
- [x] Unit tests

## v0.2 Roadmap

- [x] HttpClient-backed default loader helper (`HttpOptionsLoader`)
- [x] `patchColumnOptions()` util + `createPresetLoader()`
- [ ] Domain-specific preset loaders integration
- [ ] Async validation support

## Notes

- Generalizes per-entity `*OptionsService` pattern into config-driven resolver.
- Loaders are async functions — consumer wires HttpClient/CrudApi internally.
