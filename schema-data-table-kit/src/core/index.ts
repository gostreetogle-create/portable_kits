import { getFieldValue } from '@schema-table-kit/core';

import type { SchemaDataTableColumn, SchemaDataTableRow } from './types';

export function formatSchemaCell(
  row: SchemaDataTableRow,
  column: SchemaDataTableColumn,
): string {
  if (column.isOrphan) return '—';
  if (!column.field) return '';

  const value = getFieldValue(row, column.field);
  if (value == null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Да' : 'Нет';
  return String(value);
}

export * from './types';
