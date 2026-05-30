# placeholder-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **A**  
> **Приоритет:** P2 · **Универсальность:** domain

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `shared/placeholder/, kp-placeholder-picker` |
| **Public API** | resolvePlaceholders(text, ctx), <ph-placeholder-picker /> |
| **Зависимости** | core dot-path |
| **Префикс** | `ph-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`placeholder-kit/src/`** → `packages/placeholder-kit/src/`

Path alias:

```json
"@placeholder-kit/core": ["packages/placeholder-kit/src/core/index.ts"],
"@placeholder-kit/angular": ["packages/placeholder-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd placeholder-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
