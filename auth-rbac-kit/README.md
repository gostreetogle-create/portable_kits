# auth-rbac-kit

> **Status:** ✅ v0.1  
> **Packaging pattern:** **CD**  
> **Priority:** P3 · **Universality:** low

## Purpose

Portable kit for role-based access control: permission checking, Angular service, Express middleware.

| | |
|--|--|
| **KPPDF source** | `core/permissions.ts`, auth guards, backend JWT |
| **Public API** | `provideAuthRbacKit()`, `hasPermission()`, `createAuthMiddleware()` |
| **Dependencies** | consumer seed roles; extract after crud-factory-kit |
| **Prefix** | `ar-` (components / CSS vars) |

## Packaging (consumer)

Copy **`auth-rbac-kit/src/`** → `packages/auth-rbac-kit/src/`

Path alias:

```json
"@auth-rbac-kit/core": ["packages/auth-rbac-kit/src/core/index.ts"],
"@auth-rbac-kit/angular": ["packages/auth-rbac-kit/src/angular/index.ts"]
```

Details: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Development

Demo and tests via `schema-table-kit` hub:

```bash
cd schema-table-kit
npm test
ng serve demo --port 4201
```

See [STATUS.md](./STATUS.md)
