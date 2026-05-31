import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { EavAttributeEditorComponent } from '../../eav-kit/src/angular/eav-attribute-editor.component';
import { EAV_KIT_CONFIG } from '../../eav-kit/src/angular/tokens';
import { isValidEavAttributeKey, normalizeEavAttributeOrder } from '../../eav-kit/src/core';

// ── Core logic tests ──────────────────────────────────────────────────────

describe('isValidEavAttributeKey', () => {
  it('accepts slug keys', () => {
    expect(isValidEavAttributeKey('weight')).toBe(true);
    expect(isValidEavAttributeKey('Bad Key')).toBe(false);
    expect(isValidEavAttributeKey('')).toBe(false);
    expect(isValidEavAttributeKey('_leading')).toBe(false);
    expect(isValidEavAttributeKey('with_underscore')).toBe(true);
    expect(isValidEavAttributeKey('has123')).toBe(true);
  });
});

describe('normalizeEavAttributeOrder', () => {
  it('reindexes order field', () => {
    const result = normalizeEavAttributeOrder([
      { entityKey: 'p', key: 'a', label: 'A', type: 'string', order: 9 },
      { entityKey: 'p', key: 'b', label: 'B', type: 'string', order: 1 },
    ]);
    expect(result.map((a) => a.order)).toEqual([0, 1]);
  });

  it('handles empty array', () => {
    expect(normalizeEavAttributeOrder([])).toEqual([]);
  });
});

// ── TestBed component tests ────────────────────────────────────────────────
// entityKey is a model (writable signal). We set it via .set() directly
// before detectChanges() so the constructor effect reads the correct value.

describe('EavAttributeEditorComponent', () => {
  function createComponent(config: object = {}) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [EavAttributeEditorComponent],
      providers: [
        { provide: EAV_KIT_CONFIG, useValue: config },
      ],
    });
    const fixture = TestBed.createComponent(EavAttributeEditorComponent);
    // Set entityKey via model .set() before detectChanges so constructor
    // effect reads the correct value
    fixture.componentInstance.entityKey.set('product');
    fixture.detectChanges();
    return fixture;
  }

  it('creates component with optional config', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('starts with empty attributes', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance.attributes().length).toBe(0);
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.error()).toBeNull();
  });

  it('addAttribute adds a new attribute', () => {
    const fixture = createComponent();
    fixture.componentInstance.addAttribute();
    expect(fixture.componentInstance.attributes().length).toBe(1);
    expect(fixture.componentInstance.attributes()[0].key).toBe('attr_1');
    expect(fixture.componentInstance.attributes()[0].label).toBe('Новый атрибут');
    expect(fixture.componentInstance.attributes()[0].type).toBe('string');
  });

  it('addAttribute auto-increments key', () => {
    const fixture = createComponent();
    fixture.componentInstance.addAttribute();
    fixture.componentInstance.addAttribute();
    expect(fixture.componentInstance.attributes().length).toBe(2);
    expect(fixture.componentInstance.attributes()[1].key).toBe('attr_2');
  });

  it('removeAttribute removes by index', () => {
    const fixture = createComponent();
    fixture.componentInstance.addAttribute();
    fixture.componentInstance.addAttribute();
    fixture.componentInstance.removeAttribute(0);
    expect(fixture.componentInstance.attributes().length).toBe(1);
    expect(fixture.componentInstance.attributes()[0].key).toBe('attr_2');
  });

  it('onFieldChange triggers change detection', () => {
    const fixture = createComponent();
    fixture.componentInstance.addAttribute();
    const attrs = fixture.componentInstance.attributes();
    attrs[0].label = 'Updated';
    fixture.componentInstance.onFieldChange();
    expect(fixture.componentInstance.attributes()[0].label).toBe('Updated');
  });

  it('save without config sets error', async () => {
    const fixture = createComponent({});
    fixture.componentInstance.addAttribute();
    await fixture.componentInstance.save();
    expect(fixture.componentInstance.error()).toContain('saveAttributes не настроен');
  });

  it('save calls saveAttributes from config', async () => {
    let savedEntityKey = '';
    let savedAttrs: unknown[] = [];

    const fixture = createComponent({
      saveAttributes: async (entityKey: string, attrs: unknown[]) => {
        savedEntityKey = entityKey;
        savedAttrs = attrs;
      },
    });
    fixture.componentInstance.addAttribute();
    await fixture.componentInstance.save();

    expect(savedEntityKey).toBe('product');
    expect(savedAttrs).toHaveLength(1);
    expect(fixture.componentInstance.saving()).toBe(false);
    expect(fixture.componentInstance.error()).toBeNull();
  });

  it('loads attributes from config on mount (via effect)', async () => {
    const existingAttrs = [
      { entityKey: 'product', key: 'weight', label: 'Weight', type: 'number' as const, required: true },
    ];

    const fixture = createComponent({
      loadAttributes: async () => existingAttrs,
    });

    await vi.waitFor(() => {
      expect(fixture.componentInstance.attributes().length).toBe(1);
    }, { timeout: 1000 });

    expect(fixture.componentInstance.attributes()[0].key).toBe('weight');
    expect(fixture.componentInstance.loading()).toBe(false);
  });

  it('handles load error gracefully', async () => {
    const fixture = createComponent({
      loadAttributes: async () => { throw new Error('Network error'); },
    });

    await vi.waitFor(() => {
      expect(fixture.componentInstance.error()).toBe('Network error');
    }, { timeout: 1000 });

    expect(fixture.componentInstance.attributes().length).toBe(0);
    expect(fixture.componentInstance.loading()).toBe(false);
  });

  it('exposes isValidEavAttributeKey for template', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance.isValidEavAttributeKey('valid_key')).toBe(true);
    expect(fixture.componentInstance.isValidEavAttributeKey('Invalid')).toBe(false);
  });

  it('exposes types list', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance.types).toContain('string');
    expect(fixture.componentInstance.types).toContain('number');
    expect(fixture.componentInstance.types).toContain('boolean');
    expect(fixture.componentInstance.types).toContain('date');
    expect(fixture.componentInstance.types).toContain('select');
  });
});
