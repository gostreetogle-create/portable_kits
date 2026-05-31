# STATUS — auth-rbac-kit

> **v0.1** · 2026-05-30 — permission helpers + Express stub

## Done

- [x] `hasPermission()`, `hasAnyPermission()`, `DEMO_PERMISSIONS` catalog
- [x] `AuthRbacService` + `provideAuthRbacKit({ getUser })`
- [x] Express: `createAuthMiddleware()`, `requirePermission()`
- [x] Hub demo with permission toggles
- [x] Unit tests

## v0.2 Roadmap

- [ ] JWT decode helper
- [ ] Angular route guards (canActivate, canMatch)
- [ ] Full permission registry ported from KPPDF
- [ ] Permission inheritance / role hierarchy support
