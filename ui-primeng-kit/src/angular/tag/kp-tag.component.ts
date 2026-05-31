import {
  Component,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TagModule } from 'primeng/tag';

export type KpTagSeverity = 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast';

@Component({
  selector: 'up-kp-tag',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagModule],
  templateUrl: './kp-tag.component.html',
})
export class KpTagComponent {
  readonly value = input.required<string>();
  readonly severity = input<KpTagSeverity>('info');
  readonly rounded = input(true);
}
