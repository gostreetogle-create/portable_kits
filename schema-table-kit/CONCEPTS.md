# Концепция Schema Table Kit

## Главная идея

**Один компонент — все таблицы проекта.** Для каждой новой сущности БД не нужно копировать Angular-компонент и не нужна отдельная форма.

| Что | Сколько раз в проекте |
|-----|----------------------|
| `<st-schema-column-builder>` | **1** |
| `schema-tables.config.ts` | **1** (единый справочник сущностей) |
| Запись `EntitySchema` в config | **+1 блок данных** на каждую коллекцию БД |
| Сохранённое определение таблицы | **сколько угодно** (создаёт пользователь/админ) |

Builder читает список сущностей из config → пользователь выбирает «Товары» / «Заказы» в dropdown → поля подтягиваются автоматически.

---

## Три уровня данных

```
schema-tables.config.ts          ← разработчик, один раз на проект
        │
        ▼
EntitySchema[]                   ← «что есть в БД» (поля, русские подписи)
        │
        ▼  пользователь в UI
ColumnBuilderValue               ← «какие колонки показать» (entityKey + columns)
        │
        ▼  save
TableDefinition                  ← «именованная таблица» (key, label + builder)
```

### 1. `EntitySchema` — справочник сущности БД

Описывает **коллекцию/таблицу** и её **поля**. Живёт в `schema-tables.config.ts` (или приходит с backend через `createSchemaRouter`).

```typescript
export const ORDERS_ENTITY: EntitySchema = {
  key: 'orders',              // ключ в dropdown
  label: 'Заказы',            // русское имя в UI
  apiPath: '/orders',         // API для данных (v2)
  collection: 'orders',       // Mongo-коллекция (документация)
  schemaVersion: '1.0.0',     // ручная версия схемы
  fields: [
    { field: 'number', label: 'Номер', type: 'text', group: 'Основное' },
    { field: 'status', label: 'Статус', type: 'select', group: 'Основное' },
    { field: '_id', label: 'ID', type: 'text', selectable: false },
  ],
};
```

### 2. `ColumnBuilderValue` — зона builder (CVA)

Только **сущность + колонки**. Поля `key` и `label` (название таблицы) — **вне** компонента, в обёртке формы consumer/demo.

```typescript
interface ColumnBuilderValue {
  entityKey: string;           // 'products' | 'orders' | …
  columns: SchemaColumn[];     // выбранные поля, порядок, заголовки
  savedSchemaVersion?: string; // фиксируется при save
}
```

### 3. `TableDefinition` — сохранённая настройка

То, что админ создаёт в «Создать таблицу» и что потом подставляется в документы / CRUD / виджет.

```typescript
interface TableDefinitionDraft {
  key: string;                 // 'product-list-basic'
  label: string;               // 'Товарная таблица (базовая)'
  builder: ColumnBuilderValue;
}
```

**Одна сущность** (`products`) может иметь **много определений** с разным набором колонок:

- `product-list-basic` — sku, name, listPrice, unit
- `product-list-warehouse` — sku, name, stockQty, status

Компонент builder при этом **один**.

---

## Кто что делает

### Разработчик

1. Добавляет `EntitySchema` в `schema-tables.config.ts`.
2. Один раз подключает kit: `provideSchemaTableKit(config)`.
3. Вставляет `<st-schema-column-builder>` в форму consumer (типы таблиц, админка).
4. (Optional) Монтирует `createSchemaRouter(config)` на backend.

**Не делает:** отдельный компонент на каждую коллекцию MongoDB.

### Админ / пользователь

1. Открывает «Создать таблицу».
2. Заполняет key, label.
3. В builder: выбирает сущность → добавляет колонки из dropdown → ↑↓ порядок.
4. Сохраняет → JSON/Mongo, не код.

---

## Как добавить новую сущность

Пример: в проекте появилась коллекция `orders`.

### Шаг 1 — config

