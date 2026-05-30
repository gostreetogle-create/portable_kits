import { detectSchemaDrift, findEntity, getSelectableFields } from './registry';
import type {
  ColumnValidationIssue,
  EntitySchema,
  SchemaColumn,
} from './types';

function validateSelectOptions(options: string | undefined): string | null {
  if (!options?.trim()) return null;
  try {
    const parsed: unknown = JSON.parse(options);
    if (!Array.isArray(parsed)) return 'JSON должен быть массивом';
    return null;
  } catch {
    return 'Невалидный JSON';
  }
}

export function markOrphanColumns(
  entityKey: string | undefined,
  columns: SchemaColumn[],
  entities: EntitySchema[],
): SchemaColumn[] {
  if (!entityKey) return columns.map((c) => ({ ...c, isOrphan: false }));
  const entity = findEntity(entities, entityKey);
  const allowed = new Set(getSelectableFields(entity).map((f) => f.field));
  return columns.map((col) => ({
    ...col,
    isOrphan: col.field ? !allowed.has(col.field) : false,
  }));
}

export function validateColumns(
  entityKey: string | undefined,
  columns: SchemaColumn[],
  entities: EntitySchema[],
  savedSchemaVersion?: string,
): ColumnValidationIssue[] {
  const issues: ColumnValidationIssue[] = [];

  if (entityKey && !findEntity(entities, entityKey)) {
    issues.push({
      index: -1,
      field: entityKey,
      code: 'unknown_entity',
      message: `Неизвестная таблица: ${entityKey}`,
      severity: 'warning',
    });
  }

  const entity = entityKey ? findEntity(entities, entityKey) : undefined;
  const allowed = new Set(getSelectableFields(entity).map((f) => f.field));
  const seen = new Set<string>();

  if (entity && detectSchemaDrift(savedSchemaVersion, entity.schemaVersion)) {
    issues.push({
      index: -1,
      field: entityKey ?? '',
      code: 'schema_version_mismatch',
      message: 'Схема обновилась — проверьте колонки',
      severity: 'warning',
    });
  }

  columns.forEach((col, index) => {
    if (!col.field?.trim()) {
      issues.push({
        index,
        field: col.field,
        code: 'empty_header',
        message: 'Выберите поле колонки',
        severity: 'error',
      });
    }

    if (col.field && seen.has(col.field)) {
      issues.push({
        index,
        field: col.field,
        code: 'duplicate_field',
        message: `Дубль поля: ${col.field}`,
        severity: 'error',
      });
    }
    if (col.field) seen.add(col.field);

    if (col.field && entity && !allowed.has(col.field)) {
      issues.push({
        index,
        field: col.field,
        code: 'orphan_field',
        message: `Поле устарело: ${col.field}`,
        severity: 'warning',
      });
    }

    if (!col.header?.trim()) {
      issues.push({
        index,
        field: col.field,
        code: 'empty_header',
        message: 'Заполните заголовок',
        severity: 'error',
      });
    }

    if (col.type === 'select') {
      const err = validateSelectOptions(col.options);
      if (err) {
        issues.push({
          index,
          field: col.field,
          code: 'invalid_options',
          message: err,
          severity: 'error',
        });
      }
    }
  });

  return issues;
}
