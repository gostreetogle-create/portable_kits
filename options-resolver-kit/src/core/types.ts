export interface SelectOption {
  label: string;
  value: string | number | boolean;
}

export type OptionsLoader = () => Promise<SelectOption[]> | SelectOption[];

export interface EntityOptionsDefinition {
  entityKey: string;
  load: OptionsLoader;
}

export interface OptionsResolverConfig {
  entities: EntityOptionsDefinition[];
}
