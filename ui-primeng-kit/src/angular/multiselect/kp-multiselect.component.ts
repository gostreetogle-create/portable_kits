import { Component, input, model, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'up-kp-multiselect',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MultiSelectModule],
  templateUrl: './kp-multiselect.component.html',
  styleUrl: './kp-multiselect.component.scss',
})
export class KpMultiselectComponent {
  readonly label = input<string>('');
  readonly name = input<string>('');
  readonly value = model<string[]>([]);
  readonly options = input<string[]>([]);
  readonly placeholder = input<string>('Выберите...');
  readonly required = input(false);
  readonly disabled = input(false);
  readonly error = input<string>('');
  readonly maxSelectedLabels = input(3);
  readonly ariaLabel = input<string>('');

  readonly selectOptions = computed(() =>
    this.options().map((o) => ({ label: o, value: o })),
  );

  readonly errorId = computed(() => (this.name() ? `${this.name()}-error` : 'up-kp-multiselect-error'));
  readonly inputAriaLabel = computed(() => this.ariaLabel() || this.label() || '');

  readonly controlClass = computed(() => {
    const classes = ['up-kp-multiselect__control', 'w-full'];
    if (this.error()) {
      classes.push('up-kp-multiselect__control--error');
    }
    return classes.join(' ');
  });
}
