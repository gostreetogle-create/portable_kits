# INTEGRATION-KPPDF — options-resolver-kit

**Status:** ✅ v0.1 ready in portable_kits (2026-05-30)

Copy `options-resolver-kit/src/`, wire `provideOptionsResolver()`, use `OptionsResolver.getOptions(entityKey)`.

**KPPDF source:** `shared/services/*-options.service.ts`

**Hub demo:** `/modules/options-resolver-kit` · **Tests:** `schema-table-kit/tests/options-resolver-kit.spec.ts`

Consumer wires async loaders; v0.1 provides resolver + cache layer.
