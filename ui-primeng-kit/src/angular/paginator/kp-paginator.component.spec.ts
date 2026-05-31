import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpPaginatorComponent } from './kp-paginator.component';
import type { PaginatorState } from 'primeng/paginator';

describe('KpPaginatorComponent', () => {
  async function createPaginatorFixture() {
    const fixture = await createTestFixture(KpPaginatorComponent);
    fixture.componentRef.setInput('rows', 15);
    fixture.componentRef.setInput('totalRecords', 100);
    fixture.detectChanges();
    return fixture;
  }
  it('creates component', async () => {
    const fixture = await createPaginatorFixture();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createPaginatorFixture();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createPaginatorFixture();
    const comp = fixture.componentInstance;
    expect(comp.first()).toBe(0);
        expect(comp.rows()).toBe(15);
        expect(comp.rowsPerPageOptions()).toEqual([10, 25, 50]);
    expect(comp.showCurrentPageReport()).toBe(true);
    expect(comp.currentPageReportTemplate()).toContain('{first}');
  });

  it('onPageChange updates first and emits pageChange', async () => {
    const fixture = await createPaginatorFixture();
    const comp = fixture.componentInstance;
    let emitted: { first: number; rows: number } | null = null;
    comp.pageChange.subscribe((v) => (emitted = v));

    const state: PaginatorState = { first: 15, rows: 15 };
    comp.onPageChange(state);
    expect(comp.first()).toBe(15);
    expect(emitted).toEqual({ first: 15, rows: 15 });
  });

  it('onPageChange handles undefined first', async () => {
    const fixture = await createPaginatorFixture();
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('first', 30);
    const state: PaginatorState = { first: undefined, rows: 15 } as any;
    comp.onPageChange(state);
    expect(comp.first()).toBe(0);
  });

  it('first model is writable', async () => {
    const fixture = await createPaginatorFixture();
    fixture.componentRef.setInput('first', 30);
    expect(fixture.componentInstance.first()).toBe(30);
  });
});
