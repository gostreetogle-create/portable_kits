import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpSelectComponent } from './kp-select.component';

describe('KpSelectComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpSelectComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpSelectComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpSelectComponent);
    const comp = fixture.componentInstance;
    expect(comp.value()).toBeNull();
    expect(comp.options()).toEqual([]);
    expect(comp.placeholder()).toBe('Выберите...');
  });

  it('computes ariaLabel fallback', async () => {
    const fixture = await createTestFixture(KpSelectComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.componentRef.setInput('label', 'City');
    expect(comp.inputAriaLabel()).toBe('City');
  });

  it('controlClass includes error class', async () => {
    const fixture = await createTestFixture(KpSelectComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('error', 'Required');
    expect(comp.controlClass()).toContain('up-kp-select__control--error');
  });

  it('model value is writable', async () => {
    const fixture = await createTestFixture(KpSelectComponent);
    fixture.componentRef.setInput('value', 'option1');
    expect(fixture.componentInstance.value()).toBe('option1');
  });
});
