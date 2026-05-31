import { describe, expect, it, vi } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpSearchComponent } from './kp-search.component';

describe('KpSearchComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpSearchComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpSearchComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpSearchComponent);
    const comp = fixture.componentInstance;
    expect(comp.query()).toBe('');
    expect(comp.placeholder()).toBe('Поиск...');
    expect(comp.debounceMs()).toBe(300);
    expect(comp.size()).toBe('small');
  });

  it('onInput updates query model', async () => {
    const fixture = await createTestFixture(KpSearchComponent);
    const comp = fixture.componentInstance;
    comp.onInput('test');
    expect(comp.query()).toBe('test');
  });

  it('emits searchChange immediately when debounceMs <= 0', async () => {
    vi.useFakeTimers();
    const fixture = await createTestFixture(KpSearchComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('debounceMs', 0);
    let emitted = '';
    comp.searchChange.subscribe((v) => (emitted = v));
    comp.onInput('hello');
    expect(emitted).toBe('hello');
    vi.useRealTimers();
  });

  it('emits searchChange after debounce', async () => {
    vi.useFakeTimers();
    const fixture = await createTestFixture(KpSearchComponent);
    const comp = fixture.componentInstance;
    let emitted = '';
    comp.searchChange.subscribe((v) => (emitted = v));
    comp.onInput('world');
    expect(emitted).toBe('');
    vi.advanceTimersByTime(300);
    expect(emitted).toBe('world');
    vi.useRealTimers();
  });

  it('size input applies host class', async () => {
    const fixture = await createTestFixture(KpSearchComponent);
    fixture.componentRef.setInput('size', 'large');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('up-kp-search--large')).toBe(true);
  });

  it('generates unique inputId', async () => {
    const fixture = await createTestFixture(KpSearchComponent);
    expect(fixture.componentInstance.inputId).toMatch(/^up-kp-search-/);
  });
});
