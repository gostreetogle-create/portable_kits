import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const kitRoot = resolve(__dirname, '..');

describe('ui-primeng-kit barrel exports', () => {
  it('core barrel declares UiPrimengPresetOverride and UiPrimengKitConfig', () => {
    const barrel = readFileSync(resolve(kitRoot, 'src/core/index.ts'), 'utf8');
    expect(barrel).toContain('UiPrimengPresetOverride');
    expect(barrel).toContain('UiPrimengKitConfig');
  });

  it('angular barrel exports all ported kp-* components', async () => {
    const mod = await import('../src/angular');
    expect(mod.KpButtonComponent).toBeDefined();
    expect(mod.KpInputComponent).toBeDefined();
    expect(mod.KpDialogComponent).toBeDefined();
    expect(mod.KpSelectComponent).toBeDefined();
    expect(mod.KpCheckboxComponent).toBeDefined();
    expect(mod.KpTagComponent).toBeDefined();
    expect(mod.KpCardComponent).toBeDefined();
    expect(mod.KpSearchComponent).toBeDefined();
    expect(mod.KpTextareaComponent).toBeDefined();
    expect(mod.KpMultiselectComponent).toBeDefined();
    expect(mod.KpInputNumberComponent).toBeDefined();
    expect(mod.KpDatepickerComponent).toBeDefined();
    expect(mod.KpPasswordComponent).toBeDefined();
    expect(mod.KpBreadcrumbsComponent).toBeDefined();
    expect(mod.KpTabGroupComponent).toBeDefined();
    expect(mod.KpToastComponent).toBeDefined();
    expect(mod.KpConfirmDialogComponent).toBeDefined();
    expect(mod.KpFormFieldComponent).toBeDefined();
    expect(mod.KpPhotoUploaderComponent).toBeDefined();
    expect(mod.KpTableComponent).toBeDefined();
    expect(mod.KpPaginatorComponent).toBeDefined();
  });

  it('exports provideUiPrimengKit as a function', async () => {
    const mod = await import('../src/angular');
    expect(mod.provideUiPrimengKit).toBeDefined();
    expect(typeof mod.provideUiPrimengKit).toBe('function');
  });

  it('public barrel from index re-exports both core and angular', async () => {
    const mod = await import('../src/index');
    expect(mod.KpButtonComponent).toBeDefined();
    expect(mod.KpCardComponent).toBeDefined();
  });
});
