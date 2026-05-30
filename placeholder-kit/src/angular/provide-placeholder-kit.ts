import { Provider } from '@angular/core';

import type { PlaceholderKitConfig } from '../core';
import { PLACEHOLDER_KIT_CONFIG } from './tokens';

export function providePlaceholderKit(config: PlaceholderKitConfig = {}): Provider[] {
  return [{ provide: PLACEHOLDER_KIT_CONFIG, useValue: config }];
}

export { PLACEHOLDER_KIT_CONFIG };
