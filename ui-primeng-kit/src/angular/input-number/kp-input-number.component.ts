import { Component, input, model, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'up-kp-input-number',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.up-kp-input-number-host--compact]': 'compact()',
  },
  imports: [FormsModule, InputNumberModule],
  templateUrl: './kp-input-number.component.html',
  styleUrl: './kp-input-number.component.scss',
})
export class KpInputNumberComponent {
  readonly label = input<string>('');
  readonly name = input<string>('');
  readonly value = model<number | null>(null);
  readonly placeholder = input<string>('');
  readonly required = input(false);
  readonly readonly = input(false);
  readonly disabled = input(false);
  readonly error = input<string>('');
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);
  readonly step = input<number>(1);
  readonly mode = input<'decimal' | 'currency'>('decimal');
  readonly useGrouping = input(true);
  readonly compact = input(false);
  readonly ariaLabel = input<string>('');

  readonly errorId = computed(() => (this.name() ? `${this.name()}-error` : 'up-kp-input-number-error'));
  readonly inputAriaLabel = computed(() => this.ariaLabel() || this.label() || '');
}
