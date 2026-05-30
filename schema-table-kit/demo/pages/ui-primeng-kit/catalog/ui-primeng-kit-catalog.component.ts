import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  UI_PRIMENG_COMPONENTS,
  uiPrimengComponentDemoRoute,
  type UiPrimengComponentEntry,
} from '../ui-primeng-components.config';

@Component({
  selector: 'demo-ui-primeng-kit-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ui-primeng-kit-catalog.component.html',
  styleUrl: './ui-primeng-kit-catalog.component.scss',
})
export class UiPrimengKitCatalogComponent {
  readonly components = UI_PRIMENG_COMPONENTS;

  readonly readyCount = this.components.filter((c) => c.status === 'ready').length;
  readonly plannedCount = this.components.filter((c) => c.status === 'planned').length;

  demoRoute(entry: UiPrimengComponentEntry): string {
    return uiPrimengComponentDemoRoute(entry.id);
  }
}
