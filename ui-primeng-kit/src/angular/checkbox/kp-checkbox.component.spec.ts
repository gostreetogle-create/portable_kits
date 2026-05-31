import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpCheckboxComponent } from './kp-checkbox.component';

describe('KpCheckboxComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpCheckboxComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpCheckboxComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('starts unchecked', async () => {
    const fixture = await createTestFixture(KpCheckboxComponent);
    expect(fixture.componentInstance.checked()).toBe(false);
  });

  it('model value is writable', async () => {
    const fixture = await createTestFixture(KpCheckboxComponent);
    fixture.componentRef.setInput('checked', true);
    expect(fixture.componentInstance.checked()).toBe(true);
  });

  it('computes ariaLabel fallback', async () => {
    const fixture = await createTestFixture(KpCheckboxComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.componentRef.setInput('label', 'Agree');
    expect(comp.inputAriaLabel()).toBe('Agree');
  });

  it('disabled input works', async () => {
    const fixture = await createTestFixture(KpCheckboxComponent);
    fixture.componentRef.setInput('disabled', true);
    expect(fixture.componentInstance.disabled()).toBe(true);
  });
});
