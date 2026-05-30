import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DEMO_MODULE_TIER_SECTIONS,
  getDemoModulesByTier,
  type DemoModule,
  type DemoModuleTierSection,
} from '../../modules.config';

interface HomeTierSection extends DemoModuleTierSection {
  modules: DemoModule[];
}

@Component({
  selector: 'demo-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly tierSections: HomeTierSection[] = DEMO_MODULE_TIER_SECTIONS.map((section) => ({
    ...section,
    modules: getDemoModulesByTier(section.tier),
  }));
}
