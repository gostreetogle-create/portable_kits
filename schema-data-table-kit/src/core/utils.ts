import type { SchemaDataTableColumn, SchemaDataTableRow, SortState, PaginationState } from './types';

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
  if (column.isOrphan) return '\u2014';
  if (!column.field) return '';

  const value = getFieldValue(row, column.field);
  if (value == null || value === '') return '\u2014';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

/**
 * Sort rows by the given sort state.
 * Returns a new array (does not mutate the original).
 * Handles numeric, string, and date values.
 */
export function sortRows(
  rows: SchemaDataTableRow[],
  sort: SortState | null,
): SchemaDataTableRow[] {
  if (!sort || !sort.direction) return rows;

  const sorted = [...rows];
  const { field, direction } = sort;
  const multiplier = direction === 'asc' ? 1 : -1;

  sorted.sort((a, b) => {
    const valA = getFieldValue(a, field);
    const valB = getFieldValue(b, field);

    // Nulls always sort to the end
    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;

    // Numeric comparison
    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * multiplier;
    }

    // Date comparison (ISO strings)
    const dateA = new Date(String(valA));
    const dateB = new Date(String(valB));
    if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
      return (dateA.getTime() - dateB.getTime()) * multiplier;
    }

    // String comparison
    return String(valA).localeCompare(String(valB)) * multiplier;
  });

  return sorted;
}

/**
 * Paginate rows for the given page and page size.
 * Returns the slice of rows for the current page.
 */
export function paginateRows(
  rows: SchemaDataTableRow[],
  pagination: PaginationState,
): SchemaDataTableRow[] {
  const { page, pageSize } = pagination;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return rows.slice(start, end);
}

/**
 * Calculate pagination state for the given rows.
 */
export function calculatePagination(
  total: number,
  page: number,
  pageSize: number,
): PaginationState {
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  return {
    page: Math.min(page, maxPage),
    pageSize,
    total,
  };
}

/**
 * Toggle sort state for a field.
 * No sort → asc → desc → no sort
 */
export function toggleSort(current: SortState | null, field: string): SortState | null {
  if (!current || current.field !== field) {
    return { field, direction: 'asc' };
  }
  if (current.direction === 'asc') {
    return { field, direction: 'desc' };
  }
  return null;
}
