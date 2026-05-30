# ui-primeng-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **B**  
> **Приоритет:** P3 · **Универсальность:** high

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `shared/ui/kp-* (22+ components)` |
| **Public API** | KpButton, KpInput, KpTable, KpDialog, ... barrel export |
| **Зависимости** | primeng, primeicons (peer) |
| **Префикс** | `ui-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`ui-primeng-kit/src/`** → `packages/ui-primeng-kit/src/`

Path alias:

```json
"@ui-primeng-kit/core": ["packages/ui-primeng-kit/src/core/index.ts"],
"@ui-primeng-kit/angular": ["packages/ui-primeng-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd ui-primeng-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
