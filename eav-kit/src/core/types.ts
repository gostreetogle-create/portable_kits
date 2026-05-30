export type EavAttributeType = 'string' | 'number' | 'boolean' | 'date' | 'select';

export interface EavAttributeDefinition {
  _id?: string;
  entityKey: string;
  key: string;
  label: string;
  type: EavAttributeType;
  required?: boolean;
  options?: string[];
  order?: number;
}

export interface EavKitConfig {
  /** Load attribute definitions for an entity. */
  loadAttributes?: (entityKey: string) => Promise<EavAttributeDefinition[]>;
  /** Persist attribute definitions for an entity. */
  saveAttributes?: (entityKey: string, attrs: EavAttributeDefinition[]) => Promise<void>;
}

/** Normalize attribute order after edits. */
export function normalizeEavAttributeOrder(
  attrs: EavAttributeDefinition[],
): EavAttributeDefinition[] {
  return attrs.map((attr, order) => ({ ...attr, order }));
}

/** Validate attribute key format (lowercase slug). */
export function isValidEavAttributeKey(key: string): boolean {
  return /^[a-z][a-z0-9_]*$/.test(key);
}
