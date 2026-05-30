import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEMO_MODULES, type DemoModule } from '../../modules.config';

@Component({
  selector: 'demo-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly modules: DemoModule[] = DEMO_MODULES;
}
