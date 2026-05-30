# entity-picker-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **BD**  
> **Приоритет:** P1 · **Универсальность:** high

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `shared/ui/kp-product-picker/` |
| **Public API** | <ep-entity-picker entityKey="products" [(visible)]="v" (selected)="onPick($event)" /> |
| **Зависимости** | @angular/core, @angular/forms |
| **Префикс** | `ep-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`entity-picker-kit/src/`** → `packages/entity-picker-kit/src/`

Path alias:

```json
"@entity-picker-kit/core": ["packages/entity-picker-kit/src/core/index.ts"],
"@entity-picker-kit/angular": ["packages/entity-picker-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd entity-picker-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
