import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideSchemaTableKit } from '../src/angular';
import { provideEntityPickerKit } from '@entity-picker-kit/angular';
import { provideOptionsResolver } from '@options-resolver-kit/angular';
import { provideSchemaDataTableKit } from '@schema-data-table-kit/angular';
import { providePhotoUploaderKit } from '@photo-uploader-kit/angular';
import { providePlaceholderKit } from '@placeholder-kit/angular';
import { provideDocumentCanvasKit } from '@document-canvas-kit/angular';
import { provideUiPrimengKit } from '@ui-primeng-kit/angular';
import { provideCrudPageKit } from '@crud-page-kit/angular';
import { provideEavKit } from '@eav-kit/angular';
import { provideAuthRbacKit } from '@auth-rbac-kit/angular';
import { provideLayoutShellKit } from '@layout-shell-kit/angular';
import { provideQuotationEditorKit } from '@quotation-editor/angular';
import { appRoutes } from './app.routes';
import { demoEnvironment } from './environment';
import { MOCK_SCHEMA_CONFIG } from './mock-data/schema-tables.config';
import { DEMO_ENTITY_PICKER_CONFIG } from './mock-data/entity-picker.mock';
import { DEMO_OPTIONS_RESOLVER_CONFIG } from './mock-data/options-resolver.mock';
import { DEMO_EAV_CONFIG } from './mock-data/eav.mock';
import { DEMO_PERMISSIONS } from '@auth-rbac-kit/core';

const kitConfig =
  demoEnvironment.provider === 'http'
    ? { provider: 'http' as const, schemaApiUrl: demoEnvironment.schemaApiUrl }
    : MOCK_SCHEMA_CONFIG;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { cssLayer: { name: 'primeng', order: 'primeng' } },
      },
    }),
    provideSchemaTableKit(kitConfig),
    provideEntityPickerKit(DEMO_ENTITY_PICKER_CONFIG),
    provideOptionsResolver(DEMO_OPTIONS_RESOLVER_CONFIG),
    provideSchemaDataTableKit({ emptyMessage: 'Нет строк для отображения' }),
    providePhotoUploaderKit(),
    providePlaceholderKit(),
    provideDocumentCanvasKit(),
    provideUiPrimengKit(),
    provideCrudPageKit({
      checkPermission: () => true,
    }),
    provideEavKit(DEMO_EAV_CONFIG),
    provideAuthRbacKit({
      getUser: () => ({
        id: 'demo',
        permissions: Object.values(DEMO_PERMISSIONS.products),
      }),
    }),
    provideLayoutShellKit({
      appTitle: 'Portable Kits',
      navItems: [
        { label: 'Главная', route: '/', icon: '⌂' },
        { label: 'КП редактор', route: '/modules/quotation-editor', icon: '📄' },
        { label: 'CRUD demo', route: '/modules/crud-page-kit', icon: '📋' },
      ],
    }),
    provideQuotationEditorKit(),
  ],
};
