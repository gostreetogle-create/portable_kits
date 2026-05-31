# photo-uploader-kit

> **Status:** ✅ v0.1 — ported from KPPDF  
> **Packaging pattern:** **B**  
> **Priority:** P1 · **Universality:** high

## Purpose

Photo upload and management (plain HTML v0.1, no PrimeNG).

| | |
|--|--|
| **KPPDF source** | `shared/ui/kp-photo-uploader.component.ts` |
| **Public API** | `<pu-photo-uploader [(photos)]="photos" />` |
| **Dependencies** | `@angular/core`, `@angular/forms` |
| **Prefix** | `pu-` |

## Packaging (consumer)

Copy **`photo-uploader-kit/src/`** → `packages/photo-uploader-kit/src/`

Path alias:

```json
"@photo-uploader-kit/core": ["packages/photo-uploader-kit/src/core/index.ts"],
"@photo-uploader-kit/angular": ["packages/photo-uploader-kit/src/angular/index.ts"]
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
