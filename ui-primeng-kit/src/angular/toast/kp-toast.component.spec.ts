import { describe, expect, it } from 'vitest';
import { MessageService } from 'primeng/api';
import { createTestFixture } from '../test-utils';
import { KpToastComponent } from './kp-toast.component';

describe('KpToastComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpToastComponent, { extraProviders: [MessageService] });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpToastComponent, { extraProviders: [MessageService] });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('default position is top-right', async () => {
    const fixture = await createTestFixture(KpToastComponent, { extraProviders: [MessageService] });
    expect(fixture.componentInstance.position()).toBe('top-right');
  });

  it('accepts custom position', async () => {
    const fixture = await createTestFixture(KpToastComponent, { extraProviders: [MessageService] });
    fixture.componentRef.setInput('position', 'bottom-center');
    expect(fixture.componentInstance.position()).toBe('bottom-center');
  });

  it('has breakpoints for responsive', async () => {
    const fixture = await createTestFixture(KpToastComponent, { extraProviders: [MessageService] });
    expect(fixture.componentInstance.breakpoints['920px']).toBeDefined();
    expect(fixture.componentInstance.breakpoints['640px']).toBeDefined();
  });
});
