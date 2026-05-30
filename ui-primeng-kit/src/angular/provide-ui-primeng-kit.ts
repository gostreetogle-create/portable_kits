import { Provider } from '@angular/core';

import type { UiPrimengKitConfig } from '../core';
import { UI_PRIMENG_KIT_CONFIG } from './tokens';

export function provideUiPrimengKit(config: UiPrimengKitConfig = {}): Provider[] {
  return [{ provide: UI_PRIMENG_KIT_CONFIG, useValue: config }];
}

export { UI_PRIMENG_KIT_CONFIG };
