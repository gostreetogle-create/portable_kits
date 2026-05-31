# COPY-GUIDE — auth-rbac-kit

## Copy to consumer

1. `auth-rbac-kit/src/` → `packages/auth-rbac-kit/src/`
2. Path alias in tsconfig consumer
3. Configure (see README)
4. Wire public API: provideAuthRbacKit(), hasPermission(), createAuthMiddleware()

## Do not copy

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Pattern **CD**

| Copy | Folders |
|------|---------|
| Consumer | `src/` |

See [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
