export interface SchemaDataTableConfig {
  emptyMessage?: string;
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
  [key: string]: unknown;
}

export type SchemaDataTableRow = Record<string, unknown>;
