# entity-picker-kit

> **Статус:** ✅ v0.1 — ported from KPPDF (simplified)  
> **Паттерн упаковки:** **BD**  
> **Приоритет:** P1 · **Универсальность:** high

## Назначение

Модальное окно выбора сущности по ключу (single-select v0.1).

| | |
|--|--|
| **Источник KPPDF** | `shared/ui/kp-product-picker/` |
| **Public API** | `<ep-entity-picker entityKey="..." [(visible)]="v" (selected)="onPick($event)" />` |
| **Зависимости** | `@angular/core`, `@angular/forms` |
| **Префикс** | `ep-` |

## Упаковка (consumer)

Copy **`entity-picker-kit/src/`** → `packages/entity-picker-kit/src/`

Path alias:

```json
"@entity-picker-kit/core": ["packages/entity-picker-kit/src/core/index.ts"],
"@entity-picker-kit/angular": ["packages/entity-picker-kit/src/angular/index.ts"]
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
