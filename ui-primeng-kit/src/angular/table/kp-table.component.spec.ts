import { describe, expect, it, vi } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpTableComponent, type KpColumn, type KpTableAction } from './kp-table.component';

describe('KpTableComponent', () => {
  const mockColumns: KpColumn[] = [
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'price', header: 'Price', type: 'number', sortable: true },
    { field: 'status', header: 'Status', type: 'tag' },
    { field: 'active', header: 'Active', type: 'boolean' },
    { field: 'createdAt', header: 'Created', type: 'date' },
    { field: 'category', header: 'Category', type: 'select', options: [{ label: 'A', value: 'a' }] },
  ];

  const mockData = [
    { name: 'Widget', price: 100, status: 'active', active: true, createdAt: '2026-01-15', category: 'a' },
    { name: 'Gadget', price: 200, status: 'inactive', active: false, createdAt: '2026-02-20', category: 'b' },
  ];

  async function createTableFixture() {
    const fixture = await createTestFixture(KpTableComponent);
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    return fixture;
  }

  it('creates component', async () => {
    const fixture = await createTableFixture();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTableFixture();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    expect(comp.columns()).toEqual(mockColumns);
    expect(comp.data()).toEqual(mockData);
    expect(comp.total()).toBe(0);
    expect(comp.loading()).toBe(false);
    expect(comp.paginator()).toBe(true);
    expect(comp.page()).toBe(1);
    expect(comp.limit()).toBe(15);
  });

  it('computes paginatorFirst from page and limit', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    expect(comp.paginatorFirst()).toBe(0);
    fixture.componentRef.setInput('page', 3);
    fixture.componentRef.setInput('limit', 10);
    expect(comp.paginatorFirst()).toBe(20);
  });

  it('showToolbar is true when any toolbar feature is enabled', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    expect(comp.showToolbar()).toBe(true);
    fixture.componentRef.setInput('showSearch', false);
    fixture.componentRef.setInput('showActions', false);
    fixture.componentRef.setInput('showToolbarTitle', false);
    expect(comp.showToolbar()).toBe(false);
  });

  it('formatCell returns value or em dash', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    expect(comp.formatCell('hello')).toBe('hello');
    expect(comp.formatCell('')).toBe('—');
    expect(comp.formatCell(null)).toBe('—');
    expect(comp.formatCell(undefined)).toBe('—');
    expect(comp.formatCell(0)).toBe('0');
  });

  it('getSelectLabel finds option label', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    const col = mockColumns[5];
    expect(comp.getSelectLabel(col, 'a')).toBe('A');
    expect(comp.getSelectLabel(col, 'unknown')).toBe('unknown');
    expect(comp.getSelectLabel(col, null)).toBe('—');
  });

  it('useEllipsis returns true for text/select/textarea by default', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    expect(comp.useEllipsis({ field: 'a', header: 'A', type: 'text' })).toBe(true);
    expect(comp.useEllipsis({ field: 'a', header: 'A', type: 'select' })).toBe(true);
    expect(comp.useEllipsis({ field: 'a', header: 'A', type: 'number' })).toBe(false);
    expect(comp.useEllipsis({ field: 'a', header: 'A', type: 'text', ellipsis: false })).toBe(false);
  });

  it('cellTitle returns text for truncated columns', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    const col: KpColumn = { field: 'a', header: 'A', type: 'text' };
    expect(comp.cellTitle(col, 'Long text')).toBe('Long text');
    expect(comp.cellTitle(col, '')).toBeNull();
    expect(comp.cellTitle(col, null)).toBeNull();
  });

  it('resolveButtonSeverity maps severities', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    expect(comp.resolveButtonSeverity('danger')).toBe('danger');
    expect(comp.resolveButtonSeverity('secondary')).toBe('secondary');
    expect(comp.resolveButtonSeverity('primary')).toBe('primary');
    expect(comp.resolveButtonSeverity()).toBe('primary');
  });

  it('onSortHandler emits sortChange', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    let emitted: unknown = null;
    comp.sortChange.subscribe((v) => (emitted = v));
    comp.onSortHandler({ field: 'price', order: 1 });
    expect(emitted).toEqual({ field: 'price', order: 1 });
    comp.onSortHandler({ field: 'name', order: -1 });
    expect(emitted).toEqual({ field: 'name', order: -1 });
  });

  it('onSearch updates query and emits searchChange', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    let emitted = '';
    comp.searchChange.subscribe((v) => (emitted = v));
    comp.onSearch('widget');
    expect(comp.searchQuery()).toBe('widget');
    expect(emitted).toBe('widget');
  });

  it('onPaginatorPageChange emits pageEvent and updates page/limit', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    let emitted: unknown = null;
    comp.pageEvent.subscribe((v) => (emitted = v));
    comp.onPaginatorPageChange({ first: 15, rows: 15 });
    expect(comp.page()).toBe(2);
    expect(comp.limit()).toBe(15);
    expect(emitted).toEqual({ first: 15, rows: 15 });
  });

  it('canExecAction respects permission with checkPermission', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    const action: KpTableAction = { id: 'test', label: 'Test', permission: 'admin', handler: vi.fn() };

    // No checkPermission set → all allowed
    expect(comp.canExecAction(action)).toBe(true);

    // checkPermission returns false → blocked
    fixture.componentRef.setInput('checkPermission', () => false);
    expect(comp.canExecAction(action)).toBe(false);

    // checkPermission returns true → allowed
    fixture.componentRef.setInput('checkPermission', () => true);
    expect(comp.canExecAction(action)).toBe(true);
  });

  it('canExecAction allows actions without permission', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    const action: KpTableAction = { id: 'test', label: 'Test', handler: vi.fn() };
    fixture.componentRef.setInput('checkPermission', () => false);
    expect(comp.canExecAction(action)).toBe(true);
  });

  it('getFirstPhoto handles array of objects with url', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    const result = comp.getFirstPhoto([{ url: 'https://example.com/1.jpg' }, { url: 'https://example.com/2.jpg' }]);
    expect(result).toBe('https://example.com/1.jpg');
  });

  it('getFirstPhoto handles string with URL', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    expect(comp.getFirstPhoto('https://example.com/photo.jpg')).toBe('https://example.com/photo.jpg');
  });

  it('getFirstPhoto returns null for empty/unsupported', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    expect(comp.getFirstPhoto(null)).toBeNull();
    expect(comp.getFirstPhoto([])).toBeNull();
  });

  it('edit output emits row data', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    let emitted: unknown = null;
    comp.edit.subscribe((v) => (emitted = v));
    comp.edit.emit(mockData[0]);
    expect(emitted).toEqual(mockData[0]);
  });

  it('deleteRow output emits row data', async () => {
    const fixture = await createTableFixture();
    const comp = fixture.componentInstance;
    let emitted: unknown = null;
    comp.deleteRow.subscribe((v) => (emitted = v));
    comp.deleteRow.emit(mockData[1]);
    expect(emitted).toEqual(mockData[1]);
  });
});
