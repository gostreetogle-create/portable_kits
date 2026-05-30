# PROJECT AUDIT & CORRECTION PLAN

**Date:** 2026-05-30  
**Repo:** `portable_kits`  
**Hub:** `schema-table-kit/demo` (`ng serve demo`)

---

## Executive Summary

`portable_kits` is a **copy-paste module warehouse**: each kit is a root-level folder whose `src/` can be copied into any consumer (KPPDF or otherwise) with path aliases and `provide*Kit()` wiring. The **schema-table-kit demo hub** is the shared dev/test shell for all kits.

**Current progress:** **15/15 kits** at Level 3 — real portable `src/`, hub demos, vitest green, STATUS ✅.

**Direction is correct** — monorepo-at-root, hub-driven demos, zero KPPDF imports, COPY-GUIDE per kit. Remaining debt: **per-kit COPY-GUIDE accuracy (🟡)**, **Angular prebundle/workaround**, **full KPPDF cutover** (INTEGRATION-KPPDF backlog).

---

## Principles

| # | Principle | Meaning |
|---|-----------|---------|
| P1 | **Reusability** | Kits are generic; no KPPDF types, routes, or Mongo models in `src/` |
| P2 | **No KPPDF coupling in UI** | Plain HTML/CSS v0.1 acceptable; PrimeNG via optional ui-primeng-kit skin |
| P3 | **Copy-paste kits** | Consumer copies only `kit-name/src/` + tsconfig paths + provider |
| P4 | **Hub as dev shell** | `schema-table-kit` hosts demos; kits do not depend on the hub |
| P5 | **STATUS is source of truth** | README catalog and hub badges follow each kit's STATUS.md |
| P6 | **KPPDF is a source, not owner** | INTEGRATION-KPPDF.md is backlog; no `_kits-batch`, no kppdf-only kits |

---

## Current State Matrix (15 kits)

| # | Kit | Readiness | `src/` | Hub demo | Tests | Pattern | Notes |
|---|-----|-----------|--------|----------|-------|---------|-------|
| 1 | schema-table-kit | ✅ v1 | Real | ✅ | ✅ | A | Reference implementation |
| 2 | schema-data-table-kit | ✅ v0.1 | Real | ✅ | ✅ | A | New component (not kp-table port) |
| 3 | entity-picker-kit | ✅ v0.2 | Real | ✅ | ✅ | BD | Multi-select mode |
| 4 | sortable-kit | ✅ v0.1 | Real | ✅ | ✅ | B | Uses @angular/cdk/drag-drop |
| 5 | options-resolver-kit | ✅ v0.1 | Real | ✅ | ✅ | D | |
| 6 | crud-factory-kit | ✅ v0.1 | Real | ✅ | ✅ | C | Express only |
| 7 | photo-uploader-kit | ✅ v0.1 | Real | ✅ | ✅ | B | Plain HTML, no PrimeNG |
| 8 | placeholder-kit | ✅ v0.1 | Real | ✅ | ✅ | A | Subset registry |
| 9 | document-canvas-kit | ✅ v0.2 | Real | ✅ | ✅ | B | Table + separator + background |
| 10 | crud-page-kit | ✅ v0.1 | Real | ✅ | ✅ | D | CrudStore + cp-crud-page |
| 11 | ui-primeng-kit | ✅ v0.1 | Real | ✅ | ✅ | B | KpButton, KpInput, KpDialog |
| 12 | auth-rbac-kit | ✅ v0.1 | Real | ✅ | ✅ | CD | hasPermission + Express stub |
| 13 | eav-kit | ✅ v0.1 | Real | ✅ | ✅ | A | Attribute editor |
| 14 | quotation-editor | ✅ v0.1 | Real | ✅ | ✅ | B | Composes canvas + picker |
| 15 | layout-shell-kit | ✅ v0.1 | Real | ✅ | ✅ | B | Sidebar shell |

