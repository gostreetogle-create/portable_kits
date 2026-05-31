# options-resolver-kit

> **Status:** ✅ v0.1 — ported from KPPDF  
> **Packaging pattern:** **D**  
> **Priority:** P1 · **Universality:** high

## Purpose

Options cache and loader for select/autocomplete.

| | |
|--|--|
| **KPPDF source** | `shared/services/*-options.service.ts` |
| **Public API** | `provideOptionsResolver(config)`, `OptionsResolver.getOptions(entityKey)` |
| **Dependencies** | `@angular/core`, HttpClient optional |
| **Prefix** | `or-` |

## Packaging (consumer)

Copy **`options-resolver-kit/src/`** → `packages/options-resolver-kit/src/`

Path alias:

```json
"@options-resolver-kit/core": ["packages/options-resolver-kit/src/core/index.ts"],
"@options-resolver-kit/angular": ["packages/options-resolver-kit/src/angular/index.ts"]
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
