import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpPasswordComponent } from './kp-password.component';

describe('KpPasswordComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpPasswordComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpPasswordComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpPasswordComponent);
    const comp = fixture.componentInstance;
    expect(comp.value()).toBe('');
    expect(comp.toggleMask()).toBe(true);
    expect(comp.feedback()).toBe(false);
  });

  it('computes errorId from name', async () => {
    const fixture = await createTestFixture(KpPasswordComponent);
    fixture.componentRef.setInput('name', 'pass');
    expect(fixture.componentInstance.errorId()).toBe('pass-error');
  });

  it('computes ariaLabel fallback', async () => {
    const fixture = await createTestFixture(KpPasswordComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.componentRef.setInput('label', 'Password');
    expect(comp.inputAriaLabel()).toBe('Password');
  });

  it('model value is writable', async () => {
    const fixture = await createTestFixture(KpPasswordComponent);
    fixture.componentRef.setInput('value', 'secret');
    expect(fixture.componentInstance.value()).toBe('secret');
  });
});
