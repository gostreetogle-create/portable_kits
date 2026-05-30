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

export interface EntityPickerDefinition<T extends Record<string, unknown> = Record<string, unknown>> {
  entityKey: string;
  title: string;
  columns: EntityPickerColumn[];
  searchPlaceholder?: string;
  search: (query: EntityPickerQuery) => Promise<EntityPickerSearchResult<T>>;
  labelField?: string;
  idField?: string;
}

export interface EntityPickerKitConfig {
  entities: EntityPickerDefinition[];
}

export type EntityPickerRow = Record<string, unknown>;
