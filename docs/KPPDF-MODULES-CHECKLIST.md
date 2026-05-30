# Чеклист portable-модулей из KPPDF 3.0

Все kits — **папки в корне `portable_kits/`** (без промежуточных `_kits-batch` и т.п.).

| # | Kit | Статус | Паттерн | Copy | Универсальность |
|---|-----|--------|---------|------|-----------------|
| 1 | schema-table-kit | ✅ v1 | A | `src/` | high |
| 2 | schema-data-table-kit | 📋 scaffold | A | `src/` | domain |
| 3 | entity-picker-kit | 📋 scaffold | BD | `src/` | high |
| 4 | document-canvas-kit | 📋 scaffold | B | `src/` | domain |
| 5 | photo-uploader-kit | 📋 scaffold | B | `src/` | high |
| 6 | sortable-kit | 📋 scaffold | B | `src/` | high |
| 7 | placeholder-kit | 📋 scaffold | A | `src/` | domain |
| 8 | crud-page-kit | 📋 scaffold | D | `src/` | high |
| 9 | crud-factory-kit | 📋 scaffold | C | `src/` | high |
| 10 | options-resolver-kit | 📋 scaffold | D | `src/` | high |
| 11 | ui-primeng-kit | 📋 scaffold | B | `src/` | high |
| 12 | auth-rbac-kit | 📋 scaffold | CD | `src/` | low |
| 13 | eav-kit | 📋 scaffold | A | `src/` | domain |
| 14 | quotation-editor | 🔒 kppdf-only | E | — | no |
| 15 | layout-shell-kit | 🔒 kppdf-only | E | — | no |

## Паттерны упаковки

| Паттерн | Структура kit | Copy в consumer |
|---------|---------------|-----------------|
| **A** | core + angular + express? + demo | `src/` |
| **B** | angular + demo | `src/` |
| **C** | core + express | `src/` |
| **D** | core + angular (services) | `src/` |
| **E** | README only | не copy |

## Порядок разработки

1. schema-table-kit ✅  
2. schema-data-table-kit → entity-picker-kit  
3. photo-uploader-kit, sortable-kit  
4. placeholder-kit, document-canvas-kit  
5. crud-factory-kit → crud-page-kit  
6. options-resolver-kit, ui-primeng-kit, eav-kit  
