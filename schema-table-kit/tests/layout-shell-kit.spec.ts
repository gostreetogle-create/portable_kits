import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const kitRoot = resolve(__dirname, '../../layout-shell-kit/src');

describe('layout-shell-kit', () => {
  it('core barrel exports LayoutNavItem and LayoutShellKitConfig types', () => {
    const barrel = readFileSync(resolve(kitRoot, 'core/index.ts'), 'utf8');
    expect(barrel).toContain('LayoutNavItem');
    expect(barrel).toContain('LayoutShellKitConfig');
  });

  it('angular barrel exports LayoutShellComponent and provideLayoutShellKit', () => {
    const barrel = readFileSync(resolve(kitRoot, 'angular/index.ts'), 'utf8');
    expect(barrel).toContain('LayoutShellComponent');
    expect(barrel).toContain('provideLayoutShellKit');
    expect(barrel).toContain('LAYOUT_SHELL_KIT_CONFIG');
  });

  it('provideLayoutShellKit returns config provider', async () => {
    const mod = await import('../../layout-shell-kit/src/angular/provide-layout-shell-kit');
    const providers = mod.provideLayoutShellKit({ appTitle: 'Demo' });
    expect(providers).toHaveLength(1);
  });
});
