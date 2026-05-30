import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KpButtonComponent, KpDialogComponent, KpInputComponent } from '@ui-primeng-kit/angular';

@Component({
  selector: 'demo-ui-primeng-dialog',
  standalone: true,
  imports: [RouterLink, KpButtonComponent, KpInputComponent, KpDialogComponent],
  templateUrl: './ui-primeng-dialog-demo.component.html',
  styleUrl: './ui-primeng-dialog-demo.component.scss',
})
export class UiPrimengDialogDemoComponent {
  readonly dialogVisible = signal(false);
  readonly wideDialogVisible = signal(false);
}
