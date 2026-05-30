export type PlaceholderCategory = 'org' | 'client' | 'doc' | 'item';

export interface PlaceholderToken {
  token: string;
  label: string;
  category: PlaceholderCategory;
  description: string;
}

/** Context for resolving {{category.field}} tokens. Values are plain objects. */
export interface PlaceholderContext {
  org?: Record<string, unknown> | null;
  client?: Record<string, unknown> | null;
  doc?: Record<string, unknown> | null;
  item?: Record<string, unknown> | null;
}

export interface PlaceholderKitConfig {
  /** Override default token registry. */
  registry?: PlaceholderToken[];
  /** Legacy field aliases: first segment → canonical field name. */
  fieldAliases?: Record<string, string>;
}

/** Block shape for recursive placeholder resolution (content + optional cells). */
export interface PlaceholderResolvableBlock {
  content: string;
  cells?: Array<{ content: string } & Record<string, unknown>>;
}

export interface PlaceholderGroup {
  category: PlaceholderCategory;
  label: string;
  icon: string;
  tokens: PlaceholderToken[];
}

export interface BuildPlaceholderGroupsOptions {
  registry?: PlaceholderToken[];
  allowedCategories?: PlaceholderCategory[];
  limitPerCategory?: number;
  query?: string;
}
