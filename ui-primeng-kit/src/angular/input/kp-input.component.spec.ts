import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpInputComponent } from './kp-input.component';

describe('KpInputComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpInputComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpInputComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpInputComponent);
    const comp = fixture.componentInstance;
    expect(comp.value()).toBe('');
    expect(comp.type()).toBe('text');
    expect(comp.size()).toBe('small');
    expect(comp.error()).toBe('');
  });

  it('computes errorId from name', async () => {
    const fixture = await createTestFixture(KpInputComponent);
    fixture.componentRef.setInput('name', 'email');
    expect(fixture.componentInstance.errorId()).toBe('email-error');
  });

  it('computes ariaLabel fallback', async () => {
    const fixture = await createTestFixture(KpInputComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', 'Custom');
    expect(comp.inputAriaLabel()).toBe('Custom');
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.componentRef.setInput('label', 'Email');
    expect(comp.inputAriaLabel()).toBe('Email');
  });

  it('model value is writable', async () => {
    const fixture = await createTestFixture(KpInputComponent);
    fixture.componentRef.setInput('value', 'hello');
    expect(fixture.componentInstance.value()).toBe('hello');
  });
});
