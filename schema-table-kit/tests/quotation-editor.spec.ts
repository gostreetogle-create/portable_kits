import { describe, expect, it } from 'vitest';

import { productsToTableItems } from '../../quotation-editor/src/core';

// ── Core logic tests ──────────────────────────────────────────────────────
// QuotationEditorComponent's TestBed tests are skipped because it imports
// DocumentCanvasComponent (templateUrl: ./document-canvas.component.html),
// which Angular JIT can't resolve in vitest without the Angular CLI build
// pipeline. The `overrideComponent` API doesn't prevent templateUrl
// resolution in Angular 21's JIT compiler.
//
// TODO(v0.2): Add TestBed tests when running under Angular CLI's test
// builder (ng test) which pre-inlines external templates.

describe('productsToTableItems', () => {
  it('maps product rows to table items', () => {
    const items = productsToTableItems([
      { _id: 'p1', sku: 'A-1', name: 'Bolt', listPrice: '12,50 ₽' },
    ]);
    expect(items).toHaveLength(1);
    expect(items[0].sku).toBe('A-1');
    expect(items[0].price).toBe(12.5);
    expect(items[0].qty).toBe(1);
  });

  it('handles empty input', () => {
    expect(productsToTableItems([])).toEqual([]);
  });

  it('parses various price formats', () => {
    const items = productsToTableItems([
      { _id: 'p1', name: 'A', listPrice: 25 },
      { _id: 'p2', name: 'B', listPrice: '1 234,56' },
      { _id: 'p3', name: 'C', listPrice: 'invalid' },
    ]);
    expect(items[0].price).toBe(25);
    expect(items[1].price).toBe(1234.56);
    expect(items[2].price).toBe(0);
  });
});
