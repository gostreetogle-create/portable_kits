export interface EntityPickerColumn {
  field: string;
  header: string;
  width?: string;
}

export interface EntityPickerSearchResult<T extends Record<string, unknown> = Record<string, unknown>> {
  items: T[];
  total: number;
}

export interface EntityPickerQuery {
  search?: string;
  page?: number;
  limit?: number;
}

export type EntityPickerSelectionMode = 'single' | 'multiple';

export interface EntityPickerDefinition<T extends Record<string, unknown> = Record<string, unknown>> {
  entityKey: string;
  title: string;
  columns: EntityPickerColumn[];
  searchPlaceholder?: string;
  search: (query: EntityPickerQuery) => Promise<EntityPickerSearchResult<T>>;
  labelField?: string;
  idField?: string;
  /** Default selection mode for this entity (overridable on component). */
  selectionMode?: EntityPickerSelectionMode;
}

export interface EntityPickerKitConfig {
  entities: EntityPickerDefinition[];
}

export type EntityPickerRow = Record<string, unknown>;

/** Returns row id using definition idField (default `_id`). */
export function entityPickerRowId(
  row: EntityPickerRow,
  idField = '_id',
): string {
  return String(row[idField] ?? '');
}

/** Toggle row id in a selection set (multi-select). */
export function toggleEntityPickerSelection(
  selected: Set<string>,
  rowId: string,
): Set<string> {
  const next = new Set(selected);
  if (next.has(rowId)) {
    next.delete(rowId);
  } else {
    next.add(rowId);
  }
  return next;
}
