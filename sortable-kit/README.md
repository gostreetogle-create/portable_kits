# sortable-kit

> **Status:** ✅ v0.1 — ported from KPPDF  
> **Packaging pattern:** **B**  
> **Priority:** P1 · **Universality:** high

## Purpose

Drag-and-drop lists via `@angular/cdk/drag-drop`.

| | |
|--|--|
| **KPPDF source** | `shared/ui/kp-sortable/*` |
| **Public API** | `soSortableList`, `soSortableItem`, `soSortableHandle`, `moveSortableItems()` |
| **Dependencies** | `@angular/cdk/drag-drop`, `provideAnimations()` |
| **Prefix** | `so-` (directives / CSS vars) |

## Packaging (consumer)

Copy **`sortable-kit/src/`** → `packages/sortable-kit/src/`

Path alias:

```json
"@sortable-kit/angular": ["packages/sortable-kit/src/angular/index.ts"]
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
