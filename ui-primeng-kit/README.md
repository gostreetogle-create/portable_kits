# ui-primeng-kit

> **Status:** ✅ v0.1 — KpButton, KpInput, KpDialog, KpTable, KpPaginator + 16 more components  
> **Packaging pattern:** **B**  
> **Priority:** P2 · **Universality:** high

## Purpose

PrimeNG wrappers in KPPDF style (premium buttons, inputs, dialogs, tables, etc.).

| | |
|--|--|
| **KPPDF source** | `shared/ui/kp-button`, `kp-input`, `kp-dialog`, `kp-table`, `kp-paginator` |
| **Public API** | 21 components: `<up-kp-button>`, `<up-kp-input>`, `<up-kp-dialog>`, `<up-kp-table>`, `provideUiPrimengKit()` |
| **Dependencies** | primeng, primeicons, `@primeuix/themes`, `provideAnimations()` |
| **Prefix** | `up-kp-` |

## Packaging (consumer)

Copy **`ui-primeng-kit/src/`** → `packages/ui-primeng-kit/src/`

Path alias:

```json
"@ui-primeng-kit/core": ["packages/ui-primeng-kit/src/core/index.ts"],
"@ui-primeng-kit/angular": ["packages/ui-primeng-kit/src/angular/index.ts"]
```

Consumer also needs `providePrimeNG()` and CSS tokens from kit (`styles/_tokens.scss`).

Details: [COPY-GUIDE.md](./COPY-GUIDE.md) (detailed consumer guide with examples)

## Development

Demo and tests via `schema-table-kit` hub:

```bash
cd schema-table-kit
npm test
ng serve demo --port 4201
```

See [STATUS.md](./STATUS.md)
