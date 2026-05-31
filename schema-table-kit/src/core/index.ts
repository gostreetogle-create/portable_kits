export type {
  SchemaColumnType,
  EntityFieldMeta,
  EntitySchema,
  SchemaColumn,
  ColumnBuilderValue,
  SchemaTableKitConfig,
  ProviderStatus,
  ColumnValidationCode,
  ColumnValidationIssue,
  ColumnTypeDefinition,
  TableDefinitionDraft,
} from './types';
export { getFieldValue, FIELD_PATH_PATTERN, isValidFieldPath } from './field-value';
export {
  findEntity,
  findFieldMeta,
  getSelectableFields,
  fieldOptionLabel,
  buildColumnFromField,
  detectSchemaDrift,
  mergeSchemas,
} from './registry';
export { markOrphanColumns, validateColumns } from './validation';
export type { SchemaProvider } from './provider.interface';
export type { ColumnPreset } from './presets';
export { applyPreset } from './presets';

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
