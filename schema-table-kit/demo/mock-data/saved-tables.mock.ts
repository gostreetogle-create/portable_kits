import type { TableDefinitionDraft } from '../../src/core';

export const SAVED_TABLES_MOCK: TableDefinitionDraft[] = [
  {
    key: 'product-list-basic',
    label: 'Товарная таблица (базовая)',
    builder: {
      entityKey: 'products',
      savedSchemaVersion: '1.0.0',
      columns: [
        { field: 'sku', header: 'Артикул', type: 'text', width: '110px' },
        { field: 'name', header: 'Наименование', type: 'text' },
        { field: 'listPrice', header: 'Цена', type: 'currency', width: '100px' },
        { field: 'unit', header: 'Ед. изм.', type: 'text', width: '90px' },
      ],
    },
  },
  {
    key: 'product-list-orphan-demo',
    label: 'Пример с устаревшим полем',
    builder: {
      entityKey: 'products',
      savedSchemaVersion: '0.9.0',
      columns: [
        { field: 'sku', header: 'Артикул', type: 'text', width: '110px' },
        { field: 'oldFieldRemoved', header: 'Старое поле', type: 'text', isOrphan: true },
        { field: 'name', header: 'Наименование', type: 'text' },
      ],
    },
  },
];

export const STORAGE_KEY = 'schema-table-kit.saved-tables';
