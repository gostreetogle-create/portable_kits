# Как добавить новый kit в portable-kits

## 1. Создайте подпапку

```
portable-kits/
└── my-new-kit/
    ├── src/              ← библиотека (копируется в consumer)
    ├── demo/             ← опционально: standalone demo
    ├── tests/
    ├── package.json
    ├── README.md
    └── COPY-GUIDE.md     ← что переносить в consumer
```

Образец структуры: [schema-table-kit](../schema-table-kit/).

## 2. Правила kit

| Правило | Зачем |
|---------|-------|
| **`src/` автономен** | Consumer копирует только его |
| **Свой `npm start`** | Разработка без KPPDF |
| **Без import из consumer** | Kit не знает про KPPDF |
| **COPY-GUIDE.md внутри kit** | Инструкция переноса |
| **Native / minimal deps** | Легко copy anywhere |
| **Hub для dev** | `npm install` в корне repo; тесты/demo через `schema-table-kit` |

## 3. Обновите корневой README.md

Добавьте строку в таблицу «Каталог kits»:

```markdown
| [my-new-kit](./my-new-kit/) | Описание | `my-new-kit/src/` | QUICKSTART link |
```

## 4. Именование

- Папка: `kebab-case` (`schema-table-kit`, `form-builder-kit`)
- Префикс компонентов: уникальный (`st-`, `fb-`, …)
- Path alias в consumer: `@my-new-kit/angular`

## 5. Consumer-подключение (шаблон)

1. Copy `my-new-kit/src/` → `packages/my-new-kit/src/`
2. Path alias в `tsconfig.json`
3. `provideMyNewKit(config)` в `app.config.ts`
4. Компонент в форме consumer

## 6. Не кладите в корень repo

- ❌ Общий `src/` на все kits
- ❌ `node_modules` junctions в kit-папках (используйте root workspaces)
- ❌ Demo consumer-проектов (KPPDF) в этот repo

## 7. Разработка и CI

| Задача | Команда |
|--------|---------|
| Установка | `npm install` (из корня repo) |
| Тесты всех kits в hub | `cd schema-table-kit && npm test` |
| Сборка demo | `cd schema-table-kit && npm run build` |
| Dev server | `cd schema-table-kit && ng serve demo --port 4201` |

CI (`.github/workflows/ci.yml`): `npm ci` в корне → `npm test` + `npm run build` в `schema-table-kit`.

## 8. Регистрация в hub

После создания `src/` зарегистрируйте kit в **schema-table-kit** (dev shell), чтобы demo и vitest работали без consumer-проекта:

| # | Файл | Что добавить |
|---|------|--------------|
| 1 | `schema-table-kit/demo/modules.config.ts` | Запись в `DEMO_MODULES`: `id`, `title`, `route`, `hasDemo: true`, `readiness`, tier |
| 2 | `schema-table-kit/demo/app.routes.ts` | `{ path: 'modules/<kit-id>', component: ...DemoComponent }` |
| 3 | `schema-table-kit/demo/pages/<kit-id>/` | Demo-страница (`*-demo.component.ts`, при необходимости `.html`/`.scss`) |
| 4 | `schema-table-kit/tsconfig.json` | Path aliases: `@<kit-id>/core`, `@<kit-id>/angular` (и др. по паттерну kit) |
| 5 | `schema-table-kit/tsconfig.demo.json` | `"../<kit-id>/src/**/*.ts"` в `include` |
| 6 | `schema-table-kit/vitest.config.ts` | Aliases для `@<kit-id>/core` (и angular, если тесты импортируют) |
| 7 | `schema-table-kit/tests/<kit-id>.spec.ts` | Минимальный vitest: core-логика и/или проверка barrel exports |
| 8 | `<kit-id>/STATUS.md` | Done / Next, версия, честный статус тестов |
| 9 | `<kit-id>/README.md` | Краткое описание + ссылка на COPY-GUIDE / QUICKSTART |
| 10 | Корневой `README.md` | Строка в каталоге kits |

Проверка: `cd schema-table-kit && npm test && npm run build && ng serve demo`.
