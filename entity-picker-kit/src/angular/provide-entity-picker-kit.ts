import { Provider } from '@angular/core';

import type { EntityPickerKitConfig } from '../core';
import { ENTITY_PICKER_KIT_CONFIG } from './tokens';

export function provideEntityPickerKit(config: EntityPickerKitConfig): Provider[] {
  return [{ provide: ENTITY_PICKER_KIT_CONFIG, useValue: config }];
}

export { ENTITY_PICKER_KIT_CONFIG };
