import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSchemaTableKit } from '../src/angular';
import { appRoutes } from './app.routes';
import { demoEnvironment } from './environment';
import { MOCK_SCHEMA_CONFIG } from './mock-data/schema-tables.config';

const kitConfig =
  demoEnvironment.provider === 'http'
    ? { provider: 'http' as const, schemaApiUrl: demoEnvironment.schemaApiUrl }
    : MOCK_SCHEMA_CONFIG;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideSchemaTableKit(kitConfig),
  ],
};
