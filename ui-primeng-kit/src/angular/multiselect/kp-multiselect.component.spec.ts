import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpMultiselectComponent } from './kp-multiselect.component';

describe('KpMultiselectComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpMultiselectComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpMultiselectComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpMultiselectComponent);
    const comp = fixture.componentInstance;
    expect(comp.value()).toEqual([]);
    expect(comp.options()).toEqual([]);
    expect(comp.maxSelectedLabels()).toBe(3);
  });

  it('maps options to selectOptions', async () => {
    const fixture = await createTestFixture(KpMultiselectComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('options', ['A', 'B']);
    expect(comp.selectOptions()).toEqual([
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
    ]);
  });

  it('computes errorId from name', async () => {
    const fixture = await createTestFixture(KpMultiselectComponent);
    fixture.componentRef.setInput('name', 'tags');
    expect(fixture.componentInstance.errorId()).toBe('tags-error');
  });

  it('controlClass includes error', async () => {
    const fixture = await createTestFixture(KpMultiselectComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('error', 'Invalid');
    expect(comp.controlClass()).toContain('up-kp-multiselect__control--error');
  });
});
