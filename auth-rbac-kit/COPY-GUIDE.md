# COPY-GUIDE — auth-rbac-kit

## Copy в consumer

1. `auth-rbac-kit/src/` → `packages/auth-rbac-kit/src/`
2. Path alias в tsconfig consumer
3. Свой config (см. README)
4. Подключить public API: provideAuthRbacKit(), hasPermission(), createAuthMiddleware()

## Не копировать

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Паттерн **CD**

| Copy | Папки |
|------|--------|
| Consumer | `src/` |

См. [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
