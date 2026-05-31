import { Component, inject } from '@angular/core';
import { ComposerStateService } from '../../services/composer-state.service';
import type { ButtonPresetProps, InputPresetProps, SelectPresetProps, CheckboxPresetProps, TagPresetProps, SearchPresetProps, TextareaPresetProps, MultiselectPresetProps, InputNumberPresetProps, DatepickerPresetProps, PasswordPresetProps } from '../../models/component-preset.model';

@Component({
  selector: 'demo-composer-properties-panel',
  standalone: true,
  templateUrl: './properties-panel.component.html',
  styleUrl: './properties-panel.component.scss',
})
export class ComposerPropertiesPanelComponent {
  readonly state = inject(ComposerStateService);

  propString(key: string): string {
    const v = this.state.currentPreset().props?.[key];
    return v == null ? '' : String(v);
  }

  propBool(key: string): boolean {
    return Boolean(this.state.currentPreset().props?.[key]);
  }

  tokenString(key: string): string {
    return this.state.currentPreset().tokenOverrides?.[key] ?? '';
  }

  onNameInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.state.updateMeta(value, this.state.currentPreset().description);
  }

  onDescriptionInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.state.updateMeta(this.state.currentPreset().name ?? '', value);
  }

  onPropInput(key: string, event: Event): void {
    this.state.updateProp(key, (event.target as HTMLInputElement).value);
  }

  onPropSelect(key: string, event: Event): void {
    this.state.updateProp(key, (event.target as HTMLSelectElement).value);
  }

  onPropCheckbox(key: string, event: Event): void {
    this.state.updateProp(key, (event.target as HTMLInputElement).checked);
  }

  onTokenInput(key: string, event: Event): void {
    const el = event.target as HTMLInputElement;
    this.state.updateToken(key, el.type === 'color' ? el.value : el.value);
  }

  buttonProps(): ButtonPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      severity: (p['severity'] as ButtonPresetProps['severity']) ?? 'primary',
      variant: (p['variant'] as ButtonPresetProps['variant']) ?? 'premium',
      size: (p['size'] as ButtonPresetProps['size']) ?? 'small',
      disabled: Boolean(p['disabled']),
      icon: String(p['icon'] ?? ''),
      outlined: Boolean(p['outlined']),
      text: Boolean(p['text']),
    };
  }

  inputProps(): InputPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      placeholder: String(p['placeholder'] ?? ''),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      error: String(p['error'] ?? ''),
      size: (p['size'] as InputPresetProps['size']) ?? 'small',
    };
  }

  selectProps(): SelectPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      placeholder: String(p['placeholder'] ?? ''),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      loading: Boolean(p['loading']),
      error: String(p['error'] ?? ''),
    };
  }

  checkboxProps(): CheckboxPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      disabled: Boolean(p['disabled']),
    };
  }

  tagProps(): TagPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      value: String(p['value'] ?? ''),
      severity: (p['severity'] as TagPresetProps['severity']) ?? 'info',
      rounded: Boolean(p['rounded']),
    };
  }

  searchProps(): SearchPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      placeholder: String(p['placeholder'] ?? ''),
      disabled: Boolean(p['disabled']),
      size: (p['size'] as SearchPresetProps['size']) ?? 'small',
    };
  }

  textareaProps(): TextareaPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      placeholder: String(p['placeholder'] ?? ''),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      error: String(p['error'] ?? ''),
      rows: Number(p['rows'] ?? 3),
      size: (p['size'] as TextareaPresetProps['size']) ?? 'small',
    };
  }

  multiselectProps(): MultiselectPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      placeholder: String(p['placeholder'] ?? ''),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      error: String(p['error'] ?? ''),
    };
  }

  inputNumberProps(): InputNumberPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      placeholder: String(p['placeholder'] ?? ''),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      error: String(p['error'] ?? ''),
      min: Number(p['min'] ?? 0),
      max: Number(p['max'] ?? 999),
      step: Number(p['step'] ?? 1),
    };
  }

  datepickerProps(): DatepickerPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      readonly: Boolean(p['readonly']),
      error: String(p['error'] ?? ''),
    };
  }

  passwordProps(): PasswordPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      placeholder: String(p['placeholder'] ?? ''),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      toggleMask: Boolean(p['toggleMask']),
      feedback: Boolean(p['feedback']),
      error: String(p['error'] ?? ''),
    };
  }
}
