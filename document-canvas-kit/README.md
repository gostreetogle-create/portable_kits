# document-canvas-kit

> **Status:** ✅ v0.1 — ported from KPPDF (text blocks)  
> **Packaging pattern:** **B**  
> **Priority:** P1 · **Universality:** domain

## Purpose

Document block editor (template or instance mode).

| | |
|--|--|
| **KPPDF source** | `shared/ui/kp-document-block-editor/` |
| **Public API** | `<dc-document-canvas mode="instance|template" [(blocks)]="blocks" />` |
| **Dependencies** | sortable-kit, placeholder-kit (optional hook) |
| **Prefix** | `dc-` |

## Packaging (consumer)

Copy **`document-canvas-kit/src/`** → `packages/document-canvas-kit/src/`

Path alias:

```json
"@document-canvas-kit/core": ["packages/document-canvas-kit/src/core/index.ts"],
"@document-canvas-kit/angular": ["packages/document-canvas-kit/src/angular/index.ts"]
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
