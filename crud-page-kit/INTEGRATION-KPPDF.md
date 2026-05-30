# INTEGRATION-KPPDF — crud-page-kit

**Status:** ✅ v0.1 ready in portable_kits (2026-05-30)

Copy `crud-page-kit/src/` into consumer, wire `provideCrudPageKit()`, instantiate `CrudStore` with your API adapter.

**KPPDF source:** `shared/crud/kp-crud-page`, `shared/services/crud-store.service`, `shared/services/crud-api.service`

**Hub demo:** `/modules/crud-page-kit` · **Tests:** `schema-table-kit/tests/crud-page-kit.spec.ts`

Full KPPDF route migration (orders, document-templates, etc.) remains a separate consumer task.
