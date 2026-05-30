# placeholder-kit

> **Статус:** ✅ v0.1 — ported from KPPDF  
> **Паттерн упаковки:** **A**  
> **Приоритет:** P1 · **Универсальность:** domain

## Назначение

Подстановка плейсхолдеров в текст и UI-пикер.

| | |
|--|--|
| **Источник KPPDF** | `shared/placeholder/`, `kp-placeholder-picker` |
| **Public API** | `resolvePlaceholders(text, ctx)`, `<ph-placeholder-picker />` |
| **Зависимости** | core dot-path |
| **Префикс** | `ph-` |

## Упаковка (consumer)

Copy **`placeholder-kit/src/`** → `packages/placeholder-kit/src/`

Path alias:

```json
"@placeholder-kit/core": ["packages/placeholder-kit/src/core/index.ts"],
"@placeholder-kit/angular": ["packages/placeholder-kit/src/angular/index.ts"]
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
