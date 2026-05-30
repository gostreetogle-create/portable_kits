import type { OptionsResolverConfig } from '@options-resolver-kit/core';

export const DEMO_OPTIONS_RESOLVER_CONFIG: OptionsResolverConfig = {
  entities: [
    {
      entityKey: 'managers',
      load: async () => [
        { label: 'Иванов И.И.', value: 'mgr-1' },
        { label: 'Петров П.П.', value: 'mgr-2' },
        { label: 'Сидорова А.А.', value: 'mgr-3' },
      ],
    },
    {
      entityKey: 'categories',
      load: async () => [
        { label: 'Метизы', value: 'cat-1' },
        { label: 'Заготовки', value: 'cat-2' },
        { label: 'Услуги', value: 'cat-3' },
      ],
    },
  ],
};
