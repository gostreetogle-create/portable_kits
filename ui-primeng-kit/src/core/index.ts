/** PrimeNG theme preset override descriptor. */
export interface UiPrimengPresetOverride {
  /** Component name (e.g. 'Button', 'InputText', 'Dialog') */
  component: string;
  /** CSS variable overrides (e.g. { borderRadius: '8px', background: '#fff' }) */
  tokens?: Record<string, string>;
}

/** Optional kit-level config (reserved for future theme overrides). */
export interface UiPrimengKitConfig {
  /** CSS class prefix override (default: up-kp-) */
  cssPrefix?: string;
  /** Theme preset overrides merged at provide time */
  presetOverrides?: UiPrimengPresetOverride[];
}
