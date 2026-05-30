import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KpInputComponent } from '@ui-primeng-kit/angular';

@Component({
  selector: 'demo-ui-primeng-input',
  standalone: true,
  imports: [RouterLink, KpInputComponent],
  templateUrl: './ui-primeng-input-demo.component.html',
  styleUrl: './ui-primeng-input-demo.component.scss',
})
export class UiPrimengInputDemoComponent {
  readonly name = signal('Portable kits');
  readonly email = signal('');
  readonly withError = signal('bad@');
}
