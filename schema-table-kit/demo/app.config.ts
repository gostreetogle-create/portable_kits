import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideSchemaTableKit } from '../src/angular';
import { provideEntityPickerKit } from '@entity-picker-kit/angular';
import { provideOptionsResolver } from '@options-resolver-kit/angular';
import { provideSchemaDataTableKit } from '@schema-data-table-kit/angular';
import { appRoutes } from './app.routes';
import { demoEnvironment } from './environment';
import { MOCK_SCHEMA_CONFIG } from './mock-data/schema-tables.config';
import { DEMO_ENTITY_PICKER_CONFIG } from './mock-data/entity-picker.mock';
import { DEMO_OPTIONS_RESOLVER_CONFIG } from './mock-data/options-resolver.mock';

const kitConfig =
  demoEnvironment.provider === 'http'
    ? { provider: 'http' as const, schemaApiUrl: demoEnvironment.schemaApiUrl }
    : MOCK_SCHEMA_CONFIG;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideSchemaTableKit(kitConfig),
    provideEntityPickerKit(DEMO_ENTITY_PICKER_CONFIG),
    provideOptionsResolver(DEMO_OPTIONS_RESOLVER_CONFIG),
    provideSchemaDataTableKit({ emptyMessage: 'Нет строк для отображения' }),
  ],
};
