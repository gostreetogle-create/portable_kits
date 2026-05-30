import { describe, expect, it } from 'vitest';
import { getFieldValue, validateColumns, findEntity } from '../src/core';
import { PRODUCTS_ENTITY } from '../demo/mock-data/schema-tables.config';

describe('getFieldValue', () => {
  it('reads dot-path', () => {
    expect(getFieldValue({ address: { city: 'Москва' } }, 'address.city')).toBe('Москва');
  });
});

describe('validateColumns', () => {
  const entities = [PRODUCTS_ENTITY];

  it('detects orphan field', () => {
    const issues = validateColumns(
      'products',
      [{ field: 'removedField', header: 'X', type: 'text' }],
      entities,
      '1.0.0',
    );
    expect(issues.some((i) => i.code === 'orphan_field')).toBe(true);
  });

  it('detects duplicate field', () => {
    const issues = validateColumns(
      'products',
      [
        { field: 'sku', header: 'Артикул 1', type: 'text' },
        { field: 'sku', header: 'Артикул 2', type: 'text' },
      ],
      entities,
      '1.0.0',
    );
    expect(issues.some((i) => i.code === 'duplicate_field')).toBe(true);
  });

  it('detects schema version mismatch', () => {
    const issues = validateColumns(
      'products',
      [{ field: 'sku', header: 'Артикул', type: 'text' }],
      entities,
      '0.9.0',
    );
    expect(issues.some((i) => i.code === 'schema_version_mismatch')).toBe(true);
  });
});

describe('applyPreset', () => {
  it('returns columns for matching preset', async () => {
    const { applyPreset } = await import('../src/core/presets');
    const cols = applyPreset(
      'basic',
      'products',
      [PRODUCTS_ENTITY],
      [
        {
          id: 'basic',
          label: 'Базовый',
          entityKey: 'products',
          columns: [{ field: 'sku', header: 'Артикул', type: 'text' }],
        },
      ],
    );
    expect(cols?.[0].field).toBe('sku');
  });
});

describe('findEntity', () => {
  it('finds products', () => {
    expect(findEntity([PRODUCTS_ENTITY], 'products')?.label).toBe('Товары');
  });
});
