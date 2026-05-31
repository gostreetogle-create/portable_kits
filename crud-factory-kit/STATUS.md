# STATUS — crud-factory-kit

> **v0.1** · 2026-05-30 — Express CRUD router factory

## Done

- [x] `createCrudRouter(model, options)` — LIST/GET/CREATE/UPDATE/DELETE
- [x] `success()`, `paginated()`, `error()` helpers
- [x] Pluggable `authenticate` / `requirePermission` (no hard KPPDF deps)
- [x] Demo in `schema-table-kit/demo/pages/crud-factory-kit/`
- [x] Unit tests for API response helpers

## v0.2 Roadmap

- [ ] Integration test with mock Express + in-memory model
- [ ] Optional demo Express server (like schema-table-kit `demo-server/`)
- [ ] Soft-delete / bulk hooks from KPPDF extensions
- [ ] Query builder / filtering DSL

## Notes

- Express + Mongoose-compatible model interface (peer deps).
- Auth middleware injected via options instead of importing KPPDF `auth`/`permission`.
