# Portable modules checklist (from KPPDF 3.0)

All kits are **universal portable modules** in `portable_kits/` root.  
KPPDF is one possible source for extracting code, not the only consumer and not a separate kit category.

| # | Kit | Status | Pattern | Copy | Universality |
|---|-----|--------|---------|------|-----------------|
| 1 | schema-table-kit | ✅ v1 | A | `src/` | high |
| 2 | schema-data-table-kit | ✅ v0.1 | A | `src/` | domain |
| 3 | entity-picker-kit | ✅ v0.2 | BD | `src/` | high |
| 4 | document-canvas-kit | ✅ v0.2 | B | `src/` | domain |
| 5 | photo-uploader-kit | ✅ v0.1 | B | `src/` | high |
| 6 | sortable-kit | ✅ v0.1 | B | `src/` | high |
| 7 | placeholder-kit | ✅ v0.1 | A | `src/` | domain |
| 8 | crud-page-kit | ✅ v0.1 | D | `src/` | high |
| 9 | crud-factory-kit | ✅ v0.1 | C | `src/` | high |
| 10 | options-resolver-kit | ✅ v0.1 | D | `src/` | high |
| 11 | ui-primeng-kit | ✅ v0.1 | B | `src/` | high |
| 12 | auth-rbac-kit | ✅ v0.1 | CD | `src/` | low |
| 13 | eav-kit | ✅ v0.1 | A | `src/` | domain |
| 14 | quotation-editor | ✅ v0.1 | B | `src/` | domain |
| 15 | layout-shell-kit | ✅ v0.1 | B | `src/` | high |

## Packaging patterns

| Pattern | Kit structure | Copy to consumer |
|---------|---------------|-----------------|
| **A** | core + angular + express? + demo | `src/` |
| **B** | angular + demo | `src/` |
| **C** | core + express | `src/` |
| **D** | core + angular (services) | `src/` |
| **E** | README only (legacy) | not copy |

## Development order

1. schema-table-kit ✅  
2. schema-data-table-kit → entity-picker-kit  
3. photo-uploader-kit, sortable-kit  
4. placeholder-kit, document-canvas-kit  
5. crud-factory-kit → crud-page-kit ✅  
6. options-resolver-kit, ui-primeng-kit, eav-kit ✅  

---

*Last audited: 2026-05-31 — Russian→English translation, scaffold cleanup, cross-kit deps audit*
