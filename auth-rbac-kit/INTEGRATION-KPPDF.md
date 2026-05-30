# INTEGRATION-KPPDF — auth-rbac-kit

**Status:** ✅ v0.1 ready in portable_kits (2026-05-30)

Copy `auth-rbac-kit/src/`, wire `provideAuthRbacKit({ getUser })`, use `hasPermission()` / `AuthRbacService`.

**KPPDF source:** `core/permissions.ts`, JWT middleware

**Hub demo:** `/modules/auth-rbac-kit` · Express: `createAuthMiddleware()`, `requirePermission()`

Replace `DEMO_PERMISSIONS` with consumer permission catalog.
