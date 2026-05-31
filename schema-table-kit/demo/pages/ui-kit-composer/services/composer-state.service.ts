import { Injectable, signal } from '@angular/core';
import {
  COMPOSER_DRAFT_STORAGE_KEY,
  DEFAULT_PRESETS,
  slugifyPresetName,
  type ComponentPreset,
  type ComposerComponentType,
} from '../models/component-preset.model';

@Injectable({ providedIn: 'root' })
export class ComposerStateService {
  readonly selectedType = signal<ComposerComponentType | null>(null);
  readonly currentPreset = signal<Partial<ComponentPreset>>({});

  constructor() {
    this.loadDraft();
  }

  selectType(type: ComposerComponentType): void {
    this.selectedType.set(type);
    const base = DEFAULT_PRESETS[type];
    this.currentPreset.set({
      ...base,
      props: { ...base.props },
      tokenOverrides: { ...(base.tokenOverrides ?? {}) },
    });
  }

  updateProp(key: string, value: unknown): void {
    const preset = this.currentPreset();
    this.currentPreset.set({
      ...preset,
      props: { ...(preset.props ?? {}), [key]: value },
    });
  }

  updateToken(key: string, value: string): void {
    const preset = this.currentPreset();
    this.currentPreset.set({
      ...preset,
      tokenOverrides: { ...(preset.tokenOverrides ?? {}), [key]: value },
    });
  }

  updateMeta(name: string, description?: string): void {
    this.currentPreset.set({
      ...this.currentPreset(),
      name,
      description,
    });
  }

  resetToDefaults(): void {
    const type = this.selectedType();
    if (!type) return;
    this.selectType(type);
  }

  saveDraft(): void {
    const type = this.selectedType();
    if (!type) return;
    const payload = {
      selectedType: type,
      preset: this.currentPreset(),
    };
    try {
      localStorage.setItem(COMPOSER_DRAFT_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota errors in demo */
    }
  }

  loadDraft(): boolean {
    try {
      const raw = localStorage.getItem(COMPOSER_DRAFT_STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw) as {
        selectedType?: ComposerComponentType;
        preset?: Partial<ComponentPreset>;
      };
      if (!parsed.selectedType || !parsed.preset?.componentType) return false;
      this.selectedType.set(parsed.selectedType);
      this.currentPreset.set({
        ...DEFAULT_PRESETS[parsed.selectedType],
        ...parsed.preset,
        props: { ...DEFAULT_PRESETS[parsed.selectedType].props, ...parsed.preset.props },
        tokenOverrides: {
          ...DEFAULT_PRESETS[parsed.selectedType].tokenOverrides,
          ...parsed.preset.tokenOverrides,
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  clearDraft(): void {
    try {
      localStorage.removeItem(COMPOSER_DRAFT_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  toExportPreset(): ComponentPreset | null {
    const type = this.selectedType();
    const preset = this.currentPreset();
    if (!type || !preset.componentType) return null;

    const name = (preset.name ?? '').trim() || 'Untitled preset';
    const now = new Date().toISOString();

    return {
      id: slugifyPresetName(name),
      name,
      description: preset.description,
      componentType: type,
      props: { ...(preset.props ?? {}) },
      tokenOverrides: { ...(preset.tokenOverrides ?? {}) },
      createdAt: now,
    };
  }
}
