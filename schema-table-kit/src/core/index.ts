export * from './types';
export * from './field-value';
export * from './registry';
export * from './validation';
export * from './provider.interface';
export * from './presets';

export const DEFAULT_COLUMN_TYPES = [
  { type: 'text', label: 'Текст' },
  { type: 'number', label: 'Число' },
  { type: 'currency', label: 'Валюта', defaultWidth: '100px' },
  { type: 'select', label: 'Список', hasOptions: true },
  { type: 'date', label: 'Дата' },
  { type: 'image', label: 'Изображение', defaultWidth: '60px' },
  { type: 'textarea', label: 'Текст (многостр.)' },
  { type: 'boolean', label: 'Да/Нет' },
] as const;
