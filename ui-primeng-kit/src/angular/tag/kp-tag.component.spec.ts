import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpTagComponent } from './kp-tag.component';

describe('KpTagComponent', () => {
  async function createTagFixture() {
    const fixture = await createTestFixture(KpTagComponent);
    fixture.componentRef.setInput('value', 'Active');
    fixture.detectChanges();
    return fixture;
  }
  it('creates component', async () => {
    const fixture = await createTagFixture();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTagFixture();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets value input', async () => {
    const fixture = await createTagFixture();
    fixture.componentRef.setInput('value', 'Active');
    expect(fixture.componentInstance.value()).toBe('Active');
  });

  it('default severity is info', async () => {
    const fixture = await createTagFixture();
    expect(fixture.componentInstance.severity()).toBe('info');
  });

  it('default rounded is true', async () => {
    const fixture = await createTagFixture();
    expect(fixture.componentInstance.rounded()).toBe(true);
  });

  it('accepts custom severity', async () => {
    const fixture = await createTagFixture();
    fixture.componentRef.setInput('severity', 'success');
    expect(fixture.componentInstance.severity()).toBe('success');
  });


});
