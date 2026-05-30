import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SchemaTableKitDemoComponent } from './pages/schema-table-kit/schema-table-kit-demo.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'modules/schema-table-kit', component: SchemaTableKitDemoComponent },
  { path: '**', redirectTo: '' },
];
