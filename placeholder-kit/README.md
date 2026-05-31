# placeholder-kit

> **Status:** ✅ v0.1 — ported from KPPDF  
> **Packaging pattern:** **A**  
> **Priority:** P1 · **Universality:** domain

## Purpose

Placeholder resolution engine and UI picker.

| | |
|--|--|
| **KPPDF source** | `shared/placeholder/`, `kp-placeholder-picker` |
| **Public API** | `resolvePlaceholders(text, ctx)`, `<ph-placeholder-picker />` |
| **Dependencies** | core dot-path |
| **Prefix** | `ph-` |

## Packaging (consumer)

Copy **`placeholder-kit/src/`** → `packages/placeholder-kit/src/`

Path alias:

```json
"@placeholder-kit/core": ["packages/placeholder-kit/src/core/index.ts"],
"@placeholder-kit/angular": ["packages/placeholder-kit/src/angular/index.ts"]
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
