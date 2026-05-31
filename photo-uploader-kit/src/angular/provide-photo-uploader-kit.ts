import { Provider } from '@angular/core';

import type { PhotoUploaderKitConfig } from '../core';
import { PHOTO_UPLOADER_KIT_CONFIG } from './tokens';

export function providePhotoUploaderKit(config: PhotoUploaderKitConfig = {}): Provider[] {
  return [{ provide: PHOTO_UPLOADER_KIT_CONFIG, useValue: config }];
}
