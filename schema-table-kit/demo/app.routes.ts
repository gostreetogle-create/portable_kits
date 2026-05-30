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
import { UiPrimengKitCatalogComponent } from './pages/ui-primeng-kit/catalog/ui-primeng-kit-catalog.component';
import { UiPrimengButtonDemoComponent } from './pages/ui-primeng-kit/button/ui-primeng-button-demo.component';
import { UiPrimengInputDemoComponent } from './pages/ui-primeng-kit/input/ui-primeng-input-demo.component';
import { UiPrimengDialogDemoComponent } from './pages/ui-primeng-kit/dialog/ui-primeng-dialog-demo.component';
import { UiPrimengPlannedDemoComponent } from './pages/ui-primeng-kit/planned/ui-primeng-planned-demo.component';
import { CrudPageKitDemoComponent } from './pages/crud-page-kit/crud-page-kit-demo.component';
import { EavKitDemoComponent } from './pages/eav-kit/eav-kit-demo.component';
import { AuthRbacKitDemoComponent } from './pages/auth-rbac-kit/auth-rbac-kit-demo.component';
import { LayoutShellKitDemoComponent } from './pages/layout-shell-kit/layout-shell-kit-demo.component';
import { QuotationEditorDemoComponent } from './pages/quotation-editor/quotation-editor-demo.component';

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
  {
    path: 'modules/ui-primeng-kit',
    children: [
      { path: '', component: UiPrimengKitCatalogComponent },
      { path: 'button', component: UiPrimengButtonDemoComponent },
      { path: 'input', component: UiPrimengInputDemoComponent },
      { path: 'dialog', component: UiPrimengDialogDemoComponent },
      { path: ':componentId', component: UiPrimengPlannedDemoComponent },
    ],
  },
  { path: 'modules/crud-page-kit', component: CrudPageKitDemoComponent },
  { path: 'modules/eav-kit', component: EavKitDemoComponent },
  { path: 'modules/auth-rbac-kit', component: AuthRbacKitDemoComponent },
  { path: 'modules/layout-shell-kit', component: LayoutShellKitDemoComponent },
  { path: 'modules/quotation-editor', component: QuotationEditorDemoComponent },
  { path: 'modules/:kitId', component: KitPlaceholderComponent },
  { path: '**', redirectTo: '' },
];
