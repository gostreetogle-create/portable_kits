import { Component, input, model, ChangeDetectionStrategy, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'up-kp-datepicker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, DatePickerModule],
  templateUrl: './kp-datepicker.component.html',
  styleUrl: './kp-datepicker.component.scss',
})
export class KpDatepickerComponent {
  readonly label = input<string>('');
  readonly name = input<string>('');
  readonly value = model<string>('');
  readonly required = input(false);
  readonly readonly = input(false);
  readonly disabled = input(false);
  readonly error = input<string>('');
  readonly ariaLabel = input<string>('');

  readonly errorId = computed(() => (this.name() ? `${this.name()}-error` : 'up-kp-datepicker-error'));
  readonly inputAriaLabel = computed(() => this.ariaLabel() || this.label() || '');

  readonly dateValue = computed(() => {
    const v = this.value();
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d;
  });

  onDateChange(date: Date | null): void {
    if (!date) {
      this.value.set('');
      return;
    }
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    this.value.set(`${y}-${m}-${d}`);
  }
}
