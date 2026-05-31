export interface SelectOption {
  label: string;
  value: string | number | boolean;
}

export type OptionsLoader = () => Promise<SelectOption[]> | SelectOption[];

export interface EntityOptionsDefinition {
  entityKey: string;
  load: OptionsLoader;
  /** Optional preset domain for grouping (e.g. 'status', 'priority', 'category') */
  domain?: string;
}

export interface OptionsResolverConfig {
  entities: EntityOptionsDefinition[];
}

/**
 * Describes a column that can be patched with resolved options.
 * Used by patchColumnOptions() to integrate with schema-data-table-kit.
 */
export interface ColumnWithOptions {
  field: string;
  header: string;
  /** entityKey to resolve options from the resolver */
  optionsEntityKey?: string;
  /** Resolved options (populated by patchColumnOptions) */
  options?: SelectOption[];
  type?: string;
  width?: string;
  [key: string]: unknown;
}

/**
 * Preset loader — pre-configured loader for common entity domains.
 * Returns a list of preset loaders that can be merged into entities.
 */
export interface OptionsPresetLoader {
  domain: string;
  createLoader: (params?: Record<string, unknown>) => OptionsLoader;
}
