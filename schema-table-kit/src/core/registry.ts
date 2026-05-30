import type { EntityFieldMeta, EntitySchema, SchemaColumn, SchemaColumnType } from './types';

export function findEntity(
  entities: EntitySchema[],
  key: string,
): EntitySchema | undefined {
  return entities.find((e) => e.key === key);
}

export function findFieldMeta(
  entity: EntitySchema | undefined,
  field: string,
): EntityFieldMeta | undefined {
  return entity?.fields.find((f) => f.field === field);
}

export function getSelectableFields(entity: EntitySchema | undefined): EntityFieldMeta[] {
  if (!entity) return [];
  return entity.fields.filter((f) => f.selectable !== false);
}

export function fieldOptionLabel(meta: EntityFieldMeta): string {
  return `${meta.label} (${meta.field})`;
}

export function buildColumnFromField(meta: EntityFieldMeta): SchemaColumn {
  return {
    field: meta.field,
    header: meta.label,
    type: (meta.type ?? 'text') as SchemaColumnType,
    width: meta.width,
  };
}

export function detectSchemaDrift(
  savedVersion: string | undefined,
  currentVersion: string | undefined,
): boolean {
  if (!savedVersion || !currentVersion) return false;
  return savedVersion !== currentVersion;
}

export function mergeSchemas(...lists: EntitySchema[][]): EntitySchema[] {
  const map = new Map<string, EntitySchema>();
  for (const list of lists) {
    for (const entity of list) {
      const existing = map.get(entity.key);
      if (!existing) {
        map.set(entity.key, { ...entity, fields: [...entity.fields] });
        continue;
      }
      const fieldMap = new Map(existing.fields.map((f) => [f.field, f]));
      for (const f of entity.fields) {
        fieldMap.set(f.field, f);
      }
      map.set(entity.key, {
        ...existing,
        ...entity,
        fields: [...fieldMap.values()],
      });
    }
  }
  return [...map.values()];
}
