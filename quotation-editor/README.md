# quotation-editor

> **Status:** ✅ v0.1  
> **Packaging pattern:** **B**  
> **Priority:** P0 · **Universality:** domain

## Purpose

Quotation editor composing document-canvas-kit, entity-picker-kit, and placeholder-kit.

| | |
|--|--|
| **KPPDF source** | `features/quotations/quotation-editor.component.ts` |
| **Public API** | `<qe-quotation-editor [(blocks)]="..." />`, `provideQuotationEditorKit()` |
| **Dependencies** | document-canvas-kit, entity-picker-kit, placeholder-kit |
| **Prefix** | `qe-` (components / CSS vars) |

## Packaging (consumer)

Copy **`quotation-editor/src/`** → `packages/quotation-editor/src/`

Path alias:

```json
"@quotation-editor/angular": ["packages/quotation-editor/src/angular/index.ts"]
```

Details: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Development

Demo and tests via `schema-table-kit` hub:

```bash
cd schema-table-kit
npm test
ng serve demo --port 4201
```

See [STATUS.md](./STATUS.md)
