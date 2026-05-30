import type { EntitySchema, SchemaColumn } from './types';
import { findEntity } from './registry';

export interface ColumnPreset {
  id: string;
  label: string;
  entityKey: string;
  columns: SchemaColumn[];
}

export function applyPreset(
  presetId: string,
  entityKey: string,
  entities: EntitySchema[],
  presets: ColumnPreset[] | undefined,
): SchemaColumn[] | undefined {
  if (!presets?.length) return undefined;
  const preset = presets.find((p) => p.id === presetId && p.entityKey === entityKey);
  if (!preset) return undefined;
  const entity = findEntity(entities, entityKey);
  if (!entity) return [...preset.columns];
  return preset.columns.map((c) => ({ ...c }));
}
