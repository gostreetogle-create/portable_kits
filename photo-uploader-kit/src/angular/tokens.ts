import { InjectionToken } from '@angular/core';

import type { PhotoUploaderKitConfig } from '../core';

export const PHOTO_UPLOADER_KIT_CONFIG = new InjectionToken<PhotoUploaderKitConfig>(
  'PHOTO_UPLOADER_KIT_CONFIG',
);
