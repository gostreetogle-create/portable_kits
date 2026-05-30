# crud-factory-kit

> **Статус:** ✅ v0.1 — ported from KPPDF  
> **Паттерн упаковки:** **C**  
> **Приоритет:** P1 · **Универсальность:** high

## Назначение

Express CRUD-роутер из Mongoose-модели.

| | |
|--|--|
| **Источник KPPDF** | `backend/src/utils/crud-factory.ts` |
| **Public API** | `createCrudRouter(model, { permPrefix, ... })` |
| **Зависимости** | express, mongoose (peer) |
| **Префикс** | `cf-` |

## Упаковка (consumer)

Copy **`crud-factory-kit/src/`** → `packages/crud-factory-kit/src/`

Path alias:

```json
"@crud-factory-kit/core": ["packages/crud-factory-kit/src/core/index.ts"],
"@crud-factory-kit/express": ["packages/crud-factory-kit/src/express/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

Demo и тесты через hub `schema-table-kit`:

```bash
cd schema-table-kit
npm test
ng serve demo --port 4201
```

См. [STATUS.md](./STATUS.md)