**Legend:** ✅ ready · stub page = obsolete (all kits have demos)

---

## Problems Found

### P0 — Blocks correctness / misleads consumers

| ID | Problem | Status |
|----|---------|--------|
| P0-1 | Root README catalog drift | ✅ Fixed 2026-05-30 |
| P0-2 | Hub home binary badges | ✅ Fixed (readiness field) |
| P0-3 | sortable-kit CDK docs | ✅ Fixed |
| P0-4 | NG0203 workaround | 🟡 Documented; long-term fix deferred |
| P0-5 | v0.1 vs v1 label drift | ✅ Fixed |

### P1 — Architectural / maintainability

| ID | Problem | Status |
|----|---------|--------|
| P1-1 | node_modules junctions | ✅ Workspaces |
| P1-2 | Large hub bundle | 🟡 Accepted for dev shell |
| P1-3 | Stale kit READMEs | 🟡 Partial — STATUS updated |
| P1-4 | scaffold.spec.ts placeholders | 🟡 Low priority cleanup |
| P1-5 | quotation-editor empty | ✅ v0.1 ported |
| P1-6 | No CI | ✅ GitHub Actions |

### P2 — Nice to have / cleanup

| ID | Problem | Status |
|----|---------|--------|
| P2-1 | scaffold-kits.mjs stale output | ✅ |
| P2-2 | placeholder-kit express stub | 🟡 |
| P2-3 | No isolated npm start per kit | ✅ C21: hub is canonical |
| P2-4 | entity-picker test gap | ✅ Fixed v0.2 |
| P2-5 | INTEGRATION-KPPDF boilerplate | 🟡 C22: updated for new kits; full cutover deferred |

---

## Correction Actions

### Phase 1 — Quick wins (docs + hub honesty) ✅

- [x] **C1** – **C7** (see prior log)

### Phase 2 — Hub & build hygiene ✅

- [x] **C8** – **C12** (see prior log)

### Phase 3 — Port next blocking kits ✅

- [x] **C13** ui-primeng-kit v0.1
- [x] **C14** document-canvas-kit v0.2 — table/separator/background
- [x] **C15** crud-page-kit v0.1 — CrudStore + generic list page
- [x] **C16** entity-picker multi-select v0.2

### Phase 4 — Product completion ✅

- [x] **C17** quotation-editor v0.1 — compose canvas + picker + placeholder
- [x] **C18** layout-shell-kit v0.1
- [x] **C19** eav-kit v0.1
- [x] **C20** auth-rbac-kit v0.1
- [x] **C21** Per-kit isolated demos — **hub is canonical**; each kit has `demo/README.md`
- [x] **C22** KPPDF integration pass — INTEGRATION-KPPDF.md updated for v0.1 kits; full KPPDF wiring remains consumer task

---

## Definition of Done (whole project)

| # | Criterion | Status |
|---|-----------|--------|
| D1 | All 15 kits have real `src/` | ✅ |
| D2 | Each kit: STATUS ✅, hub demo, vitest green | ✅ |
| D3 | Root README + checklists match STATUS | ✅ |
| D4 | Hub home shows accurate readiness | ✅ |
| D5 | CI test + build green | ✅ |
| D6 | Zero kppdf-3.0 imports in kit `src/` | ✅ |
| D7 | COPY-GUIDE accurate | 🟡 v0.1 subset documented |
| D8 | quotation-editor composes canvas + picker | ✅ |
| D9 | Consumer copy per COPY-GUIDE | ✅ pattern established |
| D10 | No misleading v1 on partial ports | ✅ |

---

## Related Docs

- [KITS-READINESS-CHECKLIST.md](./KITS-READINESS-CHECKLIST.md)
- [KPPDF-MODULES-CHECKLIST.md](./KPPDF-MODULES-CHECKLIST.md)
- [HOW-TO-ADD-KIT.md](./HOW-TO-ADD-KIT.md)
