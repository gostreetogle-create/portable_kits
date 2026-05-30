# crud-factory-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **C**  
> **Приоритет:** P2 · **Универсальность:** high

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `backend/src/utils/crud-factory.ts` |
| **Public API** | createCrudRouter(model, { permPrefix, ... }) |
| **Зависимости** | express, mongoose (peer) |
| **Префикс** | `cf-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`crud-factory-kit/src/`** → `packages/crud-factory-kit/src/`

Path alias:

```json
"@crud-factory-kit/core": ["packages/crud-factory-kit/src/core/index.ts"],
"@crud-factory-kit/angular": ["packages/crud-factory-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd crud-factory-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
