export interface SchemaDataTableConfig {
  emptyMessage?: string;
  /** Default page size */
  pageSize?: number;
  /** Page size options for the paginator */
  pageSizeOptions?: number[];
  /** Enable sorting by default */
  sortable?: boolean;
}

/** Column definition — local copy to avoid cross-kit dependency. */
export interface SchemaDataTableColumn {
  field?: string;
  header?: string;
  width?: string;
  type?: string;
  isOrphan?: boolean;
  selectable?: boolean;
  visible?: boolean;
  /** Allow sorting on this column */
  sortable?: boolean;
  [key: string]: unknown;
}

export type SchemaDataTableRow = Record<string, unknown>;

export type SortDirection = 'asc' | 'desc' | '';

export interface SortState {
  field: string;
  direction: SortDirection;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
