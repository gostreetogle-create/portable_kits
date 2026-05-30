# STATUS — options-resolver-kit

> **v0.1** · ported 2026-05-30 from KPPDF `shared/services/*-options.service.ts`

## Done

- [x] `OptionsResolver` service with cache
- [x] `provideOptionsResolver(config)`
- [x] Core types: `SelectOption`, `EntityOptionsDefinition`
- [x] Demo in `schema-table-kit/demo/pages/options-resolver-kit/`
- [x] Unit tests (scaffold)

## Notes

- Generalizes per-entity `*OptionsService` pattern into config-driven resolver.
- Loaders are async functions — consumer wires HttpClient/CrudApi internally.

## Next

- [ ] HttpClient-backed default loader helper
- [ ] `patchColumnOptions()` util from `crud-column-options.util.ts`
- [ ] Domain-specific loaders (products, users, …) as optional presets
