# Интеграция Schema Table Kit в KPPDF (backlog)

> **v1 не подключает KPPDF.** Этот документ — план на этап после стабилизации kit.

## Цель

Заменить ручной `kp-column-editor` в **Типы таблиц документов** на `<st-schema-column-builder>` с единым `schema-tables.config.ts`.

> **Не копировать компонент** на каждую сущность — один builder, все коллекции в config.  
> См. [CONCEPTS.md](./CONCEPTS.md).

## Шаги

1. **Copy kit** в `packages/schema-table-kit` или git submodule.
2. **Config** — `src/schema-tables.config.ts` с entities из Mongo-коллекций KPPDF (products, orders, …).
3. **Angular** — `provideSchemaTableKit(SCHEMA_TABLES_CONFIG)` в `app.config.ts`.
4. **document-table-types-page** — поля `key`, `label` остаются в форме; `formControlName="builder"` для CVA.
5. **Backend** — `app.use('/api/v1/schema', authMiddleware, createSchemaRouter(SCHEMA_TABLES_CONFIG))`.
6. **Модель** — добавить `schemaEntity` в `IDocumentTableType`, хранить `savedSchemaVersion` в Mongo.

## Инварианты KPPDF

- Не импортировать `primeng` в kit — только `st-schema-column-builder`.
- RBAC: schema API только для ролей с правом на справочники/админку.
- Русские подписи — из `EntityFieldMeta.label`, не из URL.

## Проверка после интеграции

- [ ] Создание типа таблицы: dropdown «Товары» + поля как в products-page
- [ ] Orphan badge при удалении поля из config
- [ ] schemaVersion warning не блокирует save
- [ ] QuotationEditor / document blocks — без регрессий (P0)
