# portable_kits

Склад **переносимых модулей** из KPPDF 3.0.

Каждый kit — **папка в корне этого repo**. Consumer подключает только **`kit-name/src/`**.

```
portable_kits/
├── README.md
├── docs/
├── schema-table-kit/          ✅ v1 — готов
├── entity-picker-kit/         📋 scaffold
├── crud-page-kit/             📋 scaffold
├── …
└── tools/
```

---

## Каталог kits

| Kit | Статус | Паттерн | Copy в consumer |
|-----|--------|---------|-----------------|
| [schema-table-kit](./schema-table-kit/) | ✅ v1 | A | `src/` |
| [schema-data-table-kit](./schema-data-table-kit/) | 📋 scaffold | A | `src/` |
| [entity-picker-kit](./entity-picker-kit/) | 📋 scaffold | BD | `src/` |
| [document-canvas-kit](./document-canvas-kit/) | 📋 scaffold | B | `src/` |
| [photo-uploader-kit](./photo-uploader-kit/) | 📋 scaffold | B | `src/` |
| [sortable-kit](./sortable-kit/) | 📋 scaffold | B | `src/` |
| [placeholder-kit](./placeholder-kit/) | 📋 scaffold | A | `src/` |
| [crud-page-kit](./crud-page-kit/) | 📋 scaffold | D | `src/` |
| [crud-factory-kit](./crud-factory-kit/) | 📋 scaffold | C | `src/` |
| [options-resolver-kit](./options-resolver-kit/) | 📋 scaffold | D | `src/` |
| [ui-primeng-kit](./ui-primeng-kit/) | 📋 scaffold | B | `src/` |
| [auth-rbac-kit](./auth-rbac-kit/) | 📋 scaffold | CD | `src/` |
| [eav-kit](./eav-kit/) | 📋 scaffold | A | `src/` |
| [quotation-editor](./quotation-editor/) | 📋 scaffold | B | `src/` |
| [layout-shell-kit](./layout-shell-kit/) | 📋 scaffold | B | `src/` |

Чеклист: [docs/KPPDF-MODULES-CHECKLIST.md](./docs/KPPDF-MODULES-CHECKLIST.md)

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
