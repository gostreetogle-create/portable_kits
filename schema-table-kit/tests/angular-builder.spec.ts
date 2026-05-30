import { describe, expect, it } from 'vitest';
import {
  buildColumnFromField,
  markOrphanColumns,
  getSelectableFields,
  findEntity,
} from '../src/core';
import { PRODUCTS_ENTITY } from '../demo/mock-data/schema-tables.config';

/** Логика builder-компонента без TestBed (effects требуют полный Angular runtime). */
describe('SchemaColumnBuilder logic', () => {
  it('buildColumnFromField auto-fills header from meta', () => {
    const sku = PRODUCTS_ENTITY.fields.find((f) => f.field === 'sku')!;
    const col = buildColumnFromField(sku);
    expect(col.header).toBe('Артикул');
    expect(col.field).toBe('sku');
    expect(col.type).toBe('text');
  });

  it('getSelectableFields excludes _id and timestamps', () => {
    const entity = findEntity([PRODUCTS_ENTITY], 'products')!;
    const fields = getSelectableFields(entity).map((f) => f.field);
    expect(fields).toContain('sku');
    expect(fields).not.toContain('_id');
    expect(fields).not.toContain('createdAt');
  });

  it('markOrphanColumns flags removed fields', () => {
    const marked = markOrphanColumns(
      'products',
      [
        { field: 'sku', header: 'Артикул', type: 'text' },
        { field: 'oldFieldRemoved', header: 'X', type: 'text' },
      ],
      [PRODUCTS_ENTITY],
    );
    expect(marked[0].isOrphan).toBe(false);
    expect(marked[1].isOrphan).toBe(true);
  });

  it('column reorder (pure)', () => {
    const cols = [
      { field: 'sku', header: 'Артикул', type: 'text' as const },
      { field: 'name', header: 'Наименование', type: 'text' as const },
    ];
    [cols[0], cols[1]] = [cols[1], cols[0]];
    expect(cols[0].field).toBe('name');
    expect(cols[1].field).toBe('sku');
  });
});
