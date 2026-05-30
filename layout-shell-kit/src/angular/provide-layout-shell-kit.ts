import { Provider } from '@angular/core';

import type { LayoutShellKitConfig } from '../core';
import { LAYOUT_SHELL_KIT_CONFIG } from './tokens';

export function provideLayoutShellKit(config: LayoutShellKitConfig = {}): Provider[] {
  return [{ provide: LAYOUT_SHELL_KIT_CONFIG, useValue: config }];
}

export { LAYOUT_SHELL_KIT_CONFIG };
