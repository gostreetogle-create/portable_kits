# KITS Readiness Checklist — Maximum Readiness (Level 3)

**Level 3** = working `src/` code + hub demo page + vitest green + STATUS ✅

Last updated: 2026-05-31 — Comprehensive audit + fix session  
*Last audited: 2026-05-31 — Russian→English i18n sweep, TS fixes, scaffold cleanup, cross-kit deps audit*

---

## Definition of Done (Maximum Readiness)

| # | Criterion | Description |
|---|-----------|-------------|
| 1 | Real `src/` | No `export {}` stubs; portable code copied/adapted from KPPDF (zero imports from kppdf-3.0) |
| 2 | `provide*Kit()` | Angular DI provider (or Express factory for pattern C) where applicable |
| 3 | Hub demo | Page in `schema-table-kit/demo/pages/<kit-id>/` |
| 4 | Route | Entry in `schema-table-kit/demo/app.routes.ts` |
| 5 | `hasDemo: true` | In `schema-table-kit/demo/modules.config.ts` |
| 6 | Tests | `npm test` green in `schema-table-kit` |
| 7 | STATUS.md | Updated to ✅ v0.1+ with Done/Next sections |
| 8 | Docs | COPY-GUIDE + QUICKSTART accurate for current API |

**Readiness labels:** ✅ ready · 🟡 stub demo · 📋 scaffold · 📄 doc-only

---

## Global Monorepo Items

| # | Item | Status | Notes |
|---|------|--------|-------|
| G1 | Hub app `schema-table-kit` runs (`ng serve demo`) | ✅ | |
| G2 | `tsconfig.json` path aliases for ported kits | ✅ | All 15 kits wired |
| G3 | `tsconfig.demo.json` includes sibling kit `src/` | ✅ | |
| G4 | `vitest.config.ts` aliases for kit core | ✅ | |
| G5 | Shared deps via root npm workspaces | ✅ | |
| G6 | Home hub reflects `hasDemo` + readiness | ✅ | |
| G7 | Root `README.md` catalog matches STATUS | ✅ | Updated 2026-05-30 |
| G8 | `tools/scaffold-kits.mjs` | ✅ | |
| G9 | CI: `npm test && npm run build` | 🗑️ | Removed — not needed for copy-paste kits |

---

## Summary Matrix

| Kit | Status | P | Demo | Tests |
|-----|--------|---|------|-------|
| schema-table-kit | ✅ v1 | P0 | ✅ | ✅ |
| schema-data-table-kit | ✅ v0.1 | P1 | ✅ | ✅ |
| entity-picker-kit | ✅ v0.2 | P1 | ✅ | ✅ |
| sortable-kit | ✅ v0.1 | P1 | ✅ | ✅ |
| options-resolver-kit | ✅ v0.1 | P1 | ✅ | ✅ |
| crud-factory-kit | ✅ v0.1 | P1 | ✅ | ✅ |
| photo-uploader-kit | ✅ v0.1 | P1 | ✅ | ✅ |
| placeholder-kit | ✅ v0.1 | P1 | ✅ | ✅ |
| document-canvas-kit | ✅ v0.2 | P1 | ✅ | ✅ |
| crud-page-kit | ✅ v0.1 | P2 | ✅ | ✅ |
| ui-primeng-kit | ✅ v0.1 | P2 | ✅ | ✅ |
| auth-rbac-kit | ✅ v0.1 | P3 | ✅ | ✅ |
| eav-kit | ✅ v0.1 | P3 | ✅ | ✅ |
| quotation-editor | ✅ v0.1 | P0 | ✅ | ✅ |
| layout-shell-kit | ✅ v0.1 | P3 | ✅ | ✅ |

**Level 3 count:** 15/15 ready ✅

---

## Per-Kit Checklists (condensed)

| Kit | Real src | provide* | Demo | Route | hasDemo | Tests | STATUS | Docs |
|-----|----------|----------|------|-------|---------|-------|--------|------|
| schema-table-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| schema-data-table-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| entity-picker-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| sortable-kit | ✅ | — | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| options-resolver-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| crud-factory-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| photo-uploader-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| placeholder-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| document-canvas-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| crud-page-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| ui-primeng-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| auth-rbac-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| eav-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| quotation-editor | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| layout-shell-kit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |

---

## Phase 3–4 Completion Log (2026-05-30)

- [x] **document-canvas-kit v0.2** — table/separator blocks, background image, picker hook
- [x] **entity-picker-kit v0.2** — multi-select mode + tests
- [x] **crud-page-kit v0.1** — CrudStore + `<cp-crud-page>` + hub demo
- [x] **eav-kit v0.1** — `<eav-attribute-editor>` + mock persistence
- [x] **auth-rbac-kit v0.1** — hasPermission + AuthRbacService + Express stub
- [x] **layout-shell-kit v0.1** — `<ls-layout-shell>` sidebar shell + vitest spec
- [x] **quotation-editor v0.1** — `<qe-quotation-editor>` composes canvas + picker + placeholders

## Commands

```bash
cd schema-table-kit
npm test      # 393+ tests, all kits
npm run build # demo bundle OK
ng serve demo --port 4201
```

## Remaining non-blocking debt

- Пожелания и backlog UI-кита: [USER-WISHES-CHECKLIST.md](./USER-WISHES-CHECKLIST.md)
- COPY-GUIDE / QUICKSTART sweep for 🟡 docs column
- Full KPPDF consumer cutover (INTEGRATION-KPPDF wiring in kppdf-3.0)
- ui-primeng-kit: remaining 19+ KPPDF components (catalog hub ✅ — table + per-type demo pages at `/modules/ui-primeng-kit`)
- quotation-editor: parity with KPPDF (~2800 lines) — v0.1 composes kits only
