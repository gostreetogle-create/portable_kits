# entity-picker-kit

> **Status:** ✅ v0.1 — ported from KPPDF (simplified)  
> **Packaging pattern:** **BD**  
> **Priority:** P1 · **Universality:** high

## Purpose

Modal entity picker by key (single-select and multi-select).

| | |
|--|--|
| **KPPDF source** | `shared/ui/kp-product-picker/` |
| **Public API** | `<ep-entity-picker entityKey="..." [(visible)]="v" (selected)="onPick($event)" />` |
| **Dependencies** | `@angular/core`, `@angular/forms` |
| **Prefix** | `ep-` |

## Packaging (consumer)

Copy **`entity-picker-kit/src/`** → `packages/entity-picker-kit/src/`

Path alias:

```json
"@entity-picker-kit/core": ["packages/entity-picker-kit/src/core/index.ts"],
"@entity-picker-kit/angular": ["packages/entity-picker-kit/src/angular/index.ts"]
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
