# Schema Table Kit

Переиспользуемый модуль: единый config таблиц БД + конструктор колонок для Angular (+ optional Express schema API).

Часть repo **[portable-kits](../README.md)** — склад переносимых модулей. KPPDF и другие apps — consumers.

> **Разработка vs перенос:** эта папка — demo + тесты kit.  
> В consumer копируете **только `src/`** + свой `schema-tables.config.ts`.  
> Подробно: **[COPY-GUIDE.md](./COPY-GUIDE.md)**.

## Концепция (кратко)

**Один `<st-schema-column-builder>` на весь проект** — для каждой новой сущности БД компонент **не копируется**.

| Кто | Действие |
|-----|----------|
| **Разработчик** | Добавляет `EntitySchema` в `schema-tables.config.ts` (поля, русские подписи, `schemaVersion`) |
| **Админ** | В UI создаёт **определение таблицы**: key, label, выбор колонок из dropdown → save |

- **Config** — «что есть в БД» (все поля `products`, `orders`, …)
- **TableDefinition** — «какие колонки показать» (можно несколько таблиц на одну сущность)

Подробно: **[CONCEPTS.md](./CONCEPTS.md)** — уровни данных, FAQ, как добавить сущность, roadmap v2.

## Quick Start

```bash
git clone <your-repo> portable-kits
cd portable-kits/schema-table-kit
npm install
npm start
```

Откройте http://localhost:4200

### HTTP-режим (smoke test)

```bash
# терминал 1
npm run demo:server

# demo/environment.ts → provider: 'http'
npm start
```

Подробный чеклист: [QUICKSTART.md](./QUICKSTART.md)

## Структура

```
src/core/          — types, validation, presets (zero Angular)
src/angular/       — st-schema-column-builder + provideSchemaTableKit()
src/express/       — createSchemaRouter()
demo/              — demo-приложение «Создать таблицу»
demo-server/       — mock API :3333
tests/             — vitest (core, express, angular)
```

## COPY-GUIDE — перенос в свой проект

**Кратко:** копируете **`src/`**, не всю папку kit.

| Копируете | Не копируете |
|-----------|--------------|
| `src/core`, `src/angular`, `src/express` | `demo/`, `demo-server/`, `tests/`, `node_modules/` |

Полная инструкция: **[COPY-GUIDE.md](./COPY-GUIDE.md)** — alias, config, app.config, Express, чеклист.

### В двух словах

1. `src/` → `packages/schema-table-kit/src/` (или submodule)
2. Path alias в `tsconfig.json`
3. Свой `schema-tables.config.ts` в consumer (demo/mock — только образец)
4. `provideSchemaTableKit(config)` + `<st-schema-column-builder>`
5. (optional) `createSchemaRouter(config)` на backend

## schemaVersion

- Задаётся **вручную** на каждой сущности: `EntitySchema.schemaVersion` (напр. `'1.0.0'`).
- При save consumer записывает `savedSchemaVersion` из текущей entity.
- Если версии не совпадают — banner «Схема обновилась», **save не блокируется**.

## Orphan fields

Поле удалено из config, но осталось в сохранённых колонках → badge «Устарело», warning `orphan_field`.

## HttpSchemaProvider

```typescript
provideSchemaTableKit({
  provider: 'http',
  schemaApiUrl: 'http://localhost:3333/api/v1/schema',
})
```

Компонент эмитит `providerStatusChange`: `'idle' | 'loading' | 'ready' | 'error'`. При error — кнопка «Повторить».

## Public API

| Export | Описание |
|--------|----------|
| `provideSchemaTableKit(config)` | DI providers |
| `SchemaColumnBuilderComponent` | `<st-schema-column-builder>` (CVA) |
| `src/core` | types, `validateColumns`, `getFieldValue`, `applyPreset` |
| `createSchemaRouter(config)` | Express GET `/entities`, `/entities/:key` |

## Mock data

Demo использует поля **«Товары»** из KPPDF (`IProduct` / products-page) — скопировано в `demo/mock-data/`, без import из KPPDF.

## Документация

| Файл | Содержание |
|------|------------|
| [COPY-GUIDE.md](./COPY-GUIDE.md) | **Что копировать в новый проект и как подключить** |
| [CONCEPTS.md](./CONCEPTS.md) | Концепция, роли, FAQ, добавление сущности |
| [QUICKSTART.md](./QUICKSTART.md) | Clone → demo за 2 мин |
| [INTEGRATION-KPPDF.md](./INTEGRATION-KPPDF.md) | Подключение к KPPDF (backlog) |

## Scripts

| Команда | Описание |
|---------|----------|
| `npm start` | Demo :4200 |
| `npm run demo:server` | Mock schema API :3333 |
| `npm test` | Vitest |
| `npm run build` | Production build demo |
