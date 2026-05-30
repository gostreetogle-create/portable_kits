# STATUS — crud-factory-kit

> **v0.1** · ported 2026-05-30 from KPPDF `backend/src/utils/crud-factory.ts`

## Done

- [x] `createCrudRouter(model, options)` — LIST/GET/CREATE/UPDATE/DELETE
- [x] `success()`, `paginated()`, `error()` helpers
- [x] Pluggable `authenticate` / `requirePermission` (no hard KPPDF deps)
- [x] Demo in `schema-table-kit/demo/pages/crud-factory-kit/`
- [x] Unit tests for api-response helpers

## Notes

- Express + Mongoose-compatible model interface (peer deps).
- Auth middleware injected via options instead of importing KPPDF `auth`/`permission`.

## Next

- [ ] Integration test with mock Express + in-memory model
- [ ] Optional demo Express server (like schema-table-kit `demo-server/`)
- [ ] Soft-delete / bulk hooks from KPPDF extensions
