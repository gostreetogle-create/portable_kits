import type { SchemaDataTableColumn, SchemaDataTableRow } from './types';

/**
 * Safely get a nested field value from a row object.
 * Supports dot-notation paths: e.g. "user.name"
 */
export function getFieldValue(row: Record<string, unknown>, field: string): unknown {
  const parts = field.split('.');
  let value: unknown = row;
  for (const part of parts) {
    if (value == null || typeof value !== 'object') return undefined;
    value = (value as Record<string, unknown>)[part];
  }
  return value;
}

export function formatSchemaCell(
  row: SchemaDataTableRow,
  column: SchemaDataTableColumn,
): string {
  if (column.isOrphan) return '—';
  if (!column.field) return '';

  const value = getFieldValue(row, column.field);
  if (value == null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

export type { SchemaDataTableConfig, SchemaDataTableColumn, SchemaDataTableRow } from './types';
