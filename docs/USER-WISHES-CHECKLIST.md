# Wishes checklist for further discussion

> **Purpose:** summary of all recorded wishes for portable_kits / demo-hub / ui-primeng-kit from discussions.  
> **Not a work plan** — for prioritization, debate, and "do / don't" decisions.  
> **Updated:** 2026-05-30

**Related documents:**

- [UI-KIT-VISUAL-CUSTOMIZATION-VISION.md](./UI-KIT-VISUAL-CUSTOMIZATION-VISION.md) — architectural audit (persistence, playground, anti-patterns)
- [ui-primeng-kit/STATUS.md](../ui-primeng-kit/STATUS.md) — kit status and kp-* backlog
- [schema-table-kit/demo/modules.config.ts](../schema-table-kit/demo/modules.config.ts) — tier home (bricks → composite → apps)

---

## 1. Project philosophy

| Priority | Wish |
|----------|------|
| — | portable_kits — **separate project**, independent from KPPDF; KPPDF is only a **source for porting** code |

- [x] **P0** — portable_kits repo is autonomous: kits do not import KPPDF at runtime *(copy-paste `src/` model, see HOW-TO-ADD-KIT)*
- [x] **P0** — No runtime coupling with KPPDF: consumer copies `kit/src/` into their project, no shared npm/workspace with kppdf-3.0
- [ ] **P2** — Explicitly document boundary "port from KPPDF ≠ dependency on KPPDF" in README/COPY-GUIDE for new contributors

---

## 2. Demo hub — home page

- [x] **P1** — Three columns on home: **bricks (left)** → **composite (center)** → **apps (right)**, by complexity (`DEMO_MODULE_TIER_SECTIONS`, `home__tier-columns`)
- [ ] **P3** — Tier column labels/icons refine by UX (if needed after catalog is populated)

---

## 3. UI-kit — catalog and navigation (ui-primeng-kit)

- [x] **P1** — Separate hub/tab for small UI bricks: **type table** → click type → **demo all variants** (`/modules/ui-primeng-kit`, `/button|input|dialog`, planned → placeholder)
- [x] **P2** — Rename hub in user UI to **"UI-kit"** (catalog, breadcrumbs, home card in `modules.config.ts`)
- [ ] **P2** — Consistency of "UI-kit" across all demo pages and root README of kit (currently mixed: `ui-primeng-kit` as folder name — OK)

---

## 4. UI-kit — visual customization (playground)

Detailed roadmap: [UI-KIT-VISUAL-CUSTOMIZATION-VISION.md](./UI-KIT-VISUAL-CUSTOMIZATION-VISION.md) §5 (v0.2–v0.4).

- [x] **P1** — **UI-kit composer v0.1** (`/modules/ui-kit-composer`): palette + canvas + properties, button/input, localStorage draft, export JSON
- [ ] **P1** — Side panel on **button** demo page (separate from composer — optional, partially covered by composer)
- [x] **P1** — **Save** / Export → JSON preset (manual placement in `ui-primeng-kit/variants/presets/`)
- [ ] **P2** — Export SCSS snippet, TS preset → clipboard besides JSON
- [ ] **P2** — `core/button-variants.types.ts` + `variants/button.presets.ts` with approved variant examples
- [x] **P3** — Draft settings in localStorage (composer, key `kit-composer-draft-v1`)
- [ ] **P3** — Dev-only persistence (gitignored drafts) — **only if** needed after export-flow

**Notes:** panel — hub/demo tool, not mandatory consumer path; primary path — edit `_tokens.scss` / override CSS vars.

---

## 5. UI-kit — styles, "bricks folder", persistence

- [x] **P1** — Persistence decision: **git + SCSS/design tokens**, not DB for portable_kits *(recorded in vision doc §3.2)*
- [ ] **P1** — End state: **one styles folder** for small bricks (`ui-primeng-kit/src/angular/styles/`), included when composite modules import *(partially exists: `_tokens`, `_kp-button`, `_kp-field`; composite kits not yet documented for consumption)*
- [ ] **P2** — Consumer COPY-GUIDE: one `@include kp-light-tokens-on-root` + import kp-components; no runtime HTTP/CSS-folder
- [ ] **P2** — Composite kits (crud-page, layout-shell, …) use `<up-kp-*>` + documented token setup in demo and docs
- [ ] **P3** — `provideUiPrimengKit({ tokenOverrides })` — runtime CSS vars for white-label without rebuild (vision v1.0)

**Notes:** "jQuery-folder" in discussion = SCSS/UI-kit styles folder, not jQuery library.

---

## 6. UI-kit — port kp-* from KPPDF

- [x] **P1** — Fix/stabilize **KpButton** (premium/flat, severity, demo matrix)
- [ ] **P1** — Full port **~22 kp-* components** from KPPDF `shared/ui/*`; **next priority: select/dropdown** (KpSelect)
- [ ] **P1** — KpTable, KpPaginator — after select (see STATUS.md Next)
- [ ] **P2** — KppdfPreset / theme override helper in `provideUiPrimengKit()`
- [ ] **P3** — Standalone demo app in `ui-primeng-kit/demo/` (currently demo only in schema-table-kit hub)

**Notes:** selectors `up-kp-*` vs KPPDF `app-kp-*`; 19+ components in catalog as planned.

---

## 7. Documentation and audit (completed)

- [x] **P1** — Vision audit: [UI-KIT-VISUAL-CUSTOMIZATION-VISION.md](./UI-KIT-VISUAL-CUSTOMIZATION-VISION.md) (as-is / to-be / phased roadmap)
- [x] **P1** — Hub catalog: table + per-type routes + tests catalog
- [x] **P1** — Home three-tier columns
- [x] **P1** — KpButton fix + static variant showcase on `/modules/ui-primeng-kit/button`
- [x] **P1** — Checklist audit 2026-05-30 (KPPDF-MODULES, KITS-READINESS, STATUS, HOW-TO-ADD-KIT §8)

---

## Priority summary (for discussion)

| P | Open topics |
|---|-------------|
| **P1** | Style playground + Save/export; styles folder + composite integration; KpSelect and remaining kp-* port |
| **P2** | Export presets; COPY-GUIDE; UI-kit consistency in docs |
| **P3** | localStorage drafts; standalone ui-primeng demo; dev-only draft API |

---

## How to use this checklist

1. Discuss item → decision in vision doc or STATUS.md.
2. Implementation → move item to kit roadmap / Phase log in [KITS-READINESS-CHECKLIST.md](./KITS-READINESS-CHECKLIST.md).
3. Done → `[x]` here + note in STATUS "Done".
