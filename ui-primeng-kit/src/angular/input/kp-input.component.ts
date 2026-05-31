import {
  Component,
  input,
  model,
  computed,
  ChangeDetectionStrategy,
  afterNextRender,
  ElementRef,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'up-kp-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, InputTextModule],
  templateUrl: './kp-input.component.html',
  styleUrl: './kp-input.component.scss',
})
export class KpInputComponent {
  private readonly inputEl = inject(ElementRef<HTMLElement>);

  readonly label = input<string>('');
  readonly name = input<string>('');
  readonly value = model<string>('');
  readonly type = input<'text' | 'number' | 'email' | 'tel' | 'url'>('text');
  readonly placeholder = input<string>('');
  readonly required = input(false);
  readonly readonly = input(false);
  readonly disabled = input(false);
  readonly error = input<string>('');
  readonly size = input<'small' | 'large'>('small');
  readonly ariaLabel = input<string>('');
  readonly autofocus = input(false);

  readonly errorId = computed(() => (this.name() ? `${this.name()}-error` : 'up-kp-input-error'));
  readonly inputAriaLabel = computed(() => this.ariaLabel() || this.label() || '');

  private readonly _autofocusOnRender = afterNextRender(() => {
    if (this.autofocus()) {
      this.inputEl.nativeElement.querySelector('input')?.focus();
    }
  });
}
