# How to add a new kit to portable-kits

## 1. Create a subfolder

```
portable-kits/
└── my-new-kit/
    ├── src/              ← библиотека (копируется в consumer)
    ├── demo/             ← опционально: standalone demo
    ├── tests/
    ├── package.json
    ├── README.md
    └── COPY-GUIDE.md     ← что переносить в consumer
```

Template structure: [schema-table-kit](../schema-table-kit/).

## 2. Kit rules

| Rule | Purpose |
|---------|-------|
| **`src/` is self-contained** | Consumer copies only this |
| **Own `npm start`** | Development without KPPDF |
| **No imports from consumer** | Kit does not know about KPPDF |
| **COPY-GUIDE.md inside kit** | Transfer instructions |
| **Native / minimal deps** | Easy to copy anywhere |
| **Hub for dev** | `npm install` in repo root; tests/demo via `schema-table-kit` |

## 3. Update root README.md

Add a row to the "Kits catalog" table:

```markdown
| [my-new-kit](./my-new-kit/) | Description | `my-new-kit/src/` | QUICKSTART link |
```

## 4. Naming

- Folder: `kebab-case` (`schema-table-kit`, `form-builder-kit`)
- Component prefix: unique (`st-`, `fb-`, ...)
- Path alias in consumer: `@my-new-kit/angular`

## 5. Consumer wiring (template)

1. Copy `my-new-kit/src/` → `packages/my-new-kit/src/`
2. Path alias in `tsconfig.json`
3. `provideMyNewKit(config)` in `app.config.ts`
4. Component in consumer's form

## 6. Do not put in repo root

- ❌ Shared `src/` for all kits
- ❌ `node_modules` junctions in kit folders (use root workspaces)
- ❌ Demo consumer projects (KPPDF) in this repo

## 7. Development and CI

| Task | Command |
|--------|---------|
| Install | `npm install` (from repo root) |
| Test all kits in hub | `cd schema-table-kit && npm test` |
| Build demo | `cd schema-table-kit && npm run build` |
| Dev server | `cd schema-table-kit && ng serve demo --port 4201` |

## 8. Register in hub

After creating `src/`, register the kit in **schema-table-kit** (dev shell) so that demo and vitest work without consumer project:

| # | File | What to add |
|---|------|--------------|
| 1 | `schema-table-kit/demo/modules.config.ts` | Entry in `DEMO_MODULES`: `id`, `title`, `route`, `hasDemo: true`, `readiness`, tier |
| 2 | `schema-table-kit/demo/app.routes.ts` | `{ path: 'modules/<kit-id>', component: ...DemoComponent }` |
| 3 | `schema-table-kit/demo/pages/<kit-id>/` | Demo page (`*-demo.component.ts`, with `.html`/`.scss` if needed) |
| 4 | `schema-table-kit/tsconfig.json` | Path aliases: `@<kit-id>/core`, `@<kit-id>/angular` (and others per kit pattern) |
| 5 | `schema-table-kit/tsconfig.demo.json` | `"../<kit-id>/src/**/*.ts"` in `include` |
| 6 | `schema-table-kit/vitest.config.ts` | Aliases for `@<kit-id>/core` (and angular, if tests import) |
| 7 | `schema-table-kit/tests/<kit-id>.spec.ts` | Minimal vitest: core logic and/or barrel export check |
| 8 | `<kit-id>/STATUS.md` | Done / Next, version, honest test status |
| 9 | `<kit-id>/README.md` | Brief description + link to COPY-GUIDE / QUICKSTART |
| 10 | Root `README.md` | Row in kits catalog |

Verify: `cd schema-table-kit && npm test && npm run build && ng serve demo`.
