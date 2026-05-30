import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getUiPrimengComponentById } from '../ui-primeng-components.config';

@Component({
  selector: 'demo-ui-primeng-planned',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ui-primeng-planned-demo.component.html',
  styleUrl: './ui-primeng-planned-demo.component.scss',
})
export class UiPrimengPlannedDemoComponent {
  private readonly route = inject(ActivatedRoute);

  readonly entry = getUiPrimengComponentById(this.route.snapshot.paramMap.get('componentId') ?? '');
}
