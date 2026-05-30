import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KitPlaceholderComponent } from './pages/kit-placeholder/kit-placeholder.component';
import { SchemaTableKitDemoComponent } from './pages/schema-table-kit/schema-table-kit-demo.component';
import { SortableKitDemoComponent } from './pages/sortable-kit/sortable-kit-demo.component';
import { OptionsResolverKitDemoComponent } from './pages/options-resolver-kit/options-resolver-kit-demo.component';
import { EntityPickerKitDemoComponent } from './pages/entity-picker-kit/entity-picker-kit-demo.component';
import { SchemaDataTableKitDemoComponent } from './pages/schema-data-table-kit/schema-data-table-kit-demo.component';
import { CrudFactoryKitDemoComponent } from './pages/crud-factory-kit/crud-factory-kit-demo.component';
import { PhotoUploaderKitDemoComponent } from './pages/photo-uploader-kit/photo-uploader-kit-demo.component';
import { PlaceholderKitDemoComponent } from './pages/placeholder-kit/placeholder-kit-demo.component';
import { DocumentCanvasKitDemoComponent } from './pages/document-canvas-kit/document-canvas-kit-demo.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'modules/schema-table-kit', component: SchemaTableKitDemoComponent },
  { path: 'modules/sortable-kit', component: SortableKitDemoComponent },
  { path: 'modules/options-resolver-kit', component: OptionsResolverKitDemoComponent },
  { path: 'modules/entity-picker-kit', component: EntityPickerKitDemoComponent },
  { path: 'modules/schema-data-table-kit', component: SchemaDataTableKitDemoComponent },
  { path: 'modules/crud-factory-kit', component: CrudFactoryKitDemoComponent },
  { path: 'modules/photo-uploader-kit', component: PhotoUploaderKitDemoComponent },
  { path: 'modules/placeholder-kit', component: PlaceholderKitDemoComponent },
  { path: 'modules/document-canvas-kit', component: DocumentCanvasKitDemoComponent },
  { path: 'modules/:kitId', component: KitPlaceholderComponent },
  { path: '**', redirectTo: '' },
];
