import type { EntitySchema, SchemaTableKitConfig } from '../../src/core';

/** Demo-конфиг коллекции «Товары» (образец IProduct для schema-table) */
export const PRODUCTS_ENTITY: EntitySchema = {
  key: 'products',
  label: 'Товары',
  apiPath: '/products',
  collection: 'products',
  schemaVersion: '1.0.0',
  fields: [
    { field: 'photos', label: 'Фото', type: 'image', width: '60px', group: 'Основное' },
    { field: 'sku', label: 'Артикул', type: 'text', width: '110px', group: 'Основное' },
    { field: 'name', label: 'Наименование', type: 'text', group: 'Основное' },
    { field: 'subcategory', label: 'Подкатегория', type: 'text', width: '130px', group: 'Основное' },
    { field: 'kind', label: 'Тип', type: 'select', width: '110px', group: 'Основное' },
    { field: 'unit', label: 'Ед. изм.', type: 'text', width: '90px', group: 'Основное' },
    { field: 'categoryId', label: 'Категория', type: 'select', group: 'Справочники' },
    { field: 'listPrice', label: 'Цена', type: 'currency', width: '100px', group: 'Цены' },
    { field: 'costPrice', label: 'Себест.', type: 'number', width: '100px', group: 'Цены' },
    { field: 'stockQty', label: 'Остаток', type: 'number', width: '100px', group: 'Склад' },
    { field: 'status', label: 'Статус', type: 'select', width: '110px', group: 'Основное' },
    { field: 'description', label: 'Описание', type: 'textarea', group: 'Основное' },
    { field: 'materials', label: 'Материалы', type: 'text', group: 'Техническое' },
    { field: 'weight', label: 'Вес', type: 'number', width: '90px', group: 'Техническое' },
    { field: '_id', label: 'ID', type: 'text', selectable: false },
    { field: 'createdAt', label: 'Created', type: 'date', selectable: false },
    { field: 'updatedAt', label: 'Обновлён', type: 'date', selectable: false },
  ],
};

export const MOCK_SCHEMA_CONFIG: SchemaTableKitConfig = {
  provider: 'static',
  entities: [PRODUCTS_ENTITY],
};
