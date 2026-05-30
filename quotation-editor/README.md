# quotation-editor

> **Статус:** 📋 scaffold — в разработке  
> **Паттерн упаковки:** **B**  
> **Приоритет:** P0 · **Универсальность:** domain

## Назначение

Переносимый модуль редактора коммерческих предложений: строки, таблицы, расчёты и экспорт документа.

| | |
|--|--|
| **Источник (план извлечения)** | `features/quotations/quotation-editor.component.ts` |
| **Public API** | `<qe-quotation-editor ... />` (TBD) |
| **Зависимости** | schema-data-table-kit, document-canvas-kit (TBD) |
| **Префикс** | `qe-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`quotation-editor/src/`** → `packages/quotation-editor/src/`

Path alias (после реализации):

```json
"@quotation-editor/angular": ["packages/quotation-editor/src/angular/index.ts"]
```

Подробно: COPY-GUIDE.md (после реализации)

## Разработка

```bash
cd quotation-editor
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
