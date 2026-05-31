import {
  Component,
  input,
  model,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { KpButtonComponent } from '../button';

export interface KpTabOption {
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'up-kp-tab-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KpButtonComponent],
  templateUrl: './kp-tab-group.component.html',
  styleUrl: './kp-tab-group.component.scss',
})
export class KpTabGroupComponent {
  readonly options = input.required<KpTabOption[]>();
  readonly activeTab = model<string>('');
  readonly ariaLabel = input('Вкладки');
  readonly tabChange = output<string>();

  onTabClick(value: string): void {
    this.activeTab.set(value);
    this.tabChange.emit(value);
  }
}
