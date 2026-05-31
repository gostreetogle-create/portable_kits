import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpDialogComponent } from './kp-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('KpDialogComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpDialogComponent, { extraImports: [NoopAnimationsModule] });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpDialogComponent, { extraImports: [NoopAnimationsModule] });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('starts hidden', async () => {
    const fixture = await createTestFixture(KpDialogComponent, { extraImports: [NoopAnimationsModule] });
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpDialogComponent, { extraImports: [NoopAnimationsModule] });
    const comp = fixture.componentInstance;
    expect(comp.header()).toBe('');
    expect(comp.width()).toBe('480px');
  });

  it('onVisibleChange updates model and emits', async () => {
    const fixture = await createTestFixture(KpDialogComponent, { extraImports: [NoopAnimationsModule] });
    const comp = fixture.componentInstance;
    let emitted: boolean | null = null;
    comp.visibleChange.subscribe((v) => (emitted = v));
    comp.onVisibleChange(true);
    expect(comp.visible()).toBe(true);
    expect(emitted).toBe(true);
  });

  it('onHide closes and emits hide', async () => {
    const fixture = await createTestFixture(KpDialogComponent, { extraImports: [NoopAnimationsModule] });
    const comp = fixture.componentInstance;
    let hideEmitted = false;
    comp.hide.subscribe(() => (hideEmitted = true));
    fixture.componentRef.setInput('visible', true);
    comp.onHide();
    expect(comp.visible()).toBe(false);
    expect(hideEmitted).toBe(true);
  });

  it('dialogAriaLabel falls back to header', async () => {
    const fixture = await createTestFixture(KpDialogComponent, { extraImports: [NoopAnimationsModule] });
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.componentRef.setInput('header', 'Confirm');
    expect(comp.dialogAriaLabel()).toBe('Confirm');
    fixture.componentRef.setInput('ariaLabel', 'Custom');
    expect(comp.dialogAriaLabel()).toBe('Custom');
  });

  it('dialogStyle returns width and maxWidth', async () => {
    const fixture = await createTestFixture(KpDialogComponent, { extraImports: [NoopAnimationsModule] });
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('width', '600px');
    const style = comp.dialogStyle();
    expect(style['width']).toBe('600px');
    expect(style['maxWidth']).toBe('90vw');
  });
});
