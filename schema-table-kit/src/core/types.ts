/** Расширяемый тип колонки */
export type SchemaColumnType = string;

export interface EntityFieldMeta {
  field: string;
  label: string;
  type?: SchemaColumnType;
  width?: string;
  selectable?: boolean;
  virtual?: boolean;
  group?: string;
}

export interface EntitySchema {
  key: string;
  label: string;
  apiPath?: string;
  collection?: string;
  schemaVersion?: string;
  fields: EntityFieldMeta[];
}

export interface SchemaColumn {
  field: string;
  header: string;
  type: SchemaColumnType;
  width?: string;
  options?: string;
  isOrphan?: boolean;
}

export interface ColumnBuilderValue {
  entityKey: string;
  columns: SchemaColumn[];
  savedSchemaVersion?: string;
}

export interface SchemaTableKitConfig {
  provider?: 'static' | 'http';
  entities?: EntitySchema[];
  schemaApiUrl?: string;
  locale?: string;
}

export type ProviderStatus = 'idle' | 'loading' | 'ready' | 'error';

export type ColumnValidationCode =
  | 'orphan_field'
  | 'duplicate_field'
  | 'empty_header'
  | 'invalid_options'
  | 'unknown_entity'
  | 'schema_version_mismatch';

export interface ColumnValidationIssue {
  index: number;
  field: string;
  code: ColumnValidationCode;
  message: string;
  severity: 'warning' | 'error';
}

export interface ColumnTypeDefinition {
  type: string;
  label: string;
  defaultWidth?: string;
  hasOptions?: boolean;
}

export interface TableDefinitionDraft {
  key: string;
  label: string;
  builder: ColumnBuilderValue;
}
