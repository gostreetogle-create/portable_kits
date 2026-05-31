import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  getUiPrimengComponentById,
  UI_PRIMENG_COMPONENTS,
  uiPrimengComponentDemoRoute,
} from '../demo/pages/ui-primeng-kit/ui-primeng-components.config';

const kitRoot = resolve(__dirname, '../../ui-primeng-kit/src');

describe('ui-primeng-kit', () => {
  it('angular barrel exports all ported kp-* components', () => {
    const barrel = readFileSync(resolve(kitRoot, 'angular/index.ts'), 'utf8');
    expect(barrel).toContain('KpButtonComponent');
    expect(barrel).toContain('KpInputComponent');
    expect(barrel).toContain('KpDialogComponent');
    expect(barrel).toContain('KpSelectComponent');
    expect(barrel).toContain('KpCheckboxComponent');
    expect(barrel).toContain('KpTagComponent');
    expect(barrel).toContain('KpCardComponent');
    expect(barrel).toContain('KpSearchComponent');
    expect(barrel).toContain('KpTextareaComponent');
    expect(barrel).toContain('KpMultiselectComponent');
    expect(barrel).toContain('KpInputNumberComponent');
    expect(barrel).toContain('provideUiPrimengKit');
  });

  it('provideUiPrimengKit returns config provider', async () => {
    const mod = await import('../../ui-primeng-kit/src/angular/provide-ui-primeng-kit');
    const providers = mod.provideUiPrimengKit({ cssPrefix: 'up-kp-' });
    expect(providers).toHaveLength(1);
  });

  it('UiPrimengKitConfig accepts optional cssPrefix', async () => {
    const cfg: import('../../ui-primeng-kit/src/core/index').UiPrimengKitConfig = {
      cssPrefix: 'up-kp-',
    };
    expect(cfg.cssPrefix).toBe('up-kp-');
  });

  it('component catalog lists ready and planned kp-* entries', () => {
    expect(UI_PRIMENG_COMPONENTS.length).toBeGreaterThanOrEqual(20);
    const ready = UI_PRIMENG_COMPONENTS.filter((c) => c.status === 'ready');
    expect(ready.map((c) => c.id)).toEqual([
      'button', 'input', 'dialog', 'select', 'table', 'paginator', 'checkbox', 'textarea',
      'datepicker', 'multiselect', 'tag', 'card', 'search', 'input-number',
      'tabs', 'breadcrumbs', 'toast', 'confirm',
      'password', 'form-field', 'photo-uploader',
    ]);
  });

  it('getUiPrimengComponentById resolves catalog entries', () => {
    expect(getUiPrimengComponentById('select')?.status).toBe('ready');
    expect(getUiPrimengComponentById('button')?.selector).toBe('up-kp-button');
    expect(getUiPrimengComponentById('missing')).toBeUndefined();
  });

  it('uiPrimengComponentDemoRoute builds per-type demo paths', () => {
    expect(uiPrimengComponentDemoRoute('input')).toBe('/modules/ui-primeng-kit/input');
  });
});
