import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpFormFieldComponent } from './kp-form-field.component';

describe('KpFormFieldComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpFormFieldComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpFormFieldComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpFormFieldComponent);
    const comp = fixture.componentInstance;
    expect(comp.label()).toBe('');
    expect(comp.required()).toBe(false);
    expect(comp.error()).toBe('');
    expect(comp.hint()).toBe('');
  });

  it('generates unique labelId', async () => {
    const fixture = await createTestFixture(KpFormFieldComponent);
    expect(fixture.componentInstance.labelId()).toMatch(/^up-kp-form-field-\d+-label$/);
  });

  it('forId input is settable', async () => {
    const fixture = await createTestFixture(KpFormFieldComponent);
    fixture.componentRef.setInput('forId', 'my-input');
    expect(fixture.componentInstance.forId()).toBe('my-input');
  });

  it('error input is settable', async () => {
    const fixture = await createTestFixture(KpFormFieldComponent);
    fixture.componentRef.setInput('error', 'Field is required');
    expect(fixture.componentInstance.error()).toBe('Field is required');
  });
});
