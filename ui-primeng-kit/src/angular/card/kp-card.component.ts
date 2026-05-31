import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'up-kp-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kp-card.component.html',
  styleUrl: './kp-card.component.scss',
})
export class KpCardComponent {}
