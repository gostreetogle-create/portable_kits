import { describe, expect, it } from 'vitest';
import { ConfirmationService } from 'primeng/api';
import { createTestFixture } from '../test-utils';
import { KpConfirmDialogComponent } from './kp-confirm-dialog.component';

describe('KpConfirmDialogComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpConfirmDialogComponent, { extraProviders: [ConfirmationService] });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpConfirmDialogComponent, { extraProviders: [ConfirmationService] });
    expect(fixture.componentInstance).toBeTruthy();
  });
});
