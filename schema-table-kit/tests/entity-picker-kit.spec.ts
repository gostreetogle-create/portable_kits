import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { EntityPickerComponent } from '../../entity-picker-kit/src/angular/entity-picker.component';
import { ENTITY_PICKER_KIT_CONFIG } from '../../entity-picker-kit/src/angular/tokens';
import { toggleEntityPickerSelection, entityPickerRowId, type EntityPickerSelectionMode } from '../../entity-picker-kit/src/core';

// ── Core logic tests ──────────────────────────────────────────────────────

describe('entityPickerRowId', () => {
  it('reads id field', () => {
    expect(entityPickerRowId({ _id: 'abc' })).toBe('abc');
    expect(entityPickerRowId({ id: 'x' }, 'id')).toBe('x');
  });
});

describe('toggleEntityPickerSelection', () => {
  it('adds and removes ids', () => {
    let set = toggleEntityPickerSelection(new Set(), 'a');
    expect([...set]).toEqual(['a']);
    set = toggleEntityPickerSelection(set, 'a');
    expect([...set]).toEqual([]);
  });
});

// ── TestBed component tests ────────────────────────────────────────────────
// entityKey and selectionMode are models (writable signals) — use .set().
// The loadEffect runs when visible() changes. close() resets state via the
// effect, but only if visible() actually changes (false → false = no trigger).

describe('EntityPickerComponent', () => {
  const mockDefinition = {
    entityKey: 'products',
    title: 'Products',
    columns: [
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price', width: '100px' },
    ],
    search: async () => ({ items: [
      { _id: '1', name: 'Widget', price: 100 },
      { _id: '2', name: 'Gadget', price: 200 },
    ], total: 2 }),
    idField: '_id',
  };

  function createComponent(entityKey = 'products', options?: {
    entities?: typeof mockDefinition[];
    selectionMode?: EntityPickerSelectionMode;
  }) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [EntityPickerComponent],
      providers: [
        { provide: ENTITY_PICKER_KIT_CONFIG, useValue: { entities: options?.entities ?? [mockDefinition] } },
      ],
    });
    const fixture = TestBed.createComponent(EntityPickerComponent);
    const comp = fixture.componentInstance as unknown as { entityKey: { set(v: string): void }; selectionMode: { set(v: unknown): void }; visible: { set(v: boolean): void } };
    comp.entityKey.set(entityKey);
    if (options?.selectionMode) {
      comp.selectionMode.set(options.selectionMode);
    }
    fixture.detectChanges();
    return fixture;
  }

  it('creates component with config', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('finds definition by entityKey', () => {
    const fixture = createComponent();
    const def = fixture.componentInstance.definition();
    expect(def?.title).toBe('Products');
  });

  it('starts hidden and can open', () => {
    const fixture = createComponent();
    const comp = fixture.componentInstance as any;
    expect(comp.visible()).toBe(false);
    comp.visible.set(true);
    expect(comp.visible()).toBe(true);
  });

  it('returns null definition for unknown key', () => {
    const fixture = createComponent('unknown');
    const def = fixture.componentInstance.definition();
    expect(def).toBeUndefined();
  });

  it('loads rows when visible', async () => {
    const fixture = createComponent();
    (fixture.componentInstance as any).visible.set(true);
    fixture.detectChanges();

    await vi.waitFor(() => {
      expect(fixture.componentInstance.rows().length).toBe(2);
    }, { timeout: 1000 });
  });

  it('shows error for unknown entityKey', async () => {
    const fixture = createComponent('unknown');
    (fixture.componentInstance as any).visible.set(true);
    fixture.detectChanges();

    await vi.waitFor(() => {
      expect(fixture.componentInstance.error()).toContain('Неизвестный entityKey');
    }, { timeout: 1000 });
  });

  it('formatCell renders value or dash', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance.formatCell({ name: 'Foo' }, 'name')).toBe('Foo');
    expect(fixture.componentInstance.formatCell({ name: '' }, 'name')).toBe('—');
    expect(fixture.componentInstance.formatCell({ name: null as unknown as string }, 'name')).toBe('—');
  });

  it('rowId returns id from field', () => {
    const fixture = createComponent();
    const id = fixture.componentInstance.rowId({ _id: 'abc' });
    expect(id).toBe('abc');
  });

  it('single selection: selects and confirms', () => {
    const fixture = createComponent();
    const row = { _id: '1', name: 'Widget' };
    fixture.componentInstance.onRowClick(row);
    expect(fixture.componentInstance.selectedRow()).toEqual(row);
    expect(fixture.componentInstance.canConfirm()).toBe(true);

    let emitted: unknown = null;
    fixture.componentInstance.selected.subscribe((v) => (emitted = v));
    fixture.componentInstance.confirmSelection();
    expect(emitted).toEqual(row);
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('canConfirm returns false when nothing selected', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance.canConfirm()).toBe(false);
  });

  it('close() resets state via effect (visible true → false)', async () => {
    const fixture = createComponent();
    // First make visible + wait for rows to load, so close() actually
    // changes visible() from true → false and triggers the loadEffect
    const comp = fixture.componentInstance as any;
    comp.visible.set(true);
    fixture.detectChanges();
    await vi.waitFor(() => {
      expect(comp.rows().length).toBeGreaterThan(0);
    }, { timeout: 1000 });

    comp.searchQuery.set('test');
    comp.close();  // visible(true → false) triggers effect → resetState()
    fixture.detectChanges();

    await vi.waitFor(() => {
      expect(comp.searchQuery()).toBe('');
    }, { timeout: 1000 });
    expect(fixture.componentInstance.visible()).toBe(false);
    expect(fixture.componentInstance.rows().length).toBe(0);
  });


  it('isMultiple reads from definition selectionMode', () => {
    const fixture = createComponent('products', {
      entities: [{ ...mockDefinition, selectionMode: 'multiple' as const }] as any[],
    });
    expect(fixture.componentInstance.isMultiple()).toBe(true);
  });

  it('isMultiple overrides with selectionMode input', () => {
    const fixture = createComponent('products', { selectionMode: 'multiple' });
    expect(fixture.componentInstance.isMultiple()).toBe(true);
  });

  it('single double-click selects and confirms', () => {
    const fixture = createComponent();
    const row = { _id: '1', name: 'Widget' };
    let emitted: unknown = null;
    fixture.componentInstance.selected.subscribe((v) => (emitted = v));
    fixture.componentInstance.onRowDblClick(row);
    expect(emitted).toEqual(row);
  });

  it('multiple selection: toggles and emits selectedMany', () => {
    const fixture = createComponent('products', {
      entities: [{ ...mockDefinition, selectionMode: 'multiple' as const }] as any[],
    });

    const row1 = { _id: '1', name: 'Widget' };
    const row2 = { _id: '2', name: 'Gadget' };

    fixture.componentInstance.onRowClick(row1);
    fixture.componentInstance.onRowClick(row2);
    expect(fixture.componentInstance.selectedIds().size).toBe(2);

    // Manually set rows so confirmSelection can filter by selectedIds
    fixture.componentInstance.rows.set([row1, row2]);

    let emitted: unknown[] | null = null;
    fixture.componentInstance.selectedMany.subscribe((v) => (emitted = v));
    fixture.componentInstance.confirmSelection();
    expect(emitted).toHaveLength(2);
  });
});
