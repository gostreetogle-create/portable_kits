# sortable-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **B**  
> **Приоритет:** P2 · **Универсальность:** high

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `shared/ui/kp-sortable/*` |
| **Public API** | soSortableList, soSortableItem, soSortableHandle, moveSortableItems() |
| **Зависимости** | @angular/core only, no CDK |
| **Префикс** | `so-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`sortable-kit/src/`** → `packages/sortable-kit/src/`

Path alias:

```json
"@sortable-kit/core": ["packages/sortable-kit/src/core/index.ts"],
"@sortable-kit/angular": ["packages/sortable-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd sortable-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
