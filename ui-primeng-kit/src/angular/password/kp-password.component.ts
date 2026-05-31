import { Component, input, model, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'up-kp-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, PasswordModule],
  templateUrl: './kp-password.component.html',
  styleUrl: './kp-password.component.scss',
})
export class KpPasswordComponent {
  readonly label = input<string>('');
  readonly name = input<string>('');
  readonly value = model<string>('');
  readonly placeholder = input<string>('');
  readonly required = input(false);
  readonly disabled = input(false);
  readonly error = input<string>('');
  readonly toggleMask = input(true);
  readonly feedback = input(false);
  readonly ariaLabel = input<string>('');

  readonly errorId = computed(() => (this.name() ? `${this.name()}-error` : 'up-kp-password-error'));
  readonly inputAriaLabel = computed(() => this.ariaLabel() || this.label() || '');
}
