# layout-shell-kit

> **Status:** ✅ v0.1  
> **Packaging pattern:** **B**  
> **Priority:** P3 · **Universality:** high

## Purpose

Portable app shell: sidebar navigation, responsive mobile drawer, router outlet.

| | |
|--|--|
| **KPPDF source (planned)** | `layout/*`, menu, `kp-breadcrumbs ROUTE_LABELS` |
| **Public API** | `<ls-layout-shell [navItems]="..." [appTitle]="..." />`, `provideLayoutShellKit()` |
| **Dependencies** | auth-rbac-kit (future) |
| **Prefix** | `ls-` (components / CSS vars) |

## Packaging (consumer)

Copy **`layout-shell-kit/src/`** → `packages/layout-shell-kit/src/`

Path alias:

```json
"@layout-shell-kit/angular": ["packages/layout-shell-kit/src/angular/index.ts"]
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
