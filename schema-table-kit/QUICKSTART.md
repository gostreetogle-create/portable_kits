# Quick Start

## 1. Clone & run

```bash
git clone <your-repo> portable-kits
cd portable-kits/schema-table-kit
npm install
npm start
```

Откройте http://localhost:4200

## 2. Checklist в demo

- [ ] Dropdown **Товары**
- [ ] **+ Добавить колонку** → выбрать **Артикул (sku)** → заголовок «Артикул»
- [ ] ↑ ↓ меняет порядок
- [ ] **Сохранить** → таблица в списке слева
- [ ] **Симулировать orphan** → badge «Устарело»
- [ ] JSON preview внизу

## 3. Переключить на HTTP

1. `demo/environment.ts` → `provider: 'http'`
2. `npm run demo:server` (port 3333)
3. `npm start`

## 4. Перенос в свой проект

1. Copy **`portable-kits/schema-table-kit/src/`** (не demo, не весь repo)
2. Свой `schema-tables.config.ts` с `entities[]`
3. `provideSchemaTableKit(config)` в `app.config.ts`
4. `<st-schema-column-builder formControlName="builder" />`

См. [COPY-GUIDE.md](./COPY-GUIDE.md) и [корневой README](../README.md).

## 5. Новая сущность БД

Не нужен новый компонент — добавьте блок в config:

```typescript
entities: [
  PRODUCTS_ENTITY,
  { key: 'orders', label: 'Заказы', schemaVersion: '1.0.0', fields: [/* … */] },
]
```

Подробнее: [CONCEPTS.md](./CONCEPTS.md)

## schemaVersion

- Задаётся в `EntitySchema.schemaVersion` (ручная, напр. `1.0.0`)
- При save demo записывает `savedSchemaVersion` в builder
- При несовпадении с текущей версией — warning, save не блокируется
