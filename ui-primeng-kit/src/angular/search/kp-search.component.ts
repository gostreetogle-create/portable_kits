import {
  Component,
  input,
  model,
  output,
  ChangeDetectionStrategy,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'up-kp-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.up-kp-search--large]': 'size() === "large"',
  },
  imports: [FormsModule, InputTextModule],
  templateUrl: './kp-search.component.html',
  styleUrl: './kp-search.component.scss',
})
export class KpSearchComponent {
  private readonly destroyRef = inject(DestroyRef);
  readonly inputId = `up-kp-search-${Math.random().toString(36).slice(2, 9)}`;

  readonly query = model<string>('');
  readonly placeholder = input('Поиск...');
  readonly label = input('');
  readonly disabled = input(false);
  readonly ariaLabel = input('');
  readonly debounceMs = input(300);
  readonly size = input<'small' | 'large'>('small');

  readonly searchChange = output<string>();

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
    });
  }

  onInput(value: string): void {
    this.query.set(value);

    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    const ms = this.debounceMs();
    if (ms <= 0) {
      this.searchChange.emit(value);
      return;
    }
    this.debounceTimer = setTimeout(() => {
      this.searchChange.emit(value);
      this.debounceTimer = null;
    }, ms);
  }
}
