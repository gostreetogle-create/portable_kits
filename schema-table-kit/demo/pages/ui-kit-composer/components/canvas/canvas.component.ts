import { Component, computed, inject } from '@angular/core';
import { KpButtonComponent, KpInputComponent, KpSelectComponent, KpCheckboxComponent, KpTagComponent, KpSearchComponent, KpTextareaComponent, KpMultiselectComponent, KpInputNumberComponent, KpDatepickerComponent, KpPasswordComponent } from '@ui-primeng-kit/angular';
import { ComposerStateService } from '../../services/composer-state.service';
import { tokenOverridesToStyle } from '../../models/component-preset.model';
import type { ButtonPresetProps, InputPresetProps, SelectPresetProps, CheckboxPresetProps, TagPresetProps, SearchPresetProps, TextareaPresetProps, MultiselectPresetProps, InputNumberPresetProps, DatepickerPresetProps, PasswordPresetProps } from '../../models/component-preset.model';

@Component({
  selector: 'demo-composer-canvas',
  standalone: true,
  imports: [KpButtonComponent, KpInputComponent, KpSelectComponent, KpCheckboxComponent, KpTagComponent, KpSearchComponent, KpTextareaComponent, KpMultiselectComponent, KpInputNumberComponent, KpDatepickerComponent, KpPasswordComponent],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss',
})
export class ComposerCanvasComponent {
  readonly state = inject(ComposerStateService);

  readonly tokenStyles = computed(() =>
    tokenOverridesToStyle(this.state.currentPreset().tokenOverrides),
  );

  buttonProps(): ButtonPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? 'Button'),
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
      label: String(p['label'] ?? 'Выберите значение'),
      placeholder: String(p['placeholder'] ?? 'Выберите...'),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      loading: Boolean(p['loading']),
      error: String(p['error'] ?? ''),
    };
  }

  checkboxProps(): CheckboxPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? 'Отметить'),
      disabled: Boolean(p['disabled']),
    };
  }

  tagProps(): TagPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      value: String(p['value'] ?? 'Статус'),
      severity: (p['severity'] as TagPresetProps['severity']) ?? 'info',
      rounded: Boolean(p['rounded']),
    };
  }

  searchProps(): SearchPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? ''),
      placeholder: String(p['placeholder'] ?? 'Поиск...'),
      disabled: Boolean(p['disabled']),
      size: (p['size'] as SearchPresetProps['size']) ?? 'small',
    };
  }

  textareaProps(): TextareaPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? 'Описание'),
      placeholder: String(p['placeholder'] ?? 'Введите текст...'),
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
      label: String(p['label'] ?? 'Выберите варианты'),
      placeholder: String(p['placeholder'] ?? 'Выберите...'),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      error: String(p['error'] ?? ''),
    };
  }

  inputNumberProps(): InputNumberPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? 'Количество'),
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
      label: String(p['label'] ?? 'Дата'),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      readonly: Boolean(p['readonly']),
      error: String(p['error'] ?? ''),
    };
  }

  passwordProps(): PasswordPresetProps {
    const p = this.state.currentPreset().props ?? {};
    return {
      label: String(p['label'] ?? 'Пароль'),
      placeholder: String(p['placeholder'] ?? 'Введите пароль'),
      disabled: Boolean(p['disabled']),
      required: Boolean(p['required']),
      toggleMask: Boolean(p['toggleMask']),
      feedback: Boolean(p['feedback']),
      error: String(p['error'] ?? ''),
    };
  }
}
