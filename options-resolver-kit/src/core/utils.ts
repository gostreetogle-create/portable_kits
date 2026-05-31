import type { ColumnWithOptions, EntityOptionsDefinition, SelectOption } from './types';

/**
 * Patch column definitions with resolved options from entity definitions.
 * Each column that has `optionsEntityKey` matching an entity definition's
 * `entityKey` gets its `options` array populated by calling the entity's loader.
 *
 * Useful for integrating with schema-data-table-kit — call once on init.
 *
 * @param columns — Array of column definitions (may contain optionsEntityKey)
 * @param entities — Entity definitions from OptionsResolverConfig
 * @returns Promise resolving to columns with options patched in-place
 */
export async function patchColumnOptions(
  columns: ColumnWithOptions[],
  entities: EntityOptionsDefinition[],
): Promise<ColumnWithOptions[]> {
  const entityMap = new Map<string, EntityOptionsDefinition>();
  for (const e of entities) {
    entityMap.set(e.entityKey, e);
  }

  const results = await Promise.allSettled(
    columns.map(async (col) => {
      if (!col.optionsEntityKey) return col;
      const entityDef = entityMap.get(col.optionsEntityKey);
      if (!entityDef) return col;
      const options = await entityDef.load();
      return { ...col, options };
    }),
  );

  return results.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    // On error, return the original column without options
    return columns[i];
  });
}

/**
 * Create a preset loader function for a given domain.
 * Presets allow defining reusable option loaders (e.g., 'status',
 * 'priority') that can be shared across multiple entity definitions.
 *
 * @param loadFn — A function that returns options for this domain
 * @param domain — Domain name for identification
 * @returns An EntityOptionsDefinition preset
 */
export function createPresetLoader(
  domain: string,
  loadFn: () => Promise<SelectOption[]> | SelectOption[],
): EntityOptionsDefinition {
  return {
    entityKey: `__preset_${domain}`,
    domain,
    load: loadFn,
  };
}
