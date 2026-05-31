import { describe, expect, it } from 'vitest';
import { findFieldMeta, detectSchemaDrift, mergeSchemas, fieldOptionLabel } from '../src/core/registry';
import type { EntitySchema, EntityFieldMeta } from '../src/core/types';

const TEST_ENTITY = {
  key: 'products',
  label: 'Товары',
  version: '2.0.0',
  fields: [
    { field: 'sku', label: 'Артикул', type: 'text' },
    { field: 'name', label: 'Наименование', type: 'text' },
    { field: 'price', label: 'Цена', type: 'number' },
  ],
};

describe('findFieldMeta', () => {
  it('finds existing field', () => {
    const meta = findFieldMeta(TEST_ENTITY, 'price');
    expect(meta?.field).toBe('price');
    expect(meta?.label).toBe('Цена');
  });

  it('returns undefined for missing field', () => {
    expect(findFieldMeta(TEST_ENTITY, 'missing')).toBeUndefined();
  });

  it('returns undefined for undefined entity', () => {
    expect(findFieldMeta(undefined, 'sku')).toBeUndefined();
  });
});

describe('fieldOptionLabel', () => {
  it('formats label with field name', () => {
    const meta: EntityFieldMeta = { field: 'sku', label: 'Артикул', type: 'text' };
    expect(fieldOptionLabel(meta)).toBe('Артикул (sku)');
  });
});

describe('detectSchemaDrift', () => {
  it('returns true when versions differ', () => {
    expect(detectSchemaDrift('1.0.0', '2.0.0')).toBe(true);
  });

  it('returns false when versions match', () => {
    expect(detectSchemaDrift('2.0.0', '2.0.0')).toBe(false);
  });

  it('returns false when either version is undefined', () => {
    expect(detectSchemaDrift(undefined, '2.0.0')).toBe(false);
    expect(detectSchemaDrift('2.0.0', undefined)).toBe(false);
    expect(detectSchemaDrift(undefined, undefined)).toBe(false);
  });
});

describe('mergeSchemas', () => {
  const entityA: EntitySchema = {
    key: 'products',
    label: 'Товары',
    fields: [{ field: 'sku', label: 'Артикул', type: 'text' }],
  };

  const entityB: EntitySchema = {
    key: 'products',
    label: 'Товары обновлённые',
    fields: [{ field: 'name', label: 'Наименование', type: 'text' }],
  };

  const entityC: EntitySchema = {
    key: 'clients',
    label: 'Клиенты',
    fields: [{ field: 'name', label: 'Название', type: 'text' }],
  };

  it('merges entities with same key — combines fields', () => {
    const merged = mergeSchemas([entityA], [entityB]);
    expect(merged).toHaveLength(1);
    expect(merged[0].key).toBe('products');
    const fieldKeys = merged[0].fields.map((f) => f.field);
    expect(fieldKeys).toContain('sku');
    expect(fieldKeys).toContain('name');
  });

  it('merges entities with different keys', () => {
    const merged = mergeSchemas([entityA], [entityC]);
    expect(merged).toHaveLength(2);
    expect(merged.map((e) => e.key)).toEqual(['products', 'clients']);
  });

  it('later entity label overrides earlier', () => {
    const merged = mergeSchemas([entityA], [entityB]);
    expect(merged[0].label).toBe('Товары обновлённые');
  });

  it('returns empty array for no input', () => {
    expect(mergeSchemas()).toEqual([]);
  });
});
