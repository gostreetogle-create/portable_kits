import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpTextareaComponent } from './kp-textarea.component';

describe('KpTextareaComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpTextareaComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpTextareaComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpTextareaComponent);
    const comp = fixture.componentInstance;
    expect(comp.rows()).toBe(3);
    expect(comp.autoResize()).toBe(true);
    expect(comp.value()).toBe('');
  });

  it('computes errorId from name', async () => {
    const fixture = await createTestFixture(KpTextareaComponent);
    fixture.componentRef.setInput('name', 'desc');
    expect(fixture.componentInstance.errorId()).toBe('desc-error');
  });

  it('computes ariaLabel fallback', async () => {
    const fixture = await createTestFixture(KpTextareaComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.componentRef.setInput('label', 'Description');
    expect(comp.inputAriaLabel()).toBe('Description');
  });

  it('model value is writable', async () => {
    const fixture = await createTestFixture(KpTextareaComponent);
    fixture.componentRef.setInput('value', 'text content');
    expect(fixture.componentInstance.value()).toBe('text content');
  });
});
