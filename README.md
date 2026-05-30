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
├── document-canvas-kit/       ✅ v0.2
├── crud-page-kit/             ✅ v0.1
├── quotation-editor/          ✅ v0.1
├── layout-shell-kit/          ✅ v0.1
├── …
└── tools/
```

**15/15 kits** с рабочим `src/`, hub demo и vitest green (Level 3).

---

## Каталог kits

| Kit | Статус | Паттерн | Copy в consumer |
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

Чеклисты: [KPPDF-MODULES-CHECKLIST](./docs/KPPDF-MODULES-CHECKLIST.md) · [KITS-READINESS](./docs/KITS-READINESS-CHECKLIST.md) · [USER-WISHES](./docs/USER-WISHES-CHECKLIST.md) · [AUDIT-PLAN](./docs/PROJECT-AUDIT-AND-CORRECTION-PLAN.md)

---

## Быстрый старт (schema-table-kit hub)

Рекомендуется установка из **корня repo** (npm workspaces):

```bash
npm install          # корень portable_kits — hoists deps для всех kits
cd schema-table-kit
npm test
npm run build
npm start            # ng serve demo --port 4200
```

Альтернатива — только hub:

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
