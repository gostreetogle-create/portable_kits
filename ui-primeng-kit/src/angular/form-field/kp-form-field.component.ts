import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'up-kp-form-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kp-form-field.component.html',
  styleUrl: './kp-form-field.component.scss',
})
export class KpFormFieldComponent {
  private static nextId = 0;
  private readonly fieldId = `up-kp-form-field-${++KpFormFieldComponent.nextId}`;

  readonly label = input<string>('');
  readonly forId = input<string>('');
  readonly required = input(false);
  readonly error = input<string>('');
  readonly hint = input<string>('');

  labelId(): string {
    return `${this.fieldId}-label`;
  }
}
