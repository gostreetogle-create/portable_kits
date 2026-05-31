import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpInputNumberComponent } from './kp-input-number.component';

describe('KpInputNumberComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpInputNumberComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpInputNumberComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpInputNumberComponent);
    const comp = fixture.componentInstance;
    expect(comp.value()).toBeNull();
    expect(comp.step()).toBe(1);
    expect(comp.mode()).toBe('decimal');
    expect(comp.compact()).toBe(false);
  });

  it('computes errorId from name', async () => {
    const fixture = await createTestFixture(KpInputNumberComponent);
    fixture.componentRef.setInput('name', 'qty');
    expect(fixture.componentInstance.errorId()).toBe('qty-error');
  });

  it('host binding reflects compact', async () => {
    const fixture = await createTestFixture(KpInputNumberComponent);
    fixture.componentRef.setInput('compact', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('up-kp-input-number-host--compact')).toBe(true);
  });

  it('model value is writable', async () => {
    const fixture = await createTestFixture(KpInputNumberComponent);
    fixture.componentRef.setInput('value', 42);
    expect(fixture.componentInstance.value()).toBe(42);
  });
});
