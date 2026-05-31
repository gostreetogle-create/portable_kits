import {
  Component,
  input,
  output,
  computed,
  ChangeDetectionStrategy,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'up-kp-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kp-button.component.html',
  styleUrl: './kp-button.component.scss',
})
export class KpButtonComponent {
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly label = input<string>('');
  readonly icon = input<string>('');
  readonly iconPos = input<'left' | 'right' | 'top' | 'bottom'>('left');
  readonly badge = input<string>('');
  readonly badgeSeverity = input<'danger' | 'info' | 'success' | 'warn'>('danger');
  readonly severity = input<'primary' | 'secondary' | 'danger'>('primary');
  readonly size = input<'small' | 'large'>('small');
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly rounded = input(false);
  readonly text = input(false);
  readonly outlined = input(false);
  readonly raised = input(false);
  readonly block = input(false);
  readonly autoFocus = input(false);
  readonly styleClass = input<string>('');
  readonly variant = input<'premium' | 'flat'>('premium');
  readonly tooltip = input<string>('');
  readonly ariaLabel = input<string>('');

  readonly buttonClick = output<MouseEvent>();

  readonly mergedStyleClass = computed(() => {
    const classes = [this.styleClass()];
    if (this.block()) classes.push('up-kp-button--block');
    return classes.filter(Boolean).join(' ');
  });

  readonly buttonClasses = computed(() => {
    const classes = ['p-button', 'p-component', this.mergedStyleClass()];
    if (this.size() === 'small') classes.push('p-button-sm');
    if (this.size() === 'large') classes.push('p-button-lg');
    if (this.text()) classes.push('p-button-text');
    if (this.outlined()) classes.push('p-button-outlined');
    if (this.raised()) classes.push('p-button-raised');
    if (this.rounded()) classes.push('p-button-rounded');
    if (this.loading()) classes.push('p-button-loading');
    if (this.severity() === 'danger') classes.push('p-button-danger');
    if (this.severity() === 'secondary') classes.push('p-button-secondary');
    if (this.icon() && !this.label()) classes.push('p-button-icon-only');
    if (this.disabled() || this.loading()) classes.push('p-disabled');
    return classes.filter(Boolean).join(' ');
  });

  readonly iconClasses = computed(() => {
    const classes = ['p-button-icon', this.icon()];
    if (this.label()) {
      classes.push(`p-button-icon-${this.iconPos()}`);
    }
    return classes.filter(Boolean).join(' ');
  });

  readonly badgeClasses = computed(() => {
    const severity = this.badgeSeverity();
    return ['p-badge', 'p-component', severity ? `p-badge-${severity}` : ''].filter(Boolean).join(' ');
  });

  @HostBinding('class.up-kp-button--block-host')
  get isBlockHost(): boolean {
    return this.block();
  }

  @HostBinding('class.up-kp-button--variant-premium')
  get isVariantPremium(): boolean {
    return this.variant() === 'premium';
  }

  @HostBinding('class.up-kp-button--variant-flat')
  get isVariantFlat(): boolean {
    return this.variant() === 'flat';
  }

  @HostBinding('class.up-kp-button--severity-primary')
  get isSeverityPrimary(): boolean {
    return this.severity() === 'primary';
  }

  @HostBinding('class.up-kp-button--severity-secondary')
  get isSeveritySecondary(): boolean {
    return this.severity() === 'secondary';
  }

  @HostBinding('class.up-kp-button--severity-danger')
  get isSeverityDanger(): boolean {
    return this.severity() === 'danger';
  }

  readonly tooltipText = computed(() => {
    const tip = this.tooltip().trim();
    if (!tip) return '';
    const visibleLabel = this.label().trim();
    if (visibleLabel && tip === visibleLabel) return '';
    return tip;
  });

  onClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.buttonClick.emit(event);
  }
}
