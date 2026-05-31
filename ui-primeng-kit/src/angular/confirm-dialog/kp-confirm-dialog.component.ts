import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'up-kp-confirm-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConfirmDialogModule],
  templateUrl: './kp-confirm-dialog.component.html',
})
export class KpConfirmDialogComponent {}
