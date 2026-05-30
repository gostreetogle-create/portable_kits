# document-canvas-kit

> **Статус:** ✅ v0.1 — ported from KPPDF (text blocks)  
> **Паттерн упаковки:** **B**  
> **Приоритет:** P1 · **Универсальность:** domain

## Назначение

Редактор блоков документа (шаблон или экземпляр).

| | |
|--|--|
| **Источник KPPDF** | `shared/ui/kp-document-block-editor/` |
| **Public API** | `<dc-document-canvas mode="instance|template" [(blocks)]="blocks" />` |
| **Зависимости** | sortable-kit, placeholder-kit (optional hook) |
| **Префикс** | `dc-` |

## Упаковка (consumer)

Copy **`document-canvas-kit/src/`** → `packages/document-canvas-kit/src/`

Path alias:

```json
"@document-canvas-kit/core": ["packages/document-canvas-kit/src/core/index.ts"],
"@document-canvas-kit/angular": ["packages/document-canvas-kit/src/angular/index.ts"]
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