```typescript
// schema-tables.config.ts
export const SCHEMA_TABLES_CONFIG: SchemaTableKitConfig = {
  provider: 'static',
  entities: [
    PRODUCTS_ENTITY,
    ORDERS_ENTITY,   // ← добавили
  ],
};
```

### Шаг 2 — backend (optional)

Тот же config в Express — dropdown и HTTP-режим FE получают те же данные:

```typescript
app.use('/api/v1/schema', createSchemaRouter(SCHEMA_TABLES_CONFIG));
```

### Шаг 3 — готово

Перезапуск приложения → в dropdown builder появится «Заказы».  
**Компонент, форма, `provideSchemaTableKit()` — не меняются.**

### Чеклист полей `EntityFieldMeta`

| Поле | Назначение |
|------|------------|
| `field` | Ключ в БД, dot-path OK: `address.city` |
| `label` | Русская подпись в dropdown: «Город (address.city)» |
| `type` | text, select, currency, date, … |
| `width` | Подсказка ширины колонки |
| `selectable: false` | Служебные поля (_id, createdAt) — скрыты из dropdown |
| `group` | Группировка в UI (backlog v1.5) |
| `schemaVersion` | На уровне entity — для drift-warning |

---

## Частые вопросы

### Нужно ли копировать компонент для каждой таблицы?

**Нет.** Копируется только **описание сущности** в config. Builder универсальный.

### Нужна ли отдельная форма «Создать таблицу товаров» / «Создать таблицу заказов»?

**Нет.** Одна форма: key + label + `<st-schema-column-builder>`. Сущность выбирается в dropdown внутри builder.

### Чем отличается config от сохранённой таблицы?

| | Config (`EntitySchema`) | Сохранённая таблица (`TableDefinition`) |
|--|-------------------------|-------------------------------------------|
| Кто правит | Разработчик | Админ |
| Что описывает | Все поля БД | Какие поля показать и в каком порядке |
| Где хранится | Код / schema API | Mongo / localStorage |
| Пример | «У товаров есть sku, name, price» | «Товарная витрина: sku + name + price» |

### Что если поле удалили из config?

Колонка помечается **orphan** (badge «Устарело»), save не блокируется. Пользователь пересобирает колонки.

### Что если изменили `schemaVersion`?

Banner «Схема обновилась — проверьте колонки», save не блокируется.

---

## Куда это встраивается (roadmap)

| Этап | Что происходит |
|------|----------------|
| **v1 (сейчас)** | Конструктор + demo, save в localStorage |
| **integration** | KPPDF «Типы таблиц документов» → MongoDB |
| **v2** | `<st-schema-data-table tableKey="product-list-basic">` — один виджет, разные `tableKey` |
| **v2.5** | Auto CRUD-раздел из config |

В v2 компонент виджета тоже **один**: меняется только `tableKey`, данные — с `apiPath` сущности.

---

## Схема потока

```
┌─────────────────────┐
│ schema-tables.config │  ← разработчик добавляет EntitySchema
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ st-schema-column-   │  ← один компонент на весь проект
│ builder             │
└──────────┬──────────┘
           │ save
           ▼
┌─────────────────────┐
│ TableDefinition     │  ← key, label, columns (Mongo / localStorage)
└──────────┬──────────┘
           │ embed (v2)
           ▼
┌─────────────────────┐
│ st-schema-data-table│  ← tableKey="..."
└─────────────────────┘
```

---

## См. также

- [COPY-GUIDE.md](./COPY-GUIDE.md) — что переносить в consumer-проект
- [../README.md](../README.md) — каталог portable-kits
- [../docs/HOW-TO-ADD-KIT.md](../docs/HOW-TO-ADD-KIT.md) — добавить новый kit
- [INTEGRATION-KPPDF.md](./INTEGRATION-KPPDF.md) — план подключения к KPPDF
- `demo/mock-data/schema-tables.config.ts` — пример `PRODUCTS_ENTITY`
- `demo/mock-data/saved-tables.mock.ts` — примеры сохранённых таблиц
