import type { EntityPickerDefinition } from '@entity-picker-kit/core';

const MOCK_PRODUCTS = [
  {
    _id: 'prod-001',
    sku: 'BLT-M8-40',
    name: 'Болт М8×40',
    categoryId: 'Метизы',
    listPrice: '12,50 ₽',
    stockQty: '240',
  },
  {
    _id: 'prod-002',
    sku: 'NUT-M8',
    name: 'Гайка М8',
    categoryId: 'Метизы',
    listPrice: '4,20 ₽',
    stockQty: '512',
  },
  {
    _id: 'prod-003',
    sku: 'WSH-M8',
    name: 'Шайба М8',
    categoryId: 'Метизы',
    listPrice: '1,80 ₽',
    stockQty: '1024',
  },
  {
    _id: 'prod-004',
    sku: 'PLT-100',
    name: 'Пластина 100×50',
    categoryId: 'Заготовки',
    listPrice: '85,00 ₽',
    stockQty: '48',
  },
];

export const DEMO_ENTITY_PICKER_CONFIG = {
  entities: [
    {
      entityKey: 'products',
      title: 'Выберите товар',
      searchPlaceholder: 'Поиск по названию или артикулу…',
      columns: [
        { field: 'sku', header: 'Артикул', width: '120px' },
        { field: 'name', header: 'Наименование' },
        { field: 'categoryId', header: 'Категория', width: '120px' },
        { field: 'listPrice', header: 'Цена', width: '100px' },
        { field: 'stockQty', header: 'Остаток', width: '90px' },
      ],
      search: async ({ search }) => {
        const q = (search ?? '').toLowerCase();
        const items = MOCK_PRODUCTS.filter(
          (p) =>
            !q ||
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q),
        );
        return { items, total: items.length };
      },
    },
  ] satisfies EntityPickerDefinition[],
};
