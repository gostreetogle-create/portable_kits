import type { EavAttributeDefinition } from '@eav-kit/core';

const STORE = new Map<string, EavAttributeDefinition[]>([
  [
    'products',
    [
      {
        entityKey: 'products',
        key: 'weight',
        label: 'Вес, кг',
        type: 'number',
        required: false,
        order: 0,
      },
      {
        entityKey: 'products',
        key: 'material',
        label: 'Материал',
        type: 'string',
        required: false,
        order: 1,
      },
    ],
  ],
]);

export const DEMO_EAV_CONFIG = {
  loadAttributes: async (entityKey: string) => STORE.get(entityKey) ?? [],
  saveAttributes: async (entityKey: string, attrs: EavAttributeDefinition[]) => {
    STORE.set(entityKey, attrs);
  },
};
