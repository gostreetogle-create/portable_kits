# Чеклист portable-модулей из KPPDF 3.0

Все kits — **универсальные переносимые модули** в корне `portable_kits/` (без промежуточных `_kits-batch` и т.п.).  
KPPDF — один из возможных источников для извлечения кода, не единственный consumer и не отдельная категория kit'ов.

| # | Kit | Статус | Паттерн | Copy | Универсальность |
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

## Паттерны упаковки

| Паттерн | Структура kit | Copy в consumer |
|---------|---------------|-----------------|
| **A** | core + angular + express? + demo | `src/` |
| **B** | angular + demo | `src/` |
| **C** | core + express | `src/` |
| **D** | core + angular (services) | `src/` |
| **E** | README only (legacy) | не copy |

## Порядок разработки

1. schema-table-kit ✅  
2. schema-data-table-kit → entity-picker-kit  
3. photo-uploader-kit, sortable-kit  
4. placeholder-kit, document-canvas-kit  
5. crud-factory-kit → crud-page-kit ✅  
6. options-resolver-kit, ui-primeng-kit, eav-kit ✅  

---

*Last audited: 2026-05-30*
