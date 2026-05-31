import { Component, input, model, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'up-kp-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CheckboxModule],
  templateUrl: './kp-checkbox.component.html',
  styleUrl: './kp-checkbox.component.scss',
})
export class KpCheckboxComponent {
  readonly label = input<string>('');
  readonly name = input<string>('');
  readonly checked = model<boolean>(false);
  readonly disabled = input(false);
  readonly ariaLabel = input<string>('');

  readonly inputAriaLabel = computed(() => this.ariaLabel() || this.label() || '');
}
