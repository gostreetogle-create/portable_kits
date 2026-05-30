# sortable-kit

> **Статус:** ✅ v0.1 — ported from KPPDF  
> **Паттерн упаковки:** **B**  
> **Приоритет:** P1 · **Универсальность:** high

## Назначение

Drag-and-drop списки на `@angular/cdk/drag-drop`.

| | |
|--|--|
| **Источник KPPDF** | `shared/ui/kp-sortable/*` |
| **Public API** | `soSortableList`, `soSortableItem`, `soSortableHandle`, `moveSortableItems()` |
| **Зависимости** | `@angular/cdk/drag-drop`, `provideAnimations()` |
| **Префикс** | `so-` (директивы / CSS vars) |

## Упаковка (consumer)

Copy **`sortable-kit/src/`** → `packages/sortable-kit/src/`

Path alias:

```json
"@sortable-kit/angular": ["packages/sortable-kit/src/angular/index.ts"]
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
