import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpCardComponent } from './kp-card.component';

describe('KpCardComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpCardComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpCardComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders ng-content slots', async () => {
    const fixture = await createTestFixture(KpCardComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
