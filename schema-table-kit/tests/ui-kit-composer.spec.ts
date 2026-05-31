import { describe, expect, it, beforeEach, vi } from 'vitest';
import {
  COMPOSER_DRAFT_STORAGE_KEY,
  DEFAULT_PRESETS,
  slugifyPresetName,
  tokenOverridesToStyle,
} from '../demo/pages/ui-kit-composer/models/component-preset.model';
import { COMPOSER_PALETTE } from '../demo/pages/ui-kit-composer/models/composer-palette.config';

describe('ui-kit-composer', () => {
  it('DEFAULT_PRESETS includes button and input', () => {
    expect(DEFAULT_PRESETS['up-kp-button'].componentType).toBe('up-kp-button');
    expect(DEFAULT_PRESETS['up-kp-input'].componentType).toBe('up-kp-input');
  });

  it('COMPOSER_PALETTE lists ready button and input only', () => {
    const types = COMPOSER_PALETTE.map((e) => e.componentType);
    expect(types).toContain('up-kp-button');
    expect(types).toContain('up-kp-input');
    expect(types).not.toContain('up-kp-dialog');
  });

  it('slugifyPresetName produces kebab-case id', () => {
    expect(slugifyPresetName('Primary Large Button')).toBe('primary-large-button');
  });

  it('tokenOverridesToStyle copies CSS variables', () => {
    expect(
      tokenOverridesToStyle({ '--kp-primary': '#2563eb' }),
    ).toEqual({ '--kp-primary': '#2563eb' });
  });

  describe('ComposerStateService draft storage', () => {
    const store = new Map<string, string>();

    beforeEach(() => {
      store.clear();
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => store.set(key, value),
        removeItem: (key: string) => store.delete(key),
      });
    });

    it('serializes and restores draft', async () => {
      const { ComposerStateService } = await import(
        '../demo/pages/ui-kit-composer/services/composer-state.service'
      );
      const service = new ComposerStateService();
      service.selectType('up-kp-button');
      service.updateProp('label', 'Saved');
      service.saveDraft();

      const raw = store.get(COMPOSER_DRAFT_STORAGE_KEY);
      expect(raw).toBeTruthy();
      expect(JSON.parse(raw!).preset.props.label).toBe('Saved');

      const service2 = new ComposerStateService();
      expect(service2.selectedType()).toBe('up-kp-button');
      expect(service2.currentPreset().props?.['label']).toBe('Saved');
    });

    it('toExportPreset adds id and createdAt', async () => {
      const { ComposerStateService } = await import(
        '../demo/pages/ui-kit-composer/services/composer-state.service'
      );
      const service = new ComposerStateService();
      service.selectType('up-kp-input');
      service.updateMeta('My Input', 'test');

      const exported = service.toExportPreset();
      expect(exported?.id).toBe('my-input');
      expect(exported?.componentType).toBe('up-kp-input');
      expect(exported?.createdAt).toMatch(/^\d{4}-/);
    });
  });
});
