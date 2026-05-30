# portable_kits

Склад **переносимых модулей** из KPPDF 3.0.

Каждый kit — **папка в корне этого repo**. Consumer подключает только **`kit-name/src/`**.

```
portable_kits/
├── README.md
├── docs/
├── schema-table-kit/          ✅ v1 — эталон + demo hub
├── photo-uploader-kit/        ✅ v0.1
├── placeholder-kit/           ✅ v0.1
├── document-canvas-kit/       ✅ v0.1
├── crud-page-kit/             📋 scaffold
├── …
└── tools/
```

**9/15 kits** с рабочим `src/` и demo в hub. Остальные — scaffold.

---

## Каталог kits

| Kit | Статус | Паттерн | Copy в consumer |
|-----|--------|---------|-----------------|
| [schema-table-kit](./schema-table-kit/) | ✅ v1 | A | `src/` |
| [schema-data-table-kit](./schema-data-table-kit/) | ✅ v0.1 | A | `src/` |
| [entity-picker-kit](./entity-picker-kit/) | ✅ v0.1 | BD | `src/` |
| [sortable-kit](./sortable-kit/) | ✅ v0.1 | B | `src/` |
| [options-resolver-kit](./options-resolver-kit/) | ✅ v0.1 | D | `src/` |
| [crud-factory-kit](./crud-factory-kit/) | ✅ v0.1 | C | `src/` |
| [photo-uploader-kit](./photo-uploader-kit/) | ✅ v0.1 | B | `src/` |
| [placeholder-kit](./placeholder-kit/) | ✅ v0.1 | A | `src/` |
| [document-canvas-kit](./document-canvas-kit/) | ✅ v0.1 | B | `src/` |
| [crud-page-kit](./crud-page-kit/) | 📋 scaffold | D | `src/` |
| [ui-primeng-kit](./ui-primeng-kit/) | 📋 scaffold | B | `src/` |
| [auth-rbac-kit](./auth-rbac-kit/) | 📋 scaffold | CD | `src/` |
| [eav-kit](./eav-kit/) | 📋 scaffold | A | `src/` |
| [quotation-editor](./quotation-editor/) | 📋 scaffold | B | `src/` |
| [layout-shell-kit](./layout-shell-kit/) | 📋 scaffold | B | `src/` |

Чеклисты: [KPPDF-MODULES-CHECKLIST](./docs/KPPDF-MODULES-CHECKLIST.md) · [KITS-READINESS](./docs/KITS-READINESS-CHECKLIST.md) · [AUDIT-PLAN](./docs/PROJECT-AUDIT-AND-CORRECTION-PLAN.md)

---

## Быстрый старт (schema-table-kit)

```bash
cd schema-table-kit
npm install
npm start
npm test
```

---

## Новый kit

1. `node tools/scaffold-kits.mjs` — создаст папку в **корне** (если ещё нет)
2. Или вручную по [docs/HOW-TO-ADD-KIT.md](./docs/HOW-TO-ADD-KIT.md)

---

## Подключение в KPPDF / другой проект

Copy **`kit-name/src/`** → `packages/kit-name/src/` + path alias.  
Пример: [schema-table-kit/COPY-GUIDE.md](./schema-table-kit/COPY-GUIDE.md)
