# auth-rbac-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **CD**  
> **Приоритет:** P3 · **Универсальность:** low

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `core/permissions.ts, auth guards, backend JWT` |
| **Public API** | provideAuthRbacKit(), hasPermission(), createAuthMiddleware() |
| **Зависимости** | consumer seed roles; extract after crud-factory-kit |
| **Префикс** | `ar-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`auth-rbac-kit/src/`** → `packages/auth-rbac-kit/src/`

Path alias:

```json
"@auth-rbac-kit/core": ["packages/auth-rbac-kit/src/core/index.ts"],
"@auth-rbac-kit/angular": ["packages/auth-rbac-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd auth-rbac-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
