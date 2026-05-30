import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KpButtonComponent } from '@ui-primeng-kit/angular';

@Component({
  selector: 'demo-ui-primeng-button',
  standalone: true,
  imports: [RouterLink, KpButtonComponent],
  templateUrl: './ui-primeng-button-demo.component.html',
  styleUrl: './ui-primeng-button-demo.component.scss',
})
export class UiPrimengButtonDemoComponent {
  readonly clickCount = signal(0);
  readonly loading = signal(false);

  onPrimaryClick(): void {
    this.clickCount.update((n) => n + 1);
  }

  simulateLoading(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1500);
  }
}
