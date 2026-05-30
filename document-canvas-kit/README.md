# document-canvas-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **B**  
> **Приоритет:** P2 · **Универсальность:** domain

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `shared/ui/kp-document-block-editor/, kp-document-text-block-edit/` |
| **Public API** | <dc-document-canvas mode="instance|template" [(blocks)]="blocks" /> |
| **Зависимости** | native HTML, --dc-* CSS vars |
| **Префикс** | `dc-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`document-canvas-kit/src/`** → `packages/document-canvas-kit/src/`

Path alias:

```json
"@document-canvas-kit/core": ["packages/document-canvas-kit/src/core/index.ts"],
"@document-canvas-kit/angular": ["packages/document-canvas-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd document-canvas-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
