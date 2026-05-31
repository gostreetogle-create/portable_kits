import { Component, input, model, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'up-kp-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TextareaModule],
  templateUrl: './kp-textarea.component.html',
  styleUrl: './kp-textarea.component.scss',
})
export class KpTextareaComponent {
  readonly label = input<string>('');
  readonly name = input<string>('');
  readonly value = model<string>('');
  readonly placeholder = input<string>('');
  readonly rows = input(3);
  readonly required = input(false);
  readonly readonly = input(false);
  readonly disabled = input(false);
  readonly error = input<string>('');
  readonly autoResize = input(true);
  readonly size = input<'small' | 'large'>('small');
  readonly ariaLabel = input<string>('');

  readonly errorId = computed(() => (this.name() ? `${this.name()}-error` : 'up-kp-textarea-error'));
  readonly inputAriaLabel = computed(() => this.ariaLabel() || this.label() || '');
}
