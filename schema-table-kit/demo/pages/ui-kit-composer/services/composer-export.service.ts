import { Injectable } from '@angular/core';
import type { ComponentPreset } from '../models/component-preset.model';

export type ExportResult = 'copied' | 'downloaded' | 'failed';

@Injectable({ providedIn: 'root' })
export class ComposerExportService {
  presetToJson(preset: ComponentPreset): string {
    return JSON.stringify(preset, null, 2);
  }

  async copyJson(preset: ComponentPreset): Promise<ExportResult> {
    const json = this.presetToJson(preset);
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(json);
        return 'copied';
      }
    } catch {
      /* fall through to download */
    }
    this.downloadJson(preset);
    return 'downloaded';
  }

  downloadJson(preset: ComponentPreset): void {
    const json = this.presetToJson(preset);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${preset.id || 'preset'}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
