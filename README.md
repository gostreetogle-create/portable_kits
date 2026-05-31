# portable_kits

**Portable modules** extracted from KPPDF 3.0.

Each kit is a **folder in this repo root**. Consumer only copies **`kit-name/src/`**.

```
portable_kits/
├── README.md
├── docs/
├── schema-table-kit/          ✅ v1 — reference + demo hub
├── photo-uploader-kit/        ✅ v0.1
├── placeholder-kit/           ✅ v0.1
├── document-canvas-kit/       ✅ v0.2
├── crud-page-kit/             ✅ v0.1
├── quotation-editor/          ✅ v0.1
├── layout-shell-kit/          ✅ v0.1
├── …
└── tools/
```

**15/15 kits** with working `src/`, hub demo and vitest green (Level 3).

---

## Kits Catalog

| Kit | Status | Pattern | Copy to consumer |
|-----|--------|---------|-----------------|
| [schema-table-kit](./schema-table-kit/) | ✅ v1 | A | `src/` |
| [schema-data-table-kit](./schema-data-table-kit/) | ✅ v0.1 | A | `src/` |
| [entity-picker-kit](./entity-picker-kit/) | ✅ v0.2 | BD | `src/` |
| [sortable-kit](./sortable-kit/) | ✅ v0.1 | B | `src/` |
| [options-resolver-kit](./options-resolver-kit/) | ✅ v0.1 | D | `src/` |
| [crud-factory-kit](./crud-factory-kit/) | ✅ v0.1 | C | `src/` |
| [photo-uploader-kit](./photo-uploader-kit/) | ✅ v0.1 | B | `src/` |
| [placeholder-kit](./placeholder-kit/) | ✅ v0.1 | A | `src/` |
| [document-canvas-kit](./document-canvas-kit/) | ✅ v0.2 | B | `src/` |
| [crud-page-kit](./crud-page-kit/) | ✅ v0.1 | D | `src/` |
| [ui-primeng-kit](./ui-primeng-kit/) | ✅ v0.1 | B | `src/` |
| [auth-rbac-kit](./auth-rbac-kit/) | ✅ v0.1 | CD | `src/` |
| [eav-kit](./eav-kit/) | ✅ v0.1 | A | `src/` |
| [quotation-editor](./quotation-editor/) | ✅ v0.1 | B | `src/` |
| [layout-shell-kit](./layout-shell-kit/) | ✅ v0.1 | B | `src/` |

Checklists: [KPPDF-MODULES-CHECKLIST](./docs/KPPDF-MODULES-CHECKLIST.md) · [KITS-READINESS](./docs/KITS-READINESS-CHECKLIST.md) · [USER-WISHES](./docs/USER-WISHES-CHECKLIST.md) · [AUDIT-PLAN](./docs/PROJECT-AUDIT-AND-CORRECTION-PLAN.md)

---

## Quick Start (schema-table-kit hub)

Recommended setup from **repo root** (npm workspaces):

```bash
npm install          # root portable_kits — hoists deps for all kits
cd schema-table-kit
npm test
npm run build
npm start            # ng serve demo --port 4200
npm run demo         # ng serve demo --port 4201 (from repo root)
```

**Angular CLI:** `angular.json` only in `schema-table-kit/`. Running `ng serve` from repo root does not work — use `npm run demo` / `npm start` from root or `cd schema-table-kit && ng serve demo --port 4201`.

Alternative — hub only:

```bash
cd schema-table-kit
npm install
npm start
npm test
```

---

## New Kit

1. `node tools/scaffold-kits.mjs` — creates a folder in **root** (if not exists)
2. Or manually follow [docs/HOW-TO-ADD-KIT.md](./docs/HOW-TO-ADD-KIT.md)

---

## Integration with KPPDF / Other Projects

Copy **`kit-name/src/`** → `packages/kit-name/src/` + path alias.  
Example: [schema-table-kit/COPY-GUIDE.md](./schema-table-kit/COPY-GUIDE.md)
